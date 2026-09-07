import React, { useState } from 'react';
import { 
  PUBLIC_SOLUTIONS
} from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';
import { PublicSolution, DataLineageDetails } from '../types';
import { 
  BarChart3, TrendingUp, Users, Droplet, Zap, HeartPulse, 
  GraduationCap, Trees, CopyCheck, ArrowRight, CheckCircle2, 
  ExternalLink, Eye, ChevronRight
} from 'lucide-react';

const EXPECTED_VS_ACTUAL_METRICS = [
  { domain: 'Water', metricName: 'Active Pumps', expected: '10,000', reported: '9,500', measured: '8,200', verified: '8,150', verificationAuthority: 'Third Party Audit', lastAuditDate: '2026-08-01', calculationMethod: 'IoT Sensor + Manual' }
];

const DOMAIN_ANALYTICS = [
  { domain: 'Water & Sanitation', indicators: [{ label: 'Clean Water Access', dataStatus: 'Verified', value: '85%', source: 'Sensors' }] },
  { domain: 'Health', indicators: [{ label: 'PHC Availability', dataStatus: 'Official', value: '92%', source: 'Health Dept' }] }
];

interface ImpactViewProps {
  onOpenReplication: (solution: PublicSolution) => void;
  onOpenLineage: (lineage: DataLineageDetails) => void;
}

export const ImpactView: React.FC<ImpactViewProps> = ({
  onOpenReplication,
  onOpenLineage
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'expectedVsActual' | 'domains' | 'solutions'>('overview');
  const [selectedDomain, setSelectedDomain] = useState<string>('Water & Sanitation');

  const domainData = DOMAIN_ANALYTICS.find(d => d.domain === selectedDomain) || DOMAIN_ANALYTICS[0];

  return (
    <div className="space-y-3">
      
      {/* View Header */}
      <div className="bg-white rounded border border-slate-200 p-4 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-mono font-bold rounded">
                Sections 9, 10 & 11
              </span>
              <h1 className="text-2xl font-bold text-slate-900">
                Societal Impact & Proven Solutions Repository
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-3xl">
              Auditable measurement of real human impact across Jharkhand. Compare claimed vs measured outcomes, explore domain indicators, and request replication of proven solutions.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg text-xs text-indigo-950 font-semibold self-start md:self-auto">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <span>Third-Party Validated Metrics</span>
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="bg-white rounded border border-slate-200 p-2 shadow-2xs flex flex-wrap gap-1 text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
            activeSubTab === 'overview'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>State Impact Funnel</span>
        </button>

        <button
          onClick={() => setActiveSubTab('expectedVsActual')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
            activeSubTab === 'expectedVsActual'
              ? 'bg-emerald-800 text-white shadow-2xs'
              : 'text-emerald-800 hover:bg-emerald-50'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Expected vs Actual Impact ⭐</span>
        </button>

        <button
          onClick={() => setActiveSubTab('domains')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
            activeSubTab === 'domains'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Domain Analytics (Water, Health...)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('solutions')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
            activeSubTab === 'solutions'
              ? 'bg-indigo-700 text-white shadow-2xs'
              : 'text-indigo-700 hover:bg-indigo-50'
          }`}
        >
          <CopyCheck className="w-4 h-4" />
          <span>Proven Solutions Repository ({PUBLIC_SOLUTIONS.length})</span>
        </button>
      </div>

      {/* ======================= TAB 1: STATE IMPACT FUNNEL ======================= */}
      {activeSubTab === 'overview' && (
        <div className="space-y-3">
          {/* Funnel Card */}
          <div className="bg-white rounded border border-slate-200 p-4 shadow-2xs space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                The JanaSamadhan Statewide Transformation Funnel
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Progression of citizen issues through formal triage, R&D projects, and verified community scale.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-1">
                <span className="text-xs text-slate-500 font-semibold">1. Reported by Citizens</span>
                <span className="text-3xl font-black font-mono text-slate-900 block">34,180</span>
                <span className="text-[10px] text-slate-500">Across 24 districts</span>
              </div>

              <div className="p-4 bg-blue-50/60 rounded border border-blue-200 space-y-1">
                <span className="text-xs text-blue-800 font-semibold">2. Officially Verified</span>
                <span className="text-3xl font-black font-mono text-blue-900 block">29,420</span>
                <span className="text-[10px] text-blue-700 font-medium">86.1% triage validation</span>
              </div>

              <div className="p-4 bg-indigo-50/60 rounded border border-indigo-200 space-y-1">
                <span className="text-xs text-indigo-800 font-semibold">3. Actions & Pilots</span>
                <span className="text-3xl font-black font-mono text-indigo-900 block">22,350</span>
                <span className="text-[10px] text-indigo-700 font-medium">84 active R&D pilots</span>
              </div>

              <div className="p-4 bg-emerald-50/60 rounded border border-emerald-200 space-y-1">
                <span className="text-xs text-emerald-800 font-semibold">4. Resolved & Deployed</span>
                <span className="text-3xl font-black font-mono text-emerald-900 block">18,290</span>
                <span className="text-[10px] text-emerald-700 font-bold">142 scaled solutions</span>
              </div>
            </div>

            {/* Visual Funnel Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div className="bg-slate-400 h-full" style={{ width: '100%' }} title="Reported (100%)" />
                <div className="bg-blue-500 h-full" style={{ width: '86%' }} title="Verified (86%)" />
                <div className="bg-indigo-600 h-full" style={{ width: '65%' }} title="Piloted (65%)" />
                <div className="bg-emerald-600 h-full" style={{ width: '53%' }} title="Resolved (53%)" />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>34,180 Inflow</span>
                <span className="text-emerald-700 font-bold">53.5% Overall Ground Resolution Rate</span>
              </div>
            </div>
          </div>

          {/* People Impacted & Public Funding Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded border border-slate-200 p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">People Impacted Breakdown</h4>
                <StatusBadge status="Estimated" size="sm" />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-600">Total Statewide Beneficiaries</span>
                  <span className="font-mono font-bold text-emerald-800 text-sm">1,240,000</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-600">Direct Beneficiaries (Habitation Census)</span>
                  <span className="font-mono font-semibold text-slate-800">485,000</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-600">Indirect Beneficiaries (Catchment GIS Buffer)</span>
                  <span className="font-mono font-semibold text-slate-800">755,000</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded border border-slate-200 p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">Public & CSR Funding Tracked</h4>
                <StatusBadge status="Official" size="sm" />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-600">Total Public Funds Tracked</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">₹84.6 Crores</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-600">CSR Industry Grants Mobilized</span>
                  <span className="font-mono font-semibold text-indigo-700">₹26.4 Crores</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-600">Academic R&D Grants Disbursed</span>
                  <span className="font-mono font-semibold text-emerald-700">₹14.8 Crores</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= TAB 2: EXPECTED VS ACTUAL IMPACT ======================= */}
      {activeSubTab === 'expectedVsActual' && (
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-950">
            <h4 className="font-bold text-sm text-emerald-900 mb-1 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-700" />
              <span>The 4-Stage Impact Verification Ladder</span>
            </h4>
            <p className="text-slate-700 leading-relaxed">
              To stop claimed government numbers from misleading the public, JanaSamadhan uses a strict 4-step pipeline:
              <strong className="text-slate-900"> Expected → Reported → Measured → Verified</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXPECTED_VS_ACTUAL_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="bg-white rounded border border-slate-200 p-5 shadow-2xs space-y-4"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase tracking-wider block">
                    Domain: {metric.domain}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {metric.metricName}
                  </h3>
                </div>

                {/* 4-Stage Comparison Bar */}
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-400 block font-semibold">1. Expected</span>
                    <span className="font-mono font-bold text-slate-700 text-sm">{metric.expected}</span>
                  </div>

                  <div className="p-2.5 bg-amber-50/80 rounded-lg border border-amber-200 text-center">
                    <span className="text-[10px] text-amber-700 block font-semibold">2. Reported</span>
                    <span className="font-mono font-bold text-amber-900 text-sm">{metric.reported}</span>
                  </div>

                  <div className="p-2.5 bg-blue-50/80 rounded-lg border border-blue-200 text-center">
                    <span className="text-[10px] text-blue-700 block font-semibold">3. Measured</span>
                    <span className="font-mono font-bold text-blue-900 text-sm">{metric.measured}</span>
                  </div>

                  <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-300 text-center ring-1 ring-emerald-500/20">
                    <span className="text-[10px] text-emerald-800 block font-bold">4. Verified ✓</span>
                    <span className="font-mono font-black text-emerald-900 text-sm">{metric.verified}</span>
                  </div>
                </div>

                {/* Verification Authority & Timeline */}
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Audit Authority: <strong>{metric.verificationAuthority}</strong></span>
                    <span className="font-mono text-[11px]">{metric.lastAuditDate}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Formula: <code className="bg-white px-1 rounded border border-slate-200">{metric.calculationMethod}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= TAB 3: DOMAIN-SPECIFIC ANALYTICS ======================= */}
      {activeSubTab === 'domains' && (
        <div className="space-y-4">
          {/* Domain Picker Pills */}
          <div className="flex flex-wrap gap-2">
            {DOMAIN_ANALYTICS.map(d => (
              <button
                key={d.domain}
                onClick={() => setSelectedDomain(d.domain)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                  selectedDomain === d.domain
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {d.domain}
              </button>
            ))}
          </div>

          {/* Selected Domain Card */}
          <div className="bg-white rounded border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{domainData.domain} Indicators</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Live domain telemetry synced with department data engines.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded">
                State Priority Sector
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {domainData.indicators.map((ind, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded border border-slate-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-slate-600 font-medium">{ind.label}</span>
                    <StatusBadge status={ind.dataStatus} size="sm" />
                  </div>
                  <span className="text-2xl font-black font-mono text-slate-900 block">
                    {ind.value}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Source: {ind.source}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================= TAB 4: PROVEN SOLUTIONS REPOSITORY ======================= */}
      {activeSubTab === 'solutions' && (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded text-xs text-indigo-950 flex items-start justify-between gap-4">
            <div>
              <h4 className="font-bold text-sm text-indigo-900 mb-1 flex items-center gap-2">
                <CopyCheck className="w-4 h-4 text-indigo-700" />
                <span>Proven Solutions Ready for Cross-District Replication</span>
              </h4>
              <p className="text-slate-700 leading-relaxed">
                These innovations have surpassed Technology Readiness Level 7 (field tested & demonstrated) with measured societal impact. Any block development officer or district collector can request adoption into their jurisdiction.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PUBLIC_SOLUTIONS.map(sol => (
              <div
                key={sol.solutionId}
                className="bg-white rounded border border-slate-200 p-5 shadow-2xs hover:shadow-xs transition space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {sol.solutionId}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">
                        TRL {sol.trl}
                      </span>
                    </div>
                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 font-medium rounded">
                      {sol.domain}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {sol.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {sol.name}
                  </p>

                  <div className="mt-3.5 space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between">
                      <span className="text-slate-500">Developer & Lab</span>
                      <strong className="text-slate-900">{sol.developedBy}</strong>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between">
                      <span className="text-slate-500">Current Deployment</span>
                      <strong className="text-slate-900 font-mono">
                        {sol.villagesDeployed} villages ({sol.peopleImpacted.toLocaleString()} people)
                      </strong>
                    </div>

                    <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-lg text-emerald-950">
                      <strong className="block text-emerald-900 text-[11px] uppercase tracking-wider">Measured Impact:</strong>
                      <span className="font-medium font-mono text-[11px]">{sol.measuredImpactMetric}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">
                    License: <strong className="text-slate-700">{sol.licensingType}</strong>
                  </span>
                  <button
                    onClick={() => onOpenReplication(sol)}
                    className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg flex items-center gap-1.5 transition shadow-2xs"
                  >
                    <CopyCheck className="w-3.5 h-3.5" />
                    <span>Request Replication</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
