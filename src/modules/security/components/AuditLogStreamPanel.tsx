import React from 'react';
import { Language } from '../../../types';
import { SectionHeader, Badge, Table } from '../../../ui';
import { AuditEvent } from '../../../security';
import { 
  t, 
  translateRole, 
  translateClearance 
} from '../localization/securityTranslations';

interface AuditLogStreamPanelProps {
  lang: Language;
  auditLogs: AuditEvent[];
  auditFilter: 'ALL' | 'LOGIN' | 'KEY_ROTATION' | 'SECURITY_VIOLATION';
  setAuditFilter: (filter: 'ALL' | 'LOGIN' | 'KEY_ROTATION' | 'SECURITY_VIOLATION') => void;
}

export const AuditLogStreamPanel: React.FC<AuditLogStreamPanelProps> = React.memo(({
  lang,
  auditLogs,
  auditFilter,
  setAuditFilter
}) => {
  const filteredLogs = auditLogs.filter(log => {
    if (auditFilter === 'ALL') return true;
    return log.eventType === auditFilter;
  });

  return (
    <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl text-start flex flex-col gap-4">
      <div className="border-b border-slate-900 pb-2 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <SectionHeader 
            title={t(lang, 'audit.section.title')}
            description={t(lang, 'audit.section.desc')}
          />
        </div>

        {/* Filtering badges */}
        <div className="flex gap-1 bg-[#0b1420] border border-slate-850 p-1 rounded-md text-[10px]" dir="ltr">
          {[
            { id: 'ALL', label: t(lang, 'audit.filters.all') },
            { id: 'LOGIN', label: t(lang, 'audit.filters.auth') },
            { id: 'KEY_ROTATION', label: t(lang, 'audit.filters.rollover') },
            { id: 'SECURITY_VIOLATION', label: t(lang, 'audit.filters.alarms') }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setAuditFilter(f.id as any)}
              className={`px-2 py-1 rounded transition-all font-mono font-bold cursor-pointer ${
                auditFilter === f.id ? 'bg-[#E0A96D] text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto">
        <Table headers={[
          t(lang, 'audit.table.logId'),
          t(lang, 'audit.table.timestamp'),
          t(lang, 'audit.table.category'),
          t(lang, 'audit.table.user'),
          t(lang, 'audit.table.desc'),
          t(lang, 'audit.table.hash'),
          t(lang, 'audit.table.state')
        ]}>
          {filteredLogs.map((log) => {
            const isViolation = log.status !== 'SUCCESS';
            return (
              <tr 
                key={log.id} 
                className={`hover:bg-slate-900/30 font-sans text-[11px] ${
                  isViolation ? 'bg-red-950/15 text-red-100 border-l border-red-500/50' : ''
                }`}
              >
                <td className="px-4 py-3 font-semibold text-[#E0A96D] whitespace-nowrap">{log.id}</td>
                <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{log.timestamp.slice(11, 19)}Z</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Badge variant={
                    log.eventType === 'SECURITY_VIOLATION' ? 'danger' :
                    log.eventType === 'KEY_ROTATION' ? 'gold' :
                    log.eventType === 'LOGIN' ? 'success' : 'slate'
                  }>
                    {log.eventType === 'SECURITY_VIOLATION' ? t(lang, 'audit.category.violation') :
                     log.eventType === 'KEY_ROTATION' ? t(lang, 'audit.category.keyroll') :
                     log.eventType === 'LOGIN' ? t(lang, 'audit.category.login') :
                     log.eventType}
                  </Badge>
                </td>
                <td className="px-4 py-3 whitespace-normal break-words min-w-[120px]">
                  <strong className="text-white block">{log.subjectUsername}</strong>
                  <span className="text-[10px] text-slate-500 block">
                    {translateRole(lang, log.subjectRole)} {t(lang, 'abac.profile.clearance')}: {translateClearance(lang, log.clearanceLevel)}
                  </span>
                </td>
                <td className="px-4 py-3 max-w-sm whitespace-normal break-words min-w-[200px]">
                  <span className="text-slate-250 block font-sans font-semibold text-xs text-start">
                    {log.actionSummary}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-sans leading-relaxed mt-1 bg-slate-950/40 p-1.5 border border-slate-900 rounded italic text-start">
                    "{log.resourceDetails}"
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-[9px] text-[#E0A96D] tracking-tighter whitespace-normal break-all min-w-[90px]">
                  {log.integrityChainHash.slice(0, 14)}...
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`font-bold uppercase text-[9px] ${isViolation ? 'text-red-400' : 'text-[#52B788]'}`}>
                    {log.status === 'SUCCESS' ? t(lang, 'audit.state.chained') : t(lang, 'audit.state.blocked')}
                  </span>
                </td>
              </tr>
            );
          })}
        </Table>
      </div>
    </div>
  );
});

AuditLogStreamPanel.displayName = 'AuditLogStreamPanel';
