
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThemeSettings from "@/components/settings/ThemeSettings";
import ProfileManager from "@/components/profile/ProfileManager";
import { useAuth } from "@/context/AuthContext";
import { Palette, UserCog, Bell, Lock, Download } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SettingsLayoutProps {
  children: React.ReactNode;
  title: string;
}

const SettingsLayout = ({ role }: { role: string }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const isMobile = useIsMobile();
  
  // Determine which layout component to use based on role
  const LayoutComponent: React.FC<SettingsLayoutProps> = 
    role === 'admin' 
      ? (props) => <AdminLayout {...props} /> 
      : role === 'interviewer' 
        ? (props) => <InterviewerLayout {...props} /> 
        : (props) => <CandidateLayout {...props} />;
  
  return (
    <LayoutComponent title="User Settings">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        </div>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="profile" className="flex items-center">
              <UserCog className="mr-2 h-4 w-4" />
              <span className={isMobile ? "text-xs" : "hidden md:inline"}>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center">
              <Palette className="mr-2 h-4 w-4" />
              <span className={isMobile ? "text-xs" : "hidden md:inline"}>Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              <span className={isMobile ? "text-xs" : "hidden md:inline"}>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Lock className="mr-2 h-4 w-4" />
              <span className={isMobile ? "text-xs" : "hidden md:inline"}>Security</span>
            </TabsTrigger>
            <TabsTrigger value="exports" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              <span className={isMobile ? "text-xs" : "hidden md:inline"}>Exports</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <ProfileManager />
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <ThemeSettings />
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Notification settings will be implemented in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Security settings will be implemented in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="exports" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Data export functionality will be implemented in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </LayoutComponent>
  );
};

// Import layouts
import AdminLayout from "@/components/layout/AdminLayout";
import CandidateLayout from "@/components/layout/CandidateLayout";
import InterviewerLayout from "@/components/layout/InterviewerLayout";

const UserSettings = () => {
  const { user } = useAuth();
  
  if (!user) {
    return null;
  }
  
  return <SettingsLayout role={user.role} />;
};

export default UserSettings;
