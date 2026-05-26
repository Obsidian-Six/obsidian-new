const CaseStudy = require('../models/CaseStudy');

// @desc    Create a new case study
// @route   POST /api/case-studies
// @access  Private/Admin
const createCaseStudy = async (req, res) => {
  try {
    const { name, slug } = req.body;

    // Generate slug from name if not provided to pre-check uniqueness
    const generatedSlug = slug || name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const existingCase = await CaseStudy.findOne({ slug: generatedSlug });
    if (existingCase) {
      return res.status(400).json({
        success: false,
        message: `Case study with slug '${generatedSlug}' already exists. Please choose a different name or slug.`,
      });
    }

    const caseStudy = await CaseStudy.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Case study created successfully',
      data: caseStudy,
    });
  } catch (error) {
    console.error('Create Case Study Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get all case studies
// @route   GET /api/case-studies
// @access  Public
const getCaseStudies = async (req, res) => {
  try {
    const { category, pageType } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (pageType) filter.pageType = pageType;

    const caseStudies = await CaseStudy.find(filter).sort('-createdAt');

    res.json({
      success: true,
      count: caseStudies.length,
      data: caseStudies,
    });
  } catch (error) {
    console.error('Get Case Studies Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


const getCaseStudyBySlug = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOne({ slug: req.params.slug.toLowerCase() });

    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: 'Case study not found',
      });
    }

    res.json({
      success: true,
      data: caseStudy,
    });
  } catch (error) {
    console.error('Get Case Study by Slug Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Update a case study
// @route   PUT /api/case-studies/:id
// @access  Private/Admin
const updateCaseStudy = async (req, res) => {
  try {
    let caseStudy = await CaseStudy.findById(req.params.id);

    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: 'Case study not found',
      });
    }

    // If slug is changing, check uniqueness
    if (req.body.slug && req.body.slug.toLowerCase() !== caseStudy.slug) {
      const existingSlug = await CaseStudy.findOne({ slug: req.body.slug.toLowerCase() });
      if (existingSlug) {
        return res.status(400).json({
          success: false,
          message: `Slug '${req.body.slug}' is already taken`,
        });
      }
    }

    caseStudy = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: 'Case study updated successfully',
      data: caseStudy,
    });
  } catch (error) {
    console.error('Update Case Study Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Delete a case study
// @route   DELETE /api/case-studies/:id
// @access  Private/Admin
const deleteCaseStudy = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);

    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: 'Case study not found',
      });
    }

    await caseStudy.deleteOne();

    res.json({
      success: true,
      message: 'Case study removed successfully',
      data: {},
    });
  } catch (error) {
    console.error('Delete Case Study Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Upload an image for a case study
// @route   POST /api/case-studies/upload
// @access  Private/Admin
const uploadCaseStudyImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file',
      });
    }

    // Relative path of the image to be stored in the database
    const imagePath = `/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      path: imagePath,
    });
  } catch (error) {
    console.error('Upload Case Study Image Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  createCaseStudy,
  getCaseStudies,
  getCaseStudyBySlug,
  updateCaseStudy,
  deleteCaseStudy,
  uploadCaseStudyImage,
};
