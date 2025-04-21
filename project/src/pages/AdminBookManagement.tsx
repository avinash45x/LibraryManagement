// import React, { useState } from 'react';
// import AdminSidebar from '../components/AdminSidebar';
// import { PlusCircle, Trash2, Edit, X } from 'lucide-react';

// interface Book {
//   id: number;
//   title: string;
//   author: string;
//   category: string;
//   description: string;
//   cover: string;
// }

// const AdminBookManagement = () => {
//   const [activeSection, setActiveSection] = useState<'add' | 'update' | 'delete' | null>(null);
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//   const [bookData, setBookData] = useState<Partial<Book>>({});
//   const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
//   const [bookId, setBookId] = useState('');
//   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
//   const [bookTitleToSearch, setBookTitleToSearch] = useState('');


//   const handleAddBook = (e: React.FormEvent) => {
//     e.preventDefault();
//     setShowConfirmDialog(true);
//   };

//   const handleUpdateBook = (e: React.FormEvent) => {
//     e.preventDefault();
//     setShowConfirmDialog(true);
//   };

//   const handleDeleteBook = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Simulating book fetch by ID
//     const book = {
//       id: parseInt(bookId),
//       title: 'Sample Book',
//       author: 'Sample Author',
//       category: 'Sample Category',
//       description: 'Sample Description',
//       cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200'
//     };
//     setSelectedBook(book);
//     setShowConfirmDialog(true);
//   };
//   const handleFetchBookByTitle = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     if (!bookTitleToSearch.trim()) {
//       alert('Please enter a book title to search.');
//       return;
//     }
  
//     try {
//       const response = await fetch(`http://localhost:5000/api/books/title/${bookTitleToSearch.trim()}`);
  
//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.details || 'Book not found.');
//       }
  
//       const data = await response.json();
  
//       // Populate bookData state with fetched details
//       setBookData({
//         title: data.title,
//         author: data.author,
//         category: data.category,
//         description: data.description,
//         cover: data.cover,
//       });
//     } catch (error: any) {
//       console.error('Error fetching book:', error);
//       alert('Failed to fetch book. ' + error.message);
//     }
//   };
  

//   const handleConfirm = async () => {
//     switch (activeSection) {
//       case 'add':
//         try {
//           // Ensure all fields are present and trimmed
//           const { title, author, category, description, cover } = bookData;
  
//           if (!title || !author || !category || !description || !cover) {
//             alert('Please fill in all fields.');
//             return;
//           }
  
//           const response = await fetch('http://localhost:5000/api/books', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               title: title.trim(),
//               author: author.trim(),
//               category: category.trim(),
//               description: description.trim(),
//               cover: cover.trim(),
//             }),
//           });
  
//           if (!response.ok) {
//             const data = await response.json();
//             throw new Error(data.details || 'Unknown error');
//           }
  
//           alert('Book added successfully!');
//         } catch (error: any) {
//           console.error('Error adding book:', error);
//           alert('Failed to add book. ' + error.message);
//         }
//         break;
  
//         case 'update':
//   try {
//     const { title, author, category, description, cover } = bookData;

//     if (!title || !author || !category || !description || !cover) {
//       alert('Please fill in all fields including book title.');
//       return;
//     }

//     const updateFields = {
//       title: title.trim(),
//       author: author.trim(),
//       category: category.trim(),
//       description: description.trim(),
//       cover: cover.trim(),
//     };

//     const response = await fetch(`http://localhost:5000/api/books/title/${title.trim()}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updateFields),
//     });

//     if (!response.ok) {
//       const data = await response.json();
//       throw new Error(data.details || 'Unknown error');
//     }

//     alert('Book updated successfully!');
//   } catch (error: any) {
//     console.error('Error updating book:', error);
//     alert('Failed to update book. ' + error.message);
//   }
//   break;


        
//           case 'delete':
//   try {
//     const { title } = bookData;

//     if (!title) {
//       alert('Please provide the book title to delete.');
//       return;
//     }

//     const response = await fetch(`http://localhost:5000/api/books/title/${title.trim()}`, {
//       method: 'DELETE',
//     });

//     if (!response.ok) {
//       const data = await response.json();
//       throw new Error(data.details || 'Unknown error');
//     }

//     alert('Book deleted successfully!');
//   } catch (error: any) {
//     console.error('Error deleting book:', error);
//     alert('Failed to delete book. ' + error.message);
//   }
//   break;

//     }
  
//     handleCancel();
//   };
  
  

//   const handleCancel = () => {
//     setShowConfirmDialog(false);
//     setActiveSection(null);
//     setBookData({});
//     setSelectedAttributes([]);
//     setBookId('');
//     setSelectedBook(null);
//   };

//   const bookAttributes = [
//     'title',
//     'author',
//     'category',
//     'description',
//     'cover'
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <AdminSidebar />
//       <div className="ml-64 p-8">
//         <h1 className="text-2xl font-bold text-gray-800 mb-8">Book Management</h1>

//         {!activeSection && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <button
//               onClick={() => setActiveSection('add')}
//               className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
//             >
//               <PlusCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
//               <h2 className="text-xl font-semibold text-center">Add Book</h2>
//             </button>
//             <button
//               onClick={() => setActiveSection('update')}
//               className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
//             >
//               <Edit className="w-12 h-12 text-blue-600 mx-auto mb-4" />
//               <h2 className="text-xl font-semibold text-center">Update Book</h2>
//             </button>
//             <button
//               onClick={() => setActiveSection('delete')}
//               className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
//             >
//               <Trash2 className="w-12 h-12 text-red-600 mx-auto mb-4" />
//               <h2 className="text-xl font-semibold text-center">Delete Book</h2>
//             </button>
//           </div>
//         )}

//         {activeSection === 'add' && (
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-6">Add New Book</h2>
//             <form onSubmit={handleAddBook} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Author
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Category
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   onChange={(e) => setBookData({ ...bookData, category: e.target.value })}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   required
//                   rows={4}
//                   className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Cover Image URL
//                 </label>
//                 <input
//                   type="url"
//                   required
//                   className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   onChange={(e) => setBookData({ ...bookData, cover: e.target.value })}
//                 />
//               </div>
//               <div className="flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={handleCancel}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//                 >
//                   Next
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

// {activeSection === 'update' && (
//   <div className="bg-white rounded-lg shadow-md p-6">
//     <h2 className="text-xl font-semibold mb-6">Update Book</h2>

//     {/* Step 1: Input the title to search for the book */}
//     <form onSubmit={handleFetchBookByTitle} className="space-y-4 mb-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Enter Book Title</label>
//         <input
//           type="text"
//           required
//           className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           value={bookTitleToSearch}
//           onChange={(e) => setBookTitleToSearch(e.target.value)}
//         />
//       </div>
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//         >
//           Fetch Book
//         </button>
//       </div>
//     </form>

//     {/* Step 2: Display book fields for editing if bookData is filled */}
//     {bookData.title && (
//       <form onSubmit={handleUpdateBook} className="space-y-4">
//         {['title', 'author', 'category', 'description', 'cover'].map((attr) => (
//           <div key={attr}>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               {attr.charAt(0).toUpperCase() + attr.slice(1)}
//             </label>
//             {attr === 'description' ? (
//               <textarea
//                 rows={4}
//                 required
//                 className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 value={bookData[attr]}
//                 onChange={(e) => setBookData({ ...bookData, [attr]: e.target.value })}
//               />
//             ) : (
//               <input
//                 type={attr === 'cover' ? 'url' : 'text'}
//                 required
//                 className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 value={bookData[attr]}
//                 onChange={(e) => setBookData({ ...bookData, [attr]: e.target.value })}
//               />
//             )}
//           </div>
//         ))}
//         <div className="flex justify-end space-x-3">
//           <button
//             type="button"
//             onClick={handleCancel}
//             className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//           >
//             Update
//           </button>
//         </div>
//       </form>
//     )}
//   </div>
// )}



// {activeSection === 'delete' && (
//   <div className="bg-white rounded-lg shadow-md p-6">
//     <h2 className="text-xl font-semibold mb-6">Delete Book</h2>
//     <form onSubmit={handleDeleteBook} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Book Title (to delete)
//         </label>
//         <input
//           type="text"
//           required
//           className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
//         />
//       </div>

//       <div className="flex justify-end space-x-3">
//         <button
//           type="button"
//           onClick={handleCancel}
//           className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//         >
//           Delete
//         </button>
//       </div>
//     </form>
//   </div>
// )}



//         {/* Confirmation Dialog */}
//         {showConfirmDialog && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 w-[500px]">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-semibold">Confirm Action</h2>
//                 <button
//                   onClick={handleCancel}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               {activeSection === 'delete' && selectedBook && (
//                 <div className="mb-6">
//                   <h3 className="font-semibold mb-2">Book Details:</h3>
//                   <p>Title: {selectedBook.title}</p>
//                   <p>Author: {selectedBook.author}</p>
//                   <p>Category: {selectedBook.category}</p>
//                 </div>
//               )}

//               <p className="text-gray-700 mb-6">
//                 Are you sure you want to {activeSection} this book?
//               </p>

//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={handleCancel}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                 >
//                   No
//                 </button>
//                 <button
//                   onClick={handleConfirm}
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//                 >
//                   Yes
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminBookManagement;

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
  const [bookTitleToSearch, setBookTitleToSearch] = useState('');
  // NEW: Store the original title when fetching for update
  const [originalTitle, setOriginalTitle] = useState<string>('');

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

  const handleFetchBookByTitle = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!bookTitleToSearch.trim()) {
      alert('Please enter a book title to search.');
      return;
    }
  
    try {
      const response = await fetch(`/api/books/title/${encodeURIComponent(bookTitleToSearch.trim())}`);
  
      // Check for HTTP errors
      if (!response.ok) {
        // Try to parse error details if JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          throw new Error(data.details || 'Book not found.');
        } else {
          // Otherwise, read as text (likely HTML error page)
          const text = await response.text();
          throw new Error(`Server error: ${response.status} ${response.statusText}\n${text}`);
        }
      }
  
      // Success: parse as JSON only if content-type is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setBookData({
          title: data.title,
          author: data.author,
          category: data.category,
          description: data.description,
          cover: data.cover,
        });
      } else {
        throw new Error('Invalid response format from server.');
      }
    } catch (error: any) {
      console.error('Error fetching book:', error);
      alert('Failed to fetch book. ' + (error.message || 'Unknown error.'));
    }
  };
  
  
  const handleConfirm = async () => {
    switch (activeSection) {
      case 'add':
        try {
          const { title, author, category, description, cover } = bookData;

          if (!title || !author || !category || !description || !cover) {
            alert('Please fill in all fields.');
            return;
          }

          const response = await fetch('http://localhost:5000/api/books', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: title.trim(),
              author: author.trim(),
              category: category.trim(),
              description: description.trim(),
              cover: cover.trim(),
            }),
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.details || 'Unknown error');
          }

          alert('Book added successfully!');
        } catch (error: any) {
          console.error('Error adding book:', error);
          alert('Failed to add book. ' + error.message);
        }
        break;

      case 'update':
        try {
          const { title, author, category, description, cover } = bookData;

          if (!originalTitle || !title || !author || !category || !description || !cover) {
            alert('Please fill in all fields including book title.');
            return;
          }

          const updateFields = {
            title: title.trim(),
            author: author.trim(),
            category: category.trim(),
            description: description.trim(),
            cover: cover.trim(),
          };

          // Use originalTitle as identifier, not possibly changed title
          const response = await fetch(`http://localhost:5000/api/books/title/${encodeURIComponent(originalTitle)}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateFields),
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.details || 'Unknown error');
          }

          alert('Book updated successfully!');
        } catch (error: any) {
          console.error('Error updating book:', error);
          alert('Failed to update book. ' + error.message);
        }
        break;

      case 'delete':
        try {
          const { title } = bookData;

          if (!title) {
            alert('Please provide the book title to delete.');
            return;
          }

          const response = await fetch(`http://localhost:5000/api/books/title/${title.trim()}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.details || 'Unknown error');
          }

          alert('Book deleted successfully!');
        } catch (error: any) {
          console.error('Error deleting book:', error);
          alert('Failed to delete book. ' + error.message);
        }
        break;

      default:
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
    setBookTitleToSearch('');
    setOriginalTitle('');
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
            {/* Step 1: Input the title to search for the book */}
            <form onSubmit={handleFetchBookByTitle} className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter Book Title</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={bookTitleToSearch}
                  onChange={(e) => setBookTitleToSearch(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Fetch Book
                </button>
              </div>
            </form>

            {/* Step 2: Display book fields for editing if bookData is filled */}
            {bookData.title && (
              <form onSubmit={handleUpdateBook} className="space-y-4">
                {['title', 'author', 'category', 'description', 'cover'].map((attr) => (
                  <div key={attr}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {attr.charAt(0).toUpperCase() + attr.slice(1)}
                    </label>
                    {attr === 'description' ? (
                      <textarea
                        rows={4}
                        required
                        className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={bookData[attr as keyof Book] || ''}
                        onChange={(e) => setBookData({ ...bookData, [attr]: e.target.value })}
                      />
                    ) : (
                      <input
                        type={attr === 'cover' ? 'url' : 'text'}
                        required
                        className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={bookData[attr as keyof Book] || ''}
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
                    Update
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeSection === 'delete' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Delete Book</h2>
            <form onSubmit={handleDeleteBook} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Book Title (to delete)
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
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
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
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
