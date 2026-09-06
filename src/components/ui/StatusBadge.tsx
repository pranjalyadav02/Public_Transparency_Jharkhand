import React from 'react';
import { cn } from '../../lib/utils';
import { CheckCircle2, ShieldAlert, Cpu, Users, Eye, AlertTriangle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  className?: string;
  type?: 'verification' | 'stage' | 'priority' | 'accountability';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className, type = 'verification' }) => {
  let icon = null;
  let colorClass = 'bg-gray-100 text-gray-700 border-gray-200';

  if (type === 'verification') {
    switch (status) {
      case 'Verified':
        icon = <CheckCircle2 className="w-3 h-3 mr-1" />;
        colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        break;
      case 'Official':
        icon = <ShieldAlert className="w-3 h-3 mr-1" />;
        colorClass = 'bg-blue-50 text-blue-700 border-blue-200';
        break;
      case 'Reported':
        icon = <Eye className="w-3 h-3 mr-1" />;
        colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
        break;
      case 'AI Generated':
        icon = <Cpu className="w-3 h-3 mr-1" />;
        colorClass = 'bg-purple-50 text-purple-700 border-purple-200';
        break;
      case 'Community Reported':
        icon = <Users className="w-3 h-3 mr-1" />;
        colorClass = 'bg-indigo-50 text-indigo-700 border-indigo-200';
        break;
      case 'Estimated':
        icon = <AlertTriangle className="w-3 h-3 mr-1" />;
        colorClass = 'bg-slate-50 text-slate-700 border-slate-200';
        break;
    }
  } else if (type === 'stage') {
    colorClass = 'bg-blue-50 text-blue-700 border-blue-200';
  } else if (type === 'priority') {
    colorClass = status === 'High' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-orange-50 text-orange-700 border-orange-200';
  } else if (type === 'accountability') {
    colorClass = status.includes('Non-Compliance') ? 'bg-red-50 text-red-700 border-red-200 font-medium' : 'bg-green-50 text-green-700 border-green-200';
  }

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border", colorClass, className)}>
      {icon}
      {status}
    </span>
  );
};
