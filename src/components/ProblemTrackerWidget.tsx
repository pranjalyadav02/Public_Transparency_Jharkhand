import React, { useState } from 'react';
import { PUBLIC_CHALLENGES } from '../data/mockData';
import { Search, ArrowRight, CheckCircle2, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface ProblemTrackerWidgetProps {
  onOpenChallenge: (challengeId: string) => void;
}

export const ProblemTrackerWidget: React.FC<ProblemTrackerWidgetProps> = ({
  onOpenChallenge
}) => {
  const [challengeIdInput, setChallengeIdInput] = useState('CH-2026-00421');
  const [searchedId, setSearchedId] = useState('CH-2026-00421');

  const activeChallenge = PUBLIC_CHALLENGES.find(
    c => c.id.toLowerCase() === searchedId.trim().toLowerCase()
  ) || PUBLIC_CHALLENGES[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (challengeIdInput.trim()) {
      setSearchedId(challengeIdInput.trim());
    }
  };

  return (
    <div className="bg-white rounded border border-slate-200 shadow-sm p-5 sm:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="text-lg font-bold text-slate-900">
              “What Happened to My Problem?” — Instant Public Case Tracker
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Every citizen report is issued a permanent Challenge ID allowing real-time tracking across administrative, research, and deployment milestones.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={challengeIdInput}
              onChange={e => setChallengeIdInput(e.target.value)}
              placeholder="e.g. CH-2026-00421"
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono font-medium uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg transition shrink-0 shadow-2xs"
          >
            Trace Status
          </button>
        </form>
      </div>

      {/* Case Quick Status Card */}
      {activeChallenge ? (
        <div className="mt-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded border border-emerald-300">
                  {activeChallenge.id}
                </span>
                <span className="font-bold text-sm text-slate-900">{activeChallenge.title}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Location: <strong className="text-slate-700">{activeChallenge.village}, {activeChallenge.block} ({activeChallenge.district})</strong> • Dept: {activeChallenge.responsibleDepartment}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={activeChallenge.dataStatus} size="sm" />
              <button
                onClick={() => onOpenChallenge(activeChallenge.id)}
                className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
              >
                <span>Full Audit File</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Stepper Pipeline */}
          <div className="py-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-3">
              12-Stage Lifecycle Progress:
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {activeChallenge.timeline.slice(0, 6).map((step, idx) => {
                const isDone = step.status === 'Completed';
                const isLive = step.status === 'In Progress';

                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border text-xs transition ${
                      isDone
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                        : isLive
                        ? 'bg-amber-50 border-amber-300 text-amber-950 ring-2 ring-amber-400/20'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold">
                        Stage {step.stageNumber}
                      </span>
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : isLive ? (
                        <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-300" />
                      )}
                    </div>
                    <div className="font-semibold line-clamp-1 text-[11px]">
                      {step.stageName}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 font-mono">
                      {step.date}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Evidence & Reality Score Snippet */}
          {activeChallenge.communityRealityCheck && (
            <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-700 shrink-0" />
                <span className="text-slate-700">
                  <strong>Citizen Reality Check:</strong> Official completion recorded with{' '}
                  <strong className="text-indigo-900 font-mono font-bold">
                    {activeChallenge.communityRealityCheck.confirmationPercentage}%
                  </strong>{' '}
                  local community confirmation ({activeChallenge.communityRealityCheck.verifiedResponsesCount} verified resident audits).
                </span>
              </div>
              <button
                onClick={() => onOpenChallenge(activeChallenge.id)}
                className="text-indigo-800 hover:text-indigo-950 font-semibold underline shrink-0"
              >
                View Community Breakdown →
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="py-8 text-center text-slate-500 text-xs">
          No challenge found with ID "{searchedId}". Try typing <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-mono">CH-2026-00421</code>.
        </div>
      )}
    </div>
  );
};
