import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let accessToken = localStorage.getItem('accessToken')
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
