import type { ReactNode } from 'react';
import { CURRENT_PLATFORM_MODE, PLATFORM_MODE } from '../../config/platformMode';

type Props = {
  children: ReactNode;
};

export default function PlatformModeGate({ children }: Props) {
  const isLive = PLATFORM_MODE === 'live';

  return (
    <div className="space-y-5" dir="rtl">
      <section className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-5 py-4 shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[10px] font-black text-emerald-200">
                {PLATFORM_MODE.toUpperCase()}
              </span>
              <span className="text-[11px] font-black text-slate-300">
                {isLive ? 'ئامادە بۆ داتای ڕاستەقینە' : 'داتای پیشاندانی نموونە'}
              </span>
            </div>
            <h2 className="mt-3 text-base font-black text-emerald-100">
              {CURRENT_PLATFORM_MODE.label}
            </h2>
            <p className="mt-2 max-w-4xl text-xs leading-7 text-slate-400">
              {CURRENT_PLATFORM_MODE.notice} داشبۆردەکە بە تەواوی کراوەتەوە بۆ پیشاندانی توانای سیستەم. هەر ژمارەیەکی هێشتا پشتڕاستنەکراو بە داتای نمایشی مامەڵەی لەگەڵ دەکرێت تا داتای مەیدانی پەیوەست بکرێت.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/15 px-4 py-3 text-xs text-slate-400">
            دۆخی سیستەم
            <strong className="mt-1 block text-emerald-200">چالاک و ئامادە</strong>
          </div>
        </div>
      </section>

      <div data-platform-dashboard-mode={PLATFORM_MODE}>{children}</div>
    </div>
  );
}
