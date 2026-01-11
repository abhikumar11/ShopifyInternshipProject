import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check, Package, MapPin, CreditCard, ChevronRight, ShoppingBag } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId, paymentId } = location.state || { 
    orderId: "ORD-7721092", 
    paymentId: "pay_xyz123" 
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navbar Minimal */}
      <nav className="border-b border-gray-100 py-6 px-8 flex justify-between items-center">
        <h1 className="text-xl font-black tracking-tighter uppercase italic text-teal-600">NEXUS.</h1>
        <Link to="/" className="text-gray-400 hover:text-black"><ShoppingBag size={20}/></Link>
      </nav>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-16">
        
        {/* Left Side: Confirmation Message */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-teal-200">
              <Check size={28} strokeWidth={3} />
            </div>
            <p className="text-sm font-medium text-gray-500">Order #{orderId.toString().slice(-8).toUpperCase()}</p>
            <h2 className="text-4xl font-bold leading-tight">Thank you for your purchase, {location.state?.name || 'Customer'}!</h2>
            <p className="text-gray-500 text-lg">Your order is confirmed and will be ready to ship in 1-2 business days.</p>
          </div>

          <div className="border border-gray-100 rounded-2xl p-6 space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 border-b border-gray-50 pb-4">Order Updates</h3>
            <div className="flex gap-4">
              <div className="bg-teal-50 p-3 rounded-xl h-fit">
                <Package className="text-teal-600" size={20} />
              </div>
              <p className="text-sm text-gray-600">You’ll receive shipping and delivery updates via email and SMS.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/myorders" className="bg-black text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-teal-600 transition-all flex items-center justify-center gap-2">
              Track your order <ChevronRight size={16}/>
            </Link>
            <Link to="/" className="border border-gray-200 px-8 py-4 rounded-full font-bold text-sm hover:bg-gray-50 transition-all text-center">
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right Side: Order Summary (Receipt Style) */}
        <div className="bg-gray-50 rounded-3xl p-8 lg:p-10 h-fit space-y-8 border border-gray-100">
          <h3 className="text-lg font-bold">Order Summary</h3>
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-8 pt-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={14}/> <span className="text-[10px] font-black uppercase tracking-widest">Shipping to</span>
              </div>
              <p className="text-xs font-bold leading-relaxed">
                {location.state?.address || "Registered Address"}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <CreditCard size={14}/> <span className="text-[10px] font-black uppercase tracking-widest">Payment</span>
              </div>
              <p className="text-xs font-bold">{paymentId}</p>
              <p className="text-[10px] text-teal-600 font-bold uppercase tracking-tighter italic">Paid via Razorpay</p>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm font-medium mb-2">
              <span className="text-gray-500">Subtotal</span>
              <span>₹{location.state?.amount || "0.00"}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-medium mb-6">
              <span className="text-gray-500">Shipping</span>
              <span className="text-teal-600 font-bold uppercase text-xs">Free</span>
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-gray-900">
              <span className="text-xl font-black">Total</span>
              <div className="text-right">
                <span className="text-2xl font-black">INR ₹{location.state?.amount || "0.00"}</span>
                <p className="text-[10px] text-gray-400 font-medium">Including all taxes</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;