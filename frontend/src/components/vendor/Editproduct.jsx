import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft, Save, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
// Import your actual actions here
// import { getProductDetails, updateProduct } from '../../redux/actions/productActions';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux State (Adjust based on your actual store structure)
  const { product, loading, isUpdated, error } = useSelector((state) => state.productDetails || {});

  const [frmData, setFrmData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    images: ""
  });

  // 1. Fetch Product Data on Mount
  useEffect(() => {
    // If you don't have the product or the ID changed, fetch it
    // dispatch(getProductDetails(id));

    // Mocking the fetch for now
    if (id) {
      setFrmData({
        name: "Minimalist Nordic Desk Lamp",
        price: "129.99",
        description: "High quality steel frame with matte finish.",
        category: "Lighting",
        stock: "45",
        images: "https://images.unsplash.com/photo-1534073828943-f801091bb18c"
      });
    }
  }, [dispatch, id]);

  // 2. Handle Update Success
  useEffect(() => {
    if (error) {
      toast.error(error);
      // dispatch({ type: CLEAR_ERRORS });
    }
    if (isUpdated) {
      toast.success("Product updated successfully");
      navigate("/vendor/products");
      // dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [error, isUpdated, navigate]);

  const handleInput = (e) => {
    setFrmData({ ...frmData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateProduct(id, frmData));
    toast.success("Changes saved!");
    navigate("/vendor/products");
  };

  return (
    <div className="min-h-screen bg-[#f6f6f7] p-4 sm:p-8 antialiased">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation & Header */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm font-semibold text-[#6d7175] hover:text-[#202223] mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Products
        </button>

        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#202223]">Edit Product</h1>
            <p className="text-sm text-[#6d7175] mt-1">Product ID: <span className="font-mono">{id}</span></p>
          </div>
          <button className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Delete Product">
            <Trash2 size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Info Card */}
          <div className="bg-white p-6 rounded-xl border border-[#e1e3e5] shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Product Title</label>
              <input 
                type="text" name="name" value={frmData.name} onChange={handleInput}
                className="w-full h-11 px-4 border border-[#babfc3] rounded-lg focus:border-[#008060] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Description</label>
              <textarea 
                name="description" rows="5" value={frmData.description} onChange={handleInput}
                className="w-full p-4 border border-[#babfc3] rounded-lg focus:border-[#008060] outline-none transition-all resize-none"
              ></textarea>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#e1e3e5] shadow-sm">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Price ($)</label>
              <input 
                type="number" name="price" value={frmData.price} onChange={handleInput}
                className="w-full h-11 px-4 border border-[#babfc3] rounded-lg focus:border-[#008060] outline-none"
              />
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#e1e3e5] shadow-sm">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Stock Quantity</label>
              <input 
                type="number" name="stock" value={frmData.stock} onChange={handleInput}
                className="w-full h-11 px-4 border border-[#babfc3] rounded-lg focus:border-[#008060] outline-none"
              />
            </div>
          </div>

          {/* Image Selection (Simplified) */}
          <div className="bg-white p-6 rounded-xl border border-[#e1e3e5] shadow-sm">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Product Image</label>
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50">
                {frmData.images ? (
                  <img src={frmData.images} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="text-gray-300" size={32} />
                )}
              </div>
              <div className="flex-1">
                <input 
                  type="text" name="images" value={frmData.images} onChange={handleInput}
                  placeholder="Image URL"
                  className="w-full h-11 px-4 border border-[#babfc3] rounded-lg focus:border-[#008060] outline-none text-sm"
                />
                <p className="text-[10px] text-gray-400 mt-2 font-medium">Recommended: Square image (1000x1000px)</p>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
            <button 
              type="button" onClick={() => navigate(-1)}
              className="px-6 py-2.5 rounded-lg border border-[#babfc3] text-sm font-bold text-[#202223] hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-[#008060] text-white text-sm font-bold hover:bg-[#006e52] shadow-md flex items-center gap-2 transition-all disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;