import React from 'react';
import { 
  Sparkles, ShieldCheck, Lock, Eye, AlertTriangle, 
  CheckCircle2, XCircle, FileCode, Scale, Cpu, Info
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-3">
      
      {/* View Header */}
      <div className="bg-white rounded border border-slate-200 p-4 shadow-2xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-xs font-mono font-bold rounded">
            Sections 14 & 15
          </span>
          <h1 className="text-2xl font-bold text-slate-900">
            AI Transparency, Public Governance & Privacy Boundary
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-3xl">
          Complete disclosure of artificial intelligence models, constitutional safeguards, due process requirements, and the ironclad boundary between public transparency and citizen data privacy.
        </p>
      </div>

      {/* SECTION 14: AI TRANSPARENCY & ETHICS */}
      <div className="bg-white rounded border border-slate-200 p-4 sm:p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-500" />
              <h2 className="text-xl font-bold text-slate-900">
                14. AI Governance Framework
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Foundational governing doctrine for machine learning across the JanaSamadhan ecosystem.
            </p>
          </div>

          <div className="px-4 py-2 bg-rose-50 border border-rose-200 rounded text-rose-900 font-bold text-xs">
            “AI recommends. Authorized humans decide.”
          </div>
        </div>

        {/* AI Role vs Strict AI Prohibitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Permitted AI Functions */}
          <div className="p-5 bg-emerald-50/60 rounded border border-emerald-200 space-y-3">
            <h3 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Permitted AI Operational Scope</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Machine learning models in JanaSamadhan are strictly limited to semantic routing and pattern recognition:
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span><strong>Multi-lingual Triage:</strong> Extracting keywords from Hindi, Nagpuri, Santhali, and Mundari citizen voice recordings.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span><strong>Geographic Clustering:</strong> Grouping multiple citizen submissions regarding the same broken road or borewell into a unified Challenge ID.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span><strong>Routing Suggestions:</strong> Recommending the relevant municipal department based on historical jurisdictional rules.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span><strong>Anomaly Detection:</strong> Identifying sudden statistical spikes in water contamination or dengue symptoms.</span>
              </li>
            </ul>
          </div>

          {/* Strict AI Prohibitions */}
          <div className="p-5 bg-rose-50/60 rounded border border-rose-200 space-y-3">
            <h3 className="font-bold text-sm text-rose-950 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-rose-700" />
              <span>Strict AI Prohibitions (Non-Negotiable)</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              To guarantee constitutional due process, the AI algorithm is explicitly forbidden from making administrative adjudications:
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                <span><strong>AI must never accuse an individual</strong> of criminal or administrative misconduct.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                <span><strong>AI must never declare corruption</strong> or financial fraud autonomously.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                <span><strong>AI must never declare legal guilt</strong> or impose punitive consequences.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                <span><strong>AI must never declare contractual breach</strong> without human technical laboratory audit.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                <span><strong>AI must never independently certify completion</strong> or approve fund disbursements.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Model Transparency Box */}
        <div className="p-4 bg-slate-50 rounded border border-slate-200 text-xs text-slate-700 space-y-2">
          <h4 className="font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-slate-700" />
            <span>Open AI Model Card & Audit Metadata</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
            <div>
              <span className="text-slate-400 block">Classifier Engine</span>
              <strong>IndicBERT-Jharkhand v3 (Open Source)</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Audited By</span>
              <strong>IIT ISM Dhanbad Dept. of Computer Science</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Last Algorithmic Bias Audit</span>
              <strong>January 15, 2026 (Passed WCAG/NITI Aayog Ethics)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 15: WHAT IS PUBLIC VS WHAT IS PROTECTED */}
      <div className="bg-white rounded border border-slate-200 p-4 sm:p-4 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <Lock className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              15. The Privacy & Transparency Boundary
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Demarcation between proactive public disclosure and inviolable citizen privacy safeguards.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Public Data Column */}
          <div className="p-5 bg-slate-50 rounded border border-slate-200 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>What is Proactively Disclosed (Public)</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Aggregated problem statistics and district performance scorecards</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Anonymized Challenge IDs, problem descriptions, and general village locations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Infrastructure Asset Register, cost, contractor entity, and warranty expiry dates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Verified contractual non-compliance orders issued after due process</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>University R&D pilots, TRL advancement, and field evaluation datasets</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Citizen reality check survey percentages and response counts</span>
              </li>
            </ul>
          </div>

          {/* Protected Data Column */}
          <div className="p-5 bg-slate-900 text-white rounded border border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>What is Strictly Protected (Zero Public Disclosure)</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Complainant citizen names, phone numbers, or email addresses</span>
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Aadhaar numbers or national identity records (never stored)</span>
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Exact household street addresses or raw GPS pinpoints (centroid truncated)</span>
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Whistleblower identities or confidential anti-corruption tipster details</span>
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Unverified allegations naming individuals before official finding</span>
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Preliminary internal departmental files prior to gazetted executive action</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Authority Affirmation */}
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-950 flex items-center justify-between">
          <span className="flex items-center gap-2 font-medium">
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>Aligned with Section 4(1)(b) of the Right to Information Act (RTI) & Digital Personal Data Protection Act (DPDPA 2023).</span>
          </span>
          <span className="font-bold text-emerald-900 font-mono text-[11px]">
            Govt. of Jharkhand Gazette Notified
          </span>
        </div>
      </div>

    </div>
  );
};
