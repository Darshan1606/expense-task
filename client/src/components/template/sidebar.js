import React from "react";
import { Home, ReceiptText, Users, List } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DASHBOARD_PREFIX_PATH,
  EXPENSE_CATEGORY_PREFIX_PATH,
  EXPENSE_PREFIX_PATH,
  USER_PREFIX_PATH,
} from "../../constants/route.constant";

const menuItems = [
  { name: "Home", icon: Home, path: DASHBOARD_PREFIX_PATH },
  { name: "Expenses", icon: ReceiptText, path: EXPENSE_PREFIX_PATH },
  { name: "Users", icon: Users, path: USER_PREFIX_PATH },
  { name: "Expense Category", icon: List, path: EXPENSE_CATEGORY_PREFIX_PATH },
];

const Sidebar = () => {
  return (
    <div className="bg-primary-dark text-white w-64 min-h-screen p-4">
      <div className="text-2xl font-bold mb-8">Dashboard</div>
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            className="flex justify-start items-center p-3 hover:bg-primary-light rounded cursor-pointer"
          >
            <li key={index} className=" flex justify-start items-center ">
              <item.icon className="w-6 h-6 mb-1" />
              <span className="ml-2 text-sm font-bold">{item.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
