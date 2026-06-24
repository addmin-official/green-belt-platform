/**
 * Iraq Digital Gateway (IDG) Motion/Transitions Tokens
 */
export const motion = {
  transitionProperty: {
    all: 'all',
    colors: 'color, background-color, border-color, text-decoration-color, fill, stroke',
    opacity: 'opacity',
    transform: 'transform',
  },
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
  },
  timingFunction: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const;

export type Motion = keyof typeof motion;
