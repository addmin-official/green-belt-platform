import React from 'react';

export interface StatWidgetProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  colorHex?: string;
  icon?: React.ReactNode;
}

export const StatWidget: React.FC<StatWidgetProps> = ({
  label,
  value,
  change,
  isPositive = true,
  colorHex,
  icon,
}) => {
  return (
    <div className="bg-[#111E2E] border border-[#1E293B] hover:border-[#E0A96D]/30 rounded-lg p-4 flex items-center justify-between shadow transition-all duration-200">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">{label}</span>
        <span className="text-xl font-bold text-white tracking-tight">{value}</span>
        {change && (
          <span className={`text-[10px] font-mono ${isPositive ? 'text-[#52B788]' : 'text-red-400'}`}>
            {isPositive ? '▲' : '▼'} {change}
          </span>
        )}
      </div>
      {icon && (
        <div className="p-2.5 rounded bg-[#0B1420] border border-[#1E293B] text-slate-300">
          {icon}
        </div>
      )}
    </div>
  );
};
