import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlusIcon, StoreIcon, BellIcon, UserCircleIcon } from "lucide-react"; 

const VendorHeader = () => {
  const location = useLocation();
    const isActive=false;
  return (
    <header className="h-16 bg-white border-b border-[#e1e3e5] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50">
    
      <div className="flex items-center gap-6">
        <Link to="/vendor" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#008060] rounded flex items-center justify-center">
            <StoreIcon className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-[#202223] hidden sm:block">Vendor Central</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-[#6d7175]">
          <Link 
            to="/vendor/dashboard" 
            className={`px-3 py-2 rounded-md hover:bg-[#f1f2f3] hover:text-[#202223] transition-colors ${location.pathname === '/vendor/dashboard' ? 'bg-[#f1f2f3] text-[#202223]' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/vendor/inventory" 
            className="px-3 py-2 rounded-md hover:bg-[#f1f2f3] hover:text-[#202223] transition-colors"
          >
            Inventory
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <Link 
          to="/vendor/newstore"
          className="flex items-center gap-2 bg-[#008060] hover:bg-[#006e52] text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-all active:scale-95"
        >
          <PlusIcon className="w-4 h-4" />
          <span className="hidden xs:block">Create Store</span>
        </Link>
        <div className="w-[1px] h-6 bg-[#e1e3e5] mx-1"></div>

            <p className={`p-2 transition-colors relative ${isActive?"text-green-700":"text-red-500"}`}>{isActive?"Active":"In Active"}</p>
        <button className="flex items-center gap-2 p-1 pl-2 hover:bg-[#f1f2f3] rounded-full transition-colors border border-transparent hover:border-[#e1e3e5]">
          <span className="text-sm font-medium text-[#202223] hidden lg:block">Vendor Name</span>
          <UserCircleIcon className="w-8 h-8 text-[#babfc3]" />
        </button>
      </div>
    </header>
  );
};

export default VendorHeader;