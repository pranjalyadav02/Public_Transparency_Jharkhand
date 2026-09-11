import React, { useState, useMemo } from 'react';
import { PUBLIC_CHALLENGES, PUBLIC_PROJECTS, JHARKHAND_DISTRICTS } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';
import { 
  Search, Filter, MapPin, Building2, Calendar, Users, 
  ExternalLink, ArrowRight, ThumbsUp, Sparkles, Layers, 
  Lightbulb, ShieldCheck, CheckCircle2, ChevronRight, Award
} from 'lucide-react';
import { PublicChallenge, PublicProject } from '../types';

interface ExploreViewProps {
  onOpenChallenge: (challengeId: string) => void;
  onOpenProject: (projectId: string) => void;
  challenges?: PublicChallenge[];
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onOpenChallenge,
  onOpenProject,
  challenges
}) => {
  const [activeTab, setActiveTab] = useState<'challenges' | 'projects'>('challenges');

  // Challenges Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'supporters' | 'population'>('date');

  // Project Filters
  const [projectSearch, setProjectSearch] = useState('');
  const [selectedTRL, setSelectedTRL] = useState<string>('All');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('All');

  const sourceChallenges = challenges || PUBLIC_CHALLENGES;

  // Filtered Challenges
  const filteredChallenges = useMemo(() => {
    return sourceChallenges.filter(c => {
      const matchesSearch = 
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.block.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDistrict = selectedDistrict === 'All' || c.district === selectedDistrict;
      const matchesDomain = selectedDomain === 'All' || c.domain === selectedDomain;
      const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;

      return matchesSearch && matchesDistrict && matchesDomain && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'supporters') return b.verifiedCitizenSupporters - a.verifiedCitizenSupporters;
      if (sortBy === 'population') return b.affectedPopulation - a.affectedPopulation;
      return new Date(b.dateReported).getTime() - new Date(a.dateReported).getTime();
    });
  }, [searchQuery, selectedDistrict, selectedDomain, selectedStatus, sortBy]);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return PUBLIC_PROJECTS.filter(p => {
      const matchesSearch =
        p.id.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.leadUniversity.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.challengeId.toLowerCase().includes(projectSearch.toLowerCase());
      
      const matchesTRL = selectedTRL === 'All' || String(p.trl) === selectedTRL;
      const matchesUni = selectedUniversity === 'All' || p.leadUniversity.includes(selectedUniversity);

      return matchesSearch && matchesTRL && matchesUni;
    });
  }, [projectSearch, selectedTRL, selectedUniversity]);

  return (
    <div className="space-y-3">
      
      {/* Page Header */}
      <div className="bg-white rounded border border-slate-200 p-4 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-mono font-bold rounded">
                Sections 3 & 4
              </span>
              <h1 className="text-2xl font-bold text-slate-900">
                Public Problem & Project Explorer
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-3xl">
              Search and audit the database of public challenges submitted by citizens, verified by government departments, and transitioned into active academic/CSR innovation projects.
            </p>
          </div>

          {/* Sub-view Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded text-xs font-semibold self-start md:self-auto">
            <button
              onClick={() => setActiveTab('challenges')}
              className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                activeTab === 'challenges'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Citizen Challenges ({PUBLIC_CHALLENGES.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                activeTab === 'projects'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lightbulb className="w-4 h-4 text-indigo-600" />
              <span>Innovation Projects ({PUBLIC_PROJECTS.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================= TAB 1: CITIZEN CHALLENGES ======================= */}
      {activeTab === 'challenges' && (
        <div className="space-y-5">
          {/* Filter Bar */}
          <div className="bg-white rounded border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by Challenge ID (CH-2026-...), village, block, or problem keywords..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* District Filter */}
                <select
                  value={selectedDistrict}
                  onChange={e => setSelectedDistrict(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700"
                >
                  <option value="All">All 24 Districts</option>
                  {JHARKHAND_DISTRICTS.map(d => (
                    <option key={d.name} value={d.name}>{d.name}</option>
                  ))}
                </select>

                {/* Domain Filter */}
                <select
                  value={selectedDomain}
                  onChange={e => setSelectedDomain(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700"
                >
                  <option value="All">All Domains</option>
                  <option value="Water & Sanitation">Water & Sanitation</option>
                  <option value="Rural Infrastructure">Rural Infrastructure</option>
                  <option value="Healthcare & Nutrition">Healthcare & Nutrition</option>
                  <option value="Education">Education</option>
                  <option value="Clean Energy">Clean Energy</option>
                  <option value="Agriculture & Forestry">Agriculture & Forestry</option>
                </select>

                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700"
                >
                  <option value="All">All Statuses</option>
                  <option value="Field Pilot Active">Field Pilot Active</option>
                  <option value="Contractor Investigation">Contractor Investigation</option>
                  <option value="Solution Deployed">Solution Deployed</option>
                  <option value="Verified">Verified</option>
                  <option value="Reported">Reported</option>
                </select>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700"
                >
                  <option value="date">Sort: Most Recent</option>
                  <option value="supporters">Sort: Most Supported</option>
                  <option value="population">Sort: Highest Impacted Pop</option>
                </select>
              </div>
            </div>

            {/* Results Count & Active Tags */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
              <span>Showing <strong>{filteredChallenges.length}</strong> public challenge records</span>
              {(selectedDistrict !== 'All' || selectedDomain !== 'All' || selectedStatus !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedDistrict('All');
                    setSelectedDomain('All');
                    setSelectedStatus('All');
                    setSearchQuery('');
                  }}
                  className="text-emerald-700 hover:text-emerald-900 font-semibold"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredChallenges.map(challenge => (
              <div
                key={challenge.id}
                className="bg-white rounded border border-slate-200 p-5 shadow-2xs hover:shadow-xs transition space-y-4 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: ID, Status, Domain */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                        {challenge.id}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 font-medium rounded">
                        {challenge.domain}
                      </span>
                    </div>
                    <StatusBadge status={challenge.dataStatus} size="sm" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {challenge.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {challenge.description}
                  </p>

                  {/* Location & Authority */}
                  <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>{challenge.village}, {challenge.panchayat} GP, {challenge.block} Block ({challenge.district})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{challenge.responsibleDepartment}</span>
                    </div>
                  </div>

                  {/* 12-Stage Timeline Progress Snippet */}
                  <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <div className="flex items-center justify-between text-[11px] mb-1 font-semibold text-slate-700">
                      <span>Public Lifecycle Progress</span>
                      <span className="font-mono text-emerald-700">
                        Stage {challenge.timeline.filter(e => e.status === 'Completed').length} of 12
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{
                          width: `${(challenge.timeline.filter(e => e.status === 'Completed').length / 12) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Reality Check Pill if available */}
                  {challenge.communityRealityCheck && (
                    <div className="mt-2.5 flex items-center justify-between px-2.5 py-1.5 bg-indigo-50/70 border border-indigo-200 rounded text-xs">
                      <span className="text-[11px] font-semibold text-indigo-900">
                        Citizen Reality Check
                      </span>
                      <span className="font-mono font-bold text-indigo-700">
                        {challenge.communityRealityCheck.confirmationPercentage}% Confirmed
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-slate-500 font-medium">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{challenge.verifiedCitizenSupporters} Supporters</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenChallenge(challenge.id)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 transition"
                    >
                      <span>Trace Case</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= TAB 2: INNOVATION PROJECTS ======================= */}
      {activeTab === 'projects' && (
        <div className="space-y-5">
          {/* Filter Bar */}
          <div className="bg-white rounded border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={projectSearch}
                  onChange={e => setProjectSearch(e.target.value)}
                  placeholder="Search projects by ID, university (BIT Mesra, IIT ISM...), or Challenge ID..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* TRL Filter */}
                <select
                  value={selectedTRL}
                  onChange={e => setSelectedTRL(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700"
                >
                  <option value="All">All TRL Levels (1-9)</option>
                  <option value="6">TRL 6 (Prototype)</option>
                  <option value="7">TRL 7 (Field Demonstration)</option>
                  <option value="8">TRL 8 (Commercial Readiness)</option>
                  <option value="9">TRL 9 (Full Deployment)</option>
                </select>

                {/* University Filter */}
                <select
                  value={selectedUniversity}
                  onChange={e => setSelectedUniversity(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700"
                >
                  <option value="All">All Institutions</option>
                  <option value="BIT Mesra">BIT Mesra</option>
                  <option value="IIT ISM Dhanbad">IIT ISM Dhanbad</option>
                  <option value="NIT Jamshedpur">NIT Jamshedpur</option>
                  <option value="Birsa Agricultural University">Birsa Agricultural University</option>
                </select>
              </div>
            </div>

            <div className="text-xs text-slate-500 pt-1 border-t border-slate-100">
              Showing <strong>{filteredProjects.length}</strong> active university & CSR innovation projects
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="bg-white rounded border border-slate-200 p-5 shadow-2xs hover:shadow-xs transition space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-300">
                        {project.id}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">
                        TRL {project.trl}
                      </span>
                    </div>
                    <StatusBadge status="Verified" size="sm" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {project.title}
                  </h3>

                  <div className="mt-2 text-xs space-y-1.5 text-slate-600">
                    <div>
                      Originating Challenge:{' '}
                      <button
                        onClick={() => onOpenChallenge(project.challengeId)}
                        className="font-mono text-emerald-700 font-bold hover:underline"
                      >
                        {project.challengeId}
                      </button>
                    </div>
                    <div>
                      Lead Academic Institution: <strong>{project.leadUniversity}</strong>
                    </div>
                    <div>
                      Industry / CSR Partner: <strong>{project.csrPartner}</strong>
                    </div>
                  </div>

                  {/* TRL Progress Bar */}
                  <div className="mt-3.5 p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Technology Readiness Level</span>
                      <span className="font-mono text-indigo-700">TRL {project.trl} / 9</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${(project.trl / 9) * 100}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Phase: {project.trl >= 7 ? 'Operational Field Pilot' : 'Laboratory & Prototype Validation'}
                    </div>
                  </div>

                  {/* Pilot & Field Evidence */}
                  <div className="mt-3 p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs space-y-1">
                    <strong className="text-emerald-900 block text-[11px] uppercase tracking-wider">
                      Field Pilot Evidence:
                    </strong>
                    <p className="text-slate-700 font-medium">
                      {project.fieldPilotEvidence}
                    </p>
                    <p className="text-[11px] text-emerald-800 font-mono mt-1">
                      Measured Impact: {project.measuredImpact}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Deployed in <strong>{project.district}</strong> ({project.targetVillages.length} villages)
                  </span>
                  <button
                    onClick={() => onOpenChallenge(project.challengeId)}
                    className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-lg flex items-center gap-1.5 transition"
                  >
                    <span>View Originating Challenge</span>
                    <ExternalLink className="w-3.5 h-3.5" />
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
