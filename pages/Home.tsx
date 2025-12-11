import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 flex flex-col justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Step Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">Luxury</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-xl mb-10">
            Elevate your lifestyle with our exclusive collection of designer handbags, premium footwear, and timeless accessories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop?cat=Women" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors text-center">
              Shop Collection
            </Link>
            <Link to="/shop?cat=Men" className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all text-center">
              Men's Essentials
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <Link to="/shop?cat=Men" className="relative h-64 md:h-80 rounded-2xl overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Men" />
               <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                 <h3 className="text-3xl font-bold text-white">Men's</h3>
               </div>
             </Link>
             <Link to="/shop?cat=Women" className="relative h-64 md:h-80 rounded-2xl overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Women" />
               <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                 <h3 className="text-3xl font-bold text-white">Women's</h3>
               </div>
             </Link>
           </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
              <p className="text-gray-500 mt-2">The latest luxury drops.</p>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center text-blue-600 font-medium hover:underline">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
           <div className="mt-8 text-center sm:hidden">
            <Link to="/shop" className="inline-flex items-center text-blue-600 font-medium hover:underline">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
             <div className="p-6">
               <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
               </div>
               <h3 className="text-lg font-bold mb-2">Authentic Luxury</h3>
               <p className="text-gray-500">Guaranteed authenticity on all designer items.</p>
             </div>
             <div className="p-6">
               <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <h3 className="text-lg font-bold mb-2">Express Delivery</h3>
               <p className="text-gray-500">Global shipping with real-time tracking.</p>
             </div>
             <div className="p-6">
               <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
               </div>
               <h3 className="text-lg font-bold mb-2">Secure Checkout</h3>
               <p className="text-gray-500">Encrypted payments for your peace of mind.</p>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};