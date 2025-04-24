import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface Request {
  _id: string;
  userId: string;
  bookId: string;
  bookTitle: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  borrowDays?: number;
  purpose?: string;
  returnDate?: string;
  returnStatus?: 'pending' | 'returned' | 'overdue';
}

const BorrowingHistory: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      if (!user?._id) return;
      
      const response = await fetch(`http://localhost:5000/api/requests/user/${user._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch borrowing history');
      }
      
      const data = await response.json();
      setRequests(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching borrowing history:', err);
      setError(err.message || 'Failed to load borrowing history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();

    // Listen for real-time updates
    const handleRequestUpdate = (event: CustomEvent) => {
      const { requestId, status } = event.detail;
      setRequests(prevRequests =>
        prevRequests.map(req =>
          req._id === requestId ? { ...req, status } : req
        )
      );
    };

    window.addEventListener('borrowRequestUpdate', handleRequestUpdate as EventListener);

    return () => {
      window.removeEventListener('borrowRequestUpdate', handleRequestUpdate as EventListener);
    };
  }, [user?._id]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'returned':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );

  if (error) return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md mx-auto max-w-2xl mt-4">
      {error}
    </div>
  );

  if (!requests.length) return (
    <div className="text-center text-gray-600 p-8">
      No borrowing history found.
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Borrowing History</h2>
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">{request.bookTitle}</h3>
                <p className="text-sm text-gray-600">
                  Requested on: {new Date(request.createdAt).toLocaleDateString()}
                </p>
                {request.borrowDays && (
                  <p className="text-sm text-gray-600">
                    Borrow Duration: {request.borrowDays} days
                  </p>
                )}
                {request.purpose && (
                  <p className="text-sm text-gray-600">
                    Purpose: {request.purpose}
                  </p>
                )}
                {request.returnDate && (
                  <p className="text-sm text-gray-600">
                    Return Date: {new Date(request.returnDate).toLocaleDateString()}
                  </p>
                )}
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                  {request.returnStatus && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(request.returnStatus)}`}>
                      {request.returnStatus.charAt(0).toUpperCase() + request.returnStatus.slice(1)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowingHistory; 