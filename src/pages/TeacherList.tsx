import { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Search, MoreVertical } from "lucide-react";
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
import { Teacher } from "@/types/teacher";
import { teachers } from "@/mock/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const TeacherList = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>(teachers);
  const [search, setSearch] = useState("");
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    
    if (value === "") {
      setFilteredTeachers(teachers);
    } else {
      setFilteredTeachers(
        teachers.filter(
          teacher => 
            teacher.name.toLowerCase().includes(value) ||
            teacher.fatherName.toLowerCase().includes(value) ||
            teacher.email?.toLowerCase().includes(value) ||
            teacher.phoneNumber.includes(value)
        )
      );
    }
  };

  const handleDelete = (teacher: Teacher) => {
    toast({
      title: t("Teacher deleted"),
      description: `${teacher.name} ${teacher.fatherName} ${t("has been deleted successfully.")}`,
    });
    setFilteredTeachers(filteredTeachers.filter(t => t.id !== teacher.id));
  };

  return (
    <div className="space-y-6 container mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("Teachers")}</h1>
          <p className="text-muted-foreground">
            {t("manage_and_view_all_teachers")}
          </p>
        </div>
        <Link to="/teachers/register">
          <Button>
            <GraduationCap className="mr-2 h-4 w-4" />
            {t("register_new_teacher")}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{t("teacher_list")}</CardTitle>
          <CardDescription>
            {t("total_teachers_found").replace("{0}", filteredTeachers.length.toString())}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("Search by name, email or phone...")}
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
                  <TableHead>{t("Name")}</TableHead>
                  <TableHead>{t("Specialization")}</TableHead>
                  <TableHead>{t("Subjects")}</TableHead>
                  <TableHead>{t("Grade Levels")}</TableHead>
                  <TableHead>{t("Contact")}</TableHead>
                  <TableHead>{t("Status")}</TableHead>
                  <TableHead className="w-16">{t("Actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {teacher.photo ? (
                            <img
                              src={teacher.photo}
                              alt={teacher.name}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-primary-blue flex items-center justify-center text-white">
                              {teacher.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="font-medium">
                              {teacher.title} {teacher.name} {teacher.fatherName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {teacher.qualification} {t("in")} {teacher.specialization}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{teacher.specialization}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {teacher.subjectsTeaching.map((subject, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-secondary rounded-md text-xs"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {teacher.gradesTeaching.map((grade, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-secondary rounded-md text-xs"
                            >
                              {t("Grade")} {grade}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs">
                          <div>{teacher.email}</div>
                          <div>{teacher.phoneNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-md text-xs ${
                            teacher.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : teacher.status === "On Leave"
                              ? "bg-yellow-100 text-yellow-800"
                              : teacher.status === "Terminated"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {t(teacher.status)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>{t("View Details")}</DropdownMenuItem>
                            <DropdownMenuItem>{t("Edit")}</DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(teacher)}
                            >
                              {t("Delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      {t("No teachers found matching your search criteria.")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherList;
