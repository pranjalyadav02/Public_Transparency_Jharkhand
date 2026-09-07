import React from 'react';
import { ShieldCheck, Lock, Database, ArrowRight, ExternalLink, Globe, FileCode, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Ecosystem Architecture Banner */}
        <div className="p-6 bg-slate-800/80 rounded-lg border border-slate-700/80 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-700">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                JanaSamadhan Collaborative Architecture
              </span>
              <h4 className="text-base font-bold text-white mt-0.5">
                The Integrated Societal Innovation Ecosystem
              </h4>
            </div>
            <span className="text-xs text-slate-400">
              One Challenge ID connects the entire societal lifecycle
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-3 bg-slate-900/90 rounded border border-slate-700">
              <span className="text-[10px] font-mono text-slate-400 font-bold">ACTOR 1</span>
              <h5 className="text-sm font-bold text-white mt-0.5">Citizen</h5>
              <p className="text-[11px] text-slate-400 mt-1">
                Report & ground-validate local community societal problems.
              </p>
            </div>

            <div className="p-3 bg-slate-900/90 rounded border border-slate-700">
              <span className="text-[10px] font-mono text-slate-400 font-bold">ACTOR 2</span>
              <h5 className="text-sm font-bold text-white mt-0.5">Government</h5>
              <p className="text-[11px] text-slate-400 mt-1">
                Verify, triage, prioritize, assign, and monitor department SLAs.
              </p>
            </div>

            <div className="p-3 bg-slate-900/90 rounded border border-slate-700">
              <span className="text-[10px] font-mono text-slate-400 font-bold">ACTOR 3</span>
              <h5 className="text-sm font-bold text-white mt-0.5">University</h5>
              <p className="text-[11px] text-slate-400 mt-1">
                R&D, student labs, faculty mentorship, prototyping & TRL 1-7.
              </p>
            </div>

            <div className="p-3 bg-slate-900/90 rounded border border-slate-700">
              <span className="text-[10px] font-mono text-slate-400 font-bold">ACTOR 4</span>
              <h5 className="text-sm font-bold text-white mt-0.5">Industry / CSR</h5>
              <p className="text-[11px] text-slate-400 mt-1">
                CSR grants, testing, manufacturing, piloting, scale & TRL 8-9.
              </p>
            </div>

            <div className="p-3 bg-emerald-950/60 rounded border border-emerald-500/50 ring-1 ring-emerald-500/30">
              <span className="text-[10px] font-mono text-emerald-400 font-bold">THIS PORTAL</span>
              <h5 className="text-sm font-bold text-emerald-300 mt-0.5">Public Transparency</h5>
              <p className="text-[11px] text-emerald-100/80 mt-1">
                Track, audit, verify reality check, and expose state accountability.
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center font-serif">
                JS
              </div>
              <span className="text-sm font-bold text-white">JanaSamadhan Jharkhand</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-3">
              The public-facing transparency, accountability, and impact layer of the Jharkhand Societal Challenge & Collaborative Innovation ecosystem.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero PII Policy Enforced</span>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Public Transparency</h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectTab('overview')} className="hover:text-white transition">
                  State Overview & Key Indicators
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('explore')} className="hover:text-white transition">
                  Public Problem & Project Explorer
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('districts')} className="hover:text-white transition">
                  All 24 District & Block Portals
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('impact')} className="hover:text-white transition">
                  Jharkhand Impact Map & Funnel
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('impact')} className="hover:text-white transition">
                  Proven Solutions Repository
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Public Accountability</h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectTab('accountability')} className="hover:text-white transition">
                  Infrastructure Asset Registry
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('accountability')} className="hover:text-white transition">
                  Contract & Warranty Transparency
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('accountability')} className="hover:text-white transition">
                  Verified Contractual Non-Compliance
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('accountability')} className="hover:text-white transition">
                  Contractor Performance Records
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('accountability')} className="hover:text-white transition">
                  Public Integrity & Whistleblower Stats
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Open Governance & Research</h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectTab('open-data')} className="hover:text-white transition">
                  Open Data Portal (CSV / JSON)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('open-data')} className="hover:text-white transition">
                  Calculation Methodologies
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('about')} className="hover:text-white transition">
                  AI Governance & Ethics
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('about')} className="hover:text-white transition">
                  Public / Protected Boundary
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('open-data')} className="hover:text-white transition">
                  Public API Endpoints Sandbox
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal, Privacy & Integrity Notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 Government of Jharkhand. Designed for Smart India Hackathon & Civic Accountability.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>No Aadhaar or Complainant Identity Stored</span>
            </span>
            <span>•</span>
            <span>Right to Information (RTI) Aligned</span>
            <span>•</span>
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
