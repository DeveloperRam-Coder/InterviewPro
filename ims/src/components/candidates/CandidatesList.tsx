
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MessageSquare,
  MoreHorizontal,
  Calendar,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Candidate {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  position: string;
  status: string;
  stage: string;
  appliedDate: string;
  lastInteraction: string;
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Emily Johnson",
    avatar: "EJ",
    email: "emily.johnson@example.com",
    phone: "+1 (555) 123-4567",
    position: "Senior React Developer",
    status: "technical",
    stage: "Technical Interview",
    appliedDate: "2023-08-15",
    lastInteraction: "2 days ago",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "MC",
    email: "michael.chen@example.com",
    phone: "+1 (555) 234-5678",
    position: "UX Designer",
    status: "cultural",
    stage: "Cultural Fit Interview",
    appliedDate: "2023-08-18",
    lastInteraction: "1 day ago",
  },
  {
    id: "3",
    name: "Sarah Williams",
    avatar: "SW",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 345-6789",
    position: "Product Manager",
    status: "offer",
    stage: "Offer Extended",
    appliedDate: "2023-07-25",
    lastInteraction: "4 hours ago",
  },
  {
    id: "4",
    name: "David Rodriguez",
    avatar: "DR",
    email: "david.rodriguez@example.com",
    phone: "+1 (555) 456-7890",
    position: "Marketing Specialist",
    status: "screening",
    stage: "Resume Screening",
    appliedDate: "2023-08-24",
    lastInteraction: "Just now",
  },
  {
    id: "5",
    name: "Jennifer Lee",
    avatar: "JL",
    email: "jennifer.lee@example.com",
    phone: "+1 (555) 567-8901",
    position: "Frontend Developer",
    status: "rejected",
    stage: "Rejected after Technical",
    appliedDate: "2023-08-10",
    lastInteraction: "5 days ago",
  },
  {
    id: "6",
    name: "Robert Kim",
    avatar: "RK",
    email: "robert.kim@example.com",
    phone: "+1 (555) 678-9012",
    position: "DevOps Engineer",
    status: "hired",
    stage: "Hired",
    appliedDate: "2023-07-15",
    lastInteraction: "1 week ago",
  },
];

interface CandidatesListProps {
  searchQuery: string;
  statusFilter: string;
  positionFilter: string;
}

const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { label: string; color: string }> = {
    screening: { label: "Screening", color: "bg-gray-500" },
    technical: { label: "Technical", color: "bg-indigo-500" },
    cultural: { label: "Cultural", color: "bg-purple-500" },
    offer: { label: "Offer", color: "bg-yellow-500" },
    hired: { label: "Hired", color: "bg-green-500" },
    rejected: { label: "Rejected", color: "bg-red-500" },
  };

  const config = statusConfig[status] || { label: status, color: "bg-gray-500" };
  return <Badge className={`${config.color}`}>{config.label}</Badge>;
};

const CandidatesList = ({ searchQuery, statusFilter, positionFilter }: CandidatesListProps) => {
  const [expandedCandidate, setExpandedCandidate] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleExpand = (id: string) => {
    setExpandedCandidate(expandedCandidate === id ? null : id);
  };

  const filteredCandidates = mockCandidates.filter((candidate) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter;

    // Position filter
    const matchesPosition =
      positionFilter === "all" ||
      candidate.position.toLowerCase().includes(positionFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesPosition;
  });

  if (filteredCandidates.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground mb-4">No candidates match your filters</p>
        <Button onClick={() => navigate("/candidates/new")}>Add New Candidate</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredCandidates.map((candidate) => (
        <div key={candidate.id} className="border rounded-lg overflow-hidden">
          <div className="bg-background p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${candidate.name.replace(" ", "+")}`} />
                  <AvatarFallback>{candidate.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{candidate.name}</h3>
                  <p className="text-sm text-muted-foreground">{candidate.position}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(candidate.status)}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleExpand(candidate.id)}
                >
                  {expandedCandidate === candidate.id ? (
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
                    <DropdownMenuItem onClick={() => navigate(`/candidates/${candidate.id}`)}>
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/interviews/schedule/${candidate.id}`)}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Interview
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {expandedCandidate === candidate.id && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <h4 className="text-sm font-medium mb-2">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{candidate.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{candidate.phone}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Application Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Applied: {new Date(candidate.appliedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span>Last Update: {candidate.lastInteraction}</span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => navigate(`/candidates/${candidate.id}`)}>
                    View Profile
                  </Button>
                  <Button size="sm" onClick={() => navigate(`/interviews/schedule/${candidate.id}`)}>
                    Schedule Interview
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

export default CandidatesList;
