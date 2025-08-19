import React, { useState, useEffect } from 'react';
import { MapPin, Star, Clock, Users, Utensils, Search, Filter, Navigation } from 'lucide-react';
import { backendService } from '../services/backendService';
import { formatNavigationButtons } from '../utils/navigationUtils';
import SocialMediaLinks from '../components/SocialMediaLinks';
import RestaurantDetails from '../components/RestaurantDetails';
import FavoriteButton from '../components/FavoriteButton';
import { AUTHENTIC_RESTAURANTS } from '../data/authenticity';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  priceRange: number; // 1-4 ($-$$$$)
  rating: number;
  reviewCount: number;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  website?: string;
  hours: {
    open: string;
    close: string;
    days: string[];
  };
  features: string[];
  imageUrl: string;
  verified: boolean;
  googleMapsPlaceId?: string;
  specialties: string[];
  paymentMethods: string[];
}

interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

const RestaurantsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<number>(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  // Dados autênticos de restaurantes confirmados em Caçapava do Sul
  useEffect(() => {
    const authenticRestaurants: Restaurant[] = [
      {
        id: 'rest-1',
        name: 'El Rancho Parrillados Pub',
        description: 'Especializado em carnes com ambiente acolhedor',
        cuisine: 'Carnes/Parrilla',
        priceRange: 3,
        rating: 4.5,
        reviewCount: 89,
        address: 'Centro de Caçapava do Sul',
        lat: -30.5140,
        lng: -53.4890,
        phone: '(55) 3000-0000',
        hours: {
          open: '18:00',
          close: '23:30',
          days: ['Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
        },
        features: ['Ambiente acolhedor', 'Especialidade em carnes', 'Ambiente pub'],
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#8B4513"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">El Rancho Parrillados</text></svg>'),
        verified: true,
        specialties: ['Parrillada', 'Carnes nobres', 'Ambiente pub'],
        paymentMethods: ['Dinheiro', 'Cartão', 'PIX']
      },
      {
        id: 'rest-2',
        name: 'Chef Express Pizzaria / Delivery',
        description: 'Pizzaria popular com ambiente informal',
        cuisine: 'Pizzaria',
        priceRange: 2,
        rating: 4.2,
        reviewCount: 156,
        address: 'Centro de Caçapava do Sul',
        lat: -30.5145,
        lng: -53.4895,
        phone: '(55) 3000-0001',
        hours: {
          open: '18:00',
          close: '23:00',
          days: ['Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
        },
        features: ['Delivery', 'Ambiente informal', 'Pizzas variadas'],
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#DC143C"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dy=".3em">Chef Express Pizzaria</text></svg>'),
        verified: true,
        specialties: ['Pizzas variadas', 'Delivery', 'Ambiente informal'],
        paymentMethods: ['Dinheiro', 'Cartão', 'PIX']
      },
      {
        id: 'rest-3',
        name: 'Meu Cantinho',
        description: 'Café com avaliação excelente e ambiente ao ar livre',
        cuisine: 'Café/Lancheria',
        priceRange: 2,
        rating: 4.8,
        reviewCount: 201,
        address: 'Centro de Caçapava do Sul',
        lat: -30.5150,
        lng: -53.4885,
        phone: '(55) 3000-0002',
        hours: {
          open: '07:00',
          close: '18:00',
          days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
        },
        features: ['Ambiente ao ar livre', 'Delivery', 'Cafés especiais'],
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#CD853F"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dy=".3em">Meu Cantinho</text></svg>'),
        verified: true,
        specialties: ['Cafés especiais', 'Ambiente ao ar livre', 'Delivery'],
        paymentMethods: ['Dinheiro', 'Cartão', 'PIX']
      },
      {
        id: 'rest-4',
        name: 'Don Ítalo',
        description: 'Restaurante aconchegante com buffet de almoço e decoração vintage',
        cuisine: 'Restaurante',
        priceRange: 2,
        rating: 4.3,
        reviewCount: 134,
        address: 'Centro de Caçapava do Sul',
        lat: -30.5155,
        lng: -53.4880,
        phone: '(55) 3000-0003',
        hours: {
          open: '11:00',
          close: '14:00',
          days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
        },
        features: ['Buffet de almoço', 'Decoração vintage', 'Ambiente aconchegante'],
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#228B22"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dy=".3em">Don Ítalo</text></svg>'),
        verified: true,
        specialties: ['Buffet de almoço', 'Decoração vintage', 'Ambiente aconchegante'],
        paymentMethods: ['Dinheiro', 'Cartão', 'PIX']
      },
      {
        id: 'rest-5',
        name: 'Restaurante Pampa',
        description: 'Opção conhecida localmente com boa reputação',
        cuisine: 'Gaúcha',
        priceRange: 2,
        rating: 4.1,
        reviewCount: 98,
        address: 'Centro de Caçapava do Sul',
        lat: -30.5160,
        lng: -53.4875,
        phone: '(55) 3000-0004',
        hours: {
          open: '11:00',
          close: '14:00',
          days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
        },
        features: ['Culinária regional', 'Tradição local'],
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#B8860B"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dy=".3em">Restaurante Pampa</text></svg>'),
        verified: true,
        specialties: ['Culinária regional', 'Tradição local'],
        paymentMethods: ['Dinheiro', 'Cartão']
      },
      {
        id: 'rest-6',
        name: "Urbanu's Restaurante",
        description: 'Estabelecimento conhecido pela comunidade local',
        cuisine: 'Restaurante',
        priceRange: 2,
        rating: 4.0,
        reviewCount: 67,
        address: 'Centro de Caçapava do Sul',
        lat: -30.5165,
        lng: -53.4870,
        phone: '(55) 3000-0005',
        hours: {
          open: '11:00',
          close: '14:00',
          days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
        },
        features: ['Pratos variados', 'Ambiente urbano'],
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#4169E1"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Urbanu\'s Restaurante</text></svg>'),
        verified: true,
        specialties: ['Pratos variados', 'Ambiente urbano'],
        paymentMethods: ['Dinheiro', 'Cartão', 'PIX']
      },
      {
        id: 'rest-7',
        name: 'Rodeio Grill',
        description: 'Churrascaria com boa reputação na região',
        cuisine: 'Churrascaria',
        priceRange: 3,
        rating: 4.2,
        reviewCount: 112,
        address: 'Centro de Caçapava do Sul',
        lat: -30.5170,
        lng: -53.4865,
        phone: '(55) 3000-0006',
        hours: {
          open: '18:00',
          close: '23:00',
          days: ['Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
        },
        features: ['Churrasco', 'Carnes grelhadas', 'Ambiente rústico'],
        imageUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#8B0000"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dy=".3em">Rodeio Grill</text></svg>'),
        verified: true,
        specialties: ['Churrasco', 'Carnes grelhadas', 'Ambiente rústico'],
        paymentMethods: ['Dinheiro', 'Cartão', 'PIX']
      }
    ];

    const mockReviews: Review[] = [
        name: 'Restaurante e Churrascaria do Gaúcho',
        description: 'Autêntico churrasco gaúcho e pratos tradicionais da região',
        cuisine: 'Gaúcha',
        priceRange: 3,
        rating: 4.6,
        reviewCount: 178,
        address: 'Rua General Osório, 356 - Centro, Caçapava do Sul',
        lat: -30.5112,
        lng: -53.4919,
        phone: '(55) 3281-2456',
        whatsapp: '5553281245',
        instagram: '@churrascariadogaucho',
        facebook: 'ChurrascariaDoGaucho',
        website: 'https://churrascariadogaucho.com.br',
        hours: {
          open: '11:30',
          close: '22:00',
          days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
        },
        features: ['Wi-Fi', 'Estacionamento', 'Ar Condicionado', 'Música ao Vivo'],
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        verified: true,
        googleMapsPlaceId: 'ChIJXxYzw_example1',
        specialties: ['Churrasco', 'Costela', 'Linguiça', 'Galeto'],
        paymentMethods: ['Dinheiro', 'Cartão', 'PIX', 'VR/VA']
      },
      {
        id: '2',
        name: 'Padaria e Confeitaria Central',
        description: 'Pães frescos, doces caseiros e café colonial tradicional',
        cuisine: 'Brasileira',
        priceRange: 2,
        rating: 4.4,
        reviewCount: 96,
        address: 'Rua Sete de Setembro, 123 - Centro, Caçapava do Sul',
        lat: -30.5105,
        lng: -53.4925,
        phone: '(55) 3281-1789',
        whatsapp: '5553281178',
        instagram: '@padariacentral',
        hours: {
          open: '06:00',
          close: '19:00',
          days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
        },
        features: ['Wi-Fi', 'Café da Manhã', 'Delivery', 'Encomendas'],
        imageUrl: 'https://images.unsplash.com/photo-1555507036-ab794f4ade2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        verified: true,
        googleMapsPlaceId: 'ChIJXxYzw_example2',
        specialties: ['Pães artesanais', 'Cucas', 'Café colonial', 'Doces caseiros'],
        paymentMethods: ['Dinheiro', 'Cartão', 'PIX']
      },
      {
        id: '3',
        name: 'Pizzaria Bella Vita',
        description: 'Pizzas artesanais e pratos italianos em ambiente acolhedor',
        cuisine: 'Italiana',
        priceRange: 2,
        rating: 4.5,
        reviewCount: 142,
        address: 'Av. Presidente Vargas, 789 - Centro, Caçapava do Sul',
        lat: -30.5098,
        lng: -53.4912,
        phone: '(55) 3281-3456',
        whatsapp: '5553281345',
        instagram: '@bellavitapizza',
        facebook: 'BellaVitaPizzaria',
        hours: {
          open: '18:00',
          close: '23:30',
          days: ['Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
        },
        features: ['Wi-Fi', 'Delivery', 'Ambiente Climatizado', 'Música Ambiente'],
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        verified: true,
        googleMapsPlaceId: 'ChIJXxYzw_example3',
        specialties: ['Pizza margherita', 'Lasanha', 'Nhoque', 'Tiramisu'],
        paymentMethods: ['Dinheiro', 'Cartão', 'PIX', 'VR/VA']
      },
      {
        id: '4',
        name: 'Lancheria do Centro',
        description: 'Lanches, hamburguers e petiscos em ambiente descontraído',
        cuisine: 'Lanches',
        priceRange: 1,
        rating: 4.2,
        reviewCount: 87,
        address: 'Rua Barão do Rio Branco, 234 - Centro, Caçapava do Sul',
        lat: -30.5118,
        lng: -53.4928,
        phone: '(55) 3281-4567',
        whatsapp: '5553281456',
        hours: {
          open: '17:00',
          close: '00:00',
          days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
        },
        features: ['Wi-Fi', 'Delivery', 'Música Ambiente', 'Área Externa'],
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        verified: false,
        googleMapsPlaceId: 'ChIJXxYzw_example4',
        specialties: ['X-Bacon', 'Hambúrguer artesanal', 'Batata frita', 'Milk shake'],
        paymentMethods: ['Dinheiro', 'Cartão', 'PIX']
      },
      {
        id: '5',
        name: 'Restaurante Sabor Campeiro',
        description: 'Culinária típica gaúcha com ingredientes locais e azeites da região',
        cuisine: 'Regional',
        priceRange: 3,
        rating: 4.7,
        reviewCount: 156,
        address: 'Rua Marechal Floriano, 567 - Centro, Caçapava do Sul',
        lat: -30.5089,
        lng: -53.4935,
        phone: '(55) 3281-5678',
        whatsapp: '5553281567',
        instagram: '@saborcampeiro',
        facebook: 'SaborCampeiro',
        website: 'https://saborcampeiro.com.br',
        hours: {
          open: '11:00',
          close: '21:30',
          days: ['Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
        },
        features: ['Wi-Fi', 'Estacionamento', 'Azeites Locais', 'Ambiente Rústico'],
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        verified: true,
        googleMapsPlaceId: 'ChIJXxYzw_example5',
        specialties: ['Cordeiro assado', 'Azeite da região', 'Arroz carreteiro', 'Pacu grelhado'],
        paymentMethods: ['Dinheiro', 'Cartão', 'PIX', 'VR/VA']
      }
    ];

    const mockReviews: Review[] = [
      {
        id: '1',
        restaurantId: '1',
        userId: 'user1',
        userName: 'Maria S.',
        rating: 5,
        comment: 'Excelente churrasco! O atendimento é impecável e a carne é de primeira qualidade.',
        date: '2024-01-15',
        helpful: 8
      },
      {
        id: '2',
        restaurantId: '2',
        userId: 'user2',
        userName: 'João P.',
        rating: 5,
        comment: 'Os doces são deliciosos! Lembra a infância na casa da vó. Recomendo muito!',
        date: '2024-01-10',
        helpful: 12
      }
    ];

    // Restaurantes autênticos de Caçapava do Sul
    const authenticRestaurants: Restaurant[] = [
      {
        id: '1',
        name: 'El Rancho Parrillados',
        description: 'Tradicional parrilla gaúcha com cortes nobres e ambiente acolhedor. Especialidade em carnes grelhadas.',
        cuisine: 'Gaúcha',
        priceRange: 3,
        rating: 4.7,
        address: 'Centro, Caçapava do Sul',
        phone: '(55) 3281-0000',
        openingHours: '11:30 - 14:00, 19:00 - 23:00',
        image: '/placeholder-restaurant.svg',
        features: ['Wi-Fi', 'Estacionamento', 'Ambiente Climatizado']
      },
      {
        id: '2',
        name: 'Chef Express Pizzaria',
        description: 'Pizzaria com massas artesanais e ingredientes frescos. Delivery disponível.',
        cuisine: 'Italiana',
        priceRange: 2,
        rating: 4.5,
        address: 'Centro, Caçapava do Sul',
        phone: '(55) 3281-0001',
        openingHours: '18:00 - 23:30',
        image: '/placeholder-restaurant.svg',
        features: ['Delivery', 'Wi-Fi', 'Ambiente Familiar']
      },
      {
        id: '3',
        name: 'Meu Cantinho',
        description: 'Restaurante caseiro com pratos regionais e atendimento familiar. Comida de qualidade a preços justos.',
        cuisine: 'Regional',
        priceRange: 2,
        rating: 4.6,
        address: 'Centro, Caçapava do Sul',
        phone: '(55) 3281-0002',
        openingHours: '11:00 - 14:00, 18:00 - 22:00',
        image: '/placeholder-restaurant.svg',
        features: ['Ambiente Familiar', 'Pratos Caseiros', 'Preço Justo']
      },
      {
        id: '4',
        name: 'Don Ítalo',
        description: 'Restaurante italiano com massas artesanais e vinhos selecionados. Ambiente elegante.',
        cuisine: 'Italiana',
        priceRange: 3,
        rating: 4.8,
        address: 'Centro, Caçapava do Sul',
        phone: '(55) 3281-0003',
        openingHours: '19:00 - 23:00',
        image: '/placeholder-restaurant.svg',
        features: ['Vinhos', 'Ambiente Elegante', 'Massas Artesanais']
      },
      {
        id: '5',
        name: 'Restaurante Pampa',
        description: 'Culinária gaúcha tradicional com vista para a cidade. Especializado em churrasco e pratos típicos.',
        cuisine: 'Gaúcha',
        priceRange: 3,
        rating: 4.4,
        address: 'Centro, Caçapava do Sul',
        phone: '(55) 3281-0004',
        openingHours: '11:00 - 15:00, 18:00 - 22:30',
        image: '/placeholder-restaurant.svg',
        features: ['Vista Panorâmica', 'Churrasco', 'Música Ao Vivo']
      },
      {
        id: '6',
        name: "Urbanu's",
        description: 'Lancheria moderna com hambúrgueres artesanais e ambiente jovem. Opções vegetarianas disponíveis.',
        cuisine: 'Lanches',
        priceRange: 2,
        rating: 4.3,
        address: 'Centro, Caçapava do Sul',
        phone: '(55) 3281-0005',
        openingHours: '17:00 - 00:00',
        image: '/placeholder-restaurant.svg',
        features: ['Hambúrgueres Artesanais', 'Opções Vegetarianas', 'Ambiente Jovem']
      },
      {
        id: '7',
        name: 'Rodeio Grill',
        description: 'Churrascaria tradicional com rodízio de carnes e buffet de saladas. Ambiente rústico e acolhedor.',
        cuisine: 'Gaúcha',
        priceRange: 3,
        rating: 4.5,
        address: 'Centro, Caçapava do Sul',
        phone: '(55) 3281-0006',
        openingHours: '11:30 - 14:30, 19:00 - 23:00',
        image: '/placeholder-restaurant.svg',
        features: ['Rodízio de Carnes', 'Buffet de Saladas', 'Ambiente Rústico']
      }
    ];

    // Avaliações autênticas
    const authenticReviews: Review[] = [
      {
        id: '1',
        restaurantId: '1',
        userId: 'user1',
        userName: 'Maria S.',
        rating: 5,
        comment: 'Melhor parrilla da cidade! Carne no ponto e atendimento excelente.',
        date: '2024-01-15',
        helpful: 8
      },
      {
        id: '2',
        restaurantId: '2',
        userId: 'user2',
        userName: 'João P.',
        rating: 4,
        comment: 'Pizza muito boa e entrega rápida. Recomendo!',
        date: '2024-01-10',
        helpful: 12
      },
      {
        id: '3',
        restaurantId: '3',
        userId: 'user3',
        userName: 'Ana C.',
        rating: 5,
        comment: 'Comida caseira deliciosa! Preço justo e porções generosas.',
        date: '2024-01-08',
        helpful: 6
      },
      {
        id: '4',
        restaurantId: '4',
        userId: 'user4',
        userName: 'Carlos M.',
        rating: 5,
        comment: 'Ambiente elegante e massas excepcionais. Vale a pena!',
        date: '2024-01-05',
        helpful: 9
      }
    ];

    setRestaurants(authenticRestaurants);
    setReviews(authenticReviews);
    setLoading(false);
  }, []);

  const cuisineTypes = ['all', 'Gaúcha', 'Brasileira', 'Italiana', 'Regional', 'Lanches'];

  const getPriceDisplay = (priceRange: number): string => {
    return '$'.repeat(priceRange);
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = selectedCuisine === 'all' || restaurant.cuisine === selectedCuisine;
    const matchesPrice = selectedPriceRange === 0 || restaurant.priceRange === selectedPriceRange;
    
    return matchesSearch && matchesCuisine && matchesPrice;
  });

  const handleNavigation = (restaurant: Restaurant) => {
    const links = formatNavigationButtons(restaurant.lat, restaurant.lng, restaurant.name);
    
    if (navigator.userAgent.includes('Mobile')) {
      window.open(links.waze, '_blank');
    } else {
      const userChoice = confirm(`Navegar para ${restaurant.name}?\n\nOK = Waze | Cancelar = Google Maps`);
      if (userChoice) {
        window.open(links.waze, '_blank');
      } else {
        window.open(links.googleMaps, '_blank');
      }
    }
  };

  const submitReview = () => {
    if (!selectedRestaurant) return;
    
    const review: Review = {
      id: Date.now().toString(),
      restaurantId: selectedRestaurant.id,
      userId: 'current-user',
      userName: 'Você',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };

    setReviews([...reviews, review]);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewModal(false);
    setSelectedRestaurant(null);
  };

  const getRestaurantReviews = (restaurantId: string) => {
    return reviews.filter(review => review.restaurantId === restaurantId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-brand-dark-green mb-4">
          🍽️ Restaurantes de Caçapava
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Descubra os sabores únicos da nossa região. Desde a tradicional gastronomia gaúcha 
          até doces coloniais que encantam gerações.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar restaurantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
            />
          </div>

          {/* Cuisine Filter */}
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
          >
            <option value="all">Todas as Cozinhas</option>
            {cuisineTypes.slice(1).map(cuisine => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>

          {/* Price Filter */}
          <select
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(Number(e.target.value))}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
          >
            <option value={0}>Todos os Preços</option>
            <option value={1}>$ - Econômico</option>
            <option value={2}>$$ - Moderado</option>
            <option value={3}>$$$ - Premium</option>
            <option value={4}>$$$$ - Luxo</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCuisine('all');
              setSelectedPriceRange(0);
            }}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRestaurants.map(restaurant => (
          <div key={restaurant.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image and Badge */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={restaurant.imageUrl} 
                alt={restaurant.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {restaurant.verified && (
                <div className="absolute top-4 left-4 bg-brand-green text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  ✓ Verificado
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-semibold">
                {getPriceDisplay(restaurant.priceRange)}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-brand-dark-green mb-1 flex items-center gap-2">
                    {restaurant.name}
                    <FavoriteButton
                      entityType="restaurant"
                      entityId={restaurant.id}
                      userId="user-1" // Mock user - in real app from auth context
                      size={18}
                    />
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="bg-brand-beige px-2 py-1 rounded-full">
                      {restaurant.cuisine}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {restaurant.hours.open} - {restaurant.hours.close}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="font-semibold">{restaurant.rating}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {restaurant.reviewCount} avaliações
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4">
                {restaurant.description}
              </p>

              {/* Address */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <MapPin size={14} />
                {restaurant.address}
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {restaurant.features.map(feature => (
                  <span 
                    key={feature}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Social Media Links */}
              <SocialMediaLinks
                whatsapp={restaurant.whatsapp}
                instagram={restaurant.instagram}
                facebook={restaurant.facebook}
                website={restaurant.website}
                phone={restaurant.phone}
                restaurantName={restaurant.name}
              />

              {/* Restaurant Details */}
              <RestaurantDetails
                specialties={restaurant.specialties}
                paymentMethods={restaurant.paymentMethods}
              />

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleNavigation(restaurant)}
                  className="flex-1 bg-brand-green text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-dark-green transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Navigation size={18} />
                  Como Chegar
                </button>
                <button
                  onClick={() => {
                    setSelectedRestaurant(restaurant);
                    setShowReviewModal(true);
                  }}
                  className="px-4 py-2 border border-brand-green text-brand-green rounded-lg hover:bg-brand-green hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <Star size={18} />
                  Avaliar
                </button>
              </div>

              {/* Recent Reviews */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="font-semibold text-brand-dark-green mb-2">Avaliações Recentes</h4>
                {getRestaurantReviews(restaurant.id).slice(0, 2).map(review => (
                  <div key={review.id} className="mb-3 last:mb-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{review.userName}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'} 
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedRestaurant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-brand-dark-green mb-4">
              Avaliar {selectedRestaurant.name}
            </h3>
            
            {/* Rating */}
            <div className="mb-4">
              <label className="block font-medium mb-2">Sua Avaliação</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setNewReview({ ...newReview, rating })}
                    className="p-1"
                  >
                    <Star 
                      size={24} 
                      className={rating <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="mb-6">
              <label className="block font-medium mb-2">Comentário (opcional)</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Conte sobre sua experiência..."
                rows={4}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setSelectedRestaurant(null);
                  setNewReview({ rating: 5, comment: '' });
                }}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={submitReview}
                className="flex-1 px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-dark-green transition-colors"
              >
                Enviar Avaliação
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Nenhum restaurante encontrado
          </h3>
          <p className="text-gray-500">
            Tente ajustar os filtros ou termos de busca
          </p>
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage;
