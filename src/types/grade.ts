
export type GradeScale = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'F';

export interface GradeRecord {
  id: string;
  studentId: string;
  courseId: string;
  academicYear: string;
  semester: 'First' | 'Second';
  assessmentType: 'Quiz' | 'Assignment' | 'Mid-term' | 'Final' | 'Project';
  scoreOutOf100: number;
  letterGrade?: GradeScale;
  remarks?: string;
  date: Date;
}
