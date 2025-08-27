// Rotas temáticas interativas para gamificação
import { PointOfInterest } from '../types';

export interface RouteStep {
  poi: PointOfInterest;
  order: number;
  distanceToNext?: number; // em metros
  estimatedTime?: number; // em minutos
  description: string;
  hint?: string; // dica para encontrar o próximo ponto
}

export interface ThematicRoute {
  id: string;
  name: string;
  description: string;
  category: 'historica' | 'natural' | 'gastronomica' | 'cultural';
  difficulty: 'facil' | 'medio' | 'dificil';
  estimatedDuration: number; // em minutos
  totalDistance: number; // em metros
  rewards: {
    points: number;
    badge?: string;
    unlocks?: string[]; // IDs de outras rotas desbloqueadas
  };
  steps: RouteStep[];
  color: string; // cor da rota no mapa
  icon: string;
  isActive?: boolean;
  requirements?: string[]; // badges necessários para desbloquear
}

// Rotas temáticas predefinidas
export const THEMATIC_ROUTES: ThematicRoute[] = [
  {
    id: 'rota-historica-centro',
    name: 'Patrimônio Histórico Central',
    description: 'Explore o centro histórico de Caçapava do Sul e descubra os marcos que contam a história da cidade.',
    category: 'historica',
    difficulty: 'facil',
    estimatedDuration: 120, // 2 horas
    totalDistance: 2500, // 2.5km
    color: '#8B4513', // marrom histórico
    icon: '🏛️',
    isActive: true,
    rewards: {
      points: 500,
      badge: 'Guardião da História',
      unlocks: ['rota-historica-avancada']
    },
    steps: [
      {
        poi: {
          id: 'praca-redemocao',
          name: 'Praça da Redemoção',
          lat: -30.5089,
          lng: -53.4914,
          description: 'Marco central da cidade',
          longDescription: 'Marco central da cidade, ponto de encontro tradicional dos moradores locais',
          imageUrl: '/img/logo/VisiteCacapavaSimbolo.png',
          points: 50
        },
        order: 1,
        distanceToNext: 300,
        estimatedTime: 15,
        description: 'Comece sua jornada histórica no coração de Caçapava do Sul',
        hint: 'Procure pelo monumento próximo à igreja matriz'
      },
      {
        poi: {
          id: 'igreja-matriz',
          name: 'Igreja Matriz São João Batista',
          lat: -30.5095,
          lng: -53.4918,
          description: 'Principal templo religioso da cidade',
          longDescription: 'Principal templo religioso da cidade, construído no século XIX',
          imageUrl: '/img/pontos_turisticos/IgrejaMatriz.jpg',
          points: 75
        },
        order: 2,
        distanceToNext: 450,
        estimatedTime: 20,
        description: 'Visite a igreja que acompanha a história da cidade desde sua fundação',
        hint: 'Siga pela rua principal até encontrar o antigo prédio da prefeitura'
      },
      {
        poi: {
          id: 'museu-municipal',
          name: 'Museu Municipal',
          lat: -30.5102,
          lng: -53.4925,
          description: 'Acervo histórico local',
          longDescription: 'Museu que preserva a história e cultura local com acervo rico em objetos históricos',
          imageUrl: '/img/pontos_turisticos/MuseuLanceirosNegros.png',
          points: 100
        },
        order: 3,
        distanceToNext: 600,
        estimatedTime: 30,
        description: 'Explore o acervo que preserva a memória local',
        hint: 'Caminhe em direção ao mercado público histórico'
      },
      {
        poi: {
          id: 'mercado-publico',
          name: 'Mercado Público Municipal',
          lat: -30.5085,
          lng: -53.4932,
          description: 'Centro comercial histórico',
          longDescription: 'Centro comercial histórico onde a comunidade se reúne há décadas',
          imageUrl: '/img/logo/VisiteCacapavaSimbolo.png',
          points: 75
        },
        order: 4,
        estimatedTime: 25,
        description: 'Finalize conhecendo onde a comunidade se reúne há décadas para o comércio local'
      }
    ]
  },
  
  {
    id: 'rota-natural-guaritas',
    name: 'Maravilhas Naturais das Guaritas',
    description: 'Aventure-se pelas formações rochosas únicas e descubra a beleza natural preservada.',
    category: 'natural',
    difficulty: 'medio',
    estimatedDuration: 180, // 3 horas
    totalDistance: 4200, // 4.2km
    color: '#228B22', // verde natureza
    icon: '🌿',
    isActive: true,
    rewards: {
      points: 750,
      badge: 'Eco-Aventureiro',
      unlocks: ['rota-natural-avancada']
    },
    steps: [
      {
        poi: {
          id: 'guaritas-entrada',
          name: 'Portal de Entrada das Guaritas',
          lat: -30.5200,
          lng: -53.4800,
          description: 'Entrada oficial do complexo das Guaritas',
          longDescription: 'Portal de entrada oficial para o complexo natural das Guaritas do Camaquã',
          imageUrl: '/img/pontos_turisticos/MinasCamaqua2.png',
          points: 75
        },
        order: 1,
        distanceToNext: 800,
        estimatedTime: 10,
        description: 'Inicie sua jornada natural no portal oficial das Guaritas',
        hint: 'Siga a trilha principal até a primeira formação rochosa visível'
      },
      {
        poi: {
          id: 'guarita-cathedral',
          name: 'Guarita da Catedral',
          lat: -30.5180,
          lng: -53.4785,
          description: 'Formação rochosa imponente',
          longDescription: 'Formação rochosa majestosa que lembra uma catedral natural esculpida pelo tempo',
          imageUrl: '/img/pontos_turisticos/pedradosegredo.png',
          points: 150
        },
        order: 2,
        distanceToNext: 1200,
        estimatedTime: 40,
        description: 'Contemple a majestosa formação que lembra uma catedral natural',
        hint: 'Continue pela trilha até encontrar o mirante panorâmico'
      },
      {
        poi: {
          id: 'mirante-guaritas',
          name: 'Mirante das Guaritas',
          lat: -30.5165,
          lng: -53.4770,
          description: 'Vista panorâmica das formações',
          longDescription: 'Mirante com vista panorâmica espetacular de todas as formações rochosas da região',
          imageUrl: '/img/pontos_turisticos/PedranaCruz2.png',
          points: 125
        },
        order: 3,
        distanceToNext: 900,
        estimatedTime: 30,
        description: 'Aprecie a vista panorâmica das formações rochosas únicas',
        hint: 'Desça pela trilha alternativa até a área de preservação'
      },
      {
        poi: {
          id: 'area-preservacao',
          name: 'Área de Preservação Ambiental',
          lat: -30.5145,
          lng: -53.4755,
          description: 'Zona de conservação da flora local',
          longDescription: 'Área especialmente protegida para conservação da biodiversidade e flora nativa',
          imageUrl: '/img/pontos_turisticos/cascata.png',
          points: 100
        },
        order: 4,
        estimatedTime: 60,
        description: 'Conheça os esforços de preservação da biodiversidade local'
      }
    ]
  },

  {
    id: 'rota-gastronomica-azeites',
    name: 'Sabores de Caçapava: Tour dos Azeites',
    description: 'Deguste os azeites premiados e descubra os sabores únicos da região.',
    category: 'gastronomica',
    difficulty: 'facil',
    estimatedDuration: 150, // 2.5 horas
    totalDistance: 3500, // 3.5km
    color: '#FFD700', // dourado gourmet
    icon: '🫒',
    isActive: true,
    rewards: {
      points: 600,
      badge: 'Mestre do Azeite',
      unlocks: ['rota-gastronomica-restaurantes']
    },
    steps: [
      {
        poi: {
          id: 'olivais-entrada',
          name: 'Olivais de Caçapava - Recepção',
          lat: -30.5300,
          lng: -53.4600,
          description: 'Centro de visitação dos olivais',
          longDescription: 'Centro de recepção e visitação dos famosos olivais que produzem azeites premiados',
          imageUrl: '/img/logo/VisiteCacapavaSimbolo.png',
          points: 50
        },
        order: 1,
        distanceToNext: 400,
        estimatedTime: 20,
        description: 'Comece conhecendo a história do cultivo de oliveiras na região',
        hint: 'Siga o caminho entre as oliveiras até a primeira área de degustação'
      },
      {
        poi: {
          id: 'degustacao-premium',
          name: 'Sala de Degustação Premium',
          lat: -30.5285,
          lng: -53.4590,
          description: 'Degustação dos azeites premiados',
          longDescription: 'Sala especial para degustação dos azeites extra virgem premiados internacionalmente',
          imageUrl: '/img/logo/VisiteCacapavaSimbolo.png',
          points: 125
        },
        order: 2,
        distanceToNext: 600,
        estimatedTime: 45,
        description: 'Prove os azeites extra virgem que conquistaram prêmios internacionais',
        hint: 'Continue até a área de produção para ver o processo de extração'
      },
      {
        poi: {
          id: 'fabrica-azeites',
          name: 'Fábrica de Azeites',
          lat: -30.5270,
          lng: -53.4575,
          description: 'Processo de produção dos azeites',
          longDescription: 'Fábrica onde acontece o processo artesanal de produção dos azeites premiados',
          imageUrl: '/img/logo/VisiteCacapavaSimbolo.png',
          points: 100
        },
        order: 3,
        distanceToNext: 500,
        estimatedTime: 30,
        description: 'Acompanhe o processo artesanal de produção dos azeites',
        hint: 'Finalize na loja onde pode adquirir os produtos diretamente do produtor'
      },
      {
        poi: {
          id: 'loja-azeites',
          name: 'Loja dos Produtores',
          lat: -30.5255,
          lng: -53.4560,
          description: 'Loja oficial dos azeites locais',
          longDescription: 'Loja oficial onde é possível adquirir os azeites e produtos diretamente dos produtores',
          imageUrl: '/img/logo/VisiteCacapavaSimbolo.png',
          points: 75
        },
        order: 4,
        estimatedTime: 30,
        description: 'Leve para casa os sabores autênticos de Caçapava do Sul'
      }
    ]
  },

  {
    id: 'rota-cultural-tradicoes',
    name: 'Tradições e Cultura Gaucha',
    description: 'Mergulhe nas tradições gaúchas e conheça a cultura local preservada.',
    category: 'cultural',
    difficulty: 'medio',
    estimatedDuration: 200, // 3h20min
    totalDistance: 4800, // 4.8km
    color: '#DC143C', // vermelho cultural
    icon: '🎭',
    isActive: true,
    requirements: ['Guardião da História'], // precisa completar rota histórica primeiro
    rewards: {
      points: 800,
      badge: 'Embaixador da Cultura',
      unlocks: ['rota-cultural-avancada']
    },
    steps: [
      {
        poi: {
          id: 'ctg-tradicional',
          name: 'CTG Farroupilha',
          lat: -30.5120,
          lng: -53.4850,
          description: 'Centro de Tradições Gaúchas',
          longDescription: 'Centro de Tradições Gaúchas onde são preservadas e praticadas as tradições locais',
          imageUrl: '/img/logo/logo-cacapava.png',
          points: 100
        },
        order: 1,
        distanceToNext: 700,
        estimatedTime: 40,
        description: 'Conheça as tradições gaúchas preservadas pelo CTG local',
        hint: 'Siga em direção ao memorial da revolução farroupilha'
      },
      {
        poi: {
          id: 'memorial-farroupilha',
          name: 'Memorial da Revolução Farroupilha',
          lat: -30.5105,
          lng: -53.4835,
          description: 'Monumento histórico da revolução',
          longDescription: 'Memorial dedicado à Revolução Farroupilha e aos heróis que lutaram pela república',
          imageUrl: '/img/logo/VisiteCacapavaSimbolo.png',
          points: 125
        },
        order: 2,
        distanceToNext: 850,
        estimatedTime: 35,
        description: 'Relembre a história da Revolução Farroupilha',
        hint: 'Caminhe até a casa de cultura para conhecer o artesanato local'
      },
      {
        poi: {
          id: 'casa-cultura',
          name: 'Casa de Cultura Municipal',
          lat: -30.5090,
          lng: -53.4820,
          description: 'Centro cultural e artesanato',
          longDescription: 'Espaço dedicado à cultura local, artesanato e manifestações artísticas da região',
          imageUrl: '/img/logo/VisiteCacapavaSimbolo.png',
          points: 150
        },
        order: 3,
        distanceToNext: 600,
        estimatedTime: 50,
        description: 'Explore o artesanato e manifestações culturais locais',
        hint: 'Termine no anfiteatro onde acontecem as apresentações culturais'
      },
      {
        poi: {
          id: 'anfiteatro-municipal',
          name: 'Anfiteatro Municipal',
          lat: -30.5075,
          lng: -53.4805,
          description: 'Espaço de eventos culturais',
          longDescription: 'Anfiteatro municipal onde acontecem apresentações culturais e eventos da cidade',
          imageUrl: '/img/logo/VisiteCacapavaSimbolo.png',
          points: 100
        },
        order: 4,
        estimatedTime: 45,
        description: 'Local onde a cultura local ganha vida através de apresentações'
      }
    ]
  }
];

// Função para calcular distância entre dois pontos
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371e3; // Raio da Terra em metros
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lng2-lng1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // Distância em metros
}

// Função para verificar se uma rota está desbloqueada para um usuário
export function isRouteUnlocked(route: ThematicRoute, userBadges: string[]): boolean {
  if (!route.requirements || route.requirements.length === 0) {
    return true;
  }
  
  return route.requirements.every(requirement => userBadges.includes(requirement));
}

// Função para obter a próxima etapa de uma rota
export function getNextRouteStep(route: ThematicRoute, completedSteps: string[]): RouteStep | null {
  const nextStep = route.steps.find(step => 
    !completedSteps.includes(step.poi.id)
  );
  
  return nextStep || null;
}

// Função para calcular progresso de uma rota
export function calculateRouteProgress(route: ThematicRoute, completedSteps: string[]): number {
  const completed = route.steps.filter(step => 
    completedSteps.includes(step.poi.id)
  ).length;
  
  return (completed / route.steps.length) * 100;
}

// Função para verificar se uma rota foi completada
export function isRouteCompleted(route: ThematicRoute, completedSteps: string[]): boolean {
  return route.steps.every(step => 
    completedSteps.includes(step.poi.id)
  );
}
