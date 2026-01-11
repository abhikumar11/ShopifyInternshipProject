import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 

import { 
  Search, Bell, Menu, LayoutDashboard, Box, 
  Store, Layers, ClipboardList, CreditCard, 
  ShieldCheck, ChevronDown, LogOut, Mail
} from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { LOGOUT } from '../../redux/constants';

const AdminHeader = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user } = useSelector((state) => state.userAuth);
    const dispatch=useDispatch();
  const navLinks = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Inventory', icon: Box, path: '/admin/inventory' },
    { label: 'Vendors', icon: Store, path: '/admin/vendors' },
    { label: 'Category', icon: Layers, path: '/admin/categories' },
    { label: 'Orders', icon: ClipboardList, path: '/admin/orders' },
    { label: 'Payments', icon: CreditCard, path: '/admin/payments' },
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40 flex items-center px-4">
      <div className="flex items-center w-full gap-4">

        {}
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu size={20} className="text-gray-600" />
          </button>

          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="bg-[#008060] p-1.5 rounded-lg text-white">
              <ShieldCheck size={20} />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-black text-gray-900 text-sm uppercase">Nexus</span>
              <span className="text-[9px] font-bold text-[#008060] uppercase tracking-widest">Admin</span>
            </div>
          </Link>
        </div>

        {}
        <nav className="hidden md:flex items-center gap-1 border-l border-gray-100 ml-2 pl-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              className={({ isActive }) => `
                flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-bold transition-all whitespace-nowrap
                ${isActive ? 'bg-[#f1f8f5] text-[#008060]' : 'text-gray-600 hover:text-gray-900'}
              `}
            >
              <link.icon size={16} />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {}
        <div className="ml-auto flex items-center gap-2 shrink-0" ref={dropdownRef}>
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-1 pl-2 rounded-lg border border-gray-100 hover:bg-gray-50"
            >
              {}
              <span className="hidden lg:block text-xs font-bold text-gray-700 mr-1">
                {user?.name?.split(' ')[0] || 'Admin'}
              </span>
              <div className="w-8 h-8 rounded-md bg-gray-900 flex items-center justify-center text-white text-xs font-black">
                {}
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2">
                <div className="px-4 py-3 border-b border-gray-100">
                   {}
                   <p className="text-sm font-bold text-gray-900">{user?.name || "Nexus Admin"}</p>
                   <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1">
                      <Mail size={12} />
                      <span className="truncate">{user?.emailid || "admin@nexus.com"}</span>
                   </div>
                </div>
                <div className="p-2">
                  <button onClick={() => dispatch({ type:LOGOUT})} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 font-bold hover:bg-red-50 rounded-lg">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;