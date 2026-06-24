import React from 'react';
import { colors } from '../../design-system/tokens/colors';

export interface PieChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  width: number;
  height: number;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  width,
  height,
}) => {
  if (!data || data.length === 0) return null;

  const total = data.reduce((acc, current) => acc + current.value, 0);
  const size = Math.min(width, height) * 0.65;
  const radius = size / 2;
  const centerX = width / 3;
  const centerY = height / 2;

  // Chart accents list
  const chartColors = [
    colors.accent.gold,
    colors.status.secure,
    colors.status.info,
    colors.status.warning,
    colors.status.danger,
    '#94A3B8'
  ];

  let accumulatedAngle = 0;

  return (
    <svg width={width} height={height} className="overflow-visible font-mono text-[9px] text-slate-400">
      {/* Draw arcs */}
      {data.map((slice, index) => {
        const slicePercent = slice.value / total;
        const sliceAngle = slicePercent * 360;

        const startAngle = accumulatedAngle;
        const endAngle = accumulatedAngle + sliceAngle;
        accumulatedAngle += sliceAngle;

        // Convert angles to polar coords
        const rad = Math.PI / 180;
        const x1 = centerX + radius * Math.cos(startAngle * rad);
        const y1 = centerY + radius * Math.sin(startAngle * rad);
        const x2 = centerX + radius * Math.cos(endAngle * rad);
        const y2 = centerY + radius * Math.sin(endAngle * rad);

        const largeArc = sliceAngle > 180 ? 1 : 0;
        const pathData = `
          M ${centerX} ${centerY}
          L ${x1} ${y1}
          A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
          Z
        `;

        const fillColor = slice.color || chartColors[index % chartColors.length];

        return (
          <path
            key={index}
            d={pathData}
            fill={fillColor}
            opacity="0.8"
            className="hover:opacity-100 transition-opacity cursor-pointer border border-[#0D1B2A]"
            stroke="#0D1B2A"
            strokeWidth="1.5"
          />
        );
      })}

      {/* Donut Center Hole */}
      <circle cx={centerX} cy={centerY} r={radius * 0.45} fill="#111e2e" />

      {/* Legend Block */}
      <g transform={`translate(${width * 0.6}, ${height * 0.2})`}>
        {data.map((slice, index) => {
          const sliceColor = slice.color || chartColors[index % chartColors.length];
          const slicePercent = ((slice.value / total) * 100).toFixed(1);
          return (
            <g key={index} transform={`translate(0, ${index * 22})`}>
              <rect width="10" height="10" fill={sliceColor} rx="2" />
              <text x="18" y="9" className="fill-slate-300 font-bold uppercase text-[10px]">
                {slice.label} ({slicePercent}%)
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default PieChart;
