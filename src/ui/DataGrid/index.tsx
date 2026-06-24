import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface DataGridColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

export interface DataGridProps<T> {
  columns: DataGridColumn<T>[];
  data: T[];
  keyField: keyof T;
}

export function DataGrid<T>({
  columns,
  data,
  keyField,
}: DataGridProps<T>) {
  return (
    <div className="w-full overflow-x-auto border border-slate-800 bg-[#111e2e]/60" style={{ borderRadius: radius.xl }}>
      <table className="w-full text-xs text-slate-300 border-collapse text-start">
        <thead>
          <tr className="bg-[#0b1420] border-b border-slate-800">
            {columns.map((col) => (
              <th 
                key={col.key} 
                className="px-4.5 py-3.5 text-start font-mono font-bold uppercase tracking-wider text-slate-400"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/40">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500 font-mono">
                NO RECORDS FOUND
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={String(row[keyField])} className="hover:bg-slate-800/30 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-4.5 py-3.5 font-mono">
                    {col.render ? col.render(row) : String((row as any)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataGrid;
