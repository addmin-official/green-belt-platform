import { READABILITY_TOKENS } from './readabilityTokens';

export const kurdishTypography = {
  fontFamily: READABILITY_TOKENS.fontStack,
  baseMinSize: READABILITY_TOKENS.minFontSize.body,
  lineHeight: READABILITY_TOKENS.lineHeight.extraRelaxed, // Even higher spacing for Kurdish visually separated scripts
  letterSpacing: READABILITY_TOKENS.letterSpacing.normal,
  classes: {
    body: 'font-sans text-[15px] leading-loose text-slate-100 tracking-normal normal-case text-right',
    label: 'font-sans text-[13px] leading-relaxed text-slate-300 font-semibold tracking-normal normal-case text-right',
    heading: 'font-sans text-[18px] leading-relaxed text-white font-extrabold tracking-normal normal-case text-right',
    tableCell: 'font-sans text-[14px] leading-relaxed tracking-normal text-right',
  }
};
