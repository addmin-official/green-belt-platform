import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  ArrowLeft,
  LayoutDashboard,
  Leaf,
  LoaderCircle,
} from 'lucide-react';

import PublicWebsite from './pages/PublicWebsite';

const GreenBeltDashboard = lazy(
  () => import('./modules/green-belt/GreenBeltDashboard'),
);

type RoutePath = '/' | '/dashboard';

function normalizePath(pathname: string): RoutePath {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return normalized === '/dashboard' ? '/dashboard' : '/';
}

function LoadingScreen() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[#051109] text-emerald-100"
      dir="rtl"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-950/50 px-5 py-4">
        <LoaderCircle className="h-5 w-5 animate-spin text-emerald-400" />
        <span className="text-sm font-bold">پلاتفۆرمەکە ئامادە دەکرێت...</span>
      </div>
    </div>
  );
}

function DashboardPage({
  navigate,
}: {
  navigate: (path: RoutePath) => void;
}) {
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
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold transition hover:bg-white/10"
          >
            <ArrowLeft size={17} />
            گەڕانەوە بۆ وێبسایت
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl p-4 lg:p-6">
        <GreenBeltDashboard lang="ku" />
      </main>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState<RoutePath>(() =>
    normalizePath(window.location.pathname),
  );

  useEffect(() => {
    const handlePopState = () => {
      setRoute(normalizePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = useCallback((path: RoutePath) => {
    if (normalizePath(window.location.pathname) === path) {
      return;
    }

    window.history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const preloadDashboard = () => {
    void import('./modules/green-belt/GreenBeltDashboard');
  };

  if (route === '/dashboard') {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <DashboardPage navigate={navigate} />
      </Suspense>
    );
  }

  return (
    <>
      <PublicWebsite />

      <button
        type="button"
        onMouseEnter={preloadDashboard}
        onFocus={preloadDashboard}
        onTouchStart={preloadDashboard}
        onClick={() => navigate('/dashboard')}
        className="fixed bottom-5 left-5 z-[100] inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-[#0a1b10]/95 px-4 py-3 text-sm font-bold text-emerald-100 shadow-2xl backdrop-blur transition hover:border-emerald-400/50 hover:bg-[#10291a]"
      >
        <LayoutDashboard size={18} />
        چوونە ناو پلاتفۆرم
      </button>
    </>
  );
}
