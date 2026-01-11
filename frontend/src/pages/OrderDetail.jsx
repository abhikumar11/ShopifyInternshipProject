import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getOrderDetails } from '../redux/actions/OrderActions';
import { 
  Loader2, ArrowLeft, CreditCard, MapPin, 
  Download, CheckCircle2, Package, Calendar, Printer
} from 'lucide-react';

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { loading, error, order } = useSelector((state) => state.singleOrder);

  useEffect(() => {
    dispatch(getOrderDetails(id));
    return () => { dispatch(clearErrors()); };
  }, [dispatch, id]);

  // --- PDF Invoice Generator ---
  const handleDownloadInvoice = () => {
  const doc = new jsPDF();

  // Add Header Content
  doc.setFontSize(18);
  doc.text("PURCHASE INVOICE", 14, 20);
  
  doc.setFontSize(10);
  doc.text(`Order ID: ${order._id}`, 14, 30);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 35);

  // 2. Use autoTable() as a standalone function, passing 'doc' as the first argument
  autoTable(doc, {
    startY: 45,
    head: [['Product', 'Price', 'Quantity', 'Subtotal']],
    body: order.items.map(item => [
      item.productId?.title || item.name,
      `INR ${item.price}`,
      item.quantity,
      `INR ${item.price * item.quantity}`
    ]),
    headStyles: { fillColor: [0, 128, 96] }, // Brand Green
    styles: { font: "helvetica", fontSize: 10 },
  });

  // 3. Use the hook to find where the table ended to place the total
  const finalY = doc.lastAutoTable.finalY + 10; 

  doc.setFont("helvetica", "bold");
  doc.text(`Total Amount: INR ${order.totalAmount}`, 140, finalY);

  doc.save(`Invoice_${order._id.slice(-6)}.pdf`);
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#f6f6f7]">
      <Loader2 className="animate-spin text-[#008060] mb-4" size={40} />
      <p className="text-xs font-black uppercase tracking-widest text-gray-400 italic">Accessing Order Ledger...</p>
    </div>
  );

  if (!order || !order._id) return null;

  return (
    <div className="min-h-screen bg-[#f6f6f7] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <Link to="/orders" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-emerald-600 mb-4 transition-all group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to History
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Order #{order._id.slice(-8).toUpperCase()}</h1>
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${order.orderStatus === 'delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-900 text-white'}`}>
                {order.orderStatus}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
               onClick={() => window.print()}
               className="p-3 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
             >
               <Printer size={18} />
             </button>
             <button 
               onClick={handleDownloadInvoice}
               className="flex items-center gap-2 bg-[#202223] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"
             >
               <Download size={16} /> Download Invoice
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content: Shipment & Items */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Delivery Progress Visualization */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-[#e1e3e5] shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-10">Shipment Milestone</h3>
              <div className="relative flex justify-between">
                <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-100 -z-0" />
                {['placed', 'packed', 'shipped', 'delivered'].map((step, i) => {
                  const statusList = ['placed', 'packed', 'shipped', 'delivered'];
                  const currentIdx = statusList.indexOf(order.orderStatus);
                  const stepIdx = statusList.indexOf(step);
                  const isDone = stepIdx <= currentIdx;
                  
                  return (
                    <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${isDone ? 'bg-emerald-500 border-emerald-100' : 'bg-white border-gray-50'}`}>
                        {isDone ? <CheckCircle2 size={14} className="text-white" /> : <div className="w-2 h-2 rounded-full bg-gray-200" />}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-tighter ${isDone ? 'text-gray-900' : 'text-gray-300'}`}>{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Itemized List */}
            <div className="bg-white rounded-[2.5rem] border border-[#e1e3e5] shadow-sm overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <Package size={18} className="text-emerald-600" />
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-900">Package Contents</h3>
                </div>
                <span className="text-[10px] font-black text-gray-400">{order.items.length} Items</span>
              </div>
              <div className="divide-y divide-gray-50">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="p-8 flex items-center gap-6 hover:bg-gray-50/50 transition-colors">
                    <div className="w-24 h-24 bg-gray-100 rounded-3xl overflow-hidden border border-gray-100 shrink-0">
                      <img src={item.productId?.images?.[0] || '/placeholder.png'} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-gray-900 text-base mb-1">{item.productId?.title || item.name}</h4>
                      <p className="text-[10px] font-black text-emerald-600 uppercase">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-gray-900 text-lg">₹{(item.price * item.quantity).toLocaleString()}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">₹{item.price.toLocaleString()} / Unit</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-[#e1e3e5] shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">Financial Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm font-bold italic">Base Amount</span>
                  <span className="font-black text-gray-900">₹{order.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm font-bold italic">Logistics</span>
                  <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest">Complimentary</span>
                </div>
                <div className="pt-6 border-t-2 border-dashed border-gray-100 flex justify-between items-end">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">Total Paid</span>
                  <span className="text-3xl font-black text-gray-900 tracking-tighter">₹{order.totalAmount.toLocaleString()}</span>
                </div>
              </div>
              <div className={`mt-8 p-4 rounded-2xl text-center text-[10px] font-black uppercase tracking-widest border-2 ${order.paymentStatus === 'paid' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-amber-50 border-amber-100 text-amber-600'}`}>
                Transaction {order.paymentStatus}
              </div>
            </div>

            <div className="bg-[#202223] p-8 rounded-[2.5rem] text-white shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <MapPin size={16} className="text-emerald-400" />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Destination</h3>
              </div>
              <p className="text-xs font-bold leading-relaxed text-gray-300 uppercase italic">
                {order.shippingAddress}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetail;