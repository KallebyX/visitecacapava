import React, { useState, useEffect } from 'react';
import { FaStar, FaUser, FaCalendar, FaReply, FaThumbsUp, FaThumbsDown, FaEdit } from 'react-icons/fa';
import { backendService } from '../../services/backendService';
import type { Review } from '../../types';

const RestaurantReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [newResponse, setNewResponse] = useState<{[key: string]: string}>({});
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  // Mock restaurant ID - in real app this would come from route params
  const restaurantId = '1';

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const result = await backendService.getReviews('restaurant', restaurantId);
      setReviews(result.items);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async () => {
    try {
      const userId = 'user-1'; // Mock current user - in real app from auth context
      await backendService.createReview(
        userId,
        'restaurant',
        restaurantId,
        newReview.rating,
        newReview.comment
      );
      setNewReview({ rating: 5, comment: '' });
      setShowAddReviewModal(false);
      loadReviews(); // Reload reviews
    } catch (error) {
      alert('Erro ao criar avaliação: ' + (error as Error).message);
    }
  };

  const handleResponse = async (reviewId: string) => {
    if (newResponse[reviewId]?.trim()) {
      try {
        await backendService.updateReviewResponse(reviewId, newResponse[reviewId]);
        setNewResponse(prev => ({ ...prev, [reviewId]: '' }));
        loadReviews(); // Reload to get updated response
      } catch (error) {
        console.error('Error updating response:', error);
      }
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={`star-${star}`}>
            <FaStar
              size={16}
              color={star <= rating ? '#fbbf24' : '#d1d5db'}
            />
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  const filteredReviews = filterRating 
    ? reviews.filter(review => review.rating === filterRating)
    : reviews;

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
  const totalReviews = reviews.length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Carregando avaliações...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-brand-dark-green">
            Avaliações dos Clientes
          </h1>
          
          <button
            onClick={() => setShowAddReviewModal(true)}
            className="bg-brand-green text-white px-4 py-2 rounded-lg hover:bg-brand-dark-green transition-colors flex items-center gap-2"
          >
            <FaEdit size={16} />
            Nova Avaliação
          </button>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FaStar size={24} color="#fbbf24" />
              <div>
                <p className="text-2xl font-bold text-yellow-700">
                  {averageRating.toFixed(1)}
                </p>
                <p className="text-sm text-yellow-600">Avaliação Média</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FaUser size={24} color="#3b82f6" />
              <div>
                <p className="text-2xl font-bold text-blue-700">{totalReviews}</p>
                <p className="text-sm text-blue-600">Total de Avaliações</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FaThumbsUp size={24} color="#16a34a" />
              <div>
                <p className="text-2xl font-bold text-green-700">
                  {reviews.filter(r => r.rating >= 4).length}
                </p>
                <p className="text-sm text-green-600">Avaliações Positivas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium text-gray-700">Filtrar por:</span>
          <select
            value={filterRating || ''}
            onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
          >
            <option value="">Todas as avaliações</option>
            <option value="5">5 estrelas</option>
            <option value="4">4 estrelas</option>
            <option value="3">3 estrelas</option>
            <option value="2">2 estrelas</option>
            <option value="1">1 estrela</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map(review => (
          <div key={review.id} className="bg-white rounded-xl shadow-lg p-6">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
                  {review.user?.avatarUrl ? (
                    <img 
                      src={review.user.avatarUrl} 
                      alt={review.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <FaUser color="white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    {review.user?.name || 'Usuário'}
                    {review.verified && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        ✓ Verificado
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <FaCalendar size={12} />
                    {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
              {renderStars(review.rating)}
            </div>

            {/* Review Content */}
            <p className="text-gray-700 mb-4">{review.comment}</p>

            {/* Review Actions */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm">
                  <FaThumbsUp size={14} />
                  <span>Útil ({review.helpful})</span>
                </button>
                <button className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm">
                  <FaThumbsDown size={14} />
                  <span>Não útil ({review.notHelpful})</span>
                </button>
              </div>
            </div>

            {/* Restaurant Response */}
            {review.response && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaReply size={14} color="#3b82f6" />
                  <span className="text-sm font-semibold text-blue-700">
                    Resposta do Restaurante
                  </span>
                </div>
                <p className="text-blue-700 text-sm">{review.response}</p>
              </div>
            )}

            {/* Response Form */}
            {!review.response && (
              <div className="mt-4 border-t border-gray-100 pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Responder Avaliação
                </h4>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Digite sua resposta..."
                    value={newResponse[review.id] || ''}
                    onChange={(e) => setNewResponse(prev => ({
                      ...prev,
                      [review.id]: e.target.value
                    }))}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <button
                    onClick={() => handleResponse(review.id)}
                    className="bg-brand-green text-white px-4 py-2 rounded-lg text-sm hover:bg-brand-dark-green transition-colors"
                  >
                    Responder
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mx-auto mb-4">
            <FaStar size={48} color="#d1d5db" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {reviews.length === 0 ? 'Seja o primeiro a avaliar!' : 'Nenhuma avaliação encontrada'}
          </h3>
          <p className="text-gray-500 mb-4">
            {filterRating 
              ? `Não há avaliações com ${filterRating} estrelas.`
              : 'Ainda não há avaliações para este restaurante.'
            }
          </p>
          {reviews.length === 0 && (
            <button
              onClick={() => setShowAddReviewModal(true)}
              className="bg-brand-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark-green transition-colors"
            >
              Escrever primeira avaliação
            </button>
          )}
        </div>
      )}

      {/* Add Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-brand-dark-green mb-4">
              Adicionar Avaliação
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Classificação
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                    className="p-1"
                  >
                    <FaStar
                      size={20}
                      color={star <= newReview.rating ? '#fbbf24' : '#d1d5db'}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentário
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg p-3 h-24 resize-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                placeholder="Compartilhe sua experiência..."
                required
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddReviewModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddReview}
                disabled={!newReview.comment.trim()}
                className="flex-1 px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-dark-green transition-colors disabled:opacity-50"
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantReviewsPage;
