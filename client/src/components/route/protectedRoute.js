import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { LOGIN_PREFIX_PATH } from "../../constants/route.constant";

const ProtectedRoute = () => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to={LOGIN_PREFIX_PATH} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
