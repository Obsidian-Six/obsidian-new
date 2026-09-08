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

// --- NEW CODE: BROCHURE EMAILING CONTROLLER ---
const path = require('path');
const fs = require('fs');
const Enquiry = require('../models/Enquiry');

// Helper to send the brochure to user's email via SMTP
async function sendUserBrochureEmail(userEmail, firstName) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const brochurePath = path.join(__dirname, '..', '..', 'Frontend', 'public', 'Obs_brochure.pdf');
  const attachments = [];

  if (fs.existsSync(brochurePath)) {
    attachments.push({
      filename: 'Obsidian_Six_Brochure.pdf',
      path: brochurePath
    });
  } else {
    console.warn(`Brochure file not found at path: ${brochurePath}`);
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || 'admin@obsidiansix.com',
    to: userEmail,
    subject: `Your Obsidian Six Brochure Request`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #052D69; margin-bottom: 20px;">Hello ${firstName || 'there'},</h2>
        <p>Thank you for requesting the official Obsidian Six company brochure!</p>
        <p>We are excited to partner with you on your digital transformation journey. In this brochure, you'll find information about our core services, including branding, digital marketing, website development, and IT solutions.</p>
        <p>We have attached the brochure PDF directly to this email. You can also view or download it at any time using the link below:</p>
        <div style="margin: 30px 0; text-align: center;">
          <a href="https://obsidiansix.com/Obs_brochure.pdf" style="background-color: #052D69; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Download Brochure Link</a>
        </div>
        <p>If you have any questions or would like to schedule a strategy session, please feel free to email us at <a href="mailto:info@obsidiansix.com" style="color: #052D69;">info@obsidiansix.com</a> or call us at <a href="tel:+918085652729" style="color: #052D69;">+91 80856 52729</a>.</p>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
        <p style="font-size: 12px; color: #666;">Best regards,<br /><strong>The Strategy Team</strong><br />Obsidian Six</p>
      </div>
    `,
    attachments
  };

  await transporter.sendMail(mailOptions);
}

const requestBrochure = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least an email address',
      });
    }

    // 1. Log request as a new lead/enquiry in MongoDB
    const enquiry = await Enquiry.create({
      firstName: firstName || '',
      lastName: lastName || '',
      email,
      phone: phone || '',
      selectedServices: ['Brochure Request'],
      status: 'new'
    });

    // 2. Email brochure to user
    await sendUserBrochureEmail(email, firstName);

    // 3. Notify admin (info@obsidiansix.com) using FormSubmit.co
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
          _subject: `New Brochure Request: ${firstName || ''} ${lastName || ''}`,
          'User Name': `${firstName || ''} ${lastName || ''}`,
          'User Email': email,
          Phone: phone || 'Not Provided',
          'Request Type': 'Brochure Request',
          Timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
        }),
      });
    } catch (emailError) {
      console.error('Admin Notification Error:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Brochure request processed successfully and email sent',
      data: enquiry,
    });
  } catch (error) {
    console.error('Request Brochure Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = {
  logDocumentAccess,
  requestBrochure,
};
