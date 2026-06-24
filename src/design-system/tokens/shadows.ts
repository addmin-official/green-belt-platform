import { elevation } from './elevation';

/**
 * Iraq Digital Gateway (IDG) Shadows & Glow Tokens
 * Consolidates the standard shadows and glows for unified rendering.
 */
export const shadows = {
  none: elevation.none,
  sm: elevation.sm,
  md: elevation.md,
  lg: elevation.lg,
  xl: elevation.xl,
  glowGold: elevation.glowGold,
  glowGreen: elevation.glowGreen,
  inner: elevation.inner,
  
  // Custom High-Contrast Focus & Border Glows
  focus: '0 0 0 2px rgba(224, 169, 109, 0.4)',
  focusGreen: '0 0 0 2px rgba(82, 183, 136, 0.4)',
  cardHover: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
} as const;

export type Shadows = typeof shadows;
