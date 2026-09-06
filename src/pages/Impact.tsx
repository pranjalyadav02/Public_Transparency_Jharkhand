import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { stateStats } from '../data/mockData';
import { Map, Users, Target, Activity } from 'lucide-react';

const domainData = [
  { name: 'Water', projects: 218, impacted: 540 },
  { name: 'Health', projects: 185, impacted: 420 },
  { name: 'Agri', projects: 150, impacted: 380 },
  { name: 'Edu', projects: 120, impacted: 290 },
  { name: 'Infra', projects: 95, impacted: 210 },
  { name: 'Enviro', projects: 80, impacted: 160 },
];

export const Impact = () => {
  return (
    <div className="w-full">
      <div className="bg-blue-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Jharkhand Impact Dashboard</h1>
          <p className="text-blue-100 text-lg max-w-3xl mb-12">
            Real-time measurement of societal transformation. Tracking projects, funding, and verified impact across all districts.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 border-t border-blue-800 pt-8">
            <div>
              <div className="text-blue-200 text-sm mb-1">People Impacted</div>
              <div className="text-3xl font-bold">{(stateStats.impacted / 1000000).toFixed(1)}M</div>
            </div>
            <div>
              <div className="text-blue-200 text-sm mb-1">Villages Reached</div>
              <div className="text-3xl font-bold">1,240</div>
            </div>
            <div>
              <div className="text-blue-200 text-sm mb-1">Solutions Deployed</div>
              <div className="text-3xl font-bold">{stateStats.deployed}</div>
            </div>
            <div>
              <div className="text-blue-200 text-sm mb-1">Projects Completed</div>
              <div className="text-3xl font-bold">742</div>
            </div>
            <div>
              <div className="text-blue-200 text-sm mb-1">CSR Funding</div>
              <div className="text-3xl font-bold">₹84 Cr</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Domain Analytics (Projects vs Impact in Thousands)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={domainData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip 
                        cursor={{fill: '#f8fafc'}}
                        contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                      />
                      <Bar dataKey="projects" name="Active Projects" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="impacted" name="People Impacted (K)" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center"><Target className="w-4 h-4 mr-2 text-blue-600"/> Expected vs Actual</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-6">Aggregate pipeline validation for completed FY25 projects.</p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500 font-medium">Expected Beneficiaries</span>
                        <span className="font-semibold text-gray-900">450K</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full"><div className="bg-gray-400 h-full w-full rounded-full"></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500 font-medium">Reported by Partners</span>
                        <span className="font-semibold text-gray-900">480K</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full"><div className="bg-blue-400 h-full w-[105%] rounded-full"></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-emerald-600 font-medium">Verified by Govt / Community</span>
                        <span className="font-semibold text-emerald-700">462K</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full"><div className="bg-emerald-500 h-full w-[102%] rounded-full"></div></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center"><Activity className="w-4 h-4 mr-2 text-blue-600"/> SLA Transparency</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-6">Average government response and resolution timelines.</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="text-xl font-bold text-gray-900">8.4h</div>
                      <div className="text-xs text-gray-500 mt-1">First Response</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="text-xl font-bold text-gray-900">2.1d</div>
                      <div className="text-xs text-gray-500 mt-1">Verification</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="text-xl font-bold text-gray-900">11.6d</div>
                      <div className="text-xs text-gray-500 mt-1">Avg Resolution</div>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                      <div className="text-xl font-bold text-emerald-700">87%</div>
                      <div className="text-xs text-emerald-600 mt-1">SLA Compliance</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="h-full bg-gray-900 border-none text-white overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                {/* Abstract map pattern visualization */}
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="#fff" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              <CardContent className="p-8 relative z-10 h-full flex flex-col justify-between">
                <div>
                  <Map className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Jharkhand Impact Map</h3>
                  <p className="text-gray-400 text-sm mb-6">Interactive geographical visualization of all verified problems, active projects, and deployed solutions across the state.</p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm border border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Ranchi</span>
                        <span className="text-xs bg-gray-700 px-2 py-1 rounded">View Profile</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center text-red-400"><span className="w-2 h-2 rounded-full bg-red-400 mr-2"></span>231 unresolved</div>
                        <div className="flex items-center text-amber-400"><span className="w-2 h-2 rounded-full bg-amber-400 mr-2"></span>142 active</div>
                        <div className="flex items-center text-blue-400"><span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>47 univ projects</div>
                        <div className="flex items-center text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>18 deployed</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors">
                  Open Interactive Map
                </button>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};
