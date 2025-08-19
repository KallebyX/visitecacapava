import React, { useState, useEffect } from 'react';
import { Star, Users, TrendingUp, MessageSquare, ThumbsUp, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface RestaurantStats {
  totalReviews: number;
  averageRating: number;
  monthlyVisitors: number;
  satisfaction: number;
}

const RestaurantDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<RestaurantStats>({
    totalReviews: 0,
    averageRating: 0,
    monthlyVisitors: 0,
    satisfaction: 0
  });
  const [recentReviews, setRecentReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Mock data baseado no usuário logado
    const mockStats: RestaurantStats = {
      totalReviews: user?.name === 'Restaurante do Gaúcho' ? 89 : 73,
      averageRating: user?.name === 'Restaurante do Gaúcho' ? 4.6 : 4.4,
      monthlyVisitors: user?.name === 'Restaurante do Gaúcho' ? 450 : 320,
      satisfaction: user?.name === 'Restaurante do Gaúcho' ? 92 : 88
    };

    const mockReviews: Review[] = [
      {
        id: '1',
        customerName: 'Maria Silva',
        rating: 5,
        comment: 'Comida excelente e atendimento impecável! Recomendo muito.',
        date: '2024-01-15',
        verified: true
      },
      {
        id: '2',
        customerName: 'João Santos',
        rating: 4,
        comment: 'Ambiente agradável e pratos saborosos. Voltarei em breve.',
        date: '2024-01-10',
        verified: true
      },
      {
        id: '3',
        customerName: 'Ana Costa',
        rating: 5,
        comment: 'Melhor experiência gastronômica de Caçapava do Sul!',
        date: '2024-01-08',
        verified: false
      }
    ];

    setStats(mockStats);
    setRecentReviews(mockReviews);
  }, [user]);

  const StatCard: React.FC<{ 
    icon: React.ReactNode; 
    title: string; 
    value: string | number; 
    subtitle?: string;
    color: string;
  }> = ({ icon, title, value, subtitle, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20`, color }}>
          {icon}
        </div>
      </div>
    </div>
  );

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard - {user?.name}</h1>
        <p className="text-gray-600 mt-2">
          Acompanhe o desempenho do seu restaurante no app Visite Caçapava
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Star size={24} />}
          title="Avaliação Média"
          value={stats.averageRating.toFixed(1)}
          subtitle="⭐ de 5 estrelas"
          color="#F59E0B"
        />
        <StatCard
          icon={<MessageSquare size={24} />}
          title="Total de Avaliações"
          value={stats.totalReviews}
          subtitle="reviews verificadas"
          color="#3B82F6"
        />
        <StatCard
          icon={<Users size={24} />}
          title="Visitantes/Mês"
          value={stats.monthlyVisitors}
          subtitle="através do app"
          color="#10B981"
        />
        <StatCard
          icon={<ThumbsUp size={24} />}
          title="Satisfação"
          value={`${stats.satisfaction}%`}
          subtitle="clientes satisfeitos"
          color="#8B5CF6"
        />
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Avaliações Recentes</h2>
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
            {recentReviews.length} novas
          </span>
        </div>

        <div className="space-y-4">
          {recentReviews.map(review => (
            <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {review.customerName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{review.customerName}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                          Verificado
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-700 ml-13">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Insights de Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingUp className="text-green-600" size={20} />
                <span className="text-sm font-medium text-gray-900">Avaliações em alta</span>
              </div>
              <span className="text-green-600 font-bold">+15%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="text-blue-600" size={20} />
                <span className="text-sm font-medium text-gray-900">Novos clientes</span>
              </div>
              <span className="text-blue-600 font-bold">+8%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Award className="text-yellow-600" size={20} />
                <span className="text-sm font-medium text-gray-900">Ranking no app</span>
              </div>
              <span className="text-yellow-600 font-bold">#2</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Dicas de Melhoria</h3>
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
              <h4 className="font-semibold text-orange-800 mb-1">Responda às avaliações</h4>
              <p className="text-sm text-orange-700">
                Restaurantes que respondem às avaliações têm 20% mais engajamento.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-800 mb-1">Atualize fotos do cardápio</h4>
              <p className="text-sm text-blue-700">
                Fotos atualizadas aumentam a atratividade em 35%.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <h4 className="font-semibold text-green-800 mb-1">Promova pratos especiais</h4>
              <p className="text-sm text-green-700">
                Destaque ingredientes locais e azeites premiados da região.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
