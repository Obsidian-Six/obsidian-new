const express = require('express');
const router = express.Router();
const {
  getPublishedBlogs,
  getBlogBySlug,
  getAllBlogsAdmin,
  getBlogByIdAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadBlogImage,
  importFromWordPress,
} = require('../controllers/blogController');
const { adminOrApiKey } = require('../middleware/authMiddleware');
const { uploadWrapper } = require('../middleware/uploadMiddleware');

// Public: live posts only
router.get('/', getPublishedBlogs);
router.get('/slug/:slug', getBlogBySlug);

// Admin panel (Bearer token) or automation (x-api-key header)
router.get('/admin/all', adminOrApiKey, getAllBlogsAdmin);
router.get('/admin/:id', adminOrApiKey, getBlogByIdAdmin);
router.post('/', adminOrApiKey, createBlog);
router.post('/upload', adminOrApiKey, uploadWrapper('image'), uploadBlogImage);
router.post('/import/wordpress', adminOrApiKey, importFromWordPress);
router.put('/:id', adminOrApiKey, updateBlog);
router.delete('/:id', adminOrApiKey, deleteBlog);

module.exports = router;
