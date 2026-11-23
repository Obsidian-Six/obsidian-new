const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify token and attach user to req object
const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (split "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not set');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token, exclude password from payload
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

// Allow either a logged-in admin (Bearer token) or an automation client
// that sends the BLOG_API_KEY in the "x-api-key" header.
const crypto = require('crypto');
const adminOrApiKey = (req, res, next) => {
  const key = req.headers['x-api-key'];
  const expected = process.env.BLOG_API_KEY;
  if (key && expected && expected.length >= 24) {
    const a = Buffer.from(String(key));
    const b = Buffer.from(expected);
    if (a.length === b.length && crypto.timingSafeEqual(a, b)) {
      req.user = { _id: null, name: 'API automation', role: 'admin', viaApiKey: true };
      return next();
    }
    return res.status(401).json({ success: false, message: 'Invalid API key' });
  }
  return protect(req, res, () => authorize('admin')(req, res, next));
};

// Grant access to specific roles (e.g. authorize('admin'))
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user ? req.user.role : 'none'}' is not authorized to access this route`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize, adminOrApiKey };
