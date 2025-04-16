import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, UserCog } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <BookOpen className="w-16 h-16 mx-auto text-indigo-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to University Library
          </h1>
          <p className="text-xl text-gray-600">
            Choose your role to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <Users className="w-12 h-12 text-indigo-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Student</h2>
            <p className="text-gray-600 mb-6">
              Access your student account to borrow books, check due dates, and manage your library activities.
            </p>
            <div className="space-y-4">
              <Link
                to="/student/login"
                className="block w-full bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/student/signup"
                className="block w-full border border-indigo-600 text-indigo-600 text-center py-2 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <UserCog className="w-12 h-12 text-indigo-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Administrator</h2>
            <p className="text-gray-600 mb-6">
              Manage library resources, handle student requests, and oversee library operations.
            </p>
            <div className="space-y-4">
              <Link
                to="/admin/login"
                className="block w-full bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/admin/signup"
                className="block w-full border border-indigo-600 text-indigo-600 text-center py-2 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;