import { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, ClipboardCheck, Download, FileCheck2, FileText, FlaskConical, Printer, ShieldCheck } from 'lucide-react';

type Tab = 'decision' | 'evidence' | 'workflow' | 'qa' | 'risk' | 'reports';
type Status = 'ready' | 'conditional' | 'missing';
type Item = { title: string; owner: string; status: Status; evidence: string; due: string };

const ITEMS: Item[] = [
  { title: 'پەسەندکردنی شوێنی پایلۆت', owner: 'لایەنی یاسایی', status: 'missing', evidence: 'نامەی نووسراو و نەخشە', due: 'پێش دەستپێکردن' },
  { title: 'ڕێکخستنی پڕۆسەی گواستنەوە', owner: 'ئۆپەراسیۆن', status: 'conditional', evidence: 'ڕێڕەو و مانیفێست', due: 'هەفتەی یەکەم' },
  { title: 'گرێبەستی ڕێستورانتەکان', owner: 'بەشی هاوبەشی', status: 'conditional', evidence: 'MOU و فۆڕمی جیاکردنەوە', due: 'پێش کۆکردنەوە' },
  { title: 'پەیوەندی و نرخنامەی تاقیگە', owner: 'QA Manager', status: 'missing', evidence: 'لیستی پشکنین و زنجیرەی نموونە', due: 'پێش نموونەوەرگرتن' },
  { title: 'ڕێڕەوی پەسەندکردنی QA', owner: 'QA Manager', status: 'ready', evidence: 'Lab + QA lock', due: 'ئامادە' },
  { title: 'جیاکردنەوەی داتای نمایشی و ڕاستەقینە', owner: 'بەڕێوەبەری سیستەم', status: 'ready', evidence: 'Demo / Pilot / Live', due: 'ئامادە' },
  { title: 'نەخشە و GPS پڕۆژەکان', owner: 'GIS / ئۆپەراسیۆن', status: 'conditional', evidence: 'GPS و دۆخی پشتڕاستکردنەوە', due: 'قۆناغی پایلۆت' },
];

const LABEL: Record<Status, string> = { ready: 'ئامادە', conditional: 'بە مەرج', missing: 'تەواونەکراو' };
const TONE: Record<Status, string> = {
  ready: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
  conditional: 'border-amber-400/20 bg-amber-400/10 text-amber-200',
  missing: 'border-red-400/20 bg-red-400/10 text-red-200',
};

function download(name: string, body: string, type: string) {
  const url = URL.createObjectURL(new Blob([body], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export default function CommitteeReadinessSuite() {
  const [tab, setTab] = useState<Tab>('decision');
  const counts = useMemo(() => ({
    ready: ITEMS.filter((item) => item.status === 'ready').length,
    conditional: ITEMS.filter((item) => item.status === 'conditional').length,
    missing: ITEMS.filter((item) => item.status === 'missing').length,
  }), []);

  const exportCsv = () => {
    const rows = [['Title', 'Owner', 'Status', 'Evidence', 'Due'], ...ITEMS.map((i) => [i.title, i.owner, LABEL[i.status], i.evidence, i.due])];
    download('green-belt-readiness.csv', '\uFEFF' + rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n'), 'text/csv;charset=utf-8');
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'decision', label: 'ژووری بڕیار' },
    { id: 'evidence', label: 'ژووری بەڵگە' },
    { id: 'workflow', label: 'ڕێڕەوی پایلۆت' },
    { id: 'qa', label: 'QA و تاقیگە' },
    { id: 'risk', label: 'مەترسی و پابەندی' },
    { id: 'reports', label: 'ڕاپۆرت و هەناردە' },
  ];

  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-[#cca553]/20 bg-[#081b0e] shadow-2xl" dir="rtl">
      <header className="border-b border-white/5 bg-gradient-to-l from-[#17351d] to-[#09180e] p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex gap-2"><span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-[10px] font-black text-amber-200">CONDITIONAL GO</span><span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[10px] font-black text-emerald-200">ئامادەکاری پایلۆت</span></div>
            <h2 className="mt-3 text-lg font-black text-white">ژووری بڕیار و ئامادەکاری جێبەجێکردن</h2>
            <p className="mt-2 max-w-4xl text-xs leading-7 text-slate-400">بڕیار، بەڵگە، مەترسی و هەنگاوەکانی پێش دەستپێکردنی پایلۆت. ئەم هەڵسەنگاندنە جێگای مۆڵەت و پەسەندکردنی نووسراو ناگرێتەوە.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-black"><div className="rounded-xl border border-emerald-400/15 bg-emerald-400/5 px-4 py-3 text-emerald-200"><span className="block text-lg">{counts.ready}</span>ئامادە</div><div className="rounded-xl border border-amber-400/15 bg-amber-400/5 px-4 py-3 text-amber-200"><span className="block text-lg">{counts.conditional}</span>بە مەرج</div><div className="rounded-xl border border-red-400/15 bg-red-400/5 px-4 py-3 text-red-200"><span className="block text-lg">{counts.missing}</span>کەم</div></div>
        </div>
      </header>

      <nav className="flex gap-2 overflow-x-auto border-b border-white/5 p-3">{tabs.map((t) => <button key={t.id} type="button" onClick={() => setTab(t.id)} className={tab === t.id ? 'shrink-0 rounded-xl border border-[#cca553]/30 bg-[#cca553]/10 px-3 py-2 text-[11px] font-black text-[#e3c36c]' : 'shrink-0 rounded-xl border border-white/5 bg-black/10 px-3 py-2 text-[11px] font-bold text-slate-400'}>{t.label}</button>)}</nav>

      <div className="p-5">
        {tab === 'decision' && <div className="overflow-x-auto rounded-xl border border-white/5"><table className="w-full min-w-[760px] text-right text-[11px]"><thead className="bg-black/20 text-slate-300"><tr><th className="p-3">مەرج</th><th className="p-3">بەرپرسیار</th><th className="p-3">دۆخ</th><th className="p-3">بەڵگە</th><th className="p-3">کۆتا ماوە</th></tr></thead><tbody>{ITEMS.map((i) => <tr key={i.title} className="border-t border-white/5 text-slate-400"><td className="p-3 font-bold text-slate-200">{i.title}</td><td className="p-3">{i.owner}</td><td className="p-3"><span className={`rounded-full border px-2 py-1 text-[9px] font-black ${TONE[i.status]}`}>{LABEL[i.status]}</span></td><td className="p-3">{i.evidence}</td><td className="p-3">{i.due}</td></tr>)}</tbody></table></div>}

        {tab === 'evidence' && <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{['نامەی پشتگیری و MOU', 'پەسەندکردنی شوێن', 'گرێبەستی ڕێستورانت', 'نرخنامەی تاقیگە', 'SOP و فۆڕمەکان', 'وێنە و GPS', 'مانیفێست و وەرگرتن', 'ڕاپۆرتی مانگانە'].map((x) => <article key={x} className="rounded-xl border border-white/5 bg-black/10 p-4"><FileCheck2 className="h-5 w-5 text-amber-300"/><h3 className="mt-3 text-xs font-black text-white">{x}</h3><p className="mt-2 text-[10px] leading-6 text-slate-500">خاوەن، بەروار، وەشان، دۆخی پەسەندکردن و بەرواری بەسەرچوون.</p></article>)}</div>}

        {tab === 'workflow' && <div className="grid gap-3 md:grid-cols-4">{['تۆمارکردنی ڕێستورانت', 'کۆکردنەوە و وێنە', 'مانیفێست و GPS', 'وەرگرتنی شوێن', 'دروستکردنی وەجبە', 'چاودێری پڕۆسە', 'نموونە و تاقیگە', 'QA و ڕاپۆرت'].map((x, n) => <div key={x} className="rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-4"><div className="grid h-8 w-8 place-items-center rounded-full border border-emerald-400/20 text-[11px] font-black text-emerald-300">{n+1}</div><h3 className="mt-3 text-xs font-black text-white">{x}</h3><p className="mt-2 text-[10px] text-slate-500">Create → Review → Approve → Lock → Report</p></div>)}</div>}

        {tab === 'qa' && <div className="grid gap-4 lg:grid-cols-2"><div className="rounded-xl border border-white/5 bg-black/10 p-4"><FlaskConical className="h-5 w-5 text-sky-300"/><h3 className="mt-3 text-sm font-black text-white">زنجیرەی پەسەندکردن</h3><p className="mt-2 text-xs leading-7 text-slate-400">ACTIVE → PFRP MET → CURING → READY FOR SAMPLING → LAB PENDING → QA PASSED</p></div><div className="rounded-xl border border-white/5 bg-black/10 p-4"><CheckCircle2 className="h-5 w-5 text-emerald-300"/><h3 className="mt-3 text-sm font-black text-white">پشکنینەکان</h3><p className="mt-2 text-xs leading-7 text-slate-400">شێداری، pH، EC، C:N، پێگەیشتن، سالمۆنیلا، میکرۆب، کانزا قورسەکان و ناپاکی.</p></div></div>}

        {tab === 'risk' && <div className="grid gap-3 md:grid-cols-3">{[['بۆن و سکاڵا','پلانی هەمان ڕۆژ'],['شلەی دەرچوو','هیچ پرۆسەکردنێک بەبێ کۆنترۆڵ'],['ئاگر و گەرما','ئاگاداری لە ٦٥°C'],['ناپاکی','پشکنینی ١٠٠٪ی بار'],['یاسا و مۆڵەت','پشتڕاستکردنەوەی ناوخۆیی'],['claim','سەرچاوە و دۆخی پشتڕاستکردنەوە']].map(([x,y]) => <div key={x} className="rounded-xl border border-red-400/10 bg-red-400/5 p-4"><AlertTriangle className="h-5 w-5 text-red-300"/><h3 className="mt-3 text-xs font-black text-white">{x}</h3><p className="mt-2 text-[10px] text-slate-500">{y}</p></div>)}</div>}

        {tab === 'reports' && <div className="flex flex-wrap gap-2"><button type="button" onClick={exportCsv} className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-black text-emerald-200"><Download size={15}/>CSV</button><button type="button" onClick={() => download('green-belt-readiness.json', JSON.stringify(ITEMS, null, 2), 'application/json')} className="inline-flex items-center gap-2 rounded-xl border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-black text-sky-200"><FileText size={15}/>JSON</button><button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-black text-amber-200"><Printer size={15}/>چاپ / PDF</button></div>}
      </div>
    </section>
  );
}
