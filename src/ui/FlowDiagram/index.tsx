import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface FlowNode {
  id: string;
  label: string;
  status: 'passed' | 'active' | 'pending' | 'critical';
}

export interface FlowDiagramProps {
  nodes: FlowNode[];
  width: number;
  height: number;
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({
  nodes,
  width,
  height,
}) => {
  if (!nodes || nodes.length === 0) return null;

  const paddingX = 30;
  const centerY = height / 2;
  const chartWidth = width - paddingX * 2;
  const nodeCount = nodes.length;

  const nodeWidth = 110;
  const nodeHeight = 44;

  const spacingBetweenNodes = nodeCount > 1 
    ? (chartWidth - nodeWidth * nodeCount) / (nodeCount - 1)
    : 0;

  const getNodeColors = (status: string) => {
    switch (status) {
      case 'passed':
        return {
          fill: '#102a20',
          border: '#52B788',
          text: '#52B788',
          labelColor: 'text-[#52B788]'
        };
      case 'active':
        return {
          fill: '#1a2c42',
          border: '#E0A96D',
          text: '#E0A96D',
          labelColor: 'text-[#E0A96D]'
        };
      case 'critical':
        return {
          fill: '#2a0c0c',
          border: '#EF4444',
          text: '#EF4444',
          labelColor: 'text-red-400'
        };
      case 'pending':
      default:
        return {
          fill: '#0f172a',
          border: '#334155',
          text: '#64748B',
          labelColor: 'text-slate-500'
        };
    }
  };

  return (
    <svg width={width} height={height} className="overflow-visible font-mono text-[9px] font-bold text-center" style={{ textAlign: 'center' }}>
      {/* Dynamic Connector lines behind the cards */}
      {nodes.slice(0, -1).map((node, index) => {
        const x1 = paddingX + index * (nodeWidth + spacingBetweenNodes) + nodeWidth;
        const x2 = x1 + spacingBetweenNodes;
        const lineStatus = nodes[index + 1].status === 'passed' || nodes[index + 1].status === 'active' 
          ? colors.accent.gold 
          : '#334155';

        return (
          <g key={index}>
            <line
              x1={x1}
              y1={centerY}
              x2={x2}
              y2={centerY}
              stroke={lineStatus}
              strokeWidth="2.5"
              className="animate-pulse"
              strokeDasharray={nodes[index + 1].status === 'pending' ? '4,4' : undefined}
            />
            {/* Mirroring visual arrow head */}
            <polygon 
              points={`${x2},${centerY} ${x2 - 6},${centerY - 4.5} ${x2 - 6},${centerY + 4.5}`} 
              fill={lineStatus} 
            />
          </g>
        );
      })}

      {/* Render Node Blocks */}
      {nodes.map((node, index) => {
        const xCoord = paddingX + index * (nodeWidth + spacingBetweenNodes);
        const yCoord = centerY - nodeHeight / 2;
        const cl = getNodeColors(node.status);

        return (
          <g key={node.id} className="group">
            <rect
              x={xCoord}
              y={yCoord}
              width={nodeWidth}
              height={nodeHeight}
              fill={cl.fill}
              stroke={cl.border}
              strokeWidth={node.status === 'active' ? '2.5' : '1.5'}
              rx={radius.md.replace('rem', '')} // strip rem if any, or safe fallback
              className="transition-all hover:brightness-110 cursor-pointer"
            />
            {/* Center Status text label */}
            <text
              x={xCoord + nodeWidth / 2}
              y={centerY + 3}
              textAnchor="middle"
              fill={cl.text}
              className="uppercase tracking-wider font-bold text-[8px] md:text-[9.5px]"
            >
              {node.label}
            </text>
            
            {/* Small index badge */}
            <circle 
              cx={xCoord + 10} 
              cy={yCoord + 10} 
              r="6.5" 
              fill={cl.border} 
            />
            <text 
              x={xCoord + 10} 
              y={yCoord + 12} 
              textAnchor="middle" 
              fill="#0D1B2A" 
              className="text-[7px] font-mono font-extrabold"
            >
              {index + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default FlowDiagram;
