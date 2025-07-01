
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { attendanceRecords } from "@/mock/mockData";
import { AttendanceRecord } from "@/types/attendance";
import { format } from "date-fns";
import { CalendarCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { RecordAttendanceForm } from "@/components/attendance/RecordAttendanceForm";

const AttendanceManagement = () => {
  const { toast } = useToast();
  const [selectedGrade, setSelectedGrade] = useState<number | "">("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredAttendance, setFilteredAttendance] = useState<AttendanceRecord[]>(attendanceRecords);
  const [view, setView] = useState<"daily" | "report">("daily");
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false);

  // Filter attendance records
  const handleFilterChange = () => {
    let filtered = [...attendanceRecords];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(record => 
        record.studentId.toLowerCase().includes(query) || 
        record.courseId.toLowerCase().includes(query)
      );
    }

    // Filter by date
    if (selectedDate) {
      const filterDate = new Date(selectedDate);
      filtered = filtered.filter(record => {
        const recordDate = new Date(record.date);
        return (
          recordDate.getFullYear() === filterDate.getFullYear() &&
          recordDate.getMonth() === filterDate.getMonth() &&
          recordDate.getDate() === filterDate.getDate()
        );
      });
    }

    // Filter by course
    if (selectedCourse) {
      filtered = filtered.filter(record => record.courseId === selectedCourse);
    }

    // TODO: Filter by grade and section once the data structure supports it
    // This would require joining with student data

    setFilteredAttendance(filtered);
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Present':
        return <Badge className="bg-green-500">Present</Badge>;
      case 'Absent':
        return <Badge variant="destructive">Absent</Badge>;
      case 'Late':
        return <Badge className="bg-yellow-500">Late</Badge>;
      case 'Excused':
        return <Badge className="bg-blue-500">Excused</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleRecordAttendanceSuccess = () => {
    setIsRecordDialogOpen(false);
    toast({
      title: "Attendance Recorded",
      description: "Attendance has been recorded successfully.",
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Attendance Management</h1>
        <Button onClick={() => setIsRecordDialogOpen(true)}>
          <CalendarCheck className="mr-2 h-4 w-4" />
          Record Attendance
        </Button>
      </div>

      <Tabs defaultValue="daily" className="w-full" onValueChange={(value) => setView(value as "daily" | "report")}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="daily">Daily Attendance</TabsTrigger>
          <TabsTrigger value="report">Attendance Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Filter</CardTitle>
              <CardDescription>
                Filter attendance records by date, class, section, or subject
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <Select value={selectedGrade.toString()} onValueChange={(value) => setSelectedGrade(Number(value) || "")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                        <SelectItem key={grade} value={grade.toString()}>
                          Grade {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                  <Select value={selectedSection} onValueChange={setSelectedSection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Section" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A", "B", "C", "D"].map((section) => (
                        <SelectItem key={section} value={section}>
                          Section {section}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {attendanceRecords
                        .map(record => record.courseId)
                        .filter((value, index, self) => self.indexOf(value) === index)
                        .slice(0, 10)
                        .map(courseId => (
                          <SelectItem key={courseId} value={courseId}>
                            {courseId}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                  <Input
                    placeholder="Search by student ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Button variant="outline" className="mt-4" onClick={handleFilterChange}>
                Apply Filters
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>
                Showing {filteredAttendance.length} attendance records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Subject ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Remarks</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAttendance.length > 0 ? (
                      filteredAttendance.slice(0, 10).map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.studentId}</TableCell>
                          <TableCell>{record.courseId}</TableCell>
                          <TableCell>{format(new Date(record.date), "MMM d, yyyy")}</TableCell>
                          <TableCell>{getStatusBadge(record.status)}</TableCell>
                          <TableCell>{record.remarks || "-"}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Edit</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                <path d="m15 5 4 4" />
                              </svg>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center h-24">
                          No attendance records found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Reports</CardTitle>
              <CardDescription>
                View attendance statistics and reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">87%</div>
                    <p className="text-xs text-muted-foreground">Average Attendance Rate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">94%</div>
                    <p className="text-xs text-muted-foreground">Present</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">4%</div>
                    <p className="text-xs text-muted-foreground">Absent</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">2%</div>
                    <p className="text-xs text-muted-foreground">Late</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Select specific parameters to generate detailed attendance reports
                </p>
                <Button>Generate Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Record Attendance Dialog */}
      <Dialog open={isRecordDialogOpen} onOpenChange={setIsRecordDialogOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Record Attendance</DialogTitle>
            <DialogDescription>
              Select the class and subject to record attendance
            </DialogDescription>
          </DialogHeader>
          <RecordAttendanceForm onSuccess={handleRecordAttendanceSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AttendanceManagement;
