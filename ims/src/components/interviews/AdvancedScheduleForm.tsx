import { useState, useEffect } from "react";
import { X, Calendar, Clock, Users, Video, File, Download, Globe, Bell, Lightbulb } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { 
  InterviewType, 
  InterviewStatus, 
  VideoConferencingPlatform,
  AdvancedInterview,
  TimeSlot
} from "@/types";
import { v4 as uuidv4 } from "uuid";

interface AdvancedScheduleFormProps {
  isOpen: boolean;
  onClose: () => void;
  candidateId?: string;
}

// Mock data for interviewers
const mockInterviewers = [
  { id: "1", name: "Alex Chen", department: "Engineering", expertise: ["Technical", "Coding Assessment"], availability: [9, 10, 11, 14, 15, 16], avatar: "AC" },
  { id: "2", name: "Rebecca Johnson", department: "Engineering", expertise: ["Technical", "System Design"], availability: [10, 11, 13, 14, 15], avatar: "RJ" },
  { id: "3", name: "Jessica Taylor", department: "Design", expertise: ["Portfolio Review", "Cultural"], availability: [9, 10, 13, 14, 16], avatar: "JT" },
  { id: "4", name: "David Kim", department: "Product", expertise: ["Case Study", "Behavioral"], availability: [11, 12, 13, 14, 15], avatar: "DK" },
  { id: "5", name: "Jennifer Lee", department: "HR", expertise: ["HR", "Cultural", "Behavioral"], availability: [9, 10, 11, 13, 14], avatar: "JL" },
];

// Mock candidates data
const mockCandidates = [
  { id: "1", name: "Sarah Williams", position: "Frontend Developer", availability: [10, 11, 14, 15], avatar: "SW" },
  { id: "2", name: "Michael Brown", position: "UX Designer", availability: [9, 10, 15, 16], avatar: "MB" },
  { id: "3", name: "Emily Johnson", position: "Product Manager", availability: [11, 13, 14, 15], avatar: "EJ" },
  { id: "4", name: "Robert Lee", position: "Backend Developer", availability: [10, 12, 14, 16], avatar: "RL" },
  { id: "5", name: "Lisa Chen", position: "DevOps Engineer", availability: [9, 11, 13, 15], avatar: "LC" },
];

// Mock time zones
const timeZones = [
  { id: "utc", name: "UTC (GMT+0)", offset: 0 },
  { id: "est", name: "EST (GMT-5)", offset: -5 },
  { id: "cst", name: "CST (GMT-6)", offset: -6 },
  { id: "mst", name: "MST (GMT-7)", offset: -7 },
  { id: "pst", name: "PST (GMT-8)", offset: -8 },
  { id: "ist", name: "IST (GMT+5:30)", offset: 5.5 },
  { id: "jst", name: "JST (GMT+9)", offset: 9 },
  { id: "aest", name: "AEST (GMT+10)", offset: 10 },
];

// Mock AI recommendations
const mockAIRecommendations = {
  timeSlots: [
    { date: addDays(new Date(), 2), hour: 10 },
    { date: addDays(new Date(), 2), hour: 14 },
    { date: addDays(new Date(), 3), hour: 11 },
  ],
  interviewers: ["1", "2"],
  type: "Technical" as InterviewType,
  reasonings: [
    "Based on candidate skills and job requirements",
    "Interviewers availability matches candidate's preferred times",
    "Technical interview is recommended as the next step in the hiring process"
  ]
};

const videoConferencingPlatforms: VideoConferencingPlatform[] = [
  "Zoom",
  "Google Meet",
  "Microsoft Teams",
  "Custom"
];

const interviewTypes: InterviewType[] = [
  "Screening",
  "Technical",
  "Behavioral",
  "Cultural",
  "HR",
  "Panel",
  "Group",
  "One-on-One",
  "Coding Assessment",
  "Case Study",
  "Final",
  "Portfolio Review"
];

const getAvailableTimeSlots = (selectedDate: Date, selectedInterviewers: string[]) => {
  // In a real app, this would query a database or API
  const hours = Array.from({ length: 9 }, (_, i) => i + 9); // 9 AM to 5 PM
  
  // Start with all hours available
  const availableSlots: TimeSlot[] = hours.map(hour => ({
    id: uuidv4(),
    startTime: `${hour}:00`,
    endTime: `${hour + 1}:00`,
    day: format(selectedDate, "yyyy-MM-dd"),
    isAvailable: true
  }));
  
  // If interviewers are selected, filter by their availability
  if (selectedInterviewers.length > 0) {
    const interviewerObjects = mockInterviewers.filter(interviewer => 
      selectedInterviewers.includes(interviewer.id)
    );
    
    return availableSlots.map(slot => {
      const hour = parseInt(slot.startTime.split(':')[0]);
      const isAvailable = interviewerObjects.every(interviewer => 
        interviewer.availability.includes(hour)
      );
      return { ...slot, isAvailable };
    });
  }
  
  return availableSlots;
};

const AdvancedScheduleForm = ({ isOpen, onClose, candidateId }: AdvancedScheduleFormProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedCandidate, setSelectedCandidate] = useState(candidateId || "");
  const [selectedInterviewers, setSelectedInterviewers] = useState<string[]>([]);
  const [interviewType, setInterviewType] = useState<InterviewType>("Technical");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeZone, setTimeZone] = useState("utc");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);
  const [videoConferencingPlatform, setVideoConferencingPlatform] = useState<VideoConferencingPlatform>("Zoom");
  const [videoLink, setVideoLink] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [password, setPassword] = useState("");
  
  // Notification settings
  const [sendEmail, setSendEmail] = useState(true);
  const [sendSMS, setSendSMS] = useState(false);
  const [sendPush, setSendPush] = useState(true);
  const [reminderTimes, setReminderTimes] = useState([24, 1]); // hours before
  
  // ATS Integration
  const [syncWithATS, setSyncWithATS] = useState(true);
  const [atsSystem, setATSSystem] = useState("Workday");
  
  // AI Recommendations
  const [useAIRecommendations, setUseAIRecommendations] = useState(false);
  
  // Available time slots based on selected date and interviewers
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  
  // Progress in form completion
  const [formProgress, setFormProgress] = useState(0);

  // Pre-select candidate if candidateId is provided
  useEffect(() => {
    if (candidateId) {
      setSelectedCandidate(candidateId);
    }
  }, [candidateId]);

  // Update available time slots when date or interviewers change
  useEffect(() => {
    if (date) {
      const slots = getAvailableTimeSlots(date, selectedInterviewers);
      setAvailableTimeSlots(slots);
    }
  }, [date, selectedInterviewers]);

  // Update form progress
  useEffect(() => {
    let progress = 0;
    if (selectedCandidate) progress += 15;
    if (selectedInterviewers.length > 0) progress += 15;
    if (interviewType) progress += 10;
    if (date) progress += 15;
    if (startTime && endTime) progress += 15;
    if (videoConferencingPlatform && (videoLink || meetingId)) progress += 15;
    if (timeZone) progress += 15;
    
    setFormProgress(progress);
  }, [selectedCandidate, selectedInterviewers, interviewType, date, startTime, endTime, videoConferencingPlatform, videoLink, meetingId, timeZone]);

  // Apply AI recommendations
  const applyAIRecommendations = () => {
    if (useAIRecommendations) {
      const recommendation = mockAIRecommendations;
      setDate(recommendation.timeSlots[0].date);
      setStartTime(`${recommendation.timeSlots[0].hour}:00`);
      setEndTime(`${recommendation.timeSlots[0].hour + 1}:00`);
      setSelectedInterviewers(recommendation.interviewers);
      setInterviewType(recommendation.type);
      
      toast({
        title: "AI Recommendations Applied",
        description: "Schedule optimized based on candidate and job requirements",
      });
    }
  };

  // Handle AI recommendation toggle
  useEffect(() => {
    if (useAIRecommendations) {
      applyAIRecommendations();
    }
  }, [useAIRecommendations]);

  // Find candidate by ID if pre-selected
  const preSelectedCandidate = candidateId 
    ? mockCandidates.find(c => c.id === candidateId) 
    : undefined;

  // Handle document upload
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedDocuments([...uploadedDocuments, ...newFiles]);
      
      toast({
        title: "Documents Uploaded",
        description: `${newFiles.length} document(s) added to the interview`,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!date || !selectedCandidate || selectedInterviewers.length === 0 || !interviewType || !startTime || !endTime || !timeZone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Create interview object
    const interview: AdvancedInterview = {
      id: uuidv4(),
      candidateId: selectedCandidate,
      candidateName: mockCandidates.find(c => c.id === selectedCandidate)?.name || "",
      position: mockCandidates.find(c => c.id === selectedCandidate)?.position || "",
      type: interviewType,
      status: "Scheduled",
      date: format(date, "yyyy-MM-dd"),
      startTime,
      endTime,
      interviewers: selectedInterviewers,
      location,
      timeZone,
      videoConferencing: {
        platform: videoConferencingPlatform,
        link: videoLink,
        meetingId,
        password,
      },
      documents: uploadedDocuments.map(file => ({
        id: uuidv4(),
        name: file.name,
        type: "Other",
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString(),
      })),
      notifications: {
        sendEmail,
        sendSMS,
        sendPush,
        reminderTimes,
      },
      atsIntegration: syncWithATS ? {
        system: atsSystem,
        syncEnabled: true,
        lastSynced: new Date().toISOString(),
      } : undefined,
      isAiRecommended: useAIRecommendations,
    };
    
    // In a real app, save to database or API
    console.log("Advanced Interview scheduled:", interview);
    
    // Show success message
    toast({
      title: "Interview Scheduled",
      description: "The interview has been successfully scheduled. Notifications will be sent to all participants.",
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Advanced Interview Scheduling</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="mb-4">
          <Progress value={formProgress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-1">
            {formProgress < 100 ? "Complete all required fields to schedule the interview" : "Ready to schedule!"}
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="time">Time & Availability</TabsTrigger>
            <TabsTrigger value="conferencing">Conferencing</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit} className="mt-4">
            <TabsContent value="basic" className="space-y-4">
              {/* AI Recommendations Toggle */}
              <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                <div className="flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
                  <div>
                    <h4 className="text-sm font-medium">AI Recommendations</h4>
                    <p className="text-xs text-muted-foreground">Let AI suggest optimal interview settings</p>
                  </div>
                </div>
                <Switch
                  checked={useAIRecommendations}
                  onCheckedChange={setUseAIRecommendations}
                />
              </div>
              
              {/* Candidate Selection */}
              <div className="space-y-2">
                <Label htmlFor="candidate">Candidate *</Label>
                {preSelectedCandidate ? (
                  <div className="flex items-center p-3 border rounded-md">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>{preSelectedCandidate.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{preSelectedCandidate.name}</p>
                      <p className="text-sm text-muted-foreground">{preSelectedCandidate.position}</p>
                    </div>
                  </div>
                ) : (
                  <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a candidate" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCandidates.map(candidate => (
                        <SelectItem key={candidate.id} value={candidate.id}>
                          <div className="flex items-center">
                            <span>{candidate.name} - {candidate.position}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              
              {/* Interview Type */}
              <div className="space-y-2">
                <Label htmlFor="interviewType">Interview Type *</Label>
                <Select value={interviewType} onValueChange={(value) => setInterviewType(value as InterviewType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interview type" />
                  </SelectTrigger>
                  <SelectContent>
                    {interviewTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Interviewers */}
              <div className="space-y-2">
                <Label className="block">Interviewers *</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {mockInterviewers.map(interviewer => (
                    <div key={interviewer.id} className="flex items-center space-x-2 border p-2 rounded-md">
                      <Checkbox
                        id={`interviewer-${interviewer.id}`}
                        checked={selectedInterviewers.includes(interviewer.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedInterviewers(prev => [...prev, interviewer.id]);
                          } else {
                            setSelectedInterviewers(prev => prev.filter(id => id !== interviewer.id));
                          }
                        }}
                      />
                      <div className="flex items-center">
                        <Avatar className="h-7 w-7 mr-2">
                          <AvatarFallback>{interviewer.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <label htmlFor={`interviewer-${interviewer.id}`} className="text-sm font-medium cursor-pointer">
                            {interviewer.name}
                          </label>
                          <p className="text-xs text-muted-foreground">{interviewer.department}</p>
                        </div>
                      </div>
                      <div className="ml-auto flex gap-1">
                        {interviewer.expertise.slice(0, 2).map(exp => (
                          <Badge key={exp} variant="outline" className="text-xs whitespace-nowrap">
                            {exp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any special instructions or topics to cover"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="time" className="space-y-4">
              {/* Date Selection */}
              <div className="space-y-2">
                <Label>Date *</Label>
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
              <div className="space-y-2">
                <Label>Available Time Slots *</Label>
                {date ? (
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {availableTimeSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        type="button"
                        variant={startTime === slot.startTime ? "default" : "outline"}
                        className={cn(
                          "text-xs justify-center h-auto py-2",
                          !slot.isAvailable && "opacity-50 cursor-not-allowed",
                          startTime === slot.startTime && "ring-2 ring-primary"
                        )}
                        disabled={!slot.isAvailable}
                        onClick={() => {
                          if (slot.isAvailable) {
                            setStartTime(slot.startTime);
                            setEndTime(slot.endTime);
                          }
                        }}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {slot.startTime} - {slot.endTime}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 border rounded-md text-muted-foreground">
                    Please select a date first
                  </div>
                )}
              </div>
              
              {/* Duration Override */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
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
                  <Label htmlFor="endTime">End Time *</Label>
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
              
              {/* Time Zone */}
              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone *</Label>
                <Select value={timeZone} onValueChange={setTimeZone}>
                  <SelectTrigger>
                    <Globe className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeZones.map(tz => (
                      <SelectItem key={tz.id} value={tz.id}>
                        {tz.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">In-person Location (if applicable)</Label>
                <Input
                  id="location"
                  placeholder="Office address or meeting room"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="conferencing" className="space-y-4">
              {/* Video Conferencing */}
              <div className="space-y-2">
                <Label htmlFor="videoConferencing">Video Platform *</Label>
                <Select 
                  value={videoConferencingPlatform} 
                  onValueChange={(value) => setVideoConferencingPlatform(value as VideoConferencingPlatform)}
                >
                  <SelectTrigger>
                    <Video className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {videoConferencingPlatforms.map(platform => (
                      <SelectItem key={platform} value={platform}>
                        {platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {videoConferencingPlatform && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="videoLink">Meeting Link</Label>
                    <Input
                      id="videoLink"
                      placeholder="https://..."
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="meetingId">Meeting ID</Label>
                      <Input
                        id="meetingId"
                        placeholder="123 456 789"
                        value={meetingId}
                        onChange={(e) => setMeetingId(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="text"
                        placeholder="abc123"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Document Upload */}
              <div className="space-y-2">
                <Label htmlFor="documents">Upload Documents</Label>
                <div className="flex items-center">
                  <Input
                    id="documents"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleDocumentUpload}
                  />
                  <Label 
                    htmlFor="documents" 
                    className="cursor-pointer flex items-center justify-center w-full border border-dashed rounded-md p-4 hover:bg-accent"
                  >
                    <File className="h-4 w-4 mr-2" />
                    Click to upload documents
                  </Label>
                </div>
                
                {uploadedDocuments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    <p className="text-sm font-medium">Uploaded Documents</p>
                    {uploadedDocuments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-accent/30 rounded p-2">
                        <div className="flex items-center">
                          <File className="h-4 w-4 mr-2" />
                          <span className="text-sm">{file.name}</span>
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setUploadedDocuments(prev => 
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-4">
              {/* Notifications */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-sm font-medium mb-4 flex items-center">
                    <Bell className="h-4 w-4 mr-2" />
                    Notification Settings
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sendEmail" className="flex items-center space-x-2">
                        <span>Send Email Notifications</span>
                      </Label>
                      <Switch
                        id="sendEmail"
                        checked={sendEmail}
                        onCheckedChange={setSendEmail}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sendSMS" className="flex items-center space-x-2">
                        <span>Send SMS Notifications</span>
                      </Label>
                      <Switch
                        id="sendSMS"
                        checked={sendSMS}
                        onCheckedChange={setSendSMS}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sendPush" className="flex items-center space-x-2">
                        <span>Send Push Notifications</span>
                      </Label>
                      <Switch
                        id="sendPush"
                        checked={sendPush}
                        onCheckedChange={setSendPush}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Send Reminders (hours before interview)</Label>
                      <div className="flex flex-wrap gap-2">
                        {[24, 12, 3, 1].map((hours) => (
                          <Badge
                            key={hours}
                            variant={reminderTimes.includes(hours) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              if (reminderTimes.includes(hours)) {
                                setReminderTimes(reminderTimes.filter(t => t !== hours));
                              } else {
                                setReminderTimes([...reminderTimes, hours].sort((a, b) => b - a));
                              }
                            }}
                          >
                            {hours} {hours === 1 ? 'hour' : 'hours'}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* ATS Integration */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      ATS Integration
                    </h3>
                    <Switch
                      checked={syncWithATS}
                      onCheckedChange={setSyncWithATS}
                    />
                  </div>
                  
                  {syncWithATS && (
                    <div className="space-y-2">
                      <Label htmlFor="atsSystem">ATS System</Label>
                      <Select value={atsSystem} onValueChange={setATSSystem}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ATS" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Workday">Workday</SelectItem>
                          <SelectItem value="Greenhouse">Greenhouse</SelectItem>
                          <SelectItem value="Lever">Lever</SelectItem>
                          <SelectItem value="Bamboo HR">Bamboo HR</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Interview data will be automatically synchronized with your ATS
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* AI Recommendations */}
              {useAIRecommendations && (
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="pt-6">
                    <h3 className="text-sm font-medium mb-2 flex items-center text-amber-800">
                      <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
                      AI Recommendations
                    </h3>
                    
                    <div className="space-y-2 text-sm text-amber-800">
                      <p>Based on analysis of candidate profile and past hiring data:</p>
                      <ul className="list-disc pl-5 space-y-1 text-xs">
                        {mockAIRecommendations.reasonings.map((reason, index) => (
                          <li key={index}>{reason}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <DialogFooter className="mt-6">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Schedule Interview
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedScheduleForm;
