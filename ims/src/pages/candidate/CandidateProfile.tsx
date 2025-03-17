
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import CandidateLayout from "@/components/layout/CandidateLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Key, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const CandidateProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <CandidateLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Candidate Profile</h1>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                View and update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatarUrl} />
                  <AvatarFallback className="bg-green-500 text-xl">
                    {user?.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="flex items-center border rounded-md px-3 py-2 bg-muted">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{user?.name}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center border rounded-md px-3 py-2 bg-muted">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm sm:text-base truncate">{user?.email}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <div className="flex items-center border rounded-md px-3 py-2 bg-muted">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="capitalize">{user?.role}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Resume & Skills</CardTitle>
              <CardDescription>
                Update your resume and professional skills
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resume">Resume</Label>
                <div className="flex">
                  <Input id="resume" type="file" className="text-sm" />
                </div>
                <p className="text-xs text-muted-foreground">Upload your latest resume (PDF format)</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <div className="flex">
                  <Input id="skills" placeholder="e.g., JavaScript, React, Node.js" />
                </div>
                <p className="text-xs text-muted-foreground">Comma separated list of your skills</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <div className="flex">
                  <Input id="experience" type="number" placeholder="e.g., 5" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Update Profile</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </CandidateLayout>
  );
};

export default CandidateProfile;
