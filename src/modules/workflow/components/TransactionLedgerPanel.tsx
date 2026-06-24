import React from 'react';
import { Language } from '../../../types';
import { t } from '../localization/workflowTranslations';
import { LogEntry } from '../hooks/useEcosystemWorkflows';

interface TransactionLedgerPanelProps {
  lang: Language;
  logs: LogEntry[];
  activeScenario: string;
}

export const TransactionLedgerPanel: React.FC<TransactionLedgerPanelProps> = React.memo(({
  lang,
  logs,
  activeScenario
}) => {
  return (
    <div className="xl:col-span-2 bg-[#0a1523]/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4 text-start">
      <h3 className="text-xs uppercase font-mono tracking-wider text-slate-350 border-b border-slate-900 pb-2 font-bold text-start">
        {t(lang, 'ledger.title')}
      </h3>
      
      {/* Desktop/Tablet table view */}
      <div className="hidden md:block overflow-x-auto text-xs font-mono text-start">
        <table className="w-full text-start border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 text-[9px] uppercase font-mono">
              <th className="pb-2 text-start">{t(lang, 'ledger.headers.txid')}</th>
              <th className="pb-2 text-start">{t(lang, 'ledger.headers.phase')}</th>
              <th className="pb-2 text-start">{t(lang, 'ledger.headers.status')}</th>
              <th className="pb-2 text-start">{t(lang, 'ledger.headers.detail')}</th>
              <th className="pb-2 text-end">{t(lang, 'ledger.headers.time')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[10.5px]">
            {logs.map((log, idx) => (
              <tr key={idx} className={idx === 0 ? 'text-[#E0A96D] font-bold animate-pulse text-start' : 'text-start'}>
                <td className="py-2.5 font-bold text-[#E0A96D] text-start">{log.id}</td>
                <td className="text-start">{log.step}</td>
                <td className="text-start">
                  <span className="px-1.5 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-500/20 rounded uppercase text-[9px] font-semibold">
                    {log.status === 'Success' 
                      ? (lang === 'en' ? 'Success' : lang === 'ar' ? 'ناجح' : 'سەرکەوتوو') 
                      : (lang === 'en' ? 'Processing' : lang === 'ar' ? 'خاضع للمطابقة' : 'پڕۆسە دەکرێت')}
                  </span>
                </td>
                <td className="text-slate-400 max-w-xs truncate text-start">{log.detail}</td>
                <td className="text-end text-slate-500 text-[10px]">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card view list */}
      <div className="block md:hidden space-y-3 font-mono text-start">
        {logs.map((log, idx) => (
          <div key={idx} className={`bg-slate-950/45 p-3.5 rounded-lg border flex flex-col gap-2.5 text-xs transition-all text-start ${idx === 0 ? 'border-[#E0A96D]/40 ring-1 ring-[#E0A96D]/15' : 'border-slate-800'}`}>
            <div className="flex justify-between items-center w-full">
              <span className={`text-xs font-bold ${idx === 0 ? 'text-[#E0A96D]' : 'text-slate-300'}`}>{log.id}</span>
              <span className="px-1.5 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-500/20 rounded uppercase text-[9px] font-semibold">
                {log.status === 'Success' 
                  ? (lang === 'en' ? 'Success' : lang === 'ar' ? 'ناجح' : 'سەرکەوتوو') 
                  : (lang === 'en' ? 'Processing' : lang === 'ar' ? 'خاضع للمطابقة' : 'پڕۆسە دەکرێت')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-start">
              <div className="text-start">
                <span className="text-slate-500 block text-[9px] uppercase font-mono">Phase</span>
                <span className="text-slate-300">{log.step}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[9px] uppercase font-mono">Timestamp</span>
                <span className="text-slate-400 text-[10px]">{log.timestamp}</span>
              </div>
              <div className="col-span-2 mt-1 py-1 border-t border-slate-800/40 text-start">
                <span className="text-slate-500 block text-[9px] uppercase font-mono mb-0.5">Log Details</span>
                <p className="text-slate-400 text-[10.5px] leading-normal break-words">{log.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

TransactionLedgerPanel.displayName = 'TransactionLedgerPanel';
