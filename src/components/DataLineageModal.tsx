import React from 'react';
import { DataLineageDetails } from '../types';
import { StatusBadge } from './StatusBadge';
import { X, Calculator, ShieldCheck, Database, Calendar, Filter, FileText } from 'lucide-react';

interface DataLineageModalProps {
  lineage: DataLineageDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DataLineageModal: React.FC<DataLineageModalProps> = ({
  lineage,
  isOpen,
  onClose
}) => {
  if (!isOpen || !lineage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="bg-white rounded shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                Data Lineage & Calculation Audit
              </h3>
              <p className="text-xs text-slate-300">
                Auditable derivation for public governance transparency
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Target Metric Box */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Metric Tracked</span>
              <h4 className="text-lg font-bold text-slate-900">{lineage.metricName}</h4>
              <p className="text-xs text-slate-600 mt-0.5">Reported Value: <strong className="text-emerald-700 font-semibold">{lineage.currentValue}</strong></p>
            </div>
            <StatusBadge status={lineage.status} size="lg" />
          </div>

          {/* Mathematical Formula */}
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-semibold text-slate-900 text-xs uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Exact Calculation Formula</span>
            </div>
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-lg font-mono text-xs text-emerald-950">
              {lineage.calculationFormula}
            </div>
          </div>

          {/* Sample breakdown grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs text-slate-500 block">Total Processed Pool</span>
              <span className="text-lg font-bold text-slate-800 font-mono">
                {lineage.eligibleCasesCount.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">eligible cases</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs text-slate-500 block">Qualifying Numerator</span>
              <span className="text-lg font-bold text-slate-800 font-mono">
                {lineage.qualifyingCasesCount.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">validated cases</span>
            </div>
          </div>

          {/* Source System & Reporting Period */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                Source System
              </span>
              <p className="text-xs font-medium text-slate-800 bg-slate-100 p-2.5 rounded border border-slate-200">
                {lineage.sourceSystem}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                Reporting Period
              </span>
              <p className="text-xs font-medium text-slate-800 bg-slate-100 p-2.5 rounded border border-slate-200">
                {lineage.reportingPeriod}
              </p>
            </div>
          </div>

          {/* Exclusion & Normalization Rules */}
          <div>
            <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900 text-xs uppercase tracking-wider">
              <Filter className="w-4 h-4 text-amber-600" />
              <span>Statistical Exclusion & Anti-Duplication Rules</span>
            </div>
            <ul className="space-y-2">
              {lineage.exclusionRules.map((rule, idx) => (
                <li key={idx} className="text-xs text-slate-600 flex items-start gap-2 bg-amber-50/50 p-2.5 rounded border border-amber-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Auditing Authority & Timestamp */}
          <div className="p-3.5 bg-slate-900 text-slate-200 rounded-lg text-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1 font-semibold text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Audited By:
              </span>
              <span>Last verified: {lineage.lastAuditTimestamp}</span>
            </div>
            <p className="text-white font-medium">{lineage.auditingAuthority}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            Machine-audited open governance pipeline
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-md transition"
          >
            Close Audit View
          </button>
        </div>
      </div>
    </div>
  );
};
