import React, { useState } from 'react';
import { mockInfrastructure } from '../data/mockData';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Search, MapPin, Building, AlertTriangle, ShieldCheck } from 'lucide-react';

export const Infrastructure = () => {
  const [searchTerm, setSearchTerm] = useState('RD-JH-45821');
  
  // Demo filter
  const infra = mockInfrastructure.find(i => i.assetId.includes(searchTerm) || i.title.includes(searchTerm)) || mockInfrastructure[0];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Infrastructure Accountability</h1>
        <p className="text-gray-500 max-w-3xl">Search for public assets to view construction details, contractor obligations, and verified condition reports.</p>
      </div>

      <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex max-w-xl mb-12">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by Asset ID (e.g. RD-JH-45821) or Location..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border-none focus:ring-0 text-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors">
          Search
        </button>
      </div>

      {infra && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-mono font-medium text-gray-500 bg-gray-200 px-2.5 py-1 rounded-md">{infra.assetId}</span>
                <StatusBadge status={infra.currentStatus} type="accountability" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{infra.title}</h2>
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {infra.district}, {infra.location}</span>
                <span className="flex items-center"><Building className="w-4 h-4 mr-1" /> {infra.department}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="bg-gray-50 border-b border-gray-100 pb-4">
                  <CardTitle className="text-lg">Contract Transparency</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Contractor</div>
                      <div className="font-medium text-gray-900">{infra.contractor}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Project Value</div>
                      <div className="font-medium text-gray-900">₹{(infra.contractValue / 10000000).toFixed(2)} Cr</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Completion</div>
                      <div className="font-medium text-gray-900">{new Date(infra.completionDate).getFullYear()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Warranty</div>
                      <StatusBadge status={infra.warrantyStatus} type={infra.warrantyStatus === 'Active' ? 'accountability' : 'priority'} />
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Defect Liability Period: <span className="text-gray-600 font-normal">{infra.defectLiabilityPeriod}</span></div>
                      <div className="text-sm font-medium text-gray-900 mt-1">Repair Obligation: <span className="text-gray-600 font-normal">{infra.repairObligation} upon verification</span></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {infra.currentStatus === 'Verified Contractual Non-Compliance' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-red-900 mb-2">Verified Contractual Non-Compliance</h3>
                      <p className="text-red-800 text-sm mb-4">Official findings indicate that the contractor failed to meet the {infra.repairObligation} repair obligation during the active defect liability period following a verified defect report.</p>
                      
                      <div className="bg-white/60 rounded p-4 text-sm text-gray-800">
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-400"></span>
                            <span>Problem Reported: Nov 12, 2025</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-400"></span>
                            <span>Verified Defect: Nov 15, 2025</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-400"></span>
                            <span>Repair Deadline Missed: Dec 15, 2025</span>
                          </li>
                          <li className="flex items-center gap-2 font-medium">
                            <span className="w-2 h-2 rounded-full bg-red-600"></span>
                            <span>Official Finding Published: Jan 05, 2026</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" /> Citizen Reality Check
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-900 mb-1">Official Status</div>
                    <StatusBadge status="Completed" />
                    <div className="text-xs text-gray-500 mt-2">Verified with GPS, Timestamp, and Inspection Report.</div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <div className="text-sm font-medium text-gray-900 mb-3">Community Feedback</div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-emerald-600 font-medium">{infra.communityConfirmation}% Confirmed</span>
                      <span className="text-amber-600 font-medium">{100 - (infra.communityConfirmation || 0)}% Concerns</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden flex">
                      <div className="bg-emerald-500 h-full" style={{ width: `${infra.communityConfirmation}%` }}></div>
                      <div className="bg-amber-400 h-full" style={{ width: `${100 - (infra.communityConfirmation || 0)}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">Based on 87 verified responses from local residents. <br/><br/><strong>Note:</strong> This is a transparency indicator, not a replacement for official technical inspection.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
