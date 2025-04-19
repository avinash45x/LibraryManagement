import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { PlusCircle, Trash2, Edit, X } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  description: string;
  cover: string;
}

const AdminBookManagement = () => {
  const [activeSection, setActiveSection] = useState<'add' | 'update' | 'delete' | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [bookData, setBookData] = useState<Partial<Book>>({});
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const [bookId, setBookId] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  const handleUpdateBook = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  const handleDeleteBook = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating book fetch by ID
    const book = {
      id: parseInt(bookId),
      title: 'Sample Book',
      author: 'Sample Author',
      category: 'Sample Category',
      description: 'Sample Description',
      cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200'
    };
    setSelectedBook(book);
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    switch (activeSection) {
      case 'add':
        alert('Book added successfully!');
        break;
      case 'update':
        alert('Book updated successfully!');
        break;
      case 'delete':
        alert('Book deleted successfully!');
        break;
    }
    handleCancel();
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
    setActiveSection(null);
    setBookData({});
    setSelectedAttributes([]);
    setBookId('');
    setSelectedBook(null);
  };

  const bookAttributes = [
    'title',
    'author',
    'category',
    'description',
    'cover'
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="ml-64 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Book Management</h1>

        {!activeSection && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => setActiveSection('add')}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <PlusCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-center">Add Book</h2>
            </button>
            <button
              onClick={() => setActiveSection('update')}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Edit className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-center">Update Book</h2>
            </button>
            <button
              onClick={() => setActiveSection('delete')}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Trash2 className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-center">Delete Book</h2>
            </button>
          </div>
        )}

        {activeSection === 'add' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Add New Book</h2>
            <form onSubmit={handleAddBook} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setBookData({ ...bookData, category: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  required
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setBookData({ ...bookData, cover: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {activeSection === 'update' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Update Book</h2>
            <form onSubmit={handleUpdateBook} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Attributes to Update
                </label>
                <select
                  multiple
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setSelectedAttributes(selected);
                  }}
                >
                  {bookAttributes.map(attr => (
                    <option key={attr} value={attr}>
                      {attr.charAt(0).toUpperCase() + attr.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              {selectedAttributes.map(attr => (
                <div key={attr}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {attr.charAt(0).toUpperCase() + attr.slice(1)}
                  </label>
                  {attr === 'description' ? (
                    <textarea
                      required
                      rows={4}
                      className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onChange={(e) => setBookData({ ...bookData, [attr]: e.target.value })}
                    />
                  ) : (
                    <input
                      type={attr === 'cover' ? 'url' : 'text'}
                      required
                      className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onChange={(e) => setBookData({ ...bookData, [attr]: e.target.value })}
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {activeSection === 'delete' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Delete Book</h2>
            <form onSubmit={handleDeleteBook} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Book ID
                </label>
                <input
                  type="number"
                  required
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={bookId}
                  onChange={(e) => setBookId(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[500px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Confirm Action</h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {activeSection === 'delete' && selectedBook && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Book Details:</h3>
                  <p>Title: {selectedBook.title}</p>
                  <p>Author: {selectedBook.author}</p>
                  <p>Category: {selectedBook.category}</p>
                </div>
              )}

              <p className="text-gray-700 mb-6">
                Are you sure you want to {activeSection} this book?
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  No
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookManagement;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // assuming axios is used in bookserver.js

// const AdminBookManagement: React.FC = () => {
//   const [books, setBooks] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Book form state
//   const [form, setForm] = useState({
//     _id: '',
//     title: '',
//     author: '',
//     category: '',
//     description: '',
//     cover: ''
//   });

//   const isEditing = !!form._id;

//   // Fetch books
//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('/api/books'); // update to match your backend route
//       setBooks(res.data);
//     } catch (err) {
//       console.error('Failed to fetch books:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   // Handle form input change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Add or update book
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         await axios.put(`/api/books/${form._id}`, form); // update route
//       } else {
//         await axios.post('/api/books', form); // create route
//       }
//       setForm({ _id: '', title: '', author: '', category: '', description: '', cover: '' });
//       fetchBooks();
//     } catch (err) {
//       console.error('Failed to submit book:', err);
//     }
//   };

//   // Edit button
//   const handleEdit = (book: any) => {
//     setForm(book);
//   };

//   // Delete button
//   const handleDelete = async (id: string) => {
//     try {
//       await axios.delete(`/api/books/${id}`); // delete route
//       fetchBooks();
//     } catch (err) {
//       console.error('Failed to delete book:', err);
//     }
//   };

//   return (
//     <div className="admin-book-management">
//       <h2>Book Management</h2>

//       <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={form.title}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="author"
//           placeholder="Author"
//           value={form.author}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           value={form.category}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="cover"
//           placeholder="Cover URL"
//           value={form.cover}
//           onChange={handleChange}
//         />
//         <button type="submit">{isEditing ? 'Update' : 'Add'} Book</button>
//       </form>

//       {loading ? (
//         <p>Loading books...</p>
//       ) : (
//         <table border={1}>
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Author</th>
//               <th>Category</th>
//               <th>Description</th>
//               <th>Cover</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book: any) => (
//               <tr key={book._id}>
//                 <td>{book.title}</td>
//                 <td>{book.author}</td>
//                 <td>{book.category}</td>
//                 <td>{book.description}</td>
//                 <td>
//                   <img src={book.cover} alt={book.title} width={50} height={70} />
//                 </td>
//                 <td>
//                   <button onClick={() => handleEdit(book)}>Edit</button>
//                   <button onClick={() => handleDelete(book._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminBookManagement;


