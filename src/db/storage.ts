import fs from 'fs';
import path from 'path';
import {
  PUBLIC_CHALLENGES,
  PUBLIC_SOLUTIONS,
  JHARKHAND_DISTRICTS,
  STATE_WIDE_STATS,
  LINEAGE_DATA,
  CONTRACTOR_PERFORMANCES,
  CONTRACTUAL_NON_COMPLIANCE_CASES,
  PUBLIC_INFRASTRUCTURE_ASSETS,
} from '../data/mockData';

const SHARED_DIR = path.resolve(process.cwd(), '..', 'shared_data');
const LOCAL_DIR = path.resolve(process.cwd(), 'data');
const SHARED_FILE = path.join(SHARED_DIR, 'governance_store.json');
const LOCAL_FILE = path.join(LOCAL_DIR, 'db.json');

export interface TransparencyStoreData {
  challenges: any[];
  solutions: any[];
  districts: any[];
  impact: any;
  lineage: Record<string, any>;
  contractors: any[];
  nonCompliance: any[];
  infrastructure: any[];
  subscriptions: any[];
}

class TransparencyStorageEngine {
  private filePath: string;
  private data: TransparencyStoreData;

  constructor() {
    if (fs.existsSync(SHARED_DIR) || fs.existsSync(path.resolve(process.cwd(), '..', 'Government_Command_Jharkhand'))) {
      if (!fs.existsSync(SHARED_DIR)) {
        try { fs.mkdirSync(SHARED_DIR, { recursive: true }); } catch (e) {}
      }
      this.filePath = SHARED_FILE;
    } else {
      if (!fs.existsSync(LOCAL_DIR)) {
        try { fs.mkdirSync(LOCAL_DIR, { recursive: true }); } catch (e) {}
      }
      this.filePath = LOCAL_FILE;
    }

    this.data = this.loadData();
  }

  private loadData(): TransparencyStoreData {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed) {
          return {
            challenges: parsed.publicChallenges || parsed.problems || PUBLIC_CHALLENGES,
            solutions: parsed.solutions || PUBLIC_SOLUTIONS,
            districts: parsed.districts || JHARKHAND_DISTRICTS,
            impact: parsed.impact || STATE_WIDE_STATS,
            lineage: parsed.lineage || LINEAGE_DATA,
            contractors: parsed.contractors || CONTRACTOR_PERFORMANCES,
            nonCompliance: parsed.nonCompliance || CONTRACTUAL_NON_COMPLIANCE_CASES,
            infrastructure: parsed.infrastructure || PUBLIC_INFRASTRUCTURE_ASSETS,
            subscriptions: parsed.subscriptions || [],
          };
        }
      }
    } catch (e) {
      console.warn('Transparency store load error, using default seed:', e);
    }

    return {
      challenges: PUBLIC_CHALLENGES,
      solutions: PUBLIC_SOLUTIONS,
      districts: JHARKHAND_DISTRICTS,
      impact: STATE_WIDE_STATS,
      lineage: LINEAGE_DATA,
      contractors: CONTRACTOR_PERFORMANCES,
      nonCompliance: CONTRACTUAL_NON_COMPLIANCE_CASES,
      infrastructure: PUBLIC_INFRASTRUCTURE_ASSETS,
      subscriptions: [],
    };
  }

  public saveData(): void {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error saving TransparencyStore:', e);
    }
  }

  // Overview
  public getOverview() {
    const total = this.data.challenges.length;
    const resolved = this.data.challenges.filter(c => c.status === 'Resolved' || c.status === 'Verified').length;
    const inProgress = this.data.challenges.filter(c => c.status === 'In Progress' || c.status === 'Under Action').length;
    const activeProjects = this.data.solutions.length;

    return {
      totalReported: total,
      totalResolved: resolved,
      resolutionRate: Math.round((resolved / (total || 1)) * 100),
      underAction: inProgress,
      activeProjectsCount: activeProjects,
      totalBeneficiaries: 142850,
      totalExpenditureINR: '₹ 4.82 Cr',
      publicTrustIndex: '94.2%',
    };
  }

  // Challenges
  public getChallenges(filter?: { district?: string; category?: string; query?: string; status?: string }) {
    let list = [...this.data.challenges];
    if (filter?.district && filter.district !== 'All') {
      list = list.filter(c => c.district?.toLowerCase() === filter.district?.toLowerCase() || c.location?.district?.toLowerCase() === filter.district?.toLowerCase());
    }
    if (filter?.category && filter.category !== 'All') {
      list = list.filter(c => c.category?.toLowerCase() === filter.category?.toLowerCase());
    }
    if (filter?.status && filter.status !== 'All') {
      list = list.filter(c => c.status?.toLowerCase() === filter.status?.toLowerCase());
    }
    if (filter?.query) {
      const q = filter.query.toLowerCase();
      list = list.filter(c => 
        (c.title && c.title.toLowerCase().includes(q)) ||
        (c.description && c.description.toLowerCase().includes(q)) ||
        (c.id && c.id.toLowerCase().includes(q)) ||
        (c.block && c.block.toLowerCase().includes(q))
      );
    }
    return list;
  }

  public getChallengeById(id: string) {
    return this.data.challenges.find(c => c.id?.toLowerCase() === id.toLowerCase());
  }

  public getLineage(challengeId: string) {
    return this.data.lineage[challengeId] || null;
  }

  // Districts
  public getDistricts() {
    return this.data.districts;
  }

  // Solutions
  public getSolutions() {
    return this.data.solutions;
  }

  // Accountability
  public getAccountabilityData() {
    return {
      contractors: this.data.contractors,
      nonCompliance: this.data.nonCompliance,
      infrastructure: this.data.infrastructure,
      delayedProjects: this.data.challenges.filter(c => c.isDelayed || c.slaStatus === 'Breached')
    };
  }

  // Subscription
  public addSubscription(sub: { topic: string; contact: string; method: string }) {
    const entry = {
      id: `sub-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...sub
    };
    this.data.subscriptions.push(entry);
    this.saveData();
    return entry;
  }
}

export const transparencyStorage = new TransparencyStorageEngine();
