
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statistics } from "@/mock/mockData";

// Import chart components
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

const ReportsAndStatistics = () => {
  const [reportType, setReportType] = useState("academic");
  const [timeFrame, setTimeFrame] = useState("currentYear");

  // For grade distribution chart
  const gradeData = statistics.gradeDistribution;

  // For gender distribution pie chart
  const genderData = [
    { name: "Male", value: statistics.genderDistribution.male },
    { name: "Female", value: statistics.genderDistribution.female },
  ];

  // For inmate vs non-inmate pie chart
  const inmateData = [
    { name: "Inmate", value: statistics.inmateStudents },
    { name: "Non-Inmate", value: statistics.nonInmateStudents },
  ];

  // Mock attendance data for line chart
  const attendanceData = [
    { month: "Jan", attendance: 92 },
    { month: "Feb", attendance: 88 },
    { month: "Mar", attendance: 91 },
    { month: "Apr", attendance: 85 },
    { month: "May", attendance: 89 },
    { month: "Jun", attendance: 90 },
    { month: "Jul", attendance: 80 },
    { month: "Aug", attendance: 82 },
    { month: "Sep", attendance: 87 },
    { month: "Oct", attendance: 91 },
    { month: "Nov", attendance: 88 },
    { month: "Dec", attendance: 86 },
  ];

  // Mock exam performance data
  const examData = [
    { subject: "Mathematics", passed: 85, failed: 15 },
    { subject: "Science", passed: 78, failed: 22 },
    { subject: "Language", passed: 90, failed: 10 },
    { subject: "Social Studies", passed: 82, failed: 18 },
    { subject: "Arts", passed: 95, failed: 5 },
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reports & Statistics</h1>
          <p className="text-muted-foreground">
            Comprehensive data analysis and visualizations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalStudents}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {statistics.activeStudents} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Teachers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalTeachers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {statistics.activeTeachers} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.averageAttendance}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Grade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.averageGrade}/100</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all subjects
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Student Distribution by Grade</CardTitle>
                <CardDescription>Number of students in each grade</CardDescription>
              </div>
              <ChartBar className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={gradeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Gender Distribution</CardTitle>
            <CardDescription>Male vs Female students</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="attendance" className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="attendance">Attendance Trends</TabsTrigger>
            <TabsTrigger value="exam">Exam Performance</TabsTrigger>
            <TabsTrigger value="inmate">Inmate Statistics</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Frame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="currentYear">Current Academic Year</SelectItem>
                <SelectItem value="lastYear">Previous Academic Year</SelectItem>
                <SelectItem value="last3Years">Last 3 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <TabsContent value="attendance" className="mt-0 border rounded-md p-6">
          <h3 className="text-lg font-medium mb-4">Monthly Attendance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[75, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#8884d8"
                name="Attendance %"
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
        <TabsContent value="exam" className="mt-0 border rounded-md p-6">
          <h3 className="text-lg font-medium mb-4">Exam Performance by Subject</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={examData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="passed" fill="#82ca9d" name="Passed" stackId="a" />
              <Bar dataKey="failed" fill="#ff8042" name="Failed" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
        <TabsContent value="inmate" className="mt-0 border rounded-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Inmate vs Non-Inmate Students</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={inmateData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {inmateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Key Statistics</h3>
              <ul className="space-y-3">
                <li className="flex justify-between border-b pb-2">
                  <span>Total Inmate Students:</span>
                  <span className="font-medium">{statistics.inmateStudents}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Total Non-Inmate Students:</span>
                  <span className="font-medium">{statistics.nonInmateStudents}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Average Grade (Inmates):</span>
                  <span className="font-medium">72/100</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Average Grade (Non-Inmates):</span>
                  <span className="font-medium">75/100</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Attendance Rate (Inmates):</span>
                  <span className="font-medium">88%</span>
                </li>
                <li className="flex justify-between">
                  <span>Attendance Rate (Non-Inmates):</span>
                  <span className="font-medium">91%</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsAndStatistics;
