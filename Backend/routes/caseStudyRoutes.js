const express = require('express');
const router = express.Router();
const {
  createCaseStudy,
  getCaseStudies,
  getCaseStudyBySlug,
  updateCaseStudy,
  deleteCaseStudy,
  uploadCaseStudyImage,
} = require('../controllers/caseStudyController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getCaseStudies);
router.get('/slug/:slug', getCaseStudyBySlug);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), createCaseStudy);
router.post('/upload', protect, authorize('admin'), upload.single('image'), uploadCaseStudyImage);
router.put('/:id', protect, authorize('admin'), updateCaseStudy);
router.delete('/:id', protect, authorize('admin'), deleteCaseStudy);

module.exports = router;
