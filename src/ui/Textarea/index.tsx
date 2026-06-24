import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
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
      <textarea
        id={id}
        ref={ref}
        className={`w-full bg-[${colors.background.tertiary}] text-slate-100 placeholder-slate-500 text-xs md:text-sm px-4 py-3.5 border border-slate-800 focus:border-[${colors.accent.gold}] focus:outline-none transition-all min-h-[100px] resize-y ${error ? 'border-red-500/50 focus:border-red-500' : ''} ${className}`}
        style={{
          borderRadius: radius.md,
          background: colors.background.tertiary,
        }}
        {...props}
      />
      {error && (
        <span className="text-[10px] text-red-400 font-mono text-start flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-400"></span>
          {error}
        </span>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
