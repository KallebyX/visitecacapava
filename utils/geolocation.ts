// Validação geográfica para Caçapava do Sul (RS)
// BBOX oficial baseado em dados do IBGE e coordenadas municipais

// BBOX Caçapava do Sul (RS) - fonte IBGE/paintmaps
const CACAPAVA_BBOX = {
  minLat: -30.968529,
  maxLat: -30.138805,
  minLng: -53.821469,
  maxLng: -53.169939
};

// Centro de referência para mapas e zoom inicial
export const CACAPAVA_CENTER = {
  lat: -30.516,
  lng: -53.487
};

// Raio de captura configurável para descobrir POIs (em metros)
export const DISCOVERY_RADIUS = 60; // metros
export const CHECKIN_RADIUS = 75; // metros para check-in

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Verifica se coordenadas estão dentro do BBOX de Caçapava do Sul
 */
export function insideBBox(lat: number, lng: number): boolean {
  return lat >= CACAPAVA_BBOX.minLat && 
         lat <= CACAPAVA_BBOX.maxLat && 
         lng >= CACAPAVA_BBOX.minLng && 
         lng <= CACAPAVA_BBOX.maxLng;
}

/**
 * Validação robusta contra polígono municipal (fallback para BBOX)
 * Implementa algoritmo ray casting para point-in-polygon
 */
export function insideMunicipalityPolygon(lat: number, lng: number, polygon: number[][]): boolean {
  if (polygon.length === 0) {
    // Fallback para BBOX se polígono não disponível
    return insideBBox(lat, lng);
  }

  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][1], yi = polygon[i][0];
    const xj = polygon[j][1], yj = polygon[j][0];
    const intersect = ((yi > lat) !== (yj > lat)) && 
                      (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Middleware de validação para criação/edição de dados
 */
export function assertInsideMunicipality(lat: number, lng: number): void {
  if (!insideBBox(lat, lng)) {
    throw new Error('INVALID_LOCATION: Coordenadas fora do município de Caçapava do Sul (RS)');
  }
}

/**
 * Calcula distância entre duas coordenadas usando fórmula de Haversine
 */
export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371000; // Raio da Terra em metros
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
  const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
            
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distância em metros
}

/**
 * Verifica se usuário está dentro do raio de descoberta
 */
export function withinDiscoveryRadius(userPos: Coordinates, poiPos: Coordinates): boolean {
  return calculateDistance(userPos, poiPos) <= DISCOVERY_RADIUS;
}

/**
 * Verifica se usuário está dentro do raio de check-in
 */
export function withinCheckinRadius(userPos: Coordinates, poiPos: Coordinates): boolean {
  return calculateDistance(userPos, poiPos) <= CHECKIN_RADIUS;
}

/**
 * Filtra array de POIs/restaurantes/eventos para manter apenas os do município
 */
export function filterByMunicipality<T extends { lat: number; lng: number }>(items: T[]): T[] {
  return items.filter(item => insideBBox(item.lat, item.lng));
}

/**
 * Detecta e bloqueia dados de Caçapava (SP) ou outros municípios
 */
export function isCacapavaSP(name: string, address?: string): boolean {
  const nameCheck = name.toLowerCase().includes('caçapava') && 
                   (name.toLowerCase().includes('sp') || name.toLowerCase().includes('são paulo'));
  
  const addressCheck = address ? 
    (address.toLowerCase().includes('são paulo') || address.toLowerCase().includes('sp')) : false;
    
  return nameCheck || addressCheck;
}

/**
 * Valida se um endereço/nome se refere especificamente a Caçapava do Sul (RS)
 */
export function isCacapavaDoSul(name: string, address?: string): boolean {
  const nameCheck = name.toLowerCase().includes('caçapava') && 
                   (name.toLowerCase().includes('sul') || name.toLowerCase().includes('rs'));
  
  const addressCheck = address ? 
    (address.toLowerCase().includes('rio grande do sul') || 
     address.toLowerCase().includes('rs') ||
     address.toLowerCase().includes('sul')) : true;
    
  return nameCheck || addressCheck;
}

/**
 * Gera BBOX expandido para visualização no mapa
 */
export function getMapBounds() {
  return {
    southwest: { lat: CACAPAVA_BBOX.minLat, lng: CACAPAVA_BBOX.minLng },
    northeast: { lat: CACAPAVA_BBOX.maxLat, lng: CACAPAVA_BBOX.maxLng }
  };
}

/**
 * Configurações do mapa para Caçapava do Sul
 */
export const MAP_CONFIG = {
  center: CACAPAVA_CENTER,
  zoom: 13,
  minZoom: 11,
  maxZoom: 18,
  bounds: getMapBounds()
};
