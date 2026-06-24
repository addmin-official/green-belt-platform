import React from 'react';
import { colors } from '../../design-system/tokens/colors';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({
  label,
  className = '',
  id,
  ...props
}, ref) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none group py-1.5 text-start">
      <div className="relative flex items-center">
        <input
          id={id}
          type="radio"
          ref={ref}
          className="sr-only peer"
          {...props}
        />
        <div 
          className={`w-5 h-5 rounded-full border border-slate-700 bg-[${colors.background.tertiary}] flex items-center justify-center transition-all peer-checked:border-[${colors.accent.gold}] peer-focus-visible:ring-2 peer-focus-visible:ring-[#E0A96D]/50 peer-disabled:opacity-50 group-hover:border-slate-500`}
          style={{
            background: colors.background.tertiary,
          }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#E0A96D] scale-0 peer-checked:scale-100 transition-transform" />
        </div>
      </div>
      {label && (
        <span className="text-xs md:text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
          {label}
        </span>
      )}
    </label>
  );
});

Radio.displayName = 'Radio';
export default Radio;
