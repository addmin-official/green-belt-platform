import React, { useRef, useEffect, useState } from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: (dimensions: { width: number; height: number }) => React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 260 });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        // Keep within safe limits, provide decent defaults if measured zero
        setDimensions({
          width: width > 0 ? width : 400,
          height: height > 0 ? height : 260,
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    
    // Initial measurement
    const initialWidth = containerRef.current.clientWidth;
    const initialHeight = containerRef.current.clientHeight || 260;
    if (initialWidth > 0) {
      setDimensions({ width: initialWidth, height: initialHeight });
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div 
      className="bg-[#111e2e] border border-slate-800 p-5 shadow-xl flex flex-col gap-4 text-start w-full h-full"
      style={{ borderRadius: radius.xl }}
    >
      <div className="flex flex-col gap-1 border-b border-slate-900 pb-2.5">
        <h4 className="text-xs uppercase font-mono tracking-widest font-bold text-slate-100 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E0A96D] animate-pulse"></span>
          {title}
        </h4>
        {subtitle && (
          <p className="text-[10px] text-slate-400 font-mono leading-relaxed mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Drawing Space */}
      <div 
        ref={containerRef} 
        className="flex-1 w-full min-h-[220px] relative overflow-hidden flex items-center justify-center select-none"
      >
        {children(dimensions)}
      </div>
    </div>
  );
};

export default ChartContainer;
