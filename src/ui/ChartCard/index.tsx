import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  children,
  actions,
}) => {
  return (
    <div 
      className="bg-[#111e2e] border border-slate-800 p-5 shadow-xl flex flex-col gap-4 text-start"
      style={{ borderRadius: radius.xl }}
    >
      <div className="flex items-center justify-between border-b border-slate-850 pb-3">
        <div>
          <h3 className="text-xs uppercase font-mono tracking-widest font-bold text-slate-100">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      
      <div className="w-full min-h-[220px] flex items-center justify-center relative">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
