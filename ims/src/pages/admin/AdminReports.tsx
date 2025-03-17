
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, BarChart2, Calendar, Users } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { exportInterviews, exportCandidates, exportFeedback } from "@/utils/reportGenerator";
import { Interview, Candidate, Feedback } from "@/types";

const mockInterviews: Interview[] = [
  {
    id: "1",
    candidateId: "c1",
    candidateName: "Sarah Johnson",
    position: "Frontend Developer",
    type: "Technical",
    status: "Scheduled",
    date: "2023-07-15",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    interviewers: ["Alex Chen", "Maria Rodriguez"],
    location: "Conference Room A",
    notes: "Focus on React and TypeScript experience",
  },
  {
    id: "2",
    candidateId: "c2",
    candidateName: "Michael Brown",
    position: "Product Manager",
    type: "Behavioral",
    status: "Completed",
    date: "2023-07-10",
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    interviewers: ["John Smith", "Lisa Wong"],
    videoLink: "https://meet.google.com/abc-defg-hij",
    notes: "Assess leadership and communication skills",
  },
];

const mockCandidates: Candidate[] = [
  {
    id: "c1",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "555-123-4567",
    status: "Technical",
    position: "Frontend Developer",
    department: "Engineering",
    source: "LinkedIn",
    appliedDate: "2023-07-01",
    skills: [
      { id: "s1", name: "React" },
      { id: "s2", name: "TypeScript" },
      { id: "s3", name: "CSS" }
    ],
    resumeUrl: "https://example.com/resume/sarah.pdf",
  },
  {
    id: "c2",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    phone: "555-987-6543",
    status: "Offer",
    position: "Product Manager",
    department: "Product",
    source: "Referral",
    appliedDate: "2023-06-15",
    skills: [
      { id: "s4", name: "Product Strategy" },
      { id: "s5", name: "Agile" },
      { id: "s6", name: "User Research" }
    ],
    resumeUrl: "https://example.com/resume/michael.pdf",
  },
];

const mockFeedback: Feedback[] = [
  {
    id: "f1",
    interviewId: "1",
    evaluatorId: "e1",
    evaluatorName: "Alex Chen",
    overallRating: 4,
    recommendation: "Hire",
    strengths: "Strong technical skills, good communication",
    weaknesses: "Could improve system design knowledge",
    notes: "Would be a good fit for the frontend team",
    submittedAt: "2023-07-15T12:00:00Z",
  },
  {
    id: "f2",
    interviewId: "2",
    evaluatorId: "e2",
    evaluatorName: "John Smith",
    overallRating: 5,
    recommendation: "Strong Hire",
    strengths: "Excellent leadership skills, strategic thinker",
    weaknesses: "None significant",
    notes: "Would be an excellent addition to the product team",
    submittedAt: "2023-07-10T16:00:00Z",
  },
];

const AdminReports = () => {
  const handleExportInterviews = () => {
    exportInterviews(mockInterviews);
  };

  const handleExportCandidates = () => {
    exportCandidates(mockCandidates);
  };

  const handleExportFeedback = () => {
    exportFeedback(mockFeedback);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Candidate Reports</CardTitle>
                <CardDescription>
                  Export candidate data and analytics
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Candidate Pipeline</p>
                    <p className="text-sm text-muted-foreground">All candidate data</p>
                  </div>
                  <Button onClick={handleExportCandidates}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Skills Matrix</p>
                    <p className="text-sm text-muted-foreground">Candidate skills analysis</p>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Source Analytics</p>
                    <p className="text-sm text-muted-foreground">Recruitment sources data</p>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Interview Reports</CardTitle>
                <CardDescription>
                  Export interview scheduling data
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Interview Schedule</p>
                    <p className="text-sm text-muted-foreground">All interview data</p>
                  </div>
                  <Button onClick={handleExportInterviews}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Interviewer Workload</p>
                    <p className="text-sm text-muted-foreground">Interviewer allocation data</p>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">No-Show Analysis</p>
                    <p className="text-sm text-muted-foreground">Missed interview data</p>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Feedback Reports</CardTitle>
                <CardDescription>
                  Export interview feedback data
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Interview Feedback</p>
                    <p className="text-sm text-muted-foreground">All feedback data</p>
                  </div>
                  <Button onClick={handleExportFeedback}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Ratings Analysis</p>
                    <p className="text-sm text-muted-foreground">Feedback ratings data</p>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Hire Rate Analysis</p>
                    <p className="text-sm text-muted-foreground">Hiring recommendation data</p>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Hiring Analytics Dashboard</CardTitle>
              <CardDescription>
                Overview of key hiring metrics and performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="flex flex-col items-center text-muted-foreground">
                <BarChart2 className="h-16 w-16 mb-4" />
                <p>Advanced analytics dashboard will be implemented in a future update</p>
                <Button className="mt-4">
                  <Download className="h-4 w-4 mr-2" />
                  Export Dashboard Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
