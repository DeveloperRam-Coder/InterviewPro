
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";

const mockInterviews = [
  {
    id: "1",
    candidateName: "Sarah Johnson",
    position: "Frontend Developer",
    type: "Technical",
    date: "2023-07-15",
    time: "10:00 AM - 11:00 AM",
    interviewers: ["Alex Chen"]
  },
  {
    id: "2",
    candidateName: "Michael Brown",
    position: "Product Manager",
    type: "Behavioral",
    date: "2023-07-15",
    time: "2:00 PM - 3:00 PM",
    interviewers: ["Lisa Wong", "David Kim"]
  },
  {
    id: "3",
    candidateName: "Emily Davis",
    position: "UX Designer",
    type: "Portfolio Review",
    date: "2023-07-16",
    time: "11:30 AM - 12:30 PM",
    interviewers: ["James Peters"]
  }
];

const UpcomingInterviews = () => {
  return (
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
            <Button size="sm" variant="outline">View</Button>
            <Button size="sm" variant="outline">
              <Video className="h-4 w-4 mr-1" />
              Join
            </Button>
          </div>
        </div>
      ))}
      
      <Button variant="link" className="w-full">View All Interviews</Button>
    </div>
  );
};

export default UpcomingInterviews;
