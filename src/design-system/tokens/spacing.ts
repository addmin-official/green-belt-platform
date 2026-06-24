/**
 * Iraq Digital Gateway (IDG) Spacing & Layout Tokens
 * Enforces strict WCAG-safe sizes, touch target sizing, and dynamic margins to prevent text clipping.
 */
export const spacing = {
  // Touch Targets (WCAG 2.2 AAA minimum 44px)
  touchTargetMin: '44px',
  
  // Standard paddings and margins
  px0: '0px',
  px1: '4px',
  px2: '8px',
  px3: '12px',
  px4: '16px',
  px6: '24px',
  px8: '32px',
  px10: '40px',
  px12: '48px',
  px16: '64px',

  // Safe bottom paddings (Minimum 24px/pb-6 or pb-8 to completely eliminate truncated text)
  safeBottomPadding: '24px',
  safeBottomPaddingExpanded: '32px',

  // Icons spaced buffer
  iconGap: '12px',
  iconGapWide: '16px',

  // Grid/Flex standard gaps
  gapCompact: '8px',
  gapStandard: '16px',
  gapExtended: '24px',
  gapInteractive: '12px',
} as const;

export type Spacing = keyof typeof spacing;
