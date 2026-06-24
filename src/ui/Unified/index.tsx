import React, { useState, useEffect } from 'react';
import { 
  FolderOpen, Search, AlertCircle, ShieldAlert, WifiOff, RefreshCw, X, Lock, FileSpreadsheet, Info
} from 'lucide-react';
import { radius } from '../../design-system/tokens/radius';

// ==========================================
// 1. UnifiedEmptyState
// ==========================================
export interface UnifiedEmptyStateProps {
  type: 'no-data' | 'no-results' | 'no-records' | 'no-permissions' | 'service-offline';
  lang: 'en' | 'ar' | 'ku';
  action?: React.ReactNode;
}

const EMPTY_LOCALIZATION = {
  en: {
    'no-data': {
      title: 'No Data Available',
      desc: 'Sovereign database is currently empty. No active telemetry records were compiled for this system grid yet.',
    },
    'no-results': {
      title: 'No Matching Results',
      desc: 'Your search query yielded no parameters. Modify your filters or double-check values and try again.',
    },
    'no-records': {
      title: 'No Official Records Found',
      desc: 'No historical file or transaction logs exist in the repository conforming to your request criteria.',
    },
    'no-permissions': {
      title: 'Access Restricted',
      desc: 'Under-cleared security profile. Your cryptographic credentials lack required clearance for this digital drawer.',
    },
    'service-offline': {
      title: 'Federal Service Offline',
      desc: 'Connection interrupted. The national routing endpoint has been temporarily detached for synchronization.',
    }
  },
  ar: {
    'no-data': {
      title: 'لا تتوفر بيانات حالياً',
      desc: 'قاعدة البيانات السيادية فارغة حالياً. لم يتم تجميع أي سجلات قياس عن بعد نشطة لشبكة النظام هذه بعد.',
    },
    'no-results': {
      title: 'لم يتم العثور على نتائج مطابقة',
      desc: 'لم يسفر استعلام البحث الخاص بك عن أي معايير متوافقة. يرجى تعديل الفلاتر أو التحقق من المدخلات والمحاولة ثانية.',
    },
    'no-records': {
      title: 'لا توجد سجلات رسمية متوفرة',
      desc: 'لا توجد سجلات تاريخية أو مستندات معاملات في هذا المستودع تطابق شروط الطلب الخاص بك.',
    },
    'no-permissions': {
      title: 'الوصول مقيد أمنياً',
      desc: 'مستوى التصريح الرقمي غير كافٍ. تفتقر مفاتيح التشفير للمستند إلى الصلاحية الكافية لفتح هذا المجلد.',
    },
    'service-offline': {
      title: 'الخدمة الفيدرالية غير متصلة',
      desc: 'تم قطع الاتصال ببوابة الربط. نقطة التوجيه المركزية معزولة مؤقتاً لأغراض التزامن الدوري للبيانات.',
    }
  },
  ku: {
    'no-data': {
      title: 'هیچ داتایەک بەردەست نییە',
      desc: 'بنکەدراوەی نیشتمانیی لە ئێستادا بەتاڵە. هیچ لۆگێکی چالاک بۆ ئەم بەشە هێشتا کۆنەکراوەتەوە.',
    },
    'no-results': {
      title: 'هیچ ئەنجامێک نەدۆزرایەوە',
      desc: 'پێوەرەکانی گەڕانەکەت لەگەڵ هیچ زانیارییەکدا یەک ناگرنەوە. دەستکاری پاڵاوتاگەکان بکە و دووبارە تاقیبکەرەوە.',
    },
    'no-records': {
      title: 'هیچ تۆمارێکی فەرمی نەدۆزرایەوە',
      desc: 'هیچ بەڵگەنامە، مێژوو، یان لۆگێکی تراکنشنی فەرمی لە سیستەمەکەدا پاشەکەوت نەکراوە کە لەگەڵ داواکارییەکەت بگونجێت.',
    },
    'no-permissions': {
      title: 'دەستگەیشتن سنووردار کراوە',
      desc: 'ئاستی ڕێپێدانی ئاسایشی کەمە. کلیلە کریپتۆگرافییەکەت دەسەڵاتی پێویستی نییە بۆ چوونە ناو ئەم پەڕگەیەوە.',
    },
    'service-offline': {
      title: 'تۆڕی خزمەتگوزاری نیشتمانیی دەرەوەی هێڵە',
      desc: 'پەیوەندی دەروازەکە پچڕاوە. خاڵی سەرەکی دەروازەی نیشتمانیی بە شێوەیەکی کاتی بۆ نوێکردنەوە و هاوکاتکردن جیاکراوەتەوە.',
    }
  }
};

export const UnifiedEmptyState: React.FC<UnifiedEmptyStateProps> = ({ type, lang, action }) => {
  const tStrings = EMPTY_LOCALIZATION[lang]?.[type] || EMPTY_LOCALIZATION['en'][type];

  const getIcon = () => {
    switch (type) {
      case 'no-results':
        return <Search className="w-10 h-10 text-[#E0A96D]" />;
      case 'no-permissions':
        return <Lock className="w-10 h-10 text-rose-500" />;
      case 'service-offline':
        return <WifiOff className="w-10 h-10 text-amber-500" />;
      case 'no-records':
        return <FileSpreadsheet className="w-10 h-10 text-cyan-500" />;
      case 'no-data':
      default:
        return <FolderOpen className="w-10 h-10 text-[#E0A96D]" />;
    }
  };

  return (
    <div 
      className="p-8 md:p-12 border border-slate-800 bg-[#111e2e]/40 flex flex-col items-center justify-center text-center gap-4.5 rounded-xl max-w-2xl mx-auto w-full transition-all"
    >
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 text-slate-500 flex items-center justify-center select-none shadow-inner">
        {getIcon()}
      </div>

      <div className="flex flex-col gap-2 max-w-md">
        <h4 className="text-sm md:text-base font-bold uppercase font-display tracking-widest text-[#E0A96D]">
          {tStrings.title}
        </h4>
        <p className="text-xs text-slate-400 font-mono leading-relaxed">
          {tStrings.desc}
        </p>
      </div>

      {action && <div className="mt-2 shrink-0">{action}</div>}
    </div>
  );
};


// ==========================================
// 2. UnifiedErrorState
// ==========================================
export interface UnifiedErrorStateProps {
  type: 'network' | 'api' | 'auth' | 'authorization' | 'validation' | 'system';
  lang: 'en' | 'ar' | 'ku';
  customMessage?: string;
  onRetry?: () => void;
}

const ERROR_LOCALIZATION = {
  en: {
    network: {
      title: 'Federal Network Error',
      desc: 'Unable to establish secure cryptographic handshake with federal database routers. Review regional gateway telemetry.',
    },
    api: {
      title: 'API Gateway Integration Failure',
      desc: 'Gateway response timeout. The digital hub integration backend returned an invalid status header.',
    },
    auth: {
      title: 'Authentication Verification Mismatch',
      desc: 'Could not decrypt validation signature. Cryptographic token is missing, expired, or compromised.',
    },
    authorization: {
      title: 'Sovereign Clearness Insufficient',
      desc: 'Refused execution status. Current security credential profile is under-cleared for this directive branch.',
    },
    validation: {
      title: 'Data Policy Validation Mismatch',
      desc: 'The payload layout is incompatible with central customs and trade verification scheme rules.',
    },
    system: {
      title: 'Sovereign Core System Interruption',
      desc: 'A fatal kernel halt was recovered inside the processing module. Telemetry logs was automatically dispatched.',
    }
  },
  ar: {
    network: {
      title: 'خطأ في الشبكة الفيدرالية المشتركة',
      desc: 'تعذر تأسيس اتصال تشفير آمن مع جدران الحماية وقواعد المبيعات الفيدرالية. يرجى مراجعة بوابتك الإقليمية.',
    },
    api: {
      title: 'فشل التفاعل مع بوابة الـ API',
      desc: 'انتهت مهلة استجابة العقدة. أرجع محرك التبادل الموحد حالة غير معروفة أو تالفة.',
    },
    auth: {
      title: 'فشل پشتڕاستکردنەوە في التحقق الرقمي',
      desc: 'تعذر فك ترميز براءة توقيع الهوية الرقمية. رمز الوصول غير موجود أو منته الصلاحية.',
    },
    authorization: {
      title: 'مستوى التصريح والسيادة غير كافٍ',
      desc: 'حالة تنفيذ مرفوضة. لا يملك ملفك الشخصي الرمز المميز اللازم لتشغيل هذا البروتوكول الفيدرالي.',
    },
    validation: {
      title: 'عدم تطابق معايير التحقق من البيانات',
      desc: 'الحمولة التقنية المرسلة غير متوافقة مع لوائح الجمارك الفيدرالية وقواعد الكشف عن تضارب القيمة.',
    },
    system: {
      title: 'انقطاع مؤقت في معالجة السيادة الرقمية',
      desc: 'تم تسجيل توقف طارئ في نظام المعالجة المركزي. تم إرسال تقرير التشخيص التلقائي إلى غرف الصيانة العامة.',
    }
  },
  ku: {
    network: {
      title: 'هەڵە لە تۆڕی پەیوەندی نیشتمانیی',
      desc: 'ناتوانی لە بەدەستهێنانی پەیوەندییەکی پارێزراو لەگەڵ دەروازەی فیدراڵیی. پێداچوونەوە بە گەیەنەری هەرێمیدا بکە.',
    },
    api: {
      title: 'شکست لە بەستنەوەی دەروازەی API',
      desc: 'وەڵامی بنکەی گەیاندنی دەروازە کاتی بەسەرچوو. سەکۆی فیدراڵی وەڵامێکی نادیاری گەڕاندەوە.',
    },
    auth: {
      title: 'شکست لە پشتڕاستکردنەوەی ناسنامەی فەرمی',
      desc: 'پرۆتۆکۆلی واژۆی فەرمی ناتوانێت کۆدی ناسنامەکەت بخوێنێتەوە. تۆکنەکە یان بەسەرچووە یان گۆڕاوە.',
    },
    authorization: {
      title: 'پلەی دەسەڵاتی ئاسایشی نیشتمانیی پێویست نییە',
      desc: 'دەستگەیشتن ڕەتکرایەوە. هەژمارەکەت ئاستی یاسایی پێویستی نییە بۆ ئەنجامدانی ئەم فەرمانە بازرگانییە.',
    },
    validation: {
      title: 'گونجاونەبوون لەگەڵ یاسا نیشتمانییەکان',
      desc: 'پێکهاتەی داتاکانی تۆمارکراو هاوتەریب نین لەگەڵ سیستەمی یەکگرتووی گومرگ و کۆدە نیشتمانییەکان.',
    },
    system: {
      title: 'پچڕانی کاتیی لە سیستەمی فیدراڵیی',
      desc: 'سیستەمی ناوبژیوان پچڕانێکی بەدوای خۆیدا هێنا. ڕاپۆرتی باری ناتەواو بە شێوەیەکی ئۆتۆماتیکی بۆ تیمی ئایتی نێردرا.',
    }
  }
};

export const UnifiedErrorState: React.FC<UnifiedErrorStateProps> = ({ 
  type, lang, customMessage, onRetry 
}) => {
  const tStrings = ERROR_LOCALIZATION[lang]?.[type] || ERROR_LOCALIZATION['en'][type];

  return (
    <div 
      className="p-6 md:p-8 border border-red-500/30 bg-red-950/20 rounded-xl flex flex-col md:flex-row items-start gap-4 text-start max-w-3xl mx-auto w-full transition-all"
    >
      <div className="bg-red-950/60 p-3 rounded-xl border border-red-500/30 text-red-400 shrink-0 flex items-center justify-center self-start select-none">
        <ShieldAlert className="w-6 h-6 animate-pulse" />
      </div>

      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        <h4 className="text-sm md:text-base font-bold uppercase font-display tracking-wider text-red-300">
          {tStrings.title}
        </h4>
        <p className="text-xs text-slate-300 font-mono leading-relaxed mt-0.5">
          {customMessage || tStrings.desc}
        </p>
        
        {onRetry && (
          <div className="mt-3">
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-900/40 hover:bg-red-800/50 text-red-200 border border-red-500/45 text-xs font-mono rounded-lg transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {lang === 'en' ? 'Retry Handshake' : lang === 'ar' ? 'إعادة مصافحة التشفير' : 'سازانەوەی دووبارەی تۆڕ'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


// ==========================================
// 3. UnifiedToastSystem
// ==========================================
export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

export interface UnifiedToastProps extends ToastItem {
  onClose: (id: string) => void;
}

export const UnifiedToast: React.FC<UnifiedToastProps> = ({ id, message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const getColorStyles = () => {
    switch (type) {
      case 'success':
        return 'border-[#52B788] text-[#52B788] bg-[#0c1c15]/95';
      case 'warning':
        return 'border-amber-500 text-amber-400 bg-[#241703]/95';
      case 'error':
        return 'border-red-500 text-red-400 bg-[#240606]/95';
      case 'info':
      default:
        return 'border-cyan-500 text-cyan-400 bg-[#061824]/95';
    }
  };

  return (
    <div 
      className={`flex items-center gap-3.5 px-4.5 py-3 border shadow-2xl animate-fade-in pointer-events-auto max-w-sm w-full ${getColorStyles()} transition-all`}
      style={{ borderRadius: radius.xl }}
    >
      <div className={`w-2 h-2 rounded-full ${type === 'success' ? 'bg-[#52B788]' : type === 'warning' ? 'bg-amber-400' : type === 'error' ? 'bg-red-500' : 'bg-cyan-400'} animate-ping shrink-0`} />
      
      <span className="text-xs font-mono font-semibold text-slate-100 flex-1 leading-relaxed text-start select-none">
        {message}
      </span>

      <button 
        onClick={() => onClose(id)}
        className="text-slate-400 hover:text-white transition-colors duration-150 shrink-0 cursor-pointer p-0.5 rounded-md hover:bg-slate-800/40"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

// Global standalone emitter / UI wrapper we use inside App module triggers
export interface UnifiedToastContainerProps {
  toasts: ToastItem[];
  removeToast: (id: string) => void;
}

export const UnifiedToastContainer: React.FC<UnifiedToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <UnifiedToast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};


// ==========================================
// 4. UnifiedModal
// ==========================================
export interface UnifiedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
  icon?: React.ReactNode;
}

export const UnifiedModal: React.FC<UnifiedModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footerActions,
  icon,
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Dialog Box */}
      <div 
        className="relative bg-[#111e2e] border border-[#E0A96D]/30 w-full max-w-xl shadow-2xl z-10 p-6 flex flex-col gap-4 animate-fade-in rounded-xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-850 pb-3 gap-3">
          <div className="flex items-center gap-2.5 text-start">
            {icon && (
              <div className="p-1.5 bg-[#E0A96D]/10 rounded-lg border border-[#E0A96D]/30 text-[#E0A96D] shrink-0">
                {icon}
              </div>
            )}
            <h3 className="text-sm md:text-base font-semibold font-display text-white uppercase text-start">
              {title}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-md hover:bg-slate-850"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="text-slate-300 text-xs md:text-sm mt-1 max-h-[60vh] overflow-y-auto pr-1 text-start leading-relaxed font-sans">
          {children}
        </div>

        {/* Modal Footer */}
        {footerActions && (
          <div className="flex items-center justify-end gap-3.5 border-t border-slate-850 pt-3.5">
            {footerActions}
          </div>
        )}
      </div>
    </div>
  );
};


// ==========================================
// 5. UnifiedSearchBar
// ==========================================
export interface UnifiedSearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  placeholder?: string;
  lang: 'en' | 'ar' | 'ku';
  resultsCount?: number;
  filterComponent?: React.ReactNode;
}

export const UnifiedSearchBar: React.FC<UnifiedSearchBarProps> = ({
  value,
  onChange,
  onClear,
  placeholder,
  lang,
  resultsCount,
  filterComponent
}) => {
  const getSearchText = () => {
    switch (lang) {
      case 'ar':
        return {
          placeholder: 'ابحث في السجلات والقرارات الفيدرالية...',
          clear: 'مسح',
          results: 'سجلات متطابقة'
        };
      case 'ku':
        return {
          placeholder: 'گەڕان لە لۆگ، پێناسە و بڕیارە فەرمییەکان...',
          clear: 'سڕینەوە',
          results: 'یاخود ئەنجام دۆزرانەوە'
        };
      case 'en':
      default:
        return {
          placeholder: 'Search official federal registries & workflows...',
          clear: 'Clear',
          results: 'matching records'
        };
    }
  };

  const texts = getSearchText();

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        {/* Input box */}
        <div className="flex-1 relative">
          <span className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4 text-[#E0A96D]" />
          </span>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || texts.placeholder}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl ps-10 pe-10 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#E0A96D]/50 focus:ring-1 focus:ring-[#E0A96D]/25 transition-colors text-start"
          />
          {value && (
            <button
              onClick={onClear}
              className="absolute inset-y-0 end-0 pe-3 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span className="text-[10px] bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded uppercase font-mono mr-1">
                {texts.clear}
              </span>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dynamic customized filter slot if provided */}
        {filterComponent && (
          <div className="shrink-0 flex items-center">
            {filterComponent}
          </div>
        )}
      </div>

      {/* Result Counters */}
      {resultsCount !== undefined && resultsCount > 0 && (
        <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 uppercase tracking-wide text-start">
          <Info className="w-3.5 h-3.5 text-[#E0A96D]" />
          {resultsCount} {texts.results}
        </span>
      )}
    </div>
  );
};
