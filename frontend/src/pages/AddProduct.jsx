import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, X, Plus, Trash2, Save, 
  Layers, Image as ImageIcon, ArrowLeft, 
  Tag, ChevronDown, Info, Package, Loader2,
  BarChart3 

} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal';
import { getCategories } from '../redux/actions/CategoryActions';
import { createProduct } from '../redux/actions/ProductAction';
import { NEW_PRODUCT_RESET } from '../redux/constants';

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const { categories, loading: catLoading } = useSelector((state) => state.allCategories);
  const { store } = useSelector((state) => state.vendorStore);
  const { loading: isSaving, success, error, product } = useSelector((state) => state.newProduct);

  const [images, setImages] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "", 

    categoryId: "",
    status: "active",
    variants: [{ size: "", color: "", sku: "", stock: 0 }]
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (error) alert(error);
    if (success) setShowSuccess(true);
  }, [success, error]);

  const handleCloseModal = () => {
    setShowSuccess(false);
    dispatch({ type: NEW_PRODUCT_RESET });
    navigate('/vendor/inventory');
  };

  const handleChange = (e) => setProductData({ ...productData, [e.target.name]: e.target.value });

  const handleImageBrowse = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => ({ file, url: URL.createObjectURL(file) }));
    setImages([...images, ...newPreviews]);
  };

  const removeImage = (index) => setImages(images.filter((_, i) => i !== index));

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...productData.variants];
    updatedVariants[index] = { ...updatedVariants[index], [name]: value };
    setProductData({ ...productData, variants: updatedVariants });
  };

  const addVariant = () => setProductData({ ...productData, variants: [...productData.variants, { size: "", color: "", sku: "", stock: 0 }] });
  const removeVariant = (index) => setProductData({ ...productData, variants: productData.variants.filter((_, i) => i !== index) });

  const handleSave = () => {
    if (!productData.title || !productData.price || !productData.categoryId) {
      return alert("Required: Title, Price, and Category");
    }
    const formData = new FormData();
    formData.append("storeId", store?._id);
    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("stock", productData.stock); 

    formData.append("categoryId", productData.categoryId);
    formData.append("status", productData.status);
    formData.append("variants", JSON.stringify(productData.variants));
    images.forEach(img => formData.append("images", img.file));

    dispatch(createProduct(formData));
  };

  return (
    <div className="bg-[#f6f6f7] min-h-screen pb-20 antialiased">
      <SuccessModal isOpen={showSuccess} onClose={handleCloseModal} productId={product?._id || "N/A"} />

      {}
      <div className="sticky top-0 z-40 bg-white border-b border-[#e1e3e5] px-4 md:px-8 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><ArrowLeft size={20} /></button>
            <div>
              <h1 className="text-xl font-bold text-[#202223]">Add Product</h1>
              <p className="text-[10px] font-bold text-[#008060] uppercase tracking-widest">{store?.storeName || "Vendor Panel"}</p>
            </div>
          </div>
          <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-sm font-bold rounded-lg shadow-md flex items-center gap-2 disabled:opacity-50">
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSaving ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {}
          <div className="bg-white rounded-xl border border-[#e1e3e5] p-6 space-y-5 shadow-sm">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Product Title *</label>
              <input name="title" onChange={handleChange} className="w-full px-4 py-3 border border-[#e1e3e5] rounded-lg focus:ring-2 focus:ring-[#008060] outline-none" placeholder="e.g. Minimalist Watch" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Description</label>
              <textarea name="description" rows="5" onChange={handleChange} className="w-full px-4 py-3 border border-[#e1e3e5] rounded-lg focus:ring-2 focus:ring-[#008060] outline-none text-sm" placeholder="Tell customers about your product..." />
            </div>
          </div>

          {}
          <div className="bg-white rounded-xl border border-[#e1e3e5] p-6 shadow-sm">
            <h2 className="font-bold text-[#202223] mb-4 flex items-center gap-2"><ImageIcon size={18}/> Media</h2>
            <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-[#e1e3e5] rounded-xl py-10 flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer group">
              <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleImageBrowse} accept="image/*" />
              <UploadCloud size={30} className="text-[#008060] group-hover:scale-110 transition-transform" />
              <p className="text-sm font-semibold mt-2">Add Images</p>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              {images.map((img, i) => (
                <div key={i} className="relative w-24 h-24 rounded-lg border overflow-hidden group">
                  <img src={img.url} className="w-full h-full object-cover" alt="preview" />
                  <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-white p-1 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition shadow-sm"><X size={12} /></button>
                </div>
              ))}
            </div>
          </div>

          {}
          <div className="bg-white rounded-xl border border-[#e1e3e5] shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <h2 className="font-bold text-[#202223] flex items-center gap-2"><Layers size={18}/> Variants & Inventory</h2>
              <button onClick={addVariant} className="text-xs font-bold text-[#008060] hover:underline">+ Add Variant</button>
            </div>
            <div className="p-6 space-y-4">
              {productData.variants.map((variant, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Size</label>
                    <input name="size" placeholder="e.g. XL" onChange={(e) => handleVariantChange(index, e)} className="w-full bg-white border p-2 rounded-lg text-sm outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Color</label>
                    <input name="color" placeholder="e.g. Red" onChange={(e) => handleVariantChange(index, e)} className="w-full bg-white border p-2 rounded-lg text-sm outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Variant Stock</label>
                    <input name="stock" type="number" placeholder="0" onChange={(e) => handleVariantChange(index, e)} className="w-full bg-white border p-2 rounded-lg text-sm outline-none" />
                  </div>
                  <div className="flex items-center justify-between">
                    <button onClick={() => removeVariant(index)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-[#e1e3e5] p-6 shadow-sm">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase mb-4 tracking-widest flex items-center gap-2">
              <Tag size={14} /> Organization
            </h3>
            <div className="relative">
              <select name="categoryId" value={productData.categoryId} onChange={handleChange} className="w-full appearance-none p-3 bg-gray-50 border border-[#e1e3e5] rounded-lg text-sm font-semibold outline-none focus:ring-2 focus:ring-[#008060]">
                <option value="">{catLoading ? "Loading..." : "Select Category *"}</option>
                {categories?.map((cat) => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {}
          <div className="bg-white rounded-xl border border-[#e1e3e5] p-6 shadow-sm">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase mb-3 tracking-widest flex items-center gap-2">
              <BarChart3 size={14} /> Inventory Detail
            </h3>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Total Available Stock</label>
              <input name="stock" type="number" onChange={handleChange} className="w-full p-3 bg-gray-50 border border-[#e1e3e5] rounded-lg font-bold outline-none focus:ring-2 focus:ring-[#008060]" placeholder="0" />
              <p className="text-[9px] text-gray-400 mt-2">Set the total quantity for simple products or the base stock.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#e1e3e5] p-6 shadow-sm">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase mb-3 tracking-widest">Pricing *</h3>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
              <input name="price" type="number" onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-[#e1e3e5] rounded-lg font-bold outline-none focus:ring-2 focus:ring-[#008060]" placeholder="0.00" />
            </div>
          </div>

          <div className="bg-[#202223] rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 text-[#008060]">
                <Info size={16} />
                <h4 className="font-bold text-sm">Merchant Tip</h4>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Keeping accurate stock levels prevents order cancellations and improves merchant ratings.
              </p>
            </div>
            <Package size={80} className="absolute -right-5 -bottom-5 text-white/5 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;