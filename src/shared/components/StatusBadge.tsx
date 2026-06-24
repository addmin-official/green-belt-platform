import React from 'react';
import Badge from '../../ui/Badge';

export interface StatusBadgeProps {
  status: string;
  className?: string;
  outline?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '', outline = false }) => {
  const norm = status.toUpperCase();
  
  let variant: 'success' | 'warning' | 'danger' | 'info' | 'gold' | 'slate' = 'slate';
  
  if (norm.includes('SECURE') || norm.includes('SUCCESS') || norm.includes('CLEARED') || norm.includes('ACTIVE') || norm.includes('ONLINE') || norm.includes('APPROVED')) {
    variant = 'success';
  } else if (norm.includes('PENDING') || norm.includes('WARNING') || norm.includes('IN_PROGRESS')) {
    variant = 'warning';
  } else if (norm.includes('DANGER') || norm.includes('ANOMALY') || norm.includes('FAILED') || norm.includes('SUSPENDED') || norm.includes('LOCKED') || norm.includes('REJECTED')) {
    variant = 'danger';
  } else if (norm.includes('INFO') || norm.includes('TELEMETRY') || norm.includes('SYNC')) {
    variant = 'info';
  } else if (norm.includes('SOVEREIGN') || norm.includes('SECRET') || norm.includes('GOLD')) {
    variant = 'gold';
  }

  return (
    <Badge variant={variant} outline={outline} className={className}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
