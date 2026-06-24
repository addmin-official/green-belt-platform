import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface HeatmapRow {
  name: string;
  densities: number[]; // Array of values from 0.0 to 1.0 (hourly or daily)
}

export interface HeatmapProps {
  rows: HeatmapRow[];
  labels: string[];
  width: number;
  height: number;
}

export const Heatmap: React.FC<HeatmapProps> = ({
  rows,
  labels,
  width,
  height,
}) => {
  if (!rows || rows.length === 0) return null;

  const paddingLeft = 110;
  const paddingTop = 25;
  const paddingRight = 10;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const rowCount = rows.length;
  const colCount = labels.length;

  const cellWidth = chartWidth / colCount;
  const cellHeight = chartHeight / rowCount;

  // Function to return color density gradient based on float value
  const getCellColor = (value: number) => {
    // value goes from 0.0 -> 1.0, map to gold intensity
    if (value <= 0.1) return '#102235'; // Slate dark background
    if (value <= 0.3) return '#204060'; // Mild blue shade
    if (value <= 0.5) return '#E0A96D33'; // Faded Sovereign Gold (20% opacity)
    if (value <= 0.8) return '#E0A96D88'; // Amber Gold (53% opacity)
    return '#E0A96D'; // Dynamic Sovereign gold
  };

  return (
    <svg width={width} height={height} className="overflow-visible font-mono text-[9px]">
      {/* Column labels (hours/days) */}
      {labels.map((colLabel, colIndex) => {
        const xPos = paddingLeft + colIndex * cellWidth + cellWidth / 2;
        return (
          <text 
            key={colIndex} 
            x={xPos} 
            y={height - 15} 
            textAnchor="middle" 
            className="fill-slate-400 font-semibold"
          >
            {colLabel}
          </text>
        );
      })}

      {/* Rows representation */}
      {rows.map((row, rowIndex) => {
        const yPos = paddingTop + rowIndex * cellHeight;
        return (
          <g key={rowIndex}>
            {/* Row Label (left-aligned) */}
            <text 
              x={paddingLeft - 15} 
              y={yPos + cellHeight / 2 + 3} 
              textAnchor="end" 
              className="fill-slate-300 font-bold uppercase text-[9px]"
            >
              {row.name}
            </text>

            {/* Cells representing values */}
            {row.densities.map((densityVal, colIndex) => {
              const xPos = paddingLeft + colIndex * cellWidth;
              return (
                <rect
                  key={colIndex}
                  x={xPos + 1.5}
                  y={yPos + 1.5}
                  width={cellWidth - 3 > 0 ? cellWidth - 3 : 5}
                  height={cellHeight - 3 > 0 ? cellHeight - 3 : 5}
                  fill={getCellColor(densityVal)}
                  rx="1.5"
                  className="cursor-pointer hover:stroke-slate-200 hover:stroke-1 transition-all"
                >
                  <title>{row.name} - Intensity: {Math.round(densityVal * 100)}%</title>
                </rect>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};

export default Heatmap;
