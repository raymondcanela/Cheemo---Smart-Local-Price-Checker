import React from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useFavorites } from '../hooks/useFavorites';

interface FavoriteButtonProps {
  productId: number;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ productId, className = '' }) => {
  const { isLoggedIn } = useAuth();
  const { isFavorited, toggleFavorite } = useFavorites();

  if (!isLoggedIn) return null;

  const favorited = isFavorited(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(productId);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${
        favorited ? 'bg-primary text-on-primary' : 'bg-white/90 text-on-surface-variant hover:text-primary'
      } ${className}`}
    >
      <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
    </button>
  );
};

export default FavoriteButton;