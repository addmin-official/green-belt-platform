import { READABILITY_TOKENS } from './readabilityTokens';

export const arabicScriptTypography = {
  fontFamily: READABILITY_TOKENS.fontStack,
  baseMinSize: READABILITY_TOKENS.minFontSize.body,
  lineHeight: READABILITY_TOKENS.lineHeight.relaxed,
  letterSpacing: READABILITY_TOKENS.letterSpacing.normal,
  classes: {
    body: 'font-sans text-[15px] leading-relaxed text-slate-100 tracking-normal normal-case text-right',
    label: 'font-sans text-[13px] leading-relaxed text-slate-400 font-semibold tracking-normal normal-case text-right',
    heading: 'font-sans text-[18px] leading-snug text-white font-bold tracking-normal normal-case text-right',
    tableCell: 'font-sans text-[14px] leading-relaxed tracking-normal text-right',
    kpiLabel: 'font-sans text-[13px] leading-relaxed tracking-normal uppercase-none text-right',
  }
};
