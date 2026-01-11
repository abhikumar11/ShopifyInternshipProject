import React, { useState } from 'react';
import { 
  Edit3, Trash2, Plus, Search, 
  MoreHorizontal, Eye, Package, AlertCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VendorProductList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - In production, this comes from useSelector((state) => state.products)
  const [products, setProducts] = useState([
    { id: 1, name: "Minimalist Nordic Desk Lamp", price: 129.99, stock: 45, status: "Active", category: "Lighting", image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=100" },
    { id: 2, name: "Organic Cotton Throw", price: 45.00, stock: 12, status: "Active", category: "Home Decor", image: "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?q=80&w=100" },
    { id: 3, name: "Ceramic Coffee Set", price: 89.00, stock: 0, status: "Out of Stock", category: "Kitchen", image: "https://images.unsplash.com/photo-1517254456976-ee8682099819?q=80&w=100" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
      // dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f7] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#202223]">Products</h1>
            <p className="text-[#6d7175] text-sm mt-1">Manage your inventory and product visibility.</p>
          </div>
          <button 
            onClick={() => navigate('/vendor/addproduct')}
            className="bg-[#008060] hover:bg-[#006e52] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl border border-[#e1e3e5] shadow-sm mb-6">
          <div className="p-4 flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Filter products..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-[#babfc3] rounded-lg text-sm focus:border-[#008060] outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Status</button>
              <button className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Category</button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f9fafb] border-y border-[#e1e3e5]">
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Product</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Inventory</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Price</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f2f3]">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#f9fafb] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={product.image} className="w-12 h-12 rounded-lg border border-gray-100 object-cover" alt="" />
                        <div>
                          <p className="text-sm font-bold text-[#202223] group-hover:text-[#008060] transition-colors cursor-pointer">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-400">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                        product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${product.stock === 0 ? 'text-red-500 font-bold' : 'text-[#202223]'}`}>
                          {product.stock} in stock
                        </span>
                        {product.stock <= 15 && product.stock > 0 && <AlertCircle size={14} className="text-orange-400" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#202223]">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="p-2 text-gray-400 hover:text-[#008060] hover:bg-green-50 rounded-lg transition-all"
                          title="View Product"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => navigate(`/vendor/editproduct/${product.id}`)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Placeholder */}
          <div className="p-4 border-t border-[#e1e3e5] flex justify-between items-center text-sm text-[#6d7175]">
            <p>Showing {products.length} products</p>
            <div className="flex gap-2">
              <button disabled className="px-3 py-1 border border-gray-200 rounded opacity-50">Prev</button>
              <button disabled className="px-3 py-1 border border-gray-200 rounded opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProductList;