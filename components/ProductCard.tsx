import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          {product.price < 100 && (
             <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-sm">
               DEAL
             </span>
          )}
        </div>
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">{product.category}</div>
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors truncate">{product.name}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
            <div className="flex items-center text-yellow-500 text-xs">
              <Star size={14} fill="currentColor" />
              <span className="ml-1 text-gray-400">{product.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
