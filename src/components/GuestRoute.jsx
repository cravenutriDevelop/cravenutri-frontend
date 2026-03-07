import React from "react";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  // check token
  const token = localStorage.getItem("token");

  // agar login hai to home page redirect
  if (token) {
    return <Navigate to="/" replace />;
  }

  // agar login nahi hai to requested page open
  return children;
};

export default GuestRoute;