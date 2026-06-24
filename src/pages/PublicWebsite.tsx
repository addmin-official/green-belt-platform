import { ArrowLeft, LayoutDashboard, Leaf } from 'lucide-react';
import PublicWebsite from './pages/PublicWebsite';
import GreenBeltDashboard from './modules/green-belt/GreenBeltDashboard';

function navigate(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function PortalSwitcher({ dashboard }: { dashboard: boolean }) {
  return (
    <button
      type="button"
      onClick={() => navigate(dashboard ? '/' : '/dashboard')}
      className="fixed bottom-5 left-5 z-[100] inline-flex items-center gap-2 rounded-xl
        border border-emerald-400/20 bg-[#0a1b10]/95 px-4 py-3 text-sm font-bold
        text-emerald-100 shadow-2xl backdrop-blur transition
        hover:border-emerald-400/50 hover:bg-[#10291a]"
    >
      {dashboard ? <ArrowLeft size={18} /> : <LayoutDashboard size={18} />}
      {dashboard ? 'گەڕانەوە بۆ وێبسایت' : 'چوونە ناو پلاتفۆرم'}
    </button>
  );
}

function DashboardPage() {
  return (
    <div
      className="min-h-screen bg-[#051109] text-slate-100"
      dir="rtl"
      lang="ku"
    >
      <header className="sticky top-0 z-50 border-b border-emerald-900/60 bg-[#06150b]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-emerald-700/40 bg-emerald-950/60 p-2.5">
              <Leaf className="h-6 w-6 text-emerald-400" />
            </div>

            <div>
              <h1 className="text-lg font-black text-white">
                پلاتفۆرمی کەمەربەندی سەوز
              </h1>
              <p className="text-xs font-bold text-emerald-400">
                داشبۆردی بەڕێوەبردنی پایلۆت
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10
              bg-white/5 px-3 py-2 text-xs font-bold text-slate-200
              transition hover:bg-white/10"
          >
            <ArrowLeft size={16} />
            وێبسایتی گشتی
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl p-4 lg:p-6">
        <div className="mb-5 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-xs font-semibold text-amber-200">
          تێبینی: داتاکانی ئەم داشبۆردە لە قۆناغی ئێستادا Demo یان Target ـن،
          مەگەر بە Verified نیشان درابن.
        </div>

        <GreenBeltDashboard lang="ku" />
      </main>

      <PortalSwitcher dashboard />
    </div>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const dashboard = path === '/dashboard';

  if (dashboard) {
    return <DashboardPage />;
  }

  return (
    <>
      <PublicWebsite />
      <PortalSwitcher dashboard={false} />
    </>
  );
}
