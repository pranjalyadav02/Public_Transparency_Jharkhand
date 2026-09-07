import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper for consistent response format
const successResponse = (data: any, meta?: any) => ({
  success: true,
  data,
  ...(meta && { meta })
});

const errorResponse = (code: string, message: string) => ({
  success: false,
  error: { code, message }
});

// Mock Data Projection (In-Memory Database)
const db = {
  overview: {
    reported: { value: 18421, status: 'OFFICIAL', source: 'Challenge Registry' },
    verified: { value: 12804, status: 'VERIFIED', source: 'Verification Engine' },
    activeProjects: { value: 1284, status: 'OFFICIAL', source: 'Project Registry' },
    deployedSolutions: { value: 186, status: 'VERIFIED', source: 'Deployment Records' },
    beneficiaries: { value: 2400000, status: 'MEASURED', source: 'Impact Engine' },
    csrFunding: { value: 840000000, status: 'VERIFIED', source: 'Financial Registry' },
    slaCompliance: { value: 87, status: 'OFFICIAL', source: 'Performance Engine' },
    pilots: { value: 421, status: 'OFFICIAL', source: 'Project Registry' }
  },
  challenges: [
    {
      id: 'CH-2026-00421',
      title: 'Rural Drinking Water Quality Problem',
      description: 'High levels of iron and fluoride reported in the primary drinking water source.',
      domain: 'Water',
      location: 'Example Village',
      district: 'Gumla',
      verificationStatus: 'Verified',
      status: 'In Progress',
      responsibleDepartment: 'Department of Drinking Water and Sanitation',
      affectedPopulation: 4500,
      priority: 'High',
      projectStage: 'Field Pilot',
      date: '2026-01-12'
    },
    {
      id: 'CH-2026-00422',
      title: 'Broken Irrigation Canal',
      description: 'Main irrigation canal breached, flooding nearby fields.',
      domain: 'Agriculture',
      location: 'Bero Block',
      district: 'Ranchi',
      verificationStatus: 'Verified',
      status: 'Assigned',
      responsibleDepartment: 'Water Resources Department',
      affectedPopulation: 1200,
      priority: 'High',
      projectStage: null,
      date: '2026-02-05'
    }
  ],
  infrastructure: [
    {
      id: 'INF-45821',
      assetId: 'RD-JH-45821',
      title: 'Rural Road Link - Sector 4',
      description: 'Construction of 5km rural road connecting market to highway.',
      district: 'Gumla',
      location: 'Sector 4',
      department: 'Rural Works Department',
      project: 'Rural Road Improvement Phase 2',
      contractor: 'Demo Contractor Ltd',
      contractValue: 24000000,
      completionDate: '2025-11-20',
      warrantyStatus: 'Active',
      defectLiabilityPeriod: '3 Years',
      repairObligation: '30 Days',
      currentStatus: 'Verified Contractual Non-Compliance',
      communityConfirmation: 18
    }
  ],
  timeline: {
    'CH-2026-00421': [
      { date: 'Jan 12, 2026', organization: 'Citizen Report', status: 'Submitted', evidence: 'Public Geotagged Photo', nextMilestone: 'AI Triage' },
      { date: 'Jan 13, 2026', organization: 'AI System', status: 'Triaged', evidence: 'Categorized: Water Quality', nextMilestone: 'Govt Verification' },
      { date: 'Jan 16, 2026', organization: 'Govt Inspector', status: 'Verified', evidence: 'Official Water Test Report', nextMilestone: 'University Matching' },
      { date: 'Jan 20, 2026', organization: 'Demo University', status: 'Matched', evidence: 'Project Proposal Accepted', nextMilestone: 'Project Start' },
      { date: 'Feb 05, 2026', organization: 'Innovation Cell', status: 'Started', evidence: 'Funding Released', nextMilestone: 'Prototype' },
      { date: 'Mar 21, 2026', organization: 'Demo University', status: 'Prototyped', evidence: 'Lab Test Results', nextMilestone: 'Field Pilot' },
      { date: 'Apr 10, 2026', organization: 'Joint Taskforce', status: 'Field Pilot', evidence: 'Installation Photos', nextMilestone: 'Impact Measurement' }
    ]
  },
  projects: [
    {
      id: 'PRJ-2026-104',
      challengeId: 'CH-2026-00421',
      title: 'Smart Rural Water Monitoring System',
      description: 'IoT based water quality monitoring and automated filtration system.',
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
  ],
  impact: {
    domainData: [
      { name: 'Water', projects: 218, impacted: 540 },
      { name: 'Health', projects: 185, impacted: 420 },
      { name: 'Agri', projects: 150, impacted: 380 },
      { name: 'Edu', projects: 120, impacted: 290 },
      { name: 'Infra', projects: 95, impacted: 210 },
      { name: 'Enviro', projects: 80, impacted: 160 },
    ],
    expectedVsActual: {
      expected: 450000,
      reported: 480000,
      verified: 462000
    },
    sla: {
      firstResponse: '8.4h',
      verification: '2.1d',
      resolution: '11.6d',
      compliance: 87
    }
  }
};

// --- API ROUTES ---

app.get('/api/v1/public/overview', (req, res) => {
  res.json(successResponse(db.overview));
});

app.get('/api/v1/public/challenges', (req, res) => {
  const { q, district, status } = req.query;
  let results = db.challenges;
  
  if (q) {
    const term = (q as string).toLowerCase();
    results = results.filter(c => c.id.toLowerCase().includes(term) || c.title.toLowerCase().includes(term));
  }
  if (district && district !== 'All Districts') {
    results = results.filter(c => c.district === district);
  }
  if (status && status !== 'All Statuses') {
    results = results.filter(c => c.verificationStatus === status || c.status === status);
  }

  res.json(successResponse(results, { page: 1, pageSize: 25, total: results.length }));
});

app.get('/api/v1/public/challenges/:publicId', (req, res) => {
  const challenge = db.challenges.find(c => c.id === req.params.publicId);
  if (!challenge) {
    return res.status(404).json(errorResponse('NOT_FOUND', 'Public record not found.'));
  }
  
  const project = db.projects.find(p => p.challengeId === challenge.id);
  const timeline = db.timeline[challenge.id as keyof typeof db.timeline] || [];

  res.json(successResponse({
    ...challenge,
    project,
    timeline
  }));
});

app.get('/api/v1/public/infrastructure', (req, res) => {
  const { q } = req.query;
  let results = db.infrastructure;
  
  if (q) {
    const term = (q as string).toLowerCase();
    results = results.filter(i => i.assetId.toLowerCase().includes(term) || i.title.toLowerCase().includes(term));
  }
  
  res.json(successResponse(results));
});

app.get('/api/v1/public/impact/overview', (req, res) => {
  res.json(successResponse(db.impact));
});

// POST ENDPOINTS (MOCK ACTIONS)
app.post('/api/v1/public/solutions/:id/replication-request', (req, res) => {
  res.json(successResponse({ status: 'ACCEPTED', message: 'Replication request submitted successfully.' }));
});

app.post('/api/v1/public/feedback', (req, res) => {
  res.json(successResponse({ status: 'RECEIVED', message: 'Feedback recorded securely.' }));
});

app.post('/api/v1/public/data-corrections', (req, res) => {
  res.json(successResponse({ status: 'REPORTED', message: 'Correction request submitted for review.' }));
});

// --- Vite Middleware (Development) / Static Serving (Production) ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
