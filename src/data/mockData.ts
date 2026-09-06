import { Challenge, Infrastructure, Project, TimelineEvent } from '../types';

export const mockChallenges: Challenge[] = [
  {
    id: 'CH-2026-00421',
    title: 'Rural Drinking Water Quality Problem',
    description: 'High levels of iron and fluoride reported in the primary drinking water source, affecting health of local residents.',
    date: '2026-01-12',
    domain: 'Water',
    location: 'Example Village',
    district: 'Gumla',
    verificationStatus: 'Verified',
    status: 'In Progress',
    projectStage: 'Field Pilot',
    responsibleDepartment: 'Department of Drinking Water and Sanitation',
    affectedPopulation: 4500,
    priority: 'High'
  },
  {
    id: 'CH-2026-00422',
    title: 'Broken Irrigation Canal',
    description: 'Main irrigation canal breached, flooding nearby fields and depriving downstream farms of water.',
    date: '2026-02-05',
    domain: 'Agriculture',
    location: 'Bero Block',
    district: 'Ranchi',
    verificationStatus: 'Verified',
    status: 'Assigned',
    responsibleDepartment: 'Water Resources Department',
    affectedPopulation: 1200,
    priority: 'High'
  },
  {
    id: 'CH-2026-00425',
    title: 'Primary School Roof Leak',
    description: 'Roof leaks heavily during monsoon, making two classrooms unusable.',
    date: '2026-03-10',
    domain: 'Education',
    location: 'Govt Primary School',
    district: 'Dhanbad',
    verificationStatus: 'Reported',
    status: 'Under Verification',
    responsibleDepartment: 'Department of School Education & Literacy',
    affectedPopulation: 150,
    priority: 'Medium'
  }
];

export const mockProjects: Project[] = [
  {
    id: 'PRJ-2026-104',
    title: 'Smart Rural Water Monitoring System',
    description: 'IoT based water quality monitoring and automated filtration system for rural deployment.',
    date: '2026-02-05',
    challengeId: 'CH-2026-00421',
    university: 'Demo University (Ranchi)',
    industry: 'Demo Industry Partners CSR',
    department: 'Department of Drinking Water and Sanitation',
    trl: 7,
    stage: 'Field Pilot',
    funding: [
      { source: 'Government', amount: 500000 },
      { source: 'CSR', amount: 1000000 },
      { source: 'University', amount: 300000 },
      { source: 'Other', amount: 200000 }
    ],
    expectedBeneficiaries: 20000,
    actualBeneficiaries: 4500
  }
];

export const ch421Timeline: TimelineEvent[] = [
  { date: 'Jan 12, 2026', organization: 'Citizen Report', status: 'Submitted', evidence: 'Public Geotagged Photo', nextMilestone: 'AI Triage' },
  { date: 'Jan 13, 2026', organization: 'AI System', status: 'Triaged', evidence: 'Categorized: Water Quality', nextMilestone: 'Govt Verification' },
  { date: 'Jan 16, 2026', organization: 'Govt Inspector', status: 'Verified', evidence: 'Official Water Test Report', nextMilestone: 'University Matching' },
  { date: 'Jan 20, 2026', organization: 'Demo University', status: 'Matched', evidence: 'Project Proposal Accepted', nextMilestone: 'Project Start' },
  { date: 'Feb 05, 2026', organization: 'Innovation Cell', status: 'Started', evidence: 'Funding Released', nextMilestone: 'Prototype' },
  { date: 'Mar 21, 2026', organization: 'Demo University', status: 'Prototyped', evidence: 'Lab Test Results', nextMilestone: 'Field Pilot' },
  { date: 'Apr 10, 2026', organization: 'Joint Taskforce', status: 'Field Pilot', evidence: 'Installation Photos', nextMilestone: 'Impact Measurement' }
];

export const mockInfrastructure: Infrastructure[] = [
  {
    id: 'INF-45821',
    title: 'Rural Road Link - Sector 4',
    description: 'Construction of 5km rural road connecting market to highway.',
    date: '2025-11-20',
    assetId: 'RD-JH-45821',
    location: 'Sector 4',
    district: 'Gumla',
    department: 'Rural Works Department',
    project: 'Rural Road Improvement Phase 2',
    completionDate: '2025-11-20',
    contractor: 'Demo Contractor Ltd',
    contractValue: 24000000,
    warrantyStatus: 'Active',
    defectLiabilityPeriod: '3 Years',
    repairObligation: '30 Days',
    currentStatus: 'Verified Contractual Non-Compliance',
    communityConfirmation: 18
  }
];

export const stateStats = {
  reported: 18421,
  verified: 12804,
  projects: 1284,
  pilots: 421,
  deployed: 186,
  impacted: 2400000
};
