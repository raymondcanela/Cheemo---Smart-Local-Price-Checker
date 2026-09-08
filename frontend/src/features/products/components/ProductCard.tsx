import FavoriteButton from '@/features/favorites/components/FavoriteButton';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  delay?: number; // stagger animation delay, optional
}

const ProductCard: React.FC<ProductCardProps> = ({ product, delay = 0 }) => {
  return (
    <Link to={`/products/${product.product_id}`}>
      <motion.div
        className="bg-white rounded-card overflow-hidden border border-outline-variant hover:shadow-xl transition-all group cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
      >
        <div className="h-48 bg-surface-container relative overflow-hidden">
          <img
            alt={product.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
            src={product.image_url}
          />
          <FavoriteButton productId={product.product_id} className="absolute top-3 left-3" />
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
    </Link>
  );
};

export default ProductCard;