import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, ShoppingBag, Check } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<number | string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return <div className="p-12 text-center">Product not found. <Link to="/shop" className="text-blue-600">Back to shop</Link></div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <Link to="/shop" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors">
        <ChevronLeft size={20} className="mr-1" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Gallery (Simple) */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {/* Simulating gallery thumbs */}
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                 <img src={product.image} alt={`View ${i}`} className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="text-sm text-gray-500 font-medium mb-2 uppercase tracking-wide">{product.category}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            <div className="flex items-center text-yellow-500">
              <Star fill="currentColor" size={18} />
              <span className="ml-1 text-gray-600 font-medium">{product.rating} (124 reviews)</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Color: <span className="text-gray-500 font-normal">{selectedColor || 'Select a color'}</span></h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-full text-sm font-medium transition-all ${
                    selectedColor === color
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">Size: <span className="text-gray-500 font-normal">{selectedSize || 'Select a size'}</span></h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[3rem] px-4 py-3 flex items-center justify-center rounded-lg border text-sm font-medium transition-all ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
              className={`flex-1 py-4 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                isAdded
                  ? 'bg-green-600 text-white'
                  : !selectedSize || !selectedColor
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={24} /> Added
                </>
              ) : (
                <>
                  <ShoppingBag size={24} /> Add to Cart
                </>
              )}
            </button>
          </div>
          
          {/* AI Helper Prompt */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
             <div className="p-2 bg-blue-100 rounded-full text-blue-600 mt-1">
               <Star size={16} />
             </div>
             <div>
               <h4 className="font-bold text-blue-900 text-sm">Need styling advice?</h4>
               <p className="text-blue-800 text-sm mt-1">Use the <strong>AI Stylist</strong> button to ask if this matches your outfit or for more details!</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};