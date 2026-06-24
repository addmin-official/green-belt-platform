import React, { useState, useRef, useEffect } from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface DropdownItem {
  id: string;
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-right" ref={containerRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div 
          className="absolute right-0 rtl:right-auto rtl:left-0 mt-2.5 w-44 bg-[#111e2e] border border-slate-800 shadow-2xl z-50 overflow-hidden"
          style={{ borderRadius: radius.md }}
        >
          <div className="py-1">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => {
                  it.onClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-start text-slate-300 hover:text-white hover:bg-slate-800/40 cursor-pointer transition-colors"
              >
                {it.icon && <span className="shrink-0">{it.icon}</span>}
                <span>{it.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
