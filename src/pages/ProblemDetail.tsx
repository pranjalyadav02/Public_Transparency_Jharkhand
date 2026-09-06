import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockChallenges, mockProjects, ch421Timeline } from '../data/mockData';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { MapPin, Users, Calendar, Building, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ProblemDetail = () => {
  const { id } = useParams();
  
  // Use mock data directly for demo purposes
  const challenge = mockChallenges.find(c => c.id === id) || mockChallenges[0];
  const project = mockProjects.find(p => p.challengeId === challenge.id);
  const timeline = ch421Timeline;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/explore" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Explore
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-mono font-medium text-gray-500 bg-gray-200 px-2.5 py-1 rounded-md">{challenge.id}</span>
              <StatusBadge status={challenge.verificationStatus} />
              <StatusBadge status={challenge.projectStage || challenge.status} type="stage" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{challenge.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{challenge.description}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-gray-200">
            <div>
              <div className="text-xs text-gray-500 mb-1 flex items-center"><MapPin className="w-3 h-3 mr-1"/> Location</div>
              <div className="font-medium text-gray-900">{challenge.location}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1 flex items-center"><MapPin className="w-3 h-3 mr-1"/> District</div>
              <div className="font-medium text-gray-900">{challenge.district}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1 flex items-center"><Users className="w-3 h-3 mr-1"/> Affected</div>
              <div className="font-medium text-gray-900">{challenge.affectedPopulation.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1 flex items-center"><Calendar className="w-3 h-3 mr-1"/> Reported</div>
              <div className="font-medium text-gray-900">{new Date(challenge.date).toLocaleDateString()}</div>
            </div>
          </div>

          <Card>
            <CardHeader className="bg-gray-50 border-b border-gray-100 pb-4">
              <CardTitle className="text-lg">Public Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative border-l-2 border-gray-100 ml-3 space-y-8">
                {timeline.map((event, index) => (
                  <div key={index} className="relative pl-6">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-600 flex items-center justify-center"></span>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                      <h4 className="font-semibold text-gray-900">{event.status}</h4>
                      <span className="text-xs font-medium text-gray-500">{event.date}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">By: <span className="font-medium">{event.organization}</span></div>
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-gray-700">Evidence: <strong>{event.evidence}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="lg:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Responsible Authority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 leading-tight">{challenge.responsibleDepartment}</h4>
                  <p className="text-sm text-gray-500 mt-1">Jharkhand State Government</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {project && (
            <Card className="border-blue-200 shadow-blue-900/5">
              <CardHeader className="bg-blue-50/50 pb-4">
                <CardTitle className="text-base flex items-center justify-between">
                  Active Project
                  <StatusBadge status={`TRL ${project.trl}`} type="stage" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Solution</div>
                  <div className="font-medium text-gray-900">{project.title}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">University Partner</div>
                    <div className="text-sm font-medium text-gray-900">{project.university}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Industry / CSR</div>
                    <div className="text-sm font-medium text-gray-900">{project.industry}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">Funding Transparency</div>
                  <div className="space-y-2">
                    {project.funding.map((fund, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{fund.source}</span>
                        <span className="font-medium text-gray-900">₹{(fund.amount / 100000).toFixed(1)}L</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center text-sm font-semibold pt-2 border-t border-gray-100">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">₹{(project.funding.reduce((a,b)=>a+b.amount,0) / 100000).toFixed(1)}L</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
