import React from 'react';
import * as Lucide from 'lucide-react';
import { spacing } from '../tokens/spacing';

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg' | number;
  className?: string;
  mirrorInRtl?: boolean;
  label?: string;
}

// Global hook or document direction detector
const useIsRtl = () => {
  if (typeof document !== 'undefined') {
    return document.dir === 'rtl';
  }
  return false;
};

export const createSovereignIcon = (LucideIcon: React.ComponentType<any>, defaultLabel: string) => {
  const WrappedIcon = React.forwardRef<SVGSVGElement, IconProps>(({
    size = 'md',
    className = '',
    mirrorInRtl = false,
    label,
    style,
    ...props
  }, ref) => {
    const isRtl = useIsRtl();
    
    // Convert named sizes to design token / raw dimensions
    const getPixelSize = () => {
      if (typeof size === 'number') return size;
      switch (size) {
        case 'sm': return 16;
        case 'lg': return 24;
        case 'md':
        default: 
          return 20;
      }
    };

    const pixelSize = getPixelSize();
    const shouldMirror = mirrorInRtl && isRtl;

    return (
      <span 
        className="inline-flex items-center justify-center shrink-0" 
        style={{ width: pixelSize, height: pixelSize }}
      >
        <LucideIcon
          {...(ref ? { ref } : {})}
          size={pixelSize}
          className={`${className} ${shouldMirror ? 'scale-x-[-1]' : ''} transition-transform duration-200`}
          aria-label={label || defaultLabel}
          role="img"
          style={style}
          {...(props as any)}
        />
      </span>
    );
  });

  WrappedIcon.displayName = `SovereignIcon(${LucideIcon.displayName || 'Icon'})`;
  return WrappedIcon;
};

// Expose standard government platform icons
export const ShieldIcon = createSovereignIcon(Lucide.Shield, 'Sovereign Guard Emblem');
export const CheckIcon = createSovereignIcon(Lucide.Check, 'Completed Action State');
export const AlertTriangleIcon = createSovereignIcon(Lucide.AlertTriangle, 'Security Warning Node');
export const ActivityIcon = createSovereignIcon(Lucide.Activity, 'Active National Telemetry Rate');
export const DatabaseIcon = createSovereignIcon(Lucide.Database, 'Sovereign Ledger Node');
export const CpuIcon = createSovereignIcon(Lucide.Cpu, 'Cognitive Threat Model');
export const TrendingUpIcon = createSovereignIcon(Lucide.TrendingUp, 'Economic Corridor Flow Rate');
export const FileTextIcon = createSovereignIcon(Lucide.FileText, 'Logistics Manifest Document');
export const SendIcon = createSovereignIcon(Lucide.Send, 'Secure Cable Transmission');
export const ServerIcon = createSovereignIcon(Lucide.Server, 'Distributed Server Cluster');
export const RefreshCwIcon = createSovereignIcon(Lucide.RefreshCw, 'Sync Queue Cycle');
export const LayersIcon = createSovereignIcon(Lucide.Layers, 'System Architecture Layer');
export const LandmarkIcon = createSovereignIcon(Lucide.Landmark, 'Central Bank Connection');
export const NetworkIcon = createSovereignIcon(Lucide.Network, 'National Border Bridge');
export const ArrowRightIcon = createSovereignIcon(Lucide.ArrowRight, 'RTL Mirrored Directional Arrow');
export const BookOpenIcon = createSovereignIcon(Lucide.BookOpen, 'Registry Index Guide');
export const BrainIcon = createSovereignIcon(Lucide.Brain, 'Cognitive Risk Coprocessor');
