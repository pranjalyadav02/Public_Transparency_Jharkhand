import React, { useState, useMemo } from 'react';
import { 
  PUBLIC_CHALLENGES, 
  PUBLIC_PROJECTS, 
  PUBLIC_INFRASTRUCTURE_ASSETS, 
  PUBLIC_SOLUTIONS, 
  JHARKHAND_DISTRICTS 
} from '../data/mockData';
import { 
  Search, X, ExternalLink, MapPin, Building2, 
  AlertCircle, ShieldCheck, Lightbulb, FolderCheck 
} from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChallenge: (challengeId: string) => void;
  onSelectProject?: (projectId: string) => void;
  onSelectDistrict?: (districtName: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectChallenge,
  onSelectDistrict
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const challenges = PUBLIC_CHALLENGES.filter(c =>
      c.id.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.district.toLowerCase().includes(q) ||
      c.domain.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.block.toLowerCase().includes(q)
    );

    const infrastructure = PUBLIC_INFRASTRUCTURE_ASSETS.filter(a =>
      a.assetId.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.district.toLowerCase().includes(q) ||
      a.contractorName.toLowerCase().includes(q)
    );

    const projects = PUBLIC_PROJECTS.filter(p =>
      p.id.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) ||
      p.leadUniversity.toLowerCase().includes(q) ||
      p.district.toLowerCase().includes(q)
    );

    const solutions = PUBLIC_SOLUTIONS.filter(s =>
      s.solutionId.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.domain.toLowerCase().includes(q) ||
      s.developedBy.toLowerCase().includes(q)
    );

    const districts = JHARKHAND_DISTRICTS.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.headquarters.toLowerCase().includes(q) ||
      d.code.toLowerCase().includes(q)
    );

    return { challenges, infrastructure, projects, solutions, districts };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-emerald-600 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search everything: 'water Gumla', 'RD-JH-45821', 'CH-2026-00421', 'Dumka'..."
            className="w-full text-sm sm:text-base bg-transparent border-none focus:outline-hidden text-slate-900 placeholder:text-slate-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded font-medium transition"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs text-slate-500">
          <span className="shrink-0 font-medium">Try searching:</span>
          {['water Gumla', 'CH-2026-00421', 'RD-JH-45821', 'Sisai', 'Ranchi', 'Malnutrition'].map(pill => (
            <button
              key={pill}
              onClick={() => setQuery(pill)}
              className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] whitespace-nowrap transition"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto flex-1 space-y-5 text-xs">
          {!searchResults ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-medium text-slate-600">Global Public Search</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Search challenges, infrastructure assets, verified projects, solutions repository, and all 24 districts of Jharkhand.
              </p>
            </div>
          ) : (
            <>
              {/* Challenges */}
              {searchResults.challenges.length > 0 && (
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                    Public Challenges ({searchResults.challenges.length})
                  </h4>
                  <div className="space-y-2">
                    {searchResults.challenges.map(c => (
                      <div
                        key={c.id}
                        onClick={() => {
                          onSelectChallenge(c.id);
                          onClose();
                        }}
                        className="p-3 bg-slate-50 hover:bg-emerald-50/50 rounded-lg border border-slate-200 hover:border-emerald-300 cursor-pointer transition flex items-start justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono font-bold text-emerald-800">{c.id}</span>
                            <span className="font-semibold text-slate-900">{c.title}</span>
                          </div>
                          <p className="text-slate-500 text-[11px] line-clamp-1">{c.description}</p>
                          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" /> {c.village}, {c.district}
                            </span>
                            <span>•</span>
                            <span className="font-medium text-emerald-700">{c.status}</span>
                          </div>
                        </div>
                        <StatusBadge status={c.dataStatus} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Infrastructure */}
              {searchResults.infrastructure.length > 0 && (
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-amber-500" />
                    Infrastructure Assets ({searchResults.infrastructure.length})
                  </h4>
                  <div className="space-y-2">
                    {searchResults.infrastructure.map(a => (
                      <div
                        key={a.assetId}
                        className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono font-bold text-amber-800">{a.assetId}</span>
                            <span className="font-semibold text-slate-900">{a.name}</span>
                          </div>
                          <p className="text-slate-500 text-[11px]">
                            Contractor: <strong>{a.contractorName}</strong> • Value: {a.contractValue} • Condition: <span className="font-semibold text-rose-700">{a.currentCondition}</span>
                          </p>
                        </div>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-semibold text-[10px]">
                          {a.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Solutions */}
              {searchResults.solutions.length > 0 && (
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-indigo-500" />
                    Proven Solutions Repository ({searchResults.solutions.length})
                  </h4>
                  <div className="space-y-2">
                    {searchResults.solutions.map(s => (
                      <div
                        key={s.solutionId}
                        className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono font-bold text-indigo-800">{s.solutionId}</span>
                            <span className="font-semibold text-slate-900">{s.name}</span>
                          </div>
                          <p className="text-slate-500 text-[11px]">
                            Developed by: {s.developedBy} • Deployed in {s.villagesDeployed} villages ({s.peopleImpacted.toLocaleString()} beneficiaries)
                          </p>
                        </div>
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-900 rounded font-semibold text-[10px]">
                          TRL {s.trl}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Districts */}
              {searchResults.districts.length > 0 && (
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    Districts ({searchResults.districts.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {searchResults.districts.map(d => (
                      <div
                        key={d.name}
                        onClick={() => {
                          if (onSelectDistrict) onSelectDistrict(d.name);
                          onClose();
                        }}
                        className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer transition text-left"
                      >
                        <div className="font-bold text-slate-900">{d.name}</div>
                        <div className="text-[11px] text-slate-500">{d.problemsReported} problems • {d.slaCompliance}% SLA</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.challenges.length === 0 &&
               searchResults.infrastructure.length === 0 &&
               searchResults.solutions.length === 0 &&
               searchResults.districts.length === 0 && (
                <div className="py-8 text-center text-slate-400">
                  <p>No matching public records found for "{query}".</p>
                  <p className="text-xs text-slate-400 mt-1">Try searching by district name (e.g. Gumla), domain (Water), or challenge ID.</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between">
          <span>JanaSamadhan Cross-Entity Public Index</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
