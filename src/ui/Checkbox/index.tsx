import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
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
          type="checkbox"
          ref={ref}
          className="sr-only peer"
          {...props}
        />
        <div 
          className={`w-5 h-5 border border-slate-700 bg-[${colors.background.tertiary}] flex items-center justify-center transition-all peer-checked:bg-[${colors.accent.gold}] peer-checked:border-[${colors.accent.gold}] peer-focus-visible:ring-2 peer-focus-visible:ring-[#E0A96D]/50 peer-disabled:opacity-50 group-hover:border-slate-500`}
          style={{
            borderRadius: radius.sm,
            background: colors.background.tertiary,
          }}
        >
          <svg className="w-3.5 h-3.5 text-slate-900 stroke-[3] scale-0 peer-checked:scale-100 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" />
          </svg>
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

Checkbox.displayName = 'Checkbox';
export default Checkbox;
