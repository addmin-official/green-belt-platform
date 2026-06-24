import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';
import { spacing } from '../../design-system/tokens/spacing';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  options,
  className = '',
  id,
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-400 select-none text-start">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          ref={ref}
          className={`w-full bg-[${colors.background.tertiary}] text-slate-100 text-xs md:text-sm px-4 py-3 border border-slate-800 focus:border-[${colors.accent.gold}] focus:outline-none transition-all appearance-none cursor-pointer ${error ? 'border-red-500/50 focus:border-red-500' : ''} ${className}`}
          style={{
            borderRadius: radius.md,
            minHeight: spacing.touchTargetMin,
            background: colors.background.tertiary,
          }}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#111e2e] text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 left-4 rtl:left-auto rtl:right-4 flex items-center pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinelinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <span className="text-[10px] text-red-400 font-mono text-start flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-400"></span>
          {error}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
