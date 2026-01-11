import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  // Colors from your VendorHeader palette
  const colors = {
    primary: "#008060",
    textMain: "#202223",
    textMuted: "#6d7175",
    border: "#e1e3e5"
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] antialiased">
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer Panel */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#e1e3e5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className={`text-[${colors.primary}]`} />
            <h2 className="text-lg font-bold text-[#202223]">Your Cart (2)</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#f1f2f3] rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Cart Items (Scrollable Area) */}
        <div className="flex-grow overflow-y-auto px-6 py-4 space-y-6">
          <CartItem 
            name="Minimalist Nordic Desk Lamp" 
            price={129.99} 
            variant="Matte Black"
            img="https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=200" 
          />
          <CartItem 
            name="Walnut Wireless Charger" 
            price={89.00} 
            variant="Standard"
            img="https://images.unsplash.com/photo-1586816829391-727932314271?q=80&w=200" 
          />
        </div>

        {/* Footer / Checkout */}
        <div className="px-6 py-8 bg-[#f6f6f7] border-t border-[#e1e3e5] space-y-4">
          <div className="flex justify-between items-center text-[#202223]">
            <span className="text-sm font-medium">Subtotal</span>
            <span className="text-xl font-extrabold">$218.99</span>
          </div>
          <p className="text-[11px] text-[#6d7175] italic">
            Shipping and taxes calculated at checkout.
          </p>
          
          <div className="space-y-3 pt-2">
            <button className="w-full bg-[#008060] hover:bg-[#006e52] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#008060]/10">
              Checkout <ArrowRight size={18} />
            </button>
            <Link 
              to="/cart" 
              onClick={onClose}
              className="w-full block text-center text-sm font-bold text-[#202223] underline underline-offset-4 hover:text-[#008060]"
            >
              View Full Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for individual items
const CartItem = ({ name, price, variant, img }) => (
  <div className="flex gap-4">
    <div className="w-20 h-24 bg-[#f1f2f3] rounded-lg overflow-hidden flex-shrink-0">
      <img src={img} className="w-full h-full object-cover" alt={name} />
    </div>
    <div className="flex-grow flex flex-col justify-between py-1">
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-bold text-[#202223] leading-tight line-clamp-2">{name}</h3>
          <button className="text-[#6d7175] hover:text-[#bf0711] ml-2"><Trash2 size={16} /></button>
        </div>
        <p className="text-[11px] text-[#6d7175] mt-1 uppercase font-bold tracking-wider">{variant}</p>
      </div>
      
      <div className="flex justify-between items-end">
        <div className="flex items-center border border-[#e1e3e5] rounded-md scale-90 -ml-2">
          <button className="px-2 py-1 text-gray-400 hover:text-black"><Minus size={12}/></button>
          <span className="px-2 text-xs font-bold">1</span>
          <button className="px-2 py-1 text-[#008060] hover:text-[#006e52]"><Plus size={12}/></button>
        </div>
        <span className="text-sm font-bold text-[#202223]">${price}</span>
      </div>
    </div>
  </div>
);

export default CartDrawer;