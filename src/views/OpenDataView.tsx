import React, { useState } from 'react';
import { 
  Database, Download, FileText, Code2, BookOpen, 
  CheckCircle2, ExternalLink, ShieldCheck, Copy, Terminal
} from 'lucide-react';

const OPEN_DATASETS = [
  { title: 'Public Infrastructure Assets', updateFrequency: 'Daily', description: 'Complete list of all public infrastructure assets', recordsCount: '15,000', fileSize: '12 MB', license: 'OGDL-India', lastUpdated: '2026-08-01', formats: ['CSV', 'JSON'] }
];

const METHODOLOGY_DEFINITIONS = [
  { metricName: 'SLA Compliance Rate', sourceSystem: 'Jharkhand State e-Governance', formula: '(On-time Action / Eligible Cases) × 100', description: 'Calculates the percentage of cases resolved within SLA', exclusions: ['Invalid cases', 'Duplicate cases'], auditedBy: 'Third Party Audit', lastAuditDate: '2026-08-01' }
];

const PUBLIC_REPORTS = [
  { id: 'REP-2026-01', title: 'Q1 2026 Public Integrity Report', date: '2026-04-01', period: 'Q1 2026', publishedBy: 'State Vigilance Commission', fileSize: '2.4 MB' }
];

export const OpenDataView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'datasets' | 'methodology' | 'reports' | 'api'>('datasets');
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const handleDownload = (datasetTitle: string, format: string) => {
    // Generate an instant simulated client-side download blob
    const sampleData = {
      portal: "JanaSamadhan Jharkhand Public Open Data",
      dataset: datasetTitle,
      exportFormat: format,
      timestamp: new Date().toISOString(),
      license: "Open Government Data License (OGDL-India)",
      dataStatus: "Official Open Record",
      notice: "Zero PII included. PII fields purged prior to export."
    };
    const blob = new Blob([JSON.stringify(sampleData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${datasetTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}.${format.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (endpoint: string) => {
    navigator.clipboard.writeText(endpoint);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  return (
    <div className="space-y-3">
      
      {/* View Header */}
      <div className="bg-white rounded border border-slate-200 p-4 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-mono font-bold rounded">
                Sections 12 & 13
              </span>
              <h1 className="text-2xl font-bold text-slate-900">
                Open Data Portal & Methodology Center
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-3xl">
              Proactive disclosure of raw public datasets, programmatic REST endpoints, peer-reviewed calculation formulas, and quarterly statutory audit reports.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs text-emerald-950 font-semibold self-start md:self-auto">
            <Database className="w-4 h-4 text-emerald-600" />
            <span>OGDL-India Compliant</span>
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="bg-white rounded border border-slate-200 p-2 shadow-2xs flex flex-wrap gap-1 text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('datasets')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
            activeSubTab === 'datasets'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Downloadable Datasets ({OPEN_DATASETS.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('methodology')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
            activeSubTab === 'methodology'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Methodology & Formulae ({METHODOLOGY_DEFINITIONS.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('reports')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
            activeSubTab === 'reports'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Audit & Evaluation Reports ({PUBLIC_REPORTS.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('api')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
            activeSubTab === 'api'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Developer & Researcher API</span>
        </button>
      </div>

      {/* ======================= SUBTAB 1: DATASETS ======================= */}
      {activeSubTab === 'datasets' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OPEN_DATASETS.map((dataset, idx) => (
              <div
                key={idx}
                className="bg-white rounded border border-slate-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-bold text-base text-slate-900">{dataset.title}</h3>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {dataset.updateFrequency}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {dataset.description}
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded border border-slate-200 text-slate-600">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Record Volume</span>
                      <strong className="font-mono text-slate-900">{dataset.recordsCount}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Est. Size</span>
                      <strong className="font-mono text-slate-900">{dataset.fileSize}</strong>
                    </div>
                  </div>

                  <div className="mt-2 text-[11px] text-slate-500">
                    License: <strong>{dataset.license}</strong> • Last Updated: {dataset.lastUpdated}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500">Available Formats:</span>
                  <div className="flex items-center gap-2">
                    {dataset.formats.map(fmt => (
                      <button
                        key={fmt}
                        onClick={() => handleDownload(dataset.title, fmt)}
                        className="px-3 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 text-xs font-mono font-semibold rounded flex items-center gap-1 transition"
                      >
                        <Download className="w-3 h-3" />
                        <span>{fmt}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= SUBTAB 2: METHODOLOGY ======================= */}
      {activeSubTab === 'methodology' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700">
            <h4 className="font-bold text-sm text-slate-900 mb-1">
              Methodology Transparency & Calculation Standards
            </h4>
            <p className="leading-relaxed">
              Every percentage, metric, and rating shown across JanaSamadhan follows open mathematical formulation. No "black-box" scores are permitted.
            </p>
          </div>

          <div className="space-y-4">
            {METHODOLOGY_DEFINITIONS.map((def, idx) => (
              <div
                key={idx}
                className="bg-white rounded border border-slate-200 p-5 shadow-2xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <h3 className="font-bold text-base text-slate-900">{def.metricName}</h3>
                  <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Source: {def.sourceSystem}
                  </span>
                </div>

                <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs font-mono text-emerald-950">
                  <strong className="block text-[10px] text-emerald-800 uppercase tracking-wider mb-0.5">Formula:</strong>
                  {def.formula}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {def.description}
                </p>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Exclusion & Normalization Rules:</span>
                  <ul className="space-y-1">
                    {def.exclusions.map((rule, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
                  <span>Auditing Authority: <strong>{def.auditedBy}</strong></span>
                  <span className="font-mono">{def.lastAuditDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= SUBTAB 3: REPORTS ======================= */}
      {activeSubTab === 'reports' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PUBLIC_REPORTS.map(rep => (
              <div
                key={rep.id}
                className="bg-white rounded border border-slate-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {rep.id}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mt-2">{rep.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Published: {rep.date} • Period: {rep.period}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Published by: <strong>{rep.publishedBy}</strong>
                  </p>
                </div>

                <button
                  onClick={() => handleDownload(rep.title, 'PDF')}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF ({rep.fileSize})</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= SUBTAB 4: REST API ======================= */}
      {activeSubTab === 'api' && (
        <div className="bg-white rounded border border-slate-200 p-4 shadow-2xs space-y-5 text-xs text-slate-700">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
              <Terminal className="w-4 h-4" />
              <span>Public Civic Tech & Researcher REST API</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Programmatic Data Access Endpoints
            </h3>
            <p className="text-slate-500 mt-0.5">
              Read-only, rate-limited (100 req/min), CORS-enabled endpoints returning standardized JSON payloads. Zero API keys required for public endpoints.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                method: 'GET',
                endpoint: 'https://janasamadhan.jharkhand.gov.in/api/v1/challenges?district=Gumla',
                desc: 'Retrieve paginated public challenges with timeline and community confirmation scores.'
              },
              {
                method: 'GET',
                endpoint: 'https://janasamadhan.jharkhand.gov.in/api/v1/districts/metrics',
                desc: 'Retrieve all 24 district scorecards, SLA compliance rates, and local block metrics.'
              },
              {
                method: 'GET',
                endpoint: 'https://janasamadhan.jharkhand.gov.in/api/v1/infrastructure/assets?defectLiability=active',
                desc: 'Retrieve public infrastructure assets with warranty expiry dates and supervising engineer.'
              },
              {
                method: 'GET',
                endpoint: 'https://janasamadhan.jharkhand.gov.in/api/v1/accountability/non-compliance',
                desc: 'Retrieve gazetted contractor non-compliance orders, penalties, and audit findings.'
              }
            ].map((api, idx) => (
              <div key={idx} className="p-3 bg-slate-900 text-white rounded-lg space-y-1.5 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded text-[10px] font-bold">
                      {api.method}
                    </span>
                    <span className="text-slate-200 text-[11px] truncate max-w-md sm:max-w-xl">
                      {api.endpoint}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(api.endpoint)}
                    className="p-1 text-slate-400 hover:text-white rounded"
                    title="Copy Endpoint"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  {api.desc}
                </p>
              </div>
            ))}
          </div>

          {copiedEndpoint && (
            <div className="p-2 bg-emerald-100 text-emerald-900 rounded text-[11px] font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Endpoint copied to clipboard!</span>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
