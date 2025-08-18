import type { User, PointOfInterest, Route, Badge, HotelCheckIn } from './types';

export const POINTS_OF_INTEREST: PointOfInterest[] = [
  {
    id: 'poi-1',
    name: 'Pedra do Segredo',
    description: 'Um dos símbolos mais fascinantes de Caçapava do Sul.',
    longDescription: 'Com seus imponentes 30 metros de altura e uma fenda vertical perfeita, a Pedra do Segredo é um dos símbolos mais fascinantes de Caçapava do Sul. Cercada por trilhas e vegetação nativa, o local encanta aventureiros e curiosos com sua beleza misteriosa e paisagens de tirar o fôlego.',
    imageUrl: 'https://i.ibb.co/6yVwVjJ/pedra-do-segredo.jpg',
    points: 150,
    lat: -30.519,
    lng: -53.48,
  },
  {
    id: 'poi-2',
    name: 'Guaritas',
    description: 'Esculturas naturais que lembram torres de um castelo antigo.',
    longDescription: 'As Guaritas são esculturas naturais esculpidas pelo tempo, que lembram torres de um castelo antigo. Com suas formas impressionantes e localização privilegiada, são um convite para quem deseja contemplar a história geológica da região e se reconectar com a grandiosidade da natureza.',
    imageUrl: 'https://i.ibb.co/yQjK2D8/guaritas.jpg',
    points: 120,
    lat: -30.86,
    lng: -53.5,
  },
  {
    id: 'poi-3',
    name: 'Cascata do Salso',
    description: 'Queda d’água cristalina em um ambiente tranquilo.',
    longDescription: 'Escondida entre trilhas e mata preservada, a Cascata do Salso surpreende com sua queda d\'água cristalina e ambiente tranquilo. Ideal para caminhadas, piqueniques e banhos refrescantes, é o lugar perfeito para quem busca paz, beleza e aventura em um só destino.',
    imageUrl: 'https://i.ibb.co/8DBV7jM/cascata-salso.jpg',
    points: 100,
    lat: -30.45,
    lng: -53.3,
  },
  {
    id: 'poi-4',
    name: 'Forte Dom Pedro II',
    description: 'Marco da história Farroupilha e do Brasil Império.',
    longDescription: 'O Forte Dom Pedro II é um monumento histórico que remonta à época da Revolução Farroupilha. Suas muralhas contam histórias de batalhas e estratégias, sendo um local imperdível para quem se interessa pela história do Rio Grande do Sul e do Brasil.',
    imageUrl: 'https://i.ibb.co/dK5V28c/forte.jpg',
    points: 80,
    lat: -30.51,
    lng: -53.49,
  },
    {
    id: 'poi-5',
    name: 'Minas do Camaquã',
    description: 'Vila operária histórica e paisagens da mineração.',
    longDescription: 'As Minas do Camaquã são um complexo que revela a história da mineração de cobre na região. A vila operária, com sua arquitetura peculiar, e as paisagens alteradas pela atividade mineradora criam um cenário único e fotogênico.',
    imageUrl: 'https://i.ibb.co/hZ2ffv2/minas.jpg',
    points: 90,
    lat: -30.7,
    lng: -53.7,
  },
  {
    id: 'poi-6',
    name: 'Igreja Matriz N. S. da Assunção',
    description: 'Jóia da arquitetura gótica no coração da cidade.',
    longDescription: 'A Igreja Matriz Nossa Senhora da Assunção domina a paisagem do centro da cidade com sua imponente arquitetura neogótica. Seus vitrais e detalhes arquitetônicos contam a história da fé e da comunidade local.',
    imageUrl: 'https://i.ibb.co/8m1vBwG/igreja-matriz.jpg',
    points: 70,
    lat: -30.515,
    lng: -53.488,
  },
  {
    id: 'poi-7',
    name: 'Casa de Ulhôa Cintra',
    description: 'Edifício histórico que abriga o centro cultural da cidade.',
    longDescription: 'Este casarão histórico, que já foi residência de figuras importantes da história gaúcha, hoje funciona como um vibrante centro cultural. Abriga exposições de arte, eventos e o acervo histórico do município.',
    imageUrl: 'https://i.ibb.co/BqVn44G/ulhoa-cintra.jpg',
    points: 60,
    lat: -30.516,
    lng: -53.489,
  },
   {
    id: 'poi-8',
    name: 'Churrascaria Rodeio',
    description: 'O autêntico churrasco gaúcho.',
    longDescription: 'Experimente o verdadeiro sabor do pampa na Churrascaria Rodeio. Com cortes de carne selecionados e um buffet de pratos tradicionais, é uma parada obrigatória para os amantes da boa gastronomia.',
    imageUrl: 'https://i.ibb.co/sKqQhY6/churrascaria.jpg',
    points: 50,
    lat: -30.52,
    lng: -53.49,
  },
  {
    id: 'poi-9',
    name: 'Doçaria da Vovó',
    description: 'Doces caseiros e coloniais feitos com amor.',
    longDescription: 'A Doçaria da Vovó é um cantinho acolhedor que oferece o melhor dos doces coloniais da região. Prove as compotas, geleias, bolos e tortas feitas com receitas de família passadas de geração em geração.',
    imageUrl: 'https://i.ibb.co/N2c7QnN/docaria.jpg',
    points: 40,
    lat: -30.51,
    lng: -53.485,
  }
];

export const ROUTES: Route[] = [
  {
    id: 'route-1',
    name: 'Belezas Naturais',
    description: 'Explore as paisagens mais deslumbrantes e formações rochosas únicas da região.',
    pointsOfInterest: ['poi-1', 'poi-2', 'poi-3'],
    imageUrl: 'https://i.ibb.co/yQjK2D8/guaritas.jpg',
  },
  {
    id: 'route-2',
    name: 'Riqueza Histórica',
    description: 'Viaje no tempo conhecendo os locais históricos que marcaram Caçapava do Sul.',
    pointsOfInterest: ['poi-4', 'poi-5', 'poi-6', 'poi-7'],
    imageUrl: 'https://i.ibb.co/dK5V28c/forte.jpg',
  },
  {
    id: 'route-3',
    name: 'Sabores da Terra',
    description: 'Delicie-se com a culinária local e os sabores autênticos da nossa cidade.',
    pointsOfInterest: ['poi-8', 'poi-9'],
    imageUrl: 'https://i.ibb.co/sKqQhY6/churrascaria.jpg',
  }
];

export const BADGES: Badge[] = [
    {
        id: 'badge-1',
        name: 'Explorador da Natureza',
        description: 'Visitou todos os pontos da rota Belezas Naturais.',
        icon: 'Mountain',
        criteria: (visitedIds) => {
            const requiredPois = new Set(ROUTES.find(r => r.id === 'route-1')?.pointsOfInterest || []);
            return [...requiredPois].every(poiId => visitedIds.has(poiId));
        },
    },
    {
        id: 'badge-2',
        name: 'Historiador',
        description: 'Visitou todos os pontos da rota Riqueza Histórica.',
        icon: 'BookOpen',
        criteria: (visitedIds) => {
            const requiredPois = new Set(ROUTES.find(r => r.id === 'route-2')?.pointsOfInterest || []);
            return [...requiredPois].every(poiId => visitedIds.has(poiId));
        },
    },
    {
        id: 'badge-5',
        name: 'Bom de Garfo',
        description: 'Visitou todos os pontos da rota Sabores da Terra.',
        icon: 'Utensils',
        criteria: (visitedIds) => {
            const requiredPois = new Set(ROUTES.find(r => r.id === 'route-3')?.pointsOfInterest || []);
            return [...requiredPois].every(poiId => visitedIds.has(poiId));
        },
    },
    {
        id: 'badge-3',
        name: 'Pioneiro',
        description: 'Realizou seu primeiro check-in.',
        icon: 'Star',
        criteria: (visitedIds) => visitedIds.size >= 1,
    },
    {
        id: 'badge-4',
        name: 'Mestre Desbravador',
        description: 'Visitou todos os pontos turísticos disponíveis.',
        icon: 'Leaf',
        criteria: (visitedIds) => visitedIds.size === POINTS_OF_INTEREST.length,
    }
];


export const USERS: User[] = [
  // Admin User
  {
    id: 'user-admin',
    name: 'Secretaria de Turismo',
    email: 'secretaria@email.com',
    password: 'senha123',
    role: 'secretaria',
    avatarUrl: 'https://i.ibb.co/yBNG186/gov-avatar.png',
    points: 0,
    visited: [],
    badges: [],
    routeProgress: [],
  },
  // Hotel User
  {
    id: 'user-hotel',
    name: 'Hotel Palace',
    email: 'hotel@email.com',
    password: 'senha123',
    role: 'hotel',
    avatarUrl: 'https://i.ibb.co/mS7SdqC/hotel-avatar.png',
    points: 0,
    visited: [],
    badges: [],
    routeProgress: [],
  },
  // Tourist Users
  {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex@email.com',
    password: 'senha123',
    role: 'tourist',
    avatarUrl: 'https://picsum.photos/seed/user1/200',
    points: 470, // +100 for route completion
    visited: [
      { pointId: 'poi-1', date: '2024-07-20T10:00:00Z' },
      { pointId: 'poi-2', date: '2024-07-20T14:30:00Z' },
      { pointId: 'poi-3', date: '2024-07-21T11:00:00Z' },
    ],
    badges: ['badge-1', 'badge-3'],
    routeProgress: [{ routeId: 'route-1', status: 'completed', completedDate: '2024-07-21T11:00:00Z' }],
  },
  {
    id: 'user-2',
    name: 'Maria Garcia',
    email: 'maria@email.com',
    password: 'senha123',
    role: 'tourist',
    avatarUrl: 'https://picsum.photos/seed/user2/200',
    points: 400, // +100 for route completion
    visited: [
      { pointId: 'poi-4', date: '2024-07-22T09:00:00Z' },
      { pointId: 'poi-5', date: '2024-07-22T12:00:00Z' },
      { pointId: 'poi-6', date: '2024-07-23T15:00:00Z' },
      { pointId: 'poi-7', date: '2024-07-23T16:00:00Z' },
    ],
    badges: ['badge-2', 'badge-3'],
    routeProgress: [{ routeId: 'route-2', status: 'completed', completedDate: '2024-07-23T16:00:00Z' }],
  },
  {
    id: 'user-0', // Current User
    name: 'Você',
    email: 'turista@email.com',
    password: 'senha123',
    role: 'tourist',
    avatarUrl: 'https://picsum.photos/seed/you/200',
    points: 130,
    visited: [{ pointId: 'poi-4', date: '2024-07-24T10:00:00Z' }, { pointId: 'poi-8', date: '2024-07-24T13:00:00Z' }],
    badges: ['badge-3'],
    routeProgress: [],
  },
  {
    id: 'user-3',
    name: 'Chen Wei',
    email: 'chen@email.com',
    password: 'senha123',
    role: 'tourist',
    avatarUrl: 'https://picsum.photos/seed/user3/200',
    points: 150,
    visited: [{ pointId: 'poi-1', date: '2024-07-19T16:00:00Z' }],
    badges: ['badge-3'],
    routeProgress: [],
  },
];


export const HOTEL_CHECKINS: HotelCheckIn[] = [
    { 
        id: 'hc-1', 
        hotelId: 'user-hotel', 
        touristName: 'João Silva',
        phone: '(11) 98765-4321',
        profession: 'Engenheiro',
        nationality: 'Brasileira',
        birthDate: '1990-05-15',
        gender: 'Masculino',
        idDocument: '12.345.678-9',
        originCity: 'São Paulo, SP',
        travelReason: 'Turismo',
        transportMean: 'Automóvel',
        discoveryChannel: 'Indicação de amigos',
        poiOpinion: 'Muito boa',
        cityOpinion: 'Ótima',
        checkInDate: '2024-07-23T14:00:00Z', 
        checkOutDate: '2024-07-26T12:00:00Z' 
    },
    { 
        id: 'hc-2', 
        hotelId: 'user-hotel', 
        touristName: 'Ana Pereira', 
        phone: '(21) 91234-5678',
        profession: 'Advogada',
        nationality: 'Brasileira',
        birthDate: '1985-11-20',
        gender: 'Feminino',
        idDocument: '98.765.432-1',
        originCity: 'Rio de Janeiro, RJ',
        travelReason: 'Negócio',
        transportMean: 'Ônibus',
        discoveryChannel: 'Site',
        poiOpinion: 'Ótima',
        cityOpinion: 'Muito boa',
        checkInDate: '2024-07-24T15:30:00Z', 
        checkOutDate: '2024-07-28T11:00:00Z' 
    },
    { 
        id: 'hc-3', 
        hotelId: 'user-hotel', 
        touristName: 'Carlos Schmidt', 
        phone: '+49 123 456789',
        profession: 'Professor',
        nationality: 'Alemã',
        birthDate: '1978-02-10',
        gender: 'Masculino',
        idDocument: 'DE1234567',
        originCity: 'Berlim',
        travelReason: 'Turismo',
        transportMean: 'Automóvel',
        discoveryChannel: 'Rede Social',
        poiOpinion: 'Boa',
        cityOpinion: 'Boa',
        checkInDate: '2024-07-25T10:00:00Z', 
        checkOutDate: '2024-08-01T10:00:00Z' 
    },
];