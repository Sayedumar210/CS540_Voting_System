import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const LoggedinRoute = () => {
  let accessToken = localStorage.getItem("accessToken");

  return !accessToken ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default LoggedinRoute;
