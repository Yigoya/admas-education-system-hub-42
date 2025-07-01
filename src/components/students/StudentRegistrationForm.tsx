import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { regions, zones } from "@/mock/regions";

// Form schema with Zod
const formSchema = z.object({
  // Personal Information
  title: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  fatherName: z.string().min(2, "Father's name is required"),
  grandfatherName: z.string().min(2, "Grandfather's name is required"),
  gender: z.enum(["Male", "Female"]),
  motherName: z.string().min(2, "Mother's name is required"),
  dateOfBirth: z.date(),
  phoneNumber: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  religion: z.string().optional(),
  nationality: z.string().min(2, "Nationality is required"),
  
  // Address Information
  regionOfOrigin: z.string().min(1, "Region is required"),
  zone: z.string().min(1, "Zone is required"),
  district: z.string().min(1, "District is required"),
  specificPlace: z.string().optional(),
  
  // Educational Information
  registrationDate: z.date(),
  educationStartDate: z.date(),
  educationEndDate: z.date().optional(),
  durationOfEducation: z.string(),
  institutionName: z.string().min(2, "Institution name is required"),
  academicYear: z.string().min(4, "Academic year is required"),
  educationType: z.enum(["Regular", "Extension", "Distance"]),
  previousEducationType: z.string().optional(),
  previousInstitution: z.string().optional(),
  department: z.string().optional(),
  grade: z.number().min(1).max(12),
  section: z.string().optional(),
  languageOfInstruction: z.string().min(1, "Language of instruction is required"),
  requiresSpecialSupport: z.string().optional(),
  
  // Inmate Information
  isInmate: z.boolean().default(false),
  sentenceDuration: z.string().optional(),
  crimeType: z.string().optional(),
  currentStatus: z.enum(["Active", "Inactive", "Suspended", "Graduated", "Transferred"]),
  residingZone: z.string().optional(),
  imprisonmentStartDate: z.date().optional(),
  imprisonmentEndDateWithParole: z.date().optional(),
  imprisonmentEndDateWithoutParole: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const StudentRegistrationForm = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [availableZones, setAvailableZones] = useState<string[]>([]);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      name: "",
      fatherName: "",
      grandfatherName: "",
      gender: "Male",
      motherName: "",
      nationality: "Ethiopian",
      educationType: "Regular",
      currentStatus: "Active",
      isInmate: false,
      institutionName: "Federal Prison Commission Educational Institution",
      languageOfInstruction: "English",
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    toast({
      title: "Student Registered",
      description: "The student has been successfully registered.",
      action: (
        <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white">
          <CheckCircle className="h-5 w-5" />
        </div>
      ),
    });
  };

  // Handle region change to update zones
  const handleRegionChange = (region: string) => {
    form.setValue("regionOfOrigin", region);
    form.setValue("zone", ""); // Reset zone when region changes
    
    // Assuming zones is an object with region keys and array values
    const regionZones = zones[region as keyof typeof zones] || [];
    setAvailableZones(regionZones);
  };

  // Next tab handler
  const handleNext = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    
    switch (activeTab) {
      case "personal":
        fieldsToValidate = ["name", "fatherName", "grandfatherName", "gender", "motherName", "dateOfBirth", "nationality"];
        break;
      case "address":
        fieldsToValidate = ["regionOfOrigin", "zone", "district"];
        break;
      case "education":
        fieldsToValidate = ["registrationDate", "educationStartDate", "durationOfEducation", "institutionName", "academicYear", "educationType", "grade", "languageOfInstruction"];
        break;
      case "inmate":
        fieldsToValidate = ["currentStatus"];
        if (form.getValues("isInmate")) {
          fieldsToValidate.push("sentenceDuration", "crimeType", "imprisonmentStartDate");
        }
        break;
    }
    
    const result = await form.trigger(fieldsToValidate as any);
    
    if (result) {
      switch (activeTab) {
        case "personal":
          setActiveTab("address");
          break;
        case "address":
          setActiveTab("education");
          break;
        case "education":
          setActiveTab("inmate");
          break;
        case "inmate":
          // Submit the form
          form.handleSubmit(onSubmit)();
          break;
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Student Registration</h2>
        <p className="text-muted-foreground">
          Register a new student in the system. Complete all required fields.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="address">Address Information</TabsTrigger>
          <TabsTrigger value="education">Education Details</TabsTrigger>
          <TabsTrigger value="inmate">Inmate Status</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <TabsContent value="personal" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">Title</label>
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
                    </div>

                    {/* Name */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        {...form.register("name")}
                        placeholder="Student's name"
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
                        Grandfather's Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        {...form.register("grandfatherName")}
                        placeholder="Grandfather's name"
                      />
                      {form.formState.errors.grandfatherName && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.grandfatherName.message}
                        </p>
                      )}
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

                    {/* Mother's Name */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Mother's Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        {...form.register("motherName")}
                        placeholder="Mother's name"
                      />
                      {form.formState.errors.motherName && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.motherName.message}
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
                              date > new Date() || date < new Date("1940-01-01")
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
                        Phone Number
                      </label>
                      <Input
                        {...form.register("phoneNumber")}
                        placeholder="+251 xx xxx xxxx"
                      />
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

                    {/* Religion */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Religion
                      </label>
                      <Select
                        onValueChange={(value) => form.setValue("religion", value)}
                        defaultValue={form.getValues("religion")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select religion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Orthodox">Orthodox</SelectItem>
                          <SelectItem value="Muslim">Muslim</SelectItem>
                          <SelectItem value="Protestant">Protestant</SelectItem>
                          <SelectItem value="Catholic">Catholic</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
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
                </TabsContent>

                <TabsContent value="address" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Region of Origin */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Region <span className="text-red-500">*</span>
                      </label>
                      <Select
                        onValueChange={handleRegionChange}
                        defaultValue={form.getValues("regionOfOrigin")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.regionOfOrigin && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.regionOfOrigin.message}
                        </p>
                      )}
                    </div>

                    {/* Zone */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Zone <span className="text-red-500">*</span>
                      </label>
                      <Select
                        onValueChange={(value) => form.setValue("zone", value)}
                        defaultValue={form.getValues("zone")}
                        disabled={!form.getValues("regionOfOrigin")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select zone" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableZones.map((zone) => (
                            <SelectItem key={zone} value={zone}>
                              {zone}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.zone && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.zone.message}
                        </p>
                      )}
                    </div>

                    {/* District */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        District/Woreda <span className="text-red-500">*</span>
                      </label>
                      <Input
                        {...form.register("district")}
                        placeholder="District/Woreda"
                      />
                      {form.formState.errors.district && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.district.message}
                        </p>
                      )}
                    </div>

                    {/* Specific Place */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Specific Place
                      </label>
                      <Input
                        {...form.register("specificPlace")}
                        placeholder="Specific address"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="education" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Registration Date */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Registration Date <span className="text-red-500">*</span>
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !form.getValues("registrationDate") && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {form.getValues("registrationDate") ? (
                              format(form.getValues("registrationDate"), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={form.getValues("registrationDate")}
                            onSelect={(date) => date && form.setValue("registrationDate", date)}
                            disabled={(date) =>
                              date > new Date() || date < new Date("2010-01-01")
                            }
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      {form.formState.errors.registrationDate && (
                        <p className="text-red-500 text-sm mt-1">
                          Registration date is required
                        </p>
                      )}
                    </div>

                    {/* Education Start Date */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Education Start Date <span className="text-red-500">*</span>
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !form.getValues("educationStartDate") && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {form.getValues("educationStartDate") ? (
                              format(form.getValues("educationStartDate"), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={form.getValues("educationStartDate")}
                            onSelect={(date) => date && form.setValue("educationStartDate", date)}
                            disabled={(date) =>
                              date > new Date() || date < new Date("2010-01-01")
                            }
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      {form.formState.errors.educationStartDate && (
                        <p className="text-red-500 text-sm mt-1">
                          Education start date is required
                        </p>
                      )}
                    </div>

                    {/* Duration of Education */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Duration of Education <span className="text-red-500">*</span>
                      </label>
                      <Select
                        onValueChange={(value) => form.setValue("durationOfEducation", value)}
                        defaultValue={form.getValues("durationOfEducation")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1 year">1 year</SelectItem>
                          <SelectItem value="2 years">2 years</SelectItem>
                          <SelectItem value="3 years">3 years</SelectItem>
                          <SelectItem value="4 years">4 years</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.durationOfEducation && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.durationOfEducation.message}
                        </p>
                      )}
                    </div>

                    {/* Institution Name */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Institution Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        {...form.register("institutionName")}
                        placeholder="Institution name"
                      />
                      {form.formState.errors.institutionName && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.institutionName.message}
                        </p>
                      )}
                    </div>

                    {/* Academic Year */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Academic Year <span className="text-red-500">*</span>
                      </label>
                      <Select
                        onValueChange={(value) => form.setValue("academicYear", value)}
                        defaultValue={form.getValues("academicYear")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select academic year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2023-2024">2023-2024</SelectItem>
                          <SelectItem value="2024-2025">2024-2025</SelectItem>
                          <SelectItem value="2025-2026">2025-2026</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.academicYear && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.academicYear.message}
                        </p>
                      )}
                    </div>

                    {/* Education Type */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Education Type <span className="text-red-500">*</span>
                      </label>
                      <Select
                        onValueChange={(value) => form.setValue("educationType", value as "Regular" | "Extension" | "Distance")}
                        defaultValue={form.getValues("educationType")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select education type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Regular">Regular</SelectItem>
                          <SelectItem value="Extension">Extension</SelectItem>
                          <SelectItem value="Distance">Distance</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.educationType && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.educationType.message}
                        </p>
                      )}
                    </div>

                    {/* Previous Education Type */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Previous Education Type
                      </label>
                      <Select
                        onValueChange={(value) => form.setValue("previousEducationType", value)}
                        defaultValue={form.getValues("previousEducationType")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select previous education type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Public">Public</SelectItem>
                          <SelectItem value="Private">Private</SelectItem>
                          <SelectItem value="Religious">Religious</SelectItem>
                          <SelectItem value="None">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Previous Institution */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Previous Institution
                      </label>
                      <Input
                        {...form.register("previousInstitution")}
                        placeholder="Previous institution"
                      />
                    </div>

                    {/* Grade */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Grade <span className="text-red-500">*</span>
                      </label>
                      <Select
                        onValueChange={(value) => form.setValue("grade", parseInt(value))}
                        defaultValue={form.getValues("grade")?.toString()}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(12)].map((_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              Grade {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.grade && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.grade.message}
                        </p>
                      )}
                    </div>

                    {/* Section */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Section
                      </label>
                      <Select
                        onValueChange={(value) => form.setValue("section", value)}
                        defaultValue={form.getValues("section")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Section A</SelectItem>
                          <SelectItem value="B">Section B</SelectItem>
                          <SelectItem value="C">Section C</SelectItem>
                          <SelectItem value="D">Section D</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Language of Instruction */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Language of Instruction <span className="text-red-500">*</span>
                      </label>
                      <Select
                        onValueChange={(value) => form.setValue("languageOfInstruction", value)}
                        defaultValue={form.getValues("languageOfInstruction")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Amharic">Amharic</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Afan Oromo">Afan Oromo</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.languageOfInstruction && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.languageOfInstruction.message}
                        </p>
                      )}
                    </div>

                    {/* Special Support */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Special Support Required
                      </label>
                      <Select
                        onValueChange={(value) => form.setValue("requiresSpecialSupport", value)}
                        defaultValue={form.getValues("requiresSpecialSupport")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select if required" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="None">None</SelectItem>
                          <SelectItem value="Visual Impairment">Visual Impairment</SelectItem>
                          <SelectItem value="Hearing Impairment">Hearing Impairment</SelectItem>
                          <SelectItem value="Physical Disability">Physical Disability</SelectItem>
                          <SelectItem value="Learning Disability">Learning Disability</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="inmate" className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    {/* Is Inmate */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isInmate"
                        className="w-4 h-4"
                        checked={form.getValues("isInmate")}
                        onChange={(e) => {
                          form.setValue("isInmate", e.target.checked);
                        }}
                      />
                      <label htmlFor="isInmate" className="text-sm font-medium">
                        This student is an inmate
                      </label>
                    </div>

                    {form.getValues("isInmate") && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Crime Type */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium mb-2">
                              Type of Crime <span className="text-red-500">*</span>
                            </label>
                            <Select
                              onValueChange={(value) => form.setValue("crimeType", value)}
                              defaultValue={form.getValues("crimeType")}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select crime type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Theft">Theft</SelectItem>
                                <SelectItem value="Assault">Assault</SelectItem>
                                <SelectItem value="Fraud">Fraud</SelectItem>
                                <SelectItem value="Corruption">Corruption</SelectItem>
                                <SelectItem value="Political">Political</SelectItem>
                                <SelectItem value="Drug Related">Drug Related</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Sentence Duration */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium mb-2">
                              Sentence Duration <span className="text-red-500">*</span>
                            </label>
                            <Input
                              {...form.register("sentenceDuration")}
                              placeholder="e.g. 5 years"
                            />
                          </div>

                          {/* Imprisonment Start Date */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium mb-2">
                              Imprisonment Start Date <span className="text-red-500">*</span>
                            </label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !form.getValues("imprisonmentStartDate") && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {form.getValues("imprisonmentStartDate") ? (
                                    format(form.getValues("imprisonmentStartDate"), "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={form.getValues("imprisonmentStartDate")}
                                  onSelect={(date) => date && form.setValue("imprisonmentStartDate", date)}
                                  disabled={(date) =>
                                    date > new Date()
                                  }
                                  initialFocus
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          {/* Imprisonment End Date with Parole */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium mb-2">
                              Imprisonment End Date with Parole
                            </label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !form.getValues("imprisonmentEndDateWithParole") && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {form.getValues("imprisonmentEndDateWithParole") ? (
                                    format(form.getValues("imprisonmentEndDateWithParole"), "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={form.getValues("imprisonmentEndDateWithParole")}
                                  onSelect={(date) => date && form.setValue("imprisonmentEndDateWithParole", date)}
                                  disabled={(date) =>
                                    date < new Date()
                                  }
                                  initialFocus
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          {/* Imprisonment End Date without Parole */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium mb-2">
                              Imprisonment End Date without Parole
                            </label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !form.getValues("imprisonmentEndDateWithoutParole") && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {form.getValues("imprisonmentEndDateWithoutParole") ? (
                                    format(form.getValues("imprisonmentEndDateWithoutParole"), "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={form.getValues("imprisonmentEndDateWithoutParole")}
                                  onSelect={(date) => date && form.setValue("imprisonmentEndDateWithoutParole", date)}
                                  disabled={(date) =>
                                    date < new Date()
                                  }
                                  initialFocus
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          {/* Residing Zone */}
                          <div className="col-span-1">
                            <label className="block text-sm font-medium mb-2">
                              Residing Zone
                            </label>
                            <Input
                              {...form.register("residingZone")}
                              placeholder="e.g. Zone A"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Current Status */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Current Status <span className="text-red-500">*</span>
                      </label>
                      <Select
                        onValueChange={(value) => form.setValue("currentStatus", value as any)}
                        defaultValue={form.getValues("currentStatus")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select current status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Suspended">Suspended</SelectItem>
                          <SelectItem value="Graduated">Graduated</SelectItem>
                          <SelectItem value="Transferred">Transferred</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.currentStatus && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.currentStatus.message}
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  switch (activeTab) {
                    case "address":
                      setActiveTab("personal");
                      break;
                    case "education":
                      setActiveTab("address");
                      break;
                    case "inmate":
                      setActiveTab("education");
                      break;
                  }
                }}
                disabled={activeTab === "personal"}
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={handleNext}
              >
                {activeTab === "inmate" ? (
                  <div className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Submit Registration
                  </div>
                ) : (
                  "Next"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};
