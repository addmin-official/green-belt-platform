import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-1.5 border-b border-slate-800 w-full overflow-x-auto ${className}`}>
      {items.map((it) => {
        const isActive = activeId === it.id;
        return (
          <button
            key={it.id}
            onClick={() => onChange(it.id)}
            className={`flex items-center gap-2 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider relative cursor-pointer select-none whitespace-nowrap transition-all ${
              isActive 
                ? 'text-white font-bold border-b-2 border-[#E0A96D]' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {it.icon && <span className="shrink-0">{it.icon}</span>}
            <span>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
