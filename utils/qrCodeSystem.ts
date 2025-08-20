/**
 * Sistema de QR Codes para Check-in em Pontos Turísticos
 * Caçapava do Sul - Sistema Anti-Fraude
 */

import CryptoJS from 'crypto-js';
import { AUTHENTIC_POI_CACAPAVA } from '../data/authentic-pois';

// Chave secreta para validação (em produção, deve vir do backend)
const SECRET_KEY = 'cacapava-secure-2025';

export interface QRCodeData {
  poiId: string;
  timestamp: number;
  location: {
    lat: number;
    lng: number;
  };
  hash: string;
}

export interface CheckInResult {
  success: boolean;
  message: string;
  points?: number;
  badge?: string;
}

/**
 * Gera um QR Code para um ponto turístico específico
 */
export function generateQRCode(poiId: string): string {
  const poi = AUTHENTIC_POI_CACAPAVA.find(p => p.id === poiId);
  if (!poi) {
    throw new Error('POI não encontrado');
  }

  const qrData: QRCodeData = {
    poiId,
    timestamp: Date.now(),
    location: {
      lat: poi.lat,
      lng: poi.lng
    },
    hash: ''
  };

  // Gera hash de segurança
  const dataString = `${poiId}-${qrData.timestamp}-${poi.lat}-${poi.lng}`;
  qrData.hash = CryptoJS.HmacSHA256(dataString, SECRET_KEY).toString();

  return JSON.stringify(qrData);
}

/**
 * Valida um QR Code e verifica se o usuário está no local correto
 */
export function validateQRCode(
  qrCodeString: string, 
  userLocation: { lat: number; lng: number },
  userId: string
): CheckInResult {
  try {
    const qrData: QRCodeData = JSON.parse(qrCodeString);
    
    // 1. Verificar se o QR Code não expirou (válido por 24 horas)
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 horas
    if (now - qrData.timestamp > maxAge) {
      return {
        success: false,
        message: 'QR Code expirado. Solicite um novo código.'
      };
    }

    // 2. Verificar integridade do hash
    const poi = AUTHENTIC_POI_CACAPAVA.find(p => p.id === qrData.poiId);
    if (!poi) {
      return {
        success: false,
        message: 'Ponto turístico não encontrado.'
      };
    }

    const dataString = `${qrData.poiId}-${qrData.timestamp}-${poi.lat}-${poi.lng}`;
    const expectedHash = CryptoJS.HmacSHA256(dataString, SECRET_KEY).toString();
    
    if (qrData.hash !== expectedHash) {
      return {
        success: false,
        message: 'QR Code inválido ou falsificado.'
      };
    }

    // 3. Verificar proximidade geográfica (raio de 100 metros)
    const distance = calculateDistance(
      userLocation.lat, 
      userLocation.lng,
      qrData.location.lat,
      qrData.location.lng
    );

    if (distance > 100) { // 100 metros de tolerância
      return {
        success: false,
        message: `Você precisa estar mais próximo do ${poi.name}. Distância atual: ${Math.round(distance)}m`
      };
    }

    // 4. Verificar se já fez check-in recente (anti-spam)
    if (hasRecentCheckIn(userId, qrData.poiId)) {
      return {
        success: false,
        message: 'Você já fez check-in neste local nas últimas 2 horas.'
      };
    }

    // 5. Check-in válido! Calcular pontos
    const points = calculatePoints(poi);
    const badge = checkForNewBadge(userId, qrData.poiId);

    // Registrar check-in
    recordCheckIn(userId, qrData.poiId, userLocation, points);

    return {
      success: true,
      message: `Check-in realizado com sucesso no ${poi.name}!`,
      points,
      badge
    };

  } catch (error) {
    return {
      success: false,
      message: 'QR Code inválido ou corrompido.'
    };
  }
}

/**
 * Calcula a distância entre duas coordenadas em metros
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371e3; // Raio da Terra em metros
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lng2-lng1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}

/**
 * Calcula pontos baseado no POI
 */
function calculatePoints(poi: any): number {
  // Usar os pontos já definidos no POI, ou calcular baseado no nome/descrição
  if (poi.points) {
    return poi.points;
  }

  // Calcular pontos baseado em palavras-chave
  const name = poi.name.toLowerCase();
  const description = poi.description.toLowerCase();
  
  let basePoints = 30; // Pontos base
  
  // Pontos extras por tipo de atração
  if (name.includes('forte') || name.includes('militar') || description.includes('histórico')) {
    basePoints += 20; // Patrimônio histórico
  }
  
  if (name.includes('igreja') || name.includes('matriz') || description.includes('religioso')) {
    basePoints += 15; // Patrimônio religioso
  }
  
  if (name.includes('minas') || description.includes('industrial')) {
    basePoints += 25; // Patrimônio industrial
  }
  
  if (name.includes('pedra') || name.includes('cascata') || description.includes('natural')) {
    basePoints += 20; // Patrimônio natural
  }
  
  return basePoints;
}

/**
 * Verifica se o usuário tem check-in recente no local
 */
function hasRecentCheckIn(userId: string, poiId: string): boolean {
  const checkIns = getStoredCheckIns(userId);
  const recentLimit = 2 * 60 * 60 * 1000; // 2 horas
  
  return checkIns.some(checkIn => 
    checkIn.poiId === poiId && 
    (Date.now() - checkIn.timestamp) < recentLimit
  );
}

/**
 * Registra o check-in no localStorage
 */
function recordCheckIn(userId: string, poiId: string, location: { lat: number; lng: number }, points: number): void {
  const checkIns = getStoredCheckIns(userId);
  
  const newCheckIn = {
    id: `checkin-${Date.now()}`,
    poiId,
    timestamp: Date.now(),
    location,
    points,
    verified: true
  };

  checkIns.push(newCheckIn);
  
  // Manter apenas os últimos 100 check-ins
  if (checkIns.length > 100) {
    checkIns.splice(0, checkIns.length - 100);
  }

  localStorage.setItem(`checkIns_${userId}`, JSON.stringify(checkIns));
  
  // Atualizar pontos totais do usuário
  updateUserPoints(userId, points);
}

/**
 * Recupera check-ins armazenados do usuário
 */
function getStoredCheckIns(userId: string): any[] {
  const stored = localStorage.getItem(`checkIns_${userId}`);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Atualiza pontos totais do usuário
 */
function updateUserPoints(userId: string, points: number): void {
  const currentPoints = parseInt(localStorage.getItem(`userPoints_${userId}`) || '0');
  const newTotal = currentPoints + points;
  localStorage.setItem(`userPoints_${userId}`, newTotal.toString());
}

/**
 * Verifica se o usuário ganhou uma nova medalha
 */
function checkForNewBadge(userId: string, poiId: string): string | undefined {
  const checkIns = getStoredCheckIns(userId);
  const userBadges = getUserBadges(userId);
  
  // Verificar medalhas por categoria
  const poi = AUTHENTIC_POI_CACAPAVA.find(p => p.id === poiId);
  if (!poi) return undefined;

  // Medalha de primeira visita
  if (checkIns.length === 1) {
    if (!userBadges.includes('primeiro-checkin')) {
      addUserBadge(userId, 'primeiro-checkin');
      return 'Primeira Aventura';
    }
  }

  // Medalha por tipo de local (baseado em palavras-chave)
  const categoryCheckIns = checkIns.filter(c => {
    const checkInPoi = AUTHENTIC_POI_CACAPAVA.find(p => p.id === c.poiId);
    if (!checkInPoi) return false;
    
    // Determinar categoria por palavras-chave
    const poiType = getPoiType(poi);
    const checkInPoiType = getPoiType(checkInPoi);
    
    return poiType === checkInPoiType;
  });

  if (categoryCheckIns.length >= 3) {
    const poiType = getPoiType(poi);
    const badgeKey = `categoria-${poiType}`;
    if (!userBadges.includes(badgeKey)) {
      addUserBadge(userId, badgeKey);
      return `Explorador ${poiType}`;
    }
  }

  return undefined;
}

/**
 * Determina o tipo de POI baseado em palavras-chave
 */
function getPoiType(poi: any): string {
  const name = poi.name.toLowerCase();
  const description = poi.description.toLowerCase();
  
  if (name.includes('forte') || name.includes('militar') || description.includes('histórico')) {
    return 'Histórico';
  }
  
  if (name.includes('igreja') || name.includes('matriz') || description.includes('religioso')) {
    return 'Religioso';
  }
  
  if (name.includes('minas') || description.includes('industrial')) {
    return 'Industrial';
  }
  
  if (name.includes('pedra') || name.includes('cascata') || description.includes('natural')) {
    return 'Natural';
  }
  
  return 'Cultural';
}

/**
 * Recupera medalhas do usuário
 */
function getUserBadges(userId: string): string[] {
  const stored = localStorage.getItem(`userBadges_${userId}`);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Adiciona nova medalha ao usuário
 */
function addUserBadge(userId: string, badgeKey: string): void {
  const badges = getUserBadges(userId);
  if (!badges.includes(badgeKey)) {
    badges.push(badgeKey);
    localStorage.setItem(`userBadges_${userId}`, JSON.stringify(badges));
  }
}

/**
 * Exporta dados de check-in para analytics
 */
export function getCheckInAnalytics(userId: string) {
  const checkIns = getStoredCheckIns(userId);
  const totalPoints = parseInt(localStorage.getItem(`userPoints_${userId}`) || '0');
  const badges = getUserBadges(userId);

  return {
    totalCheckIns: checkIns.length,
    totalPoints,
    badges: badges.length,
    lastCheckIn: checkIns.length > 0 ? checkIns[checkIns.length - 1] : null,
    visitedPOIs: [...new Set(checkIns.map(c => c.poiId))].length
  };
}
