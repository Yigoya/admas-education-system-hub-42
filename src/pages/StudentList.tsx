import { useState } from "react";
import { User, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StudentTable } from "@/components/students/StudentTable";
import { Student } from "@/types/student";
import { students } from "@/mock/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const StudentList = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);
  
  const handleDelete = (student: Student) => {
    toast({
      title: t("Student deleted"),
      description: `${student.name} ${student.fatherName} ${t("has been deleted successfully.")}`,
    });
    setFilteredStudents(filteredStudents.filter(s => s.id !== student.id));
  };

  const handleView = (student: Student) => {
    toast({
      title: t("Student details"),
      description: `${t("Viewing")} ${student.name} ${student.fatherName}'${t("s details.")}`,
    });
  };

  const handleEdit = (student: Student) => {
    toast({
      title: t("Edit student"),
      description: `${t("Editing")} ${student.name} ${student.fatherName}'${t("s details.")}`,
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    
    if (value === "all") {
      setFilteredStudents(students);
    } else if (value === "inmates") {
      setFilteredStudents(students.filter(student => student.isInmate));
    } else if (value === "non-inmates") {
      setFilteredStudents(students.filter(student => !student.isInmate));
    } else if (value.startsWith("grade-")) {
      const grade = parseInt(value.split("-")[1]);
      setFilteredStudents(students.filter(student => student.grade === grade));
    }
  };

  const columns = [
    {
      accessorKey: "id",
      header: t("ID"),
    },
    {
      accessorKey: "name",
      header: t("Name"),
      cell: ({ row }: any) => {
        const student = row.original;
        return (
          <div className="flex items-center gap-2">
            {student.photo ? (
              <img
                src={student.photo}
                alt={student.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-primary-blue flex items-center justify-center text-white">
                {student.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="font-medium">
                {student.name} {student.fatherName}
              </div>
              <div className="text-xs text-muted-foreground">
                {student.grandfatherName}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "grade",
      header: t("Grade"),
      cell: ({ row }: any) => {
        const student = row.original;
        return (
          <div className="text-center">
            <span className="px-2 py-1 bg-secondary rounded-md text-xs">
              {t("Grade")} {student.grade}
              {student.section && `-${student.section}`}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "gender",
      header: t("Gender"),
    },
    {
      accessorKey: "isInmate",
      header: t("Status"),
      cell: ({ row }: any) => {
        const student = row.original;
        return (
          <div>
            <span
              className={`px-2 py-1 rounded-md text-xs ${
                student.isInmate
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {student.isInmate ? t("Inmate") : t("Non-Inmate")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "currentStatus",
      header: t("Enrollment"),
      cell: ({ row }: any) => {
        const student = row.original;
        const statusColors: Record<string, string> = {
          Active: "bg-green-100 text-green-800",
          Inactive: "bg-red-100 text-red-800",
          Suspended: "bg-orange-100 text-orange-800",
          Graduated: "bg-blue-100 text-blue-800",
          Transferred: "bg-purple-100 text-purple-800",
        };
        
        return (
          <div>
            <span
              className={`px-2 py-1 rounded-md text-xs ${
                statusColors[student.currentStatus] || "bg-gray-100 text-gray-800"
              }`}
            >
              {t(student.currentStatus)}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 container mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("Students")}</h1>
          <p className="text-muted-foreground">
            {t("Manage and view all students")}
          </p>
        </div>
        <Link to="/students/register">
          <Button>
            <User className="mr-2 h-4 w-4" />
            {t("register_new_student")}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{t("Students List")}</CardTitle>
          <CardDescription>
            {t("Total students found: {0}").replace("{0}", filteredStudents.length.toString())}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("Search by name or ID...")}
                className="w-full pl-9"
              />
            </div>
            <Select defaultValue="all" onValueChange={(value) => handleFilterChange({ target: { value } } as any)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder={t("Filter")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("All students")}</SelectItem>
                <SelectItem value="inmates">{t("Inmates only")}</SelectItem>
                <SelectItem value="non-inmates">{t("Non-inmates only")}</SelectItem>
                <SelectItem value="grade-1">{t("Grade")} 1</SelectItem>
                <SelectItem value="grade-2">{t("Grade")} 2</SelectItem>
                <SelectItem value="grade-3">{t("Grade")} 3</SelectItem>
                <SelectItem value="grade-4">{t("Grade")} 4</SelectItem>
                <SelectItem value="grade-5">{t("Grade")} 5</SelectItem>
                <SelectItem value="grade-6">{t("Grade")} 6</SelectItem>
                <SelectItem value="grade-7">{t("Grade")} 7</SelectItem>
                <SelectItem value="grade-8">{t("Grade")} 8</SelectItem>
                <SelectItem value="grade-9">{t("Grade")} 9</SelectItem>
                <SelectItem value="grade-10">{t("Grade")} 10</SelectItem>
                <SelectItem value="grade-11">{t("Grade")} 11</SelectItem>
                <SelectItem value="grade-12">{t("Grade")} 12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <StudentTable
            columns={columns}
            data={filteredStudents}
            onDelete={handleDelete}
            onView={handleView}
            onEdit={handleEdit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentList;
