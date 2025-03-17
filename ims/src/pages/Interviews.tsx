
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, Filter, Plus, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/DashboardLayout";
import InterviewCalendar from "@/components/interviews/InterviewCalendar";
import InterviewsList from "@/components/interviews/InterviewsList";
import ScheduleInterviewForm from "@/components/interviews/ScheduleInterviewForm";
import { useIsMobile } from "@/hooks/use-mobile";

const Interviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("calendar");
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
          <Button
            onClick={() => setShowScheduleForm(true)}
            className="flex items-center gap-2 w-full sm:w-auto"
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
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Scheduled interviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Scheduled interviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">Past 30 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Feedback Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">Past 30 days</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Interview Schedule</CardTitle>
            <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Input
                  placeholder="Search interviews..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-full sm:w-[160px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                    <SelectItem value="rescheduled">Rescheduled</SelectItem>
                  </SelectContent>
                </Select>
                <Tabs value={viewMode} onValueChange={setViewMode} className="w-full sm:w-[300px]">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="calendar">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span className="hidden md:inline">Calendar</span>
                    </TabsTrigger>
                    <TabsTrigger value="list">
                      <BarChart className="mr-2 h-4 w-4" />
                      <span className="hidden md:inline">List</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={viewMode} className="mt-2">
              <TabsContent value="calendar" className="mt-0">
                <InterviewCalendar 
                  searchQuery={searchQuery} 
                  statusFilter={statusFilter} 
                />
              </TabsContent>
              <TabsContent value="list" className="mt-0">
                <InterviewsList 
                  searchQuery={searchQuery} 
                  statusFilter={statusFilter} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {showScheduleForm && (
        <ScheduleInterviewForm 
          isOpen={showScheduleForm} 
          onClose={() => setShowScheduleForm(false)} 
        />
      )}
    </DashboardLayout>
  );
};

export default Interviews;
