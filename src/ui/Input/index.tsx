import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';
import { spacing } from '../../design-system/tokens/spacing';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
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
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute inset-y-0 right-3 flex items-center pr-1 pointer-events-none text-slate-500">
            {icon}
          </div>
        )}
        <input
          id={id}
          ref={ref}
          className={`w-full bg-[${colors.background.tertiary}] text-slate-100 placeholder-slate-500 text-xs md:text-sm px-4.5 py-3 border border-slate-800 focus:border-[${colors.accent.gold}] focus:outline-none transition-all ${icon ? (document.dir === 'rtl' ? 'pl-4 pr-11' : 'pl-11 pr-4') : ''} ${error ? 'border-red-500/50 focus:border-red-500' : ''} ${className}`}
          style={{
            borderRadius: radius.md,
            minHeight: spacing.touchTargetMin,
            background: colors.background.tertiary,
          }}
          {...props}
        />
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

Input.displayName = 'Input';
export default Input;
