import React from 'react';
import { 
  ShoppingBag, DollarSign, Package, Users, 
  ArrowUpRight, MoreHorizontal, ExternalLink, TrendingUp 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VendorDashboard = () => {
  const navigate = useNavigate();
const storeId = "STR-8829-X1";
  // Mock data for a "populated" state
  const stats = [
    { label: 'Total Sales', value: '₹42,850.00', icon: DollarSign, change: '+12.5%', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Orders', value: '156', icon: ShoppingBag, change: '+8.2%', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Products', value: '24', icon: Package, change: '0%', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Customers', value: '89', icon: Users, change: '+5.4%', color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const recentOrders = [
    { id: '#1024', customer: 'Rahul Sharma', date: 'Oct 24', total: '₹1,299', status: 'Delivered' },
    { id: '#1023', customer: 'Ananya Iyer', date: 'Oct 23', total: '₹850', status: 'Processing' },
    { id: '#1022', customer: 'Vikram Singh', date: 'Oct 23', total: '₹2,100', status: 'Shipped' },
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f7] p-4 sm:p-8 antialiased font-sans">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-wrap justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#202223]">Dashboard</h1>
          <p className="text-[#6d7175] text-sm mt-1">Overview of your store performance and recent activity.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate(`/store/${storeId}`)} className="bg-white border border-[#babfc3] hover:bg-[#f6f6f7] text-[#202223] px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
            <ExternalLink size={16} /> View Store
          </button>
          <button className="bg-[#008060] hover:bg-[#006e52] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
            Add Product
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-[#e1e3e5] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-lg ${item.bg} ${item.color}`}>
                  <item.icon size={22} />
                </div>
                <span className={`text-xs font-bold flex items-center gap-1 ${item.color}`}>
                  {item.change} <TrendingUp size={12} />
                </span>
              </div>
              <p className="text-xs text-[#6d7175] font-bold uppercase tracking-wider">{item.label}</p>
              <h2 className="text-2xl font-black text-[#202223] mt-1">{item.value}</h2>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Recent Orders Table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-[#e1e3e5] shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#e1e3e5] flex justify-between items-center bg-white">
                <h3 className="font-bold text-[#202223]">Recent Orders</h3>
                <button className="text-sm text-[#008060] font-bold hover:bg-green-50 px-3 py-1 rounded-md transition-colors">View all</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f9fafb] border-b border-[#e1e3e5]">
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f2f3]">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#f9fafb] transition-colors cursor-pointer">
                        <td className="px-6 py-4 text-sm font-bold text-[#008060]">{order.id}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-[#202223]">{order.customer}</div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase">{order.date}</div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-[#202223]">{order.total}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter 
                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                              order.status === 'Processing' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Analytics & Status */}
          <div className="space-y-6">
            {/* Store Status Card */}
            <div className="bg-white p-6 rounded-xl border border-[#e1e3e5] shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Store Health</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                    <span className="text-sm font-bold text-[#202223]">Store Live</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">99.9% Uptime</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-[#008060] h-1.5 rounded-full w-[85%]"></div>
                </div>
                <p className="text-[11px] text-[#6d7175] leading-relaxed italic">
                  Complete your profile to reach more customers in the wellness category.
                </p>
              </div>
            </div>

            {/* Promo Card */}
            <div className="bg-[#202223] p-6 rounded-xl text-white shadow-lg relative overflow-hidden group cursor-pointer">
              <div className="relative z-10">
                <div className="bg-[#008060] w-fit px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-3 tracking-widest">Featured Tips</div>
                <h3 className="font-bold text-lg leading-tight mb-2">Increase your SEO reach</h3>
                <p className="text-sm text-gray-400 mb-4">Optimized descriptions can boost sales by up to 30%.</p>
                <div className="flex items-center gap-1 text-[#008060] text-xs font-bold group-hover:gap-2 transition-all">
                  Read article <ArrowUpRight size={14} />
                </div>
              </div>
              <Package className="absolute -right-4 -bottom-4 text-white opacity-5 rotate-12 group-hover:scale-110 transition-transform" size={120} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;