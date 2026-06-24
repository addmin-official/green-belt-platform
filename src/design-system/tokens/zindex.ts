/**
 * Iraq Digital Gateway (IDG) Layering Index Tokens
 */
export const zindex = {
  deep: -1,
  base: 0,
  dropdown: 10,
  sticky: 50,
  fixed: 60,
  overlay: 100,
  modal: 200,
  popover: 300,
  toast: 9999,
} as const;

export type ZIndex = keyof typeof zindex;
