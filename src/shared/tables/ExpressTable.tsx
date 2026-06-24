import React from 'react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

export interface ExpressTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

export function ExpressTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  emptyMessage = 'No records found.',
  onRowClick
}: ExpressTableProps<T>) {
  return (
    <div className="overflow-x-auto w-full border border-[#1E293B] rounded-lg bg-[#111E2E]">
      <table className="min-w-full divide-y divide-[#1E293B] text-start text-xs">
        <thead className="bg-[#0B1420] text-[#E0E1DD] uppercase tracking-wider font-mono">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-semibold text-[10px]">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1E293B] bg-transparent text-[#E0E1DD]">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500 font-mono">
                <span className="inline-block animate-spin mr-2">⏳</span> Loading sovereign ledger records...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500 font-mono">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr 
                key={row.id} 
                onClick={() => onRowClick?.(row)}
                className={`hover:bg-[#1A2C42] transition-colors duration-150 ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 font-sans">
                    {col.render ? col.render(row) : (row as any)[col.key]}
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

export default ExpressTable;
