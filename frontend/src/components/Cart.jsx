import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Trash2, Plus, Minus, ShoppingBag, 
  ArrowLeft, ShieldCheck, Truck, Info, Lock 
} from 'lucide-react';
import { addToCart, removeFromCart } from "../redux/actions/CartAction";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
 
  const grandTotal = subtotal + shipping;

  const handleQtyChange = (id, currentQty, stock, val) => {
    const newQty = currentQty + val;
    if (newQty >= 1 && newQty <= stock) {
      dispatch(addToCart(id, newQty));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 mt-2 mb-6">Start adding some items to see them here!</p>
        <Link to="/products" className="bg-[#008060] text-white px-8 py-3 rounded-xl font-bold">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8 lg:py-12">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-black text-[#202223] uppercase">
                Cart ({totalItems})
              </h1>
              <Link to="/products" className="text-[#008060] text-sm font-bold flex items-center gap-2">
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.product} 
                  className="bg-white border border-[#e1e3e5] rounded-2xl p-4 sm:p-5 flex gap-4 sm:gap-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  {}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#f8f9fa] rounded-xl overflow-hidden shrink-0 border border-gray-100 p-2">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain mix-blend-multiply" 
                    />
                  </div>

                  {}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <Link to={`/product/${item.product}`} className="text-base sm:text-lg font-bold text-[#202223] hover:text-[#008060] line-clamp-1">
                          {item.name}
                        </Link>
                        <p className="text-lg font-black text-[#202223] whitespace-nowrap">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      {item.variant && (
                        <p className="text-xs font-bold text-gray-400 uppercase mt-1">
                          {item.variant.color} / {item.variant.size}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {}
                      <div className="flex items-center border border-gray-200 rounded-lg bg-[#f8f9fa] overflow-hidden">
                        <button 
                          onClick={() => handleQtyChange(item.product, item.quantity, item.stock, -1)}
                          className="p-2 hover:bg-gray-200 transition-colors"
                        >
                          <Minus size={14} className="text-gray-600" />
                        </button>
                        <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => handleQtyChange(item.product, item.quantity, item.stock, 1)}
                          className="p-2 hover:bg-gray-200 transition-colors"
                        >
                          <Plus size={14} className="text-gray-600" />
                        </button>
                      </div>

                      {}
                      <button 
                        onClick={() => handleRemove(item.product)}
                        className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} /> <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {}
          <div className="lg:col-span-4">
            <div className="bg-white border border-[#e1e3e5] rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-[#202223] mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium text-[#6d7175]">
                  <span>Total Items</span>
                  <span>{totalItems} Units</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-[#6d7175]">
                  <span>Subtotal</span>
                  <span className="text-[#202223]">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-[#6d7175]">
                  <div className="flex items-center gap-1">Shipping <Info size={14} className="text-gray-300"/></div>
                  <span className={shipping === 0 ? "text-[#008060] font-bold" : "text-[#202223]"}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
              

                <div className="border-t border-dashed pt-4 flex justify-between items-baseline">
                  <span className="text-base font-bold text-[#202223]">Total</span>
                  <span className="text-2xl font-black text-[#202223]">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <Link to={"/checkout"} className="w-full bg-[#008060] hover:bg-[#006e52] text-white py-4 rounded-xl font-bold mt-8 shadow-lg flex items-center justify-center gap-2">
                <Lock size={18} /> Proceed to Checkout
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <ShieldCheck size={18} className="text-[#008060]" />
                  Secure SSL Encryption
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Truck size={18} className="text-[#008060]" />
                  Verified Delivery
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;