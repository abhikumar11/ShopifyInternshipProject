import React from 'react';
import ProductCard from './ProductCard';
import { PackageOpen } from 'lucide-react';

const ProductGrid = ({ products, loading, title }) => {
  
  // Skeleton Loader that matches the ProductCard dimensions
  const SkeletonCard = () => (
    <div className="animate-pulse flex flex-col gap-4">
      <div className="aspect-[4/5] bg-gray-200 rounded-2xl w-full"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Optional Title - Home.jsx handles its own headers, but this is a backup */}
      {title && (
        <div className="mb-8 flex items-baseline justify-between px-2">
          <h2 className="text-2xl font-black text-[#202223] tracking-tight">
            {title}
          </h2>
          <span className="text-xs font-bold text-[#6d7175] uppercase tracking-widest">
            {products?.length || 0} Items
          </span>
        </div>
      )}

      {/* Responsive Grid System */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
        {loading ? (
          // Displaying 4 skeletons per section is standard for homepages
          [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
        ) : products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
            />
          ))
        ) : (
          /* Improved Empty State */
          <div className="col-span-full py-16 flex flex-col items-center justify-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
            <PackageOpen className="text-gray-300 mb-3" size={40} />
            <p className="text-[#6d7175] font-bold text-sm">Nothing here yet!</p>
            <p className="text-xs text-[#8c9196]">Check back later for new updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;