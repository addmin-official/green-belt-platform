import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { spacing } from '../../design-system/tokens/spacing';
import { radius } from '../../design-system/tokens/radius';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  disabled,
  className = '',
  ...props
}, ref) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return `bg-[${colors.accent.gold}] text-[${colors.background.primary}] font-bold hover:brightness-110 active:scale-98 border border-[${colors.accent.goldBorder}] shadow-md hover:shadow-[0_0_15px_rgba(224,169,109,0.25)]`;
      case 'secondary':
        return 'bg-slate-800 text-white hover:bg-slate-700 active:scale-98 border border-slate-700';
      case 'outline':
        return `bg-transparent text-[${colors.accent.gold}] border border-[${colors.accent.goldBorder}] hover:bg-slate-900 active:scale-98`;
      case 'danger':
        return `bg-[${colors.status.danger}] text-white font-semibold hover:brightness-110 active:scale-98 border border-red-500/30`;
      case 'ghost':
        return 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/40';
      default:
        return '';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-xs';
      case 'md':
        return 'px-4 py-2.5 text-xs md:text-sm';
      case 'lg':
        return 'px-5 py-3 text-sm md:text-base';
      default:
        return '';
    }
  };

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded transition-all cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${getVariantStyles()} ${getSizeStyles()} ${className}`}
      style={{
        borderRadius: radius.md,
        minHeight: spacing.touchTargetMin,
        gap: spacing.gapCompact,
      }}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : null}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
