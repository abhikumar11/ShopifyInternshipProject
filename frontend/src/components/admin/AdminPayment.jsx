import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  IndianRupeeIcon, ArrowUpRight, Search, Download, 
  CheckCircle2, Clock, XCircle, Loader2, Package 
} from 'lucide-react';
import { clearErrors, getPaymentLedger } from '../../redux/actions/PaymentActions';

const AdminPayments = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Destructure from the 'orderPayments' state slice
  const { payments, loading, error } = useSelector((state) => state.orderPayments);

  useEffect(() => {
    dispatch(getPaymentLedger());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  // Calculations based on the specific 'payments' array format
  const totalVolume = payments?.reduce((acc, curr) => acc + (curr.amount || 0), 0) || 0;
  const platformComm = totalVolume * 0.10; 
  const pendingCount = payments?.filter(p => p.status === 'pending').length || 0;

  // Filtering using the exact keys from your data object
  const filteredPayments = payments?.filter(p => 
    p.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.customer?.emailid?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f6f6f7] p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#202223] uppercase tracking-tighter">Payments</h1>
            <p className="text-sm text-[#6d7175] font-medium">Reconciled financial data from the Order Management System.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-[#e1e3e5] rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 shadow-sm transition-all">
            <Download size={14} /> Export CSV
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Gross Volume', value: `₹${totalVolume.toLocaleString()}`, color: 'text-blue-600', bg: 'bg-blue-50', icon: IndianRupeeIcon },
            { label: 'Platform Fee (10%)', value: `₹${platformComm.toLocaleString()}`, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: ArrowUpRight },
            { label: 'Pending Payouts', value: pendingCount, color: 'text-orange-600', bg: 'bg-orange-50', icon: Clock }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-7 rounded-[2rem] border border-[#e1e3e5] shadow-sm">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon size={24} />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <h2 className="text-3xl font-black text-[#202223] mt-1">{stat.value}</h2>
            </div>
          ))}
        </div>

        {/* Search & Table */}
        <div className="bg-white rounded-[2.5rem] border border-[#e1e3e5] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between bg-gray-50/30">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Transaction Trail</h3>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search TxID or Customer Name..." 
                className="w-full pl-12 pr-5 py-3 bg-white border border-gray-200 rounded-2xl text-xs font-bold outline-none focus:border-[#008060] transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-20 flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-[#008060] mb-3" size={32} />
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Loading Ledger...</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f9fafb] border-b border-[#e1e3e5]">
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Reference</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Fulfillment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredPayments?.map((txn) => (
                    <tr key={txn._id} className="hover:bg-[#fcfcfd] transition-colors">
                      <td className="px-8 py-6">
                        <p className="text-xs font-black text-[#202223] uppercase">#{txn.transactionId?.slice(-10)}</p>
                        <p className="text-[10px] text-gray-400 font-bold mt-1">{new Date(txn.date).toLocaleDateString('en-GB')}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-xs font-bold text-gray-800">{txn.customer?.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{txn.customer?.emailid}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-black text-[#202223]">₹{txn.amount.toLocaleString()}</p>
                        <p className="text-[9px] font-bold text-emerald-600">Fee: ₹{(txn.amount * 0.1).toFixed(0)}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          txn.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                          txn.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-red-50 text-red-700 border-red-100'
                        }`}>
                          {txn.status === 'paid' ? <CheckCircle2 size={10} /> : txn.status === 'pending' ? <Clock size={10} /> : <XCircle size={10} />}
                          {txn.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-500 text-[9px] font-black uppercase tracking-tighter">
                          <Package size={10} /> {txn.fulfillment}
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
    </div>
  );
};

export default AdminPayments;