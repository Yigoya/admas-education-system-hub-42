
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Check, X } from "lucide-react";

const formSchema = z.object({
  grade: z.string().min(1),
  section: z.string().optional(),
  subject: z.string().min(1),
  date: z.date(),
});

interface Student {
  id: string;
  name: string;
  fatherName: string;
  status: "Present" | "Absent" | "Late" | "Excused";
  remarks?: string;
}

interface RecordAttendanceFormProps {
  onSuccess: () => void;
}

export function RecordAttendanceForm({ onSuccess }: RecordAttendanceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'filter' | 'record'>('filter');
  const [students, setStudents] = useState<Student[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grade: "",
      section: "",
      subject: "",
      date: new Date(),
    },
  });

  function loadStudents(values: z.infer<typeof formSchema>) {
    // Simulate API call to fetch students based on grade, section, etc.
    setTimeout(() => {
      const mockStudents: Student[] = Array(12).fill(0).map((_, i) => ({
        id: `ST${1000 + i}`,
        name: `Student ${i+1}`,
        fatherName: `Father ${i+1}`,
        status: "Present", // default status
      }));
      
      setStudents(mockStudents);
      setStep('record');
    }, 500);
  }

  function updateStudentStatus(index: number, status: "Present" | "Absent" | "Late" | "Excused") {
    const updatedStudents = [...students];
    updatedStudents[index].status = status;
    setStudents(updatedStudents);
  }

  function updateStudentRemarks(index: number, remarks: string) {
    const updatedStudents = [...students];
    updatedStudents[index].remarks = remarks;
    setStudents(updatedStudents);
  }

  function submitAttendance() {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log({
        ...form.getValues(),
        students,
      });
      setIsSubmitting(false);
      onSuccess();
    }, 1000);
  }

  return (
    <div className="space-y-6">
      {step === 'filter' && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(loadStudents)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                          <SelectItem key={grade} value={grade.toString()}>
                            Grade {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="section"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">All Sections</SelectItem>
                        {["A", "B", "C", "D"].map((section) => (
                          <SelectItem key={section} value={section}>
                            Section {section}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button type="submit">Load Students</Button>
            </div>
          </form>
        </Form>
      )}

      {step === 'record' && (
        <>
          <div className="flex flex-wrap gap-3 text-sm">
            <div><span className="font-semibold">Grade:</span> {form.getValues("grade")}</div>
            {form.getValues("section") && (
              <div><span className="font-semibold">Section:</span> {form.getValues("section")}</div>
            )}
            <div><span className="font-semibold">Subject:</span> {form.getValues("subject")}</div>
            <div><span className="font-semibold">Date:</span> {format(form.getValues("date"), "PPP")}</div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>
                      {student.name} {student.fatherName}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        <Badge 
                          variant={student.status === "Present" ? "default" : "outline"} 
                          className={cn(student.status === "Present" ? "bg-green-500 hover:bg-green-600" : "")}
                          onClick={() => updateStudentStatus(index, "Present")}
                        >
                          <Check className="mr-1 h-3 w-3" />
                          Present
                        </Badge>
                        <Badge 
                          variant={student.status === "Absent" ? "default" : "outline"} 
                          className={cn(student.status === "Absent" ? "bg-red-500 hover:bg-red-600" : "")}
                          onClick={() => updateStudentStatus(index, "Absent")}
                        >
                          <X className="mr-1 h-3 w-3" />
                          Absent
                        </Badge>
                        <Badge 
                          variant={student.status === "Late" ? "default" : "outline"} 
                          className={cn(student.status === "Late" ? "bg-yellow-500 hover:bg-yellow-600" : "")}
                          onClick={() => updateStudentStatus(index, "Late")}
                        >
                          Late
                        </Badge>
                        <Badge 
                          variant={student.status === "Excused" ? "default" : "outline"} 
                          className={cn(student.status === "Excused" ? "bg-blue-500 hover:bg-blue-600" : "")}
                          onClick={() => updateStudentStatus(index, "Excused")}
                        >
                          Excused
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Textarea 
                        placeholder="Optional remarks"
                        value={student.remarks || ""}
                        onChange={(e) => updateStudentRemarks(index, e.target.value)}
                        className="min-h-[60px] text-sm"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between gap-3">
            <Button variant="outline" onClick={() => setStep('filter')}>Back</Button>
            <Button onClick={submitAttendance} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Attendance"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
