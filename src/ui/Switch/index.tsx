import React from 'react';
import { colors } from '../../design-system/tokens/colors';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(({
  label,
  className = '',
  id,
  ...props
}, ref) => {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer select-none group py-1.5 w-full text-start">
      {label && (
        <span className="text-xs md:text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
          {label}
        </span>
      )}
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          ref={ref}
          className="sr-only peer"
          {...props}
        />
        <div className={`w-11 h-6 bg-slate-800 rounded-full transition-all peer-checked:bg-[${colors.accent.gold}] peer-focus-visible:ring-2 peer-focus-visible:ring-[#E0A96D]/50 peer-disabled:opacity-50`} />
        <div className="absolute top-1 left-1 bg-slate-300 w-4 h-4 rounded-full transition-all peer-checked:translate-x-5 peer-checked:bg-[#0D1B2A]" />
      </div>
    </label>
  );
});

Switch.displayName = 'Switch';
export default Switch;
