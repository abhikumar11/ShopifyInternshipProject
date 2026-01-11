import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import Header from "./Header";
import AdminHeader from './admin/AdminHeader';
import VendorHeader from './vendor/VendorHeader';
import Footer from '../pages/Footer';
import CartDrawer from './CartDrawer'; // Import the new Drawer

const Layout = () => {
  const { user, token } = useSelector((state) => state.userAuth);
  const location = useLocation();
  
  // Local state to control the Cart Drawer
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCartOpen]);

  const isAuthPage = location.pathname === "/login" || location.pathname.startsWith("/register");
  const isDashboard = user?.role === "admin" || user?.role === "vendor";
  const bgColor = isDashboard ? "bg-white" : "bg-[#f6f6f7]";

  const renderHeader = () => {
    if (isAuthPage) return null;

    // Passing the setIsCartOpen function to the Header so the cart icon can open it
    const commonProps = { onOpenCart: () => setIsCartOpen(true) };

    if (!user || !token) {
      return <Header {...commonProps} />;
    }

    switch (user.role) {
      case "admin":
        return <AdminHeader />;
      case "vendor":
        return <VendorHeader />;
      default:
        return <Header {...commonProps} />; 
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${bgColor} antialiased font-sans transition-colors duration-300`}>
      
      {/* 1. Global Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* 2. Dynamic Header */}
      {renderHeader()}

      {/* 3. Main Content Area */}
      <main className={`flex-grow ${!isAuthPage && !isDashboard ? 'pt-0' : ''}`}>
        {/* We pass the open function via Outlet Context so pages like ProductDetail can trigger it */}
        <Outlet context={{ onOpenCart: () => setIsCartOpen(true) }} />
      </main>

      {/* 4. Footer */}
      {!isAuthPage && !isDashboard && <Footer />}
    </div>
  );
};

export default Layout;