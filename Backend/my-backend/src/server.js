const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const studentRoutes = require('../routes/studentRoutes');
const adminRoutes = require('../routes/adminRoutes');
const Book = require('../models/Book');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);


  app.get('/api/books', async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch books' });
    }
  });
  
  // ➕ ADD a new book
  app.post('/api/books', async (req, res) => {
    try {
      const { title, author, category, description, cover } = req.body;
      const newBook = new Book({ title, author, category, description, cover });
      await newBook.save();
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ error: 'Failed to add book', details: err.message });
    }
  });
  
  // ✏️ UPDATE a book by ID
// PATCH is semantically better for partial updates
// PUT /api/books/title/:title
// PUT /api/books/title/:title
app.put('/api/books/title/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const updateFields = req.body;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ details: 'No fields provided for update' });
    }

    const updated = await Book.findOneAndUpdate(
      { title: title.trim() },
      { $set: updateFields },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ details: 'Book not found with the given title' });
    }

    res.json({ message: 'Book updated successfully', book: updated });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ details: 'Internal server error' });
  }
});


  
  // DELETE /api/books/title/:title
app.delete('/api/books/title/:title', async (req, res) => {
  try {
    const { title } = req.params;

    const deleted = await Book.findOneAndDelete({ title: title.trim() });

    if (!deleted) {
      return res.status(404).json({ details: 'Book not found with the given title' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ details: 'Internal server error' });
  }
});


  app.get('/',(req,res)=>{
    res.send("Hello");
  })
  
  // 🚀 Start server
  app.listen(5000, () => {
    console.log('Server is running onnnn http://localhost:5000');
  });
  

  mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on portttt ${PORT}`)))
  .catch(err => console.error(err));
