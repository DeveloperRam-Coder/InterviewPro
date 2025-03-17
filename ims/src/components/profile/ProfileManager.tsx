import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Briefcase } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ProfileManager = () => {
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || user?.avatar || "");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        variant: "destructive",
        title: "Invalid input",
        description: "Name cannot be empty",
      });
      return;
    }
    
    updateUserProfile({
      name,
      avatarUrl,
    });
  };
  
  const handleGenerateAvatar = () => {
    if (name) {
      const newAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
      setAvatarUrl(newAvatarUrl);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>
                  {name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full"
                onClick={handleGenerateAvatar}
              >
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="pl-10 bg-muted"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Email address cannot be changed
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="role"
                  value={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ""}
                  disabled
                  className="pl-10 bg-muted"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileManager;
