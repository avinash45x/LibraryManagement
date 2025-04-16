import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, User, HelpCircle } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/book-catalog', icon: BookOpen, label: 'Book Catalog' },
    { path: '/my-account', icon: User, label: 'My Account' },
    { path: '/help-support', icon: HelpCircle, label: 'Help & Support' },
  ];

  return (
    <div className="h-screen w-64 bg-indigo-800 text-white fixed left-0 top-0">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-8">Library System</h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-indigo-700 text-white'
                      : 'text-indigo-100 hover:bg-indigo-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;