import React, { useState } from 'react';
import { 
  PUBLIC_INFRASTRUCTURE_ASSETS, 
  CONTRACTOR_PERFORMANCES
} from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';
import { 
  ShieldCheck, AlertTriangle, Building2, FileText, CheckCircle2, 
  Clock, Search, AlertCircle, FileCheck, Scale, Lock, Users, ChevronRight,
  ExternalLink
} from 'lucide-react';

const DEPARTMENT_SLA_STATS = [
  { department: 'Drinking Water & Sanitation', statutorySlaDays: 7, complianceRate: 91, totalReceived: 1240, resolvedWithinSla: 1128, escalatedCases: 112, avgResolutionDays: 5.2 },
  { department: 'Rural Works Department', statutorySlaDays: 14, complianceRate: 85, totalReceived: 850, resolvedWithinSla: 722, escalatedCases: 128, avgResolutionDays: 11.4 },
];

const PUBLIC_INTEGRITY_STATS = {
  anonymousReportsCount: 2450,
  investigatedCount: 420,
  officialFindingsIssued: 86,
  penalizedContractors: 14,
  debarredContractors: 3
};

interface AccountabilityViewProps {
  onOpenAssetDetails?: (assetId: string) => void;
}

import { CONTRACTUAL_NON_COMPLIANCE_CASES } from "../data/mockData";

export const AccountabilityView: React.FC<AccountabilityViewProps> = () => {
  const [subTab, setSubTab] = useState<'infrastructure' | 'noncompliance' | 'contractors' | 'sla' | 'integrity'>('infrastructure');
  const [assetSearch, setAssetSearch] = useState('');
  const [contractorSearch, setContractorSearch] = useState('');

  const filteredAssets = PUBLIC_INFRASTRUCTURE_ASSETS.filter(a =>
    a.assetId.toLowerCase().includes(assetSearch.toLowerCase()) ||
    a.name.toLowerCase().includes(assetSearch.toLowerCase()) ||
    a.contractorName.toLowerCase().includes(assetSearch.toLowerCase()) ||
    a.district.toLowerCase().includes(assetSearch.toLowerCase())
  );

  const nonCompliantAssets = PUBLIC_INFRASTRUCTURE_ASSETS.filter(a => a.nonComplianceCaseId !== undefined);

  return (
    <div className="space-y-3">
      
      {/* View Header */}
      <div className="bg-white rounded border border-slate-200 p-4 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-xs font-mono font-bold rounded">
                Sections 7 & 8
              </span>
              <h1 className="text-2xl font-bold text-slate-900">
                State Accountability & Contract Transparency Wall
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-3xl">
              Proactive disclosure of public infrastructure assets, defect liability warranties, verified contractual non-compliance orders, contractor track records, and anonymized anti-corruption integrity statistics.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs text-emerald-950 font-semibold self-start md:self-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Statutory Audit Synchronized</span>
          </div>
        </div>

        {/* Due Process Policy Note */}
        <div className="mt-4 p-3 bg-amber-50/80 border border-amber-200 rounded-lg text-xs text-amber-950 flex items-start gap-2.5">
          <Scale className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold text-amber-900 mb-0.5">Due Process & Legal Substantiation Mandate:</strong>
            JanaSamadhan never labels a contractor guilty based solely on a citizen complaint. We strictly distinguish: 
            <span className="font-semibold text-slate-800"> Citizen Complaint → Field Verification → Technical Audit Investigation → Official Finding → Verified Contractual Non-Compliance Order</span>.
          </div>
        </div>
      </div>

      {/* Sub-tabs Navigation */}
      <div className="bg-white rounded border border-slate-200 p-2 shadow-2xs flex flex-wrap gap-1 text-xs font-semibold">
        <button
          onClick={() => setSubTab('infrastructure')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
            subTab === 'infrastructure'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Infrastructure Asset Registry ({PUBLIC_INFRASTRUCTURE_ASSETS.length})</span>
        </button>

        <button
          onClick={() => setSubTab('noncompliance')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
            subTab === 'noncompliance'
              ? 'bg-rose-700 text-white shadow-2xs'
              : 'text-rose-700 hover:bg-rose-50'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Verified Contractual Non-Compliance ({nonCompliantAssets.length})</span>
        </button>

        <button
          onClick={() => setSubTab('contractors')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
            subTab === 'contractors'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Contractor Performance Index ({CONTRACTOR_PERFORMANCES.length})</span>
        </button>

        <button
          onClick={() => setSubTab('sla')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
            subTab === 'sla'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Department SLA Compliance</span>
        </button>

        <button
          onClick={() => setSubTab('integrity')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
            subTab === 'integrity'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Public Integrity & Whistleblower Protection</span>
        </button>
      </div>

      {/* ======================= TAB 1: INFRASTRUCTURE ASSET REGISTRY ======================= */}
      {subTab === 'infrastructure' && (
        <div className="space-y-4">
          <div className="bg-white rounded border border-slate-200 p-4 shadow-2xs flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={assetSearch}
                onChange={e => setAssetSearch(e.target.value)}
                placeholder="Search Asset ID (e.g. RD-JH-45821), name, or contractor..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <span className="text-xs text-slate-500">
              Showing <strong>{filteredAssets.length}</strong> public asset records
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAssets.map(asset => {
              const nc = asset.nonComplianceCaseId ? CONTRACTUAL_NON_COMPLIANCE_CASES.find(c => c.caseId === asset.nonComplianceCaseId) || (asset.nonComplianceCaseId as any) : null;
              return (
              <div
                key={asset.assetId}
                className="bg-white rounded border border-slate-200 p-5 shadow-2xs hover:shadow-xs transition space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
                        {asset.assetId}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 font-medium rounded">
                        {asset.category}
                      </span>
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      asset.defectLiabilityStatus === 'Active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {asset.defectLiabilityStatus}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {asset.name}
                  </h3>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Contractor</span>
                      <strong className="text-slate-900">{asset.contractorName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Supervising Engineer</span>
                      <span>{asset.department}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Contract Value</span>
                      <span className="font-mono font-semibold text-slate-900">{asset.contractValue}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Warranty Expiry</span>
                      <span className="font-mono text-emerald-800">{asset.defectLiabilityExpiry}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-xs px-1">
                    <span className="text-slate-500">
                      Condition: <strong className="text-rose-700">{asset.currentCondition}</strong>
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      Built: {asset.completionDate}
                    </span>
                  </div>
                </div>

                {nc && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-rose-800 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Official Finding: {nc.status}</span>
                    </div>
                    <p className="text-slate-700 text-[11px]">
                      Order: <span className="font-mono font-bold">{nc.caseId}</span> — {nc.officialFinding}
                    </p>
                  </div>
                )}
              </div>
            ); })}
          </div>
        </div>
      )}

      {/* ======================= TAB 2: VERIFIED NON-COMPLIANCE ORDERS ======================= */}
      {subTab === 'noncompliance' && (
        <div className="space-y-4">
          <div className="p-4 bg-rose-50 border border-rose-200 rounded text-xs text-rose-950">
            <h4 className="font-bold text-sm text-rose-900 mb-1 flex items-center gap-2">
              <Scale className="w-4 h-4 text-rose-700" />
              <span>Gazetted Contractual Non-Compliance Ledger</span>
            </h4>
            <p className="text-slate-700 leading-relaxed">
              Records below reflect official executive orders where physical testing or laboratory audits confirmed contractor breach of contract or substandard quality within the statutory Defect Liability Period.
            </p>
          </div>

          <div className="space-y-4">
            {nonCompliantAssets.map(asset => {
              const nc = CONTRACTUAL_NON_COMPLIANCE_CASES.find(c => c.caseId === asset.nonComplianceCaseId) || (asset.nonComplianceCaseId as any);
              return (
                <div
                  key={asset.assetId}
                  className="bg-white rounded border border-rose-200 p-5 shadow-2xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-rose-900 bg-rose-100 px-2 py-0.5 rounded">
                          Order #{nc.caseId}
                        </span>
                        <StatusBadge status="Official" size="sm" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">
                        {asset.name} ({asset.assetId})
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-rose-700 block">
                        Finding: {nc.status}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Audited on {nc.officialInspectionDate}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Contractor Entity</span>
                      <strong className="text-slate-900 block text-sm">{asset.contractorName}</strong>
                      <span className="text-slate-500 text-[11px]">Supervised by: {asset.department}</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Nature of Verified Non-Compliance</span>
                      <p className="text-slate-800 font-medium leading-relaxed">{nc.defectDescription}</p>
                    </div>

                    <div className="p-3 bg-rose-50/60 rounded-lg border border-rose-200 space-y-1">
                      <span className="text-rose-900 block text-[10px] uppercase font-semibold">Enforced Statutory Action</span>
                      <p className="text-rose-900 font-bold leading-relaxed">{nc.officialFinding}</p>
                    </div>
                  </div>

                  {/* Audit Evidence Note */}
                  <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-600 flex items-center justify-between">
                    <span className="font-mono text-[11px]">
                      Inspection Report ref: {nc.caseId}
                    </span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Order Gazetted & Enforced</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================= TAB 3: CONTRACTOR PERFORMANCE RECORDS ======================= */}
      {subTab === 'contractors' && (
        <div className="space-y-4">
          <div className="bg-white rounded border border-slate-200 p-4 shadow-2xs flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={contractorSearch}
                onChange={e => setContractorSearch(e.target.value)}
                placeholder="Search contractor firm name or registration ID..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <span className="text-xs text-slate-500">
              State Contractor Evaluation Matrix
            </span>
          </div>

          <div className="space-y-3">
            {CONTRACTOR_PERFORMANCES.map(c => (
              <div
                key={c.contractorId}
                className="bg-white rounded border border-slate-200 p-5 shadow-2xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {c.contractorId}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                        c.debarmentStatus === 'Clear' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {c.complianceRating}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{c.name}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">Performance Index</span>
                      <span className="text-2xl font-extrabold font-mono text-slate-900">
                        {(c.contractualSlaCompliance / 10).toFixed(1)} <span className="text-xs text-slate-400 font-normal">/ 10</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Completed Projects</span>
                    <strong className="text-base font-mono text-slate-900">{c.completedProjectsCount}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">On-Schedule Rate</span>
                    <strong className="text-base font-mono text-emerald-700">{c.contractualSlaCompliance}%</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Defects During Warranty</span>
                    <strong className={`text-base font-mono ${c.verifiedDefectsCount > 0 ? 'text-rose-700' : 'text-slate-900'}`}>
                      {c.verifiedDefectsCount}
                    </strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Active Contracts</span>
                    <strong className="text-base font-mono text-indigo-700">{c.activeProjectsCount}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= TAB 4: DEPARTMENT SLA PERFORMANCE ======================= */}
      {subTab === 'sla' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEPARTMENT_SLA_STATS.map(dept => (
              <div
                key={dept.department}
                className="bg-white rounded border border-slate-200 p-5 shadow-2xs space-y-4"
              >
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{dept.department}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Statutory SLA: {dept.statutorySlaDays} days maximum resolution
                    </p>
                  </div>
                  <span className="text-xl font-extrabold font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    {dept.complianceRate}% SLA
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Total Received</span>
                    <strong className="font-mono text-slate-900">{dept.totalReceived}</strong>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Resolved In SLA</span>
                    <strong className="font-mono text-emerald-700">{dept.resolvedWithinSla}</strong>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Escalated</span>
                    <strong className="font-mono text-rose-700">{dept.escalatedCases}</strong>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex justify-between">
                  <span>Avg resolution turnaround: <strong>{dept.avgResolutionDays} days</strong></span>
                  <span className="text-emerald-700 font-semibold">Under Monitoring</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= TAB 5: PUBLIC INTEGRITY & WHISTLEBLOWER ======================= */}
      {subTab === 'integrity' && (
        <div className="space-y-5">
          <div className="p-5 bg-slate-900 text-white rounded-lg border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Lock className="w-4 h-4" />
              <span>STRICT ANONYMITY & WHISTLEBLOWER SHIELD</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Public Integrity Statistics & Anti-Corruption Governance
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Aggregated disclosure of anonymous tip-offs and integrity inquiries. Zero Personally Identifiable Information (PII) is published, ensuring whistleblowers and anti-corruption respondents remain completely protected from retribution.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-white rounded border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500 block">Anonymous Reports Logged</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1 block">
                {PUBLIC_INTEGRITY_STATS.anonymousReportsCount}
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold">Cryptographically shielded</span>
            </div>

            <div className="p-4 bg-white rounded border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500 block">Investigated Cases</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-700 font-mono mt-1 block">
                {PUBLIC_INTEGRITY_STATS.investigatedCount}
              </span>
              <span className="text-[10px] text-slate-500">Formally probed</span>
            </div>

            <div className="p-4 bg-white rounded border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500 block">Official Findings Issued</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-mono mt-1 block">
                {PUBLIC_INTEGRITY_STATS.officialFindingsIssued}
              </span>
              <span className="text-[10px] text-slate-500">Statutory notices</span>
            </div>

            <div className="p-4 bg-white rounded border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500 block">Contractors Penalized</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-rose-700 font-mono mt-1 block">
                {PUBLIC_INTEGRITY_STATS.penalizedContractors}
              </span>
              <span className="text-[10px] text-rose-600 font-semibold">{PUBLIC_INTEGRITY_STATS.debarredContractors} debarred</span>
            </div>
          </div>

          {/* Whistleblower Safeguard Commitments */}
          <div className="bg-slate-50 rounded border border-slate-200 p-5 space-y-3 text-xs">
            <h4 className="font-bold text-sm text-slate-900">
              Statutory Protections for Citizen Reporting
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-600">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <strong className="block text-slate-900 mb-1">Zero Identity Storage</strong>
                No names, phone numbers, or IP addresses are linked to public audit records or exported datasets.
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <strong className="block text-slate-900 mb-1">Decoupled Telemetry</strong>
                GPS metadata is truncated to administrative panchayat centroids to prevent locating exact households.
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <strong className="block text-slate-900 mb-1">Independent Vigilance</strong>
                Inquiries are monitored by the Lokayukta and State Vigilance Commission with machine-audited milestones.
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
