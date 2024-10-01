// src/components/ProtectedRoute.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const allowAccess = localStorage.getItem("allowEmailVerificationAccess");
  const navigate = useNavigate();

  useEffect(() => {
    if (allowAccess !== "true") {
      // Show a toast notification
      toast.error("You are not authorized to access this page.");

      // Set a timeout to redirect after 2000ms
      setTimeout(() => {
        navigate("/signup");
      }, 3000);
    }
  }, [allowAccess, navigate]);

  if (allowAccess !== "true") {
    // Render the ToastContainer to make sure the toast is displayed
    return <ToastContainer />;
  }

  return children;
};

export default ProtectedRoute;
