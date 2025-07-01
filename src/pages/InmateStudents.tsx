
import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Search, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StudentTable } from "@/components/students/StudentTable";
import { useToast } from "@/components/ui/use-toast";
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
import { Student } from "@/types/student";
import { students } from "@/mock/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const InmateStudents = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const inmateStudents = students.filter(student => student.isInmate);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(inmateStudents);

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
      setFilteredStudents(inmateStudents);
    } else if (value.startsWith("crime-")) {
      const crimeType = value.split("-")[1];
      setFilteredStudents(inmateStudents.filter(student => student.crimeType === crimeType));
    } else if (value.startsWith("zone-")) {
      const zone = value.split("-")[1];
      setFilteredStudents(inmateStudents.filter(student => student.residingZone?.includes(zone)));
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
      accessorKey: "crimeType",
      header: t("Crime Type"),
      cell: ({ row }: any) => {
        const student = row.original;
        const crimeTypeColors: Record<string, string> = {
          "Theft": "bg-orange-100 text-orange-800",
          "Assault": "bg-red-100 text-red-800",
          "Fraud": "bg-blue-100 text-blue-800",
          "Corruption": "bg-yellow-100 text-yellow-800",
          "Political": "bg-purple-100 text-purple-800",
          "Drug Related": "bg-green-100 text-green-800",
          "Other": "bg-gray-100 text-gray-800"
        };
        
        return (
          <div>
            <span
              className={`px-2 py-1 rounded-md text-xs ${
                crimeTypeColors[student.crimeType || "Other"]
              }`}
            >
              {t(student.crimeType || "Unknown")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "sentenceDuration",
      header: t("Sentence"),
    },
    {
      accessorKey: "residingZone",
      header: t("Zone"),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("inmate_students")}</h1>
          <p className="text-muted-foreground">
            {t("manage_and_view_all_inmate_students")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FilePlus className="mr-2 h-4 w-4" />
            {t("Export to PDF")}
          </Button>
          <Link to="/students/register">
            <Button>
              <User className="mr-2 h-4 w-4" />
              {t("Register New Inmate")}
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{t("Inmate Student List")}</CardTitle>
          <CardDescription>
            {t("total_students_found").replace("{0}", filteredStudents.length.toString())}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("search_by_name_or_id")}
                className="w-full pl-9"
              />
            </div>
            <Select defaultValue="all" onValueChange={(value) => handleFilterChange({ target: { value } } as any)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder={t("Filter")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("All Inmates")}</SelectItem>
                <SelectItem value="crime-Theft">{t("Theft")}</SelectItem>
                <SelectItem value="crime-Assault">{t("Assault")}</SelectItem>
                <SelectItem value="crime-Fraud">{t("Fraud")}</SelectItem>
                <SelectItem value="crime-Corruption">{t("Corruption")}</SelectItem>
                <SelectItem value="crime-Political">{t("Political")}</SelectItem>
                <SelectItem value="crime-Drug Related">{t("Drug Related")}</SelectItem>
                <SelectItem value="zone-A">{t("Zone")} A</SelectItem>
                <SelectItem value="zone-B">{t("Zone")} B</SelectItem>
                <SelectItem value="zone-C">{t("Zone")} C</SelectItem>
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

export default InmateStudents;
