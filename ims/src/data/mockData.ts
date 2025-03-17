
import { 
  Candidate, 
  CandidateStatus, 
  Interview, 
  InterviewType, 
  InterviewStatus, 
  Feedback, 
  Recommendation, 
  Offer, 
  OfferStatus,
  User,
  Activity
} from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    role: "HR Manager",
    avatar: "https://ui-avatars.com/api/?name=John+Doe",
    department: "Human Resources",
    isActive: true
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    firstName: "Jane",
    lastName: "Smith",
    role: "Technical Interviewer",
    avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
    department: "Engineering",
    isActive: true
  },
  {
    id: "3",
    email: "alex.chen@example.com",
    firstName: "Alex",
    lastName: "Chen",
    role: "Hiring Manager",
    avatar: "https://ui-avatars.com/api/?name=Alex+Chen",
    department: "Product",
    isActive: true
  }
];

// Mock Candidates
export const mockCandidates: Candidate[] = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "555-123-4567",
    status: "Technical" as CandidateStatus,
    position: "Frontend Developer",
    department: "Engineering",
    source: "LinkedIn",
    appliedDate: "2023-06-15",
    skills: [
      { id: "1", name: "React", category: "Frontend" },
      { id: "2", name: "TypeScript", category: "Language" },
      { id: "3", name: "CSS", category: "Frontend" }
    ],
    resumeUrl: "/files/sarah_resume.pdf"
  },
  {
    id: "2",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    phone: "555-234-5678",
    status: "Cultural" as CandidateStatus,
    position: "Product Manager",
    department: "Product",
    source: "Referral",
    appliedDate: "2023-06-20",
    skills: [
      { id: "4", name: "Product Strategy", category: "Management" },
      { id: "5", name: "User Research", category: "UX" },
      { id: "6", name: "Agile", category: "Methodology" }
    ],
    resumeUrl: "/files/michael_resume.pdf"
  },
  {
    id: "3",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@example.com",
    phone: "555-345-6789",
    status: "Offer" as CandidateStatus,
    position: "UX Designer",
    department: "Design",
    source: "Design Portfolio",
    appliedDate: "2023-06-10",
    skills: [
      { id: "7", name: "UI Design", category: "Design" },
      { id: "8", name: "User Research", category: "UX" },
      { id: "9", name: "Figma", category: "Tool" }
    ],
    resumeUrl: "/files/emily_resume.pdf"
  }
];

// Mock Interviews
export const mockInterviews: Interview[] = [
  {
    id: "1",
    candidateId: "1",
    candidateName: "Sarah Johnson",
    position: "Frontend Developer",
    type: "Technical" as InterviewType,
    status: "Scheduled" as InterviewStatus,
    date: "2023-07-15",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    interviewers: ["Jane Smith", "Alex Chen"],
    location: "Virtual",
    videoLink: "https://meet.google.com/abc-defg-hij",
    notes: "Focus on React knowledge and state management"
  },
  {
    id: "2",
    candidateId: "2",
    candidateName: "Michael Brown",
    position: "Product Manager",
    type: "Behavioral" as InterviewType,
    status: "Scheduled" as InterviewStatus,
    date: "2023-07-15",
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    interviewers: ["John Doe", "Alex Chen"],
    location: "Virtual",
    videoLink: "https://meet.google.com/klm-nopq-rst",
    notes: "Assess previous project management experience"
  },
  {
    id: "3",
    candidateId: "3",
    candidateName: "Emily Davis",
    position: "UX Designer",
    type: "Technical" as InterviewType,
    status: "Completed" as InterviewStatus,
    date: "2023-07-10",
    startTime: "11:30 AM",
    endTime: "12:30 PM",
    interviewers: ["Jane Smith"],
    location: "Virtual",
    videoLink: "https://meet.google.com/uvw-xyz-123",
    notes: "Portfolio review and design challenge discussion"
  }
];

// Mock Feedback
export const mockFeedback: Feedback[] = [
  {
    id: "1",
    interviewId: "3",
    evaluatorId: "2",
    evaluatorName: "Jane Smith",
    overallRating: 4,
    recommendation: "Hire" as Recommendation,
    strengths: "Strong portfolio, excellent UI design skills, good communication",
    weaknesses: "Limited experience with complex design systems",
    notes: "Would be a good fit for the team, shows potential for growth",
    submittedAt: "2023-07-10T13:00:00"
  }
];

// Mock Offers
export const mockOffers: Offer[] = [
  {
    id: "1",
    candidateId: "3",
    candidateName: "Emily Davis",
    position: "UX Designer",
    department: "Design",
    status: "Approved" as OfferStatus,
    salary: 85000,
    startDate: "2023-08-15",
    expirationDate: "2023-07-25",
    notes: "Competitive offer with standard benefits package"
  }
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: "1",
    user: {
      name: "Jane Smith",
      avatar: "JS"
    },
    action: "submitted feedback for",
    subject: "Emily Davis's technical interview",
    timestamp: "2 days ago"
  },
  {
    id: "2",
    user: {
      name: "John Doe",
      avatar: "JD"
    },
    action: "approved an offer for",
    subject: "Emily Davis for UX Designer position",
    timestamp: "1 day ago"
  },
  {
    id: "3",
    user: {
      name: "Alex Chen",
      avatar: "AC"
    },
    action: "scheduled an interview with",
    subject: "Sarah Johnson for Frontend Developer position",
    timestamp: "5 hours ago"
  },
  {
    id: "4",
    user: {
      name: "John Doe",
      avatar: "JD"
    },
    action: "scheduled an interview with",
    subject: "Michael Brown for Product Manager position",
    timestamp: "3 hours ago"
  }
];
