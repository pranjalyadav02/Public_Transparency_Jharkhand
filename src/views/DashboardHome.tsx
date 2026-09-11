import React, { useState } from 'react';
import { STATE_WIDE_STATS, LINEAGE_DATA } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';
import { JharkhandMap } from '../components/JharkhandMap';
import { DataLineageDetails, DistrictMetric, PublicChallenge } from '../types';
import { 
  Server, ShieldCheck, MapPin, ChevronRight, 
  Search, AlertTriangle, Radio, BarChart3, Clock, ArrowRight,
  FolderOpen, FileCheck2, Scale, Users, CheckCircle2
} from 'lucide-react';

interface DashboardHomeProps {
  onOpenChallenge: (challengeId: string) => void;
  onOpenProject: (projectId: string) => void;
  onSelectDistrict: (district: DistrictMetric) => void;
  onOpenLineage: (lineage: DataLineageDetails) => void;
  onNavigateTab: (tab: string) => void;
  language?: 'en' | 'hi';
  challenges?: PublicChallenge[];
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  onOpenChallenge,
  onOpenProject,
  onSelectDistrict,
  onOpenLineage,
  onNavigateTab,
  language = 'en',
  challenges = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate live numbers
  const totalCount = challenges.length;
  const resolvedCount = challenges.filter(c => c.status === 'Resolved' || c.status === 'Citizen Verified').length;
  const underActionCount = challenges.filter(c => c.status === 'Assigned' || c.status === 'In Progress' || c.status === 'Under Action').length;
  const recentChallenges = challenges.slice(0, 4);

  return (
    <div className="flex flex-col gap-6 pb-12 w-full max-w-full overflow-x-hidden">
      
      {/* 1. HERO BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center justify-between text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>{language === 'hi' ? 'झारखंड स्वतंत्र जन-पारदर्शिता पोर्टल' : 'Jharkhand Sovereign Public Transparency Portal'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {language === 'hi' ? (
              <>स्वतंत्र लोक रिकॉर्ड एवं <span className="text-emerald-400">जवाबदेही रजिस्ट्री</span></>
            ) : (
              <>Independent Public Record & <span className="text-emerald-400">Accountability Registry</span></>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {language === 'hi'
              ? 'राज्य के सभी 24 जिलों में नागरिक शिकायतों, संविदा निष्पादन, विभागीय कार्रवाइयों एवं विकास परियोजनाओं का निष्पक्ष, पारदर्शी एवं वास्तविक समय में अवलोकन।'
              : 'Real-time, verifiable civic scrutiny of citizen grievances, contractor liability, and public works execution across all 24 districts of Jharkhand.'}
          </p>
        </div>
        
        <div className="w-full md:w-80 shrink-0 relative z-10">
          <input 
            type="text" 
            placeholder={language === 'hi' ? 'आईडी, जिला या विषय खोजें...' : 'Search ID, district or topic...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/90 border border-slate-700 text-white rounded-xl font-mono text-xs pl-10 pr-4 py-3.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-slate-400 shadow-inner"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <div className="absolute right-2.5 top-2.5 bg-slate-700 text-[10px] text-slate-300 px-2 py-1 rounded font-bold font-mono">
            CTRL+K
          </div>
        </div>
      </section>

      {/* 2. THREE PRIMARY ACTION CARDS (SIMPLE, CLEAR, INTUITIVE) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Public Problem Explorer */}
        <div
          onClick={() => onNavigateTab('explore')}
          className="group bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-emerald-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <FolderOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {language === 'hi' ? '1. सार्वजनिक समस्याएं व समाधान' : '1. Public Grievances & Solutions'}
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {language === 'hi'
                  ? 'नागरिकों द्वारा दर्ज प्रत्येक समस्या, उस पर प्रशासनिक कार्रवाई, अधिकारी आबंटन और समाधान की स्थिति देखें।'
                  : 'Explore all verified civic challenges, assigned administrative departments, and ground solutions.'}
              </p>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
            <span>{language === 'hi' ? 'समस्या सूची खोलें' : 'Open Public Registry'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: 24-District Interactive Map */}
        <div
          onClick={() => onNavigateTab('districts')}
          className="group bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-blue-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                {language === 'hi' ? '2. 24-जिला भू-मानचित्र' : '2. 24-District Geographic Monitor'}
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {language === 'hi'
                  ? 'झारखंड के किसी भी जिले पर क्लिक करें और वहां की सार्वजनिक बुनियादी ढांचे व समाधान प्रगति का नक्शे पर निरीक्षण करें।'
                  : 'Interactive geospatial map across all 24 districts for district-level accountability and metrics.'}
              </p>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
            <span>{language === 'hi' ? 'नक्शा खोलें' : 'Open Tactical Map'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Contract Accountability */}
        <div
          onClick={() => onNavigateTab('accountability')}
          className="group bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-purple-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                {language === 'hi' ? '3. संविदा व कार्य जवाबदेही' : '3. Contractor Accountability & SLA'}
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {language === 'hi'
                  ? 'सरकारी सड़कों, पुलों व भवनों के ठेकेदारों की देनदारी, कार्य पूर्णता समय-सीमा (SLA) और गैर-अनुपालन ऑडिट।'
                  : 'Verify contractor liability, defect guarantee periods, audit violations, and penalty enforcement.'}
              </p>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
            <span>{language === 'hi' ? 'जवाबदेही जांचें' : 'View SLA Audits'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </section>

      {/* 3. KEY METRICS & RECENT CIVIC CHALLENGES */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Geographic Map & Live Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                {language === 'hi' ? 'कुल दर्ज समस्याएं' : 'Total Grievances'}
              </span>
              <span className="text-2xl font-black font-mono text-slate-900 mt-1 block">
                {totalCount}
              </span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wide block">
                {language === 'hi' ? 'कार्रवाई जारी' : 'Under Action'}
              </span>
              <span className="text-2xl font-black font-mono text-amber-700 mt-1 block">
                {underActionCount}
              </span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide block">
                {language === 'hi' ? 'पूर्ण समाधान' : 'Resolved'}
              </span>
              <span className="text-2xl font-black font-mono text-emerald-700 mt-1 block">
                {resolvedCount}
              </span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide block">
                {language === 'hi' ? 'सक्रिय जिले' : 'Monitored Districts'}
              </span>
              <span className="text-2xl font-black font-mono text-blue-700 mt-1 block">
                24
              </span>
            </div>
          </div>

          {/* Interactive Map Container */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'hi' ? 'झारखंड राज्य भू-मानचित्र अवलोकन' : 'Jharkhand State Geographic Monitor'}</span>
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {language === 'hi' ? 'जिले पर क्लिक करके विशिष्ट रिपोर्ट और परियोजनाएं देखें।' : 'Click any district to inspect district-level metrics and civic works.'}
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('districts')}
                className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'सभी 24 जिले →' : 'All 24 Districts →'}
              </button>
            </div>
            <div className="h-[420px] bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
              <JharkhandMap
                selectedDistrict={null}
                onSelectDistrict={onSelectDistrict}
              />
            </div>
          </div>
        </div>

        {/* Right 1 Col: Live Grievances Stream */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-900">
                  {language === 'hi' ? 'ताज़ा लोक मामले' : 'Recent Civic Reports'}
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('explore')}
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                {language === 'hi' ? 'सभी देखें' : 'View All'}
              </button>
            </div>

            <div className="space-y-3">
              {recentChallenges.length === 0 ? (
                <div className="text-center py-10 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <FolderOpen className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-60" />
                  <p className="text-xs font-bold text-slate-700">
                    {language === 'hi' ? 'कोई सार्वजनिक शिकायत दर्ज नहीं है' : 'No Public Reports Recorded'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {language === 'hi'
                      ? 'नागरिक पोर्टल पर नई शिकायत दर्ज होते ही यहां वास्तविक समय में प्रदर्शित होगी।'
                      : 'New reports submitted on the Citizen Dashboard synchronize here in real time.'}
                  </p>
                </div>
              ) : (
                recentChallenges.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onOpenChallenge(item.id)}
                    className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono font-bold text-slate-800">{item.id}</span>
                      <StatusBadge status={item.status} size="sm" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>{item.district} • {item.block}</span>
                      <span>{item.dateReported}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>{language === 'hi' ? 'सिस्टम स्थिति' : 'SYSTEM STATUS'}</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                {language === 'hi' ? 'सक्रिय' : 'ONLINE'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>{language === 'hi' ? 'डेटा स्रोत' : 'DATA SOURCE'}</span>
              <span>{language === 'hi' ? 'साझा गवर्नेंस स्टोर' : 'Shared Governance Store'}</span>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};
