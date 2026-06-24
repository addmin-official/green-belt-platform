import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const isRtl = document.dir === 'rtl';

  return (
    <div className="flex items-center justify-between gap-4 mt-4 w-full text-xs font-mono">
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1.5 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/40 disabled:opacity-40 disabled:cursor-not-allowed select-none transition-all"
        style={{ borderRadius: radius.md }}
      >
        {isRtl ? 'التالي →' : '← Previous'}
      </button>

      <span className="text-slate-400 font-bold whitespace-nowrap">
        {currentPage} / {totalPages}
      </span>

      <button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1.5 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/40 disabled:opacity-40 disabled:cursor-not-allowed select-none transition-all"
        style={{ borderRadius: radius.md }}
      >
        {isRtl ? '← السابق' : 'Next →'}
      </button>
    </div>
  );
};

export default Pagination;
