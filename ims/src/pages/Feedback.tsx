
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Filter, CheckCircle, Clock, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayout";

const feedbackData = [
  {
    id: "1",
    candidateName: "Sarah Johnson",
    position: "Frontend Developer",
    interviewType: "Technical",
    interviewer: "Alex Chen",
    date: "2023-07-10",
    status: "completed",
    rating: 4,
    strengths: ["JavaScript", "React", "Problem Solving"],
    weaknesses: ["System Design"]
  },
  {
    id: "2",
    candidateName: "Michael Brown",
    position: "Product Manager",
    interviewType: "Behavioral",
    interviewer: "Lisa Wong",
    date: "2023-07-12",
    status: "completed",
    rating: 3,
    strengths: ["Communication", "Product Vision"],
    weaknesses: ["Technical Knowledge", "Prioritization"]
  },
  {
    id: "3",
    candidateName: "Emily Davis",
    position: "UX Designer",
    interviewType: "Portfolio Review",
    interviewer: "James Peters",
    date: "2023-07-14",
    status: "completed",
    rating: 5,
    strengths: ["Visual Design", "User Research", "Prototyping"],
    weaknesses: []
  },
  {
    id: "4",
    candidateName: "Robert Wilson",
    position: "Backend Engineer",
    interviewType: "Technical",
    interviewer: "David Kim",
    date: "2023-07-15",
    status: "pending",
    rating: null,
    strengths: [],
    weaknesses: []
  }
];

const Feedback = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [interviewTypeFilter, setInterviewTypeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredFeedback = feedbackData.filter((feedback) => {
    // Search filter
    const matchesSearch = 
      feedback.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.interviewer.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      statusFilter === "all" || 
      feedback.status === statusFilter;
    
    // Interview type filter
    const matchesType = 
      interviewTypeFilter === "all" || 
      feedback.interviewType.toLowerCase() === interviewTypeFilter.toLowerCase();
    
    // Tab filter
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "pending" && feedback.status === "pending") ||
      (activeTab === "completed" && feedback.status === "completed");
    
    return matchesSearch && matchesStatus && matchesType && matchesTab;
  });

  const pendingCount = feedbackData.filter(f => f.status === "pending").length;
  const completedCount = feedbackData.filter(f => f.status === "completed").length;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Interview Feedback</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedbackData.length}</div>
              <p className="text-xs text-muted-foreground">All interview feedback</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCount}</div>
              <p className="text-xs text-muted-foreground">Submitted feedback</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting submission</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(feedbackData
                  .filter(f => f.rating !== null)
                  .reduce((acc, curr) => acc + (curr.rating || 0), 0) / 
                  feedbackData.filter(f => f.rating !== null).length
                ).toFixed(1)}
                /5
              </div>
              <p className="text-xs text-muted-foreground">Overall performance</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Feedback Management</CardTitle>
            <CardDescription>
              View and manage interview feedback for candidates
            </CardDescription>
            <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search feedback..."
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
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={interviewTypeFilter}
                  onValueChange={setInterviewTypeFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Interview Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="behavioral">Behavioral</SelectItem>
                    <SelectItem value="portfolio review">Portfolio Review</SelectItem>
                    <SelectItem value="system design">System Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Feedback</TabsTrigger>
                <TabsTrigger value="pending">
                  Pending
                  <Badge className="ml-2 bg-yellow-500">{pendingCount}</Badge>
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed
                  <Badge className="ml-2 bg-green-500">{completedCount}</Badge>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                {renderFeedbackList(filteredFeedback)}
              </TabsContent>
              
              <TabsContent value="pending" className="mt-0">
                {renderFeedbackList(filteredFeedback)}
              </TabsContent>
              
              <TabsContent value="completed" className="mt-0">
                {renderFeedbackList(filteredFeedback)}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

const renderFeedbackList = (feedbackItems: typeof feedbackData) => {
  if (feedbackItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-muted-foreground">No feedback found matching your filters</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedbackItems.map((feedback) => (
        <div key={feedback.id} className="flex flex-col md:flex-row gap-4 md:items-start justify-between border-b pb-4 border-gray-100">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${feedback.candidateName.replace(" ", "+")}`} />
              <AvatarFallback>{feedback.candidateName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{feedback.candidateName}</h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>{feedback.position}</span>
                <span>•</span>
                <Badge variant="outline">{feedback.interviewType}</Badge>
                <span>•</span>
                <span>{new Date(feedback.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-xs">
                  <span className="font-medium">Interviewer:</span>
                  <span className="ml-1">{feedback.interviewer}</span>
                </div>
                {feedback.status === "completed" && (
                  <div className="flex items-center text-xs">
                    <span className="font-medium ml-2">Rating:</span>
                    <span className="ml-1">{feedback.rating}/5</span>
                  </div>
                )}
              </div>
              {feedback.status === "completed" && feedback.strengths.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {feedback.strengths.map((strength, idx) => (
                    <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                      {strength}
                    </Badge>
                  ))}
                </div>
              )}
              {feedback.status === "completed" && feedback.weaknesses.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {feedback.weaknesses.map((weakness, idx) => (
                    <Badge key={idx} variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100">
                      {weakness}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 self-end md:self-center">
            {feedback.status === "completed" ? (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">Completed</span>
              </div>
            ) : (
              <div className="flex items-center text-yellow-600">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-xs">Pending</span>
              </div>
            )}
            <Button size="sm" variant="outline" className="ml-2">
              {feedback.status === "completed" ? "View" : "Add Feedback"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feedback;
