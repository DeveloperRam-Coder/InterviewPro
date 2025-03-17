
import { Interview, Candidate, Feedback } from "@/types";

// Function to export data as CSV
export const exportToCSV = (data: any[], filename: string) => {
  // Get headers
  const headers = Object.keys(data[0]);
  
  // Create CSV header row
  const headerRow = headers.join(',');
  
  // Create CSV data rows
  const csvRows = data.map(row => {
    return headers.map(header => {
      const value = row[header];
      // Handle special values like objects, arrays, etc.
      if (typeof value === 'object') {
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      }
      
      // Handle strings with commas by quoting them
      if (typeof value === 'string' && value.includes(',')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      
      return value;
    }).join(',');
  });
  
  // Combine header and data rows
  const csvContent = [headerRow, ...csvRows].join('\n');
  
  // Create a blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Function to export interview data
export const exportInterviews = (interviews: Interview[]) => {
  // Prepare data for export
  const formattedData = interviews.map(interview => ({
    id: interview.id,
    candidateName: interview.candidateName,
    position: interview.position,
    type: interview.type,
    status: interview.status,
    date: interview.date,
    time: `${interview.startTime} - ${interview.endTime}`,
    interviewers: interview.interviewers.join(', '),
    location: interview.location || 'N/A',
    notes: interview.notes || 'N/A',
  }));
  
  exportToCSV(formattedData, 'interviews-report');
};

// Function to export candidate data
export const exportCandidates = (candidates: Candidate[]) => {
  // Prepare data for export
  const formattedData = candidates.map(candidate => ({
    id: candidate.id,
    name: `${candidate.firstName} ${candidate.lastName}`,
    email: candidate.email,
    phone: candidate.phone || 'N/A',
    position: candidate.position,
    status: candidate.status,
    appliedDate: candidate.appliedDate,
    department: candidate.department || 'N/A',
    source: candidate.source || 'N/A',
    skills: candidate.skills.map(skill => skill.name).join(', '),
  }));
  
  exportToCSV(formattedData, 'candidates-report');
};

// Function to export feedback data
export const exportFeedback = (feedback: Feedback[]) => {
  // Prepare data for export
  const formattedData = feedback.map(item => ({
    id: item.id,
    interviewId: item.interviewId,
    evaluator: item.evaluatorName,
    rating: item.overallRating,
    recommendation: item.recommendation,
    strengths: item.strengths || 'N/A',
    weaknesses: item.weaknesses || 'N/A',
    notes: item.notes || 'N/A',
    submittedAt: item.submittedAt,
  }));
  
  exportToCSV(formattedData, 'feedback-report');
};
