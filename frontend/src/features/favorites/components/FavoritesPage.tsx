import React from 'react';
import { Link } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { Heart, Loader2 } from 'lucide-react';
import { getProductById } from '@/features/products/api/productsApi';
import ProductCard from '@/features/products/components/ProductCard';
import { useFavorites } from '../hooks/useFavorites';

const FavoritesPage: React.FC = () => {
  const { favorites, isLoading: favoritesLoading } = useFavorites();

  const productQueries = useQueries({
    queries: favorites.map((f) => ({
      queryKey: ['products', 'detail', f.product_id],
      queryFn: () => getProductById(f.product_id),
    })),
  });

  const isLoading = favoritesLoading || productQueries.some((q) => q.isLoading);
  const products = productQueries.map((q) => q.data).filter(Boolean);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-on-surface-variant font-medium">Loading favorites...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 max-w-2xl mx-auto my-16 text-center">
        <Heart className="w-12 h-12 text-on-surface-variant mb-4" />
        <p className="font-bold text-on-surface mb-2">No favorites yet.</p>
        <p className="text-on-surface-variant mb-6">Tap the heart on any product to save it here.</p>
        <Link
          to="/products"
          className="px-6 py-2 bg-primary text-on-primary rounded-full font-bold hover:shadow-lg transition-shadow"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <section className="px-container-margin-desktop py-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold font-headline text-on-surface mb-8">My Favorites</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product!.product_id} product={product!} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FavoritesPage;