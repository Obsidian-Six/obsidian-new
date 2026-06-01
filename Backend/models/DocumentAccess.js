const mongoose = require('mongoose');

const DocumentAccessSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add an email address'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    documentName: {
      type: String,
      required: [true, 'Please add a document name'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('DocumentAccess', DocumentAccessSchema);
