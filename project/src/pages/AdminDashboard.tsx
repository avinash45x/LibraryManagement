import React from 'react';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64 p-8">
        <h1>Admin Dashboard</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;