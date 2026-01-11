import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css'; 

import { getProductDetails } from "../redux/actions/ProductAction"; 
import { addToCart } from "../redux/actions/CartAction"; 
import { 
  Star, Truck, ShoppingBag, AlertCircle, 
  ChevronRight, Share2, CheckCircle2 
} from 'lucide-react';
import ProductGrid from './ProductGrid';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.singleProduct);
  const { products: allProducts } = useSelector((state) => state.allProducts);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    dispatch(getProductDetails(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product?.variants?.length > 0 && !selectedVariant) {
      toast.error("Please select an option first!", { position: "bottom-center" });
      return;
    }

    dispatch(addToCart(id, quantity, selectedVariant));

    toast.success(
      <div className="flex flex-col gap-1">
        <span className="font-bold">Added to Cart!</span>
        <Link to="/cart" className="text-xs font-black underline uppercase mt-1">View Cart</Link>
      </div>, 
      {
        position: "top-right",
        autoClose: 3000,
        icon: <CheckCircle2 className="text-[#008060]" />
      }
    );
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#008060]"></div>
    </div>
  );

  return (
    <div className="bg-[#f8f9fa] min-h-screen antialiased text-[#0F1111] pb-20 relative">
      {}
    

      <div className="bg-white border-b border-gray-200 py-2.5">
        <div className="max-w-[1500px] mx-auto px-4 lg:px-10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-gray-500">
            <Link to="/" className="hover:text-[#008060]">Store</Link>
            <ChevronRight size={12} />
            <span className="text-[#008060] font-bold truncate max-w-[200px]">{product?.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 lg:px-10 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {}
          <div className="lg:col-span-5">
             <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <img src={product?.images?.[selectedImage]} className="w-full h-auto max-h-[500px] object-contain mx-auto" alt="product" />
                <div className="flex gap-3 mt-6 justify-center">
                  {product?.images?.map((img, idx) => (
                    <button 
                      key={idx}
                      onMouseEnter={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-xl border-2 transition-all ${selectedImage === idx ? 'border-[#008060]' : 'border-gray-100'}`}
                    >
                      <img src={img} className="w-full h-full object-cover rounded-lg" alt="thumb" />
                    </button>
                  ))}
                </div>
             </div>
          </div>

          {}
          <div className="lg:col-span-4 space-y-6">
            <h1 className="text-3xl font-bold text-[#202223] leading-tight">{product?.title}</h1>
            <div className="text-3xl font-bold text-[#202223]">₹{product?.price?.toLocaleString()}</div>

            {product?.variants?.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-black uppercase text-gray-400">Options</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, i) => (
                    <button 
                      key={i}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-bold transition-all ${selectedVariant === v ? 'border-[#008060] bg-[#f1f8f5] text-[#008060]' : 'border-gray-100 bg-white'}`}
                    >
                      {v.color} {v.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2 border-t pt-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Details</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{product?.description}</p>
            </div>
          </div>

          {}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6 sticky top-24">

              {}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Quantity</label>
                <div className="relative">
                  <select 
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full bg-[#f8f9fa] border border-gray-200 rounded-xl py-3 px-4 text-sm font-bold appearance-none cursor-pointer focus:ring-2 focus:ring-[#008060] outline-none"
                  >
                    {[...Array(Math.min(product?.stock || 0, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} Units</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronRight className="rotate-90" size={16} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleAddToCart}
                  disabled={product?.stock < 1}
                  className="w-full bg-[#008060] hover:bg-[#006e52] text-white py-4 rounded-xl font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={20} /> Add to Cart
                </button>

                <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black py-4 rounded-xl font-bold shadow-md transition-all active:scale-95">
                  Buy Now
                </button>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-4">
                <div className="flex items-center gap-3 text-xs text-gray-600 font-medium">
                  <Truck size={18} className="text-[#008060]" />
                  <span>Verified Express Delivery</span>
                </div>
                {product?.stock < 10 && (
                  <div className="bg-orange-50 p-3 rounded-lg flex items-start gap-2 border border-orange-100 animate-pulse">
                    <AlertCircle size={16} className="text-orange-600 shrink-0" />
                    <p className="text-[11px] text-orange-800 font-bold uppercase">Only {product?.stock} left!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        <div className="mt-16 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
           <ProductGrid 
            title="Recommendations for you" 
            products={allProducts?.filter(p => p._id !== id).slice(0, 4)} 
            loading={false} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;