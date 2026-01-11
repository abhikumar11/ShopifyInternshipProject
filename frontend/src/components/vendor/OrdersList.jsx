import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAllOrders, updateOrderStatus } from '../../redux/actions/OrderActions'; 
import { UPDATE_ORDER_RESET } from '../../redux/constants';
import { Loader2, Eye, Box, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrdersList = () => {
  const dispatch = useDispatch();
  const { loading, error, orders, isUpdated } = useSelector((state) => state.adminOrders);
    console.log("first",orders)
  useEffect(() => {
    dispatch(getAllOrders());

    if (isUpdated) {
      dispatch(getAllOrders());
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isUpdated, error]);

  const handlePackOrder = (id) => {
    dispatch(updateOrderStatus(id, "packed"));
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      placed: "bg-blue-50 text-blue-700 border-blue-100",
      packed: "bg-purple-50 text-purple-700 border-purple-100",
      shipped: "bg-orange-50 text-orange-700 border-orange-100",
      delivered: "bg-green-50 text-green-700 border-green-100",
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status] || styles.placed}`}>
        {status}
      </span>
    );
  };

  if (loading && !isUpdated) return (
    <div className="h-96 flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-[#008060] mb-2" size={32} />
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Order Queue</p>
    </div>
  );

  return (
    <div className="p-6 bg-[#f6f6f7] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-black text-gray-900">Incoming Orders</h1>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-tighter">Fulfillment Dashboard</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Order ID</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Customer</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Total Amount</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 text-right">Fulfillment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900 text-xs tracking-tight">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-600">
                      {order.user?.name || "Guest Customer"}
                    </td>
                    <td className="px-6 py-4 font-black text-gray-900 text-xs">
                      ₹{order.totalAmount}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={order.orderStatus} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        {/* Fulfillment Action */}
                        {order.orderStatus === "placed" && (
                          <button 
                            onClick={() => handlePackOrder(order._id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#008060] text-white rounded-md text-[10px] font-black uppercase hover:bg-[#006e52] transition-colors"
                          >
                            <Box size={12} /> Mark Packed
                          </button>
                        )}
                        <Link 
                          to={`/vendor/order/${order._id}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-[10px] font-black uppercase hover:bg-gray-200 transition-colors"
                        >
                          <Eye size={12} /> View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center opacity-20">
                      <ShoppingBag size={40} className="mb-2" />
                      <p className="text-[10px] font-black uppercase tracking-widest">No Active Orders</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;