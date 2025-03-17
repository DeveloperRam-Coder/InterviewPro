
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import AdminLayout from "@/components/layout/AdminLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCog, Mail, Key, LogOut, Shield, Smartphone, Bell, Calendar, FileEdit, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const AdminProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  const [isEditing, setIsEditing] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <Button onClick={handleSaveProfile}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <FileEdit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-12 gap-6">
          {/* Left column - Profile summary */}
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                View your account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user?.avatarUrl} />
                  <AvatarFallback className="bg-blue-600 text-white text-xl">
                    {user?.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-medium text-xl">{user?.name}</h3>
                <p className="text-muted-foreground">System Administrator</p>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{user?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <p className="capitalize">{user?.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p>April 23, 2023</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Right column - Tabbed interface */}
          <div className="md:col-span-8 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <TabsContent value="general" className="space-y-6 mt-0">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                          id="fullName" 
                          defaultValue={user?.name} 
                          disabled={!isEditing} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input 
                          id="displayName" 
                          defaultValue={user?.name.split(" ")[0]} 
                          disabled={!isEditing} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue={user?.email} 
                        disabled={!isEditing} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        placeholder="Tell us about yourself" 
                        disabled={!isEditing}
                        className="min-h-[100px]" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <select 
                        id="timezone" 
                        className="w-full p-2 rounded-md border" 
                        disabled={!isEditing}
                      >
                        <option>Eastern Time (ET)</option>
                        <option>Pacific Time (PT)</option>
                        <option>Central Time (CT)</option>
                        <option>Mountain Time (MT)</option>
                      </select>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="security" className="space-y-6 mt-0">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" placeholder="••••••••" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" placeholder="••••••••" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" placeholder="••••••••" />
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p>Enhance your account security by enabling 2FA</p>
                          <p className="text-sm text-muted-foreground">
                            We'll send you a code via email or SMS when you sign in on a new device.
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications" className="space-y-6 mt-0">
                  <div className="space-y-4">
                    <h3 className="font-medium mb-2">Email Notifications</h3>
                    {[
                      "New interview scheduled",
                      "Interview time changed",
                      "New candidate assessment",
                      "Team member updates",
                      "Monthly reports"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-2">
                        <p>{item}</p>
                        <Switch defaultChecked={i < 3} />
                      </div>
                    ))}
                    
                    <h3 className="font-medium mb-2 mt-6">Mobile Notifications</h3>
                    {[
                      "Push notifications",
                      "Interview reminders",
                      "Direct messages",
                      "Status changes"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-2">
                        <p>{item}</p>
                        <Switch defaultChecked={i < 2} />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                  <span>Mobile Access</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Access InterviewPro on the go with our mobile apps for iOS and Android.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="bg-white">
                    Download for iOS
                  </Button>
                  <Button variant="outline" className="bg-white">
                    Download for Android
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
