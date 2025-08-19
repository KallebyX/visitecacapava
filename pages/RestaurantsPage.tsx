import React, { useState, useEffect } from 'react';
import { MapPin, Star, Clock, Users, Utensils, Search, Filter, Navigation } from 'lucide-react';
import { backendService } from '../services/backendService';
import { formatNavigationButtons } from '../utils/navigationUtils';

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
  hours: {
    open: string;
    close: string;
    days: string[];
  };
  features: string[];
  imageUrl: string;
  verified: boolean;
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

  // Mock data baseado em estabelecimentos reais de Caçapava do Sul
  useEffect(() => {
    const mockRestaurants: Restaurant[] = [
      {
        id: '1',
        name: 'Restaurante e Churrascaria do Gaúcho',
        description: 'Autêntico churrasco gaúcho e pratos tradicionais da região',
        cuisine: 'Gaúcha',
        priceRange: 3,
        rating: 4.6,
        reviewCount: 89,
        address: 'Rua General Osório, 234 - Centro',
        lat: -30.5142,
        lng: -53.4890,
        phone: '(53) 3281-2345',
        hours: { open: '11:30', close: '22:00', days: ['Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] },
        features: ['Estacionamento', 'Wi-Fi', 'Aceita Cartão', 'Ambiente Familiar'],
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr8XzKqY9H3QbZWnZKpW_yF4-Lq5sQ7QkZQw&s',
        verified: true
      },
      {
        id: '2',
        name: 'Padaria e Confeitaria Central',
        description: 'Pães frescos, doces caseiros e café colonial tradicional',
        cuisine: 'Brasileira',
        priceRange: 2,
        rating: 4.8,
        reviewCount: 156,
        address: 'Praça Coronel João Pessoa, 45 - Centro',
        lat: -30.5148,
        lng: -53.4895,
        phone: '(53) 3281-1567',
        hours: { open: '06:00', close: '19:00', days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] },
        features: ['Wi-Fi', 'Aceita Cartão', 'Takeaway', 'Ambiente Familiar'],
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2XzY9K3QbZWnZKpW_yF4-Lq5sQ7QkZw&s',
        verified: true
      },
      {
        id: '3',
        name: 'Pizzaria Bella Vita',
        description: 'Pizzas artesanais e pratos italianos em ambiente acolhedor',
        cuisine: 'Italiana',
        priceRange: 2,
        rating: 4.4,
        reviewCount: 73,
        address: 'Rua Marechal Floriano, 178 - Centro',
        lat: -30.5140,
        lng: -53.4885,
        phone: '(53) 3281-3456',
        hours: { open: '18:30', close: '23:30', days: ['Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] },
        features: ['Delivery', 'Wi-Fi', 'Aceita Cartão', 'Ambiente Jovem'],
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY8Z9K3QbZWnZKpW_yF4-Lq5sQ7QkZw&s',
        verified: true
      },
      {
        id: '4',
        name: 'Lancheria do Centro',
        description: 'Lanches, hamburguers e petiscos em ambiente descontraído',
        cuisine: 'Lanches',
        priceRange: 1,
        rating: 4.2,
        reviewCount: 124,
        address: 'Rua General Vasco Alves, 89 - Centro',
        lat: -30.5145,
        lng: -53.4880,
        phone: '(53) 3281-4567',
        hours: { open: '17:00', close: '01:00', days: ['Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] },
        features: ['Delivery', 'Aceita PIX', 'Ambiente Jovem', 'Música ao Vivo'],
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX7Z8K3QbZWnZKpW_yF4-Lq5sQ7QkZw&s',
        verified: false
      },
      {
        id: '5',
        name: 'Restaurante Sabor Campeiro',
        description: 'Culinária típica gaúcha com ingredientes locais e azeites da região',
        cuisine: 'Regional',
        priceRange: 3,
        rating: 4.7,
        reviewCount: 92,
        address: 'Estrada para as Guaritas, Km 3',
        lat: -30.5200,
        lng: -53.5000,
        phone: '(53) 3281-5678',
        hours: { open: '12:00', close: '20:00', days: ['Sex', 'Sáb', 'Dom'] },
        features: ['Estacionamento', 'Vista Panorâmica', 'Produtos Locais', 'Azeites Premiados'],
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW6Y7K3QbZWnZKpW_yF4-Lq5sQ7QkZw&s',
        verified: true
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

    setRestaurants(mockRestaurants);
    setReviews(mockReviews);
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
                  <h3 className="text-xl font-bold text-brand-dark-green mb-1">
                    {restaurant.name}
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

              {/* Actions */}
              <div className="flex gap-3">
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
