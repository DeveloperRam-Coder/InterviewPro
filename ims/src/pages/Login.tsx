import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BriefcaseBusiness, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LocationState {
  selectedRole?: string;
  from?: Location;
}

const Login = () => {
  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Registration state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerRole, setRegisterRole] = useState<"admin" | "candidate" | "interviewer">("candidate");
  
  const [activeTab, setActiveTab] = useState("login");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { login, register, isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  useEffect(() => {
    // Set selected role from navigation state if available
    if (state?.selectedRole) {
      setSelectedRole(state.selectedRole);
      
      // Pre-fill email based on role
      switch (state.selectedRole) {
        case "admin":
          setEmail("admin@example.com");
          break;
        case "candidate":
          setEmail("candidate@example.com");
          break;
        case "interviewer":
          setEmail("interviewer@example.com");
          break;
        default:
          break;
      }
      
      // Also set the registration role
      setRegisterRole(state.selectedRole as any);
    }
    
    console.log("Login page: isAuthenticated=", isAuthenticated, "user=", user);
    
    // Redirect if already authenticated
    if (isAuthenticated && user) {
      redirectToAppropriateRoute();
    }
  }, [state, isAuthenticated, user]);

  const redirectToAppropriateRoute = () => {
    if (!user) return;
    
    console.log("Redirecting user with role:", user.role);
    
    const from = state?.from?.pathname || "";
    
    if (from && from !== "/login" && from !== "/") {
      navigate(from);
    } else {
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "candidate":
          navigate("/candidate/dashboard");
          break;
        case "interviewer":
          navigate("/interviewer/dashboard");
          break;
        default:
          navigate("/");
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      await login(email, password);
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
        variant: "default",
      });
      
      // We don't need to manually redirect here as the useEffect will handle it
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Invalid email or password. Please check the demo credentials below.",
      });
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate form
    if (!registerName || !registerEmail || !registerPassword) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Please fill in all required fields.",
      });
      return;
    }
    
    if (registerPassword !== registerConfirmPassword) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Passwords do not match.",
      });
      return;
    }
    
    try {
      // Extract first and last name from full name
      const nameParts = registerName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
      
      // Register user
      await register(registerEmail, registerPassword, firstName, lastName, registerRole);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created!",
        variant: "default",
      });
      
      // Redirect will happen in useEffect
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Could not create account. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex justify-center">
              <BriefcaseBusiness className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">InterviewPro</CardTitle>
          <CardDescription className="text-center">
            {selectedRole 
              ? `${activeTab === "login" ? "Login" : "Register"} as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}` 
              : `${activeTab === "login" ? "Login" : "Register"} to access your dashboard`}
          </CardDescription>
        </CardHeader>
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </CardFooter>
            </form>
            <div className="px-6 pb-4 text-center text-sm text-muted-foreground">
              <p className="font-medium mt-4 mb-2">Demo credentials:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-left">
                <p className="font-semibold">Admin:</p>
                <p>admin@example.com / admin123</p>
                <p className="font-semibold">Candidate:</p>
                <p>candidate@example.com / candidate123</p>
                <p className="font-semibold">Interviewer:</p>
                <p>interviewer@example.com / interviewer123</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Create a password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">Confirm Password</Label>
                  <Input
                    id="register-confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Select Role</Label>
                  <RadioGroup
                    value={registerRole}
                    onValueChange={(value) => setRegisterRole(value as "admin" | "candidate" | "interviewer")}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admin" id="role-admin" />
                      <Label htmlFor="role-admin" className="cursor-pointer">Admin</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="candidate" id="role-candidate" />
                      <Label htmlFor="role-candidate" className="cursor-pointer">Candidate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="interviewer" id="role-interviewer" />
                      <Label htmlFor="role-interviewer" className="cursor-pointer">Interviewer</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;
