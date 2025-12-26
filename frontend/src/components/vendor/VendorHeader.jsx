import {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useLocation,Link} from "react-router-dom";
import { loadStore } from "../../redux/actions/StoreAction";
import {StoreIcon,PlusIcon,UserCircleIcon} from "lucide-react";
const VendorHeader = () => {
  const { loading, store } = useSelector((state) => state.vendorStore);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
   
    if (!store) {
      dispatch(loadStore());
    }
  }, [dispatch, store]);

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
        
          {store?.status === "approved" && (
            <Link 
              to="/vendor/addproduct" 
              className="px-3 py-2 rounded-md hover:bg-[#f1f2f3] hover:text-[#202223] transition-colors"
            >
              Inventory
            </Link>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        
        {!store && !loading && (
          <Link 
            to="/vendor/newstore"
            className="flex items-center gap-2 bg-[#008060] hover:bg-[#006e52] text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-all active:scale-95"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="hidden xs:block">Create Store</span>
          </Link>
        )}

        {store && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
               <p className={`text-[10px] uppercase font-bold tracking-wider ${
                 store.status === "approved" ? "text-green-600" : 
                 store.status === "rejected" ? "text-red-600" : "text-orange-500"
               }`}>
                 {store.status}
               </p>
            </div>
            <div className="w-[1px] h-6 bg-[#e1e3e5] mx-1"></div>
          </div>
        )}

        <button className="flex items-center gap-2 p-1 pl-2 hover:bg-[#f1f2f3] rounded-full transition-colors border border-transparent hover:border-[#e1e3e5]">
          <span className="text-sm font-medium text-[#202223] hidden lg:block">
            {loading ? "Loading..." : store?.storeName || "Vendor Account"}
          </span>
          <UserCircleIcon className="w-8 h-8 text-[#babfc3]" />
        </button>
      </div>
    </header>
  );
};
export default VendorHeader;