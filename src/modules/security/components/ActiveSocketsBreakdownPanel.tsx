import React from 'react';
import { Network } from 'lucide-react';
import { Language } from '../../../types';
import { ZeroTrustSession } from '../../../security';
import { ChartContainer, PieChart } from '../../../ui';
import { t } from '../localization/securityTranslations';

interface ActiveSocketsBreakdownPanelProps {
  lang: Language;
  activeSessions: ZeroTrustSession[];
}

export const ActiveSocketsBreakdownPanel: React.FC<ActiveSocketsBreakdownPanelProps> = React.memo(({
  lang,
  activeSessions
}) => {
  const secureSess = activeSessions.filter(s => s.status === 'ACTIVE').length;
  const flaggedSess = activeSessions.filter(s => s.status === 'STEP_UP_CHALLENGE').length;
  const lockedSess = activeSessions.filter(s => s.status === 'LOCKED_BY_THREAT_DETECTION').length;

  // Modern Enterprise Colors
  const colors = {
    status: {
      secure: '#10B981', // emerald-500
      warning: '#F59E0B', // amber-500
      danger: '#EF4444' // red-500
    }
  };

  const sessionDistributionData = [
    { label: t(lang, 'sidebar.breakdown.active'), value: secureSess, color: colors.status.secure },
    { label: t(lang, 'sidebar.breakdown.challenge'), value: flaggedSess, color: colors.status.warning },
    { label: t(lang, 'sidebar.breakdown.locked'), value: lockedSess, color: colors.status.danger }
  ];

  return (
    <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl text-start flex flex-col gap-4">
      <h3 className="text-sm font-[650] text-slate-200 uppercase tracking-widest pb-2 border-b border-slate-900 flex justify-between items-center">
        <span className="flex items-center gap-1.5">
          <Network className="text-[#E0A96D] w-4.5 h-4.5" />
          {t(lang, 'sidebar.breakdown.title')}
        </span>
      </h3>

      <ChartContainer 
        title={t(lang, 'sidebar.breakdown.chartTitle')} 
        subtitle={t(lang, 'sidebar.breakdown.chartSubtitle')}
      >
        {({ width, height }) => (
          <PieChart data={sessionDistributionData} width={width} height={height} />
        )}
      </ChartContainer>
    </div>
  );
});

ActiveSocketsBreakdownPanel.displayName = 'ActiveSocketsBreakdownPanel';
