
export type Language = 'en' | 'hi' | 'mr';

export enum CardType {
  BPL = 'BPL',
  APL = 'APL',
  AAY = 'AAY'
}

export enum ApplicationStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  aadharNumber: string;
}

export interface RationCard {
  id: string;
  cardNumber: string;
  userId: string;
  applicantName: string;
  fatherHusbandName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  mobileNumber: string;
  email: string;
  aadharNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  cardType: CardType;
  familyMembers: FamilyMember[];
  annualIncome: number;
  status: ApplicationStatus;
  appliedDate: string;
  approvedDate?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}
