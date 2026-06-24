import React from 'react';
import { colors } from '../../design-system/tokens/colors';

export interface LineChartProps {
  data: Array<{ label: string; value: number }>;
  width: number;
  height: number;
  color?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  width,
  height,
  color = colors.accent.gold,
}) => {
  if (!data || data.length === 0) return null;

  const labels = data.map((d) => d.label);
  const values = data.map((d) => d.value);

  const minValue = 0; // Use clean baseline
  const maxValue = Math.max(...values, 100) * 1.1; // Add padding

  const paddingY = 30;
  const paddingX = 40;

  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  // Compute coordinates
  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1)) * chartWidth;
    const y = paddingY + chartHeight - ((d.value - minValue) / (maxValue - minValue)) * chartHeight;
    return { x, y, value: d.value, label: d.label };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  // SVG Linear Gradient ID
  const gradId = 'line-chart-grad-gold';

  return (
    <svg width={width} height={height} className="overflow-visible font-mono text-[9px] text-slate-400">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
        const yVal = paddingY + chartHeight * ratio;
        const valueRepresentation = Math.round(maxValue - ratio * (maxValue - minValue));
        return (
          <g key={idx}>
            <line 
              x1={paddingX} 
              y1={yVal} 
              x2={width - paddingX} 
              y2={yVal} 
              stroke="#1E293B" 
              strokeDasharray="3,3" 
            />
            {/* Axis Y Value labels */}
            <text x={paddingX - 10} y={yVal + 3} textAnchor="end" className="fill-slate-400 font-bold">
              {valueRepresentation}
            </text>
          </g>
        );
      })}

      {/* Grid X Vertical lines */}
      {points.map((p, idx) => (
        <g key={idx}>
          <line
            x1={p.x}
            y1={paddingY}
            x2={p.x}
            y2={paddingY + chartHeight}
            stroke="#1E293B"
            strokeOpacity="0.3"
          />
          {/* Axis X Label */}
          <text 
            x={p.x} 
            y={height - 10} 
            textAnchor="middle" 
            className="fill-slate-400 font-semibold"
          >
            {p.label}
          </text>
        </g>
      ))}

      {/* Area under the path */}
      {points.length > 1 && (
        <path
          d={`M ${points[0].x} ${paddingY + chartHeight} 
             L ${points.map((p) => `${p.x} ${p.y}`).join(' L ')} 
             L ${points[points.length - 1].x} ${paddingY + chartHeight} Z`}
          fill={`url(#${gradId})`}
        />
      )}

      {/* Plot line */}
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        points={polylinePoints}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data dots */}
      {points.map((p, idx) => (
        <circle
          key={idx}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="#0D1B2A"
          stroke={color}
          strokeWidth="2"
          className="cursor-pointer hover:r-[6px] transition-all"
        />
      ))}
    </svg>
  );
};

export default LineChart;
