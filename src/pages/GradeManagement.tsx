
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
import { GradeRecord } from "@/types/grade";
import { gradeRecords } from "@/mock/mockData";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddGradeForm } from "@/components/grades/AddGradeForm";

const GradeManagement = () => {
  const { toast } = useToast();
  const [selectedGrade, setSelectedGrade] = useState<number | "">("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedAssessment, setSelectedAssessment] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredGradeRecords, setFilteredGradeRecords] = useState<GradeRecord[]>(gradeRecords);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter grades when filters change
  const handleFilterChange = () => {
    let filtered = [...gradeRecords];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(record => 
        record.studentId.toLowerCase().includes(query)
      );
    }

    // Apply other filters
    if (selectedAssessment) {
      filtered = filtered.filter(record => record.assessmentType === selectedAssessment);
    }

    // TODO: Filter by grade, section, and course once the data structure supports it
    // This would require joining with student and course data

    setFilteredGradeRecords(filtered);
  };

  // Get letter grade color
  const getGradeColor = (grade?: string) => {
    if (!grade) return "text-gray-400";
    
    switch(grade.charAt(0)) {
      case 'A': return "text-green-600";
      case 'B': return "text-blue-600";
      case 'C': return "text-yellow-600";
      case 'D': return "text-orange-600";
      case 'F': return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const handleAddGradeSuccess = () => {
    setIsAddDialogOpen(false);
    toast({
      title: "Grade Added",
      description: "The grade has been added successfully.",
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Grade Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Grade
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grades Filter</CardTitle>
          <CardDescription>
            Filter grades by class, section, subject, or student
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
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
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={selectedAssessment} onValueChange={setSelectedAssessment}>
                <SelectTrigger>
                  <SelectValue placeholder="Assessment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Quiz">Quiz</SelectItem>
                  <SelectItem value="Assignment">Assignment</SelectItem>
                  <SelectItem value="Mid-term">Mid-Term</SelectItem>
                  <SelectItem value="Final">Final</SelectItem>
                  <SelectItem value="Project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
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

      <Card>
        <CardHeader>
          <CardTitle>Grade Records</CardTitle>
          <CardDescription>
            Showing {filteredGradeRecords.length} grade records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Subject ID</TableHead>
                  <TableHead>Assessment Type</TableHead>
                  <TableHead>Academic Year</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead className="text-right">Score / 100</TableHead>
                  <TableHead className="text-right">Letter Grade</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGradeRecords.length > 0 ? (
                  filteredGradeRecords.slice(0, 10).map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.studentId}</TableCell>
                      <TableCell>{record.courseId}</TableCell>
                      <TableCell>{record.assessmentType}</TableCell>
                      <TableCell>{record.academicYear}</TableCell>
                      <TableCell>{record.semester}</TableCell>
                      <TableCell className="text-right font-medium">
                        {record.scoreOutOf100}%
                      </TableCell>
                      <TableCell className={`text-right font-bold ${getGradeColor(record.letterGrade)}`}>
                        {record.letterGrade}
                      </TableCell>
                      <TableCell>{format(new Date(record.date), "MMM d, yyyy")}</TableCell>
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
                    <TableCell colSpan={9} className="text-center h-24">
                      No grades found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Grade Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Grade</DialogTitle>
            <DialogDescription>
              Enter grade details for a student
            </DialogDescription>
          </DialogHeader>
          <AddGradeForm onSuccess={handleAddGradeSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GradeManagement;
