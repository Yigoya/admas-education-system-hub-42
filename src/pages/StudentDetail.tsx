import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Calendar, User, BookOpen, GraduationCap } from "lucide-react";
import { students } from "@/mock/mockData";

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return <div className="p-8 text-center text-xl text-red-500">Student not found.</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-2xl font-bold text-blue-700">Student Details</div>
          <div className="text-gray-500 text-sm mt-1">ID: {student.id}</div>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow text-sm font-medium"
          onClick={() => alert('Edit functionality coming soon!')}
        >
          Edit
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Profile Card */}
        <Card className="w-full md:w-1/3 max-w-md flex flex-col items-center p-6">
          <img
            src={student.photo || "https://randomuser.me/api/portraits/men/1.jpg"}
            alt={student.name}
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow"
          />
          <div className="text-xl font-semibold text-center mb-1">{student.title} {student.name} {student.fatherName}</div>
          <div className="text-blue-600 text-center mb-4">{student.department || "-"}</div>
          <div className="w-full space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <User className="text-blue-400" />
              <span className="font-medium">Gender</span>
              <span className="ml-auto">{student.gender}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="text-blue-400" />
              <span className="font-medium">Date of Birth</span>
              <span className="ml-auto">{student.dateOfBirth instanceof Date ? student.dateOfBirth.toISOString().split('T')[0] : student.dateOfBirth}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <User className="text-blue-400" />
              <span className="font-medium">Mother's Name</span>
              <span className="ml-auto">{student.motherName}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <User className="text-blue-400" />
              <span className="font-medium">Grandfather's Name</span>
              <span className="ml-auto">{student.grandfatherName}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <User className="text-blue-400" />
              <span className="font-medium">Nationality</span>
              <span className="ml-auto">{student.nationality}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <BookOpen className="text-blue-400" />
              <span className="font-medium">Religion</span>
              <span className="ml-auto">{student.religion}</span>
            </div>
          </div>
          <hr className="w-full my-4" />
          <div className="w-full space-y-3">
            <div className="font-semibold text-gray-700 mb-2">Contact Information</div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="text-blue-400" />
              <span className="font-medium">Phone Number</span>
              <span className="ml-auto">{student.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="text-blue-400" />
              <span className="font-medium">Email</span>
              <span className="ml-auto">{student.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="text-blue-400" />
              <span className="font-medium">Region</span>
              <span className="ml-auto">{student.regionOfOrigin}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="text-blue-400" />
              <span className="font-medium">Zone</span>
              <span className="ml-auto">{student.zone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="text-blue-400" />
              <span className="font-medium">District</span>
              <span className="ml-auto">{student.district}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="text-blue-400" />
              <span className="font-medium">Specific Place</span>
              <span className="ml-auto">{student.specificPlace || "-"}</span>
            </div>
          </div>
        </Card>

        {/* Right: Academic, Personal, Inmate Info */}
        <div className="flex-1 flex flex-col gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="font-semibold text-lg mb-4 flex items-center gap-2">
                <GraduationCap className="text-blue-400" /> Academic Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Department</div>
                  <div className="font-medium">{student.department || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Institution Name</div>
                  <div className="font-medium">{student.institutionName}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Batch Number</div>
                  <div className="font-medium">{student.batchNumber || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Academic Year</div>
                  <div className="font-medium">{student.academicYear || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Registration Date</div>
                  <div className="font-medium">{student.registrationDate instanceof Date ? student.registrationDate.toISOString().split('T')[0] : student.registrationDate}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Education Start Date</div>
                  <div className="font-medium">{student.educationStartDate instanceof Date ? student.educationStartDate.toISOString().split('T')[0] : student.educationStartDate}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Education End Date</div>
                  <div className="font-medium">{student.educationEndDate ? (student.educationEndDate instanceof Date ? student.educationEndDate.toISOString().split('T')[0] : student.educationEndDate) : '-'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Duration of Education</div>
                  <div className="font-medium">{student.durationOfEducation || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Education Type</div>
                  <div className="font-medium">{student.educationType}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Grade</div>
                  <div className="font-medium">{student.grade}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Section</div>
                  <div className="font-medium">{student.section || '-'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Language of Instruction</div>
                  <div className="font-medium">{student.languageOfInstruction}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Previous Education Type</div>
                  <div className="font-medium">{student.previousEducationType || '-'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Previous Institution</div>
                  <div className="font-medium">{student.previousInstitution || '-'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Requires Special Support</div>
                  <div className="font-medium">{student.requiresSpecialSupport || '-'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="font-semibold text-lg mb-4 flex items-center gap-2">
                <User className="text-blue-400" /> Inmate Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Is Inmate</div>
                  <div className="font-medium">{student.isInmate ? 'Yes' : 'No'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Current Status</div>
                  <div className="font-medium">{student.currentStatus}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Sentence Duration</div>
                  <div className="font-medium">{student.sentenceDuration || '-'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Crime Type</div>
                  <div className="font-medium">{student.crimeType || '-'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Residing Zone</div>
                  <div className="font-medium">{student.residingZone || '-'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Imprisonment Start Date</div>
                  <div className="font-medium">{student.imprisonmentStartDate ? (student.imprisonmentStartDate instanceof Date ? student.imprisonmentStartDate.toISOString().split('T')[0] : student.imprisonmentStartDate) : '-'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Imprisonment End Date (With Parole)</div>
                  <div className="font-medium">{student.imprisonmentEndDateWithParole ? (student.imprisonmentEndDateWithParole instanceof Date ? student.imprisonmentEndDateWithParole.toISOString().split('T')[0] : student.imprisonmentEndDateWithParole) : '-'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Imprisonment End Date (Without Parole)</div>
                  <div className="font-medium">{student.imprisonmentEndDateWithoutParole ? (student.imprisonmentEndDateWithoutParole instanceof Date ? student.imprisonmentEndDateWithoutParole.toISOString().split('T')[0] : student.imprisonmentEndDateWithoutParole) : '-'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 