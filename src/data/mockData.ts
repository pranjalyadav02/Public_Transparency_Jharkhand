import {
  PublicChallenge,
  PublicInfrastructureAsset,
  ContractualNonComplianceCase,
  ContractorPerformance,
  PublicProject,
  PublicSolution,
  DistrictMetric,
  IntegrityStatistics,
  AIInsight,
  PublicUpdate,
  DataLineageDetails,
  DomainType
} from '../types';

export const STATE_WIDE_STATS = [
  {
    key: 'problems_reported',
    label: 'Problems Reported',
    labelHi: 'दर्ज समस्याएं',
    value: '18,421',
    numericValue: 18421,
    status: 'Reported' as const,
    change: '+142 this week',
    lineageKey: 'problems_reported'
  },
  {
    key: 'problems_verified',
    label: 'Problems Verified',
    labelHi: 'सत्यापित समस्याएं',
    value: '12,804',
    numericValue: 12804,
    status: 'Verified' as const,
    change: '69.5% verification rate',
    lineageKey: 'problems_verified'
  },
  {
    key: 'under_action',
    label: 'Under Active Action',
    labelHi: 'सक्रिय कार्रवाई में',
    value: '4,390',
    numericValue: 4390,
    status: 'Official' as const,
    change: 'Assigned to depts/institutes',
    lineageKey: 'under_action'
  },
  {
    key: 'problems_resolved',
    label: 'Problems Resolved',
    labelHi: 'समाधान प्राप्त समस्याएं',
    value: '8,414',
    numericValue: 8414,
    status: 'Verified' as const,
    change: 'With community validation',
    lineageKey: 'problems_resolved'
  },
  {
    key: 'active_projects',
    label: 'Active Innovation Projects',
    labelHi: 'सक्रिय नवाचार परियोजनाएं',
    value: '1,284',
    numericValue: 1284,
    status: 'Official' as const,
    change: 'Across universities & labs',
    lineageKey: 'active_projects'
  },
  {
    key: 'field_pilots',
    label: 'Field Pilots Live',
    labelHi: 'सक्रिय फील्ड पायलट',
    value: '421',
    numericValue: 421,
    status: 'Verified' as const,
    change: 'In 318 Gram Panchayats',
    lineageKey: 'field_pilots'
  },
  {
    key: 'solutions_deployed',
    label: 'Solutions Deployed',
    labelHi: 'समाधान तैनात',
    value: '186',
    numericValue: 186,
    status: 'Verified' as const,
    change: 'TRL 8-9 institutional grade',
    lineageKey: 'solutions_deployed'
  },
  {
    key: 'people_impacted',
    label: 'People Impacted',
    labelHi: 'लाभान्वित नागरिक',
    value: '2.42 Million',
    numericValue: 2420000,
    status: 'Estimated' as const,
    change: 'Independently audited 2.28M',
    lineageKey: 'people_impacted'
  },
  {
    key: 'districts_covered',
    label: 'Districts Covered',
    labelHi: 'आच्छादित जिले',
    value: '24 / 24',
    numericValue: 24,
    status: 'Official' as const,
    change: '100% statewide reach',
    lineageKey: 'districts_covered'
  },
  {
    key: 'csr_projects',
    label: 'CSR / Industry Supported',
    labelHi: 'सीएसआर व उद्योग समर्थित',
    value: '312',
    numericValue: 312,
    status: 'Verified' as const,
    change: '₹28.4 Cr committed',
    lineageKey: 'csr_projects'
  },
  {
    key: 'public_funding',
    label: 'Total Public Funding Tracked',
    labelHi: 'कुल ट्रैक की गई सार्वजनिक राशि',
    value: '₹48.6 Cr',
    numericValue: 486000000,
    status: 'Official' as const,
    change: '₹41.2 Cr released',
    lineageKey: 'public_funding'
  }
];

export const LINEAGE_DATA: Record<string, DataLineageDetails> = {
  problems_reported: {
    metricName: 'Problems Reported (18,421)',
    currentValue: '18,421 cases',
    status: 'Reported',
    sourceSystem: 'Citizen Reports + Block CSC Centers',
    reportingPeriod: 'April 2025 – August 2026',
    eligibleCasesCount: 18421,
    qualifyingCasesCount: 18421,
    calculationFormula: 'Total unique challenge submissions meeting threshold integrity checks (anti-spam, GPS within Jharkhand boundary).',
    exclusionRules: [
      'Duplicate submissions within 48h for same GPS coordinate are clustered into single challenge.',
      'Automated bot filings filtered by reCAPTCHA v3 & OTP phone verification.'
    ],
    lastAuditTimestamp: '2026-09-06 06:00 IST',
    auditingAuthority: 'JanaSamadhan Data Integrity Cell, Dept. of Information Technology, Govt. of Jharkhand'
  },
  problems_verified: {
    metricName: 'Problems Verified (12,804)',
    currentValue: '12,804 cases',
    status: 'Verified',
    sourceSystem: 'Government Command Portal ',
    reportingPeriod: 'April 2025 – August 2026',
    eligibleCasesCount: 18421,
    qualifyingCasesCount: 12804,
    calculationFormula: '(Verified Cases / Total Triaged Cases) = 12,804 / 16,980 processed = 75.4%',
    exclusionRules: [
      'Cases marked "Outside Jurisdiction" or "Private Land Dispute" transferred to relevant revenue courts.',
      'Unsubstantiated reports awaiting field inspection photo.'
    ],
    lastAuditTimestamp: '2026-09-05 18:30 IST',
    auditingAuthority: 'District Grievance Redressal Officers (DGRO) Board'
  },
  sla_compliance: {
    metricName: 'Overall SLA Compliance Rate (87.2%)',
    currentValue: '87.2%',
    status: 'Official',
    sourceSystem: 'Jharkhand State e-Governance SLA Watchdog Service',
    reportingPeriod: 'January 2026 – June 2026',
    eligibleCasesCount: 4281,
    qualifyingCasesCount: 3729,
    calculationFormula: '(Cases resolved or escalated strictly within defined citizen charter hours / Total eligible closed or benchmarked cases) × 100',
    exclusionRules: [
      'Cases in judicial litigation or statutory injunction have clock paused with signed gazette order.',
      'Force majeure natural disaster periods officially declared by SDMA.'
    ],
    lastAuditTimestamp: '2026-09-01 00:00 IST',
    auditingAuthority: 'Office of the Chief Secretary, Transparency & Accountability Cell'
  },
  people_impacted: {
    metricName: 'People Impacted (2.42 Million)',
    currentValue: '2,420,000 citizens',
    status: 'Estimated',
    sourceSystem: 'Census 2021 Village Master Database + Panchayat Field Survey Validations',
    reportingPeriod: 'Cumulatively since inception',
    eligibleCasesCount: 186,
    qualifyingCasesCount: 186,
    calculationFormula: 'Sum of Census-registered residential population within 1.5km catchment of deployed water, road, healthcare, or agricultural interventions.',
    exclusionRules: [
      'Double-counting of individuals benefiting from multiple adjacent schemes in same village is capped at village total census count.',
      'Company self-reported figures reduced by independent third-party sample audits (Verified count: 2,284,000).'
    ],
    lastAuditTimestamp: '2026-08-30 14:15 IST',
    auditingAuthority: 'XISS Ranchi Social Audit & Impact Evaluation Unit'
  },
  solutions_deployed: {
    metricName: 'Solutions Deployed (186)',
    currentValue: '186 solutions',
    status: 'Verified',
    sourceSystem: 'University & Industry Consortium Registries ',
    reportingPeriod: 'April 2025 – August 2026',
    eligibleCasesCount: 421,
    qualifyingCasesCount: 186,
    calculationFormula: 'Count of innovations achieving TRL Level 8 or 9 with permanent handover certificates signed by District Collector/Panchayat.',
    exclusionRules: [
      'Pilot prototypes still under temporary field testing (TRL 6-7) excluded until formal commissioning.',
      'Withdrawn or discontinued projects not counted.'
    ],
    lastAuditTimestamp: '2026-09-04 11:00 IST',
    auditingAuthority: 'Jharkhand State Innovation Council (JSIC)'
  }
};

export const JHARKHAND_DISTRICTS: DistrictMetric[] = [
  {
    name: 'Gumla',
    code: 'GUM',
    headquarters: 'Gumla',
    population: '1,025,213',
    problemsReported: 942,
    problemsVerified: 718,
    activeProjects: 64,
    resolvedProblems: 486,
    solutionsDeployed: 19,
    avgFirstResponseHours: 7.2,
    avgVerificationDays: 1.8,
    avgResolutionDays: 10.4,
    slaCompliance: 89,
    peopleImpacted: 142000,
    fundingAllocatedLakhs: 340,
    communityConfirmationAvg: 84,
    infrastructureDefectsCount: 14,
    blocks: [
      { name: 'Sisai', reported: 84, verified: 61, active: 17, resolved: 11, pilots: 4 },
      { name: 'Gumla Sadar', reported: 142, verified: 115, active: 22, resolved: 81, pilots: 5 },
      { name: 'Ghaghra', reported: 96, verified: 74, active: 11, resolved: 53, pilots: 2 },
      { name: 'Raidih', reported: 78, verified: 59, active: 8, resolved: 42, pilots: 2 },
      { name: 'Chainpur', reported: 88, verified: 64, active: 10, resolved: 44, pilots: 2 },
      { name: 'Bishunpur', reported: 112, verified: 89, active: 12, resolved: 68, pilots: 3 },
      { name: 'Kamdara', reported: 64, verified: 48, active: 6, resolved: 36, pilots: 1 },
      { name: 'Basia', reported: 82, verified: 63, active: 7, resolved: 49, pilots: 2 }
    ]
  },
  {
    name: 'Ranchi',
    code: 'RAN',
    headquarters: 'Ranchi',
    population: '2,914,253',
    problemsReported: 2480,
    problemsVerified: 1940,
    activeProjects: 182,
    resolvedProblems: 1420,
    solutionsDeployed: 38,
    avgFirstResponseHours: 5.4,
    avgVerificationDays: 1.4,
    avgResolutionDays: 8.6,
    slaCompliance: 94,
    peopleImpacted: 412000,
    fundingAllocatedLakhs: 880,
    communityConfirmationAvg: 87,
    infrastructureDefectsCount: 22,
    blocks: [
      { name: 'Kanke', reported: 290, verified: 240, active: 28, resolved: 182, pilots: 6 },
      { name: 'Namkum', reported: 245, verified: 198, active: 22, resolved: 148, pilots: 5 },
      { name: 'Ratu', reported: 210, verified: 165, active: 18, resolved: 122, pilots: 4 },
      { name: 'Ormanjhi', reported: 180, verified: 142, active: 15, resolved: 104, pilots: 3 },
      { name: 'Bundu', reported: 164, verified: 128, active: 12, resolved: 94, pilots: 2 },
      { name: 'Angara', reported: 148, verified: 114, active: 10, resolved: 86, pilots: 2 }
    ]
  },
  {
    name: 'Dhanbad',
    code: 'DHN',
    headquarters: 'Dhanbad',
    population: '2,684,487',
    problemsReported: 1860,
    problemsVerified: 1390,
    activeProjects: 114,
    resolvedProblems: 994,
    solutionsDeployed: 24,
    avgFirstResponseHours: 6.8,
    avgVerificationDays: 1.9,
    avgResolutionDays: 11.2,
    slaCompliance: 91,
    peopleImpacted: 320000,
    fundingAllocatedLakhs: 640,
    communityConfirmationAvg: 83,
    infrastructureDefectsCount: 28,
    blocks: [
      { name: 'Jharia', reported: 340, verified: 260, active: 24, resolved: 184, pilots: 4 },
      { name: 'Baghmara', reported: 280, verified: 210, active: 18, resolved: 152, pilots: 3 },
      { name: 'Govindpur', reported: 215, verified: 164, active: 14, resolved: 120, pilots: 3 },
      { name: 'Nirsa', reported: 230, verified: 175, active: 16, resolved: 124, pilots: 3 },
      { name: 'Topchanchi', reported: 165, verified: 122, active: 10, resolved: 92, pilots: 2 }
    ]
  },
  {
    name: 'East Singhbhum',
    code: 'ESB',
    headquarters: 'Jamshedpur',
    population: '2,293,919',
    problemsReported: 1640,
    problemsVerified: 1260,
    activeProjects: 98,
    resolvedProblems: 910,
    solutionsDeployed: 22,
    avgFirstResponseHours: 6.1,
    avgVerificationDays: 1.6,
    avgResolutionDays: 9.8,
    slaCompliance: 92,
    peopleImpacted: 290000,
    fundingAllocatedLakhs: 580,
    communityConfirmationAvg: 86,
    infrastructureDefectsCount: 19,
    blocks: [
      { name: 'Golmuri cum Jugsalai', reported: 310, verified: 245, active: 22, resolved: 185, pilots: 4 },
      { name: 'Ghatshila', reported: 240, verified: 185, active: 16, resolved: 132, pilots: 3 },
      { name: 'Potka', reported: 195, verified: 148, active: 12, resolved: 108, pilots: 2 },
      { name: 'Baharagora', reported: 170, verified: 132, active: 10, resolved: 98, pilots: 2 }
    ]
  },
  {
    name: 'Hazaribagh',
    code: 'HAZ',
    headquarters: 'Hazaribagh',
    population: '1,734,495',
    problemsReported: 1180,
    problemsVerified: 860,
    activeProjects: 72,
    resolvedProblems: 610,
    solutionsDeployed: 15,
    avgFirstResponseHours: 7.6,
    avgVerificationDays: 2.1,
    avgResolutionDays: 11.8,
    slaCompliance: 86,
    peopleImpacted: 185000,
    fundingAllocatedLakhs: 410,
    communityConfirmationAvg: 81,
    infrastructureDefectsCount: 16,
    blocks: [
      { name: 'Sadar Hazaribagh', reported: 260, verified: 195, active: 18, resolved: 142, pilots: 3 },
      { name: 'Barkagaon', reported: 190, verified: 140, active: 12, resolved: 98, pilots: 2 },
      { name: 'Katkamsandi', reported: 145, verified: 105, active: 9, resolved: 74, pilots: 2 },
      { name: 'Chouparan', reported: 160, verified: 118, active: 10, resolved: 82, pilots: 2 }
    ]
  },
  {
    name: 'Dumka',
    code: 'DUM',
    headquarters: 'Dumka',
    population: '1,321,442',
    problemsReported: 980,
    problemsVerified: 690,
    activeProjects: 58,
    resolvedProblems: 460,
    solutionsDeployed: 12,
    avgFirstResponseHours: 8.9,
    avgVerificationDays: 2.4,
    avgResolutionDays: 13.2,
    slaCompliance: 82,
    peopleImpacted: 155000,
    fundingAllocatedLakhs: 360,
    communityConfirmationAvg: 79,
    infrastructureDefectsCount: 18,
    blocks: [
      { name: 'Dumka Sadar', reported: 210, verified: 155, active: 14, resolved: 105, pilots: 3 },
      { name: 'Jama', reported: 155, verified: 110, active: 9, resolved: 72, pilots: 2 },
      { name: 'Jarmundi', reported: 175, verified: 122, active: 11, resolved: 82, pilots: 2 },
      { name: 'Shikaripara', reported: 160, verified: 112, active: 10, resolved: 76, pilots: 2 }
    ]
  },
  {
    name: 'Bokaro',
    code: 'BOK',
    headquarters: 'Bokaro Steel City',
    population: '2,062,330',
    problemsReported: 1390,
    problemsVerified: 1040,
    activeProjects: 84,
    resolvedProblems: 760,
    solutionsDeployed: 17,
    avgFirstResponseHours: 6.9,
    avgVerificationDays: 1.8,
    avgResolutionDays: 10.6,
    slaCompliance: 90,
    peopleImpacted: 245000,
    fundingAllocatedLakhs: 490,
    communityConfirmationAvg: 85,
    infrastructureDefectsCount: 20,
    blocks: [
      { name: 'Chas', reported: 320, verified: 245, active: 20, resolved: 180, pilots: 4 },
      { name: 'Bermo', reported: 240, verified: 180, active: 15, resolved: 130, pilots: 3 },
      { name: 'Gomia', reported: 195, verified: 145, active: 12, resolved: 105, pilots: 2 }
    ]
  },
  {
    name: 'Palamu',
    code: 'PAL',
    headquarters: 'Medininagar (Daltonganj)',
    population: '1,939,869',
    problemsReported: 1220,
    problemsVerified: 850,
    activeProjects: 66,
    resolvedProblems: 540,
    solutionsDeployed: 13,
    avgFirstResponseHours: 8.8,
    avgVerificationDays: 2.3,
    avgResolutionDays: 12.8,
    slaCompliance: 81,
    peopleImpacted: 170000,
    fundingAllocatedLakhs: 390,
    communityConfirmationAvg: 78,
    infrastructureDefectsCount: 21,
    blocks: [
      { name: 'Medininagar', reported: 250, verified: 180, active: 15, resolved: 120, pilots: 3 },
      { name: 'Chhatarpur', reported: 180, verified: 125, active: 10, resolved: 80, pilots: 2 },
      { name: 'Hussainabad', reported: 165, verified: 115, active: 9, resolved: 72, pilots: 2 }
    ]
  },
  {
    name: 'West Singhbhum',
    code: 'WSB',
    headquarters: 'Chaibasa',
    population: '1,502,338',
    problemsReported: 890,
    problemsVerified: 620,
    activeProjects: 52,
    resolvedProblems: 390,
    solutionsDeployed: 11,
    avgFirstResponseHours: 9.1,
    avgVerificationDays: 2.5,
    avgResolutionDays: 13.6,
    slaCompliance: 80,
    peopleImpacted: 135000,
    fundingAllocatedLakhs: 320,
    communityConfirmationAvg: 80,
    infrastructureDefectsCount: 17,
    blocks: [
      { name: 'Chaibasa', reported: 190, verified: 135, active: 12, resolved: 90, pilots: 2 },
      { name: 'Jhinkpani', reported: 140, verified: 98, active: 8, resolved: 62, pilots: 2 },
      { name: 'Manoharpur', reported: 155, verified: 108, active: 9, resolved: 68, pilots: 2 }
    ]
  },
  {
    name: 'Deoghar',
    code: 'DEO',
    headquarters: 'Deoghar',
    population: '1,492,073',
    problemsReported: 960,
    problemsVerified: 710,
    activeProjects: 56,
    resolvedProblems: 490,
    solutionsDeployed: 12,
    avgFirstResponseHours: 7.8,
    avgVerificationDays: 2.0,
    avgResolutionDays: 11.2,
    slaCompliance: 86,
    peopleImpacted: 160000,
    fundingAllocatedLakhs: 350,
    communityConfirmationAvg: 83,
    infrastructureDefectsCount: 15,
    blocks: [
      { name: 'Deoghar Sadar', reported: 240, verified: 180, active: 14, resolved: 125, pilots: 3 },
      { name: 'Madhupur', reported: 190, verified: 140, active: 11, resolved: 98, pilots: 2 }
    ]
  },
  {
    name: 'Giridih',
    code: 'GIR',
    headquarters: 'Giridih',
    population: '2,445,474',
    problemsReported: 1320,
    problemsVerified: 930,
    activeProjects: 74,
    resolvedProblems: 610,
    solutionsDeployed: 14,
    avgFirstResponseHours: 8.2,
    avgVerificationDays: 2.2,
    avgResolutionDays: 12.1,
    slaCompliance: 84,
    peopleImpacted: 210000,
    fundingAllocatedLakhs: 430,
    communityConfirmationAvg: 81,
    infrastructureDefectsCount: 22,
    blocks: [
      { name: 'Giridih Sadar', reported: 270, verified: 195, active: 16, resolved: 130, pilots: 3 },
      { name: 'Dumri', reported: 210, verified: 150, active: 12, resolved: 100, pilots: 2 }
    ]
  },
  {
    name: 'Ramgarh',
    code: 'RAM',
    headquarters: 'Ramgarh',
    population: '949,443',
    problemsReported: 760,
    problemsVerified: 580,
    activeProjects: 48,
    resolvedProblems: 410,
    solutionsDeployed: 11,
    avgFirstResponseHours: 6.4,
    avgVerificationDays: 1.7,
    avgResolutionDays: 9.9,
    slaCompliance: 91,
    peopleImpacted: 120000,
    fundingAllocatedLakhs: 280,
    communityConfirmationAvg: 85,
    infrastructureDefectsCount: 12,
    blocks: [
      { name: 'Ramgarh Sadar', reported: 190, verified: 145, active: 12, resolved: 105, pilots: 3 },
      { name: 'Patratu', reported: 175, verified: 135, active: 11, resolved: 98, pilots: 2 }
    ]
  },
  {
    name: 'Saraikela Kharsawan',
    code: 'SKH',
    headquarters: 'Saraikela',
    population: '1,065,056',
    problemsReported: 810,
    problemsVerified: 610,
    activeProjects: 51,
    resolvedProblems: 420,
    solutionsDeployed: 10,
    avgFirstResponseHours: 7.3,
    avgVerificationDays: 1.9,
    avgResolutionDays: 10.7,
    slaCompliance: 88,
    peopleImpacted: 130000,
    fundingAllocatedLakhs: 290,
    communityConfirmationAvg: 84,
    infrastructureDefectsCount: 13,
    blocks: [
      { name: 'Gamharia', reported: 210, verified: 160, active: 13, resolved: 110, pilots: 3 },
      { name: 'Adityapur', reported: 180, verified: 140, active: 11, resolved: 95, pilots: 2 }
    ]
  },
  {
    name: 'Khunti',
    code: 'KHU',
    headquarters: 'Khunti',
    population: '531,885',
    problemsReported: 520,
    problemsVerified: 390,
    activeProjects: 38,
    resolvedProblems: 280,
    solutionsDeployed: 9,
    avgFirstResponseHours: 7.5,
    avgVerificationDays: 1.8,
    avgResolutionDays: 10.5,
    slaCompliance: 89,
    peopleImpacted: 95000,
    fundingAllocatedLakhs: 210,
    communityConfirmationAvg: 86,
    infrastructureDefectsCount: 9,
    blocks: [
      { name: 'Khunti Sadar', reported: 150, verified: 115, active: 11, resolved: 82, pilots: 3 },
      { name: 'Torpa', reported: 120, verified: 90, active: 9, resolved: 65, pilots: 2 }
    ]
  },
  {
    name: 'Simdega',
    code: 'SIM',
    headquarters: 'Simdega',
    population: '599,578',
    problemsReported: 490,
    problemsVerified: 360,
    activeProjects: 34,
    resolvedProblems: 250,
    solutionsDeployed: 7,
    avgFirstResponseHours: 8.7,
    avgVerificationDays: 2.2,
    avgResolutionDays: 12.4,
    slaCompliance: 83,
    peopleImpacted: 88000,
    fundingAllocatedLakhs: 195,
    communityConfirmationAvg: 82,
    infrastructureDefectsCount: 11,
    blocks: [
      { name: 'Simdega Sadar', reported: 140, verified: 105, active: 10, resolved: 75, pilots: 2 },
      { name: 'Kolebira', reported: 110, verified: 80, active: 8, resolved: 55, pilots: 2 }
    ]
  },
  {
    name: 'Lohardaga',
    code: 'LOH',
    headquarters: 'Lohardaga',
    population: '461,790',
    problemsReported: 430,
    problemsVerified: 320,
    activeProjects: 31,
    resolvedProblems: 225,
    solutionsDeployed: 6,
    avgFirstResponseHours: 7.9,
    avgVerificationDays: 2.0,
    avgResolutionDays: 11.1,
    slaCompliance: 87,
    peopleImpacted: 76000,
    fundingAllocatedLakhs: 180,
    communityConfirmationAvg: 84,
    infrastructureDefectsCount: 8,
    blocks: [
      { name: 'Lohardaga Sadar', reported: 130, verified: 98, active: 9, resolved: 70, pilots: 2 },
      { name: 'Kuru', reported: 105, verified: 78, active: 7, resolved: 54, pilots: 2 }
    ]
  },
  {
    name: 'Latehar',
    code: 'LAT',
    headquarters: 'Latehar',
    population: '726,978',
    problemsReported: 610,
    problemsVerified: 430,
    activeProjects: 40,
    resolvedProblems: 290,
    solutionsDeployed: 8,
    avgFirstResponseHours: 9.3,
    avgVerificationDays: 2.6,
    avgResolutionDays: 13.9,
    slaCompliance: 78,
    peopleImpacted: 92000,
    fundingAllocatedLakhs: 230,
    communityConfirmationAvg: 77,
    infrastructureDefectsCount: 14,
    blocks: [
      { name: 'Latehar Sadar', reported: 160, verified: 115, active: 11, resolved: 78, pilots: 2 },
      { name: 'Mahuadanr', reported: 130, verified: 90, active: 8, resolved: 60, pilots: 2 }
    ]
  },
  {
    name: 'Garhwa',
    code: 'GAR',
    headquarters: 'Garhwa',
    population: '1,322,784',
    problemsReported: 880,
    problemsVerified: 610,
    activeProjects: 49,
    resolvedProblems: 410,
    solutionsDeployed: 9,
    avgFirstResponseHours: 9.4,
    avgVerificationDays: 2.5,
    avgResolutionDays: 13.4,
    slaCompliance: 79,
    peopleImpacted: 140000,
    fundingAllocatedLakhs: 310,
    communityConfirmationAvg: 76,
    infrastructureDefectsCount: 19,
    blocks: [
      { name: 'Garhwa Sadar', reported: 210, verified: 150, active: 12, resolved: 100, pilots: 2 },
      { name: 'Nagar Untari', reported: 170, verified: 120, active: 9, resolved: 80, pilots: 2 }
    ]
  },
  {
    name: 'Chatra',
    code: 'CHA',
    headquarters: 'Chatra',
    population: '1,042,886',
    problemsReported: 740,
    problemsVerified: 510,
    activeProjects: 44,
    resolvedProblems: 340,
    solutionsDeployed: 8,
    avgFirstResponseHours: 8.9,
    avgVerificationDays: 2.4,
    avgResolutionDays: 12.9,
    slaCompliance: 81,
    peopleImpacted: 125000,
    fundingAllocatedLakhs: 270,
    communityConfirmationAvg: 79,
    infrastructureDefectsCount: 15,
    blocks: [
      { name: 'Chatra Sadar', reported: 180, verified: 125, active: 11, resolved: 85, pilots: 2 },
      { name: 'Hunterganj', reported: 150, verified: 105, active: 9, resolved: 70, pilots: 2 }
    ]
  },
  {
    name: 'Koderma',
    code: 'KOD',
    headquarters: 'Koderma',
    population: '716,259',
    problemsReported: 630,
    problemsVerified: 480,
    activeProjects: 42,
    resolvedProblems: 340,
    solutionsDeployed: 8,
    avgFirstResponseHours: 7.2,
    avgVerificationDays: 1.8,
    avgResolutionDays: 10.3,
    slaCompliance: 89,
    peopleImpacted: 110000,
    fundingAllocatedLakhs: 240,
    communityConfirmationAvg: 85,
    infrastructureDefectsCount: 10,
    blocks: [
      { name: 'Koderma Sadar', reported: 160, verified: 125, active: 11, resolved: 90, pilots: 2 },
      { name: 'Jhumri Telaiya', reported: 150, verified: 115, active: 10, resolved: 85, pilots: 2 }
    ]
  },
  {
    name: 'Jamtara',
    code: 'JAM',
    headquarters: 'Jamtara',
    population: '791,042',
    problemsReported: 680,
    problemsVerified: 490,
    activeProjects: 39,
    resolvedProblems: 320,
    solutionsDeployed: 7,
    avgFirstResponseHours: 8.1,
    avgVerificationDays: 2.1,
    avgResolutionDays: 11.9,
    slaCompliance: 85,
    peopleImpacted: 105000,
    fundingAllocatedLakhs: 235,
    communityConfirmationAvg: 82,
    infrastructureDefectsCount: 11,
    blocks: [
      { name: 'Jamtara Sadar', reported: 170, verified: 125, active: 10, resolved: 82, pilots: 2 },
      { name: 'Narayanpur', reported: 140, verified: 100, active: 8, resolved: 65, pilots: 2 }
    ]
  },
  {
    name: 'Pakur',
    code: 'PAK',
    headquarters: 'Pakur',
    population: '900,422',
    problemsReported: 710,
    problemsVerified: 480,
    activeProjects: 37,
    resolvedProblems: 310,
    solutionsDeployed: 6,
    avgFirstResponseHours: 9.5,
    avgVerificationDays: 2.7,
    avgResolutionDays: 14.1,
    slaCompliance: 77,
    peopleImpacted: 115000,
    fundingAllocatedLakhs: 260,
    communityConfirmationAvg: 75,
    infrastructureDefectsCount: 16,
    blocks: [
      { name: 'Pakur Sadar', reported: 180, verified: 120, active: 10, resolved: 78, pilots: 2 },
      { name: 'Hiranpur', reported: 140, verified: 95, active: 7, resolved: 62, pilots: 1 }
    ]
  },
  {
    name: 'Sahibganj',
    code: 'SAH',
    headquarters: 'Sahibganj',
    population: '1,150,567',
    problemsReported: 840,
    problemsVerified: 590,
    activeProjects: 46,
    resolvedProblems: 380,
    solutionsDeployed: 9,
    avgFirstResponseHours: 9.2,
    avgVerificationDays: 2.5,
    avgResolutionDays: 13.5,
    slaCompliance: 80,
    peopleImpacted: 138000,
    fundingAllocatedLakhs: 295,
    communityConfirmationAvg: 78,
    infrastructureDefectsCount: 17,
    blocks: [
      { name: 'Sahibganj Sadar', reported: 200, verified: 145, active: 11, resolved: 95, pilots: 2 },
      { name: 'Rajmahal', reported: 175, verified: 125, active: 10, resolved: 80, pilots: 2 }
    ]
  },
  {
    name: 'Godda',
    code: 'GOD',
    headquarters: 'Godda',
    population: '1,313,551',
    problemsReported: 820,
    problemsVerified: 570,
    activeProjects: 45,
    resolvedProblems: 370,
    solutionsDeployed: 8,
    avgFirstResponseHours: 8.8,
    avgVerificationDays: 2.3,
    avgResolutionDays: 12.6,
    slaCompliance: 82,
    peopleImpacted: 130000,
    fundingAllocatedLakhs: 285,
    communityConfirmationAvg: 80,
    infrastructureDefectsCount: 14,
    blocks: [
      { name: 'Godda Sadar', reported: 190, verified: 135, active: 11, resolved: 88, pilots: 2 },
      { name: 'Mahagama', reported: 160, verified: 110, active: 9, resolved: 72, pilots: 2 }
    ]
  }
];

export const PUBLIC_CHALLENGES: PublicChallenge[] = [
  {
    id: 'CH-2026-00421',
    title: 'Rural Drinking Water Quality & Heavy Metal Contamination',
    domain: 'Water',
    district: 'Gumla',
    block: 'Sisai',
    panchayat: 'Nagpheni',
    village: 'Nagpheni Toli',
    dateReported: '2026-01-12',
    verificationDate: '2026-01-16',
    status: 'Field Pilot',
    dataStatus: 'Verified',
    priority: 'Critical',
    description: 'High fluoride (2.8 mg/L) and turbidity in 4 community borewells leading to joint stiffness and dental fluorosis among 320 tribal households. Traditional bleaching failed.',
    affectedPopulation: 1650,
    responsibleDepartment: 'Drinking Water & Sanitation Dept (DWSD)',
    responsibleOffice: 'Executive Engineer Office, DWSD Gumla Division',
    assignedProject: 'PR-2026-0019',
    associatedAssetId: 'WTP-JH-882',
    aiTriageConfidence: 96,
    aiCategory: 'Water Quality / Fluoride Filtration / Health Threat',
    verifiedCitizenSupporters: 1284,
    publicEvidence: [
      {
        caption: 'Public water test kit result displaying fluoride level 2.8 mg/L (Safe limit 1.0 mg/L)',
        timestamp: '2026-01-12 10:24 IST',
        verifiedGps: '23.3321° N, 84.9542° E'
      },
      {
        caption: 'Community meeting with Mukhiya & DWSD Field Junior Engineer documenting borewell sample',
        timestamp: '2026-01-16 14:15 IST',
        verifiedGps: '23.3318° N, 84.9538° E'
      },
      {
        caption: 'Installation of Low-Cost Activated Alumina Adsorption Pilot Unit by BIT Mesra Team',
        timestamp: '2026-04-10 11:30 IST',
        verifiedGps: '23.3325° N, 84.9540° E'
      }
    ],
    timeline: [
      {
        stageNumber: 1,
        stageName: 'Problem Reported',
        date: '2026-01-12',
        organization: 'Citizens via Gram Sabha & Mobile Portal',
        status: 'Completed',
        evidence: 'GPS-tagged photo of high fluoride reagent test vial (Token #99482)',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 2,
        stageName: 'AI Triage & Categorization',
        date: '2026-01-13',
        organization: 'JanaSamadhan AI Core v2.4',
        status: 'Completed',
        evidence: 'Cluster match with 3 adjacent villages; Confidence 96%; Priority Critical',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 3,
        stageName: 'Government Verification',
        date: '2026-01-16',
        organization: 'DWSD Gumla Sub-Divisional Laboratory',
        status: 'Completed',
        evidence: 'Lab Test Certificate #DWSD/GUM/2026/041 confirming Fluoride at 2.76 mg/L',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 4,
        stageName: 'Department Assignment',
        date: '2026-01-20',
        organization: 'DWSD HQ Ranchi to Gumla Division',
        status: 'Completed',
        evidence: 'Sanction order issued under Jal Jeevan Mission Innovation Fund',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 5,
        stageName: 'University Matching',
        date: '2026-01-28',
        organization: 'Jharkhand Innovation Council & BIT Mesra',
        status: 'Completed',
        evidence: 'Matched with Dept of Chemical Engineering & Environmental Science, BIT Mesra',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 6,
        stageName: 'Research & Lab Testing',
        date: '2026-02-14',
        organization: 'BIT Mesra Innovation Lab',
        status: 'Completed',
        evidence: 'Published Lab Bench Test Report; Adsorption capacity tested on local red laterite matrix',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 7,
        stageName: 'Prototype Development',
        date: '2026-03-21',
        organization: 'BIT Mesra & Atal Incubation Centre',
        status: 'Completed',
        evidence: 'Bench prototype tested; Reduction from 2.8 mg/L to 0.4 mg/L achieved in 1000L batch',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 8,
        stageName: 'Industry / CSR Support',
        date: '2026-03-30',
        organization: 'Tata Steel Foundation CSR & CCL',
        status: 'Completed',
        evidence: 'CSR Grant Sanction Letter: ₹10.00 Lakhs committed for community filter housing & IoT sensors',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 9,
        stageName: 'Field Pilot Commissioning',
        date: '2026-04-10',
        organization: 'Joint DWSD, BIT Mesra, Tata Steel Foundation & Gram Panchayat',
        status: 'In Progress',
        evidence: 'Live Telemetry Dashboard deployed at Nagpheni Panchayat Bhawan (IoT ID: IOT-GUM-421)',
        slaStatus: 'Within SLA',
        notes: 'Current stage active. Continuous telemetry streaming.'
      },
      {
        stageNumber: 10,
        stageName: 'Permanent Scale Deployment',
        date: '2026-10-15',
        organization: 'DWSD Govt of Jharkhand',
        status: 'Upcoming',
        slaStatus: 'Pending',
        notes: 'Planned replication to 37 fluoride-affected villages in Sisai & Ghaghra blocks.'
      },
      {
        stageNumber: 11,
        stageName: 'Community Reality Check',
        date: '2026-05-18',
        organization: 'Independent Social Audit Unit & Sisai VWS Committee',
        status: 'Completed',
        evidence: '87 verified households surveyed. 82% confirmation of clean water delivery.',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 12,
        stageName: 'Impact Measurement & Audit',
        date: '2026-06-01',
        organization: 'Third-Party Impact Auditor (XISS Ranchi)',
        status: 'Completed',
        evidence: 'Measured 31% reduction in waterborne gastrointestinal ailments; Fluoride maintained at <0.6 mg/L.',
        slaStatus: 'Within SLA'
      }
    ],
    communityRealityCheck: {
      officialStatus: 'Pilot Operational & Water Safety Certified',
      officialCompletionDate: '2026-04-10',
      officialInspectionNote: 'Official DWSD certification: Unit operational with zero leakage, water output complies with BIS 10500 standards.',
      verifiedResponsesCount: 87,
      satisfiedCount: 71,
      continuingIssuesCount: 16,
      confirmationPercentage: 82,
      lastSurveyDate: '2026-05-18'
    }
  },
  {
    id: 'CH-2026-00914',
    title: 'Severe Structural Potholes and Sub-Base Collapse on Rural Road',
    domain: 'Infrastructure',
    district: 'Ramgarh',
    block: 'Patratu',
    panchayat: 'Barka Kana',
    village: 'Hesla',
    dateReported: '2026-02-04',
    verificationDate: '2026-02-08',
    status: 'Under Review',
    dataStatus: 'Verified',
    priority: 'Critical',
    description: '3.2 km stretch of bitumen road completed in late 2024 has disintegrated into deep craters within 14 months, inside the mandatory 3-year defect liability warranty. Buses unable to ply.',
    affectedPopulation: 6400,
    responsibleDepartment: 'Rural Development Dept / JSRRDA',
    responsibleOffice: 'Executive Engineer, JSRRDA Ramgarh PIU',
    associatedAssetId: 'RD-JH-45821',
    aiTriageConfidence: 98,
    aiCategory: 'Infrastructure Asset / Defect Liability Breach / Road Safety',
    verifiedCitizenSupporters: 842,
    publicEvidence: [
      {
        caption: 'Crater measurements showing 18cm sub-base washout and asphalt peeling',
        timestamp: '2026-02-04 09:12 IST',
        verifiedGps: '23.6120° N, 85.3412° E'
      },
      {
        caption: 'Official Joint Inspection on 2026-02-28 verifying contractor non-repair after 30-day notice',
        timestamp: '2026-02-28 15:40 IST',
        verifiedGps: '23.6124° N, 85.3418° E'
      }
    ],
    timeline: [
      {
        stageNumber: 1,
        stageName: 'Problem Reported',
        date: '2026-02-04',
        organization: 'Gram Panchayat Hesla & Commuters',
        status: 'Completed',
        evidence: 'GPS photo & bus union memorandum',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 2,
        stageName: 'AI Triage & Asset Cross-Reference',
        date: '2026-02-05',
        organization: 'JanaSamadhan Core',
        status: 'Completed',
        evidence: 'Matched to Asset ID RD-JH-45821; Contract #PMGSY-JH-RAM-881; Active DLP detected',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 3,
        stageName: 'Government Verification',
        date: '2026-02-08',
        organization: 'JSRRDA Technical Audit Wing',
        status: 'Completed',
        evidence: 'Inspection Report confirming premature bituminous distress',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 4,
        stageName: 'Defect Notice Issued to Contractor',
        date: '2026-02-12',
        organization: 'Executive Engineer JSRRDA',
        status: 'Completed',
        evidence: 'Official Notice #EE/JSRRDA/RAM/2026/194 granting 30-day mandatory rectification window',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 5,
        stageName: 'Repair Deadline Expired (No Action)',
        date: '2026-03-14',
        organization: 'State Monitoring Cell',
        status: 'Completed',
        evidence: 'Zero contractor mobilization recorded on satellite & mobile audit log',
        slaStatus: 'Breached',
        delayDays: 14
      },
      {
        stageNumber: 6,
        stageName: 'Official Verification of Non-Compliance',
        date: '2026-03-28',
        organization: 'Superintending Engineer, JSRRDA Circle Ranchi',
        status: 'Completed',
        evidence: 'Official Finding Case #CNC-2026-0014: Verified Contractual Non-Compliance recorded',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 7,
        stageName: 'Bank Guarantee Invocation & Penalty',
        date: '2026-04-05',
        organization: 'Finance Dept, Govt of Jharkhand',
        status: 'In Progress',
        evidence: 'Invocation of Performance Security ₹24.0 Lakhs; Re-tendering on contractor risk & cost initiated',
        slaStatus: 'Within SLA'
      }
    ],
    communityRealityCheck: {
      officialStatus: 'Officially Declared Non-Compliant; Remedial Re-tender Live',
      officialCompletionDate: '2026-03-28',
      officialInspectionNote: 'Technical audit confirmed contractor default. Strict legal forfeiture initiated.',
      verifiedResponsesCount: 114,
      satisfiedCount: 8,
      continuingIssuesCount: 106,
      confirmationPercentage: 7,
      lastSurveyDate: '2026-04-12'
    }
  },
  {
    id: 'CH-2026-00108',
    title: 'Bridge Expansion Joint Failure & Parapet Wall Damage on Koel River',
    domain: 'Infrastructure',
    district: 'Gumla',
    block: 'Raidih',
    panchayat: 'Kanshir',
    village: 'Kanshir Ghat',
    dateReported: '2026-01-08',
    verificationDate: '2026-01-14',
    status: 'Resolved',
    dataStatus: 'Verified',
    priority: 'High',
    description: 'Expansion joint gap on rural bridge widened by 14 cm, endangering two-wheeler commuters and ambulances accessing District Hospital.',
    affectedPopulation: 8200,
    responsibleDepartment: 'Road Construction Department (RCD)',
    responsibleOffice: 'Executive Engineer, RCD Gumla',
    associatedAssetId: 'BR-JH-1209',
    aiTriageConfidence: 94,
    aiCategory: 'Bridge Structural Safety / Immediate Hazard',
    verifiedCitizenSupporters: 620,
    publicEvidence: [
      {
        caption: 'Before: Widened gap in bridge expansion joint posing tyre-trap hazard',
        timestamp: '2026-01-08 16:30 IST',
        verifiedGps: '23.1142° N, 84.4521° E'
      },
      {
        caption: 'After: High-tensile elastomeric joint installed with reinforced parapet railing',
        timestamp: '2026-03-02 11:20 IST',
        verifiedGps: '23.1145° N, 84.4523° E'
      }
    ],
    timeline: [
      {
        stageNumber: 1,
        stageName: 'Problem Reported',
        date: '2026-01-08',
        organization: 'Ambulance Driver & Local Panchayat',
        status: 'Completed',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 2,
        stageName: 'Government Verification',
        date: '2026-01-14',
        organization: 'RCD Quality Control Division',
        status: 'Completed',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 3,
        stageName: 'Immediate Rectification Work',
        date: '2026-02-10',
        organization: 'RCD Flying Squad & Bridge Maintenance Wing',
        status: 'Completed',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 4,
        stageName: 'Community Reality Check',
        date: '2026-03-05',
        organization: 'Panchayat Gram Sabha',
        status: 'Completed',
        evidence: '94% of 62 respondents confirmed safe passage restored.',
        slaStatus: 'Within SLA'
      }
    ],
    communityRealityCheck: {
      officialStatus: 'Repairs Completed & Safe Load Certified',
      officialCompletionDate: '2026-03-02',
      officialInspectionNote: 'Bridge safety inspection cleared for 24T axle loads.',
      verifiedResponsesCount: 62,
      satisfiedCount: 58,
      continuingIssuesCount: 4,
      confirmationPercentage: 94,
      lastSurveyDate: '2026-03-05'
    }
  },
  {
    id: 'CH-2026-00332',
    title: 'Cold Chain Refrigerator Power Trips at Rural Primary Health Centre',
    domain: 'Healthcare',
    district: 'Dumka',
    block: 'Shikaripara',
    panchayat: 'Mohlapahari',
    village: 'Mohlapahari',
    dateReported: '2026-01-22',
    verificationDate: '2026-01-25',
    status: 'Deployed',
    dataStatus: 'Verified',
    priority: 'Critical',
    description: 'Repeated 8-12 hour power cuts spoiling temperature-sensitive infant vaccines and anti-rabies vials at PHC Mohlapahari.',
    affectedPopulation: 14200,
    responsibleDepartment: 'Health, Medical Education & Family Welfare',
    responsibleOffice: 'Civil Surgeon Office, Dumka',
    assignedProject: 'PR-2026-0044',
    associatedAssetId: 'HOSP-JH-004',
    aiTriageConfidence: 97,
    aiCategory: 'Healthcare Cold Chain / Maternal & Child Health',
    verifiedCitizenSupporters: 910,
    publicEvidence: [
      {
        caption: 'Solar hybrid DC deep freeze installed with remote GSM thermal logger',
        timestamp: '2026-03-12 12:00 IST',
        verifiedGps: '24.2384° N, 87.5212° E'
      }
    ],
    timeline: [
      {
        stageNumber: 1,
        stageName: 'Reported & Triaged',
        date: '2026-01-22',
        organization: 'Medical Officer In-Charge & ASHA Worker Union',
        status: 'Completed',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 2,
        stageName: 'University & CSR Innovation Match',
        date: '2026-02-02',
        organization: 'NIT Jamshedpur Clean Energy Lab + CCL CSR',
        status: 'Completed',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 3,
        stageName: 'Solar Hybrid Installation & Calibration',
        date: '2026-03-12',
        organization: 'NIT Jamshedpur & Dept of Health',
        status: 'Completed',
        slaStatus: 'Within SLA'
      }
    ],
    communityRealityCheck: {
      officialStatus: 'System 100% Operational; 0 Vaccine Wastage in 90 Days',
      officialCompletionDate: '2026-03-12',
      officialInspectionNote: 'Automated thermal probe shows steady 3.8°C throughout power outages.',
      verifiedResponsesCount: 48,
      satisfiedCount: 46,
      continuingIssuesCount: 2,
      confirmationPercentage: 96,
      lastSurveyDate: '2026-04-18'
    }
  },
  {
    id: 'CH-2026-00519',
    title: 'Arsenic Contamination in Gangetic Alluvial Aquifer',
    domain: 'Water',
    district: 'Sahibganj',
    block: 'Rajmahal',
    panchayat: 'Kasba',
    village: 'Kasba Diara',
    dateReported: '2026-01-30',
    verificationDate: '2026-02-04',
    status: 'Research & Prototype',
    dataStatus: 'Verified',
    priority: 'Critical',
    description: 'Arsenic detected at 0.08 mg/L (standard: 0.01 mg/L) across 18 shallow handpumps in riverbank floodplain.',
    affectedPopulation: 5200,
    responsibleDepartment: 'Drinking Water & Sanitation Dept',
    responsibleOffice: 'DWSD Sahibganj',
    assignedProject: 'PR-2026-0082',
    aiTriageConfidence: 95,
    aiCategory: 'Groundwater Arsenic / Public Toxicology',
    verifiedCitizenSupporters: 1105,
    publicEvidence: [
      {
        caption: 'Water samples sent to CSIR-NEERI and IIT ISM Dhanbad for chemical spectrometry',
        timestamp: '2026-02-04 14:00 IST',
        verifiedGps: '25.0489° N, 87.8392° E'
      }
    ],
    timeline: [
      {
        stageNumber: 1,
        stageName: 'Reported',
        date: '2026-01-30',
        organization: 'Local School Headmaster & Health Worker',
        status: 'Completed',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 2,
        stageName: 'Verified & Marked Red',
        date: '2026-02-04',
        organization: 'DWSD Water Quality Lab',
        status: 'Completed',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 3,
        stageName: 'IIT ISM Dhanbad Research Match',
        date: '2026-02-18',
        organization: 'Dept of Environmental Engineering, IIT ISM Dhanbad',
        status: 'In Progress',
        slaStatus: 'Within SLA',
        notes: 'Low-cost nano-adsorbent filter column prototype under calibration.'
      }
    ]
  },
  {
    id: 'CH-2026-00782',
    title: 'Post-Harvest Spoilage & Primary Processing Bottleneck for Tribal Lac Farmers',
    domain: 'Agriculture',
    district: 'Khunti',
    block: 'Torpa',
    panchayat: 'Dorma',
    village: 'Dorma Bazaar',
    dateReported: '2026-02-11',
    verificationDate: '2026-02-16',
    status: 'Field Pilot',
    dataStatus: 'Verified',
    priority: 'High',
    description: '380 tribal lac farmers losing 35% of harvested crop value due to lack of localized de-sticking and moisture-controlled scraping equipment.',
    affectedPopulation: 2400,
    responsibleDepartment: 'Agriculture, Animal Husbandry & Co-operative',
    responsibleOffice: 'District Agriculture Office, Khunti',
    assignedProject: 'PR-2026-0091',
    aiTriageConfidence: 92,
    aiCategory: 'Livelihoods / Value Addition / Mechanization',
    verifiedCitizenSupporters: 750,
    publicEvidence: [
      {
        caption: 'Field testing of portable pedal-cum-solar powered lac scraper developed by BAU Ranchi',
        timestamp: '2026-04-02 10:30 IST',
        verifiedGps: '22.9812° N, 85.1245° E'
      }
    ],
    timeline: [
      {
        stageNumber: 1,
        stageName: 'Challenge Reported',
        date: '2026-02-11',
        organization: 'Torpa Mahila Vikas Samiti (SHG Federation)',
        status: 'Completed',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 2,
        stageName: 'BAU & ICAR IINRG Matching',
        date: '2026-02-22',
        organization: 'Birsa Agricultural University & ICAR Namkum',
        status: 'Completed',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 3,
        stageName: 'Field Pilot in Dorma',
        date: '2026-04-02',
        organization: 'BAU Faculty of Agricultural Engineering & CSR partner',
        status: 'In Progress',
        slaStatus: 'Within SLA'
      }
    ]
  },
  {
    id: 'CH-2026-01045',
    title: 'Decentralized Solar Microgrid Inverter Failure During Peak Agricultural Pumping',
    domain: 'Agriculture',
    district: 'Palamu',
    block: 'Chhatarpur',
    panchayat: 'Munkeri',
    village: 'Munkeri Kalan',
    dateReported: '2026-02-18',
    verificationDate: '2026-02-21',
    status: 'Resolved',
    dataStatus: 'Verified',
    priority: 'High',
    description: '5kW solar lift irrigation system serving 42 smallholder rabi crop farmers went offline due to grid surge capacitor burn.',
    affectedPopulation: 850,
    responsibleDepartment: 'JREDA (Jharkhand Renewable Energy Dev Agency)',
    responsibleOffice: 'JREDA Project Officer, Medininagar',
    associatedAssetId: 'IRR-JH-201',
    aiTriageConfidence: 96,
    aiCategory: 'Renewable Energy / Irrigation Reliability',
    verifiedCitizenSupporters: 410,
    publicEvidence: [
      {
        caption: 'Repaired modular smart inverter with surge suppressor tested with pump outflow',
        timestamp: '2026-03-08 14:15 IST',
        verifiedGps: '24.3120° N, 84.1823° E'
      }
    ],
    timeline: [
      {
        stageNumber: 1,
        stageName: 'Reported',
        date: '2026-02-18',
        organization: 'Water Users Association (Pani Panchayat)',
        status: 'Completed',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 2,
        stageName: 'SLA Repair Dispatched',
        date: '2026-02-24',
        organization: 'JREDA Rapid Technical Maintenance Unit',
        status: 'Completed',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 3,
        stageName: 'Water Delivery Confirmed',
        date: '2026-03-08',
        organization: 'Local Gram Sabha Survey',
        status: 'Completed',
        slaStatus: 'Within SLA'
      }
    ],
    communityRealityCheck: {
      officialStatus: 'System Restored & Water Outflow Tested',
      officialCompletionDate: '2026-03-08',
      officialInspectionNote: 'Lift irrigation pump flow rate restored to 12,000 litres/hour.',
      verifiedResponsesCount: 42,
      satisfiedCount: 39,
      continuingIssuesCount: 3,
      confirmationPercentage: 93,
      lastSurveyDate: '2026-03-14'
    }
  },
  {
    id: 'CH-2026-01280',
    title: 'Severe Child Malnutrition (SAM) Diagnostic Gap in Remote Anganwadis',
    domain: 'Healthcare',
    district: 'West Singhbhum',
    block: 'Jhinkpani',
    panchayat: 'Kudahatu',
    village: 'Kudahatu',
    dateReported: '2026-02-25',
    verificationDate: '2026-03-01',
    status: 'Deployed',
    dataStatus: 'Verified',
    priority: 'Critical',
    description: 'Delayed detection of severe acute malnutrition (SAM) due to worn-out weighing scales and inaccurate manual Shakir tape readings.',
    affectedPopulation: 3800,
    responsibleDepartment: 'Women, Child Development & Social Security',
    responsibleOffice: 'District Social Welfare Office, Chaibasa',
    assignedProject: 'PR-2026-0112',
    aiTriageConfidence: 94,
    aiCategory: 'Maternal-Child Health / Early Diagnostic Technology',
    verifiedCitizenSupporters: 930,
    publicEvidence: [
      {
        caption: 'Digital AI infant anthropometry smartphone scale deployed to 28 Anganwadi sevikas',
        timestamp: '2026-04-14 11:00 IST',
        verifiedGps: '22.4210° N, 85.6720° E'
      }
    ],
    timeline: [
      {
        stageNumber: 1,
        stageName: 'Reported',
        date: '2026-02-25',
        organization: 'Anganwadi Sevikas & Poshan Abhiyan Field Workers',
        status: 'Completed',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 2,
        stageName: 'University Prototype Match',
        date: '2026-03-08',
        organization: 'Ranchi University & AIIMS Deoghar Collaborative Team',
        status: 'Completed',
        slaStatus: 'Within SLA'
      },
      {
        stageNumber: 3,
        stageName: 'Field Deployment to 28 Centers',
        date: '2026-04-14',
        organization: 'Tata Steel CSR & District Administration',
        status: 'Completed',
        slaStatus: 'Within SLA'
      }
    ],
    communityRealityCheck: {
      officialStatus: 'Operational in 28 Anganwadi Centers',
      officialCompletionDate: '2026-04-14',
      officialInspectionNote: 'Average screening time reduced from 14 mins to 90 seconds per child.',
      verifiedResponsesCount: 76,
      satisfiedCount: 72,
      continuingIssuesCount: 4,
      confirmationPercentage: 95,
      lastSurveyDate: '2026-05-02'
    }
  }
];

export const PUBLIC_INFRASTRUCTURE_ASSETS: PublicInfrastructureAsset[] = [
  {
    assetId: 'RD-JH-45821',
    name: 'Hesla to Barka Kana Rural Link Road (3.2 km)',
    category: 'Road',
    district: 'Ramgarh',
    block: 'Patratu',
    panchayat: 'Barka Kana',
    locationDetails: 'Km 0/000 to 3/200 connecting Hesla Village to SH-2 Highway',
    department: 'Rural Development Dept (JSRRDA)',
    projectName: 'PMGSY-Phase-III Rural Connectivity Package RAM-881',
    completionDate: '2024-11-20',
    contractValue: '₹2.42 Cr',
    contractorName: 'M/s Apex Infrastructure & Infraventures Pvt Ltd',
    contractorId: 'CONT-JH-014',
    contractAwardDate: '2023-04-15',
    warrantyPeriod: '5 Years Comprehensive Maintenance',
    defectLiabilityStatus: 'Active',
    defectLiabilityExpiry: '2029-11-19',
    repairObligationWindowDays: 30,
    currentCondition: 'Non-Compliance Verified',
    associatedComplaintsCount: 7,
    lastInspectionDate: '2026-03-28',
    nonComplianceCaseId: 'CNC-2026-0014'
  },
  {
    assetId: 'BR-JH-1209',
    name: 'Kanshir Ghat High-Level Submersible Bridge on Koel Tributary',
    category: 'Bridge',
    district: 'Gumla',
    block: 'Raidih',
    panchayat: 'Kanshir',
    locationDetails: 'Span 120m across Koel river stream',
    department: 'Road Construction Department',
    projectName: 'State Bridge Improvement Scheme GUM-04',
    completionDate: '2023-06-15',
    contractValue: '₹4.85 Cr',
    contractorName: 'Eastern Bridge & Structural Works Corp',
    contractorId: 'CONT-JH-008',
    contractAwardDate: '2021-12-10',
    warrantyPeriod: '10 Years Structural / 3 Years DLP',
    defectLiabilityStatus: 'Active',
    defectLiabilityExpiry: '2026-06-14',
    repairObligationWindowDays: 15,
    currentCondition: 'Repaired',
    associatedComplaintsCount: 1,
    lastInspectionDate: '2026-03-02'
  },
  {
    assetId: 'WTP-JH-882',
    name: 'Nagpheni Solar-Powered Multi-Village Fluoride Remediation Plant',
    category: 'Water Tank',
    district: 'Gumla',
    block: 'Sisai',
    panchayat: 'Nagpheni',
    locationDetails: 'Main distribution point at Nagpheni Toli',
    department: 'Drinking Water & Sanitation Dept',
    projectName: 'Jal Jeevan Mission Innovation Pilot DWSD-GUM-882',
    completionDate: '2026-04-10',
    contractValue: '₹42.5 Lakhs',
    contractorName: 'JanaJal Green Technologies Consortium with BIT Mesra',
    contractorId: 'CONT-JH-029',
    contractAwardDate: '2026-01-28',
    warrantyPeriod: '5 Years O&M with IoT Telemetry',
    defectLiabilityStatus: 'Active',
    defectLiabilityExpiry: '2031-04-09',
    repairObligationWindowDays: 7,
    currentCondition: 'Good',
    associatedComplaintsCount: 0,
    lastInspectionDate: '2026-06-15'
  },
  {
    assetId: 'HOSP-JH-004',
    name: 'Mohlapahari Primary Health Centre Maternal-Child Cold Chain Facility',
    category: 'Hospital',
    district: 'Dumka',
    block: 'Shikaripara',
    panchayat: 'Mohlapahari',
    locationDetails: 'PHC Campus Mohlapahari',
    department: 'Health, Medical Education & Family Welfare',
    projectName: 'National Health Mission Rural Cold Chain Upgrade',
    completionDate: '2026-03-12',
    contractValue: '₹18.0 Lakhs',
    contractorName: 'SunPower BioMedical Solutions with NIT Jamshedpur',
    contractorId: 'CONT-JH-042',
    contractAwardDate: '2026-02-05',
    warrantyPeriod: '7 Years Inverter & Cell Warranty',
    defectLiabilityStatus: 'Active',
    defectLiabilityExpiry: '2033-03-11',
    repairObligationWindowDays: 3,
    currentCondition: 'Good',
    associatedComplaintsCount: 0,
    lastInspectionDate: '2026-05-20'
  },
  {
    assetId: 'SCH-JH-441',
    name: 'Kanke Model Tribal Residential Girls High School Building',
    category: 'School',
    district: 'Ranchi',
    block: 'Kanke',
    panchayat: 'Arsande',
    locationDetails: 'Arsande Road, Kanke',
    department: 'Tribal Welfare & Education Dept',
    projectName: 'Eklavya Model Residential School Expansion Project',
    completionDate: '2025-02-18',
    contractValue: '₹7.15 Cr',
    contractorName: 'Chotanagpur Engineering & Builders Pvt Ltd',
    contractorId: 'CONT-JH-003',
    contractAwardDate: '2023-08-10',
    warrantyPeriod: '3 Years Defect Liability Period',
    defectLiabilityStatus: 'Active',
    defectLiabilityExpiry: '2028-02-17',
    repairObligationWindowDays: 20,
    currentCondition: 'Under Inspection',
    associatedComplaintsCount: 2,
    lastInspectionDate: '2026-04-02'
  }
];

export const CONTRACTUAL_NON_COMPLIANCE_CASES: ContractualNonComplianceCase[] = [
  {
    caseId: 'CNC-2026-0014',
    assetId: 'RD-JH-45821',
    contractorName: 'M/s Apex Infrastructure & Infraventures Pvt Ltd',
    department: 'Rural Development Dept (JSRRDA)',
    district: 'Ramgarh',
    defectDescription: 'Premature structural sub-base collapse, massive asphalt potholes across 3.2km stretch within 14 months of commissioning. Failed to mobilize repairs within 30-day statutory notice.',
    complaintDate: '2026-02-04',
    defectVerifiedDate: '2026-02-08',
    repairNoticeDate: '2026-02-12',
    repairDeadline: '2026-03-14',
    officialInspectionDate: '2026-03-28',
    officialFinding: 'Official joint inspection by Superintending Engineer confirmed contractor default. Contractor failed to mobilize equipment or rectify bituminous surface despite certified notice. Formally designated as Verified Contractual Non-Compliance.',
    status: 'Verified Contractual Non-Compliance',
    penaltyAmount: '₹24,20,000 (Performance BG Forfeited) + Debarment Notice Issued',
    hearingStatus: 'Show-cause hearing scheduled before State Tender Committee on 2026-09-18',
    authorizedOfficial: 'Superintending Engineer, JSRRDA Circle Ranchi'
  },
  {
    caseId: 'CNC-2026-0008',
    assetId: 'DRAIN-JH-104',
    contractorName: 'Prabhat Builders & Civil Works',
    department: 'Urban Development & Housing Dept',
    district: 'Dhanbad',
    defectDescription: 'Defective concrete grade leading to sidewall collapse on Jharia Stormwater Drain section 4.',
    complaintDate: '2025-11-12',
    defectVerifiedDate: '2025-11-19',
    repairNoticeDate: '2025-11-25',
    repairDeadline: '2025-12-25',
    officialInspectionDate: '2026-01-10',
    officialFinding: 'Contractor abandoned site during defect liability period. Technical wing reconstructed at contractor risk. Officially debarred from participating in municipal tenders for 2 years.',
    status: 'Official Debarment Initiated',
    penaltyAmount: '₹14,50,000 + 2-Year Debarment',
    hearingStatus: 'Final order issued by Municipal Commissioner, Dhanbad',
    authorizedOfficial: 'Municipal Commissioner, DMC Dhanbad'
  }
];

export const CONTRACTOR_PERFORMANCES: ContractorPerformance[] = [
  {
    contractorId: 'CONT-JH-003',
    name: 'Chotanagpur Engineering & Builders Pvt Ltd',
    registeredDistrict: 'Ranchi',
    activeProjectsCount: 8,
    completedProjectsCount: 34,
    verifiedDefectsCount: 3,
    averageRepairResponseDays: 8.4,
    contractualSlaCompliance: 93,
    officialPenaltiesCount: 0,
    debarmentStatus: 'Clear',
    totalContractValue: '₹38.4 Cr',
    complianceRating: 'High Compliance'
  },
  {
    contractorId: 'CONT-JH-008',
    name: 'Eastern Bridge & Structural Works Corp',
    registeredDistrict: 'Jamshedpur',
    activeProjectsCount: 5,
    completedProjectsCount: 22,
    verifiedDefectsCount: 2,
    averageRepairResponseDays: 11.2,
    contractualSlaCompliance: 88,
    officialPenaltiesCount: 0,
    debarmentStatus: 'Clear',
    totalContractValue: '₹42.1 Cr',
    complianceRating: 'Standard'
  },
  {
    contractorId: 'CONT-JH-014',
    name: 'M/s Apex Infrastructure & Infraventures Pvt Ltd',
    registeredDistrict: 'Ranchi / Ramgarh',
    activeProjectsCount: 4,
    completedProjectsCount: 14,
    verifiedDefectsCount: 6,
    averageRepairResponseDays: 34.6,
    contractualSlaCompliance: 54,
    officialPenaltiesCount: 2,
    debarmentStatus: 'Notice Issued',
    totalContractValue: '₹19.8 Cr',
    complianceRating: 'Non-Compliant'
  },
  {
    contractorId: 'CONT-JH-019',
    name: 'Tribal Green Infra Development Consortium',
    registeredDistrict: 'Gumla',
    activeProjectsCount: 6,
    completedProjectsCount: 18,
    verifiedDefectsCount: 1,
    averageRepairResponseDays: 6.8,
    contractualSlaCompliance: 96,
    officialPenaltiesCount: 0,
    debarmentStatus: 'Clear',
    totalContractValue: '₹16.2 Cr',
    complianceRating: 'High Compliance'
  },
  {
    contractorId: 'CONT-JH-024',
    name: 'Prabhat Builders & Civil Works',
    registeredDistrict: 'Dhanbad',
    activeProjectsCount: 1,
    completedProjectsCount: 11,
    verifiedDefectsCount: 5,
    averageRepairResponseDays: 42.0,
    contractualSlaCompliance: 48,
    officialPenaltiesCount: 3,
    debarmentStatus: 'Debarred (2 Years)',
    totalContractValue: '₹11.5 Cr',
    complianceRating: 'Non-Compliant'
  },
  {
    contractorId: 'CONT-JH-029',
    name: 'JanaJal Green Technologies Consortium',
    registeredDistrict: 'Ranchi',
    activeProjectsCount: 9,
    completedProjectsCount: 28,
    verifiedDefectsCount: 2,
    averageRepairResponseDays: 7.1,
    contractualSlaCompliance: 94,
    officialPenaltiesCount: 0,
    debarmentStatus: 'Clear',
    totalContractValue: '₹24.6 Cr',
    complianceRating: 'High Compliance'
  }
];

export const PUBLIC_PROJECTS: PublicProject[] = [
  {
    id: 'PR-2026-0019',
    title: 'Low-Cost Community Adsorption Unit for Fluoride Remediation',
    challengeId: 'CH-2026-00421',
    domain: 'Water',
    district: 'Gumla',
    leadUniversity: 'Birla Institute of Technology (BIT) Mesra',
    facultyLead: 'Prof. R. N. Murmu, Dept of Chemical Engineering',
    studentsInvolved: 14,
    industryPartner: 'JanaJal Technologies Ltd',
    csrPartner: 'Tata Steel Foundation CSR',
    governmentDepartment: 'Drinking Water & Sanitation Dept',
    trl: 9,
    currentStage: 'Field Pilot',
    fundingBreakdown: {
      government: 5.0,
      csr: 10.0,
      university: 3.0,
      other: 2.0,
      total: 20.0,
      released: 16.0,
      utilized: 13.8
    },
    impactFunnel: {
      expectedBeneficiaries: 20000,
      reportedBeneficiaries: 24500,
      measuredBeneficiaries: 23900,
      verifiedBeneficiaries: 22800
    },
    keyMilestones: [
      { title: 'Bench Scale Adsorption Proof', targetDate: '2026-02-15', completedDate: '2026-02-14', status: 'Achieved' },
      { title: 'Field Pilot Commissioning at Sisai', targetDate: '2026-04-15', completedDate: '2026-04-10', status: 'Achieved' },
      { title: 'Continuous 90-Day Telemetry Verification', targetDate: '2026-07-15', completedDate: '2026-07-12', status: 'Achieved' },
      { title: 'Replication to 37 Panchayats', targetDate: '2026-11-30', status: 'Pending' }
    ],
    deploymentsCount: 37,
    solutionRepoId: 'SOL-2026-0037'
  },
  {
    id: 'PR-2026-0044',
    title: 'Smart Hybrid Solar-Battery Cold Storage for Primary Health Vaccines',
    challengeId: 'CH-2026-00332',
    domain: 'Healthcare',
    district: 'Dumka',
    leadUniversity: 'National Institute of Technology (NIT) Jamshedpur',
    facultyLead: 'Dr. S. K. Mahato, Dept of Electrical Engineering',
    studentsInvolved: 8,
    industryPartner: 'SunPower BioMedical Systems',
    csrPartner: 'Central Coalfields Ltd (CCL) CSR',
    governmentDepartment: 'Dept of Health, Medical Education & Family Welfare',
    trl: 8,
    currentStage: 'Deployment',
    fundingBreakdown: {
      government: 6.0,
      csr: 8.5,
      university: 2.5,
      other: 1.0,
      total: 18.0,
      released: 16.5,
      utilized: 15.2
    },
    impactFunnel: {
      expectedBeneficiaries: 15000,
      reportedBeneficiaries: 18200,
      measuredBeneficiaries: 17400,
      verifiedBeneficiaries: 16800
    },
    keyMilestones: [
      { title: 'DC-Coupled Solar Inverter Bench Test', targetDate: '2026-02-10', completedDate: '2026-02-08', status: 'Achieved' },
      { title: 'Dumka PHC Pilot Installation', targetDate: '2026-03-15', completedDate: '2026-03-12', status: 'Achieved' },
      { title: 'Zero Cold-Chain Outage Audit', targetDate: '2026-06-15', completedDate: '2026-06-14', status: 'Achieved' }
    ],
    deploymentsCount: 16,
    solutionRepoId: 'SOL-2026-0044'
  },
  {
    id: 'PR-2026-0091',
    title: 'Pedal-cum-Solar Mechanical Lac De-Sticking & Scraping Station',
    challengeId: 'CH-2026-00782',
    domain: 'Agriculture',
    district: 'Khunti',
    leadUniversity: 'Birsa Agricultural University (BAU) Ranchi',
    facultyLead: 'Dr. P. Soreng, Faculty of Agricultural Engineering',
    studentsInvolved: 11,
    industryPartner: 'Jharkhand Tribal Development Society (JTDS)',
    csrPartner: 'Vedanta Rural Development Trust',
    governmentDepartment: 'Dept of Agriculture, Animal Husbandry & Co-operative',
    trl: 7,
    currentStage: 'Field Pilot',
    fundingBreakdown: {
      government: 4.5,
      csr: 6.0,
      university: 2.0,
      other: 1.5,
      total: 14.0,
      released: 11.0,
      utilized: 9.4
    },
    impactFunnel: {
      expectedBeneficiaries: 3000,
      reportedBeneficiaries: 3400,
      measuredBeneficiaries: 3100,
      verifiedBeneficiaries: 2950
    },
    keyMilestones: [
      { title: 'Mechanical Rotor Design for Ber & Kusumi Lac', targetDate: '2026-03-01', completedDate: '2026-02-28', status: 'Achieved' },
      { title: 'Pilot in 4 Self-Help Groups in Torpa', targetDate: '2026-04-15', completedDate: '2026-04-02', status: 'Achieved' }
    ],
    deploymentsCount: 8,
    solutionRepoId: 'SOL-2026-0091'
  },
  {
    id: 'PR-2026-0112',
    title: 'AI-Guided Mobile Anthropometry & Severe Acute Malnutrition Diagnostic Tool',
    challengeId: 'CH-2026-01280',
    domain: 'Healthcare',
    district: 'West Singhbhum',
    leadUniversity: 'Ranchi University & AIIMS Deoghar Joint Group',
    facultyLead: 'Dr. Ananya Roy, Dept of Computer Science & Pediatrics',
    studentsInvolved: 9,
    industryPartner: 'Samaritan HealthTech',
    csrPartner: 'Tata Steel CSR',
    governmentDepartment: 'Women & Child Development Dept',
    trl: 8,
    currentStage: 'Deployment',
    fundingBreakdown: {
      government: 5.5,
      csr: 9.0,
      university: 3.5,
      other: 1.0,
      total: 19.0,
      released: 18.0,
      utilized: 16.8
    },
    impactFunnel: {
      expectedBeneficiaries: 8000,
      reportedBeneficiaries: 9800,
      measuredBeneficiaries: 9400,
      verifiedBeneficiaries: 9100
    },
    keyMilestones: [
      { title: 'Offline Computer Vision Weight/Height Estimator', targetDate: '2026-03-01', completedDate: '2026-02-26', status: 'Achieved' },
      { title: 'Chaibasa Block Anganwadi Deployment', targetDate: '2026-04-20', completedDate: '2026-04-14', status: 'Achieved' }
    ],
    deploymentsCount: 28,
    solutionRepoId: 'SOL-2026-0112'
  }
];

export const PUBLIC_SOLUTIONS: PublicSolution[] = [
  {
    solutionId: 'SOL-2026-0037',
    name: 'Smart Adsorption Water Purifier (Fluoride & Iron Removal)',
    domain: 'Water',
    challengeCategory: 'Water Quality & Heavy Metal Filtration',
    developedBy: 'Birla Institute of Technology (BIT) Mesra',
    industrySupport: 'JanaJal Technologies & Tata Steel Foundation',
    governmentDept: 'Drinking Water & Sanitation Dept (DWSD)',
    trl: 9,
    villagesDeployed: 37,
    peopleImpacted: 24500,
    measuredImpactMetric: '31% reduction in waterborne ailments; Fluoride maintained <0.6 mg/L',
    unitCost: '₹38,000 per 1,000 LPH Community Unit',
    deploymentRequirements: [
      'Borewell with minimum 1 HP submersible pump',
      '200 sq ft concrete platform',
      'Local Village Water & Sanitation Committee (VWSC) caretaker'
    ],
    licensingType: 'Open Civic Tech / Free Gov License',
    replicationRequestsCount: 14,
    briefOverview: 'Regenerable activated alumina and activated charcoal composite bed that eliminates 92% of dissolved fluoride and iron without consuming grid electricity.'
  },
  {
    solutionId: 'SOL-2026-0044',
    name: 'Solar-DC Direct Cold Chain Vaccine Storage Unit',
    domain: 'Healthcare',
    challengeCategory: 'Health Infrastructure & Maternal Care',
    developedBy: 'National Institute of Technology (NIT) Jamshedpur',
    industrySupport: 'SunPower BioMedical & Central Coalfields Ltd (CCL)',
    governmentDept: 'Dept of Health, Medical Education & Family Welfare',
    trl: 8,
    villagesDeployed: 16,
    peopleImpacted: 18200,
    measuredImpactMetric: '0 vaccine spoilage across 1,840 consecutive operating hours',
    unitCost: '₹62,000 per PHC unit including 1.2kW rooftop solar array',
    deploymentRequirements: [
      'Unshaded rooftop area 120 sq ft',
      'Standard 24V DC medical refrigerator input',
      'GSM signal for temperature alert telemetry'
    ],
    licensingType: 'Open Civic Tech / Free Gov License',
    replicationRequestsCount: 22,
    briefOverview: 'Direct-drive DC thermal bank that stores cooling in phase change material (PCM), avoiding battery replacement for 7 years.'
  },
  {
    solutionId: 'SOL-2026-0091',
    name: 'Pedal-cum-Solar Mechanical Lac De-Sticking & Scraping Station',
    domain: 'Agriculture',
    challengeCategory: 'Rural Value Addition & Tribal Livelihoods',
    developedBy: 'Birsa Agricultural University (BAU) Ranchi',
    industrySupport: 'Jharkhand Tribal Development Society & Vedanta Trust',
    governmentDept: 'Dept of Agriculture, Animal Husbandry & Co-operative',
    trl: 7,
    villagesDeployed: 8,
    peopleImpacted: 3400,
    measuredImpactMetric: '35% increase in farmer price realization; scraping time cut by 4x',
    unitCost: '₹14,500 per unit for SHG cluster',
    deploymentRequirements: [
      'Covered shed at village bazaar or SHG center',
      '1 human operator or 12V 100W solar panel'
    ],
    licensingType: 'Open Civic Tech / Free Gov License',
    replicationRequestsCount: 19,
    briefOverview: 'Adjustable spring-loaded counter-rotating blade cylinder specifically calibrated for tender Kusumi and Ber lac twigs.'
  },
  {
    solutionId: 'SOL-2026-0112',
    name: 'AI-Guided Mobile Child Malnutrition Screener',
    domain: 'Healthcare',
    challengeCategory: 'Child Growth Monitoring & SAM Detection',
    developedBy: 'Ranchi University & AIIMS Deoghar Joint Group',
    industrySupport: 'Samaritan HealthTech & Tata Steel CSR',
    governmentDept: 'Women & Child Development Dept',
    trl: 8,
    villagesDeployed: 28,
    peopleImpacted: 9800,
    measuredImpactMetric: 'Screening time reduced to 90 seconds; 98.2% diagnostic concordance with clinical calipers',
    unitCost: 'Zero hardware cost (Runs offline on standard Anganwadi Poshan 4G smartphones)',
    deploymentRequirements: [
      'Android 10+ smartphone with 8MP autofocus camera',
      'Calibrated reference checkered paper mat (provided by dept)'
    ],
    licensingType: 'Open Civic Tech / Free Gov License',
    replicationRequestsCount: 31,
    briefOverview: 'Edge-AI neural network running entirely on-device without internet that computes 3D volumetric child anthropometrics from two quick photographs.'
  },
  {
    solutionId: 'SOL-2026-0065',
    name: 'Ultra-Low Cost IoT Water Level & Flood Alert Sensor for Rural Culverts',
    domain: 'Infrastructure',
    challengeCategory: 'Monsoon Resilience & Disaster Warning',
    developedBy: 'IIT ISM Dhanbad',
    industrySupport: 'Coal India Ltd & District Disaster Management Authority',
    governmentDept: 'Disaster Management Division',
    trl: 9,
    villagesDeployed: 42,
    peopleImpacted: 64000,
    measuredImpactMetric: 'Zero drowning incidents during 2025 monsoon flash floods; 45-min advance SMS warnings',
    unitCost: '₹6,800 per culvert / causeway node',
    deploymentRequirements: [
      'Bridge pier or culvert headwall mount',
      'Solar battery pole (enclosed IP67 housing)'
    ],
    licensingType: 'Open Civic Tech / Free Gov License',
    replicationRequestsCount: 26,
    briefOverview: 'Non-contact ultrasonic water level monitor with LoRaWAN and GSM auto-repeater alerting police checkposts and village headmen.'
  }
];

export const INTEGRITY_STATISTICS: IntegrityStatistics = {
  totalReportsReceived: 1842,
  underVerification: 312,
  underInvestigation: 118,
  closed: 927,
  substantiated: 86,
  byCategory: [
    { category: 'Bribe Demand', count: 482, substantiated: 28 },
    { category: 'Service Denial', count: 394, substantiated: 19 },
    { category: 'Unofficial Payment', count: 328, substantiated: 16 },
    { category: 'Service Delay', count: 312, substantiated: 11 },
    { category: 'Middlemen', count: 196, substantiated: 7 },
    { category: 'Misconduct', count: 130, substantiated: 5 }
  ],
  activeCases: [
    {
      caseToken: 'INT-JH-2026-0912',
      category: 'Bribe Demand',
      department: 'Revenue & Land Reforms Dept',
      district: 'Ranchi',
      dateReceived: '2026-02-14',
      status: 'Official Finding',
      findingsSummary: 'Vigilance inquiry substantiated demand of unauthorized ₹3,500 fee for mutation certificate. Departmental chargesheet framed.',
      actionTaken: 'Suspension order issued; disciplinary proceedings initiated.'
    },
    {
      caseToken: 'INT-JH-2026-0844',
      category: 'Service Denial',
      department: 'Food, Public Distribution & Consumer Affairs',
      district: 'Gumla',
      dateReceived: '2026-02-28',
      status: 'Closed with Action',
      findingsSummary: 'Biometric exemption denied to 8 elderly Antyodaya cardholders by PDS dealer.',
      actionTaken: 'PDS license suspended; offline nominee distribution mandated.'
    },
    {
      caseToken: 'INT-JH-2026-1042',
      category: 'Middlemen',
      department: 'Transport Department',
      district: 'Dhanbad',
      dateReceived: '2026-03-05',
      status: 'Under Investigation',
      findingsSummary: 'Unauthorized touts operating outside DTO office charging premium for learner licenses.',
      actionTaken: 'CCTV audit ongoing; police complaint filed by DTO.'
    },
    {
      caseToken: 'INT-JH-2026-1188',
      category: 'Unofficial Payment',
      department: 'Rural Development Dept',
      district: 'Palamu',
      dateReceived: '2026-03-18',
      status: 'Under Verification',
      findingsSummary: 'Allegation of commission deductions on MGNREGA well-construction payment release.',
      actionTaken: 'Ombudsman field team assigned for discreet muster roll audit.'
    }
  ]
};

export const AI_INSIGHTS: AIInsight[] = [
  {
    id: 'AI-INS-2026-01',
    title: 'Water Quality Clustering in Upper Subarnarekha Basin',
    summary: 'Machine learning clustering detected an 18.4% increase in turbidity and dissolved iron complaints in 14 contiguous villages across Gumla and Ranchi border within 30 days of pre-monsoon showers.',
    domain: 'Water',
    district: 'Gumla & Ranchi',
    sourceDataset: '412 geo-tagged water challenge filings + Jal Jeevan Mission field telemetry',
    confidenceScore: 94.2,
    timeframe: 'Jan 2026 – June 2026',
    generatedDate: '2026-06-18',
    methodologyNote: 'Density-Based Spatial Clustering of Applications with Noise (DBSCAN) with epsilon=4.2km. Supervised human verification completed by DWSD technical staff on 2026-06-20.'
  },
  {
    id: 'AI-INS-2026-02',
    title: 'Road Defect Liability Hotspots Identified',
    summary: 'Predictive NLP contract mining identified 9 rural roads approaching defect liability expiry with elevated citizen defect reports that had not yet triggered automated contractor repair warnings.',
    domain: 'Infrastructure',
    district: 'Ramgarh, Dhanbad, Giridih',
    sourceDataset: 'JSRRDA PMGSY contract registries cross-referenced with public challenge coordinates',
    confidenceScore: 91.8,
    timeframe: 'October 2025 – March 2026',
    generatedDate: '2026-03-22',
    methodologyNote: 'Cross-entity graph linkage between Asset IDs and citizen complaint velocity. AI recommendation led to proactive joint audits.'
  },
  {
    id: 'AI-INS-2026-03',
    title: 'Rabi Season Solar Lift Irrigation Anomaly Detection',
    summary: 'Telemetry anomaly detection flagged 26 microgrid inverters experiencing recurring midday thermal shutdown in Palamu and Garhwa due to ambient dust accumulation on heat sinks.',
    domain: 'Agriculture',
    district: 'Palamu & Garhwa',
    sourceDataset: 'JREDA remote telemetry inverter logs (120 nodes)',
    confidenceScore: 96.0,
    timeframe: 'February – April 2026',
    generatedDate: '2026-04-12',
    methodologyNote: 'Time-series isolation forest model. Advisory dispatched to block maintenance teams for automated cleaning schedules.'
  }
];

export const PUBLIC_UPDATES: PublicUpdate[] = [
  {
    id: 'UPD-2026-081',
    title: 'Fluoride Pilot in Sisai, Gumla Expands to 37 Villages Following Community Confirmation',
    category: 'Solution Deployed',
    date: '2026-08-28',
    organization: 'DWSD Govt of Jharkhand & BIT Mesra',
    relatedEntityId: 'CH-2026-00421',
    summary: 'Following an 82% positive community confirmation survey and verified lab water testing, the state has cleared ₹1.4 Cr for scaling the BIT Mesra adsorption system.'
  },
  {
    id: 'UPD-2026-079',
    title: 'Official Non-Compliance Finding Designated on Road RD-JH-45821',
    category: 'Official Finding',
    date: '2026-08-20',
    organization: 'JSRRDA Technical Audit Wing',
    relatedEntityId: 'CNC-2026-0014',
    summary: 'State Superintending Engineer confirms forfeiture of ₹24.2L bank guarantee and show-cause notice for 2-year debarment against contractor default.'
  },
  {
    id: 'UPD-2026-074',
    title: '28 Anganwadis in West Singhbhum Equipped with AI Nutrition Screener',
    category: 'Pilot Launch',
    date: '2026-08-10',
    organization: 'Women & Child Development Dept & Ranchi University',
    relatedEntityId: 'PR-2026-0112',
    summary: 'New edge-AI diagnostic tool reduces infant severe acute malnutrition screening from 14 minutes to 90 seconds in remote tribal blocks.'
  },
  {
    id: 'UPD-2026-068',
    title: 'Statewide SLA Compliance Hits 87.2% across 24 Districts',
    category: 'Milestone',
    date: '2026-08-01',
    organization: 'Chief Secretary Office, Transparency Cell',
    relatedEntityId: 'SLA-JH-2026',
    summary: 'Ranchi leads at 94% compliance, Gumla at 89%, while Latehar and Pakur receive dedicated mobile facilitation vans to accelerate response times.'
  }
];

export const DOMAINS_LIST: { id: DomainType; label: string; icon: string; count: number; fundingCr: number; impactK: number }[] = [
  { id: 'Water', label: 'Drinking Water & Quality', icon: 'Droplets', count: 3412, fundingCr: 14.2, impactK: 680 },
  { id: 'Infrastructure', label: 'Roads, Bridges & Civil Assets', icon: 'Building2', count: 2980, fundingCr: 12.8, impactK: 540 },
  { id: 'Healthcare', label: 'Health, PHCs & Telemedicine', icon: 'Activity', count: 2410, fundingCr: 8.6, impactK: 410 },
  { id: 'Agriculture', label: 'Farming, Irrigation & Tribal Produce', icon: 'Wheat', count: 2180, fundingCr: 6.4, impactK: 320 },
  { id: 'Education', label: 'Schools, Labs & Digital Literacy', icon: 'GraduationCap', count: 1840, fundingCr: 5.1, impactK: 210 },
  { id: 'Sanitation', label: 'Solid Waste & Community Hygiene', icon: 'Trash2', count: 1620, fundingCr: 3.4, impactK: 180 },
  { id: 'Environment', label: 'Forests, Rivers & Mine Reclamation', icon: 'Trees', count: 1240, fundingCr: 2.8, impactK: 140 },
  { id: 'Rural Livelihoods', label: 'SHGs, Handicrafts & Forest Produce', icon: 'HandCoins', count: 1120, fundingCr: 2.2, impactK: 110 },
  { id: 'Accessibility', label: 'Assistive Tech & Public Inclusivity', icon: 'Eye', count: 860, fundingCr: 1.5, impactK: 65 },
  { id: 'Public Services', label: 'Certificates, PDS & Civic Redress', icon: 'ShieldCheck', count: 759, fundingCr: 1.6, impactK: 95 }
];
