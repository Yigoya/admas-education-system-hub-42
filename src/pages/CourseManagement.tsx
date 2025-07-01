
import { useState } from "react";
import { BookOpen, Plus, Search, MoreVertical, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Subject } from "@/types/course";
import { courses, teachers } from "@/mock/mockData";

const CourseManagement = () => {
  const { toast } = useToast();
  const [filteredCourses, setFilteredCourses] = useState<Subject[]>(courses);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Subject | null>(null);
  
  // Search functionality
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    
    if (value === "") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter(
          course => 
            course.name.toLowerCase().includes(value) ||
            course.code.toLowerCase().includes(value) ||
            `grade ${course.grade}`.includes(value)
        )
      );
    }
  };

  // Delete course
  const handleDelete = (course: Subject) => {
    toast({
      title: "Course deleted",
      description: `${course.name} (${course.code}) has been deleted successfully.`,
    });
    setFilteredCourses(filteredCourses.filter(c => c.id !== course.id));
  };

  // View course details
  const handleView = (course: Subject) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  // Find teacher name by ID
  const getTeacherName = (teacherId?: string) => {
    if (!teacherId) return "Not assigned";
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) return "Unknown";
    return `${teacher.name} ${teacher.fatherName}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Course Management</h1>
          <p className="text-muted-foreground">
            Manage courses, subjects, and curriculum
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Course
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Course List</CardTitle>
          <CardDescription>
            Total {filteredCourses.length} courses found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or code..."
                className="w-full pl-9"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                  <TableHead className="text-center">Credit Hours</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead className="w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.code}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{course.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {course.academicYear}, {course.semester} semester
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">Grade {course.grade}</Badge>
                      </TableCell>
                      <TableCell className="text-center">{course.creditHours}</TableCell>
                      <TableCell>{getTeacherName(course.teacherId)}</TableCell>
                      <TableCell>{course.language}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(course)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Assign Teacher</DropdownMenuItem>
                            <DropdownMenuItem>Upload Materials</DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(course)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No courses found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Course Details Dialog */}
      {selectedCourse && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Course Details</DialogTitle>
              <DialogDescription>
                Detailed information about {selectedCourse.name} (Code: {selectedCourse.code})
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="course-name" className="text-muted-foreground">
                    Course Name
                  </Label>
                  <div className="font-medium">{selectedCourse.name}</div>
                </div>
                <div>
                  <Label htmlFor="course-code" className="text-muted-foreground">
                    Course Code
                  </Label>
                  <div className="font-medium">{selectedCourse.code}</div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description" className="text-muted-foreground">
                  Description
                </Label>
                <div className="text-sm">{selectedCourse.description}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="grade" className="text-muted-foreground">
                    Grade
                  </Label>
                  <div className="font-medium">Grade {selectedCourse.grade}</div>
                </div>
                <div>
                  <Label htmlFor="credit-hours" className="text-muted-foreground">
                    Credit Hours
                  </Label>
                  <div className="font-medium">{selectedCourse.creditHours}</div>
                </div>
                <div>
                  <Label htmlFor="language" className="text-muted-foreground">
                    Language
                  </Label>
                  <div className="font-medium">{selectedCourse.language}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="academic-year" className="text-muted-foreground">
                    Academic Year
                  </Label>
                  <div className="font-medium">{selectedCourse.academicYear}</div>
                </div>
                <div>
                  <Label htmlFor="semester" className="text-muted-foreground">
                    Semester
                  </Label>
                  <div className="font-medium">{selectedCourse.semester}</div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="teacher" className="text-muted-foreground">
                  Assigned Teacher
                </Label>
                <div className="font-medium">{getTeacherName(selectedCourse.teacherId)}</div>
              </div>
              
              {selectedCourse.materials && selectedCourse.materials.length > 0 && (
                <div>
                  <Label className="text-muted-foreground">Course Materials</Label>
                  <ul className="list-disc list-inside">
                    {selectedCourse.materials.map((material, index) => (
                      <li key={index} className="text-sm text-blue-600 hover:underline cursor-pointer">
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
              <Button>Edit Course</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CourseManagement;
