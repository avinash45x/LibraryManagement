// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import Book from './models/Book.js';

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => app.listen(PORT, () => console.log(`Server running`)))
//   .catch(err => console.error(err));

// // Add Book
// app.post('/api/books', async (req, res) => {
//   try {
//     const book = new Book(req.body);
//     await book.save();
//     res.status(201).json(book);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Update Book
// app.put('/api/books/:id', async (req, res) => {
//   try {
//     const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Delete Book
// app.delete('/api/books/:id', async (req, res) => {
//   try {
//     await Book.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Book deleted' });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Get Book by ID (for delete confirmation)
// app.get('/api/books/:id', async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     res.json(book);
//   } catch (err) {
//     res.status(404).json({ error: 'Book not found' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
