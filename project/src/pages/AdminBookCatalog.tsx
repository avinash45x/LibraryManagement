import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Search, Clock, TrendingUp, Filter, X, Info } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  category: string;
  popularity: number;
  dateAdded: string;
  description: string;
}

interface BookDetailsDialogProps {
  book: Book;
  onClose: () => void;
}

const BookDetailsDialog: React.FC<BookDetailsDialogProps> = ({ book, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Book Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <img src={book.cover} alt={book.title} className="w-full h-64 object-cover rounded-lg" />
          <h3 className="text-xl font-semibold">{book.title}</h3>
          <p className="text-gray-600">by {book.author}</p>
          <p className="text-gray-600">Category: {book.category}</p>
          <p className="text-gray-700">{book.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Added: {book.dateAdded}</span>
            <span>Popularity: {book.popularity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminBookCatalog = () => {
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
    {
      id: 1,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200',
      category: 'Finance',
      popularity: 95,
      dateAdded: '2024-03-01',
      description: 'Doing well with money isn\'t necessarily about what you know. It\'s about how you behave. And behavior is hard to teach, even to really smart people. In The Psychology of Money, award-winning author Morgan Housel shares 19 short stories exploring the strange ways people think about money.'
    },
    {
      id: 2,
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      cover: 'https://images.unsplash.com/photo-1601823984263-b87b59798b00?w=200',
      category: 'Finance',
      popularity: 92,
      dateAdded: '2024-03-10',
      description: 'Rich Dad Poor Dad is Robert\'s story of growing up with two dads — his real father and the father of his best friend, his rich dad — and the ways in which both men shaped his thoughts about money and investing.'
    },
    // Add more books here...
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

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
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
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedBook(book)}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Know More
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

        {/* Book Details Dialog */}
        {selectedBook && (
          <BookDetailsDialog
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminBookCatalog;