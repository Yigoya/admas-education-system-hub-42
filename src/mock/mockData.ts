import { Student, Gender, EducationType, Status, CrimeType } from '../types/student';
import { Teacher, EmploymentType, TeacherStatus } from '../types/teacher';
import { Subject } from '../types/course';
import { AttendanceRecord } from '../types/attendance';
import { GradeRecord } from '../types/grade';
import { Exam, ExamResult } from '../types/exam';

// Generate Ethiopian Names
const maleFirstNames = ["Abebe", "Kebede", "Dawit", "Mulugeta", "Solomon", "Girma", "Tadesse", "Yonas", "Tamrat", "Getachew"];
const femaleFirstNames = ["Tigist", "Birtukan", "Hiwot", "Meron", "Selamawit", "Kidist", "Rahel", "Yordanos", "Bethlehem", "Meseret"];
const middleNames = ["Alemu", "Bekele", "Deribe", "Fikadu", "Haile", "Nega", "Tadesse", "Wondwosen", "Yilma", "Zewdu"];
const lastNames = ["Abebe", "Tefera", "Demissie", "Gebre", "Mengistu", "Negash", "Tekle", "Wolde", "Yimam", "Zerihun"];

// Generate Ethiopian Regions
const regions = ["Addis Ababa", "Amhara", "Oromia", "Tigray", "SNNPR", "Afar", "Somali", "Benishangul-Gumuz", "Gambela", "Harari", "Sidama"];
const zones = {
  "Addis Ababa": ["Arada", "Bole", "Kirkos", "Lideta", "Yeka", "Kolfe Keranio"],
  "Amhara": ["North Gondar", "South Gondar", "West Gojjam", "East Gojjam", "North Wollo", "South Wollo"],
  "Oromia": ["East Shewa", "West Shewa", "North Shewa", "Arsi", "Bale", "Borena"],
  "Tigray": ["Central", "Eastern", "North Western", "Southern", "Western"],
  "SNNPR": ["Gamo", "Gofa", "Hadiya", "Kembata Tembaro", "Sidama", "Wolayta"],
  "Sidama": ["Hawassa", "Aleta Wondo", "Yirgalem", "Bensa", "Dale", "Aroresa"],
  "Afar": ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5"],
  "Somali": ["Fafan", "Sitti", "Nogob", "Jarar", "Korahe"],
  "Benishangul-Gumuz": ["Assosa", "Kamashi", "Metekel"],
  "Gambela": ["Agnewak", "Majang", "Nuer"],
  "Harari": ["Harari"]
};

// Generate random districts
const getRandomDistrict = () => {
  const districts = [
    "Woreda 1", "Woreda 2", "Woreda 3", "Woreda 4", "Woreda 5",
    "Kebele 01", "Kebele 02", "Kebele 03", "Kebele 04", "Kebele 05"
  ];
  return districts[Math.floor(Math.random() * districts.length)];
};

// Helper to generate random date within range
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Helper to calculate age
const calculateAge = (birthDate: Date) => {
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

// Generate mock students
export const generateMockStudents = (count: number): Student[] => {
  const students: Student[] = [];
  
  for (let i = 0; i < count; i++) {
    const gender: Gender = Math.random() > 0.5 ? 'Male' : 'Female';
    const firstName = gender === 'Male' 
      ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
      : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
    const fatherName = middleNames[Math.floor(Math.random() * middleNames.length)];
    const grandfatherName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    const regionOfOrigin = regions[Math.floor(Math.random() * regions.length)];
    const availableZones = zones[regionOfOrigin as keyof typeof zones] || zones["Addis Ababa"];
    const zone = availableZones[Math.floor(Math.random() * availableZones.length)];
    
    const dateOfBirth = randomDate(new Date(2000, 0, 1), new Date(2012, 0, 1));
    const age = calculateAge(dateOfBirth);
    
    const grade = Math.floor(Math.random() * 12) + 1;
    const isInmate = Math.random() > 0.7; // 30% of students are inmates
    
    let imprisonmentStartDate, imprisonmentEndDateWithParole, imprisonmentEndDateWithoutParole, sentenceDuration, crimeType, residingZone;
    
    if (isInmate) {
      imprisonmentStartDate = randomDate(new Date(2018, 0, 1), new Date(2023, 0, 1));
      const sentenceYears = Math.floor(Math.random() * 10) + 1;
      sentenceDuration = `${sentenceYears} years`;
      
      imprisonmentEndDateWithoutParole = new Date(imprisonmentStartDate);
      imprisonmentEndDateWithoutParole.setFullYear(imprisonmentEndDateWithoutParole.getFullYear() + sentenceYears);
      
      imprisonmentEndDateWithParole = new Date(imprisonmentEndDateWithoutParole);
      imprisonmentEndDateWithParole.setFullYear(imprisonmentEndDateWithParole.getFullYear() - Math.floor(sentenceYears / 3));
      
      crimeType = ["Theft", "Assault", "Fraud", "Corruption", "Political", "Drug Related", "Other"][Math.floor(Math.random() * 7)] as CrimeType;
      residingZone = `Zone ${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`; // Zone A to Zone F
    }
    
    const educationType: EducationType = ['Regular', 'Extension', 'Distance'][Math.floor(Math.random() * 3)] as EducationType;
    const status: Status = ['Active', 'Inactive', 'Suspended', 'Graduated', 'Transferred'][Math.floor(Math.random() * 5)] as Status;
    
    const registrationDate = randomDate(new Date(2020, 0, 1), new Date());
    const educationStartDate = new Date(registrationDate);
    educationStartDate.setDate(educationStartDate.getDate() + Math.floor(Math.random() * 30));
    
    const student: Student = {
      id: `STU-${1000 + i}`,
      title: gender === 'Male' ? 'Mr.' : 'Ms.',
      name: firstName,
      fatherName,
      grandfatherName,
      gender,
      motherName: `${femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      registrationDate,
      educationStartDate,
      durationOfEducation: `${Math.floor(Math.random() * 4) + 1} years`,
      phoneNumber: `+251${Math.floor(Math.random() * 90000000) + 10000000}`,
      email: `${firstName.toLowerCase()}.${fatherName.toLowerCase()}@example.com`,
      religion: ['Orthodox', 'Muslim', 'Protestant', 'Catholic', 'Other'][Math.floor(Math.random() * 5)] as any,
      nationality: 'Ethiopian',
      dateOfBirth,
      age,
      regionOfOrigin,
      zone,
      district: getRandomDistrict(),
      specificPlace: `${zone} Area`,
      institutionName: 'Federal Prison Commission Educational Institution',
      academicYear: `${2023 + Math.floor(Math.random() * 3)}-${2024 + Math.floor(Math.random() * 3)}`,
      educationType,
      previousEducationType: Math.random() > 0.5 ? ['Public', 'Private', 'Religious'][Math.floor(Math.random() * 3)] : undefined,
      previousInstitution: Math.random() > 0.5 ? `${regions[Math.floor(Math.random() * regions.length)]} School` : undefined,
      department: grade > 9 ? ['Science', 'Social Science', 'Language', 'Mathematics'][Math.floor(Math.random() * 4)] : undefined,
      photo: Math.random() > 0.5 ? `https://randomuser.me/api/portraits/${gender === 'Male' ? 'men' : 'women'}/${i % 99}.jpg` : undefined,
      batchNumber: `B-${2020 + Math.floor(Math.random() * 5)}`,
      isInmate,
      sentenceDuration,
      crimeType,
      currentStatus: status,
      residingZone,
      imprisonmentStartDate,
      imprisonmentEndDateWithParole,
      imprisonmentEndDateWithoutParole,
      languageOfInstruction: ['Amharic', 'English', 'Afan Oromo'][Math.floor(Math.random() * 3)],
      requiresSpecialSupport: Math.random() > 0.9 ? ['Visual Impairment', 'Hearing Impairment', 'Physical Disability', 'Learning Disability'][Math.floor(Math.random() * 4)] : undefined,
      grade,
      section: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]
    };
    
    students.push(student);
  }
  
  return students;
};

// Generate mock teachers
export const generateMockTeachers = (count: number): Teacher[] => {
  const teachers: Teacher[] = [];
  
  for (let i = 0; i < count; i++) {
    const gender = Math.random() > 0.5 ? 'Male' : 'Female';
    const firstName = gender === 'Male' 
      ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
      : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
    const fatherName = middleNames[Math.floor(Math.random() * middleNames.length)];
    const grandfatherName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    const dateOfBirth = randomDate(new Date(1970, 0, 1), new Date(2000, 0, 1));
    const yearsOfExperience = Math.floor(Math.random() * 20) + 1;
    
    const employmentDate = randomDate(new Date(2010, 0, 1), new Date(2023, 0, 1));
    
    const qualifications = ['Bachelor', 'Masters', 'PhD', 'Diploma'];
    const qualification = qualifications[Math.floor(Math.random() * qualifications.length)];
    
    const specializations = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'English', 'Amharic', 'Civics', 'ICT'];
    const specialization = specializations[Math.floor(Math.random() * specializations.length)];
    
    const subjectCount = Math.floor(Math.random() * 3) + 1;
    const subjectsTeaching = [];
    for (let j = 0; j < subjectCount; j++) {
      const subject = specializations[Math.floor(Math.random() * specializations.length)];
      if (!subjectsTeaching.includes(subject)) {
        subjectsTeaching.push(subject);
      }
    }
    
    const gradeCount = Math.floor(Math.random() * 4) + 1;
    const gradesTeaching = [];
    for (let j = 0; j < gradeCount; j++) {
      const grade = Math.floor(Math.random() * 12) + 1;
      if (!gradesTeaching.includes(grade)) {
        gradesTeaching.push(grade);
      }
    }
    gradesTeaching.sort((a, b) => a - b);
    
    const employmentType = ['Full-time', 'Part-time', 'Contract'][Math.floor(Math.random() * 3)] as EmploymentType;
    const status = ['Active', 'On Leave', 'Terminated', 'Retired'][Math.floor(Math.random() * 4)] as TeacherStatus;
    
    const teacher: Teacher = {
      id: `TCH-${1000 + i}`,
      title: gender === 'Male' ? 'Mr.' : 'Ms.',
      name: firstName,
      fatherName,
      grandfatherName,
      gender,
      phoneNumber: `+251${Math.floor(Math.random() * 90000000) + 10000000}`,
      email: `${firstName.toLowerCase()}.${fatherName.toLowerCase()}@example.edu.et`,
      dateOfBirth,
      nationality: 'Ethiopian',
      qualification,
      specialization,
      yearsOfExperience,
      employmentDate,
      employmentType,
      subjectsTeaching,
      gradesTeaching,
      status,
      photo: `https://randomuser.me/api/portraits/${gender === 'Male' ? 'men' : 'women'}/${(i + 50) % 99}.jpg`,
    };
    
    teachers.push(teacher);
  }
  
  return teachers;
};

// Generate mock courses
export const generateMockSubjects = (count: number, teacherIds: string[]): Subject[] => {
  const subjects: Subject[] = [];
  const subjectNames = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 
    'English', 'Amharic', 'Afan Oromo', 'Civics', 'ICT', 'Physical Education',
    'Ethics', 'Economics', 'Business', 'Technical Drawing', 'Agriculture'
  ];
  
  for (let i = 0; i < count; i++) {
    const name = subjectNames[i % subjectNames.length];
    const grade = Math.floor(Math.random() * 12) + 1;
    const code = `${name.substring(0, 3).toUpperCase()}-${grade}${i % 9 + 1}`;
    const creditHours = Math.floor(Math.random() * 3) + 2;
    const semester = Math.random() > 0.5 ? 'First' : 'Second';
    const academicYear = `${2023 + Math.floor(Math.random() * 3)}-${2024 + Math.floor(Math.random() * 3)}`;
    
    const subject: Subject = {
      id: `SUB-${1000 + i}`,
      name,
      code,
      description: `${name} for grade ${grade} students focusing on basic principles and applications.`,
      grade,
      creditHours,
      teacherId: teacherIds[Math.floor(Math.random() * teacherIds.length)],
      academicYear,
      semester: semester as 'First' | 'Second',
      language: ['Amharic', 'English', 'Afan Oromo'][Math.floor(Math.random() * 3)],
      materials: Math.random() > 0.5 ? [
        `${name} Textbook.pdf`,
        `${name} Workbook.pdf`,
        `${name} Teacher's Guide.pdf`
      ] : undefined
    };
    
    subjects.push(subject);
  }
  
  return subjects;
};

// Generate mock attendance records
export const generateMockAttendanceRecords = (studentIds: string[], courseIds: string[], daysCount: number): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const today = new Date();
  
  for (let day = 0; day < daysCount; day++) {
    const recordDate = new Date(today);
    recordDate.setDate(recordDate.getDate() - day);
    
    for (const studentId of studentIds) {
      for (const courseId of courseIds) {
        if (Math.random() > 0.2) { // 80% chance of having a record for each course each day
          const status = Math.random() > 0.8 
            ? 'Absent' 
            : Math.random() > 0.9 
              ? 'Late' 
              : Math.random() > 0.95 
                ? 'Excused' 
                : 'Present';
          
          const record: AttendanceRecord = {
            id: `ATT-${recordDate.toISOString().split('T')[0]}-${studentId}-${courseId}`,
            studentId,
            courseId,
            date: recordDate,
            status: status as 'Present' | 'Absent' | 'Late' | 'Excused',
            remarks: status !== 'Present' ? {
              'Absent': 'Student did not attend class.',
              'Late': 'Student arrived 15 minutes late.',
              'Excused': 'Medical appointment.'
            }[status] : undefined
          };
          
          records.push(record);
        }
      }
    }
  }
  
  return records;
};

// Generate mock grade records
export const generateMockGradeRecords = (studentIds: string[], courseIds: string[]): GradeRecord[] => {
  const records: GradeRecord[] = [];
  const today = new Date();
  const assessmentTypes = ['Quiz', 'Assignment', 'Mid-term', 'Final', 'Project'];
  
  for (const studentId of studentIds) {
    for (const courseId of courseIds) {
      for (const assessmentType of assessmentTypes) {
        const score = Math.floor(Math.random() * 40) + 60; // Scores between 60 and 100
        
        const getLetterGrade = (score: number) => {
          if (score >= 95) return 'A+';
          if (score >= 90) return 'A';
          if (score >= 85) return 'A-';
          if (score >= 80) return 'B+';
          if (score >= 75) return 'B';
          if (score >= 70) return 'B-';
          if (score >= 65) return 'C+';
          if (score >= 60) return 'C';
          if (score >= 55) return 'C-';
          if (score >= 50) return 'D';
          return 'F';
        };
        
        const letterGrade = getLetterGrade(score);
        const recordDate = new Date(today);
        recordDate.setDate(recordDate.getDate() - Math.floor(Math.random() * 90)); // Random date in last 90 days
        
        const record: GradeRecord = {
          id: `GRD-${studentId}-${courseId}-${assessmentType}`,
          studentId,
          courseId,
          academicYear: '2023-2024',
          semester: Math.random() > 0.5 ? 'First' : 'Second',
          assessmentType: assessmentType as 'Quiz' | 'Assignment' | 'Mid-term' | 'Final' | 'Project',
          scoreOutOf100: score,
          letterGrade: letterGrade as any,
          remarks: score < 60 ? 'Needs improvement' : undefined,
          date: recordDate
        };
        
        records.push(record);
      }
    }
  }
  
  return records;
};

// Generate mock exams
export const generateMockExams = (courseIds: string[], count: number): Exam[] => {
  const exams: Exam[] = [];
  const today = new Date();
  
  for (let i = 0; i < count; i++) {
    const courseId = courseIds[i % courseIds.length];
    const examDate = new Date(today);
    examDate.setDate(examDate.getDate() + Math.floor(Math.random() * 30)); // Random date in next 30 days
    
    const examTypes = ['Quiz', 'Assignment', 'Mid-term', 'Final', 'Project'];
    const examType = examTypes[Math.floor(Math.random() * examTypes.length)];
    
    const totalMarks = examType === 'Final' ? 100 : examType === 'Mid-term' ? 50 : 25;
    const passingMarks = totalMarks * 0.5;
    
    const startHour = 9 + Math.floor(Math.random() * 6); // 9 AM to 3 PM
    const startMinute = Math.floor(Math.random() * 6) * 10; // 0, 10, 20, 30, 40, 50
    const durationHours = examType === 'Final' ? 3 : examType === 'Mid-term' ? 2 : 1;
    
    const startTime = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
    const endTime = `${(startHour + durationHours).toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
    
    const exam: Exam = {
      id: `EXM-${1000 + i}`,
      title: `${examType} Examination for Course ${courseId}`,
      courseId,
      examDate,
      startTime,
      endTime,
      totalMarks,
      passingMarks,
      examType: examType as 'Quiz' | 'Assignment' | 'Mid-term' | 'Final' | 'Project',
      academicYear: '2023-2024',
      semester: Math.random() > 0.5 ? 'First' : 'Second',
      grade: Math.floor(Math.random() * 12) + 1,
      section: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
      instructions: 'Answer all questions. No electronic devices allowed. Write your name and ID on the answer sheet.'
    };
    
    exams.push(exam);
  }
  
  return exams;
};

// Generate mock exam results
export const generateMockExamResults = (examIds: string[], studentIds: string[]): ExamResult[] => {
  const results: ExamResult[] = [];
  
  for (const examId of examIds) {
    for (const studentId of studentIds) {
      if (Math.random() > 0.1) { // 90% of students have results
        const marksObtained = Math.floor(Math.random() * 40) + 60; // Marks between 60 and 100
        const passStatus = marksObtained >= 50 ? 'Pass' : 'Fail';
        
        const result: ExamResult = {
          id: `RES-${examId}-${studentId}`,
          examId,
          studentId,
          marksObtained,
          passStatus: passStatus as 'Pass' | 'Fail',
          remarks: marksObtained < 50 ? 'Needs remedial classes' : undefined
        };
        
        results.push(result);
      }
    }
  }
  
  return results;
};

// Create and export the mock data
export const students = generateMockStudents(100);
export const teachers = generateMockTeachers(20);
export const courses = generateMockSubjects(30, teachers.map(t => t.id));

const sampleStudentIds = students.slice(0, 20).map(s => s.id);
const sampleCourseIds = courses.slice(0, 10).map(c => c.id);

export const attendanceRecords = generateMockAttendanceRecords(sampleStudentIds, sampleCourseIds, 30);
export const gradeRecords = generateMockGradeRecords(sampleStudentIds, sampleCourseIds);
export const exams = generateMockExams(sampleCourseIds, 15);
export const examResults = generateMockExamResults(exams.map(e => e.id), sampleStudentIds);

// Calculate statistics
export const calculateStatistics = () => {
  return {
    totalStudents: students.length,
    activeStudents: students.filter(s => s.currentStatus === 'Active').length,
    totalTeachers: teachers.length,
    activeTeachers: teachers.filter(t => t.status === 'Active').length,
    totalCourses: courses.length,
    totalExams: exams.length,
    averageAttendance: Math.floor(
      (attendanceRecords.filter(r => r.status === 'Present').length / attendanceRecords.length) * 100
    ),
    averageGrade: Math.floor(
      gradeRecords.reduce((sum, record) => sum + record.scoreOutOf100, 0) / gradeRecords.length
    ),
    inmateStudents: students.filter(s => s.isInmate).length,
    nonInmateStudents: students.filter(s => !s.isInmate).length,
    gradeDistribution: Array(12).fill(0).map((_, i) => {
      return {
        grade: i + 1,
        count: students.filter(s => s.grade === i + 1).length
      };
    }),
    genderDistribution: {
      male: students.filter(s => s.gender === 'Male').length,
      female: students.filter(s => s.gender === 'Female').length
    },
    passFailRatio: {
      pass: examResults.filter(r => r.passStatus === 'Pass').length,
      fail: examResults.filter(r => r.passStatus === 'Fail').length
    }
  };
};

export const statistics = calculateStatistics();
