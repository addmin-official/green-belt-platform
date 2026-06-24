import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';
import { spacing } from '../../design-system/tokens/spacing';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
}) => {
  return (
    <div 
      className="bg-[#111e2e] border border-slate-800 p-5 shadow-lg flex items-center justify-between gap-4 hover:border-[#E0A96D]/30 transition-all text-start"
      style={{ borderRadius: radius.xl }}
    >
      <div className="flex flex-col gap-1.5 flex-1">
        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">
          {title}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-xl md:text-2xl font-bold text-white font-mono leading-none">
            {value}
          </span>
          {trend && (
            <span 
              className={`text-[10px] font-mono font-bold ${
                trend.isPositive ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </span>
          )}
        </div>
        {subtitle && (
          <span className="text-[11px] text-slate-400 mt-1 font-sans">
            {subtitle}
          </span>
        )}
      </div>
      {icon && (
        <div className="bg-slate-900/50 p-2.5 rounded-xl border border-slate-800 text-[#E0A96D] flex items-center justify-center">
          {icon}
        </div>
      )}
    </div>
  );
};

export default StatCard;
