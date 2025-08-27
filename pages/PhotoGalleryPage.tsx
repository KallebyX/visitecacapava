import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, MessageSquare, Send, ThumbsUp, UserCheck, Loader2, 
  Camera, Upload, X, Filter, Search, Grid, List, Play, 
  Pause, Volume2, VolumeX, Download, Share2, Bookmark,
  Eye, MapPin, Calendar, Award, Zap, Sparkles, Star,
  ChevronLeft, ChevronRight, MoreHorizontal, Flag,
  Users, Clock, Compass, Mountain, TreePine, Coffee
} from 'lucide-react';
import { backendService } from '../services/backendService';
import { Photo } from '../types';
import { useAuth } from '../context/AuthContext';

// Mock data for demonstration
const mockPhotos: Photo[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Maria Silva',
    userAvatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150',
    imageUrl: '/img/pontos_turisticos/pedradosegredo.png',
    caption: 'Nascer do sol incrível na Pedra do Segredo! 🌅 Um dos momentos mais mágicos da minha vida.',
    location: 'Pedra do Segredo',
    timestamp: '2024-01-15T06:30:00Z',
    likes: ['user2', 'user3', 'user4'],
    tags: ['natureza', 'nascer-do-sol', 'paisagem'],
    category: 'landscape'
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'João Santos',
    userAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    imageUrl: '/img/pontos_turisticos/guaritas.png',
    caption: 'Explorando as formações rochosas únicas do Parque das Guaritas. A natureza é uma artista! 🎨',
    location: 'Parque das Guaritas',
    timestamp: '2024-01-14T14:20:00Z',
    likes: ['user1', 'user3'],
    tags: ['aventura', 'geologia', 'hiking'],
    category: 'adventure'
  },

];

interface PhotoCardProps {
  photo: Photo;
  onLike: (photoId: string) => void;
  currentUserId: string | null;
  isLiking: boolean;
  onOpenModal: (photo: Photo) => void;
  viewMode: 'grid' | 'list';
}

const PhotoCard: React.FC<PhotoCardProps> = ({ 
  photo, onLike, currentUserId, isLiking, onOpenModal, viewMode 
}) => {
  const hasLiked = currentUserId ? photo.likes.includes(currentUserId) : false;
  const [imageLoaded, setImageLoaded] = useState(false);

  const categoryIcons = {
    landscape: Mountain,
    adventure: Compass,
    food: Coffee,
    culture: Users,
    default: Camera
  };

  const CategoryIcon = categoryIcons[photo.category as keyof typeof categoryIcons] || categoryIcons.default;

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
        <div className="flex">
          <div className="relative w-64 h-48 flex-shrink-0">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <img 
              src={photo.imageUrl} 
              alt={photo.caption}
              onLoad={() => setImageLoaded(true)}
              onClick={() => onOpenModal(photo)}
              className={`w-full h-full object-cover cursor-pointer transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <div className="absolute top-3 left-3">
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                <CategoryIcon className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img src={photo.userAvatarUrl} alt={photo.userName} className="h-12 w-12 rounded-full mr-3 border-2 border-gray-200" />
                <div>
                  <p className="font-bold text-gray-900">{photo.userName}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    {photo.location}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{new Date(photo.timestamp).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4 text-lg">{photo.caption}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {photo.tags?.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => onLike(photo.id)} 
                  disabled={isLiking || !currentUserId}
                  className={`flex items-center space-x-2 transition-all duration-200 ${
                    hasLiked 
                      ? 'text-red-500' 
                      : 'text-gray-500 hover:text-red-500'
                  } disabled:opacity-50`}
                >
                  {isLiking ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <Heart className={`h-6 w-6 ${hasLiked ? 'fill-current' : ''}`} />
                  )}
                  <span className="font-semibold">{photo.likes.length}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageSquare className="h-6 w-6" />
                  <span className="font-semibold">0</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
      <div className="relative">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center h-64">
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <img 
          src={photo.imageUrl} 
          alt={photo.caption}
          onLoad={() => setImageLoaded(true)}
          onClick={() => onOpenModal(photo)}
          className={`w-full h-64 object-cover cursor-pointer transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-110`}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
            <CategoryIcon className="w-4 h-4 text-white" />
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            <button className="bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors">
              <Bookmark className="w-4 h-4 text-white" />
            </button>
            <button className="bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors">
              <Share2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <img src={photo.userAvatarUrl} alt={photo.userName} className="h-10 w-10 rounded-full mr-3 border-2 border-gray-200" />
            <div>
              <p className="font-bold text-gray-900">{photo.userName}</p>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="w-3 h-3 mr-1" />
                {photo.location}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500">{new Date(photo.timestamp).toLocaleDateString('pt-BR')}</p>
        </div>

        <p className="text-gray-700 mb-3 text-sm leading-relaxed">{photo.caption}</p>

        {/* Tags */}
        {photo.tags && photo.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {photo.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                #{tag}
              </span>
            ))}
            {photo.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{photo.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onLike(photo.id)} 
              disabled={isLiking || !currentUserId}
              className={`flex items-center space-x-1 transition-all duration-200 ${
                hasLiked 
                  ? 'text-red-500' 
                  : 'text-gray-500 hover:text-red-500'
              } disabled:opacity-50`}
            >
              {isLiking ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Heart className={`h-5 w-5 ${hasLiked ? 'fill-current' : ''}`} />
              )}
              <span className="font-semibold text-sm">{photo.likes.length}</span>
            </button>
            
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
              <MessageSquare className="h-5 w-5" />
              <span className="font-semibold text-sm">0</span>
            </button>
          </div>
          
          {photo.likes.length > 0 && (
            <div className="flex items-center text-xs text-gray-500">
              <UserCheck className="h-3 w-3 mr-1" />
              {photo.likes.length === 1 ? '1 curtida' : `${photo.likes.length} curtidas`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface PhotoModalProps {
  photo: Photo | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onLike: (photoId: string) => void;
  currentUserId: string | null;
  isLiking: boolean;
}

const PhotoModal: React.FC<PhotoModalProps> = ({
  photo, onClose, onPrevious, onNext, onLike, currentUserId, isLiking
}) => {
  const [comment, setComment] = useState('');
  
  if (!photo) return null;
  
  const hasLiked = currentUserId ? photo.likes.includes(currentUserId) : false;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-6xl max-h-[90vh] w-full bg-white rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent z-10 p-4">
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center">
              <img src={photo.userAvatarUrl} alt={photo.userName} className="h-8 w-8 rounded-full mr-2" />
              <span className="font-semibold">{photo.userName}</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex h-[80vh]">
          {/* Image Section */}
          <div className="flex-1 relative bg-black flex items-center justify-center">
            <button 
              onClick={onPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <img 
              src={photo.imageUrl} 
              alt={photo.caption}
              className="max-w-full max-h-full object-contain"
            />
            
            <button 
              onClick={onNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar */}
          <div className="w-96 bg-white flex flex-col">
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img src={photo.userAvatarUrl} alt={photo.userName} className="h-12 w-12 rounded-full mr-3" />
                    <div>
                      <p className="font-bold">{photo.userName}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        {photo.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{new Date(photo.timestamp).toLocaleDateString('pt-BR')}</p>
                </div>

                <p className="text-gray-800 mb-4">{photo.caption}</p>

                {photo.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {photo.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center space-x-6 mb-6">
                  <button 
                    onClick={() => onLike(photo.id)} 
                    disabled={isLiking || !currentUserId}
                    className={`flex items-center space-x-2 transition-all duration-200 ${
                      hasLiked 
                        ? 'text-red-500' 
                        : 'text-gray-500 hover:text-red-500'
                    } disabled:opacity-50`}
                  >
                    {isLiking ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <Heart className={`h-6 w-6 ${hasLiked ? 'fill-current' : ''}`} />
                    )}
                    <span className="font-semibold">{photo.likes.length}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                    <Share2 className="h-6 w-6" />
                    <span>Compartilhar</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                    <Download className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Comments would go here */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-4">Comentários</h4>
                <p className="text-gray-500 text-center py-8">Seja o primeiro a comentar!</p>
              </div>
            </div>

            {/* Comment Input */}
            <div className="border-t p-4">
              <div className="flex space-x-3">
                <img src={currentUserId ? photo.userAvatarUrl : ''} alt="" className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Adicione um comentário..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PhotoGalleryPage: React.FC = () => {
  const { user } = useAuth();
  const [photos, setPhotos] = useState<Photo[]>(mockPhotos);
  const [loading, setLoading] = useState(false);
  const [likingPhotos, setLikingPhotos] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ imageUrl: '', caption: '', location: '', tags: '' });

  const categories = [
    { id: 'all', label: 'Todas', icon: Grid },
    { id: 'landscape', label: 'Paisagens', icon: Mountain },
    { id: 'adventure', label: 'Aventura', icon: Compass },
    { id: 'food', label: 'Gastronomia', icon: Coffee },
    { id: 'culture', label: 'Cultura', icon: Users }
  ];

  const filteredPhotos = photos.filter(photo => {
    const matchesFilter = filter === 'all' || photo.category === filter;
    const matchesSearch = photo.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.location?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleLike = async (photoId: string) => {
    if (!user || likingPhotos.has(photoId)) return;

    setLikingPhotos(prev => new Set(prev).add(photoId));
    
    const userAlreadyLiked = photos.find(p => p.id === photoId)?.likes.includes(user.id);
    
    setPhotos(prev => prev.map(photo => {
      if (photo.id === photoId) {
        return {
          ...photo,
          likes: userAlreadyLiked 
            ? photo.likes.filter(id => id !== user.id)
            : [...photo.likes, user.id]
        };
      }
      return photo;
    }));

    try {
      await backendService.togglePhotoLike(photoId, user.id);
    } catch (error) {
      console.error('Error toggling like:', error);
      setPhotos(prev => prev.map(photo => {
        if (photo.id === photoId) {
          return {
            ...photo,
            likes: userAlreadyLiked 
              ? [...photo.likes, user.id]
              : photo.likes.filter(id => id !== user.id)
          };
        }
        return photo;
      }));
    } finally {
      setLikingPhotos(prev => {
        const newSet = new Set(prev);
        newSet.delete(photoId);
        return newSet;
      });
    }
  };

  const handleUploadPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newPhoto.imageUrl || !newPhoto.caption) return;

    const photo: Photo = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name || 'Usuário',
      userAvatarUrl: user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      imageUrl: newPhoto.imageUrl,
      caption: newPhoto.caption,
      location: newPhoto.location || 'Caçapava do Sul',
      timestamp: new Date().toISOString(),
      likes: [],
      tags: newPhoto.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      category: 'landscape'
    };

    setPhotos(prev => [photo, ...prev]);
    setNewPhoto({ imageUrl: '', caption: '', location: '', tags: '' });
    setShowUploadModal(false);
  };

  const openPhotoModal = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return;
    
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
    } else {
      newIndex = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                📸 Galeria da Comunidade
              </h1>
              <p className="text-gray-600 text-lg mt-1">
                Compartilhe e descubra os momentos mais incríveis de Caçapava do Sul
              </p>
            </div>
            
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all"
            >
              <Camera className="w-5 h-5" />
              Compartilhar Foto
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Filters and Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por local, usuário ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                      filter === category.id
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* View Mode */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total de Fotos', value: photos.length, icon: Camera, color: 'bg-blue-500' },
            { label: 'Fotógrafos', value: new Set(photos.map(p => p.userId)).size, icon: Users, color: 'bg-green-500' },
            { label: 'Curtidas', value: photos.reduce((acc, p) => acc + p.likes.length, 0), icon: Heart, color: 'bg-red-500' },
            { label: 'Locais', value: new Set(photos.map(p => p.location)).size, icon: MapPin, color: 'bg-purple-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Photos Grid/List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhuma foto encontrada
            </h3>
            <p className="text-gray-500">
              Seja o primeiro a compartilhar suas aventuras!
            </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-6'
          }>
            {filteredPhotos.map(photo => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onLike={handleLike}
                currentUserId={user?.id || null}
                isLiking={likingPhotos.has(photo.id)}
                onOpenModal={openPhotoModal}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Compartilhar Nova Foto</h2>
              <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleUploadPhoto} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">URL da Imagem</label>
                <input
                  type="url"
                  value={newPhoto.imageUrl}
                  onChange={(e) => setNewPhoto(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://exemplo.com/sua-foto.jpg"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição</label>
                <textarea
                  value={newPhoto.caption}
                  onChange={(e) => setNewPhoto(prev => ({ ...prev, caption: e.target.value }))}
                  placeholder="Conte a história por trás desta foto..."
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32 resize-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Local</label>
                <input
                  type="text"
                  value={newPhoto.location}
                  onChange={(e) => setNewPhoto(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Onde foi tirada esta foto?"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={newPhoto.tags}
                  onChange={(e) => setNewPhoto(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="natureza, paisagem, aventura"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Publicar Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        onClose={closePhotoModal}
        onPrevious={() => navigatePhoto('prev')}
        onNext={() => navigatePhoto('next')}
        onLike={handleLike}
        currentUserId={user?.id || null}
        isLiking={selectedPhoto ? likingPhotos.has(selectedPhoto.id) : false}
      />
    </div>
  );
};

export default PhotoGalleryPage;
