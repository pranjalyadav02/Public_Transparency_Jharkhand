import React from 'react';
import { DataStatus } from '../types';
import { ShieldCheck, CheckCircle2, CircleDot, TriangleAlert, Users, Sparkles, HelpCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: DataStatus;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showIcon = true,
  size = 'md',
  interactive = false,
  onClick,
  className = ''
}) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Official':
        return {
          icon: ShieldCheck,
          label: 'Official Record',
          tooltip: 'Published and authenticated by an authorized government department or statutory authority.',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100',
          dotColor: 'text-emerald-600'
        };
      case 'Verified':
        return {
          icon: CheckCircle2,
          label: 'Independently Verified',
          tooltip: 'Administratively or technically validated through field inspection, laboratory testing, or formal audit.',
          bg: 'bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100',
          dotColor: 'text-blue-600'
        };
      case 'Reported':
        return {
          icon: CircleDot,
          label: 'Reported (Pending Verification)',
          tooltip: 'Submitted by citizens or institutions; currently in technical triage and pending physical verification.',
          bg: 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100',
          dotColor: 'text-amber-600'
        };
      case 'Estimated':
        return {
          icon: TriangleAlert,
          label: 'Estimated Metric',
          tooltip: 'Mathematically derived or estimated from census, GIS buffers, or statistical projection models.',
          bg: 'bg-indigo-50 text-indigo-800 border-indigo-300 hover:bg-indigo-100',
          dotColor: 'text-indigo-600'
        };
      case 'Community Reported':
        return {
          icon: Users,
          label: 'Community Reported',
          tooltip: 'Collected directly through verified local citizen reality check surveys and social audit committees.',
          bg: 'bg-purple-50 text-purple-800 border-purple-300 hover:bg-purple-100',
          dotColor: 'text-purple-600'
        };
      case 'AI Generated':
        return {
          icon: Sparkles,
          label: 'AI-Derived Insight',
          tooltip: 'Generated via machine learning pattern clustering or anomaly detection. Recommendation only; authorized humans decide.',
          bg: 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100',
          dotColor: 'text-rose-600'
        };
      default:
        return {
          icon: CircleDot,
          label: status,
          tooltip: 'Public data point.',
          bg: 'bg-slate-50 text-slate-800 border-slate-300',
          dotColor: 'text-slate-600'
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-medium'
  }[size];

  return (
    <span
      title={config.tooltip}
      onClick={onClick}
      className={`inline-flex items-center rounded-md border font-medium transition-all ${config.bg} ${sizeClasses} ${
        interactive ? 'cursor-pointer shadow-2xs hover:shadow-xs' : ''
      } ${className}`}
    >
      {showIcon && <Icon className={`w-3.5 h-3.5 ${config.dotColor}`} />}
      <span>{config.label}</span>
      {interactive && <HelpCircle className="w-3 h-3 ml-0.5 opacity-60" />}
    </span>
  );
};
