const express = require('express');
const router = express.Router();
const { logDocumentAccess } = require('../controllers/documentController');

// Public route to capture email and log access to a protected document
router.post('/access', logDocumentAccess);

module.exports = router;
