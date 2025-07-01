
export type Gender = 'Male' | 'Female';
export type Religion = 'Orthodox' | 'Muslim' | 'Protestant' | 'Catholic' | 'Other';
export type EducationType = 'Regular' | 'Extension' | 'Distance';
export type Status = 'Active' | 'Inactive' | 'Suspended' | 'Graduated' | 'Transferred';
export type CrimeType = 
  | 'Theft'
  | 'Assault'
  | 'Fraud'
  | 'Corruption'
  | 'Political'
  | 'Drug Related'
  | 'Other';

export interface Student {
  id: string;
  title?: string;
  name: string;
  fatherName: string;
  grandfatherName: string;
  gender: Gender;
  motherName: string;
  registrationDate: Date;
  educationStartDate: Date;
  educationEndDate?: Date;
  durationOfEducation: string;
  phoneNumber?: string;
  email?: string;
  religion?: Religion;
  nationality: string;
  dateOfBirth: Date;
  age: number;
  regionOfOrigin: string;
  zone: string;
  district: string;
  specificPlace?: string;
  institutionName: string;
  academicYear: string;
  educationType: EducationType;
  previousEducationType?: string;
  previousInstitution?: string;
  department?: string;
  photo?: string;
  batchNumber: string;
  isInmate: boolean;
  sentenceDuration?: string;
  crimeType?: CrimeType;
  currentStatus: Status;
  residingZone?: string;
  imprisonmentStartDate?: Date;
  imprisonmentEndDateWithParole?: Date;
  imprisonmentEndDateWithoutParole?: Date;
  languageOfInstruction: string;
  requiresSpecialSupport?: string;
  grade: number; // 1-12
  section?: string;
}
