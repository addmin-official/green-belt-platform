import type { ReactNode } from 'react';
import { CURRENT_PLATFORM_MODE, PLATFORM_MODE } from '../../config/platformMode';

type Props = {
  children: ReactNode;
};

export default function PlatformModeGate({ children }: Props) {
  if (CURRENT_PLATFORM_MODE.showDemoDashboard) {
    return <>{children}</>;
  }

  return (
    <section
      className="rounded-2xl border border-sky-400/20 bg-sky-400/5 p-6 text-right"
      dir="rtl"
      aria-live="polite"
    >
      <span className="inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-[10px] font-black text-sky-200">
        {PLATFORM_MODE.toUpperCase()}
      </span>
      <h2 className="mt-4 text-xl font-black text-sky-100">
        {CURRENT_PLATFORM_MODE.label}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-400">
        {CURRENT_PLATFORM_MODE.notice} داشبۆردی نمایشی لەم دۆخەدا داخراوە بۆ ئەوەی هیچ ژمارەی خەمڵێنراو وەک داتای ڕاستەقینە پیشان نەدرێت.
      </p>
    </section>
  );
}
