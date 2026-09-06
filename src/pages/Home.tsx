import React from 'react';
import { ArrowRight, Activity, Users, Lightbulb, ShieldCheck, Target, Map } from 'lucide-react';
import { stateStats } from '../data/mockData';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Jharkhand Public Transparency & Accountability
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Track societal problems from reporting to resolution. Understand what action was taken, who was responsible, what resources were involved, and what impact was achieved.
            </p>
            <div className="flex gap-4">
              <Link to="/explore" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-full text-white bg-blue-700 hover:bg-blue-800 transition-colors">
                Explore Problems
                <ArrowRight className="ml-2 -mr-1 h-4 w-4" />
              </Link>
              <Link to="/impact" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                View Impact Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* State Stats */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">State Overview</h2>
            <p className="text-gray-500 mt-1">Real-time statistics across the innovation ecosystem.</p>
          </div>
          <span className="text-xs text-gray-400 flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>Live Data</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard label="Challenges Reported" value={stateStats.reported.toLocaleString()} icon={<Activity className="text-amber-500" />} />
          <StatCard label="Verified" value={stateStats.verified.toLocaleString()} icon={<ShieldCheck className="text-blue-500" />} badge="Verified" />
          <StatCard label="Innovation Projects" value={stateStats.projects.toLocaleString()} icon={<Lightbulb className="text-indigo-500" />} />
          <StatCard label="Field Pilots" value={stateStats.pilots.toLocaleString()} icon={<Target className="text-purple-500" />} />
          <StatCard label="Solutions Deployed" value={stateStats.deployed.toLocaleString()} icon={<Map className="text-emerald-500" />} />
          <StatCard label="People Impacted" value={(stateStats.impacted / 1000000).toFixed(1) + 'M'} icon={<Users className="text-pink-500" />} badge="Measured" />
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">How the Ecosystem Works</h2>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <Step number="1" title="Citizen Report" desc="Problem is reported via app or portal." />
              <Step number="2" title="Govt Verification" desc="Problem is triaged and officially verified." />
              <Step number="3" title="Innovation" desc="University & Industry develop solution." />
              <Step number="4" title="Deployment" desc="Tested field pilot and scaled rollout." />
              <Step number="5" title="Community Validation" desc="Citizens confirm the actual impact." />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ label, value, icon, badge }: { label: string, value: string, icon: React.ReactNode, badge?: string }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden">
    {badge && (
      <span className="absolute top-2 right-2 bg-gray-100 text-gray-600 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
        {badge}
      </span>
    )}
    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mb-4">
      {icon}
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">{value}</div>
    <div className="text-sm font-medium text-gray-500">{label}</div>
  </div>
);

const Step = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
  <div className="relative z-10 flex flex-col items-center text-center bg-white lg:bg-transparent">
    <div className="w-12 h-12 rounded-full bg-blue-50 border-2 border-blue-200 text-blue-700 flex items-center justify-center text-lg font-bold mb-4 shadow-sm bg-white">
      {number}
    </div>
    <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 max-w-[200px]">{desc}</p>
  </div>
);
