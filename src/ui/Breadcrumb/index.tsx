import React from 'react';
import { colors } from '../../design-system/tokens/colors';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const isRtl = document.dir === 'rtl';

  return (
    <nav className="flex items-center gap-1.5 text-[11px] font-mono select-none text-start w-full" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="text-slate-600 font-bold px-1 select-none">
                {isRtl ? '←' : '→'}
              </span>
            )}
            {isLast ? (
              <span className="text-slate-400 font-bold truncate">
                {item.label}
              </span>
            ) : (
              <button
                onClick={item.onClick}
                className={`text-[#E0A96D] hover:text-[#E0A96D]/80 hover:underline cursor-pointer transition-colors max-w-[150px] truncate`}
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
