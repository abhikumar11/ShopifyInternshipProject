import React, { useState } from 'react';
import { LayoutGrid, Info, Save, ChevronLeft, CheckCircle2, AlertCircle,Activity} from 'lucide-react';

const AddCategory = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const submissionData = {
      ...categoryData,
      isActive: categoryData.isActive === "true"
    };
    console.log("Submitting Category:", submissionData);
  };

  return (
    <div className="bg-[#f6f6f7] min-h-screen pb-20 font-sans">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <ChevronLeft size={20} className="text-gray-500" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Create Category</h1>
          </div>
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-sm font-bold rounded-lg shadow-sm transition active:scale-95"
          >
            <Save size={18} /> Save Category
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/30 flex items-center gap-2">
                <Info size={18} className="text-[#008060]" />
                <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider">General Information</h2>
              </div>
              
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    name="name"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#008060] focus:border-transparent transition-all outline-none"
                    placeholder="e.g. Personal Care, Baby Products..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                    Description
                  </label>
                  <textarea 
                    name="description"
                    rows="5"
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#008060] transition-all outline-none"
                    placeholder="Enter category details..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Activity size={18} className="text-blue-500" /> Availability
              </h2>
              
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-400 uppercase ml-1">
                  Active Status
                </label>
                <div className="relative">
                  <select 
                    name="isActive"
                    value={categoryData.isActive}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-[#008060] appearance-none"
                  >
                    <option value="true">Active (Visible)</option>
                    <option value="false">Inactive (Hidden)</option>
                  </select>
                 
                  <div className={`absolute right-10 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${categoryData.isActive === "true" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-gray-300"}`}></div>
                </div>
              </div>

              <div className="mt-4 flex gap-2 items-start p-3 rounded-lg bg-blue-50/50">
                <AlertCircle size={14} className="text-blue-500 mt-0.5" />
                <p className="text-[11px] text-blue-600 leading-relaxed">
                  Setting this to "Inactive" will remove this category and its products from the main storefront.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
               <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                 <LayoutGrid size={16} className="text-orange-500" /> Summary
               </h3>
               <div className="text-[12px] space-y-2 text-gray-500">
                 <div className="flex justify-between">
                   <span>Name:</span>
                   <span className="font-semibold text-gray-700">{categoryData.name || "---"}</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Status:</span>
                   <span className={`font-semibold ${categoryData.isActive === "true" ? "text-green-600" : "text-gray-500"}`}>
                     {categoryData.isActive === "true" ? "Live" : "Hidden"}
                   </span>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddCategory;