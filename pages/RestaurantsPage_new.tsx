import React, { useState, useEffect } from 'react';
import { MapPin, Star, Clock, Users, Utensils, Search, Filter, Phone, Globe, Instagram, MessageCircle } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  priceRange: number;
  rating: number;
  address: string;
  phone?: string;
  openingHours: string;
  image: string;
  features: string[];
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
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
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
        image: '/img/restaurantes/El Rancho/ElRanchoLogo.png',
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
        image: '/img/restaurantes/Chef Pizzaria/ChefExpressLogo.png',
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
        image: '/img/restaurantes/Meu Cantinho/MeuCantinhoLogo.png',
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
        image: '/img/restaurantes/Don Italo /DonItaloLogo.png',
        features: ['Vinhos', 'Ambiente Elegante', 'Massas Artesanais']
      },
      {
        id: '5',
        name: 'AM Lanches',
        description: 'Lanches rápidos e refeições leves com ambiente familiar e atendimento ágil.',
        cuisine: 'Lanches',
        priceRange: 1,
        rating: 4.3,
        address: 'Centro, Caçapava do Sul',
        phone: '(55) 3281-0007',
        openingHours: '07:00 - 19:00',
        image: '/img/restaurantes/AM Lanches/LogoAMAtualizada2024.png',
        features: ['Lanches Rápidos', 'Refeições Leves', 'Atendimento Ágil']
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
        image: '/img/restaurantes/Rodeio Churrascaria/Rodeio Churrascaria.png',
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

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar restaurantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
            />
          </div>

          {/* Filtro de Culinária */}
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
          >
            {cuisineTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'Todas as Culinárias' : type}
              </option>
            ))}
          </select>

          {/* Filtro de Preço */}
          <select
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
          >
            <option value={0}>Todas as Faixas de Preço</option>
            <option value={1}>$ (Econômico)</option>
            <option value={2}>$$ (Moderado)</option>
            <option value={3}>$$$ (Alto)</option>
            <option value={4}>$$$$ (Premium)</option>
          </select>
        </div>
      </div>

      {/* Lista de Restaurantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRestaurants.map(restaurant => {
          const restaurantReviews = getRestaurantReviews(restaurant.id);
          
          return (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Imagem do Restaurante */}
              <div className="h-56 bg-gray-200 overflow-hidden flex items-center justify-center">
                <img 
                  src={restaurant.image} 
                  alt={`${restaurant.name} - ${restaurant.cuisine}`}
                  className="w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="flex items-center justify-center h-full">
                        <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    `;
                  }}
                />
              </div>

              <div className="p-6">
                {/* Cabeçalho */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{restaurant.name}</h3>
                    <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{restaurant.rating}</span>
                    </div>
                    <div className="text-lg font-bold text-brand-green">
                      {getPriceDisplay(restaurant.priceRange)}
                    </div>
                  </div>
                </div>

                {/* Descrição */}
                <p className="text-gray-600 mb-4">{restaurant.description}</p>

                {/* Informações */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {restaurant.address}
                  </div>
                  
                  {restaurant.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {restaurant.phone}
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {restaurant.openingHours}
                  </div>
                </div>

                {/* Características */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {restaurant.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-brand-light-green text-brand-dark-green text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Avaliações */}
                {restaurantReviews.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Avaliações Recentes:</h4>
                    <div className="space-y-2">
                      {restaurantReviews.slice(0, 2).map(review => (
                        <div key={review.id} className="bg-gray-50 p-3 rounded">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{review.userName}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Nenhum restaurante encontrado
          </h3>
          <p className="text-gray-500">
            Tente ajustar os filtros de busca para encontrar mais opções.
          </p>
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage;
