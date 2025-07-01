
export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract';
export type TeacherStatus = 'Active' | 'On Leave' | 'Terminated' | 'Retired';

export interface Teacher {
  id: string;
  title?: string;
  name: string;
  fatherName: string;
  grandfatherName?: string;
  gender: 'Male' | 'Female';
  phoneNumber: string;
  email?: string;
  dateOfBirth: Date;
  nationality: string;
  qualification: string;
  specialization: string;
  yearsOfExperience: number;
  employmentDate: Date;
  employmentType: EmploymentType;
  subjectsTeaching: string[];
  gradesTeaching: number[];
  status: TeacherStatus;
  photo?: string;
}
