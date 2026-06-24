import { Leaf } from 'lucide-react';
import GreenBeltDashboard from './modules/green-belt/GreenBeltDashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-[#051109] text-slate-100" dir="rtl" lang="ku">
      <header className="sticky top-0 z-50 border-b border-emerald-900/70 bg-[#06150b]/95 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="rounded-xl border border-emerald-700/50 bg-emerald-950/60 p-2.5">
            <Leaf className="h-7 w-7 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">کەمەربەندی سەوز</h1>
            <p className="text-xs font-bold text-emerald-400">پلاتفۆرمی پایلۆتی ئابووریی بازنەیی</p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl p-4 lg:p-6">
        <GreenBeltDashboard lang="ku" />
      </main>

      <footer className="border-t border-emerald-950 bg-[#030d05] px-4 py-6 text-center text-xs text-slate-500">
        کەمەربەندی سەوز — داتاکانی پلاتفۆرم لەم قۆناغەدا نمایشی و بۆ تاقیکردنەوەی پایلۆتن.
      </footer>
    </div>
  );
}
