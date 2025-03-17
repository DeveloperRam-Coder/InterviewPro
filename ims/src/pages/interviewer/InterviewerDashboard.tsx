
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Video, Clock, ClipboardCheck, Users } from "lucide-react";
import InterviewerLayout from "@/components/layout/InterviewerLayout";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockInterviews = [
  {
    id: "1",
    candidateName: "Sarah Johnson",
    position: "Frontend Developer",
    type: "Technical",
    date: "2023-07-15",
    time: "10:00 AM - 11:00 AM",
    feedbackStatus: "pending"
  },
  {
    id: "2",
    candidateName: "Michael Brown",
    position: "Product Manager",
    type: "Behavioral",
    date: "2023-07-15",
    time: "2:00 PM - 3:00 PM",
    feedbackStatus: "pending"
  },
  {
    id: "3",
    candidateName: "Emily Davis",
    position: "UX Designer",
    type: "Portfolio Review",
    date: "2023-07-16",
    time: "11:30 AM - 12:30 PM",
    feedbackStatus: "pending"
  }
];

const InterviewerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();
  
  return (
    <InterviewerLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Interviewer Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => window.location.href = "/interviewer/feedback"}>
              Pending Feedback
            </Button>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg flex items-center gap-2">
          <div className="bg-purple-100 p-2 rounded-full">
            <ClipboardCheck className="h-5 w-5 text-purple-700" />
          </div>
          <div>
            <p className="text-purple-700">Welcome, {user?.name}! You have 3 upcoming interviews scheduled and 3 pending feedback forms.</p>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">My Schedule</TabsTrigger>
            <TabsTrigger value="feedback">Pending Feedback</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Today's Interviews
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">
                    Next interview in 2 hours
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Feedback
                  </CardTitle>
                  <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    2 due within 24 hours
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Candidates Interviewed
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    This month
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>
                  Your interview schedule for the next 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInterviews.map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`https://ui-avatars.com/api/?name=${interview.candidateName.replace(" ", "+")}`} />
                          <AvatarFallback>{interview.candidateName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{interview.candidateName}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{interview.position}</span>
                            <span>•</span>
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
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Review</Button>
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
                <CardTitle>Pending Feedback</CardTitle>
                <CardDescription>
                  Interviews that require your feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInterviews.map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`https://ui-avatars.com/api/?name=${interview.candidateName.replace(" ", "+")}`} />
                          <AvatarFallback>{interview.candidateName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{interview.candidateName}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{interview.position}</span>
                            <span>•</span>
                            <Badge variant="outline">{interview.type}</Badge>
                          </div>
                          <div className="flex gap-4 mt-1">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{interview.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button>Submit Feedback</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Interview Schedule</CardTitle>
                <CardDescription>
                  All your upcoming interviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInterviews.map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`https://ui-avatars.com/api/?name=${interview.candidateName.replace(" ", "+")}`} />
                          <AvatarFallback>{interview.candidateName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{interview.candidateName}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{interview.position}</span>
                            <span>•</span>
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
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
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

          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Feedback</CardTitle>
                <CardDescription>
                  Submit feedback for your recent interviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInterviews.map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`https://ui-avatars.com/api/?name=${interview.candidateName.replace(" ", "+")}`} />
                          <AvatarFallback>{interview.candidateName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{interview.candidateName}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{interview.position}</span>
                            <span>•</span>
                            <Badge variant="outline">{interview.type}</Badge>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Interviewed on {interview.date}
                          </p>
                        </div>
                      </div>
                      <div>
                        <Button>Submit Feedback</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </InterviewerLayout>
  );
};

export default InterviewerDashboard;
