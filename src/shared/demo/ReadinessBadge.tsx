import React from 'react';
import { CheckCircle, AlertTriangle, ShieldAlert } from 'lucide-react';

export type ReadinessState = 'READY' | 'WARNING' | 'BLOCKED';

interface ReadinessBadgeProps {
  state: ReadinessState;
  lang: 'en' | 'ar' | 'ku';
  className?: string;
}

export const ReadinessBadge: React.FC<ReadinessBadgeProps> = ({ state, lang, className = '' }) => {
  const getLabel = () => {
    switch (state) {
      case 'READY':
        return {
          en: 'READY FOR ACQUISITION',
          ar: 'جاهز للاعتماد النهائي',
          ku: 'ئامادەیە بۆ وەرگرتن'
        }[lang] || 'READY FOR ACQUISITION';
      case 'WARNING':
        return {
          en: 'NON-CRITICAL WARNINGS',
          ar: 'تنبيهات غير معرقلة',
          ku: 'هۆشداری نا-گرنگ'
        }[lang] || 'NON-CRITICAL WARNINGS';
      case 'BLOCKED':
        return {
          en: 'BLOCKED BY ENFORCEMENT',
          ar: 'مرفوض - قيد الموانع',
          ku: 'ڕاگیراوە بەهۆی لادان'
        }[lang] || 'BLOCKED BY ENFORCEMENT';
      default:
        return 'UNKNOWN_STATUS';
    }
  };

  const currentLabel = getLabel();

  if (state === 'READY') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/40 rounded-full text-[11px] font-bold text-emerald-400 font-mono ${className}`}>
        <CheckCircle className="w-3.5 h-3.5 animate-pulse text-emerald-400 shrink-0" />
        <span className="tracking-wide uppercase">{currentLabel}</span>
      </div>
    );
  }

  if (state === 'WARNING') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/40 rounded-full text-[11px] font-bold text-amber-400 font-mono ${className}`}>
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="tracking-wide uppercase">{currentLabel}</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/40 rounded-full text-[11px] font-bold text-rose-400 font-mono ${className}`}>
      <ShieldAlert className="w-3.5 h-3.5 animate-bounce text-rose-400 shrink-0" />
      <span className="tracking-wide uppercase">{currentLabel}</span>
    </div>
  );
};
