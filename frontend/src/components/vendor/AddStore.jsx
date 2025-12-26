import React, { useEffect, useState } from 'react';
import { createStore } from '../../redux/actions/StoreAction';
import { useDispatch,useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const AddStore = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {loading,success,error,message}=useSelector((state)=>state.vendorStore);
  useEffect(()=>{
    if(success){
      toast.success(message);
      navigate("/vendor/dashboard");
    }
    else{
      toast.error(message);
    }
  },[loading,error,message]);
  const [frmData, setFrmData] = useState({ storeName: "", description: "", logo: "" });
  
  const handleInput = (e) => {
    setFrmData({ ...frmData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(frmData);
    dispatch(createStore(frmData));
  };

  return (
    <div className="min-h-screen bg-[#f6f6f7] flex items-center justify-center p-4 antialiased">
      <div className="w-full max-w-[550px]">
  
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm border border-[#e1e3e5] mb-4">
            <span className="text-[#008060] font-bold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-[#202223]">Setup your store</h1>
          <p className="text-[#6d7175] mt-1 text-sm">Tell us a bit about your business to get started.</p>
        </div>

        <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)] border border-[#e1e3e5] overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#202223] mb-1.5">
                Store Name
              </label>
              <input
                type="text"
                name="storeName"
                value={frmData.storeName}
                onChange={handleInput}
                placeholder="e.g. Blue Sky Vintage"
                className="w-full h-11 px-4 bg-white border border-[#babfc3] rounded-lg text-sm transition-all focus:outline-none focus:border-[#008060] focus:ring-[3px] focus:ring-[#0080601a] hover:border-[#8c9196]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_80px] gap-4 items-end">
              <div>
                <label className="block text-sm font-semibold text-[#202223] mb-1.5">
                  Logo URL
                </label>
                <input
                  type="text"
                  name="logo"
                  value={frmData.logo}
                  onChange={handleInput}
                  placeholder="https://example.com/logo.png"
                  className="w-full h-11 px-4 bg-white border border-[#babfc3] rounded-lg text-sm transition-all focus:outline-none focus:border-[#008060] focus:ring-[3px] focus:ring-[#0080601a] hover:border-[#8c9196]"
                />
              </div>
              <div className="h-[44px] w-[80px] bg-[#f1f2f3] rounded-lg border-2 border-dashed border-[#dfe3e8] flex items-center justify-center overflow-hidden">
                {frmData.logo ? (
                  <img src={frmData.logo} alt="Preview" className="h-full w-full object-contain p-1" />
                ) : (
                  <span className="text-[10px] text-[#8c9196] font-medium uppercase tracking-wider">Preview</span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#202223] mb-1.5">
                Store Description
              </label>
              <textarea
                name="description"
                rows="4"
                value={frmData.description}
                onChange={handleInput}
                placeholder="Describe what makes your store unique..."
                className="w-full px-4 py-3 bg-white border border-[#babfc3] rounded-lg text-sm transition-all focus:outline-none focus:border-[#008060] focus:ring-[3px] focus:ring-[#0080601a] hover:border-[#8c9196] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#008060] hover:bg-[#006e52] active:scale-[0.98] text-white font-bold rounded-lg shadow-md transition-all duration-200 text-sm flex items-center justify-center gap-2"
            >
              Create Store
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          <div className="bg-[#f9fafb] border-t border-[#e1e3e5] px-8 py-4">
            <p className="text-center text-xs text-[#6d7175]">
              By clicking Create Store, you agree to the 
              <a href="#" className="text-[#008060] font-medium hover:underline ml-1">Terms of Service</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStore;