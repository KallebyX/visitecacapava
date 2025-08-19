// Sistema de rotas gamificadas estilo Pokémon GO
import { Coordinates, calculateDistance, insideBBox } from './geolocation';

export interface RoutePoint {
  id: string;
  name: string;
  category: 'historia' | 'natureza' | 'gastronomia' | 'familia';
  coordinates: Coordinates;
  description: string;
  difficulty: 'facil' | 'medio' | 'dificil';
  estimatedTime: number; // minutos
  xpReward: number;
  visited?: boolean;
  discoverable?: boolean; // se está no raio de descoberta
}

export interface GameRoute {
  id: string;
  name: string;
  description: string;
  points: RoutePoint[];
  totalDistance: number; // metros
  estimatedDuration: number; // minutos
  difficulty: 'facil' | 'medio' | 'dificil';
  xpReward: number;
  category: string;
  isActive: boolean;
  progress: number; // 0-100
  completedAt?: Date;
}

export interface RouteMission {
  id: string;
  title: string;
  description: string;
  type: 'category_diversity' | 'route_completion' | 'daily_streak' | 'exploration';
  requirements: {
    categoriesRequired?: string[];
    routesRequired?: string[];
    consecutiveDays?: number;
    poisRequired?: number;
  };
  reward: {
    xp: number;
    badge?: string;
    title?: string;
  };
  progress: number; // 0-100
  completed: boolean;
  deadline?: Date;
}

/**
 * POIs âncora de Caçapava do Sul para seeds e rotas temáticas
 */
export const ANCHOR_POIS: RoutePoint[] = [
  {
    id: 'pedra-do-segredo',
    name: 'Pedra do Segredo',
    category: 'natureza',
    coordinates: { lat: -30.5089, lng: -53.4821 },
    description: 'Formação rochosa única que equilibra toneladas em equilíbrio perfeito',
    difficulty: 'medio',
    estimatedTime: 45,
    xpReward: 50
  },
  {
    id: 'guaritas',
    name: 'Parque das Guaritas',
    category: 'natureza',
    coordinates: { lat: -30.5234, lng: -53.4567 },
    description: 'Formações rochosas de 550 milhões de anos com paisagens deslumbrantes',
    difficulty: 'medio',
    estimatedTime: 90,
    xpReward: 75
  },
  {
    id: 'forte-dom-pedro-ii',
    name: 'Forte Dom Pedro II',
    category: 'historia',
    coordinates: { lat: -30.5156, lng: -53.4912 },
    description: 'Forte histórico da época imperial, testemunho da Revolução Farroupilha',
    difficulty: 'facil',
    estimatedTime: 30,
    xpReward: 40
  },
  {
    id: 'minas-camaqua',
    name: 'Minas do Camaquã',
    category: 'historia',
    coordinates: { lat: -30.5291, lng: -53.5123 },
    description: 'Complexo minerário histórico com mais de 150 anos de atividade',
    difficulty: 'dificil',
    estimatedTime: 120,
    xpReward: 100
  },
  {
    id: 'casa-borges-medeiros',
    name: 'Casa de Borges de Medeiros',
    category: 'historia',
    coordinates: { lat: -30.5134, lng: -53.4889 },
    description: 'Residência histórica do importante político gaúcho',
    difficulty: 'facil',
    estimatedTime: 25,
    xpReward: 35
  }
];

/**
 * Rotas temáticas pré-definidas
 */
export const THEMED_ROUTES: Partial<GameRoute>[] = [
  {
    id: 'rota-historia',
    name: 'Rota Histórica Farroupilha',
    description: 'Explore os locais que marcaram a história de Caçapava do Sul',
    category: 'historia',
    difficulty: 'medio'
  },
  {
    id: 'rota-geodiversidade',
    name: 'Rota da Geodiversidade',
    description: 'Descubra formações geológicas únicas de milhões de anos',
    category: 'natureza',
    difficulty: 'dificil'
  },
  {
    id: 'rota-centro',
    name: 'Centro Histórico',
    description: 'Conheça o coração cultural e arquitetônico da cidade',
    category: 'familia',
    difficulty: 'facil'
  }
];

/**
 * Calcula distância total de uma rota
 */
export function calculateRouteDistance(points: RoutePoint[]): number {
  let totalDistance = 0;
  for (let i = 0; i < points.length - 1; i++) {
    totalDistance += calculateDistance(points[i].coordinates, points[i + 1].coordinates);
  }
  return totalDistance;
}

/**
 * Estima duração da rota baseada na distância e dificuldade dos pontos
 */
export function estimateRouteDuration(points: RoutePoint[]): number {
  let totalTime = 0;
  const distance = calculateRouteDistance(points);
  
  // Tempo de caminhada (velocidade média 4 km/h)
  const walkingTime = (distance / 1000) * 15; // minutos
  
  // Tempo de visita nos pontos
  const visitTime = points.reduce((sum, point) => sum + point.estimatedTime, 0);
  
  return Math.round(walkingTime + visitTime);
}

/**
 * Gera rota personalizada baseada no perfil do usuário
 */
export function generatePersonalizedRoute(
  userPreferences: {
    categories: string[];
    difficulty: 'facil' | 'medio' | 'dificil';
    timeAvailable: number; // minutos
    startLocation: Coordinates;
  },
  availablePOIs: RoutePoint[]
): GameRoute {
  
  // Filtrar POIs por preferências
  let filteredPOIs = availablePOIs.filter(poi => {
    return userPreferences.categories.includes(poi.category) &&
           poi.difficulty === userPreferences.difficulty &&
           insideBBox(poi.coordinates.lat, poi.coordinates.lng);
  });
  
  // Ordenar por distância do ponto inicial
  filteredPOIs.sort((a, b) => {
    const distA = calculateDistance(userPreferences.startLocation, a.coordinates);
    const distB = calculateDistance(userPreferences.startLocation, b.coordinates);
    return distA - distB;
  });
  
  // Selecionar POIs que cabem no tempo disponível
  const selectedPOIs: RoutePoint[] = [];
  let currentTime = 0;
  
  for (const poi of filteredPOIs) {
    const estimatedTime = poi.estimatedTime + 15; // +15 min para deslocamento
    if (currentTime + estimatedTime <= userPreferences.timeAvailable && selectedPOIs.length < 6) {
      selectedPOIs.push(poi);
      currentTime += estimatedTime;
    }
  }
  
  // Otimizar ordem dos POIs (algoritmo simples do vizinho mais próximo)
  const optimizedRoute = optimizeRouteOrder(selectedPOIs, userPreferences.startLocation);
  
  const routeId = `custom_${Date.now()}`;
  const totalDistance = calculateRouteDistance(optimizedRoute);
  const totalDuration = estimateRouteDuration(optimizedRoute);
  const totalXP = optimizedRoute.reduce((sum, poi) => sum + poi.xpReward, 0);
  
  return {
    id: routeId,
    name: 'Rota Personalizada',
    description: `Rota customizada com ${optimizedRoute.length} pontos de interesse`,
    points: optimizedRoute,
    totalDistance,
    estimatedDuration: totalDuration,
    difficulty: userPreferences.difficulty,
    xpReward: totalXP,
    category: 'personalizada',
    isActive: true,
    progress: 0
  };
}

/**
 * Otimiza ordem dos POIs usando algoritmo do vizinho mais próximo
 */
function optimizeRouteOrder(pois: RoutePoint[], startLocation: Coordinates): RoutePoint[] {
  if (pois.length <= 1) return pois;
  
  const optimized: RoutePoint[] = [];
  const remaining = [...pois];
  let currentLocation = startLocation;
  
  while (remaining.length > 0) {
    let nearestIndex = 0;
    let nearestDistance = calculateDistance(currentLocation, remaining[0].coordinates);
    
    for (let i = 1; i < remaining.length; i++) {
      const distance = calculateDistance(currentLocation, remaining[i].coordinates);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = i;
      }
    }
    
    const nearest = remaining.splice(nearestIndex, 1)[0];
    optimized.push(nearest);
    currentLocation = nearest.coordinates;
  }
  
  return optimized;
}

/**
 * Atualiza progresso da rota baseado nos check-ins
 */
export function updateRouteProgress(route: GameRoute, completedPOIs: string[]): GameRoute {
  const completedCount = route.points.filter(point => 
    completedPOIs.includes(point.id)
  ).length;
  
  const progress = Math.round((completedCount / route.points.length) * 100);
  
  return {
    ...route,
    progress,
    completedAt: progress === 100 ? new Date() : undefined,
    points: route.points.map(point => ({
      ...point,
      visited: completedPOIs.includes(point.id)
    }))
  };
}

/**
 * Verifica se usuário está próximo de algum POI da rota
 */
export function checkNearbyPOIs(
  userLocation: Coordinates, 
  route: GameRoute, 
  radius: number = 60
): RoutePoint[] {
  
  return route.points.filter(point => {
    const distance = calculateDistance(userLocation, point.coordinates);
    return distance <= radius && !point.visited;
  }).map(point => ({
    ...point,
    discoverable: true
  }));
}

/**
 * Gera coordenadas para polyline da rota
 */
export function generateRoutePolyline(points: RoutePoint[]): Coordinates[] {
  return points.map(point => point.coordinates);
}

/**
 * Missões diárias e semanais
 */
export const DAILY_MISSIONS: RouteMission[] = [
  {
    id: 'three-categories',
    title: 'Explorador Diverso',
    description: 'Visite 3 categorias diferentes de POIs hoje',
    type: 'category_diversity',
    requirements: {
      categoriesRequired: ['historia', 'natureza', 'gastronomia']
    },
    reward: {
      xp: 100,
      badge: 'diverso'
    },
    progress: 0,
    completed: false
  },
  {
    id: 'complete-route',
    title: 'Aventureiro Completo',
    description: 'Complete uma rota inteira hoje',
    type: 'route_completion',
    requirements: {
      routesRequired: ['any']
    },
    reward: {
      xp: 150,
      badge: 'aventureiro'
    },
    progress: 0,
    completed: false
  }
];

/**
 * Verifica progresso das missões
 */
export function updateMissionProgress(
  missions: RouteMission[],
  userActivity: {
    visitedCategories: string[];
    completedRoutes: string[];
    consecutiveDays: number;
    totalPOIs: number;
  }
): RouteMission[] {
  
  return missions.map(mission => {
    let progress = 0;
    
    switch (mission.type) {
      case 'category_diversity':
        if (mission.requirements.categoriesRequired) {
          const requiredCount = mission.requirements.categoriesRequired.length;
          const visitedCount = mission.requirements.categoriesRequired.filter(cat =>
            userActivity.visitedCategories.includes(cat)
          ).length;
          progress = Math.round((visitedCount / requiredCount) * 100);
        }
        break;
        
      case 'route_completion':
        progress = userActivity.completedRoutes.length > 0 ? 100 : 0;
        break;
        
      case 'daily_streak':
        if (mission.requirements.consecutiveDays) {
          progress = Math.min(
            (userActivity.consecutiveDays / mission.requirements.consecutiveDays) * 100,
            100
          );
        }
        break;
        
      case 'exploration':
        if (mission.requirements.poisRequired) {
          progress = Math.min(
            (userActivity.totalPOIs / mission.requirements.poisRequired) * 100,
            100
          );
        }
        break;
    }
    
    return {
      ...mission,
      progress,
      completed: progress >= 100
    };
  });
}

/**
 * Calcula bônus de XP para completar missões
 */
export function calculateMissionXP(mission: RouteMission): number {
  let bonusMultiplier = 1;
  
  if (mission.type === 'daily_streak') {
    bonusMultiplier = 1.5; // 50% bônus para streaks
  }
  
  return Math.round(mission.reward.xp * bonusMultiplier);
}
