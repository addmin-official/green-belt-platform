import { ShieldCheck } from 'lucide-react';

export default function BrandNotice({ compact = false }: { compact?: boolean }) {
  return (
    <section
      dir="rtl"
      lang="ku"
      aria-label="ئاگاداریی مافی نیشانە و ناوەڕۆک"
      className={compact
        ? 'mt-6 rounded-2xl border border-emerald-400/15 bg-[#071c10] p-5 text-slate-200'
        : 'border-y border-white/10 bg-[#04120a] px-4 py-5 text-slate-200'}
    >
      <div className={compact ? '' : 'mx-auto max-w-7xl'}>
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-300/20 bg-amber-300/5 text-amber-300">
            <ShieldCheck size={19} />
          </span>
          <div>
            <strong className="block text-sm font-black text-white">
              کەمەربەندی سەوز™
            </strong>
            <p className="mt-2 max-w-5xl text-[11px] leading-7 text-slate-400">
              ناو، ناسنامەی بصری، ناوەڕۆک، فۆرم، ڕێکاری کار و مۆدێلی سیستەم
              تایبەتن بە کەمەربەندی سەوز™. دووبارە بەکارهێنان، بڵاوکردنەوە
              یان بەکارهێنانی بازرگانی پێویستی بە ڕەزامەندیی نووسراو هەیە.
            </p>
          </div>
        </div>
        <p className="mt-3 border-t border-white/5 pt-3 text-[10px] leading-6 text-slate-500">
          نیشانەی ™ واتای داواکاریی مافی نیشانەی بازرگانییە و بە خۆی مانای
          تۆماربوونی فەرمی نییە. هەموو مافەکان پارێزراون.
        </p>
      </div>
    </section>
  );
}
