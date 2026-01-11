import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, token, loading } = useSelector((state) => state.userAuth);
  const location = useLocation();

  // 1. If Redux is still reading from localStorage, DON'T redirect yet.
  // Returning null or a loader keeps the user on the current URL.
  if (loading) {
    return null; 
  }

  // 2. Only if loading is finished and there is no user, redirect to login.
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. If user exists, show the child components (like Checkout)
  return <Outlet />;
};

export default ProtectedRoute;