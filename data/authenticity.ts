// Restaurantes autênticos confirmados de Caçapava do Sul
export const AUTHENTIC_RESTAURANTS = [
    {
        id: 'rest-1',
        name: 'El Rancho Parrillados Pub',
        description: 'Especializado em carnes com ambiente acolhedor',
        category: 'Carnes/Parrilla',
        rating: 4.5,
        specialties: ['Parrillada', 'Carnes nobres', 'Ambiente pub'],
        atmosphere: 'Acolhedor e descontraído',
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#8B4513"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">El Rancho Parrillados</text></svg>')
    },
    {
        id: 'rest-2',
        name: 'Chef Express Pizzaria / Delivery',
        description: 'Pizzaria popular com ambiente informal',
        category: 'Pizzaria',
        rating: 4.2,
        specialties: ['Pizzas variadas', 'Delivery', 'Ambiente informal'],
        atmosphere: 'Informal e familiar',
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#DC143C"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dy=".3em">Chef Express Pizzaria</text></svg>')
    },
    {
        id: 'rest-3',
        name: 'Meu Cantinho',
        description: 'Café com avaliação excelente e ambiente ao ar livre',
        category: 'Café/Lancheria',
        rating: 4.8,
        specialties: ['Cafés especiais', 'Ambiente ao ar livre', 'Delivery'],
        atmosphere: 'Aconchegante com área externa',
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#CD853F"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dy=".3em">Meu Cantinho</text></svg>')
    },
    {
        id: 'rest-4',
        name: 'Don Ítalo',
        description: 'Restaurante aconchegante com buffet de almoço e decoração vintage',
        category: 'Restaurante',
        rating: 4.3,
        specialties: ['Buffet de almoço', 'Decoração vintage', 'Ambiente aconchegante'],
        atmosphere: 'Vintage e aconchegante',
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#228B22"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dy=".3em">Don Ítalo</text></svg>')
    },
    {
        id: 'rest-5',
        name: 'Restaurante Pampa',
        description: 'Opção conhecida localmente com boa reputação',
        category: 'Restaurante',
        rating: 4.1,
        specialties: ['Culinária regional', 'Tradição local'],
        atmosphere: 'Tradicional gaúcho',
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#B8860B"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dy=".3em">Restaurante Pampa</text></svg>')
    },
    {
        id: 'rest-6',
        name: "Urbanu's Restaurante",
        description: 'Estabelecimento conhecido pela comunidade local',
        category: 'Restaurante',
        rating: 4.0,
        specialties: ['Pratos variados', 'Ambiente urbano'],
        atmosphere: 'Moderno e urbano',
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#4169E1"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Urbanu\'s Restaurante</text></svg>')
    },
    {
        id: 'rest-7',
        name: 'Rodeio Grill',
        description: 'Churrascaria com boa reputação na região',
        category: 'Churrascaria',
        rating: 4.2,
        specialties: ['Churrasco', 'Carnes grelhadas', 'Ambiente rústico'],
        atmosphere: 'Rústico e tradicional',
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#8B0000"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dy=".3em">Rodeio Grill</text></svg>')
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
    imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#6CBC3A"/><text x="50%" y="40%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Festa Nacional do</text><text x="50%" y="60%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Azeite de Oliva</text></svg>')
};
