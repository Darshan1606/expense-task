import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { DASHBOARD_PREFIX_PATH } from "../../constants/route.constant";

const PublicRoute = () => {
  const { authenticated } = useAuth();

  return authenticated ? <Navigate to={DASHBOARD_PREFIX_PATH} /> : <Outlet />;
};

export default PublicRoute;
