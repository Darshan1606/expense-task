import React from "react";
import { LOGIN_PREFIX_PATH } from "../constants/route.constant";

const authRoute = [
  {
    key: "auth.login",
    path: LOGIN_PREFIX_PATH,
    component: React.lazy(() => import("../views/login")),
  },
];

export default authRoute;
