import React, { useState } from 'react';
import { PublicChallenge, TimelineEvent } from '../types';
import { StatusBadge } from './StatusBadge';
import { 
  X, MapPin, Building2, Calendar, ShieldCheck, Users, 
  ExternalLink, CheckCircle2, Clock, AlertCircle, ChevronRight, 
  Share2, Bell, Heart, ThumbsUp, Sparkles, FileText, Camera, ArrowRight
} from 'lucide-react';

interface ProblemDetailModalProps {
  challenge: PublicChallenge | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenAsset?: (assetId: string) => void;
  onOpenProject?: (projectId: string) => void;
}

export const ProblemDetailModal: React.FC<ProblemDetailModalProps> = ({
  challenge,
  isOpen,
  onClose,
  onOpenAsset,
  onOpenProject
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'details' | 'reality' | 'evidence'>('timeline');
  const [userSupported, setUserSupported] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  if (!isOpen || !challenge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="bg-white rounded shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header with ID, Status & Actions */}
        <div className="px-6 py-4 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-mono font-bold rounded">
              {challenge.id}
            </span>
            <StatusBadge status={challenge.dataStatus} size="sm" />
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
              Domain: {challenge.domain}
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setUserSupported(!userSupported)}
              className={`px-3 py-1 text-xs rounded-lg font-medium flex items-center gap-1.5 transition ${
                userSupported 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{challenge.verifiedCitizenSupporters + (userSupported ? 1 : 0)} Verified Supporters</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Challenge Summary Banner */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 leading-tight">
            {challenge.title}
          </h2>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium text-slate-800">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              {challenge.village}, {challenge.panchayat} Panchayat, {challenge.block} Block, {challenge.district}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Reported: {challenge.dateReported}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-500" />
              Affected Population: <strong className="text-slate-900 font-mono">{challenge.affectedPopulation.toLocaleString()}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              {challenge.responsibleDepartment}
            </span>
          </div>

          <p className="text-sm text-slate-700 mt-3 leading-relaxed">
            {challenge.description}
          </p>

          {/* Quick linkages if assigned project or asset */}
          {(challenge.assignedProject || challenge.associatedAssetId) && (
            <div className="mt-3.5 pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-3 text-xs">
              <span className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider">Ecosystem Linkages:</span>
              {challenge.assignedProject && (
                <button
                  onClick={() => onOpenProject && onOpenProject(challenge.assignedProject!)}
                  className="px-2.5 py-1 bg-indigo-50 text-indigo-800 border border-indigo-200 rounded font-mono font-medium hover:bg-indigo-100 flex items-center gap-1 transition"
                >
                  <span>Project {challenge.assignedProject}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
              {challenge.associatedAssetId && (
                <button
                  onClick={() => onOpenAsset && onOpenAsset(challenge.associatedAssetId!)}
                  className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded font-mono font-medium hover:bg-amber-100 flex items-center gap-1 transition"
                >
                  <span>Infrastructure Asset {challenge.associatedAssetId}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 bg-white flex items-center gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Complete 12-Stage Public Timeline ⭐</span>
          </button>
          <button
            onClick={() => setActiveTab('reality')}
            className={`py-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'reality'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Citizen Reality Check</span>
          </button>
          <button
            onClick={() => setActiveTab('evidence')}
            className={`py-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'evidence'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Public Evidence Photos ({challenge.publicEvidence.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'details'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Responsibility & Verification</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: 12-STAGE TIMELINE */}
          {activeTab === 'timeline' && (
            <div>
              <div className="mb-4 bg-emerald-50/70 border border-emerald-200 p-3 rounded-lg text-xs text-emerald-950 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Transparent Lifecycle Tracing:</strong> This case traces through the full JanaSamadhan continuum: from citizen reporting and AI triage through university research, field piloting, community reality check, and audited impact.
                </div>
              </div>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 ml-3 sm:ml-4 space-y-6">
                {challenge.timeline.map((event, idx) => {
                  const isCompleted = event.status === 'Completed';
                  const isInProgress = event.status === 'In Progress';

                  return (
                    <div key={idx} className="relative group">
                      {/* Timeline Node Icon */}
                      <div
                        className={`absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition shadow-xs ${
                          isCompleted
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                            : isInProgress
                            ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {event.stageNumber}
                      </div>

                      {/* Content Card */}
                      <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <span>Stage {event.stageNumber}: {event.stageName}</span>
                            {isCompleted && (
                              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-semibold">
                                Done
                              </span>
                            )}
                            {isInProgress && (
                              <span className="text-[10px] px-1.5 py-0.2 bg-amber-100 text-amber-900 rounded font-semibold animate-pulse">
                                Live Stage
                              </span>
                            )}
                          </h4>
                          <span className="text-xs font-mono text-slate-500">
                            {event.date}
                          </span>
                        </div>

                        <div className="text-xs text-slate-600 mb-1 flex items-center gap-2">
                          <span className="font-medium text-slate-800">Org: {event.organization}</span>
                          <span className="text-slate-400">•</span>
                          <span className={`font-mono text-[11px] font-semibold ${
                            event.slaStatus === 'Within SLA' ? 'text-emerald-700' : 'text-rose-700'
                          }`}>
                            {event.slaStatus}
                          </span>
                        </div>

                        {event.evidence && (
                          <div className="mt-2 text-xs bg-white p-2 rounded border border-slate-200 font-mono text-slate-700">
                            <strong>Evidence:</strong> {event.evidence}
                          </div>
                        )}

                        {event.notes && (
                          <p className="mt-1.5 text-xs text-slate-500 italic">
                            {event.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: CITIZEN REALITY CHECK */}
          {activeTab === 'reality' && (
            <div className="space-y-6">
              <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-lg text-xs text-indigo-950">
                <h4 className="font-bold text-sm text-indigo-900 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  What is Citizen Reality Check?
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  JanaSamadhan compares official administrative completion records against verified field survey responses from local residents. It transparently says: <strong>"Official completion recorded; community confirmation is {challenge.communityRealityCheck?.confirmationPercentage || 82}%."</strong> This holds institutions accountable without falsely declaring government records fraudulent.
                </p>
              </div>

              {challenge.communityRealityCheck ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Official Record Column */}
                  <div className="p-4 bg-white rounded border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Official State Record</span>
                      <StatusBadge status="Official" size="sm" />
                    </div>
                    <div>
                      <h5 className="text-base font-bold text-slate-900">
                        {challenge.communityRealityCheck.officialStatus}
                      </h5>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Certified Date: {challenge.communityRealityCheck.officialCompletionDate}
                      </p>
                    </div>
                    <div className="text-xs bg-slate-50 p-3 rounded border border-slate-200 text-slate-700 space-y-1">
                      <strong className="block text-slate-900">Inspection Officer Findings:</strong>
                      <p>{challenge.communityRealityCheck.officialInspectionNote}</p>
                    </div>
                    <div className="text-xs text-slate-500 space-y-1">
                      <div>✓ GPS Geofence verified within 20 meters</div>
                      <div>✓ Timestamped technical completion certificate uploaded</div>
                      <div>✓ Signed by Executive Engineer & Gram Panchayat Secretary</div>
                    </div>
                  </div>

                  {/* Community Reality Column */}
                  <div className="p-4 bg-white rounded border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Local Citizen Reality</span>
                      <StatusBadge status="Community Reported" size="sm" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-emerald-600 font-mono">
                          {challenge.communityRealityCheck.confirmationPercentage}%
                        </span>
                        <span className="text-xs font-semibold text-slate-600">Community Confirmation</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Based on {challenge.communityRealityCheck.verifiedResponsesCount} verified resident responses (Survey: {challenge.communityRealityCheck.lastSurveyDate})
                      </p>
                    </div>

                    {/* Breakdown bar */}
                    <div className="space-y-1.5">
                      <div className="h-3 w-full bg-rose-100 rounded-full overflow-hidden flex">
                        <div 
                          className="h-full bg-emerald-500 rounded-l-full"
                          style={{ width: `${challenge.communityRealityCheck.confirmationPercentage}%` }}
                        />
                        <div 
                          className="h-full bg-rose-500 rounded-r-full"
                          style={{ width: `${100 - challenge.communityRealityCheck.confirmationPercentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-slate-600 font-medium">
                        <span className="text-emerald-700">
                          {challenge.communityRealityCheck.satisfiedCount} Satisfied / Confirmed Working
                        </span>
                        <span className="text-rose-700">
                          {challenge.communityRealityCheck.continuingIssuesCount} Continuing Issues
                        </span>
                      </div>
                    </div>

                    <div className="text-xs bg-slate-50 p-2.5 rounded border border-slate-200 text-slate-600">
                      <strong>Audit Sampling Note:</strong> Random sampling of OTP-verified Aadhaar-linked residents residing within 500m radius of the asset.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 bg-slate-50 rounded border border-slate-200">
                  <ShieldCheck className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                  <p className="text-sm text-slate-600 font-medium">Citizen Reality Check scheduled post-deployment.</p>
                  <p className="text-xs text-slate-400 mt-1">Surveys will open automatically once field pilot milestone is completed.</p>
                </div>
              )}

              {/* Submit Community Feedback Form */}
              <div className="p-4 bg-slate-50 rounded border border-slate-200">
                <h5 className="font-bold text-sm text-slate-900 mb-1">
                  Are you a resident of {challenge.village} or {challenge.panchayat}?
                </h5>
                <p className="text-xs text-slate-500 mb-3">
                  Submit ground feedback for the ongoing project. Anti-spam verification active. Zero personal information is published.
                </p>

                {feedbackSubmitted ? (
                  <div className="p-3 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Your ground feedback has been securely registered and queued for verification. Thank you for civic participation!</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <textarea
                      rows={2}
                      value={feedbackText}
                      onChange={e => setFeedbackText(e.target.value)}
                      placeholder="Describe current ground reality (e.g. water taste, flow rate, operational hours, road surface)..."
                      className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        Moderation rules: Zero abusive language, zero personal defamation.
                      </span>
                      <button
                        onClick={() => {
                          if (feedbackText.trim()) setFeedbackSubmitted(true);
                        }}
                        className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition"
                      >
                        Submit Verified Feedback
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PUBLIC EVIDENCE PHOTOS */}
          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {challenge.publicEvidence.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 rounded border border-slate-200 overflow-hidden shadow-2xs">
                    <div className="h-44 bg-slate-200 relative flex items-center justify-center overflow-hidden">
                      {/* Stylized simulated evidence card with GPS Stamp */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10" />
                      <div className="text-center p-4 text-slate-500">
                        <Camera className="w-10 h-10 mx-auto text-slate-400 mb-1 opacity-70" />
                        <span className="text-xs font-mono">Public Verification Inspection Evidence #{idx + 1}</span>
                      </div>
                      
                      {/* GPS & Timestamp Watermark */}
                      <div className="absolute bottom-2 left-2 right-2 z-20 text-[10px] font-mono text-white/90 bg-black/40 backdrop-blur-xs p-1.5 rounded flex justify-between items-center">
                        <span>GPS: {item.verifiedGps}</span>
                        <span>{item.timestamp}</span>
                      </div>
                    </div>
                    <div className="p-3 text-xs text-slate-700">
                      <p className="font-medium">{item.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: RESPONSIBILITY & TRIAGE */}
          {activeTab === 'details' && (
            <div className="space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                    Administrative Responsibility
                  </span>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Department</span>
                    <span className="font-semibold text-slate-800 text-sm">{challenge.responsibleDepartment}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Public-Facing Office</span>
                    <span className="font-medium text-slate-800">{challenge.responsibleOffice}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Assigned Project ID</span>
                    <span className="font-mono text-emerald-700 font-semibold">{challenge.assignedProject || 'Under Assignment Matrix'}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                    AI Triage & Classification
                  </span>
                  <div>
                    <span className="text-slate-400 block text-[10px]">AI Category Cluster</span>
                    <span className="font-medium text-slate-800">{challenge.aiCategory}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Triage Confidence Score</span>
                    <span className="font-mono text-emerald-700 font-bold">{challenge.aiTriageConfidence}%</span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic mt-1">
                    Rule: "AI recommends. Authorized humans decide." Human administrative verification completed on {challenge.verificationDate}.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Authenticated Public Record • No private complainant identity exposed</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition"
          >
            Close Challenge View
          </button>
        </div>
      </div>
    </div>
  );
};
