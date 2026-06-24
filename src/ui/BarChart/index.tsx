import React from 'react';
import { colors } from '../../design-system/tokens/colors';

export interface BarChartProps {
  data: Array<{ label: string; value: number }>;
  width: number;
  height: number;
  color?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  width,
  height,
  color = colors.accent.gold,
}) => {
  if (!data || data.length === 0) return null;

  const values = data.map((d) => d.value);
  const minValue = 0;
  const maxValue = Math.max(...values, 100) * 1.1;

  const paddingY = 30;
  const paddingX = 40;

  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  const barCount = data.length;
  const barGap = 16;
  const barWidth = (chartWidth - barGap * (barCount - 1)) / barCount;

  return (
    <svg width={width} height={height} className="overflow-visible font-mono text-[9px] text-slate-400">
      {/* Horizontal gridlines */}
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
            <text x={paddingX - 10} y={yVal + 3} textAnchor="end" className="fill-slate-400 font-bold">
              {valueRepresentation}
            </text>
          </g>
        );
      })}

      {/* Render actual bars */}
      {data.map((d, index) => {
        const barHeight = ((d.value - minValue) / (maxValue - minValue)) * chartHeight;
        const xCoord = paddingX + index * (barWidth + barGap);
        const yCoord = paddingY + chartHeight - barHeight;

        return (
          <g key={index} className="group">
            <rect
              x={xCoord}
              y={yCoord}
              width={barWidth > 0 ? barWidth : 10}
              height={barHeight > 0 ? barHeight : 2}
              fill={color}
              opacity="0.8"
              className="hover:opacity-100 transition-opacity cursor-pointer"
              rx="2"
            />
            {/* Value text display */}
            <text 
              x={xCoord + barWidth / 2} 
              y={yCoord - 6} 
              textAnchor="middle" 
              className="fill-slate-300 font-bold hidden group-hover:block"
            >
              {d.value}
            </text>
            {/* Label display */}
            <text 
              x={xCoord + barWidth / 2} 
              y={height - 10} 
              textAnchor="middle" 
              className="fill-slate-400 font-semibold"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default BarChart;
