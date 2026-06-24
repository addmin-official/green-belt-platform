import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children
}) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div 
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#0b1420] text-slate-200 text-[10px] font-mono border border-slate-700 px-2.5 py-1.5 shadow-xl w-max max-w-[200px] text-center z-50 animate-fade-in"
        style={{ borderRadius: radius.sm }}
      >
        {content}
        {/* Little arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0b1420] w-0 h-0" />
      </div>
    </div>
  );
};

export default Tooltip;
