import React, { useState } from 'react';
import { STATE_WIDE_STATS, LINEAGE_DATA, PUBLIC_CHALLENGES } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';
import { JharkhandMap } from '../components/JharkhandMap';
import { DataLineageDetails, DistrictMetric } from '../types';
import { 
  Activity, Server, ShieldCheck, MapPin, ChevronRight, 
  Search, AlertTriangle, Radio, BarChart3, Clock
} from 'lucide-react';

interface DashboardHomeProps {
  onOpenChallenge: (challengeId: string) => void;
  onOpenProject: (projectId: string) => void;
  onSelectDistrict: (district: DistrictMetric) => void;
  onOpenLineage: (lineage: DataLineageDetails) => void;
  onNavigateTab: (tab: string) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  onOpenChallenge,
  onOpenProject,
  onSelectDistrict,
  onOpenLineage,
  onNavigateTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const recentPulses = PUBLIC_CHALLENGES.slice(0, 3);

  return (
    <div className="flex flex-col gap-4 pb-12 w-full max-w-full">
      
      {/* 1. HIGH-DENSITY SEARCH & HERO */}
      <section className="bg-slate-900 border border-slate-800 rounded-lg p-5 flex flex-col md:flex-row gap-6 items-center justify-between text-white shadow-md">
        <div className="max-w-xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-mono font-bold tracking-widest uppercase">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Jharkhand Live Public Record</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Independent Transparency & Accountability Utility
          </h1>
          <p className="text-xs text-slate-400">
            Real-time public scrutiny of state projects, contracts, and citizen grievances.
          </p>
        </div>
        
        <div className="w-full md:w-96 shrink-0 relative">
          <input 
            type="text" 
            placeholder="Search districts, projects, contractors, or IDs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded font-mono text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-slate-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <div className="absolute right-2 top-2 bg-slate-700 text-[10px] text-slate-300 px-2 py-1 rounded font-bold">
            CTRL+K
          </div>
        </div>
      </section>

      {/* 2. REAL-TIME PULSE / CRITICAL ALERTS */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-2">
          {STATE_WIDE_STATS.slice(0, 8).map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-200 rounded p-3 flex flex-col justify-between group hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight line-clamp-1">
                  {stat.label}
                </span>
                <StatusBadge status={stat.status} size="sm" showIcon={false} className="text-[9px]" />
              </div>
              <div className="flex items-baseline justify-between mt-auto">
                <span className="text-xl font-black font-mono text-slate-900 tracking-tight">
                  {stat.value}
                </span>
                <button
                  onClick={() => onOpenLineage(LINEAGE_DATA[stat.lineageKey as string])}
                  className="text-[9px] text-emerald-600 font-semibold hover:underline"
                >
                  Source
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-rose-50 border border-rose-200 rounded p-3 flex flex-col">
          <div className="flex items-center gap-1.5 text-rose-800 mb-3">
            <AlertTriangle className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Critical Alerts</h3>
          </div>
          <div className="space-y-2 flex-1 overflow-y-auto pr-1">
            {recentPulses.map((pulse, idx) => (
              <div key={idx} className="bg-white border border-rose-100 rounded p-2 text-[10px] hover:shadow-2xs transition-shadow cursor-pointer" onClick={() => onOpenChallenge(pulse.id)}>
                <div className="flex justify-between font-mono mb-1">
                  <span className="font-bold text-rose-700">{pulse.id}</span>
                  <span className="text-slate-400">{pulse.dateReported}</span>
                </div>
                <p className="text-slate-700 line-clamp-2 leading-tight">{pulse.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MAP & QUICK UTILITY LINKS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Geographic Monitor */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>State Geographic Monitor</span>
              </h2>
              <p className="text-[10px] text-slate-500 mt-0.5">Live drill-down into district-level anomalies and accountability metrics.</p>
            </div>
            <button
              onClick={() => onNavigateTab('districts')}
              className="text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded transition-colors"
            >
              All Districts
            </button>
          </div>
          <div className="h-[400px] bg-slate-50 rounded border border-slate-100 relative overflow-hidden">
             <JharkhandMap
              selectedDistrict={null}
              onSelectDistrict={onSelectDistrict}
            />
          </div>
        </div>

        {/* Dense Utility Nav */}
        <div className="bg-slate-900 border border-slate-800 rounded p-4 text-white flex flex-col">
          <h2 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-4">
            <Server className="w-4 h-4" />
            <span>Utility Modules</span>
          </h2>
          
          <div className="flex-1 flex flex-col gap-2">
            <button
              onClick={() => onNavigateTab('explore')}
              className="flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors text-left group"
            >
              <div>
                <span className="text-xs font-bold block text-white group-hover:text-emerald-300 transition-colors">Public Problem Explorer</span>
                <span className="text-[10px] text-slate-400">Search & track all verified civic challenges</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
            </button>

            <button
              onClick={() => onNavigateTab('accountability')}
              className="flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors text-left group"
            >
              <div>
                <span className="text-xs font-bold block text-white group-hover:text-emerald-300 transition-colors">Contract Accountability</span>
                <span className="text-[10px] text-slate-400">Contractor compliance & reality checks</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
            </button>

            <button
              onClick={() => onNavigateTab('impact')}
              className="flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors text-left group"
            >
              <div>
                <span className="text-xs font-bold block text-white group-hover:text-emerald-300 transition-colors">Impact Analytics</span>
                <span className="text-[10px] text-slate-400">Statewide domain & district breakdowns</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
            </button>

            <div className="mt-auto pt-4 flex flex-col gap-1.5 border-t border-slate-800">
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>SYSTEM STATUS</span>
                <span className="text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> ONLINE</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>LAST DATA SYNC</span>
                <span>Just now</span>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};
