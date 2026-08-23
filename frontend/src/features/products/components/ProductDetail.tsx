import FavoriteButton from '@/features/favorites/components/FavoriteButton';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, ArrowLeft, Loader2, Star } from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../api/productsApi';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const { data: product, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['products', 'detail', productId],
    queryFn: () => getProductById(productId),
    enabled: !Number.isNaN(productId), // don't fetch if the URL param isn't a valid number
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-on-surface-variant font-medium">Loading product...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-error/10 rounded-card border border-error/20 max-w-2xl mx-auto my-16">
        <AlertCircle className="w-12 h-12 text-error mb-4" />
        <p className="text-error font-bold mb-2">Product not found.</p>
        <p className="text-on-surface-variant mb-6">
          {error instanceof Error ? error.message : 'An unexpected error occurred'}
        </p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2 bg-primary text-on-primary rounded-full font-bold hover:shadow-lg transition-shadow"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="px-container-margin-desktop py-16 bg-background">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="h-96 bg-surface-container rounded-card overflow-hidden">
            <img
              alt={product.title}
              className="w-full h-full object-cover"
              src={product.image_url}
            />
          </div>

          <div>
            <span className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">
              {product.main_category}
            </span>
            <h1 className="text-3xl font-bold font-headline text-on-surface mt-2 mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 fill-current text-primary" />
              <span className="font-medium text-on-surface">{product.average_rating.toFixed(1)}</span>
            </div>

            <p className="text-on-surface-variant mb-6">{product.description}</p>

            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-extrabold text-primary">${product.price.toFixed(2)}</span>
              <FavoriteButton productId={product.product_id} />
            </div>
            <p className="text-sm text-on-surface-variant">
              at <span className="font-medium">{product.store.store_name}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;