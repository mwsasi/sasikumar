import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Category } from '../types';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const initialCat = searchParams.get('cat') as Category || 'All';

  const [filters, setFilters] = useState({
    category: initialCat,
    minPrice: 0,
    maxPrice: 3000,
    search: ''
  });

  // Sync state with URL params on mount/change
  useEffect(() => {
     const cat = searchParams.get('cat') as Category;
     if (cat) setFilters(prev => ({ ...prev, category: cat }));
  }, [searchParams]);

  const filteredProducts = PRODUCTS.filter(product => {
    // Logic: If filter is All, show everything.
    // If filter is specific (e.g. Men), show Men AND Unisex.
    // If filter is Accessories, show Accessories AND Unisex (if applicable).
    
    let matchesCategory = false;
    
    if (filters.category === 'All') {
        matchesCategory = true;
    } else if (filters.category === Category.Unisex) {
        matchesCategory = product.category === Category.Unisex;
    } else {
        matchesCategory = product.category === filters.category || product.category === Category.Unisex;
    }

    const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
    const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  const updateCategory = (cat: string) => {
    setFilters(prev => ({ ...prev, category: cat as any }));
    if (cat === 'All') {
        searchParams.delete('cat');
    } else {
        searchParams.set('cat', cat);
    }
    setSearchParams(searchParams);
  };

  const categories = ['All', 'Men', 'Women', 'Unisex', 'Accessories', 'Clothing'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Filters Sidebar (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={filters.category === cat}
                    onChange={() => updateCategory(cat)}
                    className="form-radio text-black focus:ring-black"
                  />
                  <span className={filters.category === cat ? "font-medium" : "text-gray-600"}>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="3000"
                step="50"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>$0</span>
                <span>Max: ${filters.maxPrice}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center mb-4">
           <h1 className="text-2xl font-bold">Shop</h1>
           <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 p-2 border border-gray-300 rounded-md">
             <Filter size={20} /> Filters
           </button>
        </div>

        {/* Mobile Filter Modal */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
            <div className="w-80 bg-white h-full p-6 overflow-y-auto animate-slide-in">
               <div className="flex justify-between items-center mb-8">
                 <h2 className="text-xl font-bold">Filters</h2>
                 <button onClick={() => setIsFilterOpen(false)}><X size={24} /></button>
               </div>
               
               <div className="mb-8">
                 <h3 className="font-bold mb-4">Category</h3>
                 <div className="space-y-3">
                   {categories.map((cat) => (
                     <button
                       key={cat}
                       onClick={() => { updateCategory(cat); setIsFilterOpen(false); }}
                       className={`block w-full text-left py-2 px-3 rounded-md ${filters.category === cat ? 'bg-gray-100 font-bold' : ''}`}
                     >
                       {cat}
                     </button>
                   ))}
                 </div>
               </div>
               
               <div>
                  <h3 className="font-bold mb-4">Max Price: ${filters.maxPrice}</h3>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="50"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
               </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search items..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button
                onClick={() => setFilters({ category: 'All', minPrice: 0, maxPrice: 3000, search: '' })}
                className="mt-4 text-blue-600 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};