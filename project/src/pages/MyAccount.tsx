import React from 'react';
import Sidebar from '../components/Sidebar';
import { BookOpen, Clock, AlertCircle } from 'lucide-react';

const MyAccount = () => {
  const borrowingHistory = [
    {
      id: 1,
      title: 'The Psychology of Money',
      borrowDate: '2024-03-01',
      dueDate: '2024-03-15',
      status: 'Returned',
    },
    {
      id: 2,
      title: 'Deep Work',
      borrowDate: '2024-03-10',
      dueDate: '2024-03-24',
      status: 'Borrowed',
    },
  ];

  const fines = [
    {
      id: 1,
      title: 'Late Return: The Lean Startup',
      amount: 5.00,
      date: '2024-02-28',
      status: 'Unpaid',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">My Account</h1>

        <div className="grid gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold">Borrowing History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrow Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {borrowingHistory.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.borrowDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.status === 'Returned' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold">Fines</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fines.map((fine) => (
                    <tr key={fine.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{fine.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${fine.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{fine.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                          {fine.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;