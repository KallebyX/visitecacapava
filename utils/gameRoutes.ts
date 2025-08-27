import type { Route, PointOfInterest } from '../types';

// Tipos específicos para o jogo
export interface RoutePoint {
  id: string;
  name: string;
  description: string;
  coordinates: { lat: number; lng: number };
  category: string;
  estimatedTime: number;
  xpReward: number;
}

export interface GameRoute {
  id: string;
  name: string;
  points: RoutePoint[];
  estimatedDuration: number;
  xpReward: number;
  progress: number;
}

// Coordenadas base de Caçapava do Sul
const CACAPAVA_CENTER = { lat: -30.5119, lng: -53.4917 };

const generateCoordinates = (offsetLat: number, offsetLng: number) => ({
  lat: CACAPAVA_CENTER.lat + offsetLat,
  lng: CACAPAVA_CENTER.lng + offsetLng
});

// Rotas gamificadas básicas (compatível com o tipo Route)
export const GAME_ROUTES: Route[] = [
  {
    id: 'rota-historica-centro',
    name: 'Coração Histórico',
    description: 'Descubra os tesouros históricos do centro de Caçapava do Sul',
    pointsOfInterest: ['poi-igreja-matriz', 'poi-pedra-segredo', 'poi-guaritas'],
    imageUrl: '/img/pontos_turisticos/IgrejaMatriz.jpg'
  },
  {
    id: 'rota-natureza-aventura',
    name: 'Aventura Natural',
    description: 'Uma jornada pela natureza exuberante',
    pointsOfInterest: ['poi-pedra-segredo', 'poi-guaritas', 'poi-cascata-salso'],
    imageUrl: '/img/pontos_turisticos/pedradosegredo.png'
  }
];

// POIs para o jogo - usando estrutura personalizada
export const GAME_POIS_DATA: Array<{
  id: string;
  name: string;
  description: string;
  coordinates: { lat: number; lng: number };
  category: string;
  imageUrl: string;
  points: number;
  difficulty: string;
}> = [
  {
    id: 'poi-igreja-matriz',
    name: 'Igreja Matriz',
    description: 'Igreja histórica no coração de Caçapava',
    coordinates: generateCoordinates(0, 0.001),
    category: 'História',
    imageUrl: '/img/pontos_turisticos/IgrejaMatriz.jpg',
    points: 50,
    difficulty: 'Fácil'
  },
  {
    id: 'poi-pedra-segredo',
    name: 'Pedra do Segredo',
    description: 'Formação rochosa espetacular',
    coordinates: generateCoordinates(0.02, 0.015),
    category: 'Natureza',
    imageUrl: '/img/pontos_turisticos/pedradosegredo.png',
    points: 100,
    difficulty: 'Moderado'
  },
  {
    id: 'poi-guaritas',
    name: 'Guaritas do Camaquã',
    description: 'Formações rochosas milenares de arenito',
    coordinates: generateCoordinates(-0.32, 0),
    category: 'Natureza',
    imageUrl: '/img/pontos_turisticos/guaritas.png',
    points: 150,
    difficulty: 'Moderado'
  },
  {
    id: 'poi-cascata-salso',
    name: 'Cascata do Salso',
    description: 'Cachoeira deslumbrante com águas cristalinas',
    coordinates: generateCoordinates(0.15, -0.08),
    category: 'Natureza',
    imageUrl: '/img/pontos_turisticos/cascata.jpg',
    points: 120,
    difficulty: 'Difícil'
  },
  {
    id: 'poi-museu-lanceiros',
    name: 'Museu dos Lanceiros Negros',
    description: 'História da Revolução Farroupilha',
    coordinates: generateCoordinates(-0.005, 0.003),
    category: 'História',
    imageUrl: '/img/pontos_turisticos/museu.jpg',
    points: 80,
    difficulty: 'Fácil'
  }
];

// Configurações do jogo
export const GAME_CONFIG = {
  checkInRadius: { default: 50, precise: 30, extended: 100 },
  points: { checkIn: 10, firstVisit: 50, routeCompletion: 100 }
};

// Utilitários
export const GameUtils = {
  calculateDistance: (pos1: { lat: number; lng: number }, pos2: { lat: number; lng: number }): number => {
    const R = 6371e3;
    const φ1 = pos1.lat * Math.PI/180;
    const φ2 = pos2.lat * Math.PI/180;
    const Δφ = (pos2.lat-pos1.lat) * Math.PI/180;
    const Δλ = (pos2.lng-pos1.lng) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  isWithinCheckInRadius: (playerPos: { lat: number; lng: number }, poiPos: { lat: number; lng: number }, radius = 50): boolean => {
    return GameUtils.calculateDistance(playerPos, poiPos) <= radius;
  }
};

// Função para verificar POIs próximos
export const checkNearbyPOIs = (
  userLocation: { lat: number; lng: number }, 
  route: GameRoute, 
  radius = 100
): RoutePoint[] => {
  return route.points.filter(poi => 
    GameUtils.calculateDistance(userLocation, poi.coordinates) <= radius
  );
};

// Função para gerar polyline da rota
export const generateRoutePolyline = (points: RoutePoint[]): [number, number][] => {
  return points.map(point => [point.coordinates.lat, point.coordinates.lng]);
};

// Converter POIs personalizados para RoutePoints
export const convertPOIDataToRoutePoint = (poi: typeof GAME_POIS_DATA[0]): RoutePoint => ({
  id: poi.id,
  name: poi.name,
  description: poi.description,
  coordinates: poi.coordinates,
  category: poi.category,
  estimatedTime: 15, // tempo padrão em minutos
  xpReward: poi.points
});

// Rotas de jogo completas
export const FULL_GAME_ROUTES: GameRoute[] = [
  {
    id: 'rota-historica-centro',
    name: 'Coração Histórico',
    points: GAME_POIS_DATA
      .filter(poi => ['poi-igreja-matriz', 'poi-museu-lanceiros'].includes(poi.id))
      .map(convertPOIDataToRoutePoint),
    estimatedDuration: 120,
    xpReward: 150,
    progress: 0
  },
  {
    id: 'rota-natureza-aventura', 
    name: 'Aventura Natural',
    points: GAME_POIS_DATA
      .filter(poi => ['poi-pedra-segredo', 'poi-guaritas', 'poi-cascata-salso'].includes(poi.id))
      .map(convertPOIDataToRoutePoint),
    estimatedDuration: 240,
    xpReward: 300,
    progress: 0
  }
];

// ANCHOR_POIS para compatibilidade
export const ANCHOR_POIS = GAME_POIS_DATA.map(convertPOIDataToRoutePoint);

// Função para gerar rota personalizada
export const generatePersonalizedRoute = (
  interests: string[], 
  duration: number,
  difficulty: string
): GameRoute => {
  // Por enquanto, retorna uma rota padrão baseada nos interesses
  const routeId = interests.includes('história') ? 'rota-historica-centro' : 'rota-natureza-aventura';
  const baseRoute = FULL_GAME_ROUTES.find(r => r.id === routeId) || FULL_GAME_ROUTES[0];
  
  return {
    ...baseRoute,
    id: `personalized-${Date.now()}`,
    name: `Rota Personalizada - ${interests.join(', ')}`,
    estimatedDuration: duration
  };
};

// Função para atualizar progresso da rota
export const updateRouteProgress = (route: GameRoute, completedPOIs: string[]): GameRoute => {
  const totalPOIs = route.points.length;
  const completed = route.points.filter(poi => completedPOIs.includes(poi.id)).length;
  const progress = totalPOIs > 0 ? Math.round((completed / totalPOIs) * 100) : 0;
  
  return {
    ...route,
    progress
  };
};