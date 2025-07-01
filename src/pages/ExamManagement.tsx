
import { useState } from "react";
import {
  CalendarPlus,
  ChevronRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useToast } from "@/components/ui/use-toast";
import { format, isFuture } from "date-fns";
import { Exam } from "@/types/exam";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateExamForm } from "@/components/exams/CreateExamForm";
import { useLanguage } from "@/contexts/LanguageContext";

const mockExams: Exam[] = [
  {
    id: "1",
    title: "Mathematics Mid-term",
    courseId: "MATH-101",
    examDate: new Date(2023, 10, 15),
    startTime: "09:00",
    endTime: "11:00",
    totalMarks: 100,
    passingMarks: 40,
    examType: "Mid-term",
    academicYear: "2022/2023",
    semester: "First",
    grade: 9,
    section: "A",
  },
  {
    id: "2",
    title: "English Final Examination",
    courseId: "ENG-101",
    examDate: new Date(2023, 11, 20),
    startTime: "14:00",
    endTime: "16:00",
    totalMarks: 100,
    passingMarks: 40,
    examType: "Final",
    academicYear: "2022/2023",
    semester: "First",
    grade: 10,
    section: "B",
    instructions: "No dictionaries allowed."
  },
  {
    id: "3",
    title: "Science Quiz",
    courseId: "SCI-101",
    examDate: new Date(2023, 9, 10),
    startTime: "10:00",
    endTime: "10:45",
    totalMarks: 30,
    passingMarks: 15,
    examType: "Quiz",
    academicYear: "2022/2023",
    semester: "First",
    grade: 8,
  },
  {
    id: "4",
    title: "History Assignment",
    courseId: "HIS-101",
    examDate: new Date(2023, 12, 5),
    startTime: "09:00",
    endTime: "17:00",
    totalMarks: 50,
    passingMarks: 25,
    examType: "Assignment",
    academicYear: "2022/2023",
    semester: "First",
    grade: 11,
    instructions: "Submit as PDF file."
  },
  {
    id: "5",
    title: "Geography Final",
    courseId: "GEO-101",
    examDate: new Date(2024, 1, 15),
    startTime: "09:00",
    endTime: "11:00",
    totalMarks: 100,
    passingMarks: 40,
    examType: "Final",
    academicYear: "2022/2023",
    semester: "Second",
    grade: 10,
    section: "A",
  },
];

const ExamManagement = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [filterGrade, setFilterGrade] = useState<string>("");
  const [filterSubject, setFilterSubject] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredExams, setFilteredExams] = useState<Exam[]>(
    mockExams.filter(exam => isFuture(new Date(exam.examDate)))
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Filter exams based on selected filters and active tab
  const handleFilterChange = () => {
    let filtered = [...mockExams];

    // Filter by past/upcoming
    if (activeTab === "upcoming") {
      filtered = filtered.filter(exam => isFuture(new Date(exam.examDate)));
    } else {
      filtered = filtered.filter(exam => !isFuture(new Date(exam.examDate)));
    }

    // Apply additional filters
    if (filterGrade) {
      filtered = filtered.filter(exam => exam.grade.toString() === filterGrade);
    }

    if (filterSubject) {
      filtered = filtered.filter(exam => exam.courseId === filterSubject);
    }

    if (filterType) {
      filtered = filtered.filter(exam => exam.examType === filterType);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(exam => 
        exam.title.toLowerCase().includes(query) || 
        exam.courseId.toLowerCase().includes(query)
      );
    }

    setFilteredExams(filtered);
  };

  // Apply filters when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value as "upcoming" | "past");
    handleFilterChange();
  };

  const handleCreateExamSuccess = () => {
    setIsCreateDialogOpen(false);
    toast({
      title: "Exam Created",
      description: "The exam has been created successfully.",
    });
    // In a real app, we would fetch the updated list of exams
    handleFilterChange();
  };

  const getExamTypeColor = (type: string): string => {
    switch (type) {
      case "Quiz": return "bg-yellow-100 text-yellow-800";
      case "Assignment": return "bg-blue-100 text-blue-800";
      case "Mid-term": return "bg-purple-100 text-purple-800";
      case "Final": return "bg-red-100 text-red-800";
      case "Project": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("Exam Management")}</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <CalendarPlus className="mr-2 h-4 w-4" />
          {t("Create New Exam")}
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{t("Exams")}</CardTitle>
          <CardDescription>
            {t("Schedule and manage student examinations")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" onValueChange={handleTabChange}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="upcoming">{t("Upcoming Exams")}</TabsTrigger>
                <TabsTrigger value="past">{t("Past Exams")}</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative w-full sm:w-auto sm:flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("Search exams...")}
                  className="w-full pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleFilterChange();
                    }
                  }}
                />
              </div>

              <Select value={filterGrade} onValueChange={(value) => {
                setFilterGrade(value);
                setTimeout(handleFilterChange, 0);
              }}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder={t("Grade")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grade-all">{t("All Grades")}</SelectItem>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                    <SelectItem key={grade} value={grade.toString()}>
                      {t("Grade")} {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterSubject} onValueChange={(value) => {
                setFilterSubject(value);
                setTimeout(handleFilterChange, 0);
              }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("Subject")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="subject-all">{t("All Subjects")}</SelectItem>
                  <SelectItem value="MATH-101">{t("Mathematics")}</SelectItem>
                  <SelectItem value="ENG-101">{t("English")}</SelectItem>
                  <SelectItem value="SCI-101">{t("Science")}</SelectItem>
                  <SelectItem value="HIS-101">{t("History")}</SelectItem>
                  <SelectItem value="GEO-101">{t("Geography")}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={(value) => {
                setFilterType(value);
                setTimeout(handleFilterChange, 0);
              }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("Exam Type")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type-all">{t("All Types")}</SelectItem>
                  <SelectItem value="Quiz">{t("Quiz")}</SelectItem>
                  <SelectItem value="Assignment">{t("Assignment")}</SelectItem>
                  <SelectItem value="Mid-term">{t("Mid-Term")}</SelectItem>
                  <SelectItem value="Final">{t("Final")}</SelectItem>
                  <SelectItem value="Project">{t("Project")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="upcoming">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">{t("Exam Details")}</TableHead>
                      <TableHead>{t("Type")}</TableHead>
                      <TableHead>{t("Date & Time")}</TableHead>
                      <TableHead>{t("Grade / Section")}</TableHead>
                      <TableHead className="text-center">{t("Marks")}</TableHead>
                      <TableHead className="text-right">{t("Actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExams.length > 0 ? (
                      filteredExams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{exam.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {exam.courseId} • {exam.academicYear} • {exam.semester} {t("Semester")}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getExamTypeColor(exam.examType)}>
                              {exam.examType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{format(new Date(exam.examDate), "MMM d, yyyy")}</div>
                            <div className="text-sm text-muted-foreground">
                              {exam.startTime} - {exam.endTime}
                            </div>
                          </TableCell>
                          <TableCell>
                            {t("Grade")} {exam.grade}
                            {exam.section && <span> / {t("Section")} {exam.section}</span>}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="font-medium">{t("Total")}: {exam.totalMarks}</div>
                            <div className="text-sm text-muted-foreground">{t("Pass")}: {exam.passingMarks}</div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>{t("View Details")}</DropdownMenuItem>
                                <DropdownMenuItem>{t("Edit Exam")}</DropdownMenuItem>
                                <DropdownMenuItem>{t("Print Hall Ticket")}</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">{t("Cancel Exam")}</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          {t("No upcoming exams found matching your criteria.")}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">{t("Exam Details")}</TableHead>
                      <TableHead>{t("Type")}</TableHead>
                      <TableHead>{t("Date & Time")}</TableHead>
                      <TableHead>{t("Grade / Section")}</TableHead>
                      <TableHead className="text-center">{t("Marks")}</TableHead>
                      <TableHead className="text-right">{t("Actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExams.length > 0 ? (
                      filteredExams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{exam.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {exam.courseId} • {exam.academicYear} • {exam.semester} {t("Semester")}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getExamTypeColor(exam.examType)}>
                              {exam.examType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{format(new Date(exam.examDate), "MMM d, yyyy")}</div>
                            <div className="text-sm text-muted-foreground">
                              {exam.startTime} - {exam.endTime}
                            </div>
                          </TableCell>
                          <TableCell>
                            {t("Grade")} {exam.grade}
                            {exam.section && <span> / {t("Section")} {exam.section}</span>}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="font-medium">{t("Total")}: {exam.totalMarks}</div>
                            <div className="text-sm text-muted-foreground">{t("Pass")}: {exam.passingMarks}</div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>{t("View Details")}</DropdownMenuItem>
                                <DropdownMenuItem>{t("View Results")}</DropdownMenuItem>
                                <DropdownMenuItem>{t("Generate Report")}</DropdownMenuItem>
                                <DropdownMenuItem>{t("Download Answers")}</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          {t("No past exams found matching your criteria.")}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Create Exam Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("Create New Exam")}</DialogTitle>
            <DialogDescription>
              {t("Fill in the details to schedule a new examination")}
            </DialogDescription>
          </DialogHeader>
          <CreateExamForm onSuccess={handleCreateExamSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamManagement;
