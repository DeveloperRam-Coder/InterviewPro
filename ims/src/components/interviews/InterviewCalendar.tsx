
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, UserPlus, Video } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InterviewCalendarProps {
  searchQuery: string;
  statusFilter: string;
}

// Mock data for interviews
const mockInterviews = [
  {
    id: "1",
    title: "Frontend Developer Interview - Sarah Williams",
    candidateName: "Sarah Williams",
    position: "Frontend Developer",
    type: "Technical",
    interviewers: ["Alex Chen", "Rebecca Johnson"],
    date: new Date("2023-09-15"),
    time: "10:00 AM - 11:30 AM",
    status: "scheduled",
  },
  {
    id: "2",
    title: "UX Designer Interview - Michael Brown",
    candidateName: "Michael Brown",
    position: "UX Designer",
    type: "Portfolio Review",
    interviewers: ["Jessica Taylor"],
    date: new Date("2023-09-15"),
    time: "2:00 PM - 3:30 PM",
    status: "scheduled",
  },
  {
    id: "3",
    title: "Product Manager Interview - Emily Johnson",
    candidateName: "Emily Johnson",
    position: "Product Manager",
    type: "Behavioral",
    interviewers: ["David Kim", "Jennifer Lee"],
    date: new Date("2023-09-16"),
    time: "11:00 AM - 12:30 PM",
    status: "scheduled",
  },
  {
    id: "4",
    title: "Backend Developer Interview - Robert Lee",
    candidateName: "Robert Lee",
    position: "Backend Developer",
    type: "Technical",
    interviewers: ["Alex Chen"],
    date: new Date("2023-09-18"),
    time: "9:00 AM - 10:30 AM",
    status: "scheduled",
  },
  {
    id: "5",
    title: "DevOps Engineer Interview - Lisa Chen",
    candidateName: "Lisa Chen",
    position: "DevOps Engineer",
    type: "Technical",
    interviewers: ["Mike Wilson", "Sarah Davis"],
    date: new Date("2023-09-20"),
    time: "3:00 PM - 4:30 PM",
    status: "scheduled",
  },
];

// Helper function to filter the interviews
const filterInterviews = (interviews: any[], query: string, statusFilter: string) => {
  return interviews.filter((interview) => {
    const matchesQuery =
      query === "" ||
      interview.candidateName.toLowerCase().includes(query.toLowerCase()) ||
      interview.position.toLowerCase().includes(query.toLowerCase()) ||
      interview.title.toLowerCase().includes(query.toLowerCase());

    const matchesStatus = statusFilter === "all" || interview.status === statusFilter;

    return matchesQuery && matchesStatus;
  });
};

// Helper function to format dates for display and comparison
const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const InterviewCalendar = ({ searchQuery, statusFilter }: InterviewCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();
  
  const filteredInterviews = filterInterviews(mockInterviews, searchQuery, statusFilter);
  
  // Function to check if a date has interviews
  const hasInterviewsOnDate = (date: Date) => {
    return filteredInterviews.some((interview) => isSameDay(interview.date, date));
  };
  
  // Get interviews for the selected date
  const interviewsForSelectedDate = selectedDate
    ? filteredInterviews.filter((interview) => isSameDay(interview.date, selectedDate))
    : [];

  return (
    <div className="grid md:grid-cols-7 gap-6">
      <div className="md:col-span-2">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border shadow p-3 w-full"
          modifiers={{
            hasInterview: (date) => hasInterviewsOnDate(date),
          }}
          modifiersStyles={{
            hasInterview: { 
              fontWeight: 'bold',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '50%'
            }
          }}
        />
      </div>
      
      <div className="md:col-span-5">
        <h3 className="text-lg font-medium mb-4">
          {selectedDate ? `Interviews on ${selectedDate.toLocaleDateString()}` : 'Select a date'}
        </h3>
        
        {interviewsForSelectedDate.length === 0 ? (
          <div className="text-center py-8 border rounded-md">
            <p className="text-muted-foreground mb-2">No interviews scheduled for this date</p>
            <Button onClick={() => navigate("/interviews/schedule")}>
              <UserPlus className="mr-2 h-4 w-4" />
              Schedule Interview
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {interviewsForSelectedDate.map((interview) => (
              <Card key={interview.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{interview.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{interview.time}</span>
                      </div>
                    </div>
                    <Badge>{interview.type}</Badge>
                  </div>
                  
                  <div className="grid sm:grid-cols-3 gap-4 mt-4">
                    <div>
                      <h5 className="text-sm font-medium mb-1">Candidate</h5>
                      <p className="text-sm">{interview.candidateName}</p>
                      <p className="text-xs text-muted-foreground">{interview.position}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium mb-1">Interviewers</h5>
                      <div>
                        {interview.interviewers.map((interviewer, i) => (
                          <p key={i} className="text-sm">{interviewer}</p>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-end justify-end">
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="sm">
                                <Video className="h-4 w-4" />
                                <span className="ml-1 hidden md:inline">Join</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Join Virtual Interview</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewCalendar;
