import React, { useEffect, useState } from 'react';
import { createStore } from '../../redux/actions/StoreAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Store, ArrowRight, Loader2, Upload, Layout, Info, X } from 'lucide-react';

const AddStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error, message } = useSelector((state) => state.vendorStore);

  const [frmData, setFrmData] = useState({ storeName: "", description: "" });
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  

  const [logoPreview, setLogoPreview] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");

  useEffect(() => {
    if (success) {
      toast.success(message || "Store created successfully!");
      navigate("/vendor/dashboard");
    }
    if (error && message) {
      toast.error(message);
    }
    return () => dispatch({ type: "RESET_STORE_STATE" });
  }, [success, error, message, navigate, dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (file) {
      //const reader = new URLSearchParams();
      const objectUrl = URL.createObjectURL(file);
      
      if (name === "logo") {
        setLogoFile(file);
        setLogoPreview(objectUrl);
      } else {
        setBannerFile(file);
        setBannerPreview(objectUrl);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!frmData.storeName || !frmData.description) {
      return toast.warn("Store name and description are required.");
    }

    // Create FormData for Multi-part upload
    const myForm = new FormData();
    myForm.append("storeName", frmData.storeName);
    myForm.append("description", frmData.description);
    if (logoFile) myForm.append("logo", logoFile);
    if (bannerFile) myForm.append("banner", bannerFile);

    dispatch(createStore(myForm));
  };

  return (
    <div className="min-h-screen bg-[#f1f2f4] py-12 px-4 antialiased font-sans">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl"><Store size={24} /></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Create Store</h1>
                <p className="text-sm text-gray-500">Upload your brand assets and details.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Store Name *</label>
                <input
                  name="storeName"
                  required
                  value={frmData.storeName}
                  onChange={(e) => setFrmData({...frmData, storeName: e.target.value})}
                  className="w-full h-11 px-4 border border-gray-300 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>

              {/* File Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Store Logo</label>
                  <div className="relative h-32 w-full border-2 border-dashed border-gray-200 rounded-xl hover:border-emerald-400 transition-colors flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
                    {logoPreview ? (
                        <img src={logoPreview} className="h-full w-full object-contain" alt="preview" />
                    ) : (
                        <>
                            <Upload className="text-gray-400 mb-2" size={20} />
                            <span className="text-xs text-gray-500">Click to upload Logo</span>
                        </>
                    )}
                    <input type="file" name="logo" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>

                {/* Banner Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Store Banner</label>
                  <div className="relative h-32 w-full border-2 border-dashed border-gray-200 rounded-xl hover:border-emerald-400 transition-colors flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
                    {bannerPreview ? (
                        <img src={bannerPreview} className="h-full w-full object-cover" alt="preview" />
                    ) : (
                        <>
                            <Layout className="text-gray-400 mb-2" size={20} />
                            <span className="text-xs text-gray-500">Click to upload Banner</span>
                        </>
                    )}
                    <input type="file" name="banner" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Info size={16} /> Description *</label>
                <textarea
                  name="description"
                  rows="3"
                  required
                  value={frmData.description}
                  onChange={(e) => setFrmData({...frmData, description: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:border-emerald-600 outline-none resize-none"
                />
              </div>

              <button  type="submit" disabled={loading} className="w-full h-12 bg-[#008060] hover:bg-[#006e52] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin" /> : <>Create Store <ArrowRight size={18}/></>}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Preview (Logic remains similar to previous version) */}
        <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-4">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">Brand Preview</h2>
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-white">
                    <div className="h-32 bg-gray-200 relative">
                        {bannerPreview && <img src={bannerPreview} className="w-full h-full object-cover" alt="banner" />}
                        <div className="absolute -bottom-6 left-6 w-20 h-20 bg-white rounded-2xl shadow-lg border-4 border-white overflow-hidden flex items-center justify-center">
                            {logoPreview ? <img src={logoPreview} className="h-full w-full object-contain" alt="logo" /> : <Store className="text-gray-200" />}
                        </div>
                    </div>
                    <div className="pt-10 pb-8 px-6">
                        <h3 className="text-xl font-bold text-gray-900 truncate">{frmData.storeName || "Store Name"}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mt-2">{frmData.description || "Brand description..."}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddStore;