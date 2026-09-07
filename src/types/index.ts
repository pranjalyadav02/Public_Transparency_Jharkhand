export type DataStatus = 
  | 'Official' 
  | 'Verified' 
  | 'Reported' 
  | 'Estimated' 
  | 'AI Generated' 
  | 'Community Reported';

export type ChallengeStatus = 
  | 'Reported' 
  | 'AI Triaged' 
  | 'Verified' 
  | 'Assigned' 
  | 'University Matched' 
  | 'Research & Prototype' 
  | 'Field Pilot' 
  | 'Deployed' 
  | 'Resolved' 
  | 'Under Review';

export type DomainType = 
  | 'Water' 
  | 'Healthcare' 
  | 'Agriculture' 
  | 'Education' 
  | 'Sanitation' 
  | 'Environment' 
  | 'Infrastructure' 
  | 'Accessibility' 
  | 'Rural Livelihoods' 
  | 'Public Services';

export interface TimelineEvent {
  stageNumber: number;
  stageName: string;
  date: string;
  organization: string;
  status: 'Completed' | 'In Progress' | 'Upcoming' | 'Delayed';
  evidence?: string;
  slaStatus: 'Within SLA' | 'Near Breach' | 'Breached' | 'Pending';
  delayDays?: number;
  notes?: string;
}

export interface PublicChallenge {
  id: string; // e.g. CH-2026-00421
  title: string;
  domain: DomainType;
  district: string;
  block: string;
  panchayat: string;
  village: string;
  dateReported: string;
  verificationDate: string;
  status: ChallengeStatus;
  dataStatus: DataStatus;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  affectedPopulation: number;
  responsibleDepartment: string;
  responsibleOffice: string;
  assignedProject?: string;
  associatedAssetId?: string;
  aiTriageConfidence: number; // e.g. 94%
  aiCategory: string;
  verifiedCitizenSupporters: number;
  publicEvidence: {
    photoUrl?: string;
    caption: string;
    timestamp: string;
    verifiedGps: string;
  }[];
  timeline: TimelineEvent[];
  communityRealityCheck?: {
    officialStatus: string;
    officialCompletionDate: string;
    officialInspectionNote: string;
    verifiedResponsesCount: number;
    satisfiedCount: number;
    continuingIssuesCount: number;
    confirmationPercentage: number;
    lastSurveyDate: string;
  };
}

export interface PublicInfrastructureAsset {
  assetId: string; // e.g. RD-JH-45821
  name: string;
  category: 'Road' | 'Bridge' | 'School' | 'Hospital' | 'Water Tank' | 'Pipeline' | 'Drain' | 'Irrigation' | 'Streetlight' | 'Public Building';
  district: string;
  block: string;
  panchayat: string;
  locationDetails: string;
  department: string;
  projectName: string;
  completionDate: string;
  contractValue: string; // e.g. "₹2.4 Cr"
  contractorName: string;
  contractorId: string;
  contractAwardDate: string;
  warrantyPeriod: string;
  defectLiabilityStatus: 'Active' | 'Expired' | 'Under Audit';
  defectLiabilityExpiry: string;
  repairObligationWindowDays: number;
  currentCondition: 'Good' | 'Defect Reported' | 'Under Inspection' | 'Repair Ordered' | 'Non-Compliance Verified' | 'Repaired';
  associatedComplaintsCount: number;
  lastInspectionDate: string;
  nonComplianceCaseId?: string;
}

export interface ContractualNonComplianceCase {
  caseId: string; // e.g. CNC-2026-0014
  assetId: string;
  contractorName: string;
  department: string;
  district: string;
  defectDescription: string;
  complaintDate: string;
  defectVerifiedDate: string;
  repairNoticeDate: string;
  repairDeadline: string;
  officialInspectionDate: string;
  officialFinding: string;
  status: 'Verified Contractual Non-Compliance' | 'Official Debarment Initiated' | 'Penalty Imposed' | 'Compliance Under Review';
  penaltyAmount?: string;
  hearingStatus: string;
  authorizedOfficial: string;
}

export interface ContractorPerformance {
  contractorId: string;
  name: string;
  registeredDistrict: string;
  activeProjectsCount: number;
  completedProjectsCount: number;
  verifiedDefectsCount: number;
  averageRepairResponseDays: number;
  contractualSlaCompliance: number; // percentage
  officialPenaltiesCount: number;
  debarmentStatus: 'Clear' | 'Notice Issued' | 'Debarred (2 Years)';
  totalContractValue: string;
  complianceRating: 'High Compliance' | 'Standard' | 'Watchlist' | 'Non-Compliant';
}

export interface PublicProject {
  id: string; // e.g. PR-2026-0019
  title: string;
  challengeId: string;
  domain: DomainType;
  district: string;
  leadUniversity: string;
  facultyLead: string;
  studentsInvolved: number;
  industryPartner?: string;
  csrPartner?: string;
  governmentDepartment: string;
  trl: number; // 1 to 9
  currentStage: 'Research' | 'Prototype' | 'Testing' | 'Field Pilot' | 'Deployment' | 'Scale';
  fundingBreakdown: {
    government: number; // in Lakhs INR
    csr: number;
    university: number;
    other: number;
    total: number;
    released: number;
    utilized: number;
  };
  impactFunnel: {
    expectedBeneficiaries: number;
    reportedBeneficiaries: number;
    measuredBeneficiaries: number;
    verifiedBeneficiaries: number;
  };
  keyMilestones: {
    title: string;
    targetDate: string;
    completedDate?: string;
    status: 'Achieved' | 'Pending' | 'Delayed';
  }[];
  deploymentsCount: number;
  solutionRepoId?: string;
}

export interface PublicSolution {
  solutionId: string; // e.g. SOL-2026-0037
  name: string;
  domain: DomainType;
  challengeCategory: string;
  developedBy: string;
  industrySupport: string;
  governmentDept: string;
  trl: number;
  villagesDeployed: number;
  peopleImpacted: number;
  measuredImpactMetric: string;
  unitCost: string;
  deploymentRequirements: string[];
  licensingType: 'Open Civic Tech / Free Gov License' | 'Public-Private Partnership' | 'State Proprietary';
  replicationRequestsCount: number;
  briefOverview: string;
}

export interface DistrictMetric {
  name: string;
  code: string;
  headquarters: string;
  population: string;
  problemsReported: number;
  problemsVerified: number;
  activeProjects: number;
  resolvedProblems: number;
  solutionsDeployed: number;
  avgFirstResponseHours: number;
  avgVerificationDays: number;
  avgResolutionDays: number;
  slaCompliance: number; // e.g. 89%
  peopleImpacted: number;
  fundingAllocatedLakhs: number;
  communityConfirmationAvg: number; // e.g. 84%
  infrastructureDefectsCount: number;
  blocks: {
    name: string;
    reported: number;
    verified: number;
    active: number;
    resolved: number;
    pilots: number;
  }[];
}

export interface IntegrityStatistics {
  totalReportsReceived: number;
  underVerification: number;
  underInvestigation: number;
  closed: number;
  substantiated: number;
  byCategory: {
    category: 'Bribe Demand' | 'Service Denial' | 'Unofficial Payment' | 'Service Delay' | 'Middlemen' | 'Misconduct';
    count: number;
    substantiated: number;
  }[];
  activeCases: {
    caseToken: string; // e.g. INT-JH-2026-904 (No PII)
    category: string;
    department: string;
    district: string;
    dateReceived: string;
    status: 'Reported' | 'Under Verification' | 'Under Investigation' | 'Official Finding' | 'Closed with Action';
    findingsSummary: string;
    actionTaken?: string;
  }[];
}

export interface AIInsight {
  id: string;
  title: string;
  summary: string;
  domain: DomainType;
  district: string;
  sourceDataset: string;
  confidenceScore: number;
  timeframe: string;
  generatedDate: string;
  methodologyNote: string;
}

export interface PublicUpdate {
  id: string;
  title: string;
  category: 'New Project' | 'Pilot Launch' | 'Solution Deployed' | 'Official Finding' | 'Infrastructure Update' | 'Milestone';
  date: string;
  organization: string;
  relatedEntityId: string;
  summary: string;
}

export interface DataLineageDetails {
  metricName: string;
  currentValue: string;
  status: DataStatus;
  sourceSystem: string;
  reportingPeriod: string;
  eligibleCasesCount: number;
  qualifyingCasesCount: number;
  calculationFormula: string;
  exclusionRules: string[];
  lastAuditTimestamp: string;
  auditingAuthority: string;
}
