
export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  grade: number;
  creditHours: number;
  teacherId?: string;
  academicYear: string;
  semester: 'First' | 'Second';
  language: string;
  materials?: string[];
}

// Adding this to avoid breaking existing code that might still refer to Course
export type Course = Subject;
