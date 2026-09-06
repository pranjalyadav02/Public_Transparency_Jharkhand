import React, { useState } from 'react';
import { mockChallenges } from '../data/mockData';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Card, CardContent } from '../components/ui/Card';
import { MapPin, Calendar, Building, Filter, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Problem Explorer</h1>
          <p className="text-gray-500">Public searchable database of eligible public challenges.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <h3 className="font-semibold text-gray-900">Filters</h3>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Search</label>
                <input 
                  type="text" 
                  placeholder="ID, keyword..." 
                  className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">District</label>
                <select className="w-full text-sm border border-gray-300 rounded-md px-3 py-2">
                  <option>All Districts</option>
                  <option>Gumla</option>
                  <option>Ranchi</option>
                  <option>Dhanbad</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Status</label>
                <select className="w-full text-sm border border-gray-300 rounded-md px-3 py-2">
                  <option>All Statuses</option>
                  <option>Verified</option>
                  <option>Assigned</option>
                  <option>In Progress</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Challenge List */}
        <div className="lg:col-span-3 space-y-4">
          {mockChallenges.map((challenge) => (
            <Link key={challenge.id} to={`/explore/problem/${challenge.id}`} className="block group">
              <Card className="hover:border-blue-300 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{challenge.id}</span>
                        <StatusBadge status={challenge.verificationStatus} />
                        <StatusBadge status={challenge.priority} type="priority" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                        {challenge.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{challenge.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {challenge.location}, {challenge.district}
                        </div>
                        <div className="flex items-center gap-1">
                          <Building className="w-3.5 h-3.5" />
                          {challenge.responsibleDepartment}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          Reported: {new Date(challenge.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-48 flex flex-col items-start md:items-end justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-4">
                      <div className="mb-2">
                        <div className="text-xs text-gray-500 mb-1">Current Stage</div>
                        <StatusBadge status={challenge.projectStage || challenge.status} type="stage" />
                      </div>
                      <div className="text-blue-600 text-sm font-medium flex items-center mt-2 group-hover:translate-x-1 transition-transform">
                        View Details <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
