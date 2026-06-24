import React, { useEffect } from 'react';
import { colors } from '../../design-system/tokens/colors';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  side?: 'left' | 'right';
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  side = 'right',
  children
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Align side naturally to the document's text direction
  const isRtl = document.dir === 'rtl';
  const resolvedSide = isRtl 
    ? (side === 'right' ? 'left' : 'right') 
    : side;

  const sideStyle = resolvedSide === 'left' 
    ? 'left-0 right-auto animate-slide-in-left' 
    : 'right-0 left-auto animate-slide-in-right';

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer content */}
      <div 
        className={`fixed top-0 bottom-0 max-w-md w-full bg-[#111e2e] border-l rtl:border-r border-slate-800 shadow-2xl z-10 flex flex-col h-full transform transition-transform ${sideStyle}`}
      >
        <div className="p-4 md:p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm md:text-base font-bold font-display text-[#E0A96D]">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 md:p-6 text-xs md:text-sm text-slate-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
