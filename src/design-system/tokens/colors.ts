/**
 * Iraq Digital Gateway (IDG) Sovereign Color Tokens
 * Compliant with WCAG 2.1 AA, RTL ergonomics, and high-fidelity dark-mode principles.
 */
export const colors = {
  // Sovereign Base Backgrounds
  background: {
    primary: '#0D1B2A',      // Matte Dark Blue (Main Canvas)
    secondary: '#111E2E',    // Slightly darker slate-blue (Header/Cards)
    tertiary: '#0B1420',     // Deepest navy-black (Input, Sub-Cards)
    accentHover: '#1A2C42',  // Hover background state
    slateRow: 'rgba(16, 34, 53, 0.4)', // Faded slate highlight
  },

  // Typography Contrast Levels
  text: {
    primary: '#FFFFFF',      // Crisp White (headers, inputs)
    secondary: '#E0E1DD',    // Light Slate Gray (readable description)
    muted: '#4D6682',        // Muted gray-blue (metadata & borders)
    disabled: '#334155',     // Sleek disabled text
  },

  // Sovereign Accents and Status Indicators
  accent: {
    gold: '#E0A96D',         // Premium Sovereign Gold (languages, priority actions, indicators)
    goldFaded: 'rgba(224, 169, 109, 0.15)', // Muted glow or highlight
    goldBorder: 'rgba(224, 169, 109, 0.45)', // Premium borders
  },

  status: {
    secure: '#52B788',       // Muted Mint Green (Online, Correct, Managed)
    secureFaded: 'rgba(82, 183, 136, 0.15)',
    danger: '#EF4444',       // Alert Red (Anomalies, Failure)
    dangerFaded: 'rgba(239, 68, 68, 0.15)',
    warning: '#F59E0B',      // Amber Warning (In-progress, Pending Audits)
    warningFaded: 'rgba(245, 158, 11, 0.15)',
    info: '#22D3EE',         // Cyan Info (Telemetry, Stats, Micro-indicators)
    infoFaded: 'rgba(34, 211, 238, 0.15)',
  },

  border: {
    fadedActive: '#1E293B',  // Slate border
    subtle: '#1E293B',       // Primary panel border
    subtleLight: '#334155',  // Focus/Light border
  }
} as const;

export type Colors = typeof colors;
