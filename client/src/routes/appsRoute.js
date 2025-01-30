import React from "react";
import {
  DASHBOARD_PREFIX_PATH,
  EXPENSE_CATEGORY_PREFIX_PATH,
  EXPENSE_PREFIX_PATH,
  USER_PREFIX_PATH,
} from "../constants/route.constant";

const appsRoute = [
  {
    key: "apps.dashboard",
    path: DASHBOARD_PREFIX_PATH,
    component: React.lazy(() => import("../views/dashboard")),
  },
  {
    key: "apps.expenses",
    path: EXPENSE_PREFIX_PATH,
    component: React.lazy(() => import("../views/expenses")),
  },
  {
    key: "apps.users",
    path: USER_PREFIX_PATH,
    component: React.lazy(() => import("../views/users")),
  },
  {
    key: "apps.expenseCategory",
    path: EXPENSE_CATEGORY_PREFIX_PATH,
    component: React.lazy(() => import("../views/expenseCategory")),
  },
];

export default appsRoute;
