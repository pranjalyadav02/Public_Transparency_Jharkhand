import React, { useState } from 'react';
import { JHARKHAND_DISTRICTS, PUBLIC_CHALLENGES, PUBLIC_INFRASTRUCTURE_ASSETS } from '../data/mockData';
import { DistrictMetric } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { 
  MapPin, Search, Building2, CheckCircle2, AlertCircle, 
  ShieldCheck, ArrowRight, ExternalLink, Filter, ChevronRight,
  TrendingUp, Users, Calendar
} from 'lucide-react';

interface DistrictsViewProps {
  selectedDistrict: DistrictMetric | null;
  onSelectDistrict: (district: DistrictMetric) => void;
  onOpenChallenge: (challengeId: string) => void;
  onOpenSubscribe?: (topic: string) => void;
}

export const DistrictsView: React.FC<DistrictsViewProps> = ({
  selectedDistrict,
  onSelectDistrict,
  onOpenChallenge,
  onOpenSubscribe
}) => {
  const [districtSearch, setDistrictSearch] = useState('');
  const [activeDistrict, setActiveDistrict] = useState<DistrictMetric>(
    selectedDistrict || JHARKHAND_DISTRICTS[0] // Default to Gumla
  );
  const [selectedBlockFilter, setSelectedBlockFilter] = useState<string>('All');

  const filteredDistrictsList = JHARKHAND_DISTRICTS.filter(d =>
    d.name.toLowerCase().includes(districtSearch.toLowerCase()) ||
    d.headquarters.toLowerCase().includes(districtSearch.toLowerCase())
  );

  // Challenges in currently active district
  const districtChallenges = PUBLIC_CHALLENGES.filter(c => c.district === activeDistrict.name);
  
  // Infrastructure in currently active district
  const districtInfrastructure = PUBLIC_INFRASTRUCTURE_ASSETS.filter(a => a.district === activeDistrict.name);

  return (
    <div className="space-y-3">
      
      {/* View Header */}
      <div className="bg-white rounded border border-slate-200 p-4 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-mono font-bold rounded">
                Sections 5 & 6
              </span>
              <h1 className="text-2xl font-bold text-slate-900">
                District & Local Block Transparency
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-3xl">
              Transparent, block-by-block governance tracking for all 24 administrative districts of Jharkhand. Audit local SLAs, municipal infrastructure defects, and citizen reality check scores.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Active District:</span>
            <span className="px-3 py-1 bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-2xs">
              {activeDistrict.name}
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout: Left District Selector, Right Active District Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* LEFT COLUMN: All 24 Districts List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white rounded border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>All 24 Districts of Jharkhand</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">24 Districts</span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={districtSearch}
                onChange={e => setDistrictSearch(e.target.value)}
                placeholder="Search district name or HQ..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1.5 max-h-[640px] overflow-y-auto pr-1 text-xs">
              {filteredDistrictsList.map(d => {
                const isSelected = activeDistrict.name === d.name;

                return (
                  <div
                    key={d.name}
                    onClick={() => {
                      setActiveDistrict(d);
                      onSelectDistrict(d);
                    }}
                    className={`p-3 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{d.name}</span>
                        <span className="text-[10px] font-mono text-slate-500">[{d.code}]</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {d.problemsReported} issues • {d.activeProjects} projects • {d.blocks.length} blocks
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-xs text-emerald-700 block">
                        {d.slaCompliance}%
                      </span>
                      <span className="text-[10px] text-slate-400">SLA rate</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Active District Deep Dive Dossier */}
        <div className="lg:col-span-8 space-y-3">

          {/* Active District Scorecard Card */}
          <div className="bg-white rounded border border-slate-200 p-5 sm:p-4 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-slate-900">
                    {activeDistrict.name} District Dossier
                  </h2>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs font-mono font-bold rounded">
                    Code: {activeDistrict.code}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  District HQ: <strong>{activeDistrict.headquarters}</strong> • Population: {activeDistrict.population}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status="Official" size="sm" />
                {onOpenSubscribe && (
                  <button
                    onClick={() => onOpenSubscribe(`District ${activeDistrict.name}`)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
                  >
                    Subscribe to Alerts
                  </button>
                )}
              </div>
            </div>

            {/* 4 Core Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Problems Reported</span>
                <span className="text-2xl font-extrabold text-slate-900 font-mono">{activeDistrict.problemsReported}</span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">{activeDistrict.problemsVerified} verified</span>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">SLA Compliance</span>
                <span className="text-2xl font-extrabold text-emerald-700 font-mono">{activeDistrict.slaCompliance}%</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">{activeDistrict.avgResolutionDays}d avg time</span>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Active Projects</span>
                <span className="text-2xl font-extrabold text-indigo-700 font-mono">{activeDistrict.activeProjects}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">{activeDistrict.solutionsDeployed} deployed</span>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Citizen Reality</span>
                <span className="text-2xl font-extrabold text-blue-700 font-mono">{activeDistrict.communityConfirmationAvg}%</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Audited confirmation</span>
              </div>
            </div>

            {/* SECTION 6: BLOCK-LEVEL SCORECARD */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>Administrative Blocks Breakdown ({activeDistrict.blocks.length} Blocks)</span>
                </h4>
                <span className="text-[11px] text-slate-500">Local Area Transparency Layer</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {activeDistrict.blocks.map(block => (
                  <div
                    key={block.name}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{block.name} Block</span>
                      <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                        {block.slaRate}% SLA
                      </span>
                    </div>
                    <div className="text-slate-600 text-[11px] flex justify-between">
                      <span>Reported: <strong>{block.reported}</strong></span>
                      <span>Resolved: <strong>{block.resolved}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Reported Challenges in this District */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <span>Active Challenges in {activeDistrict.name}</span>
                </h4>
                <span className="text-xs text-slate-500">{districtChallenges.length} cases</span>
              </div>

              {districtChallenges.length > 0 ? (
                <div className="space-y-2">
                  {districtChallenges.map(c => (
                    <div
                      key={c.id}
                      onClick={() => onOpenChallenge(c.id)}
                      className="p-3 bg-slate-50 hover:bg-emerald-50/40 rounded-lg border border-slate-200 cursor-pointer transition flex items-start justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-bold text-emerald-800">{c.id}</span>
                          <span className="font-bold text-slate-900">{c.title}</span>
                        </div>
                        <p className="text-slate-500 line-clamp-1">{c.description}</p>
                        <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-600">
                          <span>{c.village}, {c.block} Block</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-semibold">{c.status}</span>
                        </div>
                      </div>
                      <StatusBadge status={c.dataStatus} size="sm" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-500 bg-slate-50 rounded-lg">
                  No critical escalations logged for {activeDistrict.name} this month.
                </div>
              )}
            </div>

            {/* Local Infrastructure Assets in this District */}
            {districtInfrastructure.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-amber-600" />
                    <span>Public Infrastructure Assets & Defect Liabilities</span>
                  </h4>
                  <span className="text-xs text-slate-500">{districtInfrastructure.length} tracked assets</span>
                </div>

                <div className="space-y-2">
                  {districtInfrastructure.map(asset => (
                    <div
                      key={asset.assetId}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-800">{asset.assetId}</span>
                          <span className="font-bold text-slate-900">{asset.name}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-semibold text-[10px]">
                          {asset.category}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Contractor</span>
                          <strong>{asset.contractorName}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Warranty Window</span>
                          <span>{asset.defectLiabilityExpiry}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Condition</span>
                          <span className="font-semibold text-rose-700">{asset.currentCondition}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
