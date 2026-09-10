import React, { useState } from 'react';
import { JHARKHAND_DISTRICTS } from '../data/mockData';
import { JHARKHAND_STATE_MAP, JHARKHAND_DISTRICTS_GEO, JharkhandDistrictGeo } from '../data/jharkhandMapData';
import { DistrictMetric } from '../types';
import {
  MapPin,
  Search,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Eye,
  Maximize2,
  ExternalLink,
  X,
  Compass,
  Info,
  Building2,
  Users,
  Map as MapIcon
} from 'lucide-react';

interface JharkhandMapProps {
  selectedDistrict: DistrictMetric | null;
  onSelectDistrict: (district: DistrictMetric) => void;
  filterMetric?: 'problems' | 'sla' | 'solutions' | 'impact';
}

export const JharkhandMap: React.FC<JharkhandMapProps> = ({
  selectedDistrict,
  onSelectDistrict,
}) => {
  const [activeMetric, setActiveMetric] = useState<'problems' | 'sla' | 'solutions' | 'reality'>('problems');
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictMetric | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'vector' | 'official' | 'grid'>('vector');
  const [activeDivision, setActiveDivision] = useState<string>('All');
  const [modalDistrictGeo, setModalDistrictGeo] = useState<JharkhandDistrictGeo | null>(null);
  const [imageZoom, setImageZoom] = useState<boolean>(false);

  // Active district fallback (if none hovered, use selected, or default to Gumla / first)
  const currentDistrict = hoveredDistrict || selectedDistrict || JHARKHAND_DISTRICTS[0];
  const currentGeo = JHARKHAND_DISTRICTS_GEO.find(
    g => g.name.toLowerCase() === currentDistrict.name.toLowerCase()
  ) || JHARKHAND_DISTRICTS_GEO[0];

  const getDistrictFill = (districtName: string) => {
    const data = JHARKHAND_DISTRICTS.find(d => d.name === districtName);
    if (!data) return '#334155';

    const isSelected = selectedDistrict?.name === districtName;
    const isHovered = hoveredDistrict?.name === districtName;

    if (isSelected) return '#059669'; // Emerald-600
    if (isHovered) return '#10b981'; // Emerald-500

    if (activeMetric === 'sla') {
      if (data.slaCompliance >= 92) return '#10b981'; // Emerald
      if (data.slaCompliance >= 88) return '#34d399'; // Light emerald
      if (data.slaCompliance >= 84) return '#fbbf24'; // Amber
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

  const filteredDistricts = JHARKHAND_DISTRICTS.filter(d => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.headquarters.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeDivision === 'All') return matchesSearch;
    const geo = JHARKHAND_DISTRICTS_GEO.find(g => g.name.toLowerCase() === d.name.toLowerCase());
    return matchesSearch && geo?.division === activeDivision;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Map Header Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-600" />
              Jharkhand 24-District Interactive Cartographic Portal
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-mono font-semibold">
              24 / 24 Districts
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Official district boundary maps sourced from MapsofIndia reference with live SLA, active innovation, and verified community audit metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Metric Filter Tabs */}
          {viewMode === 'vector' && (
            <div className="flex items-center bg-slate-200/80 p-1 rounded-lg text-xs font-medium text-slate-700">
              <button
                onClick={() => setActiveMetric('problems')}
                className={`px-2.5 py-1 rounded transition ${
                  activeMetric === 'problems' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'hover:text-slate-900'
                }`}
              >
                Challenges
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
                Solutions
              </button>
              <button
                onClick={() => setActiveMetric('reality')}
                className={`px-2.5 py-1 rounded transition ${
                  activeMetric === 'reality' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'hover:text-slate-900'
                }`}
              >
                Reality %
              </button>
            </div>
          )}

          {/* Toggle Map / Official Map / Grid View */}
          <div className="flex items-center bg-slate-200/80 p-1 rounded-lg text-xs font-medium text-slate-700">
            <button
              onClick={() => setViewMode('vector')}
              className={`px-3 py-1 rounded transition flex items-center gap-1.5 ${
                viewMode === 'vector' ? 'bg-white text-emerald-800 shadow-2xs font-semibold' : 'hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Vector Map
            </button>
            <button
              onClick={() => setViewMode('official')}
              className={`px-3 py-1 rounded transition flex items-center gap-1.5 ${
                viewMode === 'official' ? 'bg-white text-emerald-800 shadow-2xs font-semibold' : 'hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              Official State Map
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded transition flex items-center gap-1.5 ${
                viewMode === 'grid' ? 'bg-white text-emerald-800 shadow-2xs font-semibold' : 'hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              District Cards
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: Interactive SVG Vector Map */}
      {viewMode === 'vector' && (
        <div className="relative p-4 sm:p-6 bg-slate-950 flex flex-col lg:flex-row items-center justify-between gap-6 overflow-hidden">
          {/* SVG Map Container */}
          <div className="relative w-full max-w-2xl aspect-[5/4] flex items-center justify-center">
            <svg
              viewBox="0 0 1000 800"
              className="w-full h-full drop-shadow-2xl select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.6" strokeOpacity="0.5" />
                </pattern>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#10b981" floodOpacity="0.8"/>
                </filter>
                <filter id="hoverGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#38bdf8" floodOpacity="0.6"/>
                </filter>
              </defs>

              {/* Background grid */}
              <rect width="1000" height="800" fill="#090d16" />
              <rect width="1000" height="800" fill="url(#grid-pattern)" />

              {/* District polygons */}
              {JHARKHAND_DISTRICTS_GEO.map((geo) => {
                const districtData = JHARKHAND_DISTRICTS.find(d => d.name.toLowerCase() === geo.name.toLowerCase());
                if (!districtData) return null;

                const isSelected = selectedDistrict?.name.toLowerCase() === geo.name.toLowerCase();
                const isHovered = hoveredDistrict?.name.toLowerCase() === geo.name.toLowerCase();

                return (
                  <g
                    key={geo.name}
                    className="cursor-pointer transition-transform duration-150"
                    onClick={() => onSelectDistrict(districtData)}
                    onMouseEnter={() => setHoveredDistrict(districtData)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                  >
                    <path
                      d={geo.path}
                      fill={getDistrictFill(districtData.name)}
                      stroke={isSelected ? '#34d399' : isHovered ? '#38bdf8' : '#1e293b'}
                      strokeWidth={isSelected ? 3.5 : isHovered ? 2.5 : 1.2}
                      className="transition-colors duration-200 hover:opacity-95"
                      filter={isSelected ? 'url(#glow)' : isHovered ? 'url(#hoverGlow)' : undefined}
                    />

                    {/* District Name Label */}
                    <text
                      x={geo.cx}
                      y={geo.cy - 6}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="bold"
                      className="pointer-events-none drop-shadow-md tracking-tight"
                    >
                      {geo.name}
                    </text>

                    {/* Metric indicator badge text */}
                    <text
                      x={geo.cx}
                      y={geo.cy + 10}
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize="9.5"
                      fontFamily="monospace"
                      className="pointer-events-none drop-shadow-md"
                    >
                      {activeMetric === 'problems' && `${districtData.problemsReported} cases`}
                      {activeMetric === 'sla' && `${districtData.slaCompliance}% SLA`}
                      {activeMetric === 'solutions' && `${districtData.solutionsDeployed} deployed`}
                      {activeMetric === 'reality' && `${districtData.communityConfirmationAvg}% reality`}
                    </text>

                    {/* Active pulse pin if selected */}
                    {isSelected && (
                      <circle
                        cx={geo.cx}
                        cy={geo.cy - 22}
                        r="6"
                        fill="#fbbf24"
                        className="animate-bounce pointer-events-none"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Map Legend Overlay */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-lg border border-slate-700/80 text-white text-xs max-w-xs space-y-1.5 pointer-events-none">
              <div className="flex items-center justify-between font-semibold text-slate-300 pb-1 border-b border-slate-700">
                <span>Legend ({activeMetric.toUpperCase()})</span>
                <span className="text-[10px] text-emerald-400">24 Districts Linked</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="w-3 h-3 rounded bg-emerald-500" />
                <span className="text-slate-300">High / Satisfactory SLA</span>
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
          <div className="w-full lg:w-96 bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-700/80 p-5 text-white flex flex-col justify-between self-stretch shadow-2xl">
            <div>
              {/* Header with District Name and Map Image Preview */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-emerald-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {currentGeo.division} Division
                  </span>
                  <h4 className="text-2xl font-black text-white flex items-center gap-2 mt-0.5">
                    {currentDistrict.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    HQ: <span className="text-slate-200 font-semibold">{currentGeo.headquarters}</span> • Pop: {currentGeo.population}
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold rounded-md">
                  {currentDistrict.code}
                </span>
              </div>

              {/* District Official Map Thumbnail Card */}
              <div className="mt-3 relative rounded-lg overflow-hidden border border-slate-700 bg-slate-950 group">
                <img
                  src={currentGeo.mapImage}
                  alt={`${currentDistrict.name} District Map`}
                  onError={(e) => {
                    // Fallback to state map if local image fails
                    (e.target as HTMLImageElement).src = JHARKHAND_STATE_MAP.imageUrl;
                  }}
                  className="w-full h-32 object-cover object-center group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => setModalDistrictGeo(currentGeo)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] font-mono bg-slate-900/90 px-2 py-0.5 rounded text-slate-300 border border-slate-700">
                    Official MapsofIndia Reference
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalDistrictGeo(currentGeo);
                    }}
                    className="pointer-events-auto p-1 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded text-[10px] font-semibold flex items-center gap-1 px-2"
                  >
                    <Maximize2 className="w-3 h-3" />
                    Expand Map
                  </button>
                </div>
              </div>

              {/* Highlights excerpt */}
              <p className="text-[11px] text-slate-300 mt-2.5 leading-relaxed bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                {currentGeo.highlights}
              </p>

              {/* Metrics 2x2 */}
              <div className="grid grid-cols-2 gap-2 my-3">
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Reported Issues</span>
                  <span className="text-lg font-bold text-white font-mono">
                    {currentDistrict.problemsReported.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-400 block font-mono">
                    {currentDistrict.problemsVerified} verified
                  </span>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">SLA Compliance</span>
                  <span className="text-lg font-bold text-amber-300 font-mono">
                    {currentDistrict.slaCompliance}%
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {currentDistrict.avgResolutionDays}d avg time
                  </span>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Innovation Projects</span>
                  <span className="text-lg font-bold text-indigo-300 font-mono">
                    {currentDistrict.activeProjects}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {currentDistrict.solutionsDeployed} deployed
                  </span>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Community Reality</span>
                  <span className="text-lg font-bold text-emerald-300 font-mono">
                    {currentDistrict.communityConfirmationAvg}%
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Verified score
                  </span>
                </div>
              </div>

              {/* Administrative Blocks */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-300">
                    Administrative Blocks ({currentGeo.blocksCount}):
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Area: {currentGeo.areaSqKm.toLocaleString()} km²
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto pr-1">
                  {currentGeo.keyBlocks.map(blockName => (
                    <span
                      key={blockName}
                      className="text-[10px] bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-slate-300"
                    >
                      {blockName}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => onSelectDistrict(currentDistrict)}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-950"
              >
                <span>Explore Full {currentDistrict.name} Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={currentGeo.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium rounded-lg flex items-center justify-center gap-1.5 transition border border-slate-700"
              >
                <span>View on MapsofIndia.com</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: Official MapsofIndia State Map */}
      {viewMode === 'official' && (
        <div className="p-4 sm:p-6 bg-slate-900 text-white space-y-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
                  Cartographic Reference
                </span>
                <h4 className="text-lg font-bold text-white">
                  Official Jharkhand State District Map
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Authoritative 24-district boundaries, state borders, national highways, and river systems from MapsofIndia.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setImageZoom(!imageZoom)}
                className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                {imageZoom ? 'Fit to Screen' : 'Zoom HD'}
              </button>
              <a
                href={JHARKHAND_STATE_MAP.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
              >
                <span>Open Source Reference</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Division Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 text-xs font-mono">Division Filter:</span>
            {['All', 'Palamu', 'North Chotanagpur', 'Santhal Pargana', 'South Chotanagpur', 'Kolhan'].map(div => (
              <button
                key={div}
                onClick={() => setActiveDivision(div)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  activeDivision === div
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {div}
              </button>
            ))}
          </div>

          {/* State Map Graphic Container with Quick Selectors */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Map Frame (8 cols) */}
            <div className="lg:col-span-8 bg-slate-950 rounded-xl border border-slate-700 p-3 overflow-hidden flex flex-col items-center justify-center relative">
              <div className={`w-full overflow-auto ${imageZoom ? 'max-h-[750px]' : 'max-h-[520px]'} flex justify-center`}>
                <img
                  src={JHARKHAND_STATE_MAP.imageUrl}
                  alt="Jharkhand State District Map from MapsofIndia"
                  className={`rounded-lg object-contain transition-all duration-300 ${
                    imageZoom ? 'min-w-[950px]' : 'max-w-full'
                  }`}
                />
              </div>

              <div className="w-full mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Source: {JHARKHAND_STATE_MAP.source}</span>
                <span>Area: {JHARKHAND_STATE_MAP.totalAreaSqKm.toLocaleString()} sq km • 24 Districts</span>
              </div>
            </div>

            {/* Districts Quick Navigation (4 cols) */}
            <div className="lg:col-span-4 bg-slate-800/90 rounded-xl border border-slate-700 p-4 flex flex-col justify-between max-h-[580px]">
              <div>
                <h5 className="font-bold text-sm text-white flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  Select District Map ({filteredDistricts.length})
                </h5>
                <p className="text-xs text-slate-400 mb-3">
                  Click any district to inspect its dedicated cartographic map and local administrative indicators:
                </p>

                <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
                  {filteredDistricts.map(d => {
                    const geo = JHARKHAND_DISTRICTS_GEO.find(g => g.name.toLowerCase() === d.name.toLowerCase());
                    const isSelected = selectedDistrict?.name === d.name;

                    return (
                      <div
                        key={d.name}
                        onClick={() => {
                          onSelectDistrict(d);
                          if (geo) setModalDistrictGeo(geo);
                        }}
                        className={`p-2 rounded-lg border text-left cursor-pointer transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-950/80 border-emerald-500 text-white'
                            : 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:border-slate-500 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={geo?.mapImage}
                            alt=""
                            className="w-8 h-8 rounded object-cover border border-slate-600 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <div>
                            <div className="font-bold text-xs">{d.name}</div>
                            <div className="text-[10px] text-slate-400">
                              HQ: {d.headquarters} • {geo?.division}
                            </div>
                          </div>
                        </div>

                        <div className="text-right font-mono text-[10px]">
                          <span className="text-emerald-400 font-semibold">{d.slaCompliance}% SLA</span>
                          <span className="block text-slate-400">{d.problemsReported} cases</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-700 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Capital: {JHARKHAND_STATE_MAP.capital}</span>
                <span>Sub-Capital: {JHARKHAND_STATE_MAP.subCapital}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 3: Grid Cards for all 24 Districts */}
      {viewMode === 'grid' && (
        <div className="p-5 bg-slate-50">
          <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search any of 24 districts by name or HQ..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              <span className="text-slate-500 text-xs font-mono">Division:</span>
              {['All', 'Palamu', 'North Chotanagpur', 'Santhal Pargana', 'South Chotanagpur', 'Kolhan'].map(div => (
                <button
                  key={div}
                  onClick={() => setActiveDivision(div)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                    activeDivision === div
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {div}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto pr-2">
            {filteredDistricts.map(district => {
              const geo = JHARKHAND_DISTRICTS_GEO.find(g => g.name.toLowerCase() === district.name.toLowerCase());
              const isSelected = selectedDistrict?.name === district.name;

              return (
                <div
                  key={district.name}
                  onClick={() => onSelectDistrict(district)}
                  className={`rounded-xl border text-left cursor-pointer transition overflow-hidden group shadow-xs ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/30'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="h-28 bg-slate-800 relative overflow-hidden">
                    <img
                      src={geo?.mapImage}
                      alt={district.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = JHARKHAND_STATE_MAP.imageUrl;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white">
                      <span className="font-bold text-sm drop-shadow-md">{district.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-black/60 rounded border border-white/20">
                        {district.code}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>HQ: <strong className="text-slate-700">{district.headquarters}</strong></span>
                      <span className="font-mono text-emerald-700 font-semibold">{geo?.division}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-xs bg-slate-50 p-2 rounded-lg border border-slate-100 font-mono">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Reported</span>
                        <span className="font-bold text-slate-800">{district.problemsReported}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">SLA</span>
                        <span className="font-bold text-emerald-600">{district.slaCompliance}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Projects</span>
                        <span className="font-bold text-indigo-700">{district.activeProjects}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Reality</span>
                        <span className="font-bold text-slate-700">{district.communityConfirmationAvg}%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (geo) setModalDistrictGeo(geo);
                        }}
                        className="text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        District Map
                      </button>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {geo?.blocksCount} Blocks
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL: High-Resolution District Map Inspector */}
      {modalDistrictGeo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden text-white flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-700 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">
                      {modalDistrictGeo.name} District Official Cartographic Map
                    </h3>
                    <span className="px-2 py-0.5 bg-slate-800 text-emerald-400 rounded text-xs font-mono border border-slate-700">
                      {modalDistrictGeo.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Division: {modalDistrictGeo.division} • Headquarters: {modalDistrictGeo.headquarters} • Area: {modalDistrictGeo.areaSqKm.toLocaleString()} sq km
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalDistrictGeo(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              {/* Map Image Stage */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-2 flex items-center justify-center overflow-auto max-h-[460px]">
                <img
                  src={modalDistrictGeo.mapImage}
                  alt={`${modalDistrictGeo.name} Map`}
                  className="max-h-[440px] max-w-full object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = JHARKHAND_STATE_MAP.imageUrl;
                  }}
                />
              </div>

              {/* District Facts & Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-2">
                  <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-emerald-400">
                    Geographic &amp; Strategic Profile
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {modalDistrictGeo.highlights}
                  </p>
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-slate-200 block mb-1.5">
                      Key Administrative Blocks ({modalDistrictGeo.blocksCount}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {modalDistrictGeo.keyBlocks.map(b => (
                        <span
                          key={b}
                          className="text-[11px] bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-slate-300"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-3 font-mono text-xs">
                  <h5 className="font-bold text-slate-200 border-b border-slate-700 pb-1.5">
                    District Metrics
                  </h5>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Population:</span>
                    <span>{modalDistrictGeo.population}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Area:</span>
                    <span>{modalDistrictGeo.areaSqKm.toLocaleString()} km²</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Coordinates:</span>
                    <span>{modalDistrictGeo.lat.toFixed(2)}°N, {modalDistrictGeo.lng.toFixed(2)}°E</span>
                  </div>
                  <div className="pt-2 border-t border-slate-700">
                    <a
                      href={modalDistrictGeo.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold transition"
                    >
                      <span>MapsofIndia Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
              <span>Source: MapsofIndia.com / Jharkhand Administrative Atlas</span>
              <button
                onClick={() => setModalDistrictGeo(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
