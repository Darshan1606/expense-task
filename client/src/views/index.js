import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, protectedRoutes } from "../routes";
import ProtectedRoute from "../components/route/protectedRoute";
import PublicRoute from "../components/route/publicRoute";
import AppRoute from "../components/route/appRoute";
import { DASHBOARD_PREFIX_PATH } from "../constants/route.constant";

const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<Navigate replace to={DASHBOARD_PREFIX_PATH} />}
        />
        {protectedRoutes.map((route, index) => (
          <Route
            key={route.key + index}
            path={route.path}
            element={
              <AppRoute
                routeKey={route.key}
                component={route.component}
                {...route.meta}
              />
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="/" element={<PublicRoute />}>
        {authRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AppRoute
                routeKey={route.key}
                component={route.component}
                {...route.meta}
              />
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

export default Views;
