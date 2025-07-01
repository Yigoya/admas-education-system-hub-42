
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

// Form schema with Zod
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  name: z.string().min(2, "Name is required"),
  fatherName: z.string().min(2, "Father's name is required"),
  grandfatherName: z.string().optional(),
  gender: z.enum(["Male", "Female"]),
  phoneNumber: z.string().min(5, "Phone number is required"),
  email: z.string().email("Invalid email format").optional(),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  nationality: z.string().min(2, "Nationality is required"),
  qualification: z.string().min(1, "Qualification is required"),
  specialization: z.string().min(1, "Specialization is required"),
  yearsOfExperience: z.number().min(0, "Years must be 0 or greater"),
  employmentDate: z.date({
    required_error: "Employment date is required",
  }),
  employmentType: z.enum(["Full-time", "Part-time", "Contract"]),
  subjectsTeaching: z.array(z.string()).min(1, "Select at least one subject"),
  gradesTeaching: z.array(z.number()).min(1, "Select at least one grade"),
  status: z.enum(["Active", "On Leave", "Terminated", "Retired"]),
  photo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const TeacherRegistration = () => {
  const { toast } = useToast();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<number[]>([]);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      name: "",
      fatherName: "",
      grandfatherName: "",
      gender: "Male",
      phoneNumber: "",
      email: "",
      nationality: "Ethiopian",
      qualification: "",
      specialization: "",
      yearsOfExperience: 0,
      employmentType: "Full-time",
      subjectsTeaching: [],
      gradesTeaching: [],
      status: "Active",
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    toast({
      title: "Teacher Registered",
      description: "The teacher has been successfully registered.",
      action: (
        <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white">
          <CheckCircle className="h-5 w-5" />
        </div>
      ),
    });
  };

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "English",
    "Amharic",
    "Afan Oromo",
    "Civics",
    "ICT",
    "Physical Education",
  ];

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subject)) {
        const updated = prev.filter((s) => s !== subject);
        form.setValue("subjectsTeaching", updated);
        return updated;
      } else {
        const updated = [...prev, subject];
        form.setValue("subjectsTeaching", updated);
        return updated;
      }
    });
  };

  const toggleGrade = (grade: number) => {
    setSelectedGrades((prev) => {
      if (prev.includes(grade)) {
        const updated = prev.filter((g) => g !== grade);
        form.setValue("gradesTeaching", updated);
        return updated;
      } else {
        const updated = [...prev, grade];
        form.setValue("gradesTeaching", updated);
        return updated;
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Teacher Registration</h1>
        <p className="text-muted-foreground">
          Register a new teacher in the system
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Enter the basic information about the teacher
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <Select
                    onValueChange={(value) => form.setValue("title", value)}
                    defaultValue={form.getValues("title")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mr.">Mr.</SelectItem>
                      <SelectItem value="Ms.">Ms.</SelectItem>
                      <SelectItem value="Mrs.">Mrs.</SelectItem>
                      <SelectItem value="Dr.">Dr.</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </div>

                {/* Name */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    {...form.register("name")}
                    placeholder="Teacher's name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                {/* Father's Name */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-2">
                    Father's Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    {...form.register("fatherName")}
                    placeholder="Father's name"
                  />
                  {form.formState.errors.fatherName && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.fatherName.message}
                    </p>
                  )}
                </div>

                {/* Grandfather's Name */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-2">
                    Grandfather's Name
                  </label>
                  <Input
                    {...form.register("grandfatherName")}
                    placeholder="Grandfather's name"
                  />
                </div>

                {/* Gender */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <Select
                    onValueChange={(value) => form.setValue("gender", value as "Male" | "Female")}
                    defaultValue={form.getValues("gender")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.gender && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.gender.message}
                    </p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !form.getValues("dateOfBirth") && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.getValues("dateOfBirth") ? (
                          format(form.getValues("dateOfBirth"), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={form.getValues("dateOfBirth")}
                        onSelect={(date) => date && form.setValue("dateOfBirth", date)}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1950-01-01")
                        }
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">
                      Date of birth is required
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    {...form.register("phoneNumber")}
                    placeholder="+251 xx xxx xxxx"
                  />
                  {form.formState.errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    {...form.register("email")}
                    placeholder="email@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                {/* Nationality */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-2">
                    Nationality <span className="text-red-500">*</span>
                  </label>
                  <Input
                    {...form.register("nationality")}
                    placeholder="Nationality"
                  />
                  {form.formState.errors.nationality && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.nationality.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>
                Enter the professional and qualification details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Qualification */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-2">
                    Qualification <span className="text-red-500">*</span>
                  </label>
                  <Select
                    onValueChange={(value) => form.setValue("qualification", value)}
                    defaultValue={form.getValues("qualification")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Diploma">Diploma</SelectItem>
                      <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="Masters">Master's Degree</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.qualification && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.qualification.message}
                    </p>
                  )}
                </div>

                {/* Specialization */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-2">
                    Specialization <span className="text-red-500">*</span>
                  </label>
                  <Input
                    {...form.register("specialization")}
                    placeholder="E.g., Mathematics Education"
                  />
                  {form.formState.errors.specialization && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.specialization.message}
                    </p>
                  )}
                </div>

                {/* Years of Experience */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-2">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    min="0"
                    {...form.register("yearsOfExperience", {
                      valueAsNumber: true,
                    })}
                    placeholder="Years of experience"
                  />
                  {form.formState.errors.yearsOfExperience && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.yearsOfExperience.message}
                    </p>
                  )}
                </div>

                {/* Employment Date */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-2">
                    Employment Date <span className="text-red-500">*</span>
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !form.getValues("employmentDate") && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.getValues("employmentDate") ? (
                          format(form.getValues("employmentDate"), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={form.getValues("employmentDate")}
                        onSelect={(date) => date && form.setValue("employmentDate", date)}
                        disabled={(date) =>
                          date > new Date()
                        }
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.employmentDate && (
                    <p className="text-red-500 text-sm mt-1">
                      Employment date is required
                    </p>
                  )}
                </div>

                {/* Employment Type */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-2">
                    Employment Type <span className="text-red-500">*</span>
                  </label>
                  <Select
                    onValueChange={(value) => form.setValue("employmentType", value as "Full-time" | "Part-time" | "Contract")}
                    defaultValue={form.getValues("employmentType")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.employmentType && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.employmentType.message}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <Select
                    onValueChange={(value) => form.setValue("status", value as "Active" | "On Leave" | "Terminated" | "Retired")}
                    defaultValue={form.getValues("status")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                      <SelectItem value="Terminated">Terminated</SelectItem>
                      <SelectItem value="Retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.status && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.status.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subjects Teaching */}
              <div className="space-y-3">
                <label className="block text-sm font-medium">
                  Subjects Teaching <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {subjects.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <Checkbox
                        id={`subject-${subject}`}
                        checked={selectedSubjects.includes(subject)}
                        onCheckedChange={() => toggleSubject(subject)}
                      />
                      <label
                        htmlFor={`subject-${subject}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {subject}
                      </label>
                    </div>
                  ))}
                </div>
                {form.formState.errors.subjectsTeaching && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.subjectsTeaching.message}
                  </p>
                )}
              </div>

              {/* Grades Teaching */}
              <div className="space-y-3">
                <label className="block text-sm font-medium">
                  Grades Teaching <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-2">
                  {[...Array(12)].map((_, index) => {
                    const grade = index + 1;
                    return (
                      <div key={grade} className="flex items-center space-x-2">
                        <Checkbox
                          id={`grade-${grade}`}
                          checked={selectedGrades.includes(grade)}
                          onCheckedChange={() => toggleGrade(grade)}
                        />
                        <label
                          htmlFor={`grade-${grade}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {grade}
                        </label>
                      </div>
                    );
                  })}
                </div>
                {form.formState.errors.gradesTeaching && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.gradesTeaching.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit">Register Teacher</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TeacherRegistration;
