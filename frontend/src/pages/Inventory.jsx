import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStore } from "../redux/actions/StoreAction";
import { getVendorProducts } from "../redux/actions/ProductAction"; 
import { DELETE_PRODUCT_RESET } from "../redux/constants"; // Add this constant

import { 
  Plus, Search, Filter, MoreVertical, 
  Package, EyeOff, CheckCircle2, Clock, 
  Trash2, Edit3, Loader2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const dispatch = useDispatch();

  // Redux State
  const { store } = useSelector((state) => state.vendorStore);
  const { products, loading: productsLoading } = useSelector((state) => state.allProducts);
  // const { isDeleted, error: deleteError, loading: isDeleting } = useSelector((state) => state.productAction); 

  const [searchTerm, setSearchTerm] = useState("");

  // 1. Load Store and Products
  useEffect(() => {
    if (!store) {
      dispatch(loadStore());
    }
    if (store?._id) {
      dispatch(getVendorProducts(store._id));
    }
  }, [dispatch, store?._id]);

  // 2. Handle Deletion Feedback
  // useEffect(() => {
  //   if (deleteError) {
  //     alert(deleteError);
  //     dispatch({ type: DELETE_PRODUCT_RESET });
  //   }
  //   if (isDeleted) {
  //     alert("Product removed successfully");
  //     dispatch({ type: DELETE_PRODUCT_RESET });
  //     // Refresh list
  //     dispatch(getVendorProducts(store?._id));
  //   }
  // }, [dispatch, deleteError, store?._id]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      //dispatch(deleteProduct(id));
    }
  };

  const isApproved = store?.status === 'approved';

  const filteredProducts = products?.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Loading State for the whole page
  if (productsLoading && !products) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f6f7]">
       <div className="flex flex-col items-center gap-4">
         <div className="w-12 h-12 border-4 border-[#008060] border-t-transparent rounded-full animate-spin"></div>
         <p className="text-sm font-bold text-gray-500">Syncing Inventory...</p>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f6f6f7] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-[#202223]">Inventory Management</h1>
            <p className="text-sm text-[#6d7175]">Manage your {products?.length || 0} products and stock levels.</p>
          </div>

          <Link 
            to="/vendor/addproduct"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-[#008060] hover:bg-[#006e52] text-white shadow-lg transition-all active:scale-95"
          >
            <Plus size={20} /> Add New Product
          </Link>
        </div>

        {/* Preview Mode Banner */}
        {!isApproved && (
          <div className="mb-8 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><EyeOff size={24} /></div>
            <div>
              <h3 className="text-sm font-bold text-blue-900">Products are currently in Preview Mode</h3>
              <p className="text-xs text-blue-700 mt-1">Once your store is <strong>Approved</strong>, your active products will go live.</p>
            </div>
          </div>
        )}

        {/* Table Container */}
        <div className="bg-white rounded-3xl border border-[#e1e3e5] shadow-sm overflow-hidden">
          
          {/* Search Bar */}
          <div className="p-6 border-b border-[#e1e3e5]">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#008060] outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-[0.1em] text-gray-400 border-b border-[#e1e3e5]">
                  <th className="px-8 py-4">Product Details</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((p) => (
                  <tr key={p._id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
                          {p.images && p.images[0] ? (
                            <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300"><Package size={24} /></div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900 line-clamp-1">{p.title}</span>
                          <span className="text-[10px] text-gray-400 uppercase font-bold">{p.categoryId?.name || 'General'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {p.status === 'active' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase">
                          <CheckCircle2 size={12} /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-[10px] font-black uppercase">
                          <Clock size={12} /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-gray-900">₹{p.price.toLocaleString()}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <span className={`text-xs font-bold ${p.stock <= 5 ? 'text-red-500' : 'text-gray-700'}`}>
                          {p.stock} in stock
                        </span>
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${p.stock <= 5 ? 'bg-red-500' : 'bg-[#008060]'}`}
                            style={{ width: `${Math.min((p.stock / 50) * 100, 100)}%` }} // Scaled to 50 for visual
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          to={`/vendor/editproduct/${p._id}`}
                          className="p-2 text-gray-400 hover:text-[#008060] hover:bg-emerald-50 rounded-lg transition-all"
                        >
                          <Edit3 size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(p._id)}
                          //disabled={isDeleting}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-30"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-24 text-center">
               <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Package className="text-gray-300" size={40} />
               </div>
               <h3 className="text-gray-900 font-bold">No products found</h3>
               <p className="text-gray-500 text-sm mt-1">Try adding a new product to your inventory.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;