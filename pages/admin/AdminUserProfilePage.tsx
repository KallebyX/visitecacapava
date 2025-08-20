import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, MapPin, Calendar, Star, Camera, Heart, MessageCircle, 
  Trophy, Award, Eye, TrendingUp, Activity, Clock, 
  ArrowLeft, Download, FileText, BarChart3, Users,
  Building, Utensils, CheckCircle, XCircle, AlertTriangle
} from 'lucide-react';
import { backendService } from '../../services/backendService';
import type { User as UserType, PointOfInterest, Photo, Review, Favorite } from '../../types';

interface UserAnalytics {
  totalVisits: number;
  totalPoints: number;
  totalPhotos: number;
  totalReviews: number;
  averageRating: number;
  favoriteLocations: string[];
  visitFrequency: { month: string; visits: number }[];
  engagementScore: number;
  lastActivity: string;
  registrationDate: string;
  checkInHistory: { date: string; location: string; points: number }[];
}

const AdminUserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<UserType | null>(null);
  const [userAnalytics, setUserAnalytics] = useState<UserAnalytics | null>(null);
  const [visitedPois, setVisitedPois] = useState<(PointOfInterest & { visitDate: string })[]>([]);
  const [userPhotos, setUserPhotos] = useState<Photo[]>([]);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [userFavorites, setUserFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (userId) {
      loadUserData();
    }
  }, [userId]);

  const loadUserData = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      
      // Load user basic data
      const users = await backendService.getUsers();
      const userData = users.find(u => u.id === userId);
      if (!userData) {
        throw new Error('Usuário não encontrado');
      }
      setUser(userData);

      // Load user's visited POIs
      const fetchVisitedPois = async () => {
        const pois = await Promise.all(
          userData.visited.map(async (visit) => {
            const poi = await backendService.getPointOfInterestById(visit.pointId);
            return poi ? { ...poi, visitDate: visit.date } : null;
          })
        );
        setVisitedPois(pois.filter((p): p is PointOfInterest & { visitDate: string } => !!p));
      };
      await fetchVisitedPois();

      // Load user photos
      const photos = await backendService.getUserPhotos(userId);
      setUserPhotos(photos || []);

      // Load user reviews  
      const reviews = await backendService.getUserReviews(userId);
      setUserReviews(reviews || []);

      // Load user favorites
      const favorites = await backendService.getUserFavorites(userId);
      setUserFavorites(favorites || []);

      // Generate analytics
      const analytics: UserAnalytics = {
        totalVisits: userData.visited.length,
        totalPoints: userData.points,
        totalPhotos: photos?.length || 0,
        totalReviews: reviews?.length || 0,
        averageRating: reviews?.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0,
        favoriteLocations: favorites?.slice(0, 5).map(f => f.entityId) || [],
        visitFrequency: generateVisitFrequency(userData.visited),
        engagementScore: calculateEngagementScore(userData, photos, reviews),
        lastActivity: getLastActivity(userData, photos, reviews),
        registrationDate: userData.joinDate || '2025-01-01',
        checkInHistory: userData.visited.map(v => ({
          date: v.date,
          location: visitedPois.find(p => p.id === v.pointId)?.name || 'Local desconhecido',
          points: visitedPois.find(p => p.id === v.pointId)?.points || 0
        }))
      };
      setUserAnalytics(analytics);

    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateVisitFrequency = (visits: { pointId: string; date: string }[]) => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const frequency = months.map(month => ({ month, visits: 0 }));
    
    visits.forEach(visit => {
      const date = new Date(visit.date);
      const monthIndex = date.getMonth();
      frequency[monthIndex].visits++;
    });
    
    return frequency;
  };

  const calculateEngagementScore = (user: UserType, photos: Photo[], reviews: Review[]) => {
    let score = 0;
    score += user.visited.length * 10; // 10 points per visit
    score += (photos?.length || 0) * 5; // 5 points per photo
    score += (reviews?.length || 0) * 15; // 15 points per review
    score += user.badges.length * 20; // 20 points per badge
    return Math.min(score, 1000); // Cap at 1000
  };

  const getLastActivity = (user: UserType, photos: Photo[], reviews: Review[]) => {
    const dates = [
      ...user.visited.map(v => new Date(v.date)),
      ...(photos?.map(p => new Date(p.timestamp)) || []),
      ...(reviews?.map(r => new Date(r.createdAt)) || [])
    ];
    
    if (dates.length === 0) return 'Nunca';
    
    const lastDate = new Date(Math.max(...dates.map(d => d.getTime())));
    return lastDate.toLocaleDateString('pt-BR');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados do usuário...</p>
        </div>
      </div>
    );
  }

  if (!user || !userAnalytics) {
    return (
      <div className="text-center py-12">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Usuário não encontrado</h2>
        <p className="text-gray-600 mb-6">O usuário solicitado não existe ou foi removido.</p>
        <Link to="/admin/tourists" className="bg-brand-green text-white px-6 py-3 rounded-lg hover:bg-brand-dark-green transition-colors">
          Voltar para Lista de Turistas
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            to="/admin/tourists"
            className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Perfil Detalhado do Turista</h1>
            <p className="text-gray-600">Análise completa de atividades e engajamento</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar Dados
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Gerar Relatório
          </button>
        </div>
      </div>

      {/* User Summary Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-start gap-6">
          <img 
            src={user.avatarUrl} 
            alt={user.name} 
            className="w-24 h-24 rounded-full object-cover border-4 border-brand-light-green" 
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              {user.verified && <CheckCircle className="w-6 h-6 text-green-500" />}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-green">{userAnalytics.totalPoints}</div>
                <div className="text-sm text-gray-600">Pontos Totais</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-green">{userAnalytics.totalVisits}</div>
                <div className="text-sm text-gray-600">Locais Visitados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-green">{userAnalytics.engagementScore}</div>
                <div className="text-sm text-gray-600">Score Engajamento</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-green">{userAnalytics.lastActivity}</div>
                <div className="text-sm text-gray-600">Última Atividade</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>📧 {user.email}</span>
              {user.phone && <span>📱 {user.phone}</span>}
              {user.hometown && <span>🏠 {user.hometown}</span>}
              <span>📅 Membro desde {formatDate(userAnalytics.registrationDate)}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col gap-2">
            <button className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm hover:bg-green-200 transition-colors">
              ✅ Ativo
            </button>
            <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm hover:bg-blue-200 transition-colors">
              💬 Contatar
            </button>
            <button className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-sm hover:bg-orange-200 transition-colors">
              ⚠️ Sinalizar
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 rounded-lg p-2">
              <Camera className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Fotos Compartilhadas</h3>
              <p className="text-2xl font-bold text-blue-600">{userAnalytics.totalPhotos}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Total de curtidas recebidas: {userPhotos.reduce((sum, photo) => sum + (photo.likes?.length || 0), 0)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 rounded-lg p-2">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Avaliações</h3>
              <p className="text-2xl font-bold text-green-600">{userAnalytics.totalReviews}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Média: {userAnalytics.averageRating.toFixed(1)} ⭐
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 rounded-lg p-2">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Favoritos</h3>
              <p className="text-2xl font-bold text-purple-600">{userFavorites.length}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {userFavorites.filter(f => f.entityType === 'restaurant').length} restaurantes, {userFavorites.filter(f => f.entityType === 'poi').length} locais
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 rounded-lg p-2">
              <Trophy className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Conquistas</h3>
              <p className="text-2xl font-bold text-orange-600">{user.badges.length}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Badges desbloqueados
          </p>
        </div>
      </div>

      {/* Detailed Tabs */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
              { id: 'visits', label: 'Histórico de Visitas', icon: MapPin },
              { id: 'content', label: 'Conteúdo Criado', icon: Camera },
              { id: 'engagement', label: 'Engajamento', icon: Activity },
              { id: 'insights', label: 'Insights', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-brand-green text-brand-green'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Resumo de Atividades</h3>
              
              {/* Visit Frequency Chart */}
              <div>
                <h4 className="font-semibold mb-3">Frequência de Visitas por Mês</h4>
                <div className="grid grid-cols-12 gap-2 h-32">
                  {userAnalytics.visitFrequency.map((month, index) => (
                    <div key={index} className="flex flex-col items-center justify-end">
                      <div 
                        className="bg-brand-green rounded-t w-full"
                        style={{ 
                          height: `${Math.max((month.visits / Math.max(...userAnalytics.visitFrequency.map(m => m.visits))) * 100, 5)}%` 
                        }}
                      ></div>
                      <span className="text-xs text-gray-600 mt-1">{month.month}</span>
                      <span className="text-xs text-gray-500">{month.visits}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity Timeline */}
              <div>
                <h4 className="font-semibold mb-3">Linha do Tempo Recente</h4>
                <div className="space-y-3">
                  {userAnalytics.checkInHistory.slice(0, 5).map((checkin, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="bg-brand-green rounded-full p-2">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium">{checkin.location}</h5>
                        <p className="text-sm text-gray-600">{formatDate(checkin.date)}</p>
                      </div>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        +{checkin.points} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'visits' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Histórico Completo de Visitas ({visitedPois.length})</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visitedPois.map((poi) => (
                  <div key={`${poi.id}-${poi.visitDate}`} className="border border-gray-200 rounded-lg p-4">
                    <img src={poi.imageUrl} alt={poi.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                    <h4 className="font-semibold text-gray-900">{poi.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{formatDate(poi.visitDate)}</p>
                    <span className="bg-brand-green text-white px-2 py-1 rounded-full text-xs">
                      +{poi.points} pontos
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Conteúdo Criado pelo Usuário</h3>
              
              {/* Photos */}
              <div>
                <h4 className="font-semibold mb-3">Fotos Compartilhadas ({userPhotos.length})</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {userPhotos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <img 
                        src={photo.imageUrl} 
                        alt={photo.caption} 
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {photo.likes?.length || 0}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h4 className="font-semibold mb-3">Avaliações Escritas ({userReviews.length})</h4>
                <div className="space-y-3">
                  {userReviews.slice(0, 5).map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{formatDate(review.createdAt)}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'engagement' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Análise de Engajamento</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-900 mb-2">Score de Engajamento</h4>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{userAnalytics.engagementScore}</div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min((userAnalytics.engagementScore / 1000) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">
                    {userAnalytics.engagementScore > 500 ? 'Muito Ativo' : userAnalytics.engagementScore > 200 ? 'Ativo' : 'Moderado'}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                  <h4 className="font-semibold text-green-900 mb-2">Interações Sociais</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Curtidas recebidas:</span>
                      <span className="font-semibold">{userPhotos.reduce((sum, photo) => sum + (photo.likes?.length || 0), 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avaliações úteis:</span>
                      <span className="font-semibold">{userReviews.reduce((sum, review) => sum + review.helpful, 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Conteúdo criado:</span>
                      <span className="font-semibold">{userPhotos.length + userReviews.length}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                  <h4 className="font-semibold text-purple-900 mb-2">Preferências</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Restaurantes favoritos:</span>
                      <span className="font-semibold">{userFavorites.filter(f => f.entityType === 'restaurant').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Locais salvos:</span>
                      <span className="font-semibold">{userFavorites.filter(f => f.entityType === 'poi').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Hotéis avaliados:</span>
                      <span className="font-semibold">{userFavorites.filter(f => f.entityType === 'hotel').length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Insights e Recomendações</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h4 className="font-semibold text-green-900">Pontos Positivos</h4>
                  </div>
                  <ul className="space-y-2 text-green-800">
                    <li>• Usuário muito ativo com {userAnalytics.totalVisits} visitas</li>
                    <li>• Engajamento alto com {userPhotos.length} fotos compartilhadas</li>
                    <li>• Contribui com avaliações detalhadas</li>
                    <li>• Explora diversos tipos de locais</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <h4 className="font-semibold text-blue-900">Oportunidades</h4>
                  </div>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Pode ser um embaixador da marca</li>
                    <li>• Candidato ideal para eventos especiais</li>
                    <li>• Potencial para programa de fidelidade</li>
                    <li>• Influenciador local em potencial</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <h4 className="font-semibold text-yellow-900">Recomendações da Secretaria</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-800">
                  <div>
                    <h5 className="font-medium mb-2">Marketing:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Convidar para eventos exclusivos</li>
                      <li>• Oferecer experiências VIP</li>
                      <li>• Incluir em campanhas promocionais</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Engajamento:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Reconhecer publicamente contribuições</li>
                      <li>• Oferecer benefícios especiais</li>
                      <li>• Solicitar feedback sobre melhorias</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserProfilePage;
