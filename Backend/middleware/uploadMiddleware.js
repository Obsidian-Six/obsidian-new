const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ------------------------------------------------------------------
// Absolute path – the exact folder that is bind‑mounted in Docker
// ------------------------------------------------------------------
const uploadDir = '/app/uploads';

// Ensure the folder exists (defensive – Dockerfile also creates it)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ------------------------------------------------------------------
// Multer storage configuration
// ------------------------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// ------------------------------------------------------------------
// Allowed mime/types (images & videos)
// ------------------------------------------------------------------
const allowed = /jpeg|jpg|png|gif|webp|svg|mp4|mov|avi|wmv|flv|mkv/;
const fileFilter = (req, file, cb) => {
  const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimeOk = allowed.test(file.mimetype);
  extOk && mimeOk ? cb(null, true) : cb(new Error('Only image/video files allowed'), false);
};

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MiB
  fileFilter,
});

/* --------------------------------------------------------------
   Export a wrapper that adds **Multer‑error handling** so the route
   does not leak a generic “access tracking storage failure”.
   The wrapper returns a middleware that calls `next(err)` on any
   Multer error; the global error‑handler (added in server.js) will
   turn it into a clean JSON response.
   -------------------------------------------------------------- */
const uploadWrapper = (fieldName) => (req, res, next) => {
  const handler = upload.single(fieldName);
  handler(req, res, (err) => {
    if (err) {
      const status = err.code?.startsWith('LIMIT') ? 400 : 500;
      return res.status(status).json({
        success: false,
        message: err.message || 'File upload error',
        code: err.code || 'UPLOAD_ERROR',
      });
    }
    next();
  });
};

module.exports = {
  upload,            // raw Multer instance (if needed elsewhere)
  uploadWrapper,     // convenient middleware for routes
};
