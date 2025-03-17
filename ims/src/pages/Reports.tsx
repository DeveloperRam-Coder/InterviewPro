
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart, Pie, Bar, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { FileText, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayout";

const hiringData = [
  { name: "Jan", interviews: 15, hires: 3, rejections: 10 },
  { name: "Feb", interviews: 20, hires: 5, rejections: 12 },
  { name: "Mar", interviews: 25, hires: 7, rejections: 15 },
  { name: "Apr", interviews: 18, hires: 4, rejections: 11 },
  { name: "May", interviews: 22, hires: 6, rejections: 14 },
  { name: "Jun", interviews: 30, hires: 9, rejections: 18 },
];

const feedbackData = [
  { name: "Technical Skills", value: 65, color: "#4f46e5" },
  { name: "Communication", value: 45, color: "#8b5cf6" },
  { name: "Problem Solving", value: 72, color: "#ec4899" },
  { name: "Cultural Fit", value: 58, color: "#10b981" },
  { name: "Experience", value: 40, color: "#f59e0b" },
];

const sourceData = [
  { name: "LinkedIn", value: 40, color: "#0e76a8" },
  { name: "Referrals", value: 25, color: "#10b981" },
  { name: "Job Boards", value: 20, color: "#8b5cf6" },
  { name: "Company Website", value: 10, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#6b7280" },
];

const Reports = () => {
  const [dateRange, setDateRange] = useState("last-30");
  const [reportType, setReportType] = useState("hiring");

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7">Last 7 Days</SelectItem>
              <SelectItem value="last-30">Last 30 Days</SelectItem>
              <SelectItem value="last-90">Last 90 Days</SelectItem>
              <SelectItem value="year-to-date">Year to Date</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="hiring" value={reportType} onValueChange={setReportType} className="space-y-4">
          <TabsList>
            <TabsTrigger value="hiring">Hiring Analytics</TabsTrigger>
            <TabsTrigger value="feedback">Feedback Analysis</TabsTrigger>
            <TabsTrigger value="sources">Candidate Sources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hiring" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hiring Trends</CardTitle>
                <CardDescription>
                  Overview of interviews, hires, and rejections over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hiringData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="interviews" fill="#4f46e5" name="Interviews" />
                      <Bar dataKey="hires" fill="#10b981" name="Hires" />
                      <Bar dataKey="rejections" fill="#ef4444" name="Rejections" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Hiring Success Rate</CardTitle>
                  <CardDescription>
                    Percentage of candidates who received offers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center h-[200px]">
                    <div className="text-6xl font-bold text-primary">24%</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      +2% from previous period
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time to Hire</CardTitle>
                  <CardDescription>
                    Average days from application to offer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={hiringData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="hires" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Evaluation Metrics</CardTitle>
                <CardDescription>
                  Average scores across different assessment criteria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={feedbackData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {feedbackData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`Score: ${value}/100`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interview Feedback Summary</CardTitle>
                <CardDescription>
                  Recent feedback submissions and ratings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-start gap-4 border-b pb-4 border-gray-100">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Frontend Developer Interview #{item}</p>
                        <p className="text-sm text-muted-foreground">
                          Submitted by Alex Chen • {item} day{item !== 1 ? 's' : ''} ago
                        </p>
                        <div className="flex gap-2 mt-1">
                          <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Technical: 4/5
                          </div>
                          <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Communication: 3/5
                          </div>
                          <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                            Overall: 4/5
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Sources</CardTitle>
                <CardDescription>
                  Distribution of where candidates come from
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Source Quality Analysis</CardTitle>
                <CardDescription>
                  Effectiveness of different recruitment channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">Source</th>
                        <th scope="col" className="px-6 py-3">Candidates</th>
                        <th scope="col" className="px-6 py-3">Interviews</th>
                        <th scope="col" className="px-6 py-3">Offers</th>
                        <th scope="col" className="px-6 py-3">Conversion Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 font-medium">LinkedIn</td>
                        <td className="px-6 py-4">120</td>
                        <td className="px-6 py-4">45</td>
                        <td className="px-6 py-4">12</td>
                        <td className="px-6 py-4">10%</td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 font-medium">Referrals</td>
                        <td className="px-6 py-4">75</td>
                        <td className="px-6 py-4">40</td>
                        <td className="px-6 py-4">18</td>
                        <td className="px-6 py-4">24%</td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 font-medium">Job Boards</td>
                        <td className="px-6 py-4">200</td>
                        <td className="px-6 py-4">60</td>
                        <td className="px-6 py-4">15</td>
                        <td className="px-6 py-4">7.5%</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-4 font-medium">Company Website</td>
                        <td className="px-6 py-4">90</td>
                        <td className="px-6 py-4">30</td>
                        <td className="px-6 py-4">8</td>
                        <td className="px-6 py-4">8.9%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
