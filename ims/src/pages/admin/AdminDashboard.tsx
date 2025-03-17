import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  PieChart, 
  Plus, 
  Video, 
  Eye,
  Bell,
  BarChart2,
  TrendingUp,
  Filter,
  RefreshCw,
  Search
} from "lucide-react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RechartPieChart, Pie, Cell } from "recharts";
import AdminLayout from "@/components/layout/AdminLayout";
import UpcomingInterviews from "@/components/dashboard/UpcomingInterviews";
import CandidateStats from "@/components/dashboard/CandidateStats";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { useAuth } from "@/context/AuthContext";
import ScheduleInterviewForm from "@/components/interviews/ScheduleInterviewForm";
import { toast } from "@/hooks/use-toast";
import { ChatDialog } from "@/components/landing/ChatDialog";

// Sample data for charts
const candidateStatusData = [
  { name: 'Applied', value: 45 },
  { name: 'Screening', value: 30 },
  { name: 'Technical', value: 15 },
  { name: 'Cultural', value: 8 },
  { name: 'Offer', value: 2 },
];

const interviewsPerDayData = [
  { name: 'Mon', value: 5 },
  { name: 'Tue', value: 8 },
  { name: 'Wed', value: 12 },
  { name: 'Thu', value: 7 },
  { name: 'Fri', value: 10 },
  { name: 'Sat', value: 3 },
  { name: 'Sun', value: 1 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9c27b0'];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleViewInterviews = () => {
    navigate("/interviews");
  };
  
  const handleAddCandidate = () => {
    navigate("/candidates/new");
  };
  
  const handleJoinInterview = (interviewId: string) => {
    // This would normally open the video conference for the given interview
    toast({
      title: "Joining Interview",
      description: "Connecting to video conference...",
    });
    window.open("https://meet.google.com/sample-meeting-id", "_blank");
  };

  const handleRefreshData = () => {
    setRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
      toast({
        title: "Data Refreshed",
        description: "Dashboard data has been updated",
      });
    }, 1500);
  };
  
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button size="sm" variant="outline" onClick={handleRefreshData} disabled={refreshing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? "Refreshing..." : "Refresh Data"}
            </Button>
            <Button onClick={() => setShowScheduleForm(true)}>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Interview
            </Button>
            <Button variant="outline" onClick={handleAddCandidate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Candidate
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-center gap-2">
          <div className="bg-blue-100 p-2 rounded-full">
            <Users className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <p className="text-blue-700">Welcome back, {user?.name}! You're in Admin mode with full system access.</p>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search candidates, interviews, or feedback..." 
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setShowChatDialog(true)}>
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </Button>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Interviews
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    +10% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Candidates
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">
                    +5 new this week
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Feedback
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">
                    3 due today
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Hire Rate
                  </CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24%</div>
                  <p className="text-xs text-muted-foreground">
                    +2% from previous quarter
                  </p>
                </CardContent>
              </Card>
            </div>

            <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
              <ResizablePanel defaultSize={60}>
                <div className="flex items-center justify-between p-4 h-full">
                  <div className="flex-1 h-full">
                    <Card className="h-full border-0 shadow-none">
                      <CardHeader className="flex justify-between items-end px-2">
                        <div>
                          <CardTitle>Upcoming Interviews</CardTitle>
                          <CardDescription>
                            Your scheduled interviews for the next 7 days
                          </CardDescription>
                        </div>
                        <Button size="sm" variant="outline" onClick={handleViewInterviews}>
                          <Eye className="mr-2 h-4 w-4" />
                          View All
                        </Button>
                      </CardHeader>
                      <CardContent className="px-2">
                        <div className="space-y-4">
                          {/* First interview */}
                          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                                SJ
                              </div>
                              <div>
                                <h3 className="font-medium">Sarah Johnson</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>Frontend Developer</span>
                                  <span>•</span>
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Technical</span>
                                </div>
                                <div className="flex gap-4 mt-1">
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    <span>Today</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>10:00 AM - 11:00 AM</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => navigate("/interviews/1")}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" onClick={() => handleJoinInterview("1")}>
                                <Video className="h-4 w-4 mr-1" />
                                Join
                              </Button>
                            </div>
                          </div>
                          
                          {/* Second interview */}
                          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                                MB
                              </div>
                              <div>
                                <h3 className="font-medium">Michael Brown</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>Product Manager</span>
                                  <span>•</span>
                                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Behavioral</span>
                                </div>
                                <div className="flex gap-4 mt-1">
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    <span>Today</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>2:00 PM - 3:00 PM</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => navigate("/interviews/2")}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" onClick={() => handleJoinInterview("2")}>
                                <Video className="h-4 w-4 mr-1" />
                                Join
                              </Button>
                            </div>
                          </div>
                          
                          {/* Add more interviews as needed */}
                          <Button variant="link" className="w-full" onClick={handleViewInterviews}>
                            View All Interviews
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={40}>
                <div className="flex flex-col h-full">
                  <div className="flex flex-col gap-4 p-4 h-1/2">
                    <h3 className="text-lg font-semibold">Candidate Status Distribution</h3>
                    <div className="w-full h-[240px]">
                      <ChartContainer
                        config={{
                          Applied: { color: COLORS[0] },
                          Screening: { color: COLORS[1] },
                          Technical: { color: COLORS[2] },
                          Cultural: { color: COLORS[3] },
                          Offer: { color: COLORS[4] },
                        }}
                      >
                        <RechartPieChart>
                          <Pie
                            data={candidateStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {candidateStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            content={<ChartTooltipContent />}
                          />
                        </RechartPieChart>
                      </ChartContainer>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4 p-4 h-1/2 border-t">
                    <h3 className="text-lg font-semibold">Interviews by Day</h3>
                    <div className="w-full h-[240px]">
                      <ChartContainer
                        config={{
                          value: { color: "#8884d8" },
                        }}
                      >
                        <BarChart data={interviewsPerDayData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip
                            content={<ChartTooltipContent />}
                          />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ChartContainer>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates from your team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Alex Johnson</TableCell>
                      <TableCell>Scheduled interview with David Miller</TableCell>
                      <TableCell>10 minutes ago</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sarah Williams</TableCell>
                      <TableCell>Added feedback for Rebecca White's interview</TableCell>
                      <TableCell>30 minutes ago</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Michael Chen</TableCell>
                      <TableCell>Updated candidate status to "Technical Interview"</TableCell>
                      <TableCell>1 hour ago</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Emily Davis</TableCell>
                      <TableCell>Created offer for Jason Martin</TableCell>
                      <TableCell>2 hours ago</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="interviews" className="space-y-4">
            <Card>
              <CardHeader className="flex justify-between items-end">
                <div>
                  <CardTitle>Interview Management</CardTitle>
                  <CardDescription>
                    View and manage all scheduled interviews
                  </CardDescription>
                </div>
                <Button onClick={() => setShowScheduleForm(true)}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule New
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">View complete interview management on the Interviews page</p>
                  <Button onClick={handleViewInterviews}>Go to Interviews</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-4">
            <Card>
              <CardHeader className="flex justify-between items-end">
                <div>
                  <CardTitle>Candidate Pipeline</CardTitle>
                  <CardDescription>
                    Track and manage candidates through the hiring process
                  </CardDescription>
                </div>
                <Button onClick={handleAddCandidate}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Candidate
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">View detailed candidate information on the Candidates page</p>
                  <Button onClick={() => navigate("/candidates")}>Go to Candidates</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
                <CardDescription>
                  Review hiring metrics and performance reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">View detailed reporting and analytics on the Reports page</p>
                  <Button onClick={() => navigate("/reports")}>Go to Reports</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {showScheduleForm && (
        <ScheduleInterviewForm 
          isOpen={showScheduleForm} 
          onClose={() => setShowScheduleForm(false)} 
        />
      )}

      <ChatDialog 
        isOpen={showChatDialog} 
        onOpenChange={setShowChatDialog} 
      />
    </AdminLayout>
  );
};

export default AdminDashboard;
