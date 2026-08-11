import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, Search } from 'lucide-react';
import { getProducts, AVAILABLE_CATEGORIES, AVAILABLE_STORES } from '../api/productsApi';
import { useDebounce } from '../../../hooks/useDebounce';
import ProductCard from './ProductCard';

const PRODUCTS_PER_PAGE = 12;

const ProductList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const store = searchParams.get('store') || '';
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sortBy = (searchParams.get('sortBy') as 'price' | 'average_rating' | null) || undefined;
  const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc' | null) || 'asc';

  // Local state for the search input, debounced before it updates the URL.
  // Keeps typing snappy while avoiding a query on every keystroke.
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 400);

  // Updates one param at a time; empty value removes it from the URL.
  // Resets to page 1 whenever a filter (not the page itself) changes.
  const updateParam = (key: string, value: string, resetPage = true) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    if (resetPage) next.set('page', '1');
    setSearchParams(next);
  };

  useEffect(() => {
    updateParam('search', debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['products', { page, search, category, store, minPrice, maxPrice, sortBy, sortOrder }],
    queryFn: () =>
      getProducts({
        page,
        limit: PRODUCTS_PER_PAGE,
        search: search || undefined,
        category: category || undefined,
        store: store || undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        sortBy,
        sortOrder,
      }),
  });

  const totalPages = data ? Math.ceil(data.total / data.limit) : 0;

  return (
    <section className="px-container-margin-desktop py-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-headline text-on-surface mb-8">All Products</h1>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="relative flex-1 min-w-50">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-full border border-outline-variant bg-surface text-sm"
            />
          </div>

          <select
            value={category}
            onChange={(e) => updateParam('category', e.target.value)}
            className="px-3 py-2 rounded-full border border-outline-variant bg-surface text-sm"
          >
            <option value="">All Categories</option>
            {AVAILABLE_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={store}
            onChange={(e) => updateParam('store', e.target.value)}
            className="px-3 py-2 rounded-full border border-outline-variant bg-surface text-sm"
          >
            <option value="">All Stores</option>
            {AVAILABLE_STORES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min $"
            defaultValue={minPrice || ''}
            onChange={(e) => updateParam('minPrice', e.target.value)}
            className="w-24 px-3 py-2 rounded-full border border-outline-variant bg-surface text-sm"
          />
          <input
            type="number"
            placeholder="Max $"
            defaultValue={maxPrice || ''}
            onChange={(e) => updateParam('maxPrice', e.target.value)}
            className="w-24 px-3 py-2 rounded-full border border-outline-variant bg-surface text-sm"
          />

          <select
            value={sortBy ? `${sortBy}-${sortOrder}` : ''}
            onChange={(e) => {
              const [by, order] = e.target.value.split('-');
              const next = new URLSearchParams(searchParams);
              if (by) {
                next.set('sortBy', by);
                next.set('sortOrder', order);
              } else {
                next.delete('sortBy');
                next.delete('sortOrder');
              }
              next.set('page', '1');
              setSearchParams(next);
            }}
            className="px-3 py-2 rounded-full border border-outline-variant bg-surface text-sm"
          >
            <option value="">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="average_rating-desc">Rating: High to Low</option>
          </select>
        </div>

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
        ) : data && data.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-on-surface-variant font-medium">No products match your filters.</p>
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
                onClick={() => updateParam('page', String(Math.max(1, page - 1)), false)}
                disabled={page === 1}
                className="p-2 rounded-full border border-outline-variant disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-on-surface-variant font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => updateParam('page', String(Math.min(totalPages, page + 1)), false)}
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