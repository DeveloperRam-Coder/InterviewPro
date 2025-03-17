
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Briefcase, 
  GraduationCap,
  Star,
  ChevronLeft,
  PenLine,
  Share2,
  Clock,
  CheckCircle,
  MessageSquare,
  Plus
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const mockCandidate = {
  id: "CAND-5678",
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  phone: "(555) 123-4567",
  location: "San Francisco, CA",
  currentPosition: "Senior Frontend Developer at TechCorp",
  status: "In Process", // In Process, Hired, Rejected, On Hold
  stage: "Technical Interview", // Screening, Technical Interview, Cultural Interview, Offer, etc.
  appliedFor: "Frontend Developer",
  source: "LinkedIn",
  resume: "https://example.com/resume.pdf",
  skills: ["JavaScript", "React", "TypeScript", "CSS", "Node.js", "GraphQL"],
  experience: [
    {
      id: "exp1",
      company: "TechCorp",
      position: "Senior Frontend Developer",
      duration: "2020 - Present",
      description: "Led development of a React-based SaaS platform with over 50k users."
    },
    {
      id: "exp2",
      company: "WebSolutions Inc.",
      position: "Frontend Developer",
      duration: "2018 - 2020",
      description: "Developed responsive web applications using React and TypeScript."
    }
  ],
  education: [
    {
      id: "edu1",
      institution: "University of California, Berkeley",
      degree: "B.S. Computer Science",
      year: "2014 - 2018"
    }
  ],
  interviews: [
    {
      id: "int1",
      type: "Screening Call",
      date: "2023-06-28",
      time: "2:00 PM - 2:30 PM",
      interviewer: "Lisa Wong",
      status: "completed",
      feedback: "Positive initial impression. Strong communication skills and relevant experience."
    },
    {
      id: "int2",
      type: "Technical Interview",
      date: "2023-07-15",
      time: "10:00 AM - 11:00 AM",
      interviewer: "Alex Chen",
      status: "scheduled"
    }
  ],
  notes: [
    {
      id: "note1",
      author: "Lisa Wong",
      timestamp: "2023-06-28T14:30:00",
      content: "Sarah has 5 years of React experience and is looking for a role with more leadership opportunities."
    },
    {
      id: "note2",
      author: "David Kim",
      timestamp: "2023-07-03T11:15:00",
      content: "Candidate is also interviewing with two other companies. We should expedite our process if possible."
    }
  ]
};

const CandidateDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [candidate, setCandidate] = useState(mockCandidate);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <Link to="/candidates" className="mr-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Candidate Profile</h1>
            <p className="text-muted-foreground mt-1">Details for candidate #{id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${candidate.name.replace(" ", "+")}&size=96`} />
                  <AvatarFallback>{candidate.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-2">{candidate.name}</CardTitle>
                <CardDescription>{candidate.currentPosition}</CardDescription>
                <div className="flex justify-center mt-2">
                  {candidate.status === "In Process" && <Badge className="bg-blue-500">In Process</Badge>}
                  {candidate.status === "Hired" && <Badge className="bg-green-500">Hired</Badge>}
                  {candidate.status === "Rejected" && <Badge className="bg-red-500">Rejected</Badge>}
                  {candidate.status === "On Hold" && <Badge className="bg-yellow-500">On Hold</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{candidate.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{candidate.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{candidate.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Applied for: {candidate.appliedFor}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href={candidate.resume} className="text-primary hover:underline">View Resume</a>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button size="sm">
                  <PenLine className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">Current Stage</p>
                      <Badge variant="outline">{candidate.stage}</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Recruitment Pipeline</p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="bg-green-100 p-1.5 rounded-full mt-0.5">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">Application Received</p>
                            <p className="text-xs text-muted-foreground">Jun 25</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-green-100 p-1.5 rounded-full mt-0.5">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">Screening Call</p>
                            <p className="text-xs text-muted-foreground">Jun 28</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 p-1.5 rounded-full mt-0.5">
                          <Clock className="h-3 w-3 text-blue-600" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">Technical Interview</p>
                            <p className="text-xs text-muted-foreground">Jul 15</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-gray-100 p-1.5 rounded-full mt-0.5">
                          <Clock className="h-3 w-3 text-gray-400" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">Cultural Interview</p>
                            <p className="text-xs text-muted-foreground">TBD</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-gray-100 p-1.5 rounded-full mt-0.5">
                          <Clock className="h-3 w-3 text-gray-400" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">Offer Stage</p>
                            <p className="text-xs text-muted-foreground">TBD</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="interviews">Interviews</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {candidate.experience.map((exp) => (
                        <div key={exp.id} className="border-b pb-6 border-gray-100 last:border-0 last:pb-0">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{exp.position}</h3>
                              <p className="text-sm text-muted-foreground">{exp.company}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{exp.duration}</p>
                          </div>
                          <p className="mt-2 text-sm">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {candidate.education.map((edu) => (
                        <div key={edu.id} className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{edu.degree}</h3>
                            <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="interviews" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Interview Schedule</CardTitle>
                      <CardDescription>Past and upcoming interviews</CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Schedule Interview
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {candidate.interviews.map((interview) => (
                        <div key={interview.id} className="flex flex-col md:flex-row justify-between gap-4 p-4 border rounded-lg">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {interview.type}
                              </Badge>
                              {interview.status === "completed" ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700">
                                  Completed
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                  Scheduled
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center text-sm">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{interview.date}</span>
                              <span className="mx-2">•</span>
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{interview.time}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <User className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>Interviewer: {interview.interviewer}</span>
                            </div>
                            {interview.feedback && (
                              <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                                <p className="font-medium">Feedback:</p>
                                <p>{interview.feedback}</p>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 self-center">
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/interviews/${interview.id}`}>
                                View Details
                              </Link>
                            </Button>
                            {interview.status === "scheduled" && (
                              <Button size="sm">
                                Join
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notes" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Candidate Notes</CardTitle>
                      <CardDescription>Internal notes about this candidate</CardDescription>
                    </div>
                    <Button size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {candidate.notes.map((note) => (
                        <div key={note.id} className="border-b pb-4 border-gray-100 last:border-0 last:pb-0">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{note.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(note.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Need to add User icon since we're using it above
const User = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
};

export default CandidateDetail;
