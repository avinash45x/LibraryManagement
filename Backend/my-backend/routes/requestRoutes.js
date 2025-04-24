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
    console.log('Received request body:', req.body);
    
    // Create new request with minimal required fields
    const newRequest = new BookRequest({
      userId: req.body.userId,
      bookId: req.body.bookId,
      userName:req.body.userName,
      userEmail:req.body.userEmail,
      bookTitle: req.body.bookTitle,
      borrowDays: req.body.borrowDays || 1,
      purpose: req.body.purpose || 'No purpose specified',
      status: 'pending',
      requestDate: new Date()
    });

    console.log('Attempting to save request:', newRequest);
    const savedRequest = await newRequest.save();
    console.log('Request saved successfully:', savedRequest);

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
    console.error('Error in request creation:', error);
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

    console.log(`Updating request ${requestId} to status: ${status}`);

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
    console.error('Error updating request:', error);
    res.status(500).json({
      success: false,
      error: error.message || `Failed to update request`
    });
  }
});

router.get
// Get requests for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Fetching requests for user:', userId);
    const requests = await BookRequest.find({ userId }).sort({ requestDate: -1 });
    console.log('Found requests:', requests);
    res.json(requests);
  } catch (error) {
    console.error('Error fetching user requests:', error);
    res.status(500).json({ error: 'Failed to fetch user requests' });
  }
});

router.get('/userrequests/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const requests = await BookRequest.find({
      userId: userId
    });
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router; 