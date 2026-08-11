import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { getProducts } from '../api/productsApi';
import ProductCard from './ProductCard';

const TrendingDrops: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['products', 'trending'],
    queryFn: () => getProducts(1, 4),
  });

  return (
    <section className="px-container-margin-desktop py-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold font-headline text-on-surface">Trending Drops</h2>
            <p className="text-on-surface-variant mt-2">The biggest price reductions across the web right now.</p>
          </div>
          <a className="text-primary font-bold flex items-center gap-2 hover:underline group" href="#">
            View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-on-surface-variant font-medium">Hunting for the best deals...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 bg-error/10 rounded-card border border-error/20">
            <AlertCircle className="w-12 h-12 text-error mb-4" />
            <p className="text-error font-bold mb-2">Oops! Something went wrong.</p>
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.items.map((product, index) => (
              <ProductCard key={product.product_id} product={product} delay={index * 0.1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingDrops;