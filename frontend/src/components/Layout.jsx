import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import {useSelector} from "react-redux";
import Header from './Header';
import AdminHeader from './admin/AdminHeader';
import VendorHeader from './vendor/VendorHeader';
const Layout = () => {
  const {user,token}=useSelector((state)=>state.userAuth);
  const location=useLocation();
  const isAuthPage=location.pathname==="/login"||location.pathname.startsWith("/register");
  const renderHeader=()=>{
    if (isAuthPage) return null;

    if(!user||!token){
        return<Header/>
    }
    switch(user.role){
        case "admin":return<AdminHeader/>
        case "vendor":return<VendorHeader/>
        default:return<Header/>
    }
  }
  return (
    <div className="min-h-screen flex flex-col bg-[#f6f6f7]">
       {renderHeader()}
       <main className="flex-grow">
                <Outlet />
            </main>
    </div>
  )
}

export default Layout