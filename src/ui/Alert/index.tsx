import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface AlertProps {
  variant?: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  description,
  icon,
}) => {
  const getColors = () => {
    switch (variant) {
      case 'success':
        return {
          bg: '#102a20',
          border: 'border-emerald-500/20',
          text: 'text-[#52B788]',
          textSecondary: 'text-emerald-200/80',
        };
      case 'warning':
        return {
          bg: '#2a1d08',
          border: 'border-amber-500/20',
          text: 'text-amber-400',
          textSecondary: 'text-amber-200/80',
        };
      case 'danger':
        return {
          bg: '#2a0c0c',
          border: 'border-red-500/20',
          text: 'text-red-400',
          textSecondary: 'text-red-200/80',
        };
      case 'info':
      default:
        return {
          bg: '#0b2533',
          border: 'border-cyan-500/20',
          text: 'text-cyan-400',
          textSecondary: 'text-cyan-200/80',
        };
    }
  };

  const c = getColors();

  return (
    <div 
      className={`p-4 flex gap-3.5 border text-start ${c.bg} ${c.border}`}
      style={{ borderRadius: radius.md }}
    >
      {icon && <div className={`shrink-0 ${c.text}`}>{icon}</div>}
      <div className="flex flex-col gap-1">
        <h4 className={`text-xs font-bold uppercase tracking-wider ${c.text}`}>
          {title}
        </h4>
        <p className={`text-[11px] font-mono leading-relaxed ${c.textSecondary}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default Alert;
