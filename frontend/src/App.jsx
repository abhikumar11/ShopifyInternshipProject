import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; 

import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import ErrorPage from "./utils/ErrorPage";
import VendorDashboard from "./components/vendor/VendorDashboard";
import AddStore from "./components/vendor/AddStore";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import ProductDetail from "./pages/ProductDetails";
import StorePage from "./pages/StorePage";
import AdminDashboard from "./components/admin/AdminDashboard";
import Inventory from "./pages/Inventory";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./utils/OrderSuccess";
import OrderList from "./pages/OrderList";
import OrderDetail from "./pages/OrderDetail";
import OrdersList from "./components/vendor/OrdersList";
import AdminOrders from "./components/admin/AdminOrders";
import AdminOrderDetails from "./components/admin/AdminOrderDetails";
import CategoryManager from "./components/admin/CategoryManager";
import Vendors from "./components/admin/Vendors";
import AdminPayments from "./components/admin/AdminPayment";
import Profile from "./pages/Profile";

const App = () => {

  const { loading } = useSelector((state) => state.userAuth);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-gray-100 border-t-[#008060] rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500">Initializing session...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        theme="light"
      />

      <Routes>
        <Route element={<Layout />}>
          {}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/store/:id" element={<StorePage />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register defaultRole="buyer" />} />

          {}
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/success/:id" element={<OrderSuccess />} />
            <Route path="/register/:role" element={<Register />} />
            <Route path="/order/myorder" element={<OrderList/>}/>
            <Route path="/order/:id" element={<OrderDetail />} />
            <Route path="/account" element={<Profile/>}/>
            {}
            <Route path="/vendor/dashboard" element={<VendorDashboard/>} />
            <Route path="/vendor/newstore" element={<AddStore/>}/>
            <Route path="/vendor/addproduct" element={<AddProduct/>}/>
            <Route path="/vendor/inventory" element={<Inventory/>}/>
            <Route path="/vendor/orders" element={<OrdersList/>}/>

            {}
            <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
            <Route path="/admin/addcat" element={<AddCategory/>}/>
            <Route path="/admin/orders" element={<AdminOrders/>}/>
            <Route path="/admin/order/:id" element={<AdminOrderDetails/>}/>
            <Route path="/admin/categories" element={<CategoryManager/>}/>
            <Route path="/admin/vendors" element={<Vendors/>}/>
            <Route path="/admin/payments" element={<AdminPayments/>}/>
          </Route>

          {}
          <Route path="/unauthorized" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;