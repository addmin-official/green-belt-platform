import { useState, useEffect } from 'react';
import { 
  Shield, Activity, Layers, Network, RefreshCw, HelpCircle, Leaf, TreePine, Award, Landmark, Database
} from 'lucide-react';
import { useI18n } from '../providers/I18nProvider';
import GreenBeltDashboard from '../modules/green-belt/GreenBeltDashboard';

// Kurdish Sorani localized dictionary for top header
const HEADER_DICTIONARY = {
  ku: {
    systemTitle: "کەمەربەندی سەوز",
    subTitle: "پلاتفۆرمی ژیری ئابووریی بازنەیی",
    partnerLabel: "دەستپێشخەری هاوبەشی دەزگای روانگە و ڕێکخراوی DCA",
    regionLabel: "ناوچەی کارکردن",
    roleLabel: "ڕۆڵی چالاک",
    northernHub: "ناوچەی باکوور",
    centralHub: "ناوچەی ناوەڕاست",
    southernHub: "ناوچەی باشوور",
    regStatus: "ناسنامەی سیستم چالاکە"
  }
};

const ROLES_LIST = [
  "بەڕێوەبەری پڕۆژە"
];

function AppContent() {
  const { locale: lang, setLocale: setLang } = useI18n();
  const [activeRegion, setActiveRegion] = useState<string>('NORTHERN_MOUNTAIN');
  const [userRole, setUserRole] = useState<string>(ROLES_LIST[0]);
  const [tickerUptime, setTickerUptime] = useState<number>(99.98);

  // Force pure Sorani Kurdish regardless of systemic settings
  const h = HEADER_DICTIONARY.ku;

  // Small micro-sim loop for uptime fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerUptime(prev => {
        const delta = (Math.random() * 0.04 - 0.02);
        return parseFloat(Math.min(100, Math.max(99.9, prev + delta)).toFixed(2));
      });
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#051109] text-slate-100 flex flex-col font-sans antialiased text-sm" dir="rtl">
      
      {/* 1. TOP-SHELF REGIONAL FOREST JURISDICTION SWITCHER */}
      <section id="greenbelt-switcher" className="bg-[#030d06] border-b border-[#cca553]/15 text-xs py-2 px-4 shadow-inner relative z-[60]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="text-[11px] text-emerald-405 font-mono tracking-wider font-bold">
              ناوەندی ئۆپەراسیۆنی کەمەربەندی سەوز
            </span>
          </div>

          {/* Regional Sector Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-[#06150a] rounded-xl border border-emerald-950 shadow">
            
            <button
              id="switch-northern-hub"
              onClick={() => {
                setActiveRegion('NORTHERN_MOUNTAIN');
                alert(`وێستگەی کار گۆڕدرا بۆ کەمەربەندی ${h.northernHub}. نوێکردنەوەی جۆری خاک و هێڵەکانی کۆکردنەوە.`);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-[700] transition-all flex items-center gap-1.5 cursor-pointer ${
                activeRegion === 'NORTHERN_MOUNTAIN'
                  ? 'bg-gradient-to-r from-emerald-950 to-[#0c2e17] text-emerald-400 border border-emerald-500/30 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TreePine className="w-3.5 h-3.5 shrink-0" />
              <span>{h.northernHub}</span>
            </button>

            <button
              id="switch-central-hub"
              onClick={() => {
                setActiveRegion('CENTRAL_PLAINS');
                alert(`وێستگەی کار گۆڕدرا بۆ کەمەربەندی ${h.centralHub}. گواستنەوەی کۆمپۆستی ناوەڕاست.`);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-[700] transition-all flex items-center gap-1.5 cursor-pointer ${
                activeRegion === 'CENTRAL_PLAINS'
                  ? 'bg-gradient-to-r from-emerald-950 to-[#0c2e17] text-emerald-400 border border-emerald-500/30 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>{h.centralHub}</span>
            </button>

            <button
              id="switch-southern-hub"
              onClick={() => {
                setActiveRegion('SOUTHERN_DELTA');
                alert(`وێستگەی کار گۆڕدرا بۆ کەمەربەندی ${h.southernHub}. بەدوداچوونی خاکی گەرمیان و خورما.`);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-[700] transition-all flex items-center gap-1.5 cursor-pointer ${
                activeRegion === 'SOUTHERN_DELTA'
                  ? 'bg-gradient-to-r from-emerald-950 to-[#cca553]/20 text-[#cca553] border border-[#cca553]/30 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Network className="w-3.5 h-3.5 shrink-0" />
              <span>{h.southernHub}</span>
            </button>

          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-semibold">
              {h.roleLabel}:
            </span>
            <div className="bg-[#051109] text-[#cca553] border border-emerald-950 text-xs rounded-lg px-3 py-1 font-semibold">
              {userRole}
            </div>
          </div>

        </div>
      </section>

      {/* Main Elegant Green Belt Header */}
      <header id="greenbelt-main-header" className="bg-[#06150b] border-b border-[#cca553]/30 shadow-lg px-4 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="bg-[#cca553]/10 p-2.5 rounded-xl border border-[#cca553]/40 flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow">
              <Leaf className="w-8 h-8 text-[#cca553]" />
            </div>
            <div className="text-start">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-display font-black tracking-wider text-white uppercase">{h.systemTitle}</h1>
                <span className="text-xs bg-emerald-950/90 text-[#10b981] border border-emerald-800/60 px-2 py-0.5 rounded font-mono uppercase tracking-widest flex items-center gap-1 font-bold shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                  {activeRegion === 'NORTHERN_MOUNTAIN' ? h.northernHub : activeRegion === 'CENTRAL_PLAINS' ? h.centralHub : h.southernHub}
                </span>
                <span className="text-[11px] bg-[#cca553]/15 text-[#cca553] border border-[#cca553]/35 px-2.5 py-0.5 rounded font-bold animate-pulse">
                  داتای نمایشی بۆ پایلۆتی ٩٠ ڕۆژە
                </span>
              </div>
              <p className="text-xs text-[#cca553] mt-0.5 font-bold uppercase">{h.subTitle}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="hidden lg:flex flex-col text-right border-emerald-900 pr-4 pl-4 border-r">
              <span className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">{h.partnerLabel}</span>
              <span className="text-[#cca553] font-extrabold text-[11px] uppercase tracking-wider">{userRole}</span>
            </div>
            
            {/* Embedded disabled language indicator - 100% Kurdish Sorani is locked */}
            <div className="flex items-center bg-[#030d06] px-3.5 py-2 rounded-xl border border-emerald-950 shadow-inner">
              <span className="text-emerald-400 font-extrabold text-xs">کوردی سۆرانی</span>
            </div>
          </div>
        </div>
      </header>

      {/* Sub-header status panel */}
      <section id="greenbelt-status-ticker" className="bg-[#030d05] border-b border-emerald-950/80 py-2.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="flex items-center gap-1.5 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-900 text-[11px] whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-300 font-bold">
                حاڵەتی سیستم: <b className="text-white uppercase">{h.regStatus}</b>
              </span>
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-900 text-[11px] whitespace-nowrap">
              <Database className="w-3 h-3 text-[#cca553]" />
              <span className="text-slate-300">
                پشکنینی بلۆکچەین: <b className="text-emerald-400">تۆماری فەرمی کەمەربەندی سەوز</b>
              </span>
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-900 text-[11px] whitespace-nowrap">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span className="text-slate-300">
                چالاکبوونی سێنسەرەکان: <b className="text-[#cca553]">{tickerUptime}%</b>
              </span>
            </span>
          </div>
          <span className="text-[#cca553] font-extrabold text-[11px] uppercase text-center sm:text-end whitespace-nowrap">
            دەفتەری گشتی پڕۆژەی هاوبەشی دەزگای روانگە و ڕێکخراوی DCA
          </span>
        </div>
      </section>

      {/* Main Dashboard Workspace area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 flex flex-col gap-6">
        <GreenBeltDashboard lang="ku" />
      </main>

      {/* Reforestation Footer */}
      <footer className="bg-[#030d05] border-t border-emerald-950 py-6 mt-12 text-slate-400 text-xs text-start w-full" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Leaf className="w-5 h-5 text-[#cca553]" />
            <div className="min-w-0">
              <p className="text-slate-200 font-bold uppercase text-xs break-words">
                پلاتفۆرمی ژیری کەمەربەندی سەوز • ئابووریی بازنەیی بەردەوامی کشتوکاڵی ژینگەیی
              </p>
              <p className="text-[10px] text-slate-500 break-words mt-1 whitespace-normal text-right">
                پڕۆژەی کارپێکراو لەژێر سەرپەرشتی ستراتیژی دەزگای روانگە و ڕێکخراوی DCA بۆ پەرەپێدانی خاک و پاراستنی ژینگە. چاودێریکردنی کۆکردنەوەی پاشماوەی خۆراکی چێشتخانەکان و گۆڕینی بۆ کۆمپۆستی بەپیت بۆ چاندنی درەختەکان.
              </p>
            </div>
          </div>
          <div className="flex gap-4 text-emerald-600 text-[10px] tracking-widest shrink-0">
            <span>دەزگای روانگە • DCA پڕۆژەی هاوبەش</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppContent />
  );
}
