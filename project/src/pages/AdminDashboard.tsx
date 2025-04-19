import React from 'react';
import { format } from 'date-fns';
import { Search, BookOpen, Users, Library } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
  const currentDate = format(new Date(), 'MMMM d, yyyy');
  const currentTime = format(new Date(), 'h:mm a');

  const cards = [
    { title: 'Total Books', count: 120, icon: BookOpen, color: 'bg-blue-500' },
    { title: 'Active Users', count: 45, icon: Users, color: 'bg-green-500' },
    { title: 'Books Borrowed', count: 28, icon: Library, color: 'bg-purple-500' },
  ];

  const recentActivities = [
    { action: 'Book Added', details: 'Clean Code by Robert C. Martin', time: '2 hours ago' },
    { action: 'Book Updated', details: 'Deep Work by Cal Newport', time: '3 hours ago' },
    { action: 'Book Deleted', details: 'The Lean Startup', time: '5 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">{currentDate} | {currentTime}</p>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {cards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className={`inline-block p-3 rounded-lg ${card.color} text-white mb-4`}>
                <card.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{card.count}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0">
                <div>
                  <h3 className="font-semibold text-gray-800">{activity.action}</h3>
                  <p className="text-gray-600">{activity.details}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;