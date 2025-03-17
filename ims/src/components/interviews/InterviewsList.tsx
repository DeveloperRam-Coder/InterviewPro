
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Clock, Calendar, User, Users, MessageSquare, Video, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InterviewsListProps {
  searchQuery: string;
  statusFilter: string;
}

// Mock data for interviews (using the same data from InterviewCalendar)
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
    notes: "Focus on React and TypeScript experience",
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
    notes: "Review portfolio, focusing on mobile design work",
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
    notes: "Ask about experience with B2B SaaS products",
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
    notes: "Focus on Node.js and database experience",
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
    notes: "Ask about CI/CD pipeline experience and cloud infrastructure",
  },
];

const InterviewsList = ({ searchQuery, statusFilter }: InterviewsListProps) => {
  const [expandedInterview, setExpandedInterview] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleExpand = (id: string) => {
    setExpandedInterview(expandedInterview === id ? null : id);
  };

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

  const filteredInterviews = filterInterviews(mockInterviews, searchQuery, statusFilter);

  // Sort interviews by date (closest first)
  const sortedInterviews = [...filteredInterviews].sort((a, b) => 
    a.date.getTime() - b.date.getTime()
  );

  if (sortedInterviews.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground mb-4">No interviews match your filters</p>
        <Button onClick={() => navigate("/interviews/schedule")}>Schedule New Interview</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedInterviews.map((interview) => (
        <div key={interview.id} className="border rounded-lg overflow-hidden">
          <div className="bg-background p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${interview.candidateName.replace(" ", "+")}`} />
                  <AvatarFallback>{interview.candidateName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{interview.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{interview.position}</span>
                    <span>•</span>
                    <Badge variant="outline">{interview.type}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{interview.date.toLocaleDateString()}</span>
                </div>
                <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground ml-4">
                  <Clock className="h-4 w-4" />
                  <span>{interview.time}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleExpand(interview.id)}
                >
                  {expandedInterview === interview.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate(`/interviews/${interview.id}`)}>
                      <User className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Video className="mr-2 h-4 w-4" />
                      Join Interview
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Add Feedback
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      Reschedule
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {expandedInterview === interview.id && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <h4 className="text-sm font-medium mb-2">Date & Time</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{interview.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{interview.time}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Interviewers</h4>
                  <div className="space-y-2">
                    {interview.interviewers.map((interviewer, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{interviewer}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Notes</h4>
                  <p className="text-sm">{interview.notes}</p>
                </div>
                <div className="md:col-span-3 flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => navigate(`/interviews/${interview.id}`)}>
                    View Details
                  </Button>
                  <Button size="sm">
                    <Video className="h-4 w-4 mr-1" />
                    Join Interview
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterviewsList;
