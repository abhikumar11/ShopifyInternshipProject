import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const {token,user}=useSelector((state)=>state.userAuth);
  const {role}=useParams();
  if (role === "admin") {
        if (!token || user?.role !== "admin") {
            return <Navigate to="/unauthorized" replace />;
        }
    }
    return <Outlet/>
}

export default ProtectedRoute;