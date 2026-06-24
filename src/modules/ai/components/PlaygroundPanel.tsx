import React from 'react';
import { Cpu, Server, Play, RefreshCw } from 'lucide-react';
import { Language } from '../../../types';
import { t } from '../localization/aiTranslations';

interface PlaygroundPanelProps {
  lang: Language;
  activePromptId: string;
  promptTemplate: string;
  setPromptTemplate: (v: string) => void;
  playDesc: string;
  setPlayDesc: (v: string) => void;
  playOrigin: string;
  setPlayOrigin: (v: string) => void;
  playCost: string;
  setPlayCost: (v: string) => void;
  isInferencing: boolean;
  inferenceResult: string | null;
  runTestInference: () => void;
  loadPrompt: (id: string) => void;
}

export const PlaygroundPanel: React.FC<PlaygroundPanelProps> = React.memo(({
  lang,
  activePromptId,
  promptTemplate,
  setPromptTemplate,
  playDesc,
  setPlayDesc,
  playOrigin,
  setPlayOrigin,
  playCost,
  setPlayCost,
  isInferencing,
  inferenceResult,
  runTestInference,
  loadPrompt
}) => {
  return (
    <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4 text-start">
      <div className="border-b border-slate-900 pb-2 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-start">
        <div className="text-start">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 text-start">
            {t(lang, 'playground.title')}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 text-start">
            {t(lang, 'playground.subtitle')}
          </p>
        </div>
        <div className="flex gap-1.5 self-start shrink-0">
          <button
            onClick={() => loadPrompt('hs-prompt')}
            className={`px-2 py-1 rounded font-mono text-[9px] uppercase border transition-all cursor-pointer ${
              activePromptId === 'hs-prompt'
                ? 'bg-slate-900 border-[#E0A96D] text-[#E0A96D] font-bold'
                : 'bg-[#0f1b29] border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'ku' ? 'کۆدی گومرگی' : lang === 'ar' ? 'تصنيف التعرفة' : 'HS Code'}
          </button>
          <button
            onClick={() => loadPrompt('eval-prompt')}
            className={`px-2 py-1 rounded font-mono text-[9px] uppercase border transition-all cursor-pointer ${
              activePromptId === 'eval-prompt'
                ? 'bg-slate-900 border-[#E0A96D] text-[#E0A96D] font-bold'
                : 'bg-[#0f1b29] border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'ku' ? 'کەم نرخاندن' : lang === 'ar' ? 'تخفيض السعر' : 'Underpricing'}
          </button>
          <button
            onClick={() => loadPrompt('quarantine-prompt')}
            className={`px-2 py-1 rounded font-mono text-[9px] uppercase border transition-all cursor-pointer ${
              activePromptId === 'quarantine-prompt'
                ? 'bg-slate-900 border-[#E0A96D] text-[#E0A96D] font-bold'
                : 'bg-[#0f1b29] border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'ku' ? 'کەرەنتینە' : lang === 'ar' ? 'الحجر الصحي' : 'Quarantine'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-start">
        {/* Left Column: Prompt Template input box */}
        <div className="flex flex-col gap-3 text-start">
          <div className="flex flex-col gap-1.5 text-start">
            <label className="text-[10px] text-slate-500 uppercase font-mono tracking-wider font-semibold text-start">
              {t(lang, 'playground.systemLabel')}
            </label>
            <textarea
              rows={8}
              value={promptTemplate}
              onChange={(e) => setPromptTemplate(e.target.value)}
              className="w-full bg-[#0b1420] font-mono text-xs text-slate-350 border border-slate-800 rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 leading-relaxed text-start"
            />
          </div>

          <div className="bg-[#0b1420] p-3 rounded-lg border border-slate-800 flex flex-col gap-2.5 text-start">
            <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider block font-bold text-start">
              {t(lang, 'playground.variablesLabel')}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-start">
              <div className="text-start">
                <span className="text-[9px] text-slate-500 uppercase font-mono">{t(lang, 'playground.desc')}</span>
                <input
                  type="text"
                  value={playDesc}
                  onChange={(e) => setPlayDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 mt-0.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="text-start">
                <span className="text-[9px] text-slate-500 uppercase font-mono">{t(lang, 'playground.origin')}</span>
                <input
                  type="text"
                  value={playOrigin}
                  onChange={(e) => setPlayOrigin(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 mt-0.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="text-start">
                <span className="text-[9px] text-slate-500 uppercase font-mono">{t(lang, 'playground.cost')}</span>
                <input
                  type="text"
                  value={playCost}
                  onChange={(e) => setPlayCost(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 mt-0.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <div className="flex justify-end mt-1">
              <button
                onClick={runTestInference}
                disabled={isInferencing}
                className="px-4 py-1.5 bg-[#E0A96D] hover:bg-[#E0A96D]/90 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-semibold font-mono rounded text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow transition-all cursor-pointer"
              >
                {isInferencing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                {isInferencing ? t(lang, 'playground.runningBtn') : t(lang, 'playground.runBtn')}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Simulated result viewer */}
        <div className="flex flex-col gap-2 text-start">
          <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider font-semibold text-start">
            {t(lang, 'playground.streamLabel')}
          </span>
          <div id="compiler-stream-viewer" className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-lg font-mono text-[11px] leading-relaxed text-[#E0A96D] flex flex-col justify-between min-h-[220px] text-start">
            {inferenceResult ? (
              <div className="whitespace-pre-wrap text-slate-300 text-start">
                {inferenceResult}
              </div>
            ) : isInferencing ? (
              <div className="flex flex-col items-center justify-center h-full gap-2 py-12 text-slate-400">
                <Cpu className="w-8 h-8 text-emerald-400 animate-spin" />
                <p className="animate-pulse text-center">{t(lang, 'playground.connecting')}</p>
                <p className="text-[10px] text-[#4a6381] text-center">{t(lang, 'playground.resolving')}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-2 py-12">
                <Server className="w-8 h-8 text-slate-700" />
                <p className="text-center italic">{t(lang, 'playground.waiting')}</p>
                <p className="text-[10px] text-slate-600 text-center">{t(lang, 'playground.promptHelp')}</p>
              </div>
            )}
            {inferenceResult && (
              <div className="mt-4 pt-2 border-t border-slate-800/60 flex justify-between items-center text-[10px] text-slate-500 font-mono w-full">
                <span>{t(lang, 'playground.jwtResponse')}</span>
                <span>{t(lang, 'playground.latencyLabel')}345ms</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

PlaygroundPanel.displayName = 'PlaygroundPanel';
