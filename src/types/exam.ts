
export interface Exam {
  id: string;
  title: string;
  courseId: string;
  examDate: Date;
  startTime: string;
  endTime: string;
  totalMarks: number;
  passingMarks: number;
  examType: 'Quiz' | 'Assignment' | 'Mid-term' | 'Final' | 'Project';
  academicYear: string;
  semester: 'First' | 'Second';
  grade: number;
  section?: string;
  instructions?: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  marksObtained: number;
  passStatus: 'Pass' | 'Fail';
  remarks?: string;
}
