
export interface AttendanceRecord {
  id: string;
  studentId: string;
  courseId: string;
  date: Date;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  remarks?: string;
}
