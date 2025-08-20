import React, { useState, useEffect } from 'react';
import { useGamification } from '../context/GamificationContext';
import { useAuth } from '../context/AuthContext';
import { backendService } from '../services/backendService';
import { 
  Award, Star, MapPin, Edit, Camera, Heart, MessageCircle, Share2, Settings,
  Calendar, TrendingUp, Users, Eye, ThumbsUp, Bookmark, 
  Utensils, Building, Map, Timer, Target, Trophy,
  BadgeCheck, UserPlus, UserMinus, MoreHorizontal, Grid, List,
  Filter, Search, ChevronDown, Clock, Coffee, Globe, Phone, Mail
} from 'lucide-react';
import BadgeIcon from '../components/BadgeIcon';
import type { Badge, PointOfInterest, Photo, Review, Favorite } from '../types';
import ProfileEditModal from '../components/ProfileEditModal';

interface UserStats {
  totalPoints: number;
  visitedPois: number;
  earnedBadges: number;
  photosShared: number;
  likesReceived: number;
  reviewsWritten: number;
  favoriteRestaurants: number;
  followersCount: number;
  followingCount: number;
  checkInsCount: number;
}

interface ActivityItem {
  id: string;
  type: 'visit' | 'photo' | 'review' | 'badge' | 'like' | 'follow';
  title: string;
  description: string;
  timestamp: string;
  points?: number;
  imageUrl?: string;
  entityName?: string;
}

const ProfilePage: React.FC = () => {
  const { currentUser } = useGamification();
  const { user } = useAuth();
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [visitedPois, setVisitedPois] = useState<(PointOfInterest & { visitDate: string })[]>([]);
  const [userPhotos, setUserPhotos] = useState<Photo[]>([]);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [userFavorites, setUserFavorites] = useState<Favorite[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 0,
    visitedPois: 0,
    earnedBadges: 0,
    photosShared: 0,
    likesReceived: 0,
    reviewsWritten: 0,
    favoriteRestaurants: 0,
    followersCount: 0,
    followingCount: 0,
    checkInsCount: 0
  });
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadUserData();
    }
  }, [currentUser]);

  const loadUserData = async () => {
    if (!currentUser) return;

    try {
      // Load basic data
      const badges = await backendService.getBadgesForUser(currentUser.id);
      setEarnedBadges(badges);

      // Load visited POIs with dates
      const fetchVisitedPois = async () => {
        const pois = await Promise.all(
          currentUser.visited.map(async (visit) => {
            const poi = await backendService.getPointOfInterestById(visit.pointId);
            return poi ? { ...poi, visitDate: visit.date } : null;
          })
        );
        setVisitedPois(pois.filter((p): p is PointOfInterest & { visitDate: string } => !!p).sort((a,b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()));
      };
      await fetchVisitedPois();

      // Load user photos
      const photos = await backendService.getUserPhotos(currentUser.id);
      setUserPhotos(photos || []);

      // Load user reviews
      const reviews = await backendService.getUserReviews(currentUser.id);
      setUserReviews(reviews || []);

      // Load user favorites
      const favorites = await backendService.getUserFavorites(currentUser.id);
      setUserFavorites(favorites || []);

      // Calculate stats
      const likesReceived = photos?.reduce((sum, photo) => sum + (photo.likes?.length || 0), 0) || 0;
      
      setUserStats({
        totalPoints: currentUser.points,
        visitedPois: currentUser.visited.length,
        earnedBadges: badges.length,
        photosShared: photos?.length || 0,
        likesReceived,
        reviewsWritten: reviews?.length || 0,
        favoriteRestaurants: favorites?.filter(f => f.entityType === 'restaurant').length || 0,
        followersCount: Math.floor(Math.random() * 50) + 10, // Mock data
        followingCount: Math.floor(Math.random() * 30) + 5, // Mock data
        checkInsCount: currentUser.visited.length
      });

      // Generate recent activity
      generateRecentActivity();

    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const generateRecentActivity = () => {
    const activities: ActivityItem[] = [
      {
        id: '1',
        type: 'visit',
        title: 'Visitou Pedra do Segredo',
        description: 'Check-in realizado com sucesso',
        timestamp: '2025-08-18T14:30:00Z',
        points: 150,
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: '2',
        type: 'badge',
        title: 'Conquistou nova medalha',
        description: 'Explorador da Geodiversidade desbloqueado!',
        timestamp: '2025-08-18T14:35:00Z',
        points: 500
      },
      {
        id: '3',
        type: 'photo',
        title: 'Compartilhou uma foto',
        description: 'Vista incrível das Guaritas do Camaquã',
        timestamp: '2025-08-17T16:20:00Z',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: '4',
        type: 'review',
        title: 'Avaliou Prosperato Olivais',
        description: 'Experiência incrível! ⭐⭐⭐⭐⭐',
        timestamp: '2025-08-16T10:15:00Z',
        points: 50
      }
    ];
    setRecentActivity(activities);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d atrás`;
    return formatDate(dateString);
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header/Cover Photo */}
      <div className="relative h-64 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end gap-6">
            {/* Profile Photo */}
            <div className="relative">
              <img 
                src={currentUser.avatarUrl} 
                alt={currentUser.name} 
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg" 
              />
              {isOwnProfile && (
                <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-white">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{currentUser.name}</h1>
                <BadgeCheck className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-white/80 text-lg mb-3">Explorador de Caçapava do Sul • Membro desde 2025</p>
              
              {/* Quick Stats */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{userStats.totalPoints}</div>
                  <div className="text-sm text-white/70">Pontos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userStats.followersCount}</div>
                  <div className="text-sm text-white/70">Seguidores</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userStats.followingCount}</div>
                  <div className="text-sm text-white/70">Seguindo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userStats.visitedPois}</div>
                  <div className="text-sm text-white/70">Locais</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {isOwnProfile ? (
                <>
                  <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="bg-white text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Editar Perfil
                  </button>
                  <button className="bg-white/20 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Configurações
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                      isFollowing 
                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isFollowing ? <UserMinus className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    {isFollowing ? 'Seguindo' : 'Seguir'}
                  </button>
                  <button className="bg-white/20 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Mensagem
                  </button>
                </>
              )}
              <button className="bg-white/20 text-white px-3 py-2 rounded-lg hover:bg-white/30 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'overview', label: 'Visão Geral', icon: TrendingUp },
              { id: 'visits', label: 'Histórico de Visitas', icon: MapPin },
              { id: 'achievements', label: 'Conquistas', icon: Trophy },
              { id: 'photos', label: 'Galeria', icon: Camera },
              { id: 'reviews', label: 'Avaliações', icon: Star },
              { id: 'favorites', label: 'Favoritos', icon: Heart },
              { id: 'social', label: 'Atividade Social', icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
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
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center border border-blue-200">
                  <Trophy className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-700">{userStats.earnedBadges}</div>
                  <div className="text-sm text-blue-600">Conquistas</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center border border-green-200">
                  <Camera className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700">{userStats.photosShared}</div>
                  <div className="text-sm text-green-600">Fotos</div>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl text-center border border-red-200">
                  <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-700">{userStats.likesReceived}</div>
                  <div className="text-sm text-red-600">Curtidas</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center border border-purple-200">
                  <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700">{userStats.reviewsWritten}</div>
                  <div className="text-sm text-purple-600">Avaliações</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl text-center border border-orange-200">
                  <Utensils className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-700">{userStats.favoriteRestaurants}</div>
                  <div className="text-sm text-orange-600">Restaurantes</div>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-xl text-center border border-teal-200">
                  <MapPin className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-teal-700">{userStats.checkInsCount}</div>
                  <div className="text-sm text-teal-600">Check-ins</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="text-brand-green" />
                  Atividade Recente
                </h3>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      {activity.imageUrl ? (
                        <img src={activity.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center">
                          {activity.type === 'visit' && <MapPin className="w-6 h-6 text-white" />}
                          {activity.type === 'badge' && <Trophy className="w-6 h-6 text-white" />}
                          {activity.type === 'photo' && <Camera className="w-6 h-6 text-white" />}
                          {activity.type === 'review' && <Star className="w-6 h-6 text-white" />}
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                        <p className="text-gray-600 text-sm">{activity.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</span>
                          {activity.points && (
                            <span className="text-xs bg-brand-green text-white px-2 py-1 rounded-full flex items-center gap-1">
                              +{activity.points} <Star className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Visits Tab */}
          {activeTab === 'visits' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Histórico de Visitas ({visitedPois.length})</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {visitedPois.length > 0 ? (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
                  {visitedPois.map((poi) => (
                    <div key={`${poi.id}-${poi.visitDate}`} className={`${viewMode === 'grid' ? 'bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow' : 'flex items-center gap-4 p-4 bg-gray-50 rounded-lg'}`}>
                      <img 
                        src={poi.imageUrl} 
                        alt={poi.name}
                        className={`${viewMode === 'grid' ? 'w-full h-32' : 'w-16 h-16'} object-cover rounded-lg`}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{poi.name}</h4>
                        <p className={`text-gray-600 ${viewMode === 'grid' ? 'text-sm mt-1' : 'text-xs'}`}>
                          Visitado em {formatDate(poi.visitDate)}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm bg-brand-green text-white px-2 py-1 rounded-full flex items-center gap-1">
                            +{poi.points} <Star className="w-3 h-3" />
                          </span>
                          {viewMode === 'list' && (
                            <button className="text-brand-green hover:text-brand-dark-green">
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhuma visita registrada</h3>
                  <p className="text-gray-500">Comece a explorar Caçapava do Sul para ver seu histórico aqui!</p>
                </div>
              )}
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Conquistas Desbloqueadas ({earnedBadges.length})</h3>
                <div className="text-sm text-gray-600">
                  Total de pontos em conquistas: {earnedBadges.reduce((sum, badge) => sum + 100, 0)}
                </div>
              </div>

              {earnedBadges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {earnedBadges.map((badge) => (
                    <div key={badge.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                      <div className="mb-4">
                        <BadgeIcon badge={badge} />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">{badge.name}</h4>
                      <p className="text-gray-600 text-sm mb-3">{badge.description}</p>
                      <div className="flex items-center justify-center gap-2 text-xs">
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-full">+100 pontos</span>
                        <span className="text-gray-500">Conquistado</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhuma conquista ainda</h3>
                  <p className="text-gray-500">Continue explorando para desbloquear suas primeiras medalhas!</p>
                </div>
              )}

              {/* Próximas Conquistas */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-800">🎯 Próximas Conquistas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Explorador Avançado', description: 'Visite 10 pontos turísticos', progress: 7, total: 10 },
                    { name: 'Fotógrafo da Cidade', description: 'Compartilhe 25 fotos', progress: 12, total: 25 },
                    { name: 'Crítico Gastronômico', description: 'Avalie 5 restaurantes', progress: 2, total: 5 }
                  ].map((achievement, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">{achievement.name}</h5>
                      <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{achievement.progress}/{achievement.total}</span>
                          <span>{Math.round((achievement.progress/achievement.total) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-brand-green h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(achievement.progress/achievement.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Photos Tab */}
          {activeTab === 'photos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Galeria Pessoal ({userPhotos.length})</h3>
                <button className="bg-brand-green text-white px-4 py-2 rounded-lg hover:bg-brand-dark-green transition-colors flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Adicionar Foto
                </button>
              </div>

              {userPhotos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {userPhotos.map((photo) => (
                    <div key={photo.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                      <img src={photo.imageUrl} alt={photo.caption} className="w-full h-48 object-cover" />
                      <div className="p-3">
                        <p className="text-sm text-gray-800 mb-2">{photo.caption}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{photo.location}</span>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {photo.likes?.length || 0}
                            </span>
                            <span>{formatTimeAgo(photo.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhuma foto compartilhada</h3>
                  <p className="text-gray-500 mb-4">Comece a documentar sua jornada por Caçapava do Sul!</p>
                  <button className="bg-brand-green text-white px-6 py-3 rounded-lg hover:bg-brand-dark-green transition-colors flex items-center gap-2 mx-auto">
                    <Camera className="w-4 h-4" />
                    Compartilhar Primeira Foto
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Minhas Avaliações ({userReviews.length})</h3>

              {userReviews.length > 0 ? (
                <div className="space-y-4">
                  {userReviews.map((review) => (
                    <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">Local avaliado</h4>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-2">{review.rating}/5</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{formatDate(review.createdAt)}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {review.helpful} úteis
                        </span>
                        {review.verified && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                            <BadgeCheck className="w-3 h-3" />
                            Verificado
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhuma avaliação ainda</h3>
                  <p className="text-gray-500">Compartilhe sua experiência sobre os locais que visitou!</p>
                </div>
              )}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Meus Favoritos</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Restaurantes Favoritos */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-orange-600" />
                    Restaurantes ({userStats.favoriteRestaurants})
                  </h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Churrascaria Tradição', type: 'Churrascaria', rating: 4.8 },
                      { name: 'Café Colonial', type: 'Café', rating: 4.6 },
                      { name: 'Pizzaria Italiana', type: 'Pizzaria', rating: 4.7 }
                    ].map((restaurant, index) => (
                      <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <h5 className="font-medium text-gray-900">{restaurant.name}</h5>
                        <p className="text-sm text-gray-600">{restaurant.type}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{restaurant.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pontos Turísticos Favoritos */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    Pontos Turísticos (5)
                  </h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Pedra do Segredo', type: 'Monumento Natural' },
                      { name: 'Guaritas do Camaquã', type: 'Geoformação' },
                      { name: 'Prosperato Olivais', type: 'Turismo Rural' }
                    ].map((poi, index) => (
                      <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <h5 className="font-medium text-gray-900">{poi.name}</h5>
                        <p className="text-sm text-gray-600">{poi.type}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotéis Favoritos */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Building className="w-5 h-5 text-blue-600" />
                    Hotéis (2)
                  </h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Hotel Centro', type: 'Hotel Executivo', rating: 4.5 },
                      { name: 'Pousada Rural', type: 'Pousada', rating: 4.8 }
                    ].map((hotel, index) => (
                      <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <h5 className="font-medium text-gray-900">{hotel.name}</h5>
                        <p className="text-sm text-gray-600">{hotel.type}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{hotel.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Social Tab */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Atividade Social</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Seguidores/Seguindo */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    Conexões
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">Seguidores</h5>
                          <p className="text-2xl font-bold text-purple-600">{userStats.followersCount}</p>
                        </div>
                        <Users className="w-8 h-8 text-purple-400" />
                      </div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">Seguindo</h5>
                          <p className="text-2xl font-bold text-purple-600">{userStats.followingCount}</p>
                        </div>
                        <UserPlus className="w-8 h-8 text-purple-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interações */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    Interações
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">Curtidas Recebidas</h5>
                          <p className="text-2xl font-bold text-red-600">{userStats.likesReceived}</p>
                        </div>
                        <Heart className="w-8 h-8 text-red-400" />
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">Comentários</h5>
                          <p className="text-2xl font-bold text-blue-600">24</p>
                        </div>
                        <MessageCircle className="w-8 h-8 text-blue-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ranking na Comunidade */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">🏆 Posição no Ranking</h4>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-yellow-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
                      #3
                    </div>
                    <div>
                      <h5 className="text-xl font-bold text-gray-900">3º Lugar</h5>
                      <p className="text-gray-600">Entre todos os exploradores de Caçapava do Sul</p>
                      <p className="text-sm text-yellow-700 mt-2">Faltam apenas 250 pontos para alcançar o 2º lugar!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <ProfileEditModal onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
};

export default ProfilePage;
