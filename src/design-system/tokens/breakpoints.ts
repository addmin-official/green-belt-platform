/**
 * Iraq Digital Gateway (IDG) Breakpoint Design Tokens
 * Supporting mobile, rugged checkpoint terminals, laptops, and 4K Command Center displays.
 */
export const breakpoints = {
  xs: '320px',
  sm: '375px',
  iphone: '390px',
  ruggedCompact: '430px',
  md: '576px',
  tabletCompact: '768px',
  tabletGov: '834px',
  lg: '1024px',
  xl: '1280px',
  deskGov: '1440px',
  fhd: '1920px',
  qhd: '2560px',
  uhd4k: '3840px',
} as const;

export type Breakpoint = keyof typeof breakpoints;
