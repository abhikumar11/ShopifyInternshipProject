import React, { useState } from 'react';
import { 
  ArrowLeft, Package, Truck, CheckCircle, 
  Clock, printer, Mail, Phone, ExternalLink, MoreVertical 
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const VendorOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Local state for status update (In real app, fetch this from Redux)
  const [status, setStatus] = useState('Processing');
  const [isUpdating, setIsUpdating] = useState(false);

  const order = {
    id: id || "#1024",
    date: "Oct 24, 2023, 2:30 PM",
    customer: {
      name: "Rahul Sharma",
      email: "rahul.s@example.com",
      phone: "+91 98765 43210",
      address: "123 Green Valley, Andheri West, Mumbai, MH - 400053"
    },
    items: [
      { id: 1, name: "Minimalist Nordic Desk Lamp", price: 129.99, qty: 1, variant: "Matte Black", image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=200" },
      { id: 2, name: "Organic Cotton Throw", price: 45.00, qty: 2, variant: "Soft Gray", image: "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?q=80&w=200" }
    ],
    subtotal: 219.99,
    shipping: 15.00,
    tax: 18.50,
    total: 253.49,
    paymentStatus: "Paid",
    paymentMethod: "Visa ending in 4242"
  };

  const handleStatusUpdate = (newStatus) => {
    setIsUpdating(true);
    // Simulate API Call
    setTimeout(() => {
      setStatus(newStatus);
      setIsUpdating(false);
      // dispatch(updateOrderStatus(id, newStatus));
    }, 8000); 
  };

  return (
    <div className="min-h-screen bg-[#f6f6f7] pb-20">
      {/* Top Header Navigation */}
      <div className="bg-white border-b border-[#e1e3e5] sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} className="text-[#6d7175]" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-[#202223] flex items-center gap-2">
                Order {order.id}
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-bold ${
                  status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {status}
                </span>
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="hidden sm:flex items-center gap-2 text-sm font-semibold border border-[#babfc3] px-4 py-2 rounded-lg hover:bg-gray-50">
              Print Invoice
            </button>
            <button className="bg-[#008060] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#006e52]">
              Fulfill Item
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Order Items & Payment */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Items Card */}
          <div className="bg-white rounded-xl border border-[#e1e3e5] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e1e3e5] bg-gray-50/50">
              <h3 className="text-sm font-bold text-[#202223]">Items and fulfillment</h3>
            </div>
            <div className="divide-y divide-[#f1f2f3]">
              {order.items.map((item) => (
                <div key={item.id} className="p-6 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg border border-[#e1e3e5] overflow-hidden bg-gray-50">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[#008060] hover:underline cursor-pointer">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.variant}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#202223]">${item.price.toFixed(2)} × {item.qty}</p>
                    <p className="text-sm font-bold mt-1">${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-gray-50/30 border-t border-[#e1e3e5]">
               <div className="flex justify-between items-center">
                 <p className="text-sm text-gray-500">Update order status:</p>
                 <select 
                   value={status} 
                   onChange={(e) => handleStatusUpdate(e.target.value)}
                   className="bg-white border border-[#babfc3] rounded-lg text-sm px-3 py-1.5 focus:border-[#008060] outline-none font-medium"
                 >
                   <option value="Processing">Processing</option>
                   <option value="Shipped">Shipped</option>
                   <option value="Delivered">Delivered</option>
                   <option value="Cancelled">Cancelled</option>
                 </select>
               </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-xl border border-[#e1e3e5] shadow-sm p-6 space-y-3">
            <h3 className="text-sm font-bold text-[#202223] mb-4">Payment Summary</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal ({order.items.length} items)</span>
              <span className="text-[#202223]">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className="text-[#202223]">${order.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Estimated Tax</span>
              <span className="text-[#202223]">${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-3 border-t border-[#f1f2f3]">
              <span className="text-[#202223]">Total</span>
              <span className="text-[#202223]">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Customer & Timeline */}
        <div className="space-y-6">
          
          {/* Customer Details */}
          <div className="bg-white rounded-xl border border-[#e1e3e5] shadow-sm p-6">
            <h3 className="text-sm font-bold text-[#202223] mb-4">Customer</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f1f2f3] flex items-center justify-center font-bold text-[#008060]">
                  {order.customer.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#008060] hover:underline cursor-pointer">{order.customer.name}</p>
                  <p className="text-xs text-gray-500">12 previous orders</p>
                </div>
              </div>
              <hr className="border-[#f1f2f3]" />
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contact Information</p>
                <div className="flex items-center gap-2 text-sm text-[#202223]">
                  <Mail size={14} className="text-gray-400" /> {order.customer.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#202223]">
                  <Phone size={14} className="text-gray-400" /> {order.customer.phone}
                </div>
              </div>
              <hr className="border-[#f1f2f3]" />
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Shipping Address</p>
                <p className="text-sm text-[#202223] leading-relaxed">{order.customer.address}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-[#e1e3e5] shadow-sm p-6">
            <h3 className="text-sm font-bold text-[#202223] mb-6">Order Timeline</h3>
            <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#f1f2f3]">
              <div className="flex gap-4 relative">
                <div className="w-4 h-4 rounded-full bg-[#008060] z-10 border-4 border-white"></div>
                <div>
                  <p className="text-xs font-bold text-[#202223]">Order placed</p>
                  <p className="text-[10px] text-gray-400 uppercase font-medium mt-0.5">{order.date}</p>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="w-4 h-4 rounded-full bg-orange-400 z-10 border-4 border-white"></div>
                <div>
                  <p className="text-xs font-bold text-[#202223]">Payment confirmed</p>
                  <p className="text-[10px] text-gray-400 uppercase font-medium mt-0.5">Oct 24, 2:32 PM</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VendorOrderDetail;