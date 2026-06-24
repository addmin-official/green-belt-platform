import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'gold' | 'slate';
  outline?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'slate',
  outline = false,
  className = '',
  ...props
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'success':
        return outline 
          ? `text-[${colors.status.secure}] border border-[${colors.status.secure}] bg-transparent`
          : `bg-[#102a20] text-[${colors.status.secure}] border border-emerald-500/20`;
      case 'warning':
        return outline
          ? `text-[${colors.status.warning}] border border-[${colors.status.warning}] bg-transparent`
          : `bg-[#2a1d08] text-[${colors.status.warning}] border border-amber-500/20`;
      case 'danger':
        return outline
          ? `text-[${colors.status.danger}] border border-[${colors.status.danger}] bg-transparent`
          : `bg-[#2a0c0c] text-[${colors.status.danger}] border border-red-500/20`;
      case 'info':
        return outline
          ? `text-[${colors.status.info}] border border-[${colors.status.info}] bg-transparent`
          : `bg-[#0b2533] text-[${colors.status.info}] border border-cyan-500/20`;
      case 'gold':
        return outline
          ? `text-[${colors.accent.gold}] border border-[${colors.accent.gold}] bg-transparent`
          : `bg-[${colors.accent.goldFaded}] text-[${colors.accent.gold}] border border-[${colors.accent.goldBorder}]`;
      case 'slate':
      default:
        return outline
          ? 'text-slate-400 border border-slate-700 bg-transparent'
          : 'bg-slate-900 border border-slate-800 text-slate-300';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide rounded ${getStyles()} ${className}`}
      style={{ borderRadius: radius.sm }}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
