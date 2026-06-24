/**
 * Iraq Digital Gateway (IDG) Typography Tokens
 * Utilizes "Vazirmatn" and "IBM Plex Sans Arabic" for sovereign RTL text display.
 */
export const typography = {
  fontFamily: {
    rtl: '"Vazirmatn", "IBM Plex Sans Arabic", sans-serif',
    ltr: '"Inter", "Space Grotesk", sans-serif',
    mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    heading2: '1.5rem', // 24px
    heading1: '1.875rem', // 30px
    display: '2.25rem',   // 36px
  },
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extraBold: '800',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const;

export type Typography = keyof typeof typography;
