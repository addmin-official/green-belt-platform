import React from 'react';
import { Trash2 } from 'lucide-react';
import { Language } from '../../../types';
import { Badge, Table, Button, SectionHeader } from '../../../ui';
import { ZeroTrustSession } from '../../../security';
import { 
  t, 
  translateRole, 
  translateMinistry, 
  translateClearance 
} from '../localization/securityTranslations';

interface ActiveSocketsPanelProps {
  lang: Language;
  activeSessions: ZeroTrustSession[];
  terminateSessionSocket: (sessionId: string, username: string) => void;
}

export const ActiveSocketsPanel: React.FC<ActiveSocketsPanelProps> = React.memo(({
  lang,
  activeSessions,
  terminateSessionSocket
}) => {
  const lockedSess = activeSessions.filter(s => s.status === 'LOCKED_BY_THREAT_DETECTION').length;
  const isRtl = lang !== 'en';

  return (
    <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl text-start flex flex-col gap-4">
      <div className="border-b border-slate-900 pb-2 flex justify-between items-center">
        <div>
          <SectionHeader 
            title={t(lang, 'activeSockets.section.title')}
            description={t(lang, 'activeSockets.section.desc')}
          />
        </div>
        <Badge variant={lockedSess > 0 ? 'danger' : 'success'}>
          {lockedSess > 0 
            ? `${lockedSess} ${t(lang, 'activeSockets.badge.anomaly')}` 
            : t(lang, 'activeSockets.badge.healthy')}
        </Badge>
      </div>

      <div className="overflow-x-auto">
        <Table headers={[
          t(lang, 'activeSockets.table.subject'),
          t(lang, 'activeSockets.table.division'),
          t(lang, 'activeSockets.table.clearance'),
          t(lang, 'activeSockets.table.device'),
          t(lang, 'activeSockets.table.location'),
          t(lang, 'activeSockets.table.risk'),
          t(lang, 'activeSockets.table.actions')
        ]}>
          {activeSessions.map((session) => {
            const isLocked = session.status === 'LOCKED_BY_THREAT_DETECTION';
            const isChallenged = session.status === 'STEP_UP_CHALLENGE';

            return (
              <tr 
                key={session.sessionId} 
                className={`hover:bg-slate-900/30 font-sans text-xs ${
                  isLocked ? 'bg-red-950/20 text-red-100 border-l-4 border-red-500' : 
                  isChallenged ? 'bg-amber-950/10 text-amber-100 border-l-4 border-amber-500' : ''
                }`}
              >
                <td className="px-4 py-3.5 whitespace-normal break-words min-w-[120px]">
                  <strong className="text-white block">{session.username}</strong>
                  <span className="text-[10px] text-slate-500 block">
                    {session.userId} ({translateRole(lang, session.userRole)})
                  </span>
                </td>
                <td className="px-4 py-3.5 text-[#E0A96D] font-bold text-xs uppercase whitespace-normal break-words min-w-[100px]">
                  {session.associatedMinistry 
                    ? translateMinistry(lang, session.associatedMinistry) 
                    : t(lang, 'activeSockets.actions.external')}
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <Badge variant={
                    session.clearanceLevel === 'SOVEREIGN' ? 'gold' :
                    session.clearanceLevel === 'SECRET' ? 'danger' :
                    session.clearanceLevel === 'CONFIDENTIAL' ? 'warning' : 'slate'
                  }>
                    {translateClearance(lang, session.clearanceLevel)}
                  </Badge>
                </td>
                <td className="px-4 py-3.5 text-[11px] leading-snug whitespace-normal break-words min-w-[130px]">
                  <span className="text-slate-300 block font-sans">{session.device.osName}</span>
                  <span className="text-[10px] text-slate-400 block font-sans">
                    {session.device.cpuArchitecture} Enclave:{' '}
                    {session.device.secureEnclavePresent 
                      ? t(lang, 'activeSockets.actions.yes') 
                      : t(lang, 'activeSockets.actions.no')}
                  </span>
                </td>
                <td className="px-4 py-3.5 whitespace-normal break-words min-w-[120px]">
                  <span className="text-slate-300 block">{session.location.ipAddress}</span>
                  <span className="text-[10px] text-cyan-400 font-bold block">{session.location.geographicRegion}</span>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className={`text-[13px] font-extrabold ${isLocked ? 'text-red-500' : isChallenged ? 'text-amber-500' : 'text-emerald-400'}`}>
                      {session.riskScore}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold block whitespace-nowrap">
                      ({isLocked 
                        ? t(lang, 'activeSockets.actions.lock') 
                        : isChallenged 
                          ? t(lang, 'activeSockets.actions.challenge') 
                          : t(lang, 'activeSockets.actions.active')})
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-center whitespace-nowrap">
                  <Button
                    size="sm"
                    variant={isLocked ? 'danger' : 'outline'}
                    onClick={() => terminateSessionSocket(session.sessionId, session.username)}
                    className="px-2 py-1 text-[10px] uppercase font-bold"
                  >
                    <Trash2 className="w-3 h-3 ltr:mr-1 rtl:ml-1 inline" />
                    {isLocked ? t(lang, 'activeSockets.actions.revoke') : t(lang, 'activeSockets.actions.logout')}
                  </Button>
                </td>
              </tr>
            );
          })}
        </Table>
      </div>
    </div>
  );
});

ActiveSocketsPanel.displayName = 'ActiveSocketsPanel';
