import React from 'react';
import { colors } from '../../design-system/tokens/colors';

export interface SectionHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  actions,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-900 pb-2.5 text-start w-full">
      <div>
        <h3 className="text-xs uppercase font-mono tracking-wider font-bold text-[#E0A96D]">
          {title}
        </h3>
        {description && (
          <p className="text-[10px] text-slate-400 mt-0.5">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
};

export default SectionHeader;
