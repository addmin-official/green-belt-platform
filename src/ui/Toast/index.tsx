import React, { useEffect } from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface ToastProps {
  message: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getColorStyles = () => {
    switch (type) {
      case 'success':
        return 'border-[#52B788] text-[#52B788] bg-[#0c1c15]';
      case 'warning':
        return 'border-amber-500 text-amber-400 bg-[#241703]';
      case 'error':
        return 'border-red-500 text-red-400 bg-[#240606]';
      case 'info':
      default:
        return 'border-cyan-500 text-cyan-400 bg-[#061824]';
    }
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 flex items-center gap-3 px-4.5 py-3 border shadow-2xl animate-fade-in`}
      style={{ borderRadius: radius.md }}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${type === 'success' ? 'bg-[#52B788]' : type === 'warning' ? 'bg-amber-400' : type === 'error' ? 'bg-red-500' : 'bg-cyan-400'} animate-ping shrink-0`} />
      <span className="text-xs font-mono font-semibold text-slate-100">{message}</span>
      <button 
        onClick={onClose}
        className="text-slate-400 hover:text-white transition-colors ml-2 cursor-pointer p-0.5"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
