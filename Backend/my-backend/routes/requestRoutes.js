const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BookRequest = require('../models/BookRequest');
const Book = require('../models/Book');
const Activity = require('../models/Activity');
const Notification = require('../models/Notification');

// Get all book requests
router.get('/', async (req, res) => {
  try {
    const requests = await BookRequest.find().sort({ requestDate: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// Create a new book request
router.post('/', async (req, res) => {
  try {
    const newRequest = new BookRequest({
      userId: req.body.userId,
      bookId: req.body.bookId,
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      bookTitle: req.body.bookTitle,
      borrowDays: req.body.borrowDays || 1,
      purpose: req.body.purpose || 'No purpose specified',
      status: 'pending',
      requestDate: new Date()
    });
    const savedRequest = await newRequest.save();

    // Create notification for admin
    const notification = new Notification({
      userId: 'admin',
      message: `New borrow request for "${req.body.bookTitle}"`,
      type: 'info'
    });
    await notification.save();

    res.status(201).json({
      success: true,
      message: 'Request created successfully',
      request: savedRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create request',
      error: error.message
    });
  }
});
router.post('/res', async (req, res) => {
  try {
    const newRequest = new BookRequest({
      userId: req.body.userId,
      bookId: req.body.bookId,
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      bookTitle: req.body.bookTitle,
      borrowDays: req.body.borrowDays || 1,
      purpose: req.body.purpose || 'No purpose specified',
      status: 'pending',
      requestDate: new Date()
    });
    const savedRequest = await newRequest.save();

    // Create notification for admin
    const notification = new Notification({
      userId: 'admin',
      message: `New Reserve request for "${req.body.bookTitle}"`,
      type: 'info'
    });
    await notification.save();

    res.status(201).json({
      success: true,
      message: 'Request created successfully',
      request: savedRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create request',
      error: error.message
    });
  }
});

// Update request status (approve/reject)
router.put('/:requestId', async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Status must be either approved or rejected'
      });
    }

    const request = await BookRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Request not found'
      });
    }

    // Update request status
    request.status = status;
    const updatedRequest = await request.save();

    // Create notification for user with appropriate message and type
    const notificationMessage = status === 'approved'
      ? `Your request to borrow "${request.bookTitle}" has been approved! You can collect the book from the library.`
      : `Your request to borrow "${request.bookTitle}" has been rejected. Please contact the librarian for more information.`;

    const notification = new Notification({
      userId: request.userId,
      message: notificationMessage,
      type: status === 'approved' ? 'success' : 'info',
      read: false,
      createdAt: new Date()
    });
    await notification.save();

    // If approved, update book availability
    if (status === 'approved') {
      const book = await Book.findById(request.bookId);
      if (book) {
        book.count = Math.max(0, book.count - 1);
        book.status = book.count > 0 ? 'available' : 'not available';
        await book.save();
      }
    }

    res.json({
      success: true,
      message: `Request ${status} successfully`,
      request: updatedRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || `Failed to update request`
    });
  }
});


// Mark a book as returned or overdue
// Mark a book as returned or overdue
router.put('/:requestId/return', async (req, res) => {
  try {
    const { requestId } = req.params;
    const { returnStatus, userId, bookTitle } = req.body;

    // Find the request
    const request = await BookRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ success: false, error: 'Request not found' });
    }

    // If returned, increase book count and delete the request
    if (returnStatus === 'returned') {
      const book = await Book.findById(request.bookId);
      if (book) {
        book.count += 1;
        book.status = 'available';
        await book.save();
      }
      
      // Create notification for user
      const notification = new Notification({
        userId: request.userId,
        message: `Your book "${request.bookTitle}" has been returned successfully.`,
        type: 'success',
        read: false,
        createdAt: new Date()
      });
      await notification.save();
      
      // Log this activity
      await Activity.create({
        action: 'return',
        bookId: request.bookId,
        userId: request.userId,
        details: `Book "${request.bookTitle}" marked as returned by admin`,
        timestamp: new Date()
      });
      
      // Delete the request instead of updating it
      await BookRequest.findByIdAndDelete(requestId);
    } else if (returnStatus === 'overdue') {
      // Just update the status for overdue books
      request.returnStatus = returnStatus;
      await request.save();
      
      // Create notification for user
      const notification = new Notification({
        userId: request.userId,
        message: `The book "${request.bookTitle}" is overdue. Please return it as soon as possible to avoid penalties.`,
        type: 'warning',
        read: false,
        createdAt: new Date()
      });
      await notification.save();
    }

    res.json({ 
      success: true, 
      message: `Book marked as ${returnStatus} successfully.`,
      bookId: request.bookId // Include bookId in response for frontend updates
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});




// Get requests for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const requests = await BookRequest.find({ userId }).sort({ requestDate: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user requests' });
  }
});

// Get requests for a specific user, fully populated
router.get('/userrequests/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const requests = await BookRequest.find({
      userId: userId
    }).populate('bookId');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;
