export type Status = 
  | 'Submitted' 
  | 'Under Verification' 
  | 'Verified' 
  | 'Assigned' 
  | 'In Progress' 
  | 'Completed' 
  | 'Community Review' 
  | 'Impact Measured';

export type VerificationStatus = 'Reported' | 'AI Generated' | 'Verified' | 'Official' | 'Estimated' | 'Community Reported';

export interface BaseEntity {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface Challenge extends BaseEntity {
  domain: string;
  location: string;
  district: string;
  verificationStatus: VerificationStatus;
  status: Status;
  responsibleDepartment: string;
  affectedPopulation: number;
  priority: 'High' | 'Medium' | 'Low';
  projectStage?: string;
}

export interface TimelineEvent {
  date: string;
  organization: string;
  status: string;
  evidence: string;
  nextMilestone: string;
}

export interface Project extends BaseEntity {
  challengeId: string;
  university?: string;
  industry?: string;
  department: string;
  trl: number;
  stage: string;
  funding: {
    source: string;
    amount: number;
  }[];
  expectedBeneficiaries: number;
  actualBeneficiaries?: number;
}

export interface Infrastructure extends BaseEntity {
  assetId: string;
  location: string;
  district: string;
  department: string;
  project: string;
  completionDate: string;
  contractor: string;
  contractValue: number;
  warrantyStatus: 'Active' | 'Expired';
  defectLiabilityPeriod: string;
  repairObligation: string;
  currentStatus: 'Completed' | 'Verified Defect' | 'Repair Requested' | 'Verified Contractual Non-Compliance';
  communityConfirmation?: number; // percentage
}
