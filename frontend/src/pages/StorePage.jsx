import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStore } from "../redux/actions/StoreAction";
import { 
  MapPin, ShieldCheck, Star, Clock, 
  Settings, Edit3, Loader2, AlertTriangle 
} from 'lucide-react';

const StorePage = () => {
  const dispatch = useDispatch();
  
  // Accessing the vendorStore state populated by loadStore()
  const { store, loading, error } = useSelector((state) => state.vendorStore);

  useEffect(() => {
    // Only call if store isn't already loaded or to refresh data
    dispatch(loadStore());
  }, [dispatch]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-[#008060]" size={40} />
    </div>
  );

  if (!store && !loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <AlertTriangle size={48} className="text-amber-500" />
      <p className="text-gray-600 font-medium">No store found. Create one to get started.</p>
    </div>
  );

  const isPending = store?.status === "pending";

  return (
    <div className="min-h-screen bg-[#f6f6f7] antialiased">
      
      {/* 1. Status Notification Bar */}
      {isPending && (
        <div className="bg-amber-50 border-b border-amber-200 py-3 px-6 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 text-amber-800 text-sm font-medium">
              <Clock size={18} className="animate-pulse" />
              <span>Your store is currently <strong>Pending Approval</strong>. It is not yet visible to customers.</span>
            </div>
            <button className="text-xs bg-amber-200 hover:bg-amber-300 text-amber-900 px-3 py-1 rounded-lg font-bold transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      )}

      {/* 2. Hero Banner */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden bg-gray-200">
        <img 
          src={store?.banner} 
          className={`w-full h-full object-cover ${isPending ? 'opacity-60 blur-[1px]' : ''}`} 
          alt="Banner" 
        />
        <div className="absolute inset-0 bg-black/5" />
        
        {/* Banner Edit Overlay for Vendor */}
        <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all text-gray-700">
          <Edit3 size={18} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* 3. Header Profile Card */}
        <div className="relative -mt-16 md:-mt-24 flex flex-col md:flex-row items-start md:items-end gap-6 pb-10 border-b border-gray-200 bg-transparent">
          <div className="relative shrink-0 group">
            <img 
              src={store?.logo} 
              className="w-32 h-32 md:w-48 md:h-48 rounded-3xl border-4 border-white shadow-2xl object-cover bg-white" 
              alt="Logo" 
            />
            {/* Logo Edit Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-3xl cursor-pointer">
              <Edit3 className="text-white" size={24} />
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-black text-gray-900">{store?.storeName}</h1>
              <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-500">
                <Star size={14} className="mr-1 fill-amber-400 text-amber-400" /> New Vendor
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-1.5"><MapPin size={16} /> Online Store</span>
              <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase font-bold ${isPending ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {isPending ? 'Under Review' : 'Verified Merchant'}
              </span>
            </div>
            
            <p className="max-w-3xl text-gray-600 text-base leading-relaxed">
              {store?.description}
            </p>
          </div>

          <div className="flex gap-3 pb-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
              <Settings size={18} /> Manage
            </button>
            <button className="bg-[#008060] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-[#006e52] shadow-lg shadow-emerald-100 transition-all active:scale-95">
              Add Product
            </button>
          </div>
        </div>

        {/* 4. Content Area */}
        <div className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
            <button className="text-[#008060] font-bold text-sm hover:underline">View All</button>
          </div>

          {isPending ? (
            <div className="py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center">
              <div className="bg-amber-50 p-4 rounded-full mb-4">
                <Clock className="text-amber-500" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Store Catalog Pending</h3>
              <p className="text-gray-500 text-sm mt-1">Your products will be visible to the public once your store is approved.</p>
            </div>
          ) : (
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <p className="col-span-full py-10 text-center text-gray-400 italic">No products listed yet.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePage;