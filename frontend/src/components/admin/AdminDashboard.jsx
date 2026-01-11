import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  DollarSign, Users, ShoppingCart, Package, 
  TrendingUp, AlertCircle, Zap, Activity, ChevronRight, Clock 
} from 'lucide-react';
import { getAdminDashboardData, clearErrors } from "../../redux/actions/DashboardAction";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { loading, stats, error } = useSelector((state) => state.adminStats);

  useEffect(() => {
    dispatch(getAdminDashboardData());

    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f6f7]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f6f6f7] p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black text-[#202223] uppercase tracking-tighter">Command Center</h1>
            <p className="text-sm text-[#6d7175] font-bold uppercase tracking-widest mt-1">Platform Intelligence</p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#e1e3e5] shadow-sm">
            <Activity size={16} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#202223]">Live System Status</span>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            label="Total Revenue" 
            value={`₹${stats?.revenue?.toLocaleString() || 0}`} 
            icon={DollarSign} color="text-emerald-600" bg="bg-emerald-50" 
          />
          <StatCard 
            label="Total Vendors" 
            value={stats?.vendors || 0} 
            icon={Users} color="text-blue-600" bg="bg-blue-50" 
          />
          <StatCard 
            label="Total Orders" 
            value={stats?.orders || 0} 
            icon={ShoppingCart} color="text-purple-600" bg="bg-purple-50" 
          />
          <StatCard 
            label="Global Stock" 
            value={stats?.totalStock || 0} 
            icon={Package} color="text-orange-600" bg="bg-orange-50" 
          />
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

          {}
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-[#e1e3e5] shadow-sm">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-sm font-black text-[#202223] uppercase tracking-widest">Revenue Growth</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">7-Day Earnings Trend</p>
              </div>
              <TrendingUp className="text-emerald-500" size={20} />
            </div>
            <div className="h-64 flex items-end justify-between px-4 gap-2">
               {stats?.chartData?.map((day, i) => (
                 <div key={i} className="group relative flex-1 flex flex-col items-center gap-4">
                    <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-all bg-[#202223] text-white text-[9px] font-black px-2 py-1 rounded whitespace-nowrap">
                        ₹{day.amount.toLocaleString()}
                    </div>
                    <div 
                        className="w-full bg-emerald-500/10 border-t-4 border-emerald-500 rounded-t-xl transition-all group-hover:bg-emerald-500/20" 
                        style={{ height: `${(day.amount / (stats.revenue || 1)) * 400 + 20}px` }}
                    ></div>
                    <span className="text-[9px] font-black text-gray-400 uppercase">{day._id.split('-')[2]}</span>
                 </div>
               ))}
            </div>
          </div>

          {}
          <div className="bg-[#202223] p-8 rounded-[2.5rem] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 text-amber-400">
                    <Clock size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Verification Queue</span>
                </div>
                <h3 className="text-4xl font-black italic">{stats?.pendingApprovals || 0}</h3>
                <p className="text-sm text-gray-400 mt-2 font-bold uppercase tracking-tighter">New Stores Pending Review</p>
            </div>
            <button className="relative z-10 mt-8 w-full bg-white text-black py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors">
                View All Stores
            </button>
            <Zap className="absolute -right-8 -bottom-8 text-white opacity-5 group-hover:opacity-10 transition-opacity" size={200} />
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {}
            <div className="bg-white p-8 rounded-[2.5rem] border border-rose-100 flex items-center justify-between shadow-sm group hover:border-rose-300 transition-all">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <AlertCircle size={32} />
                  </div>
                  <div>
                     <h3 className="text-sm font-black text-[#202223] uppercase">Inventory Risks</h3>
                     <p className="text-2xl font-black text-rose-600">{stats?.lowStockAlerts || 0} Items</p>
                     <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Critically Low Stock (&lt;10 units)</p>
                  </div>
               </div>
               <ChevronRight className="text-gray-300" />
            </div>

            {}
            <div className="bg-white p-8 rounded-[2.5rem] border border-[#e1e3e5] flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <TrendingUp size={32} />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-[#202223] uppercase">Platform Health</h3>
                        <p className="text-2xl font-black text-emerald-600">Excellent</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">All systems operational</p>
                    </div>
                </div>
                <div className="flex gap-1">
                    {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>)}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color, bg }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-[#e1e3e5] shadow-sm hover:shadow-md transition-all">
    <div className={`w-12 h-12 rounded-2xl ${bg} ${color} flex items-center justify-center mb-4`}>
      <Icon size={24} />
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
    <h2 className="text-3xl font-black text-[#202223] mt-1 tracking-tighter">{value}</h2>
  </div>
);

export default AdminDashboard;