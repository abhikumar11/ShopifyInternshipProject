import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Plus, Edit3, Trash2, Layers, 
  Loader2, X, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { 
  getCategories, 
  createCategory, 
  deleteCategory, 
  updateCategory, 
  clearErrors 
} from "../../redux/actions/CategoryActions";


const CategoryManager = () => {
  const dispatch = useDispatch();
  
  // Redux State
  const { categories, loading, error, success } = useSelector((state) => state.allCategories);
  // Note: Depending on your combineReducers, delete/update might be in the same or different state slice
  const { isDeleted, isUpdated } = useSelector((state) => state.allCategories); 

  // Local UI State
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", isActive: true });

  useEffect(() => {
    dispatch(getCategories());

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert("Category Created Successfully!");
      dispatch({ type: "NEW_CATEGORY_RESET" });
      closeModal();
    }

    if (isDeleted) {
      alert("Category Deleted!");
      dispatch({ type: "DELETE_CATEGORY_RESET" });
      dispatch(getCategories());
    }

    if (isUpdated) {
      alert("Category Updated!");
      dispatch({ type: "UPDATE_CATEGORY_RESET" });
      dispatch(getCategories());
      closeModal();
    }
  }, [dispatch, error, success, isDeleted, isUpdated]);

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedId(null);
    setFormData({ name: "", description: "", isActive: true });
  };

  const handleEditClick = (cat) => {
    setEditMode(true);
    setSelectedId(cat._id);
    setFormData({
      name: cat.name,
      description: cat.description || "",
      isActive: cat.isActive
    });
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this category? This may affect linked products.")) {
      dispatch(deleteCategory(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateCategory(selectedId, formData));
    } else {
      dispatch(createCategory(formData));
    }
  };

  return (
    <div className="p-8 bg-[#f6f6f7] min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Store Categories</h1>
            <p className="text-gray-500 font-medium">Manage your product taxonomy and visibility</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#008060] text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#006e52] transition-all shadow-lg shadow-emerald-100"
          >
            <Plus size={18} /> New Category
          </button>
        </div>

        {loading && categories?.length === 0 ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#008060]" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.map((cat) => (
              <div key={cat._id} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                <div className={`absolute top-0 right-0 h-1 w-full ${cat.isActive ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${cat.isActive ? 'bg-emerald-50 text-[#008060]' : 'bg-gray-50 text-gray-400'}`}>
                    <Layers size={24} />
                  </div>
                  <div className="flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEditClick(cat)}
                      className="p-2 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(cat._id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-black text-gray-900 mb-1 capitalize">{cat.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2 h-10">
                  {cat.description || "No description provided."}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                    cat.isActive 
                      ? 'text-emerald-600 bg-emerald-50 border-emerald-100' 
                      : 'text-amber-600 bg-amber-50 border-amber-100'
                  }`}>
                    {cat.isActive ? 'Active' : 'Hidden'}
                  </span>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    ID: {cat._id.slice(-6)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shared Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter">
                  {editMode ? "Update Category" : "Add Category"}
                </h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Store Taxonomy Manager</p>
              </div>
              <button onClick={closeModal} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Category Name</label>
                <input 
                  type="text"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-bold focus:bg-white focus:border-[#008060] outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Menswear"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Description</label>
                <textarea 
                  rows="3"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-bold focus:bg-white focus:border-[#008060] outline-none transition-all resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe this category..."
                />
              </div>

              {/* Status Toggle (isActive) */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Status</span>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, isActive: !formData.isActive})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.isActive ? 'bg-[#008060]' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#008060] text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:shadow-xl hover:shadow-emerald-100 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : (editMode ? "Update" : "Create")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;