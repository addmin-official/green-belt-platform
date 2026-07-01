import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileCheck2,
  FileText,
  FlaskConical,
  Printer,
} from 'lucide-react';

type Tab = 'decision' | 'evidence' | 'workflow' | 'quality' | 'risk' | 'reports';
type Status = 'ready' | 'conditional' | 'missing';
type Item = {
  title: string;
  owner: string;
  status: Status;
  evidence: string;
  due: string;
};

const ITEMS: Item[] = [
  {
    title: 'پەسەندکردنی شوێنی تاقیکردنەوەی سەرەتایی',
    owner: 'لایەنی یاسایی و خاوەنی شوێن',
    status: 'missing',
    evidence: 'نامەی نووسراو و نەخشەی سنووری شوێن',
    due: 'پێش دەستپێکردن',
  },
  {
    title: 'ڕێکخستنی پڕۆسەی گواستنەوە',
    owner: 'بەڕێوەبەری ئۆپەراسیۆن',
    status: 'conditional',
    evidence: 'ڕێڕەوی گواستنەوە و تۆماری بار',
    due: 'هەفتەی یەکەم',
  },
  {
    title: 'گرێبەستی ڕێستورانتە بەشدارەکان',
    owner: 'بەشی هاوبەشی',
    status: 'conditional',
    evidence: 'یاداشتنامەی لێکتێگەیشتن و فۆڕمی جیاکردنەوە لە سەرچاوە',
    due: 'پێش کۆکردنەوە',
  },
  {
    title: 'پەیوەندی و نرخنامەی تاقیگە',
    owner: 'بەڕێوەبەری دڵنیایی جۆرایەتی',
    status: 'missing',
    evidence: 'لیستی پشکنین و زنجیرەی بەرپرسیاریی نموونە',
    due: 'پێش نموونەوەرگرتن',
  },
  {
    title: 'ڕێڕەوی پەسەندکردنی دڵنیایی جۆرایەتی',
    owner: 'بەڕێوەبەری دڵنیایی جۆرایەتی',
    status: 'ready',
    evidence: 'ئەنجامی تاقیگە و پەسەندکردنی قوفڵکراوی جۆرایەتی',
    due: 'ئامادە',
  },
  {
    title: 'جیاکردنەوەی داتای نمایشی و داتای ڕاستەقینە',
    owner: 'بەڕێوەبەری سیستەم',
    status: 'ready',
    evidence: 'دۆخی نمایشی، تاقیکردنەوەی سەرەتایی و کارکردنی ڕاستەقینە',
    due: 'ئامادە',
  },
  {
    title: 'نەخشە و شوێنی پڕۆژەکان',
    owner: 'تیمی نەخشە و ئۆپەراسیۆن',
    status: 'conditional',
    evidence: 'شوێن‌دیاریکەر و دۆخی پشتڕاستکردنەوە',
    due: 'لە قۆناغی تاقیکردنەوەی سەرەتایی',
  },
];

const LABEL: Record<Status, string> = {
  ready: 'ئامادە',
  conditional: 'بە مەرج',
  missing: 'تەواونەکراو',
};

const TONE: Record<Status, string> = {
  ready: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
  conditional: 'border-amber-400/20 bg-amber-400/10 text-amber-200',
  missing: 'border-red-400/20 bg-red-400/10 text-red-200',
};

function download(name: string, body: string, type: string) {
  const url = URL.createObjectURL(new Blob([body], { type }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function CommitteeReadinessSuite() {
  const [tab, setTab] = useState<Tab>('decision');

  const counts = useMemo(
    () => ({
      ready: ITEMS.filter((item) => item.status === 'ready').length,
      conditional: ITEMS.filter((item) => item.status === 'conditional').length,
      missing: ITEMS.filter((item) => item.status === 'missing').length,
    }),
    [],
  );

  const exportCsv = () => {
    const rows = [
      ['مەرج', 'بەرپرسیار', 'دۆخ', 'بەڵگەی پێویست', 'کۆتا ماوە'],
      ...ITEMS.map((item) => [
        item.title,
        item.owner,
        LABEL[item.status],
        item.evidence,
        item.due,
      ]),
    ];

    download(
      'green-belt-readiness.csv',
      '\uFEFF' + rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n'),
      'text/csv;charset=utf-8',
    );
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'decision', label: 'ژووری بڕیار' },
    { id: 'evidence', label: 'ژووری بەڵگە' },
    { id: 'workflow', label: 'ڕێڕەوی تاقیکردنەوە' },
    { id: 'quality', label: 'جۆرایەتی و تاقیگە' },
    { id: 'risk', label: 'مەترسی و پابەندی' },
    { id: 'reports', label: 'ڕاپۆرت و هەناردەکردن' },
  ];

  return (
    <section
      className="mb-6 overflow-hidden rounded-2xl border border-[#cca553]/20 bg-[#081b0e] shadow-2xl"
      dir="rtl"
    >
      <header className="border-b border-white/5 bg-gradient-to-l from-[#17351d] to-[#09180e] p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-[10px] font-black text-amber-200">
                پەسەندکردنی مەرجدار
              </span>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[10px] font-black text-emerald-200">
                ئامادەکاری تاقیکردنەوەی سەرەتایی
              </span>
            </div>
            <h2 className="mt-3 text-lg font-black text-white">
              ژووری بڕیار و ئامادەکاری جێبەجێکردن
            </h2>
            <p className="mt-2 max-w-4xl text-xs leading-7 text-slate-400">
              ئەم بەشە بڕیار، بەڵگە، مەترسی و هەنگاوە پێویستەکانی پێش دەستپێکردنی
              تاقیکردنەوەی سەرەتایی پیشان دەدات. ئەم هەڵسەنگاندنە جێگای مۆڵەت،
              گرێبەست یان پەسەندکردنی نووسراو ناگرێتەوە.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-black">
            <div className="rounded-xl border border-emerald-400/15 bg-emerald-400/5 px-4 py-3 text-emerald-200">
              <span className="block text-lg">{counts.ready}</span>ئامادە
            </div>
            <div className="rounded-xl border border-amber-400/15 bg-amber-400/5 px-4 py-3 text-amber-200">
              <span className="block text-lg">{counts.conditional}</span>بە مەرج
            </div>
            <div className="rounded-xl border border-red-400/15 bg-red-400/5 px-4 py-3 text-red-200">
              <span className="block text-lg">{counts.missing}</span>تەواونەکراو
            </div>
          </div>
        </div>
      </header>

      <nav className="flex gap-2 overflow-x-auto border-b border-white/5 p-3">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={
              tab === item.id
                ? 'shrink-0 rounded-xl border border-[#cca553]/30 bg-[#cca553]/10 px-3 py-2 text-[11px] font-black text-[#e3c36c]'
                : 'shrink-0 rounded-xl border border-white/5 bg-black/10 px-3 py-2 text-[11px] font-bold text-slate-400'
            }
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-5">
        {tab === 'decision' && (
          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full min-w-[760px] text-right text-[11px]">
              <thead className="bg-black/20 text-slate-300">
                <tr>
                  <th className="p-3">مەرج</th>
                  <th className="p-3">بەرپرسیار</th>
                  <th className="p-3">دۆخ</th>
                  <th className="p-3">بەڵگەی پێویست</th>
                  <th className="p-3">کۆتا ماوە</th>
                </tr>
              </thead>
              <tbody>
                {ITEMS.map((item) => (
                  <tr key={item.title} className="border-t border-white/5 text-slate-400">
                    <td className="p-3 font-bold text-slate-200">{item.title}</td>
                    <td className="p-3">{item.owner}</td>
                    <td className="p-3">
                      <span className={`rounded-full border px-2 py-1 text-[9px] font-black ${TONE[item.status]}`}>
                        {LABEL[item.status]}
                      </span>
                    </td>
                    <td className="p-3">{item.evidence}</td>
                    <td className="p-3">{item.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'evidence' && (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              'نامەی پشتگیری و یاداشتنامەی لێکتێگەیشتن',
              'پەسەندکردنی شوێن',
              'گرێبەستی ڕێستورانت',
              'نرخنامەی تاقیگە',
              'ڕێنماییی کار و فۆڕمەکان',
              'وێنە و شوێن‌دیاریکەر',
              'تۆماری بار و وەرگرتن',
              'ڕاپۆرتی مانگانە',
            ].map((title) => (
              <article key={title} className="rounded-xl border border-white/5 bg-black/10 p-4">
                <FileCheck2 className="h-5 w-5 text-amber-300" />
                <h3 className="mt-3 text-xs font-black text-white">{title}</h3>
                <p className="mt-2 text-[10px] leading-6 text-slate-500">
                  هەر بەڵگەیەک دەبێت خاوەن، بەروار، وەشان، دۆخی پەسەندکردن و
                  بەرواری بەسەرچوونی دیاریکراوی هەبێت.
                </p>
              </article>
            ))}
          </div>
        )}

        {tab === 'workflow' && (
          <div className="grid gap-3 md:grid-cols-4">
            {[
              'تۆمارکردنی ڕێستورانت',
              'کۆکردنەوە و وێنەگرتن',
              'تۆماری بار و شوێن‌دیاریکەر',
              'وەرگرتن لە شوێنی پرۆسەکردن',
              'دروستکردنی وەجبە',
              'چاودێریی پڕۆسە',
              'نموونەوەرگرتن و تاقیگە',
              'پەسەندکردنی جۆرایەتی و ڕاپۆرت',
            ].map((title, index) => (
              <div key={title} className="rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-4">
                <div className="grid h-8 w-8 place-items-center rounded-full border border-emerald-400/20 text-[11px] font-black text-emerald-300">
                  {index + 1}
                </div>
                <h3 className="mt-3 text-xs font-black text-white">{title}</h3>
                <p className="mt-2 text-[10px] leading-6 text-slate-500">
                  دروستکردن ← پشکنین ← پەسەندکردن ← قوفڵکردن ← ڕاپۆرتکردن
                </p>
              </div>
            ))}
          </div>
        )}

        {tab === 'quality' && (
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-black/10 p-4">
              <FlaskConical className="h-5 w-5 text-sky-300" />
              <h3 className="mt-3 text-sm font-black text-white">زنجیرەی پەسەندکردنی وەجبە</h3>
              <p className="mt-2 text-xs leading-7 text-slate-400">
                چالاک ← گەرمای پێویست تەواو ← پێگەیشتن ← ئامادەی نموونەوەرگرتن ←
                چاوەڕوانی تاقیگە ← پەسەندکراوی جۆرایەتی
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-black/10 p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-300" />
              <h3 className="mt-3 text-sm font-black text-white">پشکنینە پێویستەکان</h3>
              <p className="mt-2 text-xs leading-7 text-slate-400">
                شێداری، ڕێژەی ترشی، شۆڕی، پەیوەندی کاربۆن و نایترۆجین، پێگەیشتن،
                سالمۆنیلا، میکرۆبی نیشاندەر، کانزا قورسەکان و ماددە ناپاکەکان.
              </p>
            </div>
          </div>
        )}

        {tab === 'risk' && (
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ['بۆن و سکاڵا', 'پلانی چارەسەری هەمان ڕۆژ'],
              ['شلەی دەرچوو', 'هیچ پرۆسەکردنێک بەبێ کۆنترۆڵی شلە دەست پێ ناکات'],
              ['ئاگر و گەرما', 'ئاگاداری لە ٦٥ پلەی سەدی و کردار لە نزیک ٧٠ پلە'],
              ['تێکەڵبوونی ناپاکی', 'پشکنینی سەدا لە سەدی هەر بارێک'],
              ['یاسا و مۆڵەت', 'پشتڕاستکردنەوەی ناوخۆیی پێش دەستپێکردن'],
              ['بانگەشە و ژمارە', 'دیاریکردنی سەرچاوە و دۆخی پشتڕاستکردنەوە'],
            ].map(([title, description]) => (
              <div key={title} className="rounded-xl border border-red-400/10 bg-red-400/5 p-4">
                <AlertTriangle className="h-5 w-5 text-red-300" />
                <h3 className="mt-3 text-xs font-black text-white">{title}</h3>
                <p className="mt-2 text-[10px] leading-6 text-slate-500">{description}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'reports' && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-black text-emerald-200"
            >
              <Download size={15} />
              هەناردەکردنی فایلی CSV
            </button>
            <button
              type="button"
              onClick={() => download('green-belt-readiness.json', JSON.stringify(ITEMS, null, 2), 'application/json')}
              className="inline-flex items-center gap-2 rounded-xl border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-black text-sky-200"
            >
              <FileText size={15} />
              هەناردەکردنی فایلی JSON
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-black text-amber-200"
            >
              <Printer size={15} />
              چاپکردن یان هەڵگرتن بە PDF
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
