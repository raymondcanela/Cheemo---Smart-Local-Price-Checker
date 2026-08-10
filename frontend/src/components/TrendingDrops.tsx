import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, AlertCircle, Star } from 'lucide-react';
import { getProducts } from '../services/api';

const TrendingDrops: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['products', 'trending'],
    queryFn: () => getProducts(1, 4), // page 1, limit 4 for a homepage preview
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
              <motion.div
                key={product.product_id}
                className="bg-white rounded-card overflow-hidden border border-outline-variant hover:shadow-xl transition-all group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-48 bg-surface-container relative overflow-hidden">
                  <img
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    src={product.image_url}
                  />
                  <span className="absolute top-3 right-3 bg-primary-container text-on-primary-container text-xs font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    {product.average_rating.toFixed(1)}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">{product.main_category}</span>
                    <span className="text-xs text-secondary font-medium">{product.store.store_name}</span>
                  </div>
                  <h4 className="font-bold text-on-surface mb-3 line-clamp-1">{product.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-extrabold text-primary">${product.price.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingDrops;