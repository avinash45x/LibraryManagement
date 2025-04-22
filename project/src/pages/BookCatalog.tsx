import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Search, BookOpen, Clock, TrendingUp, Filter, X, ExternalLink } from 'lucide-react';
import { format, addDays } from 'date-fns';

interface BorrowDialogProps {
  book: Book;
  onClose: () => void;
}

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  status: 'available' | 'not available';
  category: string;
  popularity: number;
  dateAdded: string;
  readLink: string;
  count: number;
}

const BorrowDialog: React.FC<BorrowDialogProps> = ({ book, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'initial' | 'confirmation'>('initial');
  const [borrowDays, setBorrowDays] = useState('1');
  const [purpose, setPurpose] = useState('');
  const currentDate = new Date();
  const dueDate = addDays(currentDate, parseInt(borrowDays));

  const handleProceed = () => {
    if (!purpose.trim()) {
      alert('Please enter the purpose of borrowing');
      return;
    }
    setStep('confirmation');
  };

  const handleFinish = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: book.id,
          days: parseInt(borrowDays),
          purpose: purpose
        }),
      });

      if (response.ok) {
        // Successfully borrowed the book
        onClose();
        navigate('/student/dashboard');
      } else {
        const errorData = await response.json();
        alert(`Failed to borrow book: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error borrowing book:', error);
      alert('An error occurred while borrowing the book. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Borrow Book</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 'initial' ? (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-2">
                Current Date: {format(currentDate, 'MMMM d, yyyy')}
              </p>
            </div>

            <div>
              <label htmlFor="borrowDays" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Days to Borrow
              </label>
              <select
                id="borrowDays"
                value={borrowDays}
                onChange={(e) => setBorrowDays(e.target.value)}
                className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'day' : 'days'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
                Purpose of Borrowing
              </label>
              <textarea
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your purpose for borrowing this book..."
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleProceed}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Proceed
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Borrowing Confirmed!</h3>
              <p className="text-green-700">
                Due Date: {format(dueDate, 'MMMM d, yyyy')}
              </p>
              <p className="text-red-600 font-medium mt-2">
                Fine per day in case of late submission: 30/-
              </p>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleFinish}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Finish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BookCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  const categories = [
    {
      name: 'Finance',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500',
      description: 'Books about personal finance, investing, and economics'
    },
    {
      name: 'Self Development',
      image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=500',
      description: 'Personal growth and self-improvement books'
    },
    {
      name: 'Productivity',
      image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500',
      description: 'Time management and efficiency optimization'
    },
    {
      name: 'Technology',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500',
      description: 'Programming, AI, and digital transformation'
    },
    {
      name: 'Business',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500',
      description: 'Entrepreneurship and business strategy'
    },
    {
      name: 'Science',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500',
      description: 'Scientific discoveries and research'
    }
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  
    fetchBooks();
  }, []);

  // Add a listener to update book status when a book is borrowed
  useEffect(() => {
    const handleBorrowEvent = (event: any) => {
      if (event.detail && event.detail.bookId) {
        setBooks(prevBooks =>
          prevBooks.map(book =>
            book.id === event.detail.bookId ? { ...book, status: 'not available' } : book
          )
        );
      }
    };

    window.addEventListener('bookBorrowed', handleBorrowEvent);
    return () => {
      window.removeEventListener('bookBorrowed', handleBorrowEvent);
    };
  }, []);

  const filterBooks = () => {
    let filteredBooks = [...books];

    if (searchQuery) {
      filteredBooks = filteredBooks.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredBooks = filteredBooks.filter(book => book.category === selectedCategory);
    }

    switch (selectedFilter) {
      case 'popularity':
        return filteredBooks.sort((a, b) => b.popularity - a.popularity);
      case 'latest':
        return filteredBooks.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      default:
        return filteredBooks;
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowCategoryModal(false);
  };

  const handleBorrow = (book: Book) => {
    if (book.status === 'available') {
      setSelectedBook(book);
    } else {
      alert('This book is not available for borrowing.');
    }
  };

  const handleBookBorrowed = (bookId: number) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === bookId ? { ...book, status: 'not available' } : book
      )
    );
    
    const borrowEvent = new CustomEvent('bookBorrowed', {
      detail: { bookId }
    });
    window.dispatchEvent(borrowEvent);
  };

  const onDialogClosed = (bookId?: number) => {
    if (bookId) {
      handleBookBorrowed(bookId);
    }
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Book Catalog</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setShowCategoryModal(true)}
            className={`flex items-center px-4 py-2 rounded-lg ${
              selectedCategory ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
            } border border-gray-300 hover:bg-indigo-50 transition-colors`}
          >
            <Filter className="w-4 h-4 mr-2" />
            {selectedCategory || 'Select Category'}
          </button>
          <button
            onClick={() => setSelectedFilter('popularity')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              selectedFilter === 'popularity' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
            } border border-gray-300 hover:bg-indigo-50 transition-colors`}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Popular
          </button>
          <button
            onClick={() => setSelectedFilter('latest')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              selectedFilter === 'latest' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
            } border border-gray-300 hover:bg-indigo-50 transition-colors`}
          >
            <Clock className="w-4 h-4 mr-2" />
            Latest
          </button>
          {(selectedFilter !== 'all' || selectedCategory) && (
            <button
              onClick={() => {
                setSelectedFilter('all');
                setSelectedCategory('');
              }}
              className="flex items-center px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterBooks().map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={book.cover} alt={book.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-lg mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-2">by {book.author}</p>
                <p className="text-gray-600 mb-2">Category: {book.category}</p>
                <p className="text-gray-600 mb-2">Count: {book.count}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    book.status === 'available' 
                      ? 'bg-green-100 text-green-800 border border-green-500' 
                      : 'bg-red-100 text-red-800 border border-red-500'
                  }`}>
                    {book.status}
                  </span>
                  <a
                    href={book.readLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 hover:text-indigo-700"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Read
                  </a>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBorrow(book)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                    disabled={book.status !== 'available'}
                  >
                    Borrow
                  </button>
                  <button
                    className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition-colors"
                    disabled={book.status !== 'available'}
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Selection Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[800px] max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Select Category</h2>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleCategorySelect(category.name)}
                    className={`flex items-start space-x-4 p-4 rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-indigo-50 border-2 border-indigo-600'
                        : 'bg-white border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Borrow Dialog */}
        {selectedBook && (
          <BorrowDialog
            book={selectedBook}
            onClose={() => onDialogClosed()}
          />
        )}
      </div>
    </div>
  );
};

export default BookCatalog;