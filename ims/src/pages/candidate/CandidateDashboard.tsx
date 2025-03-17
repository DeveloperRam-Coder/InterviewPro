
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Video, Clock, User, FileText } from "lucide-react";
import CandidateLayout from "@/components/layout/CandidateLayout";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockInterviews = [
  {
    id: "1",
    position: "Frontend Developer",
    company: "Tech Solutions Inc.",
    type: "Technical",
    date: "2023-07-15",
    time: "10:00 AM - 11:00 AM",
    interviewers: ["Alex Chen"],
    status: "upcoming"
  },
  {
    id: "2",
    position: "React Developer",
    company: "Digital Innovations",
    type: "Behavioral",
    date: "2023-07-22",
    time: "2:00 PM - 3:00 PM",
    interviewers: ["Lisa Wong", "David Kim"],
    status: "upcoming"
  },
];

const mockApplications = [
  {
    id: "1",
    position: "Frontend Developer",
    company: "Tech Solutions Inc.",
    status: "Interview Scheduled",
    appliedDate: "2023-07-01"
  },
  {
    id: "2",
    position: "React Developer",
    company: "Digital Innovations",
    status: "Interview Scheduled",
    appliedDate: "2023-07-05"
  },
  {
    id: "3",
    position: "UI Developer",
    company: "Creative Labs",
    status: "Application Submitted",
    appliedDate: "2023-07-12"
  }
];

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();
  
  return (
    <CandidateLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Candidate Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => window.location.href = "/candidate/applications"}>
              My Applications
            </Button>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center gap-2">
          <div className="bg-green-100 p-2 rounded-full">
            <User className="h-5 w-5 text-green-700" />
          </div>
          <div>
            <p className="text-green-700">Welcome, {user?.name}! Your next interview is on July 15th at 10:00 AM.</p>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="interviews">My Interviews</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Upcoming Interviews
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">
                    Next interview in 3 days
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Applications
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    Across 3 different companies
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Profile Completion
                  </CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-xs text-muted-foreground">
                    Complete your profile to improve chances
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>
                  Your scheduled interviews for the next 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInterviews.map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <div>
                        <h3 className="font-medium">{interview.position}</h3>
                        <p className="text-sm text-muted-foreground">{interview.company}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{interview.type}</Badge>
                        </div>
                        <div className="flex gap-4 mt-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{interview.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{interview.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Prepare</Button>
                        <Button size="sm">
                          <Video className="h-4 w-4 mr-1" />
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
                <CardDescription>
                  Current status of your job applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockApplications.map((application) => (
                    <div key={application.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <div>
                        <h3 className="font-medium">{application.position}</h3>
                        <p className="text-sm text-muted-foreground">{application.company}</p>
                        <div className="flex gap-4 mt-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span>Applied: {application.appliedDate}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Badge variant={application.status === "Interview Scheduled" ? "default" : "secondary"}>
                          {application.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="interviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Interviews</CardTitle>
                <CardDescription>
                  All your scheduled interviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInterviews.map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <div>
                        <h3 className="font-medium">{interview.position}</h3>
                        <p className="text-sm text-muted-foreground">{interview.company}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{interview.type}</Badge>
                        </div>
                        <div className="flex gap-4 mt-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{interview.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{interview.time}</span>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-xs text-muted-foreground">
                            Interviewers: {interview.interviewers.join(", ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Details</Button>
                        <Button size="sm">
                          <Video className="h-4 w-4 mr-1" />
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>
                  Track your job applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockApplications.map((application) => (
                    <div key={application.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <div>
                        <h3 className="font-medium">{application.position}</h3>
                        <p className="text-sm text-muted-foreground">{application.company}</p>
                        <div className="flex gap-4 mt-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span>Applied: {application.appliedDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={application.status === "Interview Scheduled" ? "default" : "secondary"}>
                          {application.status}
                        </Badge>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CandidateLayout>
  );
};

export default CandidateDashboard;
