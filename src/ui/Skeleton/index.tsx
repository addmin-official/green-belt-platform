import React from 'react';
import { radius } from '../../design-system/tokens/radius';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rect',
  width,
  height,
}) => {
  const getShapeStyle = () => {
    switch (variant) {
      case 'circle':
        return 'rounded-full';
      case 'text':
        return 'rounded h-3';
      case 'rect':
      default:
        return 'rounded-md';
    }
  };

  return (
    <div
      className={`animate-pulse bg-slate-800/60 ${getShapeStyle()} ${className}`}
      style={{
        width: width ?? '100%',
        height: height ?? (variant === 'text' ? undefined : '1rem'),
      }}
    />
  );
};

export const UnifiedSkeleton: React.FC<SkeletonProps> = (props) => {
  return <Skeleton {...props} />;
};

export default Skeleton;
