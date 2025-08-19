import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { backendService } from '../services/backendService';

interface FavoriteButtonProps {
  entityType: 'restaurant' | 'poi' | 'hotel';
  entityId: string;
  userId: string;
  className?: string;
  size?: number;
  showText?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  entityType,
  entityId,
  userId,
  className = '',
  size = 20,
  showText = false
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
  }, [entityType, entityId, userId]);

  const checkFavoriteStatus = async () => {
    try {
      const favorites = await backendService.getUserFavorites(userId, entityType);
      const isFav = favorites.some(f => f.entityId === entityId);
      setIsFavorited(isFav);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return;

    setIsLoading(true);
    
    // Optimistic update
    const previousState = isFavorited;
    setIsFavorited(!isFavorited);

    try {
      const result = await backendService.toggleFavorite(userId, entityType, entityId);
      setIsFavorited(result.favorited);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Rollback on error
      setIsFavorited(previousState);
      alert('Erro ao atualizar favorito. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`
        flex items-center gap-2 transition-all duration-200 
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} 
        ${isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}
        ${className}
      `}
      title={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      {isFavorited ? (
        <FaHeart size={size} />
      ) : (
        <FaRegHeart size={size} />
      )}
      
      {showText && (
        <span className="text-sm font-medium">
          {isFavorited ? 'Favoritado' : 'Favoritar'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;
