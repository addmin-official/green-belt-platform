export type PlatformMode = 'demo' | 'pilot' | 'live';

const modes: PlatformMode[] = ['demo', 'pilot', 'live'];

function resolveMode(value: string | undefined): PlatformMode {
  const normalized = value?.trim().toLowerCase();
  return modes.includes(normalized as PlatformMode)
    ? (normalized as PlatformMode)
    : 'demo';
}

export const PLATFORM_MODE = resolveMode(import.meta.env.VITE_PLATFORM_MODE);

export const PLATFORM_MODE_META = {
  demo: {
    label: 'دۆخی نموونە',
    notice: 'ئەم ژمارانە تەنها بۆ پیشاندانی توانای سیستەمن.',
    showDemoDashboard: true,
  },
  pilot: {
    label: 'دۆخی تاقیکردنەوە',
    notice: 'تەنها داتای ڕاستەقینەی تاقیکردنەوە پیشان دەدرێت.',
    showDemoDashboard: false,
  },
  live: {
    label: 'دۆخی ڕاستەقینە',
    notice: 'تەنها داتای پشتڕاستکراو پیشان دەدرێت.',
    showDemoDashboard: false,
  },
} as const;

export const CURRENT_PLATFORM_MODE = PLATFORM_MODE_META[PLATFORM_MODE];
