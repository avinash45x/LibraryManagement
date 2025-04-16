import React, { useState } from 'react';
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
  status: string;
  category: string;
  popularity: number;
  dateAdded: string;
  readLink: string;
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

  const handleFinish = () => {
    onClose();
    navigate('/student/dashboard');
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

  const books = [
    // Finance Books
    {
      id: 1,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200',
      status: 'Available',
      category: 'Finance',
      popularity: 95,
      dateAdded: '2024-03-01',
      readLink: 'https://www.amazon.com/Psychology-Money-Timeless-Lessons-Happiness/dp/0857197681'
    },
    {
      id: 2,
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      cover: 'https://images.unsplash.com/photo-1601823984263-b87b59798b00?w=200',
      status: 'Available',
      category: 'Finance',
      popularity: 92,
      dateAdded: '2024-03-10',
      readLink: 'https://www.amazon.com/Rich-Dad-Poor-Teach-Middle/dp/1612680194'
    },
    // Self Development Books
    {
      id: 3,
      title: 'Atomic Habits',
      author: 'James Clear',
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200',
      status: 'Available',
      category: 'Self Development',
      popularity: 98,
      dateAdded: '2024-03-15',
      readLink: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299'
    },
    {
      id: 4,
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200',
      status: 'Available',
      category: 'Self Development',
      popularity: 90,
      dateAdded: '2024-02-28',
      readLink: 'https://www.amazon.com/Think-Grow-Rich-Napoleon-Hill/dp/0785833528'
    },
    // Productivity Books
    {
      id: 5,
      title: 'Deep Work',
      author: 'Cal Newport',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200',
      status: 'Borrowed',
      category: 'Productivity',
      popularity: 88,
      dateAdded: '2024-02-20',
      readLink: 'https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692'
    },
    {
      id: 6,
      title: 'Getting Things Done',
      author: 'David Allen',
      cover: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=200',
      status: 'Available',
      category: 'Productivity',
      popularity: 85,
      dateAdded: '2024-03-05',
      readLink: 'https://www.amazon.com/Getting-Things-Done-Stress-Free-Productivity/dp/0143126563'
    },
    // Technology Books
    {
      id: 7,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      cover: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=200',
      status: 'Available',
      category: 'Technology',
      popularity: 94,
      dateAdded: '2024-03-12',
      readLink: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882'
    },
    {
      id: 8,
      title: 'The Pragmatic Programmer',
      author: 'David Thomas',
      cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200',
      status: 'Available',
      category: 'Technology',
      popularity: 91,
      dateAdded: '2024-03-08',
      readLink: 'https://www.amazon.com/Pragmatic-Programmer-journey-mastery-Anniversary/dp/0135957052'
    },
    // Business Books
    {
      id: 9,
      title: 'Zero to One',
      author: 'Peter Thiel',
      cover: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200',
      status: 'Available',
      category: 'Business',
      popularity: 93,
      dateAdded: '2024-03-18',
      readLink: 'https://www.amazon.com/Zero-One-Notes-Startups-Future/dp/0804139296'
    },
    {
      id: 10,
      title: 'Good to Great',
      author: 'Jim Collins',
      cover: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200',
      status: 'Available',
      category: 'Business',
      popularity: 89,
      dateAdded: '2024-02-25',
      readLink: 'https://www.amazon.com/Good-Great-Some-Companies-Others/dp/0066620996'
    },
    // Science Books
    {
      id: 11,
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200',
      status: 'Available',
      category: 'Science',
      popularity: 96,
      dateAdded: '2024-03-20',
      readLink: 'https://www.amazon.com/Brief-History-Time-Stephen-Hawking/dp/0553380168'
    },
    {
      id: 12,
      title: 'The Selfish Gene',
      author: 'Richard Dawkins',
      cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200',
      status: 'Available',
      category: 'Science',
      popularity: 87,
      dateAdded: '2024-03-03',
      readLink: 'https://www.amazon.com/Selfish-Gene-Anniversary-Landmark-Science/dp/0198788606'
    }
  ];

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
    setSelectedBook(book);
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
                <p className="text-gray-600 mb-4">Category: {book.category}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    book.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleBorrow(book)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                    disabled={book.status !== 'Available'}
                  >
                    Borrow
                  </button>
                  <button
                    className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition-colors"
                    disabled={book.status !== 'Available'}
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
            onClose={() => setSelectedBook(null)}
          />
        )}
      </div>
    </div>
  );
};

export default BookCatalog;