import React, { useState } from 'react';
import { JHARKHAND_DISTRICTS } from '../data/mockData';
import { DistrictMetric } from '../types';
import { MapPin, Search, Layers, CheckCircle2, AlertTriangle, ArrowRight, Eye } from 'lucide-react';

interface JharkhandMapProps {
  selectedDistrict: DistrictMetric | null;
  onSelectDistrict: (district: DistrictMetric) => void;
  filterMetric?: 'problems' | 'sla' | 'solutions' | 'impact';
}

// Approximate stylized relative layout positions (SVG grid coordinates 0-1000 x 0-800)
// reflecting Jharkhand's geographical layout
const DISTRICT_MAP_COORDS: Record<string, { cx: number; cy: number; path: string; division: string }> = {
  // Palamu Division (North-West)
  Garhwa: {
    cx: 140, cy: 150, division: 'Palamu',
    path: 'M 70,120 L 160,80 L 210,130 L 190,210 L 120,230 L 70,180 Z'
  },
  Palamu: {
    cx: 240, cy: 210, division: 'Palamu',
    path: 'M 190,210 L 210,130 L 290,140 L 320,220 L 280,290 L 210,270 Z'
  },
  Latehar: {
    cx: 270, cy: 320, division: 'Palamu',
    path: 'M 210,270 L 280,290 L 330,310 L 320,390 L 240,380 L 220,330 Z'
  },

  // North Chotanagpur (North-Central)
  Chatra: {
    cx: 350, cy: 190, division: 'North Chotanagpur',
    path: 'M 290,140 L 380,130 L 410,200 L 370,260 L 320,220 Z'
  },
  Hazaribagh: {
    cx: 440, cy: 250, division: 'North Chotanagpur',
    path: 'M 370,260 L 410,200 L 490,210 L 510,280 L 450,310 L 380,310 Z'
  },
  Koderma: {
    cx: 470, cy: 160, division: 'North Chotanagpur',
    path: 'M 410,200 L 460,120 L 520,130 L 530,190 L 490,210 Z'
  },
  Giridih: {
    cx: 580, cy: 210, division: 'North Chotanagpur',
    path: 'M 520,130 L 610,120 L 660,180 L 640,260 L 530,250 L 530,190 Z'
  },
  Ramgarh: {
    cx: 460, cy: 360, division: 'North Chotanagpur',
    path: 'M 420,330 L 490,320 L 520,370 L 470,410 L 420,390 Z'
  },
  Bokaro: {
    cx: 560, cy: 320, division: 'North Chotanagpur',
    path: 'M 510,280 L 620,270 L 640,330 L 570,380 L 520,350 Z'
  },
  Dhanbad: {
    cx: 650, cy: 300, division: 'North Chotanagpur',
    path: 'M 620,270 L 690,260 L 720,320 L 660,360 L 630,330 Z'
  },

  // Santhal Pargana (North-East)
  Deoghar: {
    cx: 680, cy: 180, division: 'Santhal Pargana',
    path: 'M 640,150 L 710,140 L 740,210 L 680,240 L 650,200 Z'
  },
  Dumka: {
    cx: 760, cy: 210, division: 'Santhal Pargana',
    path: 'M 710,140 L 780,130 L 820,200 L 790,280 L 730,250 L 730,200 Z'
  },
  Jamtara: {
    cx: 710, cy: 280, division: 'Santhal Pargana',
    path: 'M 670,240 L 740,240 L 760,310 L 700,330 L 670,280 Z'
  },
  Godda: {
    cx: 810, cy: 130, division: 'Santhal Pargana',
    path: 'M 770,90 L 850,90 L 860,160 L 800,180 L 770,140 Z'
  },
  Sahibganj: {
    cx: 880, cy: 110, division: 'Santhal Pargana',
    path: 'M 850,70 L 920,80 L 930,160 L 870,170 L 850,120 Z'
  },
  Pakur: {
    cx: 870, cy: 200, division: 'Santhal Pargana',
    path: 'M 830,170 L 910,160 L 910,240 L 840,250 L 820,200 Z'
  },

  // South Chotanagpur (Central & South-West)
  Ranchi: {
    cx: 440, cy: 450, division: 'South Chotanagpur',
    path: 'M 360,400 L 460,390 L 510,430 L 500,510 L 410,530 L 360,480 Z'
  },
  Lohardaga: {
    cx: 320, cy: 410, division: 'South Chotanagpur',
    path: 'M 280,380 L 350,380 L 370,440 L 310,460 L 270,420 Z'
  },
  Gumla: {
    cx: 280, cy: 500, division: 'South Chotanagpur',
    path: 'M 220,440 L 330,440 L 340,540 L 290,600 L 210,550 Z'
  },
  Simdega: {
    cx: 270, cy: 640, division: 'South Chotanagpur',
    path: 'M 220,580 L 310,580 L 350,650 L 310,720 L 230,700 Z'
  },
  Khunti: {
    cx: 430, cy: 560, division: 'South Chotanagpur',
    path: 'M 370,520 L 480,510 L 490,590 L 410,620 L 360,580 Z'
  },

  // Kolhan (South-East)
  'Saraikela Kharsawan': {
    cx: 550, cy: 540, division: 'Kolhan',
    path: 'M 490,500 L 590,490 L 620,560 L 560,610 L 490,570 Z'
  },
  'East Singhbhum': {
    cx: 660, cy: 580, division: 'Kolhan',
    path: 'M 600,520 L 710,510 L 730,620 L 650,670 L 610,610 Z'
  },
  'West Singhbhum': {
    cx: 460, cy: 680, division: 'Kolhan',
    path: 'M 370,610 L 510,600 L 550,670 L 500,770 L 400,760 L 350,680 Z'
  }
};

export const JharkhandMap: React.FC<JharkhandMapProps> = ({
  selectedDistrict,
  onSelectDistrict
}) => {
  const [activeMetric, setActiveMetric] = useState<'problems' | 'sla' | 'solutions' | 'reality'>('problems');
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictMetric | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'map' | 'grid'>('map');

  const getDistrictFill = (districtName: string) => {
    const data = JHARKHAND_DISTRICTS.find(d => d.name === districtName);
    if (!data) return '#e2e8f0';

    const isSelected = selectedDistrict?.name === districtName;
    const isHovered = hoveredDistrict?.name === districtName;

    if (isSelected) return '#059669'; // Emerald-600
    if (isHovered) return '#10b981'; // Emerald-500

    if (activeMetric === 'sla') {
      if (data.slaCompliance >= 90) return '#10b981'; // Emerald
      if (data.slaCompliance >= 85) return '#34d399'; // Light emerald
      if (data.slaCompliance >= 80) return '#fbbf24'; // Amber
      return '#f87171'; // Red
    }

    if (activeMetric === 'reality') {
      if (data.communityConfirmationAvg >= 85) return '#0284c7'; // Sky-600
      if (data.communityConfirmationAvg >= 80) return '#38bdf8';
      return '#f59e0b';
    }

    if (activeMetric === 'solutions') {
      if (data.solutionsDeployed >= 20) return '#6366f1';
      if (data.solutionsDeployed >= 10) return '#818cf8';
      return '#c7d2fe';
    }

    // Default: problems reported volume
    if (data.problemsReported >= 1500) return '#991b1b'; // Dark red
    if (data.problemsReported >= 1000) return '#dc2626'; // Red
    if (data.problemsReported >= 700) return '#ea580c'; // Orange
    return '#f59e0b'; // Amber
  };

  const filteredDistricts = JHARKHAND_DISTRICTS.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.headquarters.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
      {/* Map Header Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-base font-bold text-slate-900">
              Interactive State of Jharkhand Impact Map
            </h3>
            <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-medium">
              24 / 24 Districts
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any district to reveal local blocks, active projects, SLA performance, and verified community reality check.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Metric Filter Tabs */}
          <div className="flex items-center bg-slate-200/80 p-1 rounded-lg text-xs font-medium text-slate-700">
            <button
              onClick={() => setActiveMetric('problems')}
              className={`px-2.5 py-1 rounded transition ${
                activeMetric === 'problems' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'hover:text-slate-900'
              }`}
            >
              Challenges Volume
            </button>
            <button
              onClick={() => setActiveMetric('sla')}
              className={`px-2.5 py-1 rounded transition ${
                activeMetric === 'sla' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'hover:text-slate-900'
              }`}
            >
              SLA Compliance
            </button>
            <button
              onClick={() => setActiveMetric('solutions')}
              className={`px-2.5 py-1 rounded transition ${
                activeMetric === 'solutions' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'hover:text-slate-900'
              }`}
            >
              Solutions Deployed
            </button>
            <button
              onClick={() => setActiveMetric('reality')}
              className={`px-2.5 py-1 rounded transition ${
                activeMetric === 'reality' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'hover:text-slate-900'
              }`}
            >
              Reality Check %
            </button>
          </div>

          {/* Toggle Map / Grid View */}
          <div className="flex items-center bg-slate-200/80 p-1 rounded-lg text-xs font-medium text-slate-700">
            <button
              onClick={() => setViewMode('map')}
              className={`px-2.5 py-1 rounded transition ${
                viewMode === 'map' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'hover:text-slate-900'
              }`}
            >
              Map View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 rounded transition ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'hover:text-slate-900'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>
      </div>

      {/* Main Map or Grid */}
      {viewMode === 'map' ? (
        <div className="relative p-4 sm:p-6 bg-slate-900/95 flex flex-col lg:flex-row items-center justify-between gap-6 overflow-hidden">
          {/* SVG Map Container */}
          <div className="relative w-full max-w-2xl aspect-[5/4]">
            <svg
              viewBox="0 0 1000 800"
              className="w-full h-full drop-shadow-xl select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" strokeOpacity="0.4" />
                </pattern>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.6"/>
                </filter>
              </defs>

              {/* Background grid */}
              <rect width="1000" height="800" fill="url(#grid-pattern)" />

              {/* District polygons */}
              {Object.entries(DISTRICT_MAP_COORDS).map(([districtName, coords]) => {
                const districtData = JHARKHAND_DISTRICTS.find(d => d.name === districtName);
                if (!districtData) return null;

                const isSelected = selectedDistrict?.name === districtName;
                const isHovered = hoveredDistrict?.name === districtName;

                return (
                  <g
                    key={districtName}
                    className="cursor-pointer transition-transform duration-150"
                    onClick={() => onSelectDistrict(districtData)}
                    onMouseEnter={() => setHoveredDistrict(districtData)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                  >
                    <path
                      d={coords.path}
                      fill={getDistrictFill(districtName)}
                      stroke={isSelected ? '#ffffff' : '#1e293b'}
                      strokeWidth={isSelected ? 3 : 1.5}
                      className="transition-colors duration-200 hover:opacity-95"
                      filter={isSelected ? 'url(#glow)' : undefined}
                    />

                    {/* District Name Label */}
                    <text
                      x={coords.cx}
                      y={coords.cy - 6}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="bold"
                      className="pointer-events-none drop-shadow-xs tracking-tight"
                    >
                      {districtName}
                    </text>

                    {/* Metric indicator badge text */}
                    <text
                      x={coords.cx}
                      y={coords.cy + 10}
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize="9.5"
                      fontFamily="monospace"
                      className="pointer-events-none drop-shadow-xs"
                    >
                      {activeMetric === 'problems' && `${districtData.problemsReported} cases`}
                      {activeMetric === 'sla' && `${districtData.slaCompliance}% SLA`}
                      {activeMetric === 'solutions' && `${districtData.solutionsDeployed} deployed`}
                      {activeMetric === 'reality' && `${districtData.communityConfirmationAvg}% reality`}
                    </text>

                    {/* Active pulse pin if selected */}
                    {isSelected && (
                      <circle
                        cx={coords.cx}
                        cy={coords.cy - 20}
                        r="5"
                        fill="#fbbf24"
                        className="animate-bounce pointer-events-none"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Map Legend Overlay */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-xs p-3 rounded-lg border border-slate-700/80 text-white text-xs max-w-xs space-y-1.5 pointer-events-none">
              <div className="flex items-center justify-between font-semibold text-slate-300 pb-1 border-b border-slate-700">
                <span>Legend ({activeMetric.toUpperCase()})</span>
                <span className="text-[10px] text-slate-400">State Avg: 87.2% SLA</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="w-3 h-3 rounded bg-emerald-500" />
                <span className="text-slate-300">High / Satisfactory Band</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="w-3 h-3 rounded bg-amber-400" />
                <span className="text-slate-300">Moderate / Action Queue</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="w-3 h-3 rounded bg-rose-500" />
                <span className="text-slate-300">High Priority / Intensive Follow-up</span>
              </div>
            </div>
          </div>

          {/* District Spotlight Panel (Live Hover or Selection) */}
          <div className="w-full lg:w-80 bg-slate-800/90 backdrop-blur-md rounded border border-slate-700 p-5 text-white flex flex-col justify-between self-stretch">
            { (hoveredDistrict || selectedDistrict) ? (


              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-emerald-400">
                      District Profile
                    </span>
                    <h4 className="text-xl font-extrabold text-white flex items-center gap-2">
                      {(hoveredDistrict || selectedDistrict)!.name}
                    </h4>
                    <p className="text-xs text-slate-400">
                      HQ: {(hoveredDistrict || selectedDistrict)!.headquarters} • Pop: {(hoveredDistrict || selectedDistrict)!.population}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold rounded">
                    {(hoveredDistrict || selectedDistrict)!.code}
                  </span>
                </div>

                {/* Metrics 2x2 */}
                <div className="grid grid-cols-2 gap-2.5 my-4">
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block">Reported Issues</span>
                    <span className="text-lg font-bold text-white font-mono">
                      {(hoveredDistrict || selectedDistrict)!.problemsReported.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-400 block">
                      {(hoveredDistrict || selectedDistrict)!.problemsVerified} verified
                    </span>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block">SLA Compliance</span>
                    <span className="text-lg font-bold text-amber-300 font-mono">
                      {(hoveredDistrict || selectedDistrict)!.slaCompliance}%
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {(hoveredDistrict || selectedDistrict)!.avgResolutionDays}d avg resolution
                    </span>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block">Active Projects</span>
                    <span className="text-lg font-bold text-indigo-300 font-mono">
                      {(hoveredDistrict || selectedDistrict)!.activeProjects}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {(hoveredDistrict || selectedDistrict)!.solutionsDeployed} deployed
                    </span>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block">Citizen Reality</span>
                    <span className="text-lg font-bold text-emerald-300 font-mono">
                      {(hoveredDistrict || selectedDistrict)!.communityConfirmationAvg}%
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Community audit score
                    </span>
                  </div>
                </div>

                {/* Local Blocks Preview */}
                <div className="mb-4">
                  <span className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Local Administrative Blocks ({(hoveredDistrict || selectedDistrict)!.blocks.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                    {(hoveredDistrict || selectedDistrict)!.blocks.map(block => (
                      <span
                        key={block.name}
                        className="text-[11px] bg-slate-700/80 border border-slate-600 px-2 py-0.5 rounded text-slate-200"
                      >
                        {block.name} ({block.reported})
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectDistrict((hoveredDistrict || selectedDistrict)!)}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <span>Open Full District Transparency Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 space-y-3">
                <MapPin className="w-10 h-10 mx-auto text-slate-600 animate-pulse" />
                <p className="text-xs text-slate-300">
                  Hover or click any of Jharkhand's 24 districts to view live transparency indicators and local block drill-downs.
                </p>
                <div className="text-[11px] text-slate-500">
                  Popular: Gumla, Ranchi, Dhanbad, East Singhbhum, Dumka
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Grid View of all 24 districts */
        <div className="p-5">
          <div className="mb-4 max-w-sm">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filter districts by name..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto pr-2">
            {filteredDistricts.map(district => (
              <div
                key={district.name}
                onClick={() => onSelectDistrict(district)}
                className={`p-3.5 rounded-lg border text-left cursor-pointer transition ${
                  selectedDistrict?.name === district.name
                    ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-slate-900">{district.name}</h5>
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">
                    {district.code}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-1.5 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Reported</span>
                    <span className="font-semibold text-slate-800">{district.problemsReported}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">SLA</span>
                    <span className="font-semibold text-emerald-700">{district.slaCompliance}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Projects</span>
                    <span className="font-semibold text-slate-800">{district.activeProjects}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Reality</span>
                    <span className="font-semibold text-indigo-700">{district.communityConfirmationAvg}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
