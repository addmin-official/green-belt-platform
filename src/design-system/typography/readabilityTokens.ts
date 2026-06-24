export const READABILITY_TOKENS = {
  fontStack: '"Noto Naskh Arabic", "Noto Sans Arabic", "Segoe UI", Tahoma, Arial, sans-serif',
  minFontSize: {
    small: '13px',
    label: '13px',
    body: '15px',
    heading: '18px',
    tableCell: '14px',
    kpiLabel: '13px',
    kpiValue: '18px',
  },
  lineHeight: {
    relaxed: '1.75',
    extraRelaxed: '2.0',
    heading: '1.4',
  },
  letterSpacing: {
    normal: 'normal',
  },
  fontFeatureSettings: 'normal',
};

export function getReadabilityClass(
  lang: 'en' | 'ar' | 'ku' | string,
  type: 'body' | 'label' | 'heading' | 'tableCell' | 'kpiLabel' | 'kpiValue' | 'small' | 'desc',
  defaultClass: string = ''
): string {
  const isRtl = lang === 'ku' || lang === 'ar';
  if (!isRtl) {
    return defaultClass;
  }
  
  // High readability overrides for Arabic-script (no uppercase, no tracking, size limit, no font-mono)
  switch (type) {
    case 'body':
      return 'rtl-body text-[15px] leading-relaxed text-slate-100 tracking-normal normal-case';
    case 'label':
      return 'rtl-label text-[13px] leading-relaxed font-semibold text-slate-200 tracking-normal normal-case';
    case 'heading':
      return 'rtl-heading text-[18px] leading-relaxed font-extrabold tracking-normal normal-case text-white';
    case 'tableCell':
      return 'rtl-table-cell text-[14px] leading-relaxed tracking-normal normal-case text-slate-100';
    case 'kpiLabel':
      return 'rtl-kpi-label text-[13px] leading-relaxed tracking-normal normal-case text-slate-300';
    case 'kpiValue':
      return 'rtl-heading text-[18px] leading-relaxed font-bold tracking-normal normal-case text-emerald-400';
    case 'small':
      return 'rtl-small-readable text-[13px] leading-normal tracking-normal normal-case text-slate-400';
    case 'desc':
      return 'rtl-body text-[14px] leading-relaxed tracking-normal normal-case text-slate-400';
    default:
      return 'rtl-readable tracking-normal normal-case';
  }
}

