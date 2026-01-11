import React from 'react';
import { CheckCircle2, Eye, LayoutDashboard, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuccessModal = ({ isOpen, productId, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 antialiased">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#202223]/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all">
        <div className="p-8 text-center">
          {/* Success Icon Animation Wrapper */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#f1f8f5] rounded-full mb-6">
            <CheckCircle2 size={40} className="text-[#008060]" />
          </div>

          <h2 className="text-2xl font-extrabold text-[#202223] mb-2">Product Published!</h2>
          <p className="text-[#6d7175] text-sm mb-8 leading-relaxed">
            Your product is now live and visible to customers on the Nexus storefront. 
            Would you like to view it now?
          </p>

          <div className="space-y-3">
            {/* Primary Action: View Live */}
            <button 
              onClick={() => navigate(`/product/${productId}`)}
              className="w-full bg-[#008060] hover:bg-[#006e52] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#008060]/20"
            >
              <Eye size={18} /> View on Storefront
            </button>

            {/* Secondary Action: Back to Dashboard */}
            <button 
              onClick={() => navigate('/vendor/dashboard')}
              className="w-full bg-white border border-[#e1e3e5] text-[#202223] py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#f6f6f7] transition-all"
            >
              <LayoutDashboard size={18} /> Back to Dashboard
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <button 
          onClick={onClose}
          className="w-full py-4 bg-[#f9fafb] border-t border-[#e1e3e5] text-xs font-bold text-[#6d7175] uppercase tracking-widest hover:text-[#202223] transition-colors"
        >
          Close & Edit More
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;