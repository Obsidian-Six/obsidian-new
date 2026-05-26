const Enquiry = require('../models/Enquiry');

// @desc    Submit a new contact enquiry
// @route   POST /api/enquiries
// @access  Public
const submitEnquiry = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      selectedServices,
      companyName,
      companyWebsite,
    } = req.body;

    // Validation
    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least email and phone number',
      });
    }

    const enquiry = await Enquiry.create({
      firstName,
      lastName,
      email,
      phone,
      selectedServices: selectedServices || [],
      companyName,
      companyWebsite,
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: enquiry,
    });
  } catch (error) {
    console.error('Submit Enquiry Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort('-createdAt');
    res.json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error('Get Enquiries Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id
// @access  Private/Admin
const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    const allowedStatuses = ['new', 'contacted', 'resolved', 'ignored'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    res.json({
      success: true,
      message: 'Enquiry status updated',
      data: enquiry,
    });
  } catch (error) {
    console.error('Update Enquiry Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  submitEnquiry,
  getEnquiries,
  updateEnquiryStatus,
};
