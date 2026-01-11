import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ArrowLeft, Package, User, MapPin, 
  CreditCard, Truck, CheckCircle, Loader2, Download 
} from 'lucide-react';
import { clearErrors, getOrderDetail, updateOrderStatus } from '../../redux/actions/OrderActions';
import { UPDATE_ORDER_RESET } from '../../redux/constants';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AdminOrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.singleOrder);
  const { isUpdated, error: updateError } = useSelector((state) => state.adminOrders);

  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getOrderDetail(id));

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
      dispatch(getOrderDetail(id));
    }
  }, [dispatch, error, id, isUpdated]);

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateOrderStatus(id, status));
  };

  const downloadInvoice = () => {
    if (!order) return;

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(0, 128, 96); 

    doc.text("NEXUS", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("OFFICIAL INVOICE", 14, 28);
    doc.text(`Order ID: #${order._id.toUpperCase()}`, 14, 33);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 38);

    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.text("BILL TO:", 14, 55);
    doc.setFontSize(10);
    doc.text(`Customer: ${order.customerId?.name || 'N/A'}`, 14, 62);
    doc.text(`Email: ${order.customerId?.emailid || 'N/A'}`, 14, 67);
    doc.text(`Shipping: ${order.shippingAddress}`, 14, 72, { maxWidth: 100 });

    const tableColumn = ["Product", "Price", "Qty", "Subtotal"];
    const tableRows = order.items.map(item => [
      item.productId?.title || "Product Item",
      `INR ${item.price}`,
      item.quantity,
      `INR ${item.price * item.quantity}`
    ]);

    autoTable(doc, {
      startY: 85,
      head: [tableColumn],
      body: tableRows,
      headStyles: { fillColor: [0, 128, 96], fontStyle: 'bold' },
      theme: 'grid',
      styles: { fontSize: 9 }
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`Total Amount: INR ${order.totalAmount}`, 14, finalY);

    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(150);
    doc.text("This is a computer generated invoice and does not require a signature.", 14, finalY + 15);

    doc.save(`Invoice_${order._id.slice(-6)}.pdf`);
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#f6f6f7]">
      <Loader2 className="animate-spin text-[#008060] mb-4" size={40} />
      <p className="text-xs font-black uppercase tracking-widest text-gray-400">Loading Order Details...</p>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 bg-[#f6f6f7] min-h-screen">
      <div className="max-w-5xl mx-auto">

        {}
        <div className="flex items-center justify-between mb-8">
          <Link to="/admin/orders" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft size={18} />
            <span className="text-sm font-bold">Back to Orders</span>
          </Link>

          <div className="flex items-center gap-4">
            <button 
              onClick={downloadInvoice}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm group"
            >
              <Download size={14} className="group-hover:text-[#008060]" /> Download Invoice
            </button>
            <div className="text-right border-l pl-4 border-gray-200">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</p>
              <h1 className="text-xl font-black text-gray-900">#{order?._id?.toUpperCase()}</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">
            {}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                <User className="text-[#008060]" size={20} />
                <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Customer Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase">Name</p>
                  <p className="text-sm font-bold text-gray-800">{order?.customerId?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase">Email</p>
                  <p className="text-sm font-bold text-gray-800">{order?.customerId?.emailid || "N/A"}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Shipping Address</p>
                  <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600 leading-relaxed">{order?.shippingAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                <Package className="text-[#008060]" size={20} />
                <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Package Items</h3>
              </div>
              <div className="space-y-4">
                {order?.items?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.productId?.images?.[0] || "https://via.placeholder.com/150"} 
                        alt="product" 
                        className="w-14 h-14 object-cover rounded-lg border border-gray-100 bg-gray-50"
                      />
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                           {item.productId?.title || `Product ID: ${item.productId?._id?.slice(-6).toUpperCase()}`}
                        </p>
                        <p className="text-xs text-gray-500 font-medium">Qty: {item.quantity} × ₹{item.price}</p>
                      </div>
                    </div>
                    <p className="text-sm font-black text-gray-900">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center px-2">
                <span className="text-sm font-black text-gray-900 uppercase">Total Amount</span>
                <span className="text-xl font-black text-[#008060]">₹{order?.totalAmount}</span>
              </div>
            </div>
          </div>

          {}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-24">
              <div className="mb-6">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Current Status</p>
                <div className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  order?.orderStatus === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                }`}>
                  {order?.orderStatus}
                </div>
              </div>

              <form onSubmit={updateHandler} className="space-y-4">
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:border-[#008060] outline-none transition-all cursor-pointer"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  {order?.orderStatus === "placed" && <option value="packed">Mark Packed</option>}
                  {order?.orderStatus === "packed" && <option value="shipped">Mark Shipped</option>}
                  {order?.orderStatus === "shipped" && <option value="delivered">Mark Delivered</option>}
                </select>
                <button 
                  disabled={!status || loading}
                  className="w-full bg-[#008060] text-white rounded-xl py-3.5 text-xs font-black uppercase tracking-widest hover:bg-[#006e52] disabled:opacity-50 transition-all shadow-lg shadow-emerald-100 active:scale-[0.98]"
                >
                  {loading ? "Updating..." : "Update Order"}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard size={16} className="text-gray-400" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Details</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-gray-600">Status:</p>
                  <p className={`text-xs font-black uppercase ${order?.paymentStatus === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {order?.paymentStatus}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-gray-600">Method:</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight truncate max-w-[100px]">
                    {order?.paymentInfo?.id || 'COD'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;