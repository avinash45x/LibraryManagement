import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { BookOpen, Clock, AlertCircle } from 'lucide-react';

interface BorrowHistory {
  id: string;
  title: string;
  borrowDate: string;
  dueDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

const MyAccount = () => {
  const [borrowingHistory, setBorrowingHistory] = useState<BorrowHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBorrowHistory = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:5000/api/requests/user/${userId}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        
        setBorrowingHistory(data.map((request: any) => ({
          id: request._id,
          title: request.bookTitle,
          borrowDate: new Date(request.requestDate).toISOString().split('T')[0],
          dueDate: new Date(new Date(request.requestDate).getTime() + request.borrowDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: request.status
        })));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowHistory();
    // Refresh history every 30 seconds
    const interval = setInterval(fetchBorrowHistory, 30000);
    return () => clearInterval(interval);
  }, []);

  const fines = [
    {
      id: 1,
      title: 'Late Return: The Lean Startup',
      amount: 5.00,
      date: '2024-02-28',
      status: 'Unpaid',
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
                          item.status === 'approved' ? 'bg-green-100 text-green-800' :
                          item.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
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