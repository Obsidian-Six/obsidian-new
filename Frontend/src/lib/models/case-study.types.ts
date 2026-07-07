export interface TwoImageSectionPanel {
  bgImage: string;
  topLabel?: string;
  bottomLabel?: string;
  statusLabel?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface TwoImageSection {
  brandName?: string;
  logoText?: string;
  accentColor?: string;
  leftPanel: TwoImageSectionPanel;
  rightPanel: TwoImageSectionPanel;
}

export interface CaseStudyCaseSection {
  data: string;
  highlight: string;
}

export interface CaseStudyChallengePoint {
  name: string;
  detail: string;
}

export interface CaseStudyChallenge {
  data: string;
  image1: string;
  image2: string;
  point: CaseStudyChallengePoint[];
}

export interface CaseStudyApproachItem {
  name: string;
  detail: string;
}

export interface CaseStudyResultItem {
  img: string;
  title: string;
  highlight: string;
  data: string;
}

export interface CaseStudyImpactItem {
  name: string;
  detail: string;
}

export type CaseStudyPageType = "template" | "custom";

export default interface CaseStudy {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  details: string;
  tags: string[];
  pageType: CaseStudyPageType;
}

export interface GalleryItem {
  img: string;
  text: string;
}

export interface TemplateCaseStudy extends CaseStudy {
  heroImage: string; // hero image
  heroVideo: string;
  overviewVideo:string;
  ChallengeVideo : string,
  ApproachVideo : string,
  ResultVideo:string,
  overview: string;
  caseSection: CaseStudyCaseSection;
  gallery?: GalleryItem[];
  challenge: CaseStudyChallenge;
  approaches: CaseStudyApproachItem[];
  results: CaseStudyResultItem[];
  impacts: CaseStudyImpactItem[];
  detail: string;
  twoImage?: TwoImageSection;
}
