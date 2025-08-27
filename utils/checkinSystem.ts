// Sistema de QR Code seguro e check-in por proximidade
// Usando Web Crypto API para compatibilidade com navegador

// Configurações de segurança
const QR_SECRET = 'cacapava_qr_secret_2024';
const CHECKIN_COOLDOWN = 30 * 60 * 1000; // 30 minutos em ms
const MAX_CHECKINS_PER_DAY = 20; // Rate limiting

// Função auxiliar para gerar bytes aleatórios
function generateRandomBytes(length: number): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Função auxiliar para criar HMAC usando Web Crypto API
async function createHMAC(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  return Array.from(new Uint8Array(signature), byte => byte.toString(16).padStart(2, '0')).join('');
}

export interface CheckinData {
  userId: string;
  poiId: string;
  timestamp: number;
  type: 'proximity' | 'qr';
  coordinates: {
    lat: number;
    lng: number;
  };
  deviceInfo?: string;
}

export interface QRPayload {
  poiId: string;
  nonce: string;
  timestamp: number;
  signature: string;
}

/**
 * Gera QR Code assinado para um POI
 */
export async function generateSecureQR(poiId: string): Promise<string> {
  const timestamp = Date.now();
  const nonce = generateRandomBytes(8);
  const payload = `${poiId}:${nonce}:${timestamp}`;
  const signature = await createHMAC(payload, QR_SECRET);
  
  const qrData = {
    poiId,
    nonce,
    timestamp,
    signature
  };
  
  // Formato: VC:{poiId}:{nonce}:{timestamp}:{signature}
  return `VC:${poiId}:${nonce}:${timestamp}:${signature}`;
}

/**
 * Valida QR Code assinado
 */
export async function validateQR(qrString: string): Promise<{ valid: boolean; poiId?: string; error?: string }> {
  try {
    if (!qrString.startsWith('VC:')) {
      return { valid: false, error: 'Formato de QR inválido' };
    }
    
    const parts = qrString.substring(3).split(':');
    if (parts.length !== 4) {
      return { valid: false, error: 'QR malformado' };
    }
    
    const [poiId, nonce, timestamp, signature] = parts;
    
    // Verifica expiração (QR válido por 24 horas)
    const qrAge = Date.now() - parseInt(timestamp);
    if (qrAge > 24 * 60 * 60 * 1000) {
      return { valid: false, error: 'QR expirado' };
    }
    
    // Verifica assinatura
    const payload = `${poiId}:${nonce}:${timestamp}`;
    const expectedSignature = await createHMAC(payload, QR_SECRET);
    
    if (signature !== expectedSignature) {
      return { valid: false, error: 'Assinatura inválida' };
    }
    
    return { valid: true, poiId };
  } catch (error) {
    return { valid: false, error: 'Erro ao validar QR' };
  }
}

/**
 * Verifica cooldown entre check-ins
 */
export function checkCooldown(userId: string, lastCheckin: Date): boolean {
  const timeSinceLastCheckin = Date.now() - lastCheckin.getTime();
  return timeSinceLastCheckin >= CHECKIN_COOLDOWN;
}

/**
 * Verifica rate limiting diário
 */
export function checkDailyLimit(checkinsToday: number): boolean {
  return checkinsToday < MAX_CHECKINS_PER_DAY;
}

/**
 * Calcula XP baseado no tipo de check-in
 */
export function calculateXP(checkinType: 'proximity' | 'qr', isFirstVisit: boolean = false): number {
  let baseXP = 0;
  
  switch (checkinType) {
    case 'proximity':
      baseXP = 10;
      break;
    case 'qr':
      baseXP = 25; // Bônus por confirmação física
      break;
  }
  
  // Bônus para primeira visita
  if (isFirstVisit) {
    baseXP *= 2;
  }
  
  return baseXP;
}

/**
 * Valida anti-fraude para check-ins
 */
export function validateCheckinIntegrity(checkinData: CheckinData): { valid: boolean; error?: string } {
  // Verificar se coordenadas estão dentro de Caçapava do Sul
  if (!insideBBox(checkinData.coordinates.lat, checkinData.coordinates.lng)) {
    return { valid: false, error: 'Check-in fora do município' };
  }
  
  // Verificar se timestamp é recente (máximo 5 minutos de diferença)
  const timeDiff = Math.abs(Date.now() - checkinData.timestamp);
  if (timeDiff > 5 * 60 * 1000) {
    return { valid: false, error: 'Timestamp inválido' };
  }
  
  return { valid: true };
}

// Import da função de validação geográfica
import { insideBBox } from './geolocation';

/**
 * Estrutura para controle de check-ins no localStorage/sessionStorage
 */
export interface CheckinHistory {
  userId: string;
  checkins: {
    [poiId: string]: {
      lastCheckin: string; // ISO date string
      count: number;
      firstVisit: string; // ISO date string
    };
  };
  dailyCount: {
    [date: string]: number; // YYYY-MM-DD format
  };
}

/**
 * Obtém histórico de check-ins do storage local
 */
export function getCheckinHistory(userId: string): CheckinHistory {
  const stored = localStorage.getItem(`checkin_history_${userId}`);
  if (stored) {
    return JSON.parse(stored);
  }
  
  return {
    userId,
    checkins: {},
    dailyCount: {}
  };
}

/**
 * Salva histórico de check-ins no storage local
 */
export function saveCheckinHistory(history: CheckinHistory): void {
  localStorage.setItem(`checkin_history_${history.userId}`, JSON.stringify(history));
}

/**
 * Registra novo check-in no histórico
 */
export function recordCheckin(userId: string, poiId: string): void {
  const history = getCheckinHistory(userId);
  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toISOString();
  
  // Atualizar contador diário
  history.dailyCount[today] = (history.dailyCount[today] || 0) + 1;
  
  // Atualizar histórico do POI
  if (!history.checkins[poiId]) {
    history.checkins[poiId] = {
      lastCheckin: now,
      count: 1,
      firstVisit: now
    };
  } else {
    history.checkins[poiId].lastCheckin = now;
    history.checkins[poiId].count++;
  }
  
  saveCheckinHistory(history);
}

/**
 * Verifica se usuário pode fazer check-in em um POI
 */
export function canCheckin(userId: string, poiId: string): { 
  canCheckin: boolean; 
  reason?: string; 
  cooldownRemaining?: number;
} {
  const history = getCheckinHistory(userId);
  const today = new Date().toISOString().split('T')[0];
  
  // Verificar limite diário
  const todayCount = history.dailyCount[today] || 0;
  if (todayCount >= MAX_CHECKINS_PER_DAY) {
    return { canCheckin: false, reason: 'Limite diário de check-ins atingido' };
  }
  
  // Verificar cooldown para este POI
  const poiHistory = history.checkins[poiId];
  if (poiHistory) {
    const lastCheckin = new Date(poiHistory.lastCheckin);
    const timeSinceLastCheckin = Date.now() - lastCheckin.getTime();
    
    if (timeSinceLastCheckin < CHECKIN_COOLDOWN) {
      const remaining = CHECKIN_COOLDOWN - timeSinceLastCheckin;
      return { 
        canCheckin: false, 
        reason: 'Aguarde antes de fazer check-in novamente neste local',
        cooldownRemaining: remaining
      };
    }
  }
  
  return { canCheckin: true };
}

/**
 * Formata tempo de cooldown em string legível
 */
export function formatCooldown(ms: number): string {
  const minutes = Math.ceil(ms / (60 * 1000));
  if (minutes < 60) {
    return `${minutes} minuto${minutes !== 1 ? 's' : ''}`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hora${hours !== 1 ? 's' : ''}`;
  }
  
  return `${hours}h ${remainingMinutes}min`;
}
