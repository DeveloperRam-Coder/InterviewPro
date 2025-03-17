
interface Route {
  path: string;
  name: string;
  requiresAuth: boolean;
  icon?: string;
}

const routes: Record<string, Route> = {
  home: {
    path: "/",
    name: "Home",
    requiresAuth: false
  },
  dashboard: {
    path: "/dashboard",
    name: "Dashboard",
    requiresAuth: true
  },
  interviews: {
    path: "/interviews",
    name: "Interviews",
    requiresAuth: true
  },
  interviewDetail: {
    path: "/interviews/:id",
    name: "Interview Detail",
    requiresAuth: true
  },
  interviewNew: {
    path: "/interviews/new",
    name: "New Interview",
    requiresAuth: true
  },
  candidates: {
    path: "/candidates",
    name: "Candidates",
    requiresAuth: true
  },
  candidateDetail: {
    path: "/candidates/:id",
    name: "Candidate Detail",
    requiresAuth: true
  },
  candidateNew: {
    path: "/candidates/new",
    name: "New Candidate",
    requiresAuth: true
  },
  feedback: {
    path: "/feedback",
    name: "Feedback",
    requiresAuth: true
  },
  feedbackNew: {
    path: "/feedback/new",
    name: "New Feedback",
    requiresAuth: true
  },
  offers: {
    path: "/offers",
    name: "Offers",
    requiresAuth: true
  },
  offerDetail: {
    path: "/offers/:id",
    name: "Offer Detail",
    requiresAuth: true
  },
  offerNew: {
    path: "/offers/new",
    name: "New Offer",
    requiresAuth: true
  },
  reports: {
    path: "/reports",
    name: "Reports",
    requiresAuth: true
  },
  settings: {
    path: "/settings",
    name: "Settings",
    requiresAuth: true
  },
  adminSettings: {
    path: "/admin/settings",
    name: "Settings",
    requiresAuth: true
  },
  candidateSettings: {
    path: "/candidate/settings",
    name: "Settings",
    requiresAuth: true
  },
  interviewerSettings: {
    path: "/interviewer/settings",
    name: "Settings",
    requiresAuth: true
  },
  profile: {
    path: "/profile",
    name: "Profile",
    requiresAuth: true
  },
  about: {
    path: "/about",
    name: "About",
    requiresAuth: false
  },
  // New advanced interview routes
  advancedInterviews: {
    path: "/advanced-interviews",
    name: "Advanced Interviews",
    requiresAuth: true
  },
  advancedInterviewDetail: {
    path: "/advanced-interviews/:id",
    name: "Advanced Interview Detail",
    requiresAuth: true
  },
  advancedInterviewSchedule: {
    path: "/advanced-interviews/schedule",
    name: "Schedule Advanced Interview",
    requiresAuth: true
  }
};

export default routes;
