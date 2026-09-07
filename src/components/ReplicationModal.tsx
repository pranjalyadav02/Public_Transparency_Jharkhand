import React, { useState } from 'react';
import { PublicSolution } from '../types';
import { JHARKHAND_DISTRICTS } from '../data/mockData';
import { X, CheckCircle2, CopyCheck, Building2, Send, ShieldAlert } from 'lucide-react';

interface ReplicationModalProps {
  solution: PublicSolution | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReplicationModal: React.FC<ReplicationModalProps> = ({
  solution,
  isOpen,
  onClose
}) => {
  const [requestingDistrict, setRequestingDistrict] = useState('Dhanbad');
  const [requestingBlock, setRequestingBlock] = useState('');
  const [officialDesignation, setOfficialDesignation] = useState('Executive Engineer / BDO');
  const [estimatedBeneficiaries, setEstimatedBeneficiaries] = useState('5000');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !solution) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="bg-white rounded shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CopyCheck className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="text-base font-bold text-white">
                Request Solution Replication
              </h3>
              <p className="text-xs text-emerald-200">
                Direct integration with Government Command 
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-emerald-300 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-slate-700">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Target Solution</span>
            <h4 className="text-sm font-bold text-slate-900">{solution.name}</h4>
            <p className="text-xs text-slate-600 mt-1">
              Developed by: <strong>{solution.developedBy}</strong> • TRL {solution.trl} • Proven impact: {solution.measuredImpactMetric}
            </p>
          </div>

          {submitted ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Replication Request Queued</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Request token <strong>#REP-JH-2026-098</strong> has been routed to the Jharkhand State Innovation Council and the District Collector of <strong>{requestingDistrict}</strong> for administrative evaluation.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg text-xs"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Target District for Replication</label>
                <select
                  value={requestingDistrict}
                  onChange={e => setRequestingDistrict(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500"
                >
                  {JHARKHAND_DISTRICTS.map(d => (
                    <option key={d.name} value={d.name}>{d.name} District</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Target Block / Gram Panchayats</label>
                <input
                  type="text"
                  required
                  value={requestingBlock}
                  onChange={e => setRequestingBlock(e.target.value)}
                  placeholder="e.g. Jharia Block, 4 tribal village habitations"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Requesting Authority</label>
                  <input
                    type="text"
                    value={officialDesignation}
                    onChange={e => setOfficialDesignation(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Est. Beneficiaries</label>
                  <input
                    type="number"
                    value={estimatedBeneficiaries}
                    onChange={e => setEstimatedBeneficiaries(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="p-2.5 bg-slate-100 rounded-lg text-[11px] text-slate-500 space-y-1">
                <div>✓ Technical readiness verified (TRL {solution.trl})</div>
                <div>✓ Licensing: {solution.licensingType}</div>
                <div>✓ Evaluation criteria: Local groundwater suitability, budget provision, university mentorship</div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 font-medium rounded-lg text-xs hover:bg-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Replication Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
