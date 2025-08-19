import type { Badge, PointOfInterest, Route, User, HotelCheckIn, Challenge, Photo, Review, Favorite } from './types';

export const POINTS_OF_INTEREST: PointOfInterest[] = [
    // Coordenadas reais de Caçapava do Sul baseadas nos pontos turísticos confirmados
    { 
        id: 'poi-1', 
        name: 'Pedra do Segredo', 
        description: 'Formação rochosa imponente de ~120m com trilhas, grutas e mirantes.', 
        longDescription: 'A Pedra do Segredo é uma formação rochosa imponente de aproximadamente 120 metros de altura, onde segundo a lenda, tesouros jesuítas foram escondidos. Oferece trilhas, grutas para exploração e mirantes com vista panorâmica da região.', 
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#8B4513"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dy=".3em">Pedra do Segredo</text></svg>'), 
        points: 30, 
        lat: -30.5694, 
        lng: -53.4913 
    },
    { 
        id: 'poi-2', 
        name: 'Parque Natural Municipal da Pedra do Segredo', 
        description: 'Trilhas autoguiadas e guiadas com cavernas e formações únicas.', 
        longDescription: 'O parque oferece trilhas autoguiadas e guiadas, incluindo a famosa Caverna da Escuridão, o Salão das Estalactites e o Portal do Segredo. Uma experiência única de contato com a natureza e geologia local.', 
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#228B22"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Parque da Pedra do Segredo</text></svg>'), 
        points: 25, 
        lat: -30.5700, 
        lng: -53.4920 
    },
    { 
        id: 'poi-3', 
        name: 'Parque das Guaritas', 
        description: 'Geoparque com formações rochosas únicas, extensão de ~30 km².', 
        longDescription: 'Geoparque reconhecido pela UNESCO com formações rochosas únicas que se estendem por cerca de 30 km². Oferece trilhas espetaculares, algumas em áreas privadas que necessitam de guia especializado.', 
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#D2691E"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dy=".3em">Parque das Guaritas</text></svg>'), 
        points: 35, 
        lat: -30.7397, 
        lng: -53.4682 
    },
    { 
        id: 'poi-4', 
        name: 'Minas do Camaquã', 
        description: 'Zona de mineração histórica com lago azul e potencial aquático.', 
        longDescription: 'Complexo de mineração histórica que abriga um impressionante lago azul em mina a céu aberto. Oferece trilhas, visitação guiada e potencial para esportes aquáticos, sendo um marco da história mineradora local.', 
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#4A90E2"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dy=".3em">Minas do Camaquã</text></svg>'), 
        points: 30, 
        lat: -30.7303, 
        lng: -53.7664 
    },
    { 
        id: 'poi-5', 
        name: 'Forte Dom Pedro II', 
        description: 'Fortificação hexagonal de pedra e cal do século XIX.', 
        longDescription: 'Fortificação hexagonal construída em meados do século XIX, com paredes de pedra e cal que chegam a 10 metros de altura. Marco histórico importante da região com visitação livre.', 
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#8B7355"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Forte Dom Pedro II</text></svg>'), 
        points: 20, 
        lat: -30.5144, 
        lng: -53.4883 
    },
    { 
        id: 'poi-6', 
        name: 'Centro Histórico Municipal', 
        description: 'Igreja Matriz, Praça Central, Centro de Cultura e monumentos.', 
        longDescription: 'Conjunto patrimonial que inclui a Igreja Matriz Nossa Senhora da Assunção, Praça Central, Centro Municipal de Cultura (Museu Lanceiros do Sul, Biblioteca, Arquivo) e o Monumento ao Guerreiro Farrapo, formando o coração histórico da cidade.', 
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#DC143C"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Centro Histórico</text></svg>'), 
        points: 25, 
        lat: -30.5148, 
        lng: -53.4899 
    }
];

export const ROUTES: Route[] = [
    {
        id: 'route-1',
        name: 'Tesouros Geológicos',
        description: 'Explore as formações rochosas únicas e parques naturais da região.',
        pointsOfInterest: ['poi-1', 'poi-2', 'poi-3'],
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#8B4513"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dy=".3em">Tesouros Geológicos</text></svg>')
    },
    {
        id: 'route-2',
        name: 'Patrimônio Histórico',
        description: 'Descubra a rica história através de monumentos e centros culturais.',
        pointsOfInterest: ['poi-4', 'poi-5', 'poi-6'],
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#8B7355"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Patrimônio Histórico</text></svg>')
    }
];

const route1Pois = new Set(ROUTES.find(r => r.id === 'route-1')?.pointsOfInterest || []);
const route2Pois = new Set(ROUTES.find(r => r.id === 'route-2')?.pointsOfInterest || []);
const route3Pois = new Set(ROUTES.find(r => r.id === 'route-3')?.pointsOfInterest || []);

export const BADGES: Badge[] = [
    {
        id: 'badge-1',
        name: 'Explorador da Natureza',
        description: 'Visitou todos os pontos da rota Belezas Naturais.',
        icon: 'Mountain',
        criteria: (visitedIds) => Array.from(route1Pois).every(poiId => visitedIds.has(poiId)),
    },
    {
        id: 'badge-2',
        name: 'Historiador',
        description: 'Visitou todos os pontos da rota Riqueza Histórica.',
        icon: 'BookOpen',
        criteria: (visitedIds) => Array.from(route2Pois).every(poiId => visitedIds.has(poiId)),
    },
    {
        id: 'badge-5',
        name: 'Bom de Garfo',
        description: 'Visitou todos os pontos da rota Sabores da Terra.',
        icon: 'Utensils',
        criteria: (visitedIds) => Array.from(route3Pois).every(poiId => visitedIds.has(poiId)),
    },
    {
        id: 'badge-3',
        name: 'Pioneiro',
        description: 'Realizou seu primeiro check-in.',
        icon: 'Star',
        criteria: (visitedIds) => visitedIds.size === 1,
    },
    {
        id: 'badge-4',
        name: 'Mestre Desbravador',
        description: 'Visitou todos os pontos turísticos disponíveis.',
        icon: 'Leaf',
        criteria: (visitedIds, allPoiIds) => allPoiIds ? visitedIds.size === allPoiIds.size : false,
    }
];

export const USERS: User[] = [
    // Tourist user
    {
        id: 'user-1',
        name: 'Ana Exploradora',
        email: 'turista@email.com',
        password: 'senha123',
        role: 'tourist',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        points: 55,
        visited: [
            { pointId: 'poi-1', date: '2023-10-26T10:00:00Z' },
            { pointId: 'poi-4', date: '2023-10-26T14:30:00Z' },
        ],
        badges: ['badge-3'],
        routeProgress: [],
    },
    // Other tourists for leaderboard
    {
        id: 'user-4', name: 'Carlos Viajante', email: 'carlos@email.com', password: 'senha123', role: 'tourist', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        points: 120, visited: [], badges: [], routeProgress: []
    },
    {
        id: 'user-5', name: 'Mariana Aventureira', email: 'mariana@email.com', password: 'senha123', role: 'tourist', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        points: 85, visited: [], badges: [], routeProgress: []
    },
     {
        id: 'user-6', name: 'João Gaúcho', email: 'joao@email.com', password: 'senha123', role: 'tourist', avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        points: 20, visited: [], badges: [], routeProgress: []
    },
    // Hotel user
    {
        id: 'user-2',
        name: 'Hotel Plaza',
        email: 'hotel@email.com',
        password: 'senha123',
        role: 'hotel',
        avatarUrl: 'https://picsum.photos/seed/hotel/200',
        points: 0,
        visited: [],
        badges: [],
        routeProgress: [],
    },
    {
        id: 'user-hotel-2',
        name: 'Pousada Charme',
        email: 'pousada@email.com',
        password: 'senha123',
        role: 'hotel',
        avatarUrl: 'https://picsum.photos/seed/pousada/200',
        points: 0,
        visited: [],
        badges: [],
        routeProgress: [],
    },
    // Restaurant users
    {
        id: 'user-restaurant-1',
        name: 'Restaurante do Gaúcho',
        email: 'restaurante@email.com',
        password: 'senha123',
        role: 'restaurant',
        avatarUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="#FF6B35"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">RG</text></svg>'),
        points: 0,
        visited: [],
        badges: [],
        routeProgress: [],
    },
    {
        id: 'user-restaurant-2',
        name: 'Pizzaria Bella Vita',
        email: 'pizzaria@email.com',
        password: 'senha123',
        role: 'restaurant',
        avatarUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="#FFD700"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="black" text-anchor="middle" dy=".3em">PB</text></svg>'),
        points: 0,
        visited: [],
        badges: [],
        routeProgress: [],
    },
    // Secretaria user
    {
        id: 'user-3',
        name: 'Admin da Cidade',
        email: 'secretaria@email.com',
        password: 'senha123',
        role: 'secretaria',
        avatarUrl: 'https://picsum.photos/seed/admin/200',
        points: 0,
        visited: [],
        badges: [],
        routeProgress: [],
    },
];

export const HOTEL_CHECKINS: HotelCheckIn[] = [
    {
        id: 'checkin-1',
        hotelId: 'user-2',
        touristName: 'Carlos Viajante',
        phone: '55999999999',
        profession: 'Engenheiro',
        nationality: 'Brasileira',
        birthDate: '1990-05-15',
        gender: 'Masculino',
        idDocument: '123456789',
        originCity: 'Porto Alegre/RS',
        travelReason: 'Turismo',
        transportMean: 'Automóvel',
        discoveryChannel: 'Indicação de amigos',
        poiOpinion: 'Muito boa',
        cityOpinion: 'Ótima',
        checkInDate: '2023-10-25T14:00:00Z',
        checkOutDate: '2023-10-28T11:00:00Z',
    },
     {
        id: 'checkin-2',
        hotelId: 'user-2',
        touristName: 'Mariana Aventureira',
        phone: '21988888888',
        profession: 'Designer',
        nationality: 'Brasileira',
        birthDate: '1995-08-20',
        gender: 'Feminino',
        idDocument: '987654321',
        originCity: 'Rio de Janeiro/RJ',
        travelReason: 'Férias',
        transportMean: 'Ônibus',
        discoveryChannel: 'Rede Social',
        poiOpinion: 'Ótima',
        cityOpinion: 'Ótima',
        checkInDate: '2023-10-20T16:00:00Z',
        checkOutDate: '2023-10-24T12:00:00Z',
    },
    {
        id: 'checkin-3',
        hotelId: 'user-hotel-2',
        touristName: 'Ana Exploradora',
        phone: '11977777777',
        profession: 'Jornalista',
        nationality: 'Brasileira',
        birthDate: '1988-11-30',
        gender: 'Feminino',
        idDocument: '555555555',
        originCity: 'São Paulo/SP',
        travelReason: 'Negócio',
        transportMean: 'Outros',
        discoveryChannel: 'Site',
        poiOpinion: 'Ótima',
        cityOpinion: 'Ótima',
        checkInDate: '2023-11-01T18:00:00Z',
        checkOutDate: '2023-11-05T10:00:00Z',
    }
];

export const CHALLENGES: Challenge[] = [
    {
        id: 'challenge-1',
        title: 'Maratona Fotográfica',
        description: 'Tire uma foto em 3 pontos de interesse diferentes em um único dia.',
        points: 50,
        type: 'challenge',
    },
    {
        id: 'challenge-2',
        title: 'Festival de Inverno',
        description: 'Participe do evento de abertura do Festival de Inverno na praça central.',
        points: 30,
        type: 'event',
        startDate: '2025-07-20T18:00:00Z',
        endDate: '2025-07-20T22:00:00Z',
    },
    {
        id: 'challenge-3',
        title: 'Caçador de Lendas',
        description: 'Visite o Forte Dom Pedro II e a Pedra do Segredo para desvendar mistérios.',
        points: 40,
        type: 'challenge',
        relatedPoiIds: ['poi-1', 'poi-4'],
    }
];

export const PHOTOS: Photo[] = [
    {
        id: 'photo-1',
        userId: 'user-1',
        userName: 'Ana Exploradora',
        userAvatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        imageUrl: 'https://www.aventurebox.com/wp-content/uploads/2021/10/trekking-nas-guaritas-3.jpg',
        caption: 'Vista incrível da Pedra do Segredo! 🤩 #CaçapavaDoSul',
        poiId: 'poi-1',
        timestamp: '2025-08-17T16:30:00Z',
        likes: ['user-4', 'user-5'],
    },
    {
        id: 'photo-2',
        userId: 'user-4',
        userName: 'Carlos Viajante',
        userAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="#8B7355"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Forte Dom Pedro II</text></svg>'),
        caption: 'Conhecendo um pouco da história do Brasil no Forte Dom Pedro II.',
        poiId: 'poi-4',
        timestamp: '2025-08-16T11:00:00Z',
        likes: ['user-1'],
    }
];

export const REVIEWS: Review[] = [
    // Restaurant reviews
    {
        id: 'review-1',
        userId: 'user-1',
        entityType: 'restaurant',
        entityId: '1', // Restaurante e Churrascaria do Gaúcho
        rating: 5,
        comment: 'Excelente atendimento e comida deliciosa! O churrasco estava perfeito e o ambiente muito acolhedor.',
        createdAt: '2024-12-15T18:30:00Z',
        helpful: 8,
        notHelpful: 0,
        response: 'Muito obrigado pela avaliação! Ficamos felizes em saber que gostou da experiência.',
        verified: true
    },
    {
        id: 'review-2',
        userId: 'user-4',
        entityType: 'restaurant',
        entityId: '1',
        rating: 4,
        comment: 'Boa comida, mas o tempo de espera foi um pouco longo. No geral, recomendo!',
        createdAt: '2024-12-14T20:15:00Z',
        helpful: 5,
        notHelpful: 1,
        verified: true
    },
    {
        id: 'review-3',
        userId: 'user-5',
        entityType: 'restaurant',
        entityId: '2', // Padaria e Confeitaria Central
        rating: 5,
        comment: 'Ambiente familiar e comida caseira deliciosa. Os pães estavam fresquinhos!',
        createdAt: '2024-12-13T09:00:00Z',
        helpful: 12,
        notHelpful: 0,
        response: 'Obrigado! Estaremos sempre de portas abertas para recebê-la.',
        verified: false
    },
    {
        id: 'review-4',
        userId: 'user-1',
        entityType: 'restaurant',
        entityId: '3', // Pizzaria Bella Vita
        rating: 4,
        comment: 'Pizzas saborosas e massa bem feita. Ambiente agradável para jantar em família.',
        createdAt: '2024-12-12T21:45:00Z',
        helpful: 6,
        notHelpful: 0,
        verified: true
    },
    // POI reviews
    {
        id: 'review-5',
        userId: 'user-4',
        entityType: 'poi',
        entityId: 'poi-1', // Pedra do Segredo
        rating: 5,
        comment: 'Vista espetacular! A trilha é fácil e vale muito a pena. Lugar perfeito para fotos!',
        createdAt: '2024-12-11T16:20:00Z',
        helpful: 15,
        notHelpful: 1,
        verified: true
    },
    {
        id: 'review-6',
        userId: 'user-5',
        entityType: 'poi',
        entityId: 'poi-2', // Minas do Camaquã
        rating: 4,
        comment: 'Lugar histórico fascinante. Recomendo contratar um guia para entender melhor a história.',
        createdAt: '2024-12-10T14:30:00Z',
        helpful: 8,
        notHelpful: 0,
        verified: true
    }
];

export const FAVORITES: Favorite[] = [
    {
        id: 'fav-1',
        userId: 'user-1',
        entityType: 'restaurant',
        entityId: '1',
        createdAt: '2024-12-15T18:35:00Z'
    },
    {
        id: 'fav-2',
        userId: 'user-1',
        entityType: 'poi',
        entityId: 'poi-1',
        createdAt: '2024-12-14T10:00:00Z'
    },
    {
        id: 'fav-3',
        userId: 'user-4',
        entityType: 'restaurant',
        entityId: '2',
        createdAt: '2024-12-13T15:20:00Z'
    }
];