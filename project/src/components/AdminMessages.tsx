import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';

interface BookRequest {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  bookId: string;
  bookTitle: string;
  borrowDays: number;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
}

const AdminMessages = () => {
  const [requests, setRequests] = useState<BookRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRequests();
    // Set up polling for new requests
    const interval = setInterval(fetchRequests, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchRequests = async () => {
    try {
      console.log('Fetching requests...');
      const response = await fetch('http://localhost:5000/api/requests');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch requests');
      }
      
      console.log('Fetched requests:', data);
      setRequests(data);
    } catch (err: any) {
      console.error('Error fetching requests:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (requestId: string, action: 'approved' | 'rejected') => {
    try {
      setLoading(true);
      console.log(`Processing ${action} action for request ${requestId}`);
      
      const response = await fetch(`http://localhost:5000/api/requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ status: action }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Failed to ${action} request`);
      }

      if (!data.success) {
        throw new Error(data.error || `Failed to ${action} request`);
      }

      // Update local state
      setRequests(prevRequests => 
        prevRequests.map(req => 
          req._id === requestId ? { ...req, status: action } : req
        )
      );

      // Show success message
      alert(data.message || `Request ${action} successfully`);

    } catch (err: any) {
      console.error(`Error ${action} request:`, err);
      alert(err.message || `Failed to ${action} request. Please try again.`);
    } finally {
      setLoading(false);
      // Refresh the requests list
      fetchRequests();
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="ml-64 p-8">
        <div className="flex items-center justify-center h-full">
          <div className="text-lg text-gray-600">Loading requests...</div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="ml-64 p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="ml-64 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Borrow Requests</h1>
        <div className="space-y-4">
          {requests.length > 0 ? (
            requests.map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{request.bookTitle}</h2>
                    <p className="text-gray-600">Requested by: {request.userName}</p>
                    <p className="text-gray-600">Email: {request.userEmail}</p>
                    <p className="text-gray-600">Borrow Days: {request.borrowDays}</p>
                    <p className="text-gray-600">Purpose: {request.purpose}</p>
                    <p className="text-gray-600">
                      Request Date: {new Date(request.requestDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                      Status: <span className={`font-semibold ${
                        request.status === 'pending' ? 'text-yellow-600' :
                        request.status === 'approved' ? 'text-green-600' :
                        'text-red-600'
                      }`}>{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span>
                    </p>
                  </div>
                  {request.status === 'pending' && (
                    <div className="space-x-2">
                      <button
                        onClick={() => handleRequestAction(request._id, 'approved')}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRequestAction(request._id, 'rejected')}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 bg-white rounded-lg shadow-md p-8">
              No borrow requests found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages; 