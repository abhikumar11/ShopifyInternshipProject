import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ShoppingBag, Search, UserCircle, Menu, X, 
  ChevronDown, LogOut, Package, Settings, User,
  Layers, Flame, Zap, Percent, LogIn
} from 'lucide-react';
import { LOGOUT } from '../redux/constants';
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get Auth State
  const { user, token } = useSelector((state) => state.userAuth);
  const { cartItems } = useSelector((state) => state.cart);
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    setIsUserDropdownOpen(false);
    navigate('/login');
  };

  const categories = [
    { name: "All Departments", icon: <Layers size={14} />, path: "/products" },
    { name: "Best Sellers", icon: <Flame size={14} />, path: "/collections/best-sellers" },
    { name: "New Arrivals", icon: <Zap size={14} />, path: "/collections/new" },
    { name: "Deals", icon: <Percent size={14} />, path: "/deals" },
    { name: "Electronics", path: "/category/electronics" },
    { name: "Fashion", path: "/category/fashion" },
    { name: "Home & Garden", path: "/category/home" },
    { name: "Beauty", path: "/category/beauty" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-[100] w-full bg-white border-b border-[#e1e3e5] antialiased shadow-sm">
      {/* Announcement Bar */}
      <div className="bg-[#202223] text-white text-[11px] font-bold tracking-[0.15em] py-2 text-center uppercase">
        Free shipping on all orders over ₹999
      </div>

      {/* Main Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
        <div className="flex items-center gap-4 shrink-0">
          <button className="lg:hidden p-2 hover:bg-[#f1f2f3] rounded-md" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6 text-[#202223]" />
          </button>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#008060] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl italic">N</span>
            </div>
            <span className="text-xl font-black text-[#202223] tracking-tighter hidden sm:block">NEXUS</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl relative group">
          <input type="text" placeholder="Search products..." className="w-full bg-[#f1f2f3] border-2 border-transparent focus:border-[#008060] focus:bg-white rounded-full py-2 pl-10 pr-4 text-sm outline-none transition-all" />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#6d7175]" />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          
          {/* Conditional User Section */}
          {token && user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="flex items-center gap-1 p-2 hover:bg-[#f1f2f3] rounded-lg transition-all">
                <div className="w-7 h-7 bg-[#008060] rounded-full flex items-center justify-center text-white text-[10px] font-bold uppercase">
                  {user.name?.charAt(0)}
                </div>
                <ChevronDown className={`w-4 h-4 text-[#6d7175] transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#e1e3e5] rounded-xl shadow-xl py-2 animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-2 border-b border-[#e1e3e5] mb-1">
                    <p className="text-xs text-[#6d7175] font-medium">Signed in as</p>
                    <p className="text-sm font-bold text-[#202223] truncate">{user.name}</p>
                  </div>
                  <Link to="/account" className="flex items-center gap-3 px-4 py-2 text-sm text-[#202223] hover:bg-[#f1f2f3]"><User size={16} /> Profile</Link>
                  <Link to="/order/myorder" className="flex items-center gap-3 px-4 py-2 text-sm text-[#202223] hover:bg-[#f1f2f3]"><Package size={16} /> Orders</Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t mt-2 pt-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 px-4 py-2 bg-[#f1f2f3] hover:bg-[#e1e3e5] text-[#202223] rounded-full transition-all text-sm font-bold">
              <LogIn size={16} />
              <span>Login</span>
            </Link>
          )}

          <Link to="/cart" className="group flex items-center gap-2 p-2 hover:bg-[#f1f2f3] rounded-lg transition-all relative">
            <div className="relative">
              <ShoppingBag className="w-6 h-6 text-[#202223] group-hover:text-[#008060]" />
              {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-[#008060] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">{cartCount}</span>}
            </div>
            <span className="hidden lg:block text-sm font-bold text-[#202223]">Cart</span>
          </Link>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="bg-[#f8f9fa] border-t border-[#e1e3e5] overflow-x-auto no-scrollbar">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <nav className="flex items-center h-10 gap-6 whitespace-nowrap">
            {categories.map((cat, index) => (
              <Link
                key={index}
                to={cat.path}
                className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors
                  ${index === 0 ? 'text-[#008060]' : 'text-[#6d7175] hover:text-[#202223]'}
                `}
              >
                {cat.icon && cat.icon}
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;