import { useState } from "react";
import { Link } from "react-router-dom";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Subject } from "@/types/course";
import { courses, teachers } from "@/mock/mockData";
import { AddSubjectForm } from "@/components/subjects/AddSubjectForm";

const SubjectManagement = () => {
  const { toast } = useToast();
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>(courses);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Search functionality
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    
    if (value === "") {
      setFilteredSubjects(courses);
    } else {
      setFilteredSubjects(
        courses.filter(
          subject => 
            subject.name.toLowerCase().includes(value) ||
            subject.code.toLowerCase().includes(value) ||
            `grade ${subject.grade}`.includes(value)
        )
      );
    }
  };

  // Delete subject
  const handleDelete = (subject: Subject) => {
    toast({
      title: "Subject deleted",
      description: `${subject.name} (${subject.code}) has been deleted successfully.`,
    });
    setFilteredSubjects(filteredSubjects.filter(c => c.id !== subject.id));
  };

  // View subject details
  const handleView = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsDialogOpen(true);
  };

  // Find teacher name by ID
  const getTeacherName = (teacherId?: string) => {
    if (!teacherId) return "Not assigned";
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) return "Unknown";
    return `${teacher.name} ${teacher.fatherName}`;
  };

  const handleAddNewSubject = () => {
    setIsAddDialogOpen(true);
  };

  return (
    <div className="space-y-6 container mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Subject Management</h1>
          <p className="text-muted-foreground">
            Manage subjects and curriculum
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleAddNewSubject}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Subject
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Subject List</CardTitle>
          <CardDescription>
            Total {filteredSubjects.length} subjects found
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
                  <TableHead>Subject Name</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                  <TableHead className="text-center">Credit Hours</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead className="w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubjects.length > 0 ? (
                  filteredSubjects.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell className="font-medium">{subject.code}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{subject.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {subject.academicYear}, {subject.semester} semester
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">Grade {subject.grade}</Badge>
                      </TableCell>
                      <TableCell className="text-center">{subject.creditHours}</TableCell>
                      <TableCell>{getTeacherName(subject.teacherId)}</TableCell>
                      <TableCell>{subject.language}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(subject)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Assign Teacher</DropdownMenuItem>
                            <DropdownMenuItem>Upload Materials</DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(subject)}
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
                      No subjects found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Subject Details Dialog */}
      {selectedSubject && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Subject Details</DialogTitle>
              <DialogDescription>
                Detailed information about {selectedSubject.name} (Code: {selectedSubject.code})
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject-name" className="text-muted-foreground">
                    Subject Name
                  </Label>
                  <div className="font-medium">{selectedSubject.name}</div>
                </div>
                <div>
                  <Label htmlFor="subject-code" className="text-muted-foreground">
                    Subject Code
                  </Label>
                  <div className="font-medium">{selectedSubject.code}</div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description" className="text-muted-foreground">
                  Description
                </Label>
                <div className="text-sm">{selectedSubject.description}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="grade" className="text-muted-foreground">
                    Grade
                  </Label>
                  <div className="font-medium">Grade {selectedSubject.grade}</div>
                </div>
                <div>
                  <Label htmlFor="credit-hours" className="text-muted-foreground">
                    Credit Hours
                  </Label>
                  <div className="font-medium">{selectedSubject.creditHours}</div>
                </div>
                <div>
                  <Label htmlFor="language" className="text-muted-foreground">
                    Language
                  </Label>
                  <div className="font-medium">{selectedSubject.language}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="academic-year" className="text-muted-foreground">
                    Academic Year
                  </Label>
                  <div className="font-medium">{selectedSubject.academicYear}</div>
                </div>
                <div>
                  <Label htmlFor="semester" className="text-muted-foreground">
                    Semester
                  </Label>
                  <div className="font-medium">{selectedSubject.semester}</div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="teacher" className="text-muted-foreground">
                  Assigned Teacher
                </Label>
                <div className="font-medium">{getTeacherName(selectedSubject.teacherId)}</div>
              </div>
              
              {selectedSubject.materials && selectedSubject.materials.length > 0 && (
                <div>
                  <Label className="text-muted-foreground">Subject Materials</Label>
                  <ul className="list-disc list-inside">
                    {selectedSubject.materials.map((material, index) => (
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
              <Button>Edit Subject</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add New Subject Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new subject to the curriculum
            </DialogDescription>
          </DialogHeader>
          <AddSubjectForm onSuccess={() => {
            setIsAddDialogOpen(false);
            toast({
              title: "Subject added",
              description: "The new subject has been added successfully.",
            });
          }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubjectManagement;
