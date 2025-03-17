
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  CheckCircle,
  XCircle, 
  FileText, 
  MessageSquare,
  ChevronLeft
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const mockInterviewData = {
  id: "INT-1234",
  status: "scheduled", // scheduled, completed, cancelled
  candidateName: "Sarah Johnson",
  candidateId: "CAND-5678",
  position: "Frontend Developer",
  type: "Technical Interview",
  date: "2023-07-15",
  time: "10:00 AM - 11:00 AM",
  location: "Video Conference (Zoom)",
  meetingLink: "https://zoom.us/j/1234567890",
  interviewers: [
    { name: "Alex Chen", role: "Senior Frontend Developer", avatar: "AC" },
    { name: "Lisa Wong", role: "Engineering Manager", avatar: "LW" }
  ],
  description: "Technical interview focusing on JavaScript, React, and frontend architecture. Please prepare to share your screen for coding exercises.",
  notes: [
    { id: "note1", author: "Alex Chen", timestamp: "2023-07-10T14:30:00", content: "Candidate has 4 years of React experience and has worked on large-scale applications." },
    { id: "note2", author: "Lisa Wong", timestamp: "2023-07-12T11:15:00", content: "Prepare questions about state management and performance optimization." }
  ],
  feedback: null // Will be populated after the interview
};

const InterviewDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const [interview, setInterview] = useState(mockInterviewData);

  const handleCompleteInterview = () => {
    setInterview({
      ...interview,
      status: "completed"
    });
  };

  const handleCancelInterview = () => {
    setInterview({
      ...interview,
      status: "cancelled"
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <Link to="/interviews" className="mr-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              Interview #{id} 
              {interview.status === "scheduled" && (
                <Badge className="ml-3 bg-blue-500">Scheduled</Badge>
              )}
              {interview.status === "completed" && (
                <Badge className="ml-3 bg-green-500">Completed</Badge>
              )}
              {interview.status === "cancelled" && (
                <Badge className="ml-3 bg-red-500">Cancelled</Badge>
              )}
            </h1>
            <p className="text-muted-foreground mt-1">{interview.type} for {interview.position}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Interview Information</CardTitle>
                    <CardDescription>
                      Details about the scheduled interview
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Interview Type</p>
                        <p>{interview.type}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Position</p>
                        <p>{interview.position}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Date</p>
                        <p className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {interview.date}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Time</p>
                        <p className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          {interview.time}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Location</p>
                        <p>{interview.location}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Meeting Link</p>
                        <a href={interview.meetingLink} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                          Join Meeting
                        </a>
                      </div>
                    </div>

                    <div className="pt-4">
                      <p className="text-sm font-medium text-muted-foreground">Description</p>
                      <p className="mt-1">{interview.description}</p>
                    </div>
                  </CardContent>
                  {interview.status === "scheduled" && (
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={handleCancelInterview}>
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancel Interview
                      </Button>
                      <Button variant="default" onClick={handleCompleteInterview}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Completed
                      </Button>
                    </CardFooter>
                  )}
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Interviewers</CardTitle>
                    <CardDescription>
                      Team members conducting this interview
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {interview.interviewers.map((interviewer, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://ui-avatars.com/api/?name=${interviewer.name.replace(" ", "+")}`} />
                            <AvatarFallback>{interviewer.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{interviewer.name}</p>
                            <p className="text-sm text-muted-foreground">{interviewer.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Interview Notes</CardTitle>
                    <CardDescription>
                      Preparation notes and observations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {interview.notes.length > 0 ? (
                        interview.notes.map((note) => (
                          <div key={note.id} className="border-b pb-4 border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                              <MessageSquare className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{note.author}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(note.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm">{note.content}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground">No notes have been added yet.</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Add Note
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="feedback" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Interview Feedback</CardTitle>
                    <CardDescription>
                      Evaluation and assessment from interviewers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {interview.status === "completed" ? (
                      interview.feedback ? (
                        <div>Feedback content would go here</div>
                      ) : (
                        <div className="text-center py-6">
                          <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                          <h3 className="mt-4 text-lg font-medium">Feedback Pending</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Interviewers have not submitted feedback yet.
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="text-center py-6">
                        <Clock className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                        <h3 className="mt-4 text-lg font-medium">Interview Not Completed</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Feedback will be available after the interview is completed.
                        </p>
                      </div>
                    )}
                  </CardContent>
                  {interview.status === "completed" && !interview.feedback && (
                    <CardFooter>
                      <Button>
                        <FileText className="mr-2 h-4 w-4" />
                        Submit Feedback
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${interview.candidateName.replace(" ", "+")}&size=96`} />
                    <AvatarFallback>{interview.candidateName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-lg font-medium">{interview.candidateName}</h3>
                  <p className="text-sm text-muted-foreground">{interview.position}</p>
                  
                  <div className="w-full mt-6 space-y-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/candidates/${interview.candidateId}`}>
                        <Users className="mr-2 h-4 w-4" />
                        View Candidate Profile
                      </Link>
                    </Button>
                    {interview.status === "scheduled" && (
                      <Button className="w-full">
                        <Video className="mr-2 h-4 w-4" />
                        Join Interview
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interview Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="bg-green-100 p-1.5 rounded-full mt-0.5">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Interview Scheduled</p>
                      <p className="text-xs text-muted-foreground">July 5, 2023 • 10:24 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-green-100 p-1.5 rounded-full mt-0.5">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Candidate Confirmed</p>
                      <p className="text-xs text-muted-foreground">July 6, 2023 • 3:45 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className={`${
                      interview.status === "completed" || interview.status === "cancelled" 
                        ? "bg-green-100" 
                        : "bg-blue-100"
                    } p-1.5 rounded-full mt-0.5`}>
                      {interview.status === "completed" || interview.status === "cancelled" ? (
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      ) : (
                        <Clock className="h-3 w-3 text-blue-600" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Interview {interview.status === "scheduled" ? "Scheduled" : interview.status === "completed" ? "Completed" : "Cancelled"}</p>
                      <p className="text-xs text-muted-foreground">July 15, 2023 • 10:00 AM</p>
                    </div>
                  </div>
                  {interview.status === "completed" && (
                    <div className="flex items-start gap-2">
                      <div className="bg-gray-100 p-1.5 rounded-full mt-0.5">
                        <Clock className="h-3 w-3 text-gray-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Feedback Pending</p>
                        <p className="text-xs text-muted-foreground">Due by July 17, 2023</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewDetail;
