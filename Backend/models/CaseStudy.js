const mongoose = require('mongoose');

const GalleryItemSchema = new mongoose.Schema({
  img: { type: String, default: '' },
  text: { type: String, default: '' }
}, { _id: false });

const CaseSectionSchema = new mongoose.Schema({
  data: { type: String, default: '' },
  highlight: { type: String, default: '' }
}, { _id: false });

const ChallengePointSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  detail: { type: String, default: '' }
}, { _id: false });

const ChallengeSchema = new mongoose.Schema({
  data: { type: String, default: '' },
  image1: { type: String, default: '' },
  image2: { type: String, default: '' },
  point: { type: [ChallengePointSchema], default: [] }
}, { _id: false });

const ApproachItemSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  detail: { type: String, default: '' }
}, { _id: false });

const ResultItemSchema = new mongoose.Schema({
  img: { type: String, default: '' },
  title: { type: String, default: '' },
  highlight: { type: String, default: '' },
  data: { type: String, default: '' }
}, { _id: false });

const ImpactItemSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  detail: { type: String, default: '' }
}, { _id: false });

const PanelSchema = new mongoose.Schema({
  bgImage: { type: String, default: '' },
  topLabel: { type: String, default: '' },
  bottomLabel: { type: String, default: '' },
  statusLabel: { type: String, default: '' },
  titleLine1: { type: String, default: '' },
  titleLine2: { type: String, default: '' },
  description: { type: String, default: '' },
  ctaText: { type: String, default: '' },
  ctaLink: { type: String, default: '' }
}, { _id: false });

const TwoImageSectionSchema = new mongoose.Schema({
  brandName: { type: String, default: '' },
  logoText: { type: String, default: '' },
  accentColor: { type: String, default: '' },
  leftPanel: { type: PanelSchema, default: () => ({}) },
  rightPanel: { type: PanelSchema, default: () => ({}) }
}, { _id: false });

const CaseStudySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a case study name'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Please add a slug'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Please add a card image URL'],
  },
  details: {
    type: String,
    required: [true, 'Please add brief details'],
  },
  tags: {
    type: [String],
    default: [],
  },
  pageType: {
    type: String,
    enum: ['template', 'custom'],
    default: 'template',
  },
  // Template Case Study Specific fields
  heroImage: { type: String, default: '' },
  heroVideo: { type: String, default: '' },
  overviewVideo: { type: String, default: '' },
  ChallengeVideo: { type: String, default: '' },
  ApproachVideo: { type: String, default: '' },
  ResultVideo: { type: String, default: '' },
  overview: { type: String, default: '' },
  caseSection: { type: CaseSectionSchema, default: () => ({}) },
  gallery: { type: [GalleryItemSchema], default: [] },
  challenge: { type: ChallengeSchema, default: () => ({}) },
  approaches: { type: [ApproachItemSchema], default: [] },
  results: { type: [ResultItemSchema], default: [] },
  impacts: { type: [ImpactItemSchema], default: [] },
  detail: { type: String, default: '' },
  twoImage: { type: TwoImageSectionSchema }
}, {
  timestamps: true
});

// Turn any name or typed slug into a clean URL part: "Transforming SHIM Bhopal" -> "transforming-shim-bhopal"
const toSlug = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Always store a clean slug, so a space or capital typed in the admin can never break the link.
CaseStudySchema.pre('validate', function() {
  const source = this.slug || this.name;
  if (source) this.slug = toSlug(source);
});

CaseStudySchema.statics.toSlug = toSlug;

module.exports = mongoose.model('CaseStudy', CaseStudySchema);

