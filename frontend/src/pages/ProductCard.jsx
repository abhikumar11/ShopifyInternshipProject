import React from 'react';
import { ShoppingCart, Eye, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { _id, title, price, stock, images } = product;
  const mainImage = images?.[0] || "https://via.placeholder.com/600";

  return (
    <div className="group bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300 flex flex-col h-full overflow-hidden">
      
      {/* 1. Image Container */}
      <div className="relative p-4 bg-white aspect-square flex items-center justify-center overflow-hidden">
        <Link to={`/product/${_id}`} className="w-full h-full">
          <img 
            src={mainImage} 
            alt={title} 
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {/* Quick View Button (Corner Icon) */}
        <button 
          className="absolute top-2 right-2 p-2 bg-white/90 rounded-full border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-gray-50"
          title="Quick Look"
        >
          <Eye size={16} className="text-gray-600" />
        </button>
      </div>

      {/* 2. Content Section */}
      <div className="px-4 pb-4 flex flex-col flex-grow">
        
        {/* Title: 2-line clamp */}
        <Link to={`/product/${_id}`} className="mb-1">
          <h3 className="text-sm text-gray-900 font-medium line-clamp-2 hover:text-orange-700 leading-tight">
            {title}
          </h3>
        </Link>

        {/* Rating Row */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-orange-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} strokeWidth={1.5} />
            ))}
          </div>
          <span className="text-xs text-blue-600 font-medium hover:underline">1,240</span>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-[12px] font-bold self-start mt-1">₹</span>
          <span className="text-2xl font-bold">{price?.toLocaleString()}</span>
        </div>

        {/* Delivery / Badge Section */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-1">
            <Zap size={14} className="fill-blue-500 text-blue-500" />
            <span className="text-xs font-bold text-blue-700">FREE delivery</span>
          </div>
          <p className="text-[11px] text-gray-500">Get it by <span className="font-bold text-gray-900">Tomorrow</span></p>
        </div>

        {/* Add to Cart Button: Amazon Yellow/Orange */}
        <div className="mt-auto pt-2">
          <button 
            disabled={stock === 0}
            className={`w-full py-2 rounded-full text-xs font-semibold shadow-sm border transition-all 
              ${stock === 0 
                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-[#FFD814] hover:bg-[#F7CA00] border-[#FCD200] text-black active:shadow-inner'
              }`}
          >
            {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;