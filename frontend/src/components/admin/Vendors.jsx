import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Plus, Edit3, Trash2, Building2, 
  Mail, Phone, ShieldCheck, X, Loader2,
  CheckCircle, XCircle, Ban
} from 'lucide-react';
import { getAdminStores, updateStoreStatus, deleteStore, clearErrors } from '../../redux/actions/StoreAction';


const Vendors = () => {
  const dispatch = useDispatch();
  
  const {stores,loading,error,isUpdated,isDeleted}=useSelector((state)=>state.vendorStore);

  useEffect(() => {
    dispatch(getAdminStores());

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Store status updated!");
      dispatch({ type: "UPDATE_STORE_RESET" });
      dispatch(getAdminStores());
    }

    if (isDeleted) {
      alert("Store deleted successfully!");
      dispatch({ type: "DELETE_STORE_RESET" });
      dispatch(getAdminStores());
    }
  }, [dispatch, error, isUpdated, isDeleted]);

  const handleStatusUpdate = (id, newStatus) => {
    dispatch(updateStoreStatus(id, { status: newStatus }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this store? This cannot be undone.")) {
      dispatch(deleteStore(id));
    }
  };

  return (
    <div className="p-8 bg-[#f6f6f7] min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Vendor Stores</h1>
            <p className="text-gray-500 font-medium">Approve or manage vendor store applications</p>
          </div>
        </div>

        {/* Stores Table */}
        <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-[#008060]" size={40} /></div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Store / Logo</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Owner Details</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Approvals / Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {stores && stores.map((store) => (
                  <tr key={store._id} className="hover:bg-gray-50/30 transition-colors group">
                    {/* Store Column */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm">
                          {store.logo ? (
                            <img src={store.logo} alt="logo" className="object-cover w-full h-full" />
                          ) : (
                            <Building2 size={20} className="text-gray-300" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900">{store.storeName}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter italic line-clamp-1 w-40">
                            {store.description || "No description"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Owner Column - Accessing User Model fields */}
                    <td className="px-8 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-900">
                          <span className="text-xs font-black capitalize">{store.ownerId?.name || "Unknown"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Mail size={12} />
                          <span className="text-[10px] font-bold">{store.ownerId?.emailid}</span>
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        store.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        store.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-red-50 text-red-600 border-red-100'
                      }`}>
                        {store.status}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        {store.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleStatusUpdate(store._id, 'approved')}
                              className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                              title="Approve Store"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(store._id, 'rejected')}
                              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                              title="Reject Store"
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                        
                        {store.status === 'approved' && (
                          <button 
                            onClick={() => handleStatusUpdate(store._id, 'disabled')}
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-800 hover:text-white transition-all"
                            title="Disable Store"
                          >
                            <Ban size={16} />
                          </button>
                        )}

                        <button 
                          onClick={() => handleDelete(store._id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-gray-300 hover:text-red-600 transition-all ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vendors;