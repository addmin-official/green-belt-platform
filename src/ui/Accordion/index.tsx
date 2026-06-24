import React, { useState } from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div 
      className="border border-slate-800 bg-[#111e2e]/40 overflow-hidden"
      style={{ borderRadius: radius.md }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-start font-bold text-xs uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-800/20 cursor-pointer select-none transition-colors"
      >
        <span>{title}</span>
        <svg 
          className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 pt-1 border-t border-slate-900/60 text-slate-300 text-xs md:text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
