
import { useState } from "react";
import { X, Calendar, Clock, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface ScheduleInterviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  candidateId?: string;
}

// Mock candidates data
const mockCandidates = [
  { id: "1", name: "Sarah Williams", position: "Frontend Developer" },
  { id: "2", name: "Michael Brown", position: "UX Designer" },
  { id: "3", name: "Emily Johnson", position: "Product Manager" },
  { id: "4", name: "Robert Lee", position: "Backend Developer" },
  { id: "5", name: "Lisa Chen", position: "DevOps Engineer" },
];

// Mock interviewers data
const mockInterviewers = [
  { id: "1", name: "Alex Chen", department: "Engineering" },
  { id: "2", name: "Rebecca Johnson", department: "Engineering" },
  { id: "3", name: "Jessica Taylor", department: "Design" },
  { id: "4", name: "David Kim", department: "Product" },
  { id: "5", name: "Jennifer Lee", department: "Product" },
  { id: "6", name: "Mike Wilson", department: "DevOps" },
  { id: "7", name: "Sarah Davis", department: "Engineering" },
];

const ScheduleInterviewForm = ({ isOpen, onClose, candidateId }: ScheduleInterviewFormProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedCandidate, setSelectedCandidate] = useState(candidateId || "");
  const [selectedInterviewers, setSelectedInterviewers] = useState<string[]>([]);
  const [interviewType, setInterviewType] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!date || !selectedCandidate || selectedInterviewers.length === 0 || !interviewType || !startTime || !endTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Process the form submission (in a real app, this would save to an API)
    console.log("Interview scheduled:", {
      date,
      candidateId: selectedCandidate,
      interviewerIds: selectedInterviewers,
      type: interviewType,
      startTime,
      endTime,
      location,
      notes
    });
    
    toast({
      title: "Interview Scheduled",
      description: "The interview has been successfully scheduled.",
    });
    
    onClose();
  };

  // Find candidate by ID if pre-selected
  const preSelectedCandidate = candidateId 
    ? mockCandidates.find(c => c.id === candidateId) 
    : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Candidate Selection */}
            <div className="space-y-2">
              <Label htmlFor="candidate">Candidate</Label>
              {preSelectedCandidate ? (
                <div className="flex items-center border p-2 rounded-md">
                  <span>{preSelectedCandidate.name}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    ({preSelectedCandidate.position})
                  </span>
                </div>
              ) : (
                <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCandidates.map(candidate => (
                      <SelectItem key={candidate.id} value={candidate.id}>
                        {candidate.name} - {candidate.position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            
            {/* Interview Type */}
            <div className="space-y-2">
              <Label htmlFor="interviewType">Interview Type</Label>
              <Select value={interviewType} onValueChange={setInterviewType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select interview type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="screening">Initial Screening</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="behavioral">Behavioral</SelectItem>
                  <SelectItem value="portfolio">Portfolio Review</SelectItem>
                  <SelectItem value="cultural">Cultural Fit</SelectItem>
                  <SelectItem value="final">Final Round</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Interviewers */}
            <div className="space-y-2">
              <Label>Interviewers</Label>
              <div className="space-y-2">
                {mockInterviewers.map(interviewer => (
                  <div key={interviewer.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`interviewer-${interviewer.id}`}
                      value={interviewer.id}
                      checked={selectedInterviewers.includes(interviewer.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedInterviewers([...selectedInterviewers, interviewer.id]);
                        } else {
                          setSelectedInterviewers(
                            selectedInterviewers.filter(id => id !== interviewer.id)
                          );
                        }
                      }}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <label htmlFor={`interviewer-${interviewer.id}`} className="text-sm">
                      {interviewer.name} <span className="text-muted-foreground">({interviewer.department})</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Date Selection */}
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Time Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video Call (Zoom)</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="office-main">Main Office - Conference Room A</SelectItem>
                  <SelectItem value="office-secondary">Secondary Office - Meeting Room B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any special instructions or topics to cover"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Schedule Interview</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleInterviewForm;
