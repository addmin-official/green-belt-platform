import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';
import { spacing } from '../../design-system/tokens/spacing';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  bordered = true,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`relative flex flex-col overflow-hidden bg-[${colors.background.secondary}] text-slate-100 shadow-xl transition-all duration-300 ${
        bordered ? 'border border-[#E0A96D]/15' : ''
      } ${
        hoverable ? 'hover:-translate-y-1 hover:border-[#E0A96D]/35 hover:shadow-[0_12px_24px_rgba(0,0,0,0.4)]' : ''
      } ${className}`}
      style={{
        borderRadius: radius.xl,
        background: colors.background.secondary,
        paddingBottom: spacing.safeBottomPadding,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
