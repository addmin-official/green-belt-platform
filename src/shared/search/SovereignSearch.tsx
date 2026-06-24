import React from 'react';

export interface SovereignSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  activeFilter?: string;
  filters?: { value: string; label: string }[];
  onFilterChange?: (filter: string) => void;
}

export const SovereignSearch: React.FC<SovereignSearchProps> = ({
  value,
  onChange,
  placeholder = 'Search gateway registry...',
  activeFilter,
  filters,
  onFilterChange
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-2.5 w-full">
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-4 pr-4 py-2 border border-[#1E293B] bg-[#0B1420] text-white placeholder-slate-500 rounded focus:ring-1 focus:ring-[#E0A96D] focus:border-[#E0A96D] outline-none text-xs font-sans transition-all duration-150"
        />
      </div>
      {filters && onFilterChange && (
        <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`px-3 py-1.5 rounded text-[10px] uppercase font-mono tracking-wider transition-all duration-150 border cursor-pointer border-[#1E293B] ${
                activeFilter === f.value
                  ? 'bg-[#E0A96D]/15 text-[#E0A96D] border-[#E0A96D]/45 font-medium shadow-[0_0_8px_rgba(224,169,109,0.15)]'
                  : 'bg-[#111E2E] text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SovereignSearch;
