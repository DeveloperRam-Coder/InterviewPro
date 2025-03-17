
import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type Role = "admin" | "candidate" | "interviewer";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Debugging
    console.log("ProtectedRoute check: isAuthenticated=", isAuthenticated, "user=", user, "allowed roles=", allowedRoles);
  }, [isAuthenticated, user, allowedRoles]);

  // Show loading state or handle initial authentication check
  if (loading) {
    // You could return a loading spinner here
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    console.log("User not authenticated, redirecting to login from", location.pathname);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role as Role)) {
    console.log("User role", user.role, "not allowed, allowed roles:", allowedRoles);
    // Redirect to the appropriate dashboard based on role if trying to access unauthorized route
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "candidate":
        return <Navigate to="/candidate/dashboard" replace />;
      case "interviewer":
        return <Navigate to="/interviewer/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // User is authenticated and has permission
  return <>{children}</>;
};

export default ProtectedRoute;
