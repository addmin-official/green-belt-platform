import React, { useEffect } from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
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
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Dialog Box */}
      <div 
        className="relative bg-[#111e2e] border border-[#E0A96D]/30 w-full max-w-lg shadow-2xl z-10 p-6 flex flex-col gap-4 animate-fade-in"
        style={{ borderRadius: radius.xl }}
        dir={document.dir}
      >
        <div className="flex items-center justify-between border-b border-slate-850 pb-3">
          <h3 className="text-sm md:text-base font-semibold font-display text-white">
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

        <div className="text-slate-300 text-xs md:text-sm mt-1 max-h-[70vh] overflow-y-auto pr-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
