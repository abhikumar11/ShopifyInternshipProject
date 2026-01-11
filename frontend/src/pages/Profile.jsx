import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  User, Mail, Package, ShieldCheck, 
  MapPin, Edit2, LogOut, ShoppingBag 
} from 'lucide-react';

const Profile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userAuth);

  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#f6f6f7] py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 bg-white p-8 rounded-[2.5rem] border border-[#e1e3e5] shadow-sm">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border-4 border-emerald-100 shadow-inner">
              <User size={48} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tighter">{user?.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-black text-white text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-widest">
                  {user?.role} Account
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Member since {new Date(user?.createdAt).getFullYear()}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-rose-50 text-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[2rem] border border-[#e1e3e5] shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Quick Actions</h3>
              <nav className="space-y-2">
                <ProfileNavLink icon={ShoppingBag} label="My Orders" link="/orders" />
                <ProfileNavLink icon={MapPin} label="Saved Addresses" link="/shipping" />
                <ProfileNavLink icon={ShieldCheck} label="Privacy & Security" link="/security" />
              </nav>
            </div>

            <div className="bg-[#202223] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
               <h3 className="text-sm font-black italic mb-2 relative z-10">Buyer Protection</h3>
               <p className="text-[10px] text-gray-400 leading-relaxed relative z-10">Your purchases are secured with our 100% money-back guarantee.</p>
               <Package className="absolute -right-4 -bottom-4 text-white opacity-5 group-hover:opacity-10 transition-opacity" size={100} />
            </div>
          </div>

          {}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-[#e1e3e5] shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Account Details</h3>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                >
                  <Edit2 size={18} />
                </button>
              </div>

              <div className="space-y-6">
                <InfoField label="Full Name" value={user?.name} icon={User} />
                <InfoField label="Email Address" value={user?.emailid} icon={Mail} />
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Account Status</p>
                    <p className="text-sm font-bold text-emerald-600 uppercase tracking-tighter">
                      {user?.isActive ? "Verified & Active" : "Inactive"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const InfoField = ({ label, value, icon: Icon }) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-base font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const ProfileNavLink = ({ icon: Icon, label, link }) => (
  <a 
    href={link} 
    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all group"
  >
    <div className="flex items-center gap-3">
      <Icon size={18} className="text-gray-400 group-hover:text-emerald-600 transition-colors" />
      <span className="text-sm font-bold text-gray-700">{label}</span>
    </div>
    <div className="w-1 h-4 bg-gray-100 rounded-full group-hover:bg-emerald-500 transition-all"></div>
  </a>
);

export default Profile;