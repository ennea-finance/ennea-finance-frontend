import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    // No token → redirect to login
    toast.error("Plese Login First!")
    return <Navigate to="/admin/login" replace />;
  }

  // Token found → allow access
  return children;
};

export default ProtectedRoute;
