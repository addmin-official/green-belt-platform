import React from 'react';
import { radius } from '../../design-system/tokens/radius';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => {
  return (
    <div 
      className="p-8 md:p-12 border border-slate-800 bg-[#111e2e]/40 flex flex-col items-center justify-center text-center gap-4.5"
      style={{ borderRadius: radius.xl }}
    >
      <div className="bg-slate-900/50 p-4 rounded-full border border-slate-800 text-slate-500 hover:text-slate-400 select-none">
        {icon || (
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )}
      </div>

      <div className="flex flex-col gap-1.5 max-w-sm">
        <h4 className="text-sm font-bold uppercase font-display tracking-widest text-[#E0A96D]">
          {title}
        </h4>
        <p className="text-xs text-slate-400 font-mono leading-relaxed">
          {description}
        </p>
      </div>

      {action && <div className="mt-2 shrink-0">{action}</div>}
    </div>
  );
};

export default EmptyState;
