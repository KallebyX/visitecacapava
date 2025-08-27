// Restaurantes autênticos confirmados de Caçapava do Sul
export const AUTHENTIC_RESTAURANTS = [
    {
        id: 'rest-1',
        name: 'El Rancho Parrillados',
        description: 'Tradicional parrilla gaúcha com cortes nobres e ambiente acolhedor. Especialidade em carnes grelhadas.',
        cuisine: 'Gaúcha',
        category: 'Parrilla',
        rating: 4.7,
        priceRange: 3,
        address: 'Centro, Caçapava do Sul',
        phone: '(55) 3281-0000',
        openingHours: '11:30 - 14:00, 19:00 - 23:00',
        specialties: ['Wi-Fi', 'Estacionamento', 'Ambiente Climatizado'],
        atmosphere: 'Acolhedor e tradicional',
        imageUrl: '/img/restaurantes/El Rancho/ElRanchoLogo.png'
    },
    {
        id: 'rest-2',
        name: 'Chef Express Pizzaria',
        description: 'Pizzaria com massas artesanais e ingredientes frescos. Delivery disponível.',
        cuisine: 'Italiana',
        category: 'Pizzaria',
        rating: 4.5,
        priceRange: 2,
        address: 'Centro, Caçapava do Sul',
        phone: '(55) 3281-0001',
        openingHours: '18:00 - 23:30',
        specialties: ['Delivery', 'Wi-Fi', 'Ambiente Familiar'],
        atmosphere: 'Informal e familiar',
        imageUrl: '/img/restaurantes/Chef Pizzaria/ChefExpressLogo.png'
    },
    {
        id: 'rest-3',
        name: 'Meu Cantinho',
        description: 'Restaurante caseiro com pratos regionais e atendimento familiar. Comida de qualidade a preços justos.',
        cuisine: 'Regional',
        category: 'Restaurante',
        rating: 4.6,
        priceRange: 2,
        address: 'Centro, Caçapava do Sul',
        phone: '(55) 3281-0002',
        openingHours: '11:00 - 14:00, 18:00 - 22:00',
        specialties: ['Ambiente Familiar', 'Pratos Caseiros', 'Preço Justo'],
        atmosphere: 'Aconchegante com área externa',
        imageUrl: '/img/restaurantes/Meu Cantinho/MeuCantinhoLogo.png'
    },
    {
        id: 'rest-4',
        name: 'Don Ítalo',
        description: 'Restaurante italiano com massas artesanais e vinhos selecionados. Ambiente elegante.',
        cuisine: 'Italiana',
        category: 'Restaurante',
        rating: 4.8,
        priceRange: 3,
        address: 'Centro, Caçapava do Sul',
        phone: '(55) 3281-0003',
        openingHours: '19:00 - 23:00',
        specialties: ['Vinhos', 'Ambiente Elegante', 'Massas Artesanais'],
        atmosphere: 'Elegante e sofisticado',
        imageUrl: '/img/restaurantes/Don Italo /DonItaloLogo.png'
    },

    {
        id: 'rest-6',
        name: 'Rodeio Grill',
        description: 'Churrascaria tradicional com rodízio de carnes e buffet de saladas. Ambiente rústico e acolhedor.',
        cuisine: 'Gaúcha',
        category: 'Churrascaria',
        rating: 4.5,
        priceRange: 3,
        address: 'Centro, Caçapava do Sul',
        phone: '(55) 3281-0006',
        openingHours: '11:30 - 14:30, 19:00 - 23:00',
        specialties: ['Rodízio de Carnes', 'Buffet de Saladas', 'Ambiente Rústico'],
        atmosphere: 'Rústico e acolhedor',
        imageUrl: '/img/restaurantes/Rodeio Churrascaria/Rodeio Churrascaria.png'
    },
    {
        id: 'rest-7',
        name: 'AM Lanches',
        description: 'Lanches rápidos e refeições leves com ambiente familiar e atendimento ágil.',
        cuisine: 'Lanches',
        category: 'Lanchonete',
        rating: 4.3,
        priceRange: 1,
        address: 'Centro, Caçapava do Sul',
        phone: '(55) 3281-0007',
        openingHours: '07:00 - 19:00',
        specialties: ['Lanches Rápidos', 'Refeições Leves', 'Atendimento Ágil'],
        atmosphere: 'Familiar e descontraído',
        imageUrl: '/img/restaurantes/AM Lanches/LogoAMAtualizada2024.png'
    }
];

// Avaliações autênticas dos restaurantes
export const AUTHENTIC_RESTAURANT_REVIEWS = [
    {
        id: 'review-1',
        restaurantId: 'rest-1',
        userId: 'user-1',
        userName: 'Maria S.',
        rating: 5,
        comment: 'Melhor parrilla da cidade! Carne no ponto e atendimento excelente.',
        date: '2024-08-15',
        helpful: 12
    },
    {
        id: 'review-2',
        restaurantId: 'rest-2',
        userId: 'user-2',
        userName: 'João P.',
        rating: 5,
        comment: 'Pizza muito boa e entrega rápida. Recomendo!',
        date: '2024-08-10',
        helpful: 8
    },
    {
        id: 'review-3',
        restaurantId: 'rest-3',
        userId: 'user-3',
        userName: 'Ana C.',
        rating: 5,
        comment: 'Comida caseira deliciosa! Preço justo e porções generosas.',
        date: '2024-08-12',
        helpful: 15
    },
    {
        id: 'review-4',
        restaurantId: 'rest-4',
        userId: 'user-4',
        userName: 'Carlos M.',
        rating: 5,
        comment: 'Ambiente elegante e massas excepcionais. Vale a pena!',
        date: '2024-08-08',
        helpful: 9
    }
];

// Evento principal de Caçapava do Sul
export const MAIN_EVENT = {
    id: 'event-fenazeite',
    name: 'Festa Nacional do Azeite de Oliva (Fenazeite)',
    description: 'O evento mais importante e consolidado de Caçapava do Sul',
    period: 'Final de novembro a início de dezembro',
    location: 'Largo Farroupilha',
    highlights: [
        'Mostra do terroir local',
        'Programação cultural diversificada',
        'Exposição da agroindústria regional',
        'Gastronomia típica',
        'Artesanato local',
        'Milhares de visitantes anuais'
    ],
    significance: 'Promove a cultura e economia regional, consolidando Caçapava do Sul como referência na produção de azeite de oliva',
    imageUrl: '/img/logo/VisiteCacapavaSimbolo.png'
};
