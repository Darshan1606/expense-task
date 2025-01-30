import React from "react";

const Dashboard = () => {
  return (
    <div className="flex-1 p-2">
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-gray-600">1,234</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
