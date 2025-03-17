export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
  avatarUrl?: string; // Added for backward compatibility
  name?: string; // Added for backward compatibility
  department?: string;
  isActive: boolean;
  theme?: ThemeType; // Added for theme support
  colorScheme?: ColorScheme; // Added for theme support
}

// Add the missing ThemeType and ColorScheme types
export type ThemeType = 'light' | 'dark' | 'system';
export type ColorScheme = 'blue' | 'green' | 'purple' | 'orange' | 'pink';

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: CandidateStatus;
  position: string;
  department?: string;
  source?: string;
  appliedDate: string;
  skills: Skill[];
  resumeUrl?: string;
  documents?: Document[];
  availability?: TimeSlot[];
  timeZone?: string;
}

export type CandidateStatus = 
  | 'Applied' 
  | 'Screening' 
  | 'Technical' 
  | 'Cultural' 
  | 'Offer' 
  | 'Hired' 
  | 'Rejected';

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  position: string;
  type: InterviewType;
  status: InterviewStatus;
  date: string;
  startTime: string;
  endTime: string;
  interviewers: string[];
  location?: string;
  videoLink?: string;
  notes?: string;
  timeZone?: string;
  conferencing?: VideoConferencing;
  documents?: Document[];
  feedback?: Feedback[];
  isAiRecommended?: boolean;
}

export type InterviewType = 
  | 'Screening' 
  | 'Technical' 
  | 'Behavioral' 
  | 'Cultural' 
  | 'Final'
  | 'HR'
  | 'Panel'
  | 'Group'
  | 'One-on-One'
  | 'Coding Assessment'
  | 'Case Study'
  | 'Portfolio Review';

export type InterviewStatus = 
  | 'Scheduled' 
  | 'Confirmed' 
  | 'Completed' 
  | 'Canceled' 
  | 'Rescheduled' 
  | 'No Show'
  | 'In Progress'
  | 'Pending Feedback';

export interface Feedback {
  id: string;
  interviewId: string;
  evaluatorId: string;
  evaluatorName: string;
  overallRating: number;
  recommendation: Recommendation;
  strengths?: string;
  weaknesses?: string;
  notes?: string;
  submittedAt: string;
  categories?: FeedbackCategory[];
}

export interface FeedbackCategory {
  name: string;
  rating: number;
  comments?: string;
}

export type Recommendation = 
  | 'Strong Hire' 
  | 'Hire' 
  | 'Neutral' 
  | 'No Hire' 
  | 'Strong No Hire';

export interface Offer {
  id: string;
  candidateId: string;
  candidateName: string;
  position: string;
  department: string;
  status: OfferStatus;
  salary: number;
  startDate?: string;
  expirationDate: string;
  notes?: string;
}

export type OfferStatus = 
  | 'Draft' 
  | 'Pending Approval' 
  | 'Approved' 
  | 'Sent' 
  | 'Accepted' 
  | 'Declined' 
  | 'Expired';

export interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  subject: string;
  timestamp: string;
}

// New types for advanced interview scheduling
export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  day: string;
  isAvailable: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  url: string;
  uploadedAt: string;
}

export type DocumentType = 
  | 'Resume' 
  | 'Cover Letter' 
  | 'Portfolio' 
  | 'Certificate' 
  | 'Other';

export interface VideoConferencing {
  platform: VideoConferencingPlatform;
  link: string;
  meetingId?: string;
  password?: string;
}

export type VideoConferencingPlatform = 
  | 'Zoom' 
  | 'Google Meet' 
  | 'Microsoft Teams' 
  | 'Custom';

export interface AdvancedInterview extends Interview {
  timeZone: string;
  videoConferencing: VideoConferencing;
  documents: Document[];
  aiRecommendations?: AIRecommendations;
  notifications: NotificationSettings;
  atsIntegration?: ATSIntegration;
}

export interface AIRecommendations {
  recommendedSlots: TimeSlot[];
  recommendedInterviewers: string[];
  recommendedFormat: InterviewType;
  reasonings: string[];
}

export interface NotificationSettings {
  sendEmail: boolean;
  sendSMS: boolean;
  sendPush: boolean;
  reminderTimes: number[]; // hours before interview
}

export interface ATSIntegration {
  system: string;
  syncEnabled: boolean;
  lastSynced?: string;
}

export interface InterviewReport {
  id: string;
  title: string;
  generatedAt: string;
  metrics: {
    totalInterviews: number;
    completionRate: number;
    hireRate: number;
    avgFeedbackScore: number;
    timeToHire: number;
  };
  charts: any[];
  insights: string[];
}
