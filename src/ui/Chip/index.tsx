import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  onRemove?: () => void;
  active?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  onRemove,
  active = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold select-none transition-all ${
        active 
          ? `bg-[#E0A96D]/15 text-[#E0A96D] border border-[#E0A96D]/45` 
          : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
      } ${className}`}
      style={{ borderRadius: radius.full }}
      {...props}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:bg-slate-800 rounded-full p-0.5 text-current"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chip;
