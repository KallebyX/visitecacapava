import type { Badge, PointOfInterest, Route, User, HotelCheckIn, Challenge, Photo } from './types';

export const POINTS_OF_INTEREST: PointOfInterest[] = [
    { id: 'poi-1', name: 'Pedra do Segredo', description: 'Formação rochosa icônica com vista panorâmica.', longDescription: 'A Pedra do Segredo é um dos mais belos e misteriosos pontos turísticos de Caçapava do Sul. A subida é recompensada com uma vista de 360 graus da região, perfeita para fotos e contemplação.', imageUrl: 'https://i.ytimg.com/vi/bYf2-T20W0g/maxresdefault.jpg', points: 25, lat: -30.5694, lng: -53.4913 },
    { id: 'poi-2', name: 'Minas do Camaquã', description: 'Complexo mineiro histórico e paisagens deslumbrantes.', longDescription: 'Explore as ruínas do maior complexo de mineração de cobre do Brasil. O local oferece uma viagem no tempo, com prédios antigos, equipamentos e uma paisagem única moldada pela atividade mineradora.', imageUrl: 'https://www.minasdocamaqua.com.br/wp-content/uploads/2019/08/Pr%C3%A9dio-do-escrit%C3%B3rio-da-CBC-1.jpg', points: 30, lat: -30.7303, lng: -53.7664 },
    { id: 'poi-3', name: 'Cascata do Salso', description: 'Queda d\'água refrescante em meio à natureza.', longDescription: 'Uma bela cascata de fácil acesso, ideal para um banho refrescante nos dias quentes. O som da água e a vegetação ao redor criam um ambiente perfeito para relaxar e se conectar com a natureza.', imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/18/0a/73/cascata-do-salso.jpg', points: 20, lat: -30.5054, lng: -53.4116 },
    { id: 'poi-4', name: 'Forte Dom Pedro II', description: 'Marco histórico da Revolução Farroupilha.', longDescription: 'Construído em 1848, o Forte Dom Pedro II é um importante sítio histórico. Suas muralhas de pedra contam histórias de batalhas e da importância estratégica de Caçapava do Sul no passado.', imageUrl: 'https://live.staticflickr.com/832/42079148484_f04a796d8e_b.jpg', points: 15, lat: -30.5144, lng: -53.4883 },
    { id: 'poi-5', name: 'Casa de Ulhôa Cintra', description: 'Centro de cultura e história local.', longDescription: 'Este casarão histórico, antiga residência do Visconde de Jaguari, hoje abriga um centro cultural com exposições que narram a rica história de Caçapava do Sul e seus personagens ilustres.', imageUrl: 'https://www.jornalfolhadacidade.com.br/img/noticias/casa-de-ulhoa-cintra-e-tema-de-audiencia-publica.jpg', points: 10, lat: -30.5150, lng: -53.4891 },
    { id: 'poi-6', name: 'Igreja Matriz Nossa Sra. da Assunção', description: 'Imponente igreja gótica no coração da cidade.', longDescription: 'Com sua arquitetura gótica impressionante, a Igreja Matriz é um marco de fé e arte. Seus vitrais e detalhes arquitetônicos encantam visitantes e fiéis, sendo um dos cartões-postais da cidade.', imageUrl: 'https://live.staticflickr.com/7120/7424597086_e5491104e7_b.jpg', points: 10, lat: -30.5148, lng: -53.4899 },
    { id: 'poi-7', name: 'Guaritas', description: 'Formações rochosas que parecem sentinelas.', longDescription: 'O Parque das Guaritas é um santuário geológico com formações de arenito que se assemelham a torres e guardiões. Um lugar de energia única, perfeito para trekking e observação de estrelas.', imageUrl: 'https://www.cacapavadosul.rs.gov.br/arquivos/noticias/guaritas-uma-das-7-maravilhas-do-rs_16112022120026.jpeg', points: 25, lat: -30.7397, lng: -53.4682 },
    { id: 'poi-8', name: 'Churrascaria Rodeio', description: 'O autêntico churrasco gaúcho.', longDescription: 'Experimente o verdadeiro sabor do pampa na Churrascaria Rodeio. Com cortes de carne nobres e um buffet completo de pratos tradicionais, é uma parada obrigatória para os amantes da boa gastronomia.', imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/07/9e/29/46/churrascaria-rodeio.jpg', points: 15, lat: -30.5201, lng: -53.4925 },
    { id: 'poi-9', name: 'Doçaria Pelotense', description: 'Doces tradicionais para adoçar a vida.', longDescription: 'Uma vitrine repleta de delícias que representam a famosa tradição dos doces de Pelotas. Quindins, pastéis de nata e outras iguarias feitas com receitas de família.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR611m9H1o0X2B-w5Zg9C1W7L9o_hB9bF3nQ&s', points: 10, lat: -30.5135, lng: -53.4870 }
];

export const ROUTES: Route[] = [
    {
        id: 'route-1',
        name: 'Belezas Naturais',
        description: 'Explore paisagens de tirar o fôlego, de formações rochosas a cascatas refrescantes.',
        pointsOfInterest: ['poi-1', 'poi-3', 'poi-7'],
        imageUrl: 'https://www.aventurebox.com/wp-content/uploads/2021/10/trekking-nas-guaritas-3.jpg'
    },
    {
        id: 'route-2',
        name: 'Riqueza Histórica',
        description: 'Viaje no tempo conhecendo os locais que marcaram a história da região.',
        pointsOfInterest: ['poi-2', 'poi-4', 'poi-5', 'poi-6'],
        imageUrl: 'https://i0.wp.com/serrasdonovosul.com/wp-content/uploads/2022/01/forte-dom-pedro-II.jpg?fit=800%2C533&ssl=1'
    },
    {
        id: 'route-3',
        name: 'Sabores da Terra',
        description: 'Uma rota para os amantes da boa comida, do churrasco gaúcho aos doces tradicionais.',
        pointsOfInterest: ['poi-8', 'poi-9'],
        imageUrl: 'https://img.freepik.com/fotos-premium/churrasco-gaucho-tradicional-picanha-e-outras-carnes-na-grelha_801454-1595.jpg'
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
        imageUrl: 'https://i0.wp.com/serrasdonovosul.com/wp-content/uploads/2022/01/forte-dom-pedro-II.jpg?fit=800%2C533&ssl=1',
        caption: 'Conhecendo um pouco da história do Brasil no Forte Dom Pedro II.',
        poiId: 'poi-4',
        timestamp: '2025-08-16T11:00:00Z',
        likes: ['user-1'],
    }
];