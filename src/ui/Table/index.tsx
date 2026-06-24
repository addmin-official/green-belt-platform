import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  headers: string[];
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({
  headers,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full overflow-x-auto border border-[#E0A96D]/15 rounded-xl shadow-xl bg-slate-950/20">
      <table className={`w-full text-xs text-slate-300 border-collapse ${className}`} {...props}>
        <thead>
          <tr className="bg-slate-900 border-b border-slate-800">
            {headers.map((h, i) => (
              <th 
                key={i} 
                className="px-4.5 py-3 text-start font-mono font-bold tracking-wider uppercase text-[#E0A96D]/90"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/45">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
