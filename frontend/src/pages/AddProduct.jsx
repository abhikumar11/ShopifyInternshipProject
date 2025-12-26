import React, { useState, useRef } from 'react';
import { 
  Package, UploadCloud, X, Plus, Trash2, Save, 
  Layers, Image as ImageIcon, Info, ChevronLeft, Eye, Store, Activity
} from 'lucide-react';

const AddProduct = () => {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  
  // Example Store Data (In real app, get this from Redux state.vendorStore.store)
  const storeId = "STR-8829-X1"; 

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    status: "active", // Default status
    variants: [{ size: "", color: "", sku: "", stock: 0 }]
  });

  // --- LOGIC ---
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...productData.variants];
    updatedVariants[index] = { ...updatedVariants[index], [name]: value };
    setProductData({ ...productData, variants: updatedVariants });
  };

  const addVariant = () => {
    setProductData({
      ...productData,
      variants: [...productData.variants, { size: "", color: "", sku: "", stock: 0 }]
    });
  };

  const removeVariant = (index) => {
    const filtered = productData.variants.filter((_, i) => i !== index);
    setProductData({ ...productData, variants: filtered });
  };

  const handleImageBrowse = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => ({ file, url: URL.createObjectURL(file) }));
    setImages([...images, ...newPreviews]);
  };

  return (
    <div className="bg-[#f6f6f7] min-h-screen pb-20 font-sans">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">New Product</h1>
          </div>
          <button className="px-6 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-sm font-bold rounded-lg shadow-sm transition active:scale-95 flex items-center gap-2">
            <Save size={18} /> Save Product
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="font-bold text-gray-800">Basic Details</h2>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Title</label>
              <input name="title" onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#008060] outline-none transition-all" placeholder="e.g. Premium Health Kit" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Description</label>
              <textarea name="description" rows="4" onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#008060] outline-none transition-all" placeholder="Tell customers about your product..." />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><ImageIcon size={18}/> Media</h2>
            <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-gray-200 rounded-xl py-8 flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer transition">
              <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleImageBrowse} />
              <UploadCloud size={32} className="text-gray-300 mb-2" />
              <p className="text-sm font-medium text-gray-600">Add Images</p>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {images.map((img, i) => (
                <div key={i} className="relative w-24 h-24 rounded-lg border overflow-hidden group">
                  <img src={img.url} className="w-full h-full object-cover" alt="" />
                  <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition"><X size={12} className="text-red-500"/></button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="font-bold text-gray-800 flex items-center gap-2"><Layers size={18}/> Variants</h2>
              <button type="button" onClick={addVariant} className="text-sm font-bold text-[#008060] hover:bg-[#008060]/10 px-3 py-1.5 rounded-lg transition">+ Add</button>
            </div>
            <div className="p-6 space-y-4">
              {productData.variants.map((variant, index) => (
                <div key={index} className="flex flex-wrap md:flex-nowrap gap-4 items-end p-4 bg-gray-50 rounded-xl border border-gray-100 relative group">
                  <div className="flex-1 min-w-[120px]">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Size</label>
                    <input name="size" value={variant.size} onChange={(e) => handleVariantChange(index, e)} className="w-full bg-white border border-gray-200 p-2 rounded-md text-sm focus:border-[#008060] outline-none" />
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Color</label>
                    <input name="color" value={variant.color} onChange={(e) => handleVariantChange(index, e)} className="w-full bg-white border border-gray-200 p-2 rounded-md text-sm focus:border-[#008060] outline-none" />
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Stock</label>
                    <input name="stock" type="number" value={variant.stock} onChange={(e) => handleVariantChange(index, e)} className="w-full bg-white border border-gray-200 p-2 rounded-md text-sm focus:border-[#008060] outline-none" />
                  </div>
                  <button type="button" onClick={() => removeVariant(index)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className="space-y-6">
          
          {/* Store Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Store size={18} className="text-[#008060]"/> Store Information</h2>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Active Store ID</p>
              <p className="font-mono text-sm text-gray-700 font-bold">{storeId}</p>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Activity size={18} className="text-blue-500"/> Product Status</h2>
            <select 
              name="status" 
              value={productData.status} 
              onChange={handleChange}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#008060] text-sm font-semibold text-gray-700"
            >
              <option value="active">Active (Visible)</option>
              <option value="inactive">Inactive (Hidden)</option>
              <option value="blocked">Blocked</option>
            </select>
            <p className="text-[10px] text-gray-400 mt-2 px-1 italic">Determines if customers can see this product in the shop.</p>
          </div>

          {/* Pricing & Org Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="font-bold text-gray-800 mb-2">Organization</h2>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Base Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">₹</span>
                <input name="price" type="number" onChange={handleChange} className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#008060]" placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
              <select name="categoryId" onChange={handleChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#008060] text-sm">
                <option value="">Select Category</option>
                <option value="meds">Medicines</option>
                <option value="wellness">Wellness</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;