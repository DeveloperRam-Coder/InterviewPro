
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import CandidateDashboard from '@/pages/candidate/CandidateDashboard';
import InterviewerDashboard from '@/pages/interviewer/InterviewerDashboard';
import CandidateProfile from '@/pages/candidate/CandidateProfile';
import InterviewerProfile from '@/pages/interviewer/InterviewerProfile';
import Dashboard from '@/pages/Dashboard';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import UserSettings from '@/pages/settings/UserSettings';
import AdminReports from '@/pages/admin/AdminReports';
import { useAuth } from '@/context/AuthContext';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Interviews from '@/pages/Interviews';
import AdvancedInterviews from '@/pages/AdvancedInterviews';

const RouteComponents = () => {
  const { user, isAuthenticated } = useAuth();

  console.log("RouteComponents rendering with user:", user);

  // Function to redirect to the appropriate dashboard based on user role
  const redirectToDashboard = () => {
    if (!isAuthenticated || !user) {
      console.log("User not authenticated, showing Index page");
      return <Index />;
    }
    
    console.log("Redirecting to dashboard for role:", user.role);
    
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" />;
      case 'candidate':
        return <Navigate to="/candidate/dashboard" />;
      case 'interviewer':
        return <Navigate to="/interviewer/dashboard" />;
      default:
        console.log("Unknown role:", user.role);
        return <Navigate to="/login" />;
    }
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      
      {/* Dashboard redirect */}
      <Route path="/" element={redirectToDashboard()} />
      
      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <UserSettings />
          </ProtectedRoute>
        }
      />
      
      {/* Candidate routes */}
      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate/profile"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate/settings"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <UserSettings />
          </ProtectedRoute>
        }
      />
      
      {/* Interviewer routes */}
      <Route
        path="/interviewer/dashboard"
        element={
          <ProtectedRoute allowedRoles={["interviewer"]}>
            <InterviewerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interviewer/profile"
        element={
          <ProtectedRoute allowedRoles={["interviewer"]}>
            <InterviewerProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interviewer/settings"
        element={
          <ProtectedRoute allowedRoles={["interviewer"]}>
            <UserSettings />
          </ProtectedRoute>
        }
      />
      
      {/* Generic routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <UserSettings />
          </ProtectedRoute>
        }
      />
      
      {/* Interview routes */}
      <Route
        path="/interviews"
        element={
          <ProtectedRoute>
            <Interviews />
          </ProtectedRoute>
        }
      />
      
      {/* Advanced Interview routes */}
      <Route
        path="/advanced-interviews"
        element={
          <ProtectedRoute>
            <AdvancedInterviews />
          </ProtectedRoute>
        }
      />
      <Route
        path="/advanced-interviews/:id"
        element={
          <ProtectedRoute>
            <AdvancedInterviews />
          </ProtectedRoute>
        }
      />
      
      {/* Catch-all redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default RouteComponents;
