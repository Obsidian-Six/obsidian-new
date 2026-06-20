const express = require('express');
const router = express.Router();
const { logDocumentAccess, requestBrochure } = require('../controllers/documentController');

// Public route to capture email and log access to a protected document
router.post('/access', logDocumentAccess);

// Public route to request brochure and email it to the user
router.post('/brochure', requestBrochure);

module.exports = router;
