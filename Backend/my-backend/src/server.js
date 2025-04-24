const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const studentRoutes = require('../routes/studentRoutes');
const adminRoutes = require('../routes/adminRoutes');
const requestRoutes = require('../routes/requestRoutes');
const notificationRoutes = require('../routes/notificationRoutes');
const Book = require('../models/Book');
const Activity = require('../models/Activity');
const BookRequest = require('../models/BookRequest');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/notifications', notificationRoutes);

// Get dashboard data
app.get('/api/dashboard', async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const recentActivities = await Activity.find()
      .sort({ timestamp: -1 })
      .limit(5)
      .lean();

    // Format the activities
    const formattedActivities = recentActivities.map(activity => ({
      action: activity.action,
      details: activity.details,
      time: formatTimeAgo(activity.timestamp)
    }));

    res.json({
      totalBooks,
      recentActivities: formattedActivities
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Get all books
app.get('/api/books', async (req, res) => {
  try {
    const { sort } = req.query;
    let books;
    
    if (sort === 'latest') {
      books = await Book.find().sort({ createdAt: -1 }); // Sort by createdAt descending (latest first)
    } else {
      books = await Book.find(); // No sorting, return in natural order
    }
    
    console.log('Fetched books:', books.map(book => ({
      title: book.title,
      createdAt: book.createdAt
    })));
    
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Get book by title
app.get('/api/books/title/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const book = await Book.findOne({ title: title.trim() });
    
    if (!book) {
      return res.status(404).json({ details: 'Book not found with the given title' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ details: error.message || 'Internal server error' });
  }
});

// Add a new book
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, category, description, cover, count } = req.body;
    
    // Check if book with same title already exists
    const existingBook = await Book.findOne({ title: title.trim() });
    if (existingBook) {
      return res.status(400).json({ details: 'A book with this title already exists' });
    }

    // Validate count
    const bookCount = count !== undefined ? parseInt(count) : 0;
    if (isNaN(bookCount)) {
      return res.status(400).json({ details: 'Count must be a valid number' });
    }

    const newBook = new Book({ 
      title: title.trim(), 
      author: author.trim(), 
      category: category.trim(), 
      description: description.trim(), 
      cover: cover.trim(),
      count: bookCount
    });
    
    const savedBook = await newBook.save();

    // Log the activity
    await new Activity({
      action: 'Book Added',
      details: `${title} by ${author}`
    }).save();

    res.status(201).json(savedBook);
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(400).json({ details: err.message || 'Failed to add book' });
  }
});

// Update a book by title
app.put('/api/books/title/:title', async (req, res) => {
  try {
    const { title } = req.params; // This is the original title
    const updateFields = req.body;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ details: 'No fields provided for update' });
    }

    // If title is being updated, check if new title already exists (excluding the current book)
    if (updateFields.title && updateFields.title.trim() !== title.trim()) {
      const existingBook = await Book.findOne({ 
        title: updateFields.title.trim(),
        _id: { $ne: (await Book.findOne({ title: title.trim() }))?._id } 
      });
      
      if (existingBook) {
        return res.status(400).json({ details: 'A book with this new title already exists' });
      }
    }

    // Trim all string fields in updateFields
    Object.keys(updateFields).forEach(key => {
      if (typeof updateFields[key] === 'string') {
        updateFields[key] = updateFields[key].trim();
      }
    });

    // If count is being updated, ensure it's a number and update status accordingly
    if (updateFields.count !== undefined) {
      updateFields.count = parseInt(updateFields.count);
      if (isNaN(updateFields.count)) {
        return res.status(400).json({ details: 'Count must be a valid number' });
      }
      // Update status based on count
      updateFields.status = updateFields.count > 0 ? 'available' : 'not available';
    }

    const updated = await Book.findOneAndUpdate(
      { title: title.trim() },
      { $set: updateFields },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ details: 'Book not found with the given title' });
    }

    // Log the activity
    await new Activity({
      action: 'Book Updated',
      details: `${updateFields.title || title} by ${updateFields.author || updated.author}`
    }).save();

    res.json(updated);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ details: error.message || 'Internal server error' });
  }
});

// Delete a book by title
app.delete('/api/books/title/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const deleted = await Book.findOneAndDelete({ title: title.trim() });

    if (!deleted) {
      return res.status(404).json({ details: 'Book not found with the given title' });
    }

    // Log the activity
    await new Activity({
      action: 'Book Deleted',
      details: `${deleted.title} by ${deleted.author}`
    }).save();

    res.json({ details: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ details: error.message || 'Internal server error' });
  }
});

// Helper function to format time ago
function formatTimeAgo(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}

// Root route
app.get('/', (req, res) => {
  res.send("Hello");
});

// Get count of pending requests
app.get('/api/requests/pending/count', async (req, res) => {
  try {
    const count = await BookRequest.countDocuments({ status: 'pending' });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pending count' });
  }
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
