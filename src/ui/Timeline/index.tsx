import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  status?: 'success' | 'warning' | 'danger' | 'info';
}

export interface TimelineProps {
  events: TimelineEvent[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success':
        return 'bg-[#52B788] ring-emerald-950/70 border-emerald-400/50';
      case 'warning':
        return 'bg-amber-500 ring-amber-950/70 border-amber-400/50';
      case 'danger':
        return 'bg-red-500 ring-red-950/70 border-red-400/50';
      case 'info':
      default:
        return 'bg-cyan-500 ring-cyan-950/70 border-cyan-400/50';
    }
  };

  return (
    <div className="flex flex-col gap-6 relative pl-5.5 rtl:pl-0 rtl:pr-5.5 text-start w-full">
      {/* Line timeline background */}
      <div className="absolute top-1 bottom-1 left-2 rtl:left-auto rtl:right-2 w-[2px] bg-slate-800" />

      {events.map((it, idx) => (
        <div key={idx} className="relative flex flex-col gap-1 z-10">
          {/* Bullet Circle Indicator */}
          <span 
            className={`absolute top-1 -left-[18.5px] rtl:-left-auto rtl:-right-[18.5px] w-3 h-3 rounded-full border ring-4 transition-all ${getStatusColor(it.status)}`}
          />
          {/* Time Stamp */}
          <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500">
            {it.time}
          </span>
          {/* Event Content */}
          <h5 className="text-xs font-bold text-slate-200 uppercase font-display select-text">
            {it.title}
          </h5>
          <p className="text-[11px] font-mono text-slate-400 leading-relaxed max-w-2xl">
            {it.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
