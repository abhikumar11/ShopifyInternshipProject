import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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

const App = () => {
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register defaultRole="buyer" />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/register/:role" element={<Register />} />
            <Route path="/vendor/dashboard" element={<VendorDashboard/>} />
             <Route path="/vendor/newstore" element={<AddStore/>}/>
             <Route path="/vendor/addproduct" element={<AddProduct/>}/>
             <Route path="/admin/addcat" element={<AddCategory/>}/>
          </Route>
          <Route path="/unauthorized" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
