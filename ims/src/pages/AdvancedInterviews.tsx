
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar as CalendarIcon, 
  Filter, 
  Plus, 
  BarChart, 
  Download, 
  Settings, 
  Clock,
  Users,
  Video,
  FileText,
  Globe,
  ArrowUpDown,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/components/layout/DashboardLayout";
import InterviewCalendar from "@/components/interviews/InterviewCalendar";
import InterviewsList from "@/components/interviews/InterviewsList";
import AdvancedScheduleForm from "@/components/interviews/AdvancedScheduleForm";
import { AdvancedInterview, InterviewStatus, InterviewType } from "@/types";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

// Mock data for interviews
const mockInterviews: AdvancedInterview[] = [
  {
    id: "1",
    candidateId: "1",
    candidateName: "Sarah Williams",
    position: "Frontend Developer",
    type: "Technical",
    status: "Scheduled",
    date: "2023-07-15",
    startTime: "10:00",
    endTime: "11:00",
    interviewers: ["1", "2"],
    location: "",
    timeZone: "utc",
    videoConferencing: {
      platform: "Zoom",
      link: "https://zoom.us/j/12345",
      meetingId: "123 456 789",
      password: "abc123",
    },
    documents: [
      {
        id: "doc1",
        name: "Resume.pdf",
        type: "Resume",
        url: "#",
        uploadedAt: "2023-07-10T10:00:00Z",
      }
    ],
    notifications: {
      sendEmail: true,
      sendSMS: false,
      sendPush: true,
      reminderTimes: [24, 1],
    },
  },
  {
    id: "2",
    candidateId: "2",
    candidateName: "Michael Brown",
    position: "UX Designer",
    type: "Portfolio Review",  // This is now a valid InterviewType
    status: "Confirmed",
    date: "2023-07-16",
    startTime: "13:00",
    endTime: "14:30",
    interviewers: ["3"],
    location: "",
    timeZone: "est",
    videoConferencing: {
      platform: "Google Meet",
      link: "https://meet.google.com/abc-defg-hij",
      meetingId: "",
      password: "",
    },
    documents: [
      {
        id: "doc2",
        name: "Portfolio.pdf",
        type: "Portfolio",
        url: "#",
        uploadedAt: "2023-07-12T14:30:00Z",
      }
    ],
    notifications: {
      sendEmail: true,
      sendSMS: true,
      sendPush: true,
      reminderTimes: [24, 3],
    },
  },
  {
    id: "3",
    candidateId: "3",
    candidateName: "Emily Johnson",
    position: "Product Manager",
    type: "Case Study",
    status: "Scheduled",
    date: "2023-07-17",
    startTime: "11:00",
    endTime: "12:30",
    interviewers: ["4", "5"],
    location: "",
    timeZone: "pst",
    videoConferencing: {
      platform: "Microsoft Teams",
      link: "https://teams.microsoft.com/l/meetup-join/abc123",
      meetingId: "",
      password: "",
    },
    documents: [
      {
        id: "doc3",
        name: "Resume.pdf",
        type: "Resume",
        url: "#",
        uploadedAt: "2023-07-11T09:15:00Z",
      },
      {
        id: "doc4",
        name: "CaseStudy.pdf",
        type: "Other",
        url: "#",
        uploadedAt: "2023-07-11T09:20:00Z",
      }
    ],
    notifications: {
      sendEmail: true,
      sendSMS: false,
      sendPush: false,
      reminderTimes: [24],
    },
  },
  {
    id: "4",
    candidateId: "4",
    candidateName: "Robert Lee",
    position: "Backend Developer",
    type: "Coding Assessment",
    status: "Completed",
    date: "2023-07-14",
    startTime: "14:00",
    endTime: "15:30",
    interviewers: ["1", "2"],
    location: "",
    timeZone: "utc",
    videoConferencing: {
      platform: "Zoom",
      link: "https://zoom.us/j/67890",
      meetingId: "678 901 234",
      password: "xyz456",
    },
    documents: [],
    notifications: {
      sendEmail: true,
      sendSMS: false,
      sendPush: true,
      reminderTimes: [24, 1],
    },
    feedback: [
      {
        id: "f1",
        interviewId: "4",
        evaluatorId: "1",
        evaluatorName: "Alex Chen",
        overallRating: 4,
        recommendation: "Hire",
        strengths: "Strong problem-solving skills, good knowledge of backend technologies",
        weaknesses: "Could improve communication skills",
        submittedAt: "2023-07-14T16:00:00Z",
      }
    ],
  },
];

// Interface for stats
interface InterviewStats {
  today: number;
  thisWeek: number;
  completed: number;
  feedbackRate: number;
}

const AdvancedInterviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState("list");
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [interviews, setInterviews] = useState<AdvancedInterview[]>(mockInterviews);
  const [stats, setStats] = useState<InterviewStats>({
    today: 0,
    thisWeek: 0,
    completed: 0,
    feedbackRate: 0,
  });
  const navigate = useNavigate();

  // Calculate interview stats
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayCount = interviews.filter(i => i.date === today).length;
    
    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() + 7);
    const thisWeekStr = thisWeek.toISOString().split('T')[0];
    const thisWeekCount = interviews.filter(i => 
      i.date >= today && i.date <= thisWeekStr
    ).length;
    
    const completedCount = interviews.filter(i => i.status === "Completed").length;
    
    const withFeedbackCount = interviews.filter(i => 
      i.status === "Completed" && i.feedback && i.feedback.length > 0
    ).length;
    
    const feedbackRate = completedCount > 0 
      ? Math.round((withFeedbackCount / completedCount) * 100) 
      : 0;
    
    setStats({
      today: todayCount,
      thisWeek: thisWeekCount,
      completed: completedCount,
      feedbackRate: feedbackRate,
    });
  }, [interviews]);

  // Filter interviews based on search query and filters
  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = 
      interview.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || interview.status === statusFilter;
    const matchesType = typeFilter === "all" || interview.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Handle interview status change
  const handleStatusChange = (interviewId: string, newStatus: InterviewStatus) => {
    setInterviews(prevInterviews => 
      prevInterviews.map(interview => 
        interview.id === interviewId 
          ? { ...interview, status: newStatus } 
          : interview
      )
    );
    
    toast({
      title: "Interview Status Updated",
      description: `The interview status has been changed to ${newStatus}`,
    });
  };

  // Handle adding new interview
  const handleAddInterview = (interview: AdvancedInterview) => {
    setInterviews(prev => [...prev, interview]);
  };

  // Format date
  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  // Get status badge
  const getStatusBadge = (status: InterviewStatus) => {
    switch (status) {
      case 'Scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
      case 'Confirmed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Confirmed</Badge>;
      case 'Completed':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Completed</Badge>;
      case 'Canceled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Canceled</Badge>;
      case 'Rescheduled':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Rescheduled</Badge>;
      case 'No Show':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">No Show</Badge>;
      case 'In Progress':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">In Progress</Badge>;
      case 'Pending Feedback':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Pending Feedback</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Advanced Interview Scheduling</h1>
          <Button
            onClick={() => setShowScheduleForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Schedule Interview
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.today}</div>
              <p className="text-xs text-muted-foreground">Scheduled interviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.thisWeek}</div>
              <p className="text-xs text-muted-foreground">Scheduled interviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">Total completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Feedback Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.feedbackRate}%</div>
              <p className="text-xs text-muted-foreground">Completion rate</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Interview Schedule</CardTitle>
            <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search interviews..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[160px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                    <SelectItem value="Rescheduled">Rescheduled</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Pending Feedback">Pending Feedback</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select
                  value={typeFilter}
                  onValueChange={setTypeFilter}
                >
                  <SelectTrigger className="w-[160px]">
                    <FileText className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Behavioral">Behavioral</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Coding Assessment">Coding Assessment</SelectItem>
                    <SelectItem value="Case Study">Case Study</SelectItem>
                    <SelectItem value="Panel">Panel</SelectItem>
                    <SelectItem value="One-on-One">One-on-One</SelectItem>
                  </SelectContent>
                </Select>
                
                <Tabs value={viewMode} onValueChange={setViewMode} className="w-[400px]">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="list">
                      <BarChart className="mr-2 h-4 w-4" />
                      List
                    </TabsTrigger>
                    <TabsTrigger value="calendar">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Calendar
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={viewMode} className="mt-2">
              <TabsContent value="list" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Date & Time
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            Interviewers
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            <Globe className="mr-2 h-4 w-4" />
                            Platform
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInterviews.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            No interviews matching your filters
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredInterviews.map((interview) => (
                          <TableRow key={interview.id}>
                            <TableCell>
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarFallback>
                                    {interview.candidateName.split(" ").map(n => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{interview.candidateName}</div>
                                  <div className="text-sm text-muted-foreground">{interview.position}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{interview.type}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col space-y-1">
                                <span className="font-medium">{formatDate(interview.date)}</span>
                                <span className="text-sm text-muted-foreground">
                                  {interview.startTime} - {interview.endTime}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex -space-x-2">
                                {interview.interviewers.slice(0, 3).map((_, index) => (
                                  <Avatar key={index} className="h-7 w-7 border-2 border-background">
                                    <AvatarFallback className="text-xs">
                                      {String.fromCharCode(65 + index)}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                                {interview.interviewers.length > 3 && (
                                  <div className="flex items-center justify-center h-7 w-7 rounded-full bg-muted text-xs font-medium">
                                    +{interview.interviewers.length - 3}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {interview.videoConferencing.platform === "Zoom" && (
                                  <Video className="h-4 w-4 mr-1 text-blue-500" />
                                )}
                                {interview.videoConferencing.platform === "Google Meet" && (
                                  <Video className="h-4 w-4 mr-1 text-green-500" />
                                )}
                                {interview.videoConferencing.platform === "Microsoft Teams" && (
                                  <Video className="h-4 w-4 mr-1 text-purple-500" />
                                )}
                                {interview.videoConferencing.platform === "Custom" && (
                                  <Video className="h-4 w-4 mr-1 text-gray-500" />
                                )}
                                <span>{interview.videoConferencing.platform}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(interview.status)}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Settings className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => navigate(`/advanced-interviews/${interview.id}`)}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => window.open(interview.videoConferencing.link, '_blank')}>
                                    Join Meeting
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusChange(interview.id, "Confirmed")}>
                                    Confirm
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusChange(interview.id, "Completed")}>
                                    Mark as Completed
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusChange(interview.id, "Canceled")}>
                                    Cancel
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => setShowScheduleForm(true)}>
                                    Reschedule
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="calendar" className="mt-0">
                <InterviewCalendar 
                  searchQuery={searchQuery} 
                  statusFilter={statusFilter} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {showScheduleForm && (
        <AdvancedScheduleForm 
          isOpen={showScheduleForm} 
          onClose={() => setShowScheduleForm(false)} 
        />
      )}
    </DashboardLayout>
  );
};

export default AdvancedInterviews;
