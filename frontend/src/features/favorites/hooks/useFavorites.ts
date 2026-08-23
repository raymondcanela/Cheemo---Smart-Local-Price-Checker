import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { addFavorite, getFavorites, removeFavorite } from '../api/favoritesApi';

export function useFavorites() {
  const { user } = useAuth();
  const userId = user?.user_id;
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['favorites', userId],
    queryFn: () => getFavorites(userId as number),
    enabled: !!userId, // don't fetch if no one's logged in
  });

  const favoriteIds = new Set(query.data?.map((f) => f.product_id));

  const addMutation = useMutation({
    mutationFn: (productId: number) => addFavorite(userId as number, productId),
    onSuccess: (updated) => {
      queryClient.setQueryData(['favorites', userId], updated);
    },
  });

  const removeMutation = useMutation({
    mutationFn: (productId: number) => removeFavorite(userId as number, productId),
    onSuccess: (updated) => {
      queryClient.setQueryData(['favorites', userId], updated);
    },
  });

  const toggleFavorite = (productId: number) => {
    if (favoriteIds.has(productId)) {
      removeMutation.mutate(productId);
    } else {
      addMutation.mutate(productId);
    }
  };

  return {
    favorites: query.data ?? [],
    isLoading: query.isLoading,
    isFavorited: (productId: number) => favoriteIds.has(productId),
    toggleFavorite,
  };
}