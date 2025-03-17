
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Bell, Shield, User, Palette, Globe, Mail } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("account");
  
  // Account settings
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    title: "HR Manager"
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    interviews: true,
    candidates: true,
    offers: false,
    system: true
  });

  // Appearance settings
  const [appearance, setAppearance] = useState({
    theme: "system",
    compactMode: false,
    highContrast: false
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (key: string) => {
    setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] });
  };

  const handleAppearanceChange = (key: string, value: string | boolean) => {
    setAppearance({ ...appearance, [key]: value });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        </div>

        <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 md:w-[600px]">
            <TabsTrigger value="account">
              <User className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Palette className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={profileData.name} 
                    onChange={handleProfileChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    name="email" 
                    value={profileData.email} 
                    onChange={handleProfileChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={profileData.title} 
                    onChange={handleProfileChange} 
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>
                  Manage your connected third-party accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Google</p>
                      <p className="text-xs text-muted-foreground">Connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.01 2.019c-5.495 0-9.991 4.496-9.991 9.991 0 5.494 4.496 9.99 9.991 9.99 5.494 0 9.99-4.496 9.99-9.99 0-5.495-4.446-9.991-9.99-9.991zm4.595 14.436c-.199.299-.549.4-.85.201-2.349-1.45-5.296-1.75-8.793-.951-.348.102-.648-.148-.748-.449-.101-.35.149-.648.45-.749 3.795-.85 7.093-.499 9.69 1.1.35.149.4.548.251.848zm1.2-2.747c-.251.349-.7.499-1.051.249-2.697-1.646-6.792-2.148-9.939-1.148-.398.101-.85-.1-.949-.498-.101-.402.1-.852.499-.952 3.646-1.098 8.143-.548 11.239 1.351.3.149.45.648.201.998zm.099-2.799c-3.197-1.897-8.542-2.097-11.59-1.146a.938.938 0 0 1-1.148-.6.937.937 0 0 1 .599-1.151c3.547-1.049 9.392-.85 13.089 1.351.449.249.599.849.349 1.298-.25.35-.849.498-1.299.248z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Microsoft</p>
                      <p className="text-xs text-muted-foreground">Connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to be notified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={() => handleNotificationChange('email')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Browser Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Show notifications in your browser
                      </p>
                    </div>
                    <Switch
                      checked={notifications.browser}
                      onCheckedChange={() => handleNotificationChange('browser')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Types</CardTitle>
                <CardDescription>
                  Select what types of notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Interview Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about upcoming interviews
                      </p>
                    </div>
                    <Switch
                      checked={notifications.interviews}
                      onCheckedChange={() => handleNotificationChange('interviews')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Candidate Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when candidate information is updated
                      </p>
                    </div>
                    <Switch
                      checked={notifications.candidates}
                      onCheckedChange={() => handleNotificationChange('candidates')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Offer Status Changes</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when offer statuses change
                      </p>
                    </div>
                    <Switch
                      checked={notifications.offers}
                      onCheckedChange={() => handleNotificationChange('offers')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">System Announcements</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive important system and feature updates
                      </p>
                    </div>
                    <Switch
                      checked={notifications.system}
                      onCheckedChange={() => handleNotificationChange('system')}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>
                  Customize how the application looks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className={`border rounded-md overflow-hidden cursor-pointer p-2 ${appearance.theme === 'light' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleAppearanceChange('theme', 'light')}
                  >
                    <div className="bg-white rounded-md p-2 border">
                      <div className="h-10 bg-blue-50 rounded mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <p className="text-sm text-center mt-2">Light</p>
                  </div>
                  <div 
                    className={`border rounded-md overflow-hidden cursor-pointer p-2 ${appearance.theme === 'dark' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleAppearanceChange('theme', 'dark')}
                  >
                    <div className="bg-gray-900 rounded-md p-2 border border-gray-700">
                      <div className="h-10 bg-gray-800 rounded mb-2"></div>
                      <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-6 bg-gray-700 rounded w-1/2"></div>
                    </div>
                    <p className="text-sm text-center mt-2">Dark</p>
                  </div>
                  <div 
                    className={`border rounded-md overflow-hidden cursor-pointer p-2 ${appearance.theme === 'system' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleAppearanceChange('theme', 'system')}
                  >
                    <div className="bg-gradient-to-r from-white to-gray-900 rounded-md p-2 border">
                      <div className="h-10 bg-gradient-to-r from-blue-50 to-gray-800 rounded mb-2"></div>
                      <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-700 rounded w-1/2"></div>
                    </div>
                    <p className="text-sm text-center mt-2">System</p>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Compact Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Reduce padding and spacing for a more compact view
                      </p>
                    </div>
                    <Switch
                      checked={appearance.compactMode}
                      onCheckedChange={(checked) => handleAppearanceChange('compactMode', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">High Contrast</Label>
                      <p className="text-sm text-muted-foreground">
                        Increase contrast for better visibility
                      </p>
                    </div>
                    <Switch
                      checked={appearance.highContrast}
                      onCheckedChange={(checked) => handleAppearanceChange('highContrast', checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your security credentials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>Update Password</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">
                      Use an authenticator app to generate verification codes
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
