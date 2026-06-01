const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
const dotenvResult = dotenv.config({ path: path.join(__dirname, '.env') });
if (dotenvResult.error) {
  console.error('Dotenv loading error:', dotenvResult.error);
} else {
  console.log('Loaded env keys:', Object.keys(dotenvResult.parsed || {}));
  console.log('JWT_SECRET exists in process.env:', !!process.env.JWT_SECRET);
}

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors({ origin: '*' }));

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Dev / Production HTTP logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Mount API routers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/case-studies', require('./routes/caseStudyRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));

// Root / Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Obsidian-Six Backend API',
    version: '1.0.0',
    status: 'Running',
  });
});

// 404 Route handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Resource not found' });
});

// Global Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack || err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Only send stack trace in development mode
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'production'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
