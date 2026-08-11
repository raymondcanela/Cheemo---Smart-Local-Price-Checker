import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { getProducts } from '../api/productsApi';
import ProductCard from './ProductCard';

const PRODUCTS_PER_PAGE = 12;

const ProductList: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['products', page],
    queryFn: () => getProducts(page, PRODUCTS_PER_PAGE),
  });

  const totalPages = data ? Math.ceil(data.total / data.limit) : 0;

  return (
    <section className="px-container-margin-desktop py-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-headline text-on-surface mb-8">All Products</h1>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-on-surface-variant font-medium">Loading products...</p>
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {data?.items.map((product, index) => (
                <ProductCard key={product.product_id} product={product} delay={index * 0.05} />
              ))}
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-full border border-outline-variant disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-on-surface-variant font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-full border border-outline-variant disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductList;