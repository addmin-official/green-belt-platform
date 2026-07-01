import { useState } from 'react';

const fields = [
  ['app.title', 'ناونیشانی پلاتفۆرم'],
  ['app.subtitle', 'ژێرناونیشانی پلاتفۆرم'],
  ['mode.notice', 'ئاگاداریی دۆخی کارکردن'],
  ['committee.title', 'ناونیشانی ژووری بڕیار'],
  ['committee.description', 'ڕوونکردنەوەی ژووری بڕیار'],
  ['public.cta', 'دەقی دوگمەی چوونە ناو پلاتفۆرم'],
] as const;

export default function InlineTextEditor() {
  const [values, setValues] = useState<Record<string, string>>({});

  return (
    <section dir="rtl" className="rounded-2xl border border-sky-400/20 bg-sky-400/5 p-4">
      <h3 className="text-sm font-black text-sky-100">دەستکاریکردنی دەقەکانی ڕووکار</h3>
      <p className="mt-2 text-xs leading-7 text-slate-400">دەقەکان بگۆڕە و پاشان هەڵیان بگرە.</p>
      <div className="mt-4 grid gap-3">
        {fields.map(([key, label]) => (
          <label key={key} className="grid gap-2 text-xs font-bold text-slate-300">
            {label}
            <textarea
              rows={3}
              value={values[key] ?? ''}
              onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))}
              className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm leading-7 text-white"
            />
          </label>
        ))}
      </div>
    </section>
  );
}
