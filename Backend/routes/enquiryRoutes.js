const express = require('express');
const router = express.Router();
const {
  submitEnquiry,
  getEnquiries,
  updateEnquiryStatus,
} = require('../controllers/enquiryController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public route to submit an enquiry (lead capture)
router.post('/', submitEnquiry);

// Protected routes (Admin only)
router.get('/', protect, authorize('admin'), getEnquiries);
router.put('/:id', protect, authorize('admin'), updateEnquiryStatus);

module.exports = router;
