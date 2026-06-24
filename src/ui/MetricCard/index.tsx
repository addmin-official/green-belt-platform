import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface MetricRow {
  label: string;
  value: string;
  status?: 'secure' | 'danger' | 'warning' | 'info' | 'default';
}

export interface MetricCardProps {
  title: string;
  metrics: MetricRow[];
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  metrics,
  icon,
}) => {
  const getStatusColorClass = (status?: string) => {
    switch (status) {
      case 'secure':
        return 'text-[#52B788]';
      case 'danger':
        return 'text-red-400';
      case 'warning':
        return 'text-amber-400';
      case 'info':
        return 'text-cyan-400';
      case 'default':
      default:
        return 'text-white';
    }
  };

  return (
    <div 
      className="bg-[#111e2e]/90 border border-[#E0A96D]/15 p-5 shadow-xl flex flex-col gap-4 text-start"
      style={{ borderRadius: radius.xl }}
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <h3 className="text-xs uppercase font-mono tracking-wider font-bold text-[#E0A96D] flex items-center gap-2">
          {icon && <span className="text-slate-400">{icon}</span>}
          {title}
        </h3>
      </div>
      
      <div className="flex flex-col gap-2.5">
        {metrics.map((m, i) => (
          <div 
            key={i} 
            className="flex items-center justify-between py-1 border-b border-slate-900/35 last:border-0"
          >
            {/* Value isolated on the left in LTR format */}
            <span 
              dir="ltr"
              className={`font-mono text-xs md:text-sm font-bold ${getStatusColorClass(m.status)}`}
            >
              {m.value}
            </span>
            
            {/* Label pinned to the right */}
            <span className="text-xs text-slate-300 font-semibold text-end">
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricCard;
