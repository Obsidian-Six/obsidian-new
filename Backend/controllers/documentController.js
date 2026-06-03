const nodemailer = require('nodemailer');
const DocumentAccess = require('../models/DocumentAccess');

// Helper to send email notification via SMTP
async function sendAccessEmail(userEmail, documentName) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER ,
      pass: process.env.SMTP_PASS ,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || 'admin@obsidiansix.com',
    to: process.env.SMTP_TO || 'admin@obsidiansix.com',
    subject: `Protected Document Viewed: ${documentName}`,
    text: `User ${userEmail} has accessed the document: ${documentName}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('SMTP email send error:', err);
  }
}



const logDocumentAccess = async (req, res) => {
  try {
    const { email, documentName } = req.body;

    // Validation
    if (!email || !documentName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and documentName',
      });
    }

    // Save access log to MongoDB database
    const accessLog = await DocumentAccess.create({
        email,
        documentName,
      });
      // Send notification email via SMTP
      await sendAccessEmail(email, documentName);

    // Notify info@obsidiansix.com using FormSubmit.co
    const ENQUIRY_EMAIL = 'info@obsidiansix.com';
    const submitUrl = `https://formsubmit.co/ajax/${encodeURIComponent(ENQUIRY_EMAIL)}`;

    try {
      await fetch(submitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Protected Document Viewed: ${documentName}`,
          'User Email': email,
          'Document Name': documentName,
          'Access Timestamp': new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
        }),
      });
    } catch (emailError) {
      // Log the email notification error but don't fail the API request (since DB record is saved successfully)
      console.error('Email Notification Error:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Access logged successfully',
      data: accessLog,
    });
  } catch (error) {
    console.error('Log Document Access Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = {
  logDocumentAccess,
};
