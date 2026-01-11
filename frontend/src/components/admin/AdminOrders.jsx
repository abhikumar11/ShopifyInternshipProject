import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, clearErrors, updateOrderStatus } from '../../redux/actions/OrderActions'; 
import { UPDATE_ORDER_RESET } from '../../redux/constants';
import { 
  Loader2, ShoppingBag, Eye, Box, 
  CheckCircle2, Clock, Truck, AlertCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminOrders = () => {
  const dispatch = useDispatch();

  // 1. Pull data from Redux
  const { loading, error, orders, isUpdated } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(getAllOrders());

    if (error) {
      console.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      // Refresh list after a status change
      dispatch(getAllOrders());
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, error, isUpdated]);

  // 2. Helper for status colors
  const StatusBadge = ({ status }) => {
    const styles = {
      placed: "bg-blue-50 text-blue-600 border-blue-100",
      packed: "bg-purple-50 text-purple-600 border-purple-100",
      shipped: "bg-amber-50 text-amber-600 border-amber-100",
      delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
      cancelled: "bg-red-50 text-red-600 border-red-100",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status] || styles.placed}`}>
        {status}
      </span>
    );
  };

  // 3. Action handler for "Mark Packed"
  const handleUpdateStatus = (id, status) => {
    dispatch(updateOrderStatus(id, status));
  };

  if (loading && !isUpdated) return (
    <div className="h-96 flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-[#008060] mb-2" size={32} />
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Syncing Orders...</p>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 bg-[#f6f6f7] min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-900">Order Management</h1>
          <p className="text-sm text-gray-500 font-medium">Global view of all customer transactions</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Order ID</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Customer</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Amount</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders && orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-gray-900 uppercase">#{order._id.slice(-8)}</p>
                    <p className="text-[10px] text-gray-400 font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-800">{order.customerId?.name || "Guest"}</p>
                    <p className="text-[10px] text-gray-400 truncate w-32">{order.customerId?.emailid}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-teal-700">₹{order.totalAmount}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{order.paymentStatus}</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.orderStatus} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {/* Vendor logic: Mark as Packed if status is placed */}
                      {order.orderStatus === "placed" && (
                        <button 
                          onClick={() => handleUpdateStatus(order._id, "packed")}
                          className="flex items-center gap-2 px-3 py-1.5 bg-[#008060] text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#006e52]"
                        >
                          <Box size={14} /> Pack
                        </button>
                      )}
                      
                      <Link 
                        to={`/admin/order/${order._id}`}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-black"
                      >
                        <Eye size={14} /> View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {(!orders || orders.length === 0) && (
            <div className="p-20 text-center">
              <ShoppingBag className="mx-auto text-gray-200 mb-4" size={48} />
              <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;