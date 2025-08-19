// Dados seed dos POIs âncora de Caçapava do Sul (RS)
// Usados para inicialização do banco e rotas temáticas

import { assertInsideMunicipality } from './geolocation';

export interface SeedPOI {
  id: string;
  name: string;
  description: string;
  category: 'historia' | 'natureza' | 'gastronomia' | 'familia';
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  estimatedTime: number; // minutos
  difficulty: 'facil' | 'medio' | 'dificil';
  xpReward: number;
  features: string[];
  openingHours?: {
    [key: string]: string; // dia da semana -> horário
  };
  ticketPrice?: {
    adult: number;
    child: number;
    senior: number;
  };
  accessibility: string[];
  images: string[];
  qrCode?: string;
  historical_significance?: string;
  geological_info?: string;
  created_at: string;
  updated_at: string;
}

/**
 * POIs âncora oficiais de Caçapava do Sul
 * Validados geograficamente dentro do município
 */
export const ANCHOR_POIS: SeedPOI[] = [
  {
    id: 'pedra-do-segredo',
    name: 'Pedra do Segredo',
    description: 'Formação rochosa única que equilibra uma pedra de milhares de toneladas em um pequeno ponto de apoio. Uma das principais atrações geológicas de Caçapava do Sul, envolta em lendas e mistérios dos povos indígenas.',
    category: 'natureza',
    coordinates: {
      lat: -30.5089,
      lng: -53.4821
    },
    address: 'Estrada da Pedra do Segredo, Zona Rural, Caçapava do Sul - RS',
    estimatedTime: 45,
    difficulty: 'medio',
    xpReward: 50,
    features: [
      'Formação geológica única',
      'Mirante panorâmico',
      'Trilha interpretativa',
      'Área para piquenique',
      'Observação de fauna local'
    ],
    openingHours: {
      'segunda': '08:00-17:00',
      'terca': '08:00-17:00',
      'quarta': '08:00-17:00',
      'quinta': '08:00-17:00',
      'sexta': '08:00-17:00',
      'sabado': '08:00-18:00',
      'domingo': '08:00-18:00'
    },
    ticketPrice: {
      adult: 0, // Gratuito
      child: 0,
      senior: 0
    },
    accessibility: [
      'Estacionamento disponível',
      'Trilha de dificuldade média',
      'Não acessível para cadeirantes'
    ],
    images: [
      '/images/pois/pedra-segredo-1.jpg',
      '/images/pois/pedra-segredo-2.jpg',
      '/images/pois/pedra-segredo-panorama.jpg'
    ],
    geological_info: 'Granito de idade paleoproterozoica (cerca de 2 bilhões de anos), formado por processos magmáticos e posteriormente moldado por intemperismo diferencial.',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-08-19T00:00:00Z'
  },
  
  {
    id: 'guaritas-camaqua',
    name: 'Parque das Guaritas',
    description: 'Paisagens deslumbrantes formadas por arenitos e conglomerados de 550 milhões de anos. As formações rochosas se assemelham a guaritas ou sentinelas naturais, criando um cenário quase marciano único no Rio Grande do Sul.',
    category: 'natureza',
    coordinates: {
      lat: -30.5234,
      lng: -53.4567
    },
    address: 'RS-625, Km 15, Caçapava do Sul - RS',
    estimatedTime: 90,
    difficulty: 'medio',
    xpReward: 75,
    features: [
      'Formações rochosas únicas',
      'Trilhas interpretativas',
      'Mirantes naturais',
      'Área de camping',
      'Centro de visitantes'
    ],
    openingHours: {
      'segunda': '08:00-17:00',
      'terca': '08:00-17:00',
      'quarta': '08:00-17:00',
      'quinta': '08:00-17:00',
      'sexta': '08:00-17:00',
      'sabado': '08:00-18:00',
      'domingo': '08:00-18:00'
    },
    ticketPrice: {
      adult: 15,
      child: 7,
      senior: 7
    },
    accessibility: [
      'Centro de visitantes acessível',
      'Algumas trilhas adaptadas',
      'Estacionamento amplo'
    ],
    images: [
      '/images/pois/guaritas-1.jpg',
      '/images/pois/guaritas-2.jpg',
      '/images/pois/guaritas-sunset.jpg'
    ],
    geological_info: 'Arenitos e conglomerados da Formação Guaritas (Ediacarano), depositados em ambiente desértico há 550 milhões de anos.',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-08-19T00:00:00Z'
  },
  
  {
    id: 'forte-dom-pedro-ii',
    name: 'Forte Dom Pedro II',
    description: 'Fortaleza histórica construída em 1846 para defender a fronteira sul do Império Brasileiro. Testemunha da Revolução Farroupilha e importante marco da história militar gaúcha.',
    category: 'historia',
    coordinates: {
      lat: -30.5156,
      lng: -53.4912
    },
    address: 'Rua Coronel João Telles, Centro, Caçapava do Sul - RS',
    estimatedTime: 40,
    difficulty: 'facil',
    xpReward: 45,
    features: [
      'Museu militar',
      'Canhões históricos',
      'Vista panorâmica da cidade',
      'Acervo de armas antigas',
      'Guias especializados'
    ],
    openingHours: {
      'segunda': 'Fechado',
      'terca': '09:00-16:00',
      'quarta': '09:00-16:00',
      'quinta': '09:00-16:00',
      'sexta': '09:00-16:00',
      'sabado': '09:00-17:00',
      'domingo': '09:00-17:00'
    },
    ticketPrice: {
      adult: 10,
      child: 5,
      senior: 5
    },
    accessibility: [
      'Entrada principal acessível',
      'Banheiros adaptados',
      'Rampa de acesso'
    ],
    images: [
      '/images/pois/forte-1.jpg',
      '/images/pois/forte-canhoes.jpg',
      '/images/pois/forte-vista.jpg'
    ],
    historical_significance: 'Construído durante o período imperial para defesa das fronteiras sulinas, especialmente após a Revolução Farroupilha (1835-1845).',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-08-19T00:00:00Z'
  },
  
  {
    id: 'minas-camaqua',
    name: 'Minas do Camaquã',
    description: 'Complexo minerário histórico com mais de 150 anos de atividade na extração de cobre. Hoje transformado em ponto turístico que oferece uma paisagem quase lunar e fascinante viagem ao passado industrial.',
    category: 'historia',
    coordinates: {
      lat: -30.5291,
      lng: -53.5123
    },
    address: 'Distrito de Minas do Camaquã, Caçapava do Sul - RS',
    estimatedTime: 120,
    difficulty: 'dificil',
    xpReward: 100,
    features: [
      'Tour pelas instalações',
      'Museu da mineração',
      'Paisagens únicas',
      'Açude das minas',
      'Observação geológica'
    ],
    openingHours: {
      'segunda': '09:00-16:00',
      'terca': '09:00-16:00',
      'quarta': '09:00-16:00',
      'quinta': '09:00-16:00',
      'sexta': '09:00-16:00',
      'sabado': '09:00-17:00',
      'domingo': '09:00-17:00'
    },
    ticketPrice: {
      adult: 25,
      child: 12,
      senior: 12
    },
    accessibility: [
      'Tour adaptado disponível',
      'Veículo para transporte',
      'Equipamentos de segurança fornecidos'
    ],
    images: [
      '/images/pois/minas-1.jpg',
      '/images/pois/minas-acude.jpg',
      '/images/pois/minas-panorama.jpg'
    ],
    historical_significance: 'Ativa de 1865 a 1996, foi uma das principais minas de cobre do Brasil, produzindo cerca de 450.000 toneladas do metal.',
    geological_info: 'Depósitos de sulfetos de cobre em rochas vulcânicas do Complexo Metamórfico Cambaí (Neoproterozoico).',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-08-19T00:00:00Z'
  },
  
  {
    id: 'casa-borges-medeiros',
    name: 'Casa de Borges de Medeiros',
    description: 'Residência histórica onde nasceu Antônio Augusto Borges de Medeiros, importante político gaúcho que governou o Rio Grande do Sul por 25 anos (1898-1928). Hoje é museu com acervo sobre a história política gaúcha.',
    category: 'historia',
    coordinates: {
      lat: -30.5134,
      lng: -53.4889
    },
    address: 'Rua Borges de Medeiros, 42, Centro, Caçapava do Sul - RS',
    estimatedTime: 30,
    difficulty: 'facil',
    xpReward: 35,
    features: [
      'Museu histórico',
      'Mobiliário de época',
      'Acervo fotográfico',
      'Biblioteca especializada',
      'Jardim histórico'
    ],
    openingHours: {
      'segunda': 'Fechado',
      'terca': '14:00-17:00',
      'quarta': '14:00-17:00',
      'quinta': '14:00-17:00',
      'sexta': '14:00-17:00',
      'sabado': '09:00-12:00, 14:00-17:00',
      'domingo': '09:00-12:00'
    },
    ticketPrice: {
      adult: 8,
      child: 4,
      senior: 4
    },
    accessibility: [
      'Entrada adaptada',
      'Térreo acessível',
      'Segundo andar sem elevador'
    ],
    images: [
      '/images/pois/casa-borges-1.jpg',
      '/images/pois/casa-borges-quarto.jpg',
      '/images/pois/casa-borges-jardim.jpg'
    ],
    historical_significance: 'Casa natal de Borges de Medeiros (1863-1961), figura central da política gaúcha e brasileira no início do século XX.',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-08-19T00:00:00Z'
  }
];

/**
 * Valida todos os POIs âncora geograficamente
 */
export function validateAnchorPOIs(): boolean {
  try {
    ANCHOR_POIS.forEach(poi => {
      assertInsideMunicipality(poi.coordinates.lat, poi.coordinates.lng);
    });
    return true;
  } catch (error) {
    console.error('Erro na validação dos POIs âncora:', error);
    return false;
  }
}

/**
 * Retorna POIs filtrados por categoria
 */
export function getPOIsByCategory(category: SeedPOI['category']): SeedPOI[] {
  return ANCHOR_POIS.filter(poi => poi.category === category);
}

/**
 * Retorna POI por ID
 */
export function getPOIById(id: string): SeedPOI | undefined {
  return ANCHOR_POIS.find(poi => poi.id === id);
}

/**
 * Gera QR codes para todos os POIs âncora
 */
export function generateQRCodesForAnchorPOIs(): SeedPOI[] {
  return ANCHOR_POIS.map(poi => ({
    ...poi,
    qrCode: `VC:${poi.id}:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`
  }));
}

/**
 * Comando para inserir POIs âncora no banco (simulação)
 */
export async function seedAnchorPOIs(): Promise<void> {
  console.log('🌱 Inserindo POIs âncora no banco de dados...');
  
  // Validar antes de inserir
  if (!validateAnchorPOIs()) {
    throw new Error('Falha na validação geográfica dos POIs âncora');
  }
  
  // Simular inserção no banco
  for (const poi of ANCHOR_POIS) {
    console.log(`   ✓ Inserindo POI: ${poi.name} (${poi.category})`);
    
    // Em produção, seria:
    // await db.pois.create({ data: poi });
    
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`✅ ${ANCHOR_POIS.length} POIs âncora inseridos com sucesso!`);
  console.log('📍 Todos os POIs validados geograficamente em Caçapava do Sul (RS)');
}

/**
 * Estatísticas dos POIs âncora
 */
export function getAnchorPOIsStats() {
  const stats = {
    total: ANCHOR_POIS.length,
    porCategoria: {
      historia: getPOIsByCategory('historia').length,
      natureza: getPOIsByCategory('natureza').length,
      gastronomia: getPOIsByCategory('gastronomia').length,
      familia: getPOIsByCategory('familia').length
    },
    xpTotal: ANCHOR_POIS.reduce((sum, poi) => sum + poi.xpReward, 0),
    tempoTotal: ANCHOR_POIS.reduce((sum, poi) => sum + poi.estimatedTime, 0),
    gratuitos: ANCHOR_POIS.filter(poi => poi.ticketPrice?.adult === 0).length,
    pagos: ANCHOR_POIS.filter(poi => poi.ticketPrice && poi.ticketPrice.adult > 0).length
  };
  
  return stats;
}
