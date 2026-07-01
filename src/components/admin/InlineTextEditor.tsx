import { useEffect, useState } from 'react';
import { RotateCcw, Save } from 'lucide-react';

import { useAuth } from '../../auth/AuthProvider';
import {
  loadUiCopy,
  saveUiCopy,
  type UiCopyMap,
} from '../../services/uiCopyService';

const COPY_FIELDS = [
  ['app.title', 'ناونیشانی پلاتفۆرم'],
  ['app.subtitle', 'ژێرناونیشانی پلاتفۆرم'],
  ['mode.notice', 'ئاگاداریی دۆخی کارکردن'],
  ['committee.title', 'ناونیشانی ژووری بڕیار'],
  ['committee.description', 'ڕوونکردنەوەی ژووری بڕیار'],
  ['public.cta', 'دەقی دوگمەی چوونە ناو پلاتفۆرم'],
] as const;

export default function InlineTextEditor() {
  const { role, user } = useAuth();
  const [values, setValues] = useState<UiCopyMap>({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (role === 'admin') void loadUiCopy().then(setValues);
  }, [role]);

  if (role !== 'admin') return null;

  const save = async () => {
    if (!user?.uid) return;
    await saveUiCopy(values, user.uid);
    setMessage('دەقەکان بە سەرکەوتوویی هەڵگیران.');
  };

  const reset = async () => {
    if (!user?.uid) return;
    await saveUiCopy({}, user.uid);
    setValues({});
    setMessage('دەقەکان بۆ دۆخی بنەڕەتی گەڕێندرانەوە.');
  };

  return (
    <section dir="rtl" className="rounded-2xl border border-sky-400/20 bg-sky-400/5 p-4">
      <h3 className="text-sm font-black text-sky-100">دەستکاریکردنی دەقەکانی ڕووکار</h3>
      <p className="mt-2 text-xs leading-7 text-slate-400">دەقەکان بگۆڕە و پاشان هەڵیان بگرە.</p>

      <div className="mt-4 grid gap-3">
        {COPY_FIELDS.map(([key, label]) => (
          <label key={key} className="grid gap-2 text-xs font-bold text-slate-300">
            {label}
            <textarea
              rows={3}
              value={values[key] ?? ''}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [key]: event.target.value,
                }))
              }
              className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm leading-7 text-white"
            />
          </label>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={save} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/15 px-4 py-2 text-xs font-black text-emerald-200">
          <Save size={15} />
          هەڵگرتن
        </button>
        <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-xs font-black text-red-200">
          <RotateCcw size={15} />
          گەڕاندنەوە
        </button>
      </div>

      {message ? <p className="mt-3 text-xs text-sky-200">{message}</p> : null}
    </section>
  );
}
