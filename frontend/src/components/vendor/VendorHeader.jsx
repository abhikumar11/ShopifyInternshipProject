import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { loadStore } from "../../redux/actions/StoreAction";
import { 
  StoreIcon, 
  PlusIcon, 
  UserCircleIcon, 
  LayoutDashboard, 
  Package, 
  LogOut, 
  ChevronDown,
  ShoppingBag 

} from "lucide-react";

const VendorHeader = () => {
  const { loading, store } = useSelector((state) => state.vendorStore);
  const { user } = useSelector((state) => state.userAuth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(loadStore());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <Link to="/vendor" className="flex items-center gap-2">
          <div className="p-2 bg-[#008060] rounded text-white"><StoreIcon size={20} /></div>
          <span className="font-bold text-gray-900 hidden sm:block">Vendor Central</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link 
            to="/vendor/dashboard" 
            className={`px-2 py-1 transition-colors ${isActive('dashboard') ? 'text-[#008060]' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Dashboard
          </Link>

          {}
          {store && (
            <>
              <Link 
                to="/vendor/inventory" 
                className={`px-2 py-1 transition-colors ${isActive('inventory') ? 'text-[#008060]' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Inventory
              </Link>

              {}
              <Link 
                to="/vendor/orders" 
                className={`px-2 py-1 flex items-center gap-1 transition-colors ${isActive('orders') ? 'text-[#008060]' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Orders
              </Link>
            </>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {}
        {!loading && !store && (
          <Link 
            to="/vendor/newstore" 
            onClick={() => dispatch({ type: "RESET_STORE_STATE" })}
            className="flex items-center gap-2 bg-[#008060] text-white px-4 py-2 rounded-lg text-sm font-bold transition-all hover:bg-[#006e52]"
          >
            <PlusIcon size={18} /> Create Store
          </Link>
        )}

        {}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded-full border border-transparent hover:border-gray-200 transition-all focus:outline-none"
          >
            <UserCircleIcon className="w-8 h-8 text-gray-400" />
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <>
              {}
              <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)}></div>

              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-[100] overflow-hidden animate-in fade-in zoom-in duration-100 origin-top-right">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <p className="text-sm font-bold text-gray-900">{user?.name || "Vendor"}</p>
                  <p className="text-[10px] text-gray-500 truncate uppercase font-medium tracking-tight">
                    {user?.emailid || "vendor@nexus.com"}
                  </p>
                </div>

                {}
                <div className="p-1">
                  <button 
                    onClick={handleLogout} 
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-lg font-bold"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;