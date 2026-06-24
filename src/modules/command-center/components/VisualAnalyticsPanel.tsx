import React from 'react';
import { Coins, Shield, Activity } from 'lucide-react';
import { Language } from '../../../types';
import { t } from '../localization/ccTranslations';
import { 
  Alert, StatCard, ChartContainer, BarChart, SectionHeader, Table, MetricCard, Badge
} from '../../../ui';

interface VisualAnalyticsPanelProps {
  lang: Language;
  activeRole: 'pmo' | 'ministries' | 'customs' | 'border' | 'economic';
  pmoRevenueData: Array<{ label: string; value: number }>;
  customsClassifications: Array<{
    hs: string;
    label: string;
    declared: string;
    taxRate: string;
    status: string;
    node: string;
  }>;
}

export const VisualAnalyticsPanel: React.FC<VisualAnalyticsPanelProps> = React.memo(({
  lang,
  activeRole,
  pmoRevenueData,
  customsClassifications
}) => {
  return (
    <div className="text-start flex flex-col gap-6">
      
      {/* PMO Dashboard View */}
      {activeRole === 'pmo' && (
        <div className="flex flex-col gap-6 text-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
            <StatCard
              title={t(lang, 'pmo.revenueCardTitle')}
              value="8.42T IQD"
              subtitle={t(lang, 'pmo.revenueCardSub')}
              icon={<Coins className="w-5 h-5 text-[#E0A96D]" />}
              trend={{ value: '14.2%', isPositive: true }}
            />
            
            <StatCard
              title={t(lang, 'pmo.interopCardTitle')}
              value="99.94%"
              subtitle={t(lang, 'pmo.interopCardSub')}
              icon={<Shield className="w-5 h-5 text-cyan-400" />}
              trend={{ value: '0.04%', isPositive: true }}
            />
          </div>

          {/* Data Visualization inside PMO dashboard */}
          <ChartContainer 
            title={t(lang, 'pmo.chartTitle')}
            subtitle={t(lang, 'pmo.chartSub')}
          >
            {({ width, height }) => (
              <BarChart data={pmoRevenueData} width={width} height={height} />
            )}
          </ChartContainer>

          {/* Cabinet Directives */}
          <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl flex flex-col gap-3.5 text-start">
            <SectionHeader title={t(lang, 'pmo.directiveHeader')} />
            
            <Alert
              variant="success"
              title={t(lang, 'pmo.alert1Title')}
              description={t(lang, 'pmo.alert1Desc')}
              icon={<Shield className="w-4 h-4" />}
            />
            
            <Alert
              variant="warning"
              title={t(lang, 'pmo.alert2Title')}
              description={t(lang, 'pmo.alert2Desc')}
              icon={<Activity className="w-4 h-4" />}
            />
          </div>
        </div>
      )}

      {/* Ministries View */}
      {activeRole === 'ministries' && (
        <div className="flex flex-col gap-6 text-start">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-start font-[600]">
            <MetricCard 
              title={t(lang, 'ministriesView.defense')}
              icon={<Shield className="w-4 h-4" />}
              metrics={[
                { label: t(lang, 'ministriesView.dualUse'), value: t(lang, 'ministriesView.cleared'), status: 'secure' },
                { label: t(lang, 'ministriesView.jointForces'), value: t(lang, 'ministriesView.syncActive'), status: 'secure' },
                { label: t(lang, 'ministriesView.chemicalPrecursors'), value: t(lang, 'ministriesView.zeroHolds'), status: 'secure' }
              ]}
            />
            <MetricCard 
              title={t(lang, 'ministriesView.health')}
              icon={<Activity className="w-4 h-4" />}
              metrics={[
                { label: t(lang, 'ministriesView.biomedical'), value: t(lang, 'ministriesView.cleared'), status: 'secure' },
                { label: t(lang, 'ministriesView.insulin'), value: `11 ${t(lang, 'ministriesView.batches')}`, status: 'info' },
                { label: t(lang, 'ministriesView.certifiedCartridges'), value: t(lang, 'ministriesView.approved'), status: 'secure' }
              ]}
            />
            <MetricCard 
              title={t(lang, 'ministriesView.agriculture')}
              icon={<Activity className="w-4 h-4" />}
              metrics={[
                { label: t(lang, 'ministriesView.phytosanitary'), value: `1 ${t(lang, 'ministriesView.alertHold')}`, status: 'warning' },
                { label: t(lang, 'ministriesView.nonGmo'), value: t(lang, 'ministriesView.verified'), status: 'secure' },
                { label: t(lang, 'ministriesView.biologicalCargo'), value: t(lang, 'ministriesView.inspectionReq'), status: 'warning' }
              ]}
            />
          </div>

          {/* COSQC Accords Table */}
          <div className="bg-[#111e2e] p-5 pb-8 overflow-visible rounded-xl border border-slate-800 flex flex-col gap-4 text-start font-[600]">
            <SectionHeader 
              title={t(lang, 'ministriesView.cosqcTitle')} 
              description={t(lang, 'ministriesView.cosqcDesc')}
            />
            
            <Table headers={[
              t(lang, 'ministriesView.stamp'),
              t(lang, 'ministriesView.origin'),
              t(lang, 'ministriesView.subclass'),
              t(lang, 'ministriesView.rating'),
              t(lang, 'ministriesView.seal')
            ]}>
              <tr>
                <td className="px-4 py-3 text-[#E0A96D] font-bold font-mono">COSQC-STND-2026</td>
                <td className="px-4 py-3 font-[600]">{t(lang, 'ministriesView.eu')}</td>
                <td className="px-4 py-3 font-sans font-semibold text-slate-300">{t(lang, 'ministriesView.brake')}</td>
                <td className="px-4 py-3 text-[#52B788] font-bold font-mono">99.8% ({t(lang, 'ministriesView.approved')})</td>
                <td className="px-4 py-3 font-mono text-slate-400">EU_ISO_CERT_889</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-[#E0A96D] font-bold font-mono">COSQC-AGRI-9981</td>
                <td className="px-4 py-3 font-[600]">{lang === 'en' ? 'Regional Imports' : lang === 'ar' ? 'مستوردات الإقليم وواردات الجوار' : 'هاوردەکراوی ناوچەیی'}</td>
                <td className="px-4 py-3 font-sans font-semibold text-slate-300">{t(lang, 'ministriesView.grains')}</td>
                <td className="px-4 py-3 text-[#52B788] font-bold font-mono">100.0% ({t(lang, 'ministriesView.approved')})</td>
                <td className="px-4 py-3 font-mono text-slate-400">AGRI_STATE_SEAL</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-[#E0A96D] font-bold font-mono">COSQC-ELEC-4131</td>
                <td className="px-4 py-3 font-[600]">{lang === 'en' ? 'East Asia Circ' : lang === 'ar' ? 'الشرق الأقصى' : 'ڕۆژهەڵاتی ئاسیا'}</td>
                <td className="px-4 py-3 font-sans font-semibold text-slate-300">{t(lang, 'ministriesView.relay')}</td>
                <td className="px-4 py-3 text-amber-500 font-bold font-mono">89.2% ({t(lang, 'ministriesView.pendingHold')})</td>
                <td className="px-4 py-3 font-mono text-slate-500">LAB_MANUAL_DECISION</td>
              </tr>
            </Table>
          </div>
        </div>
      )}

      {/* Customs Control View */}
      {activeRole === 'customs' && (
        <div className="flex flex-col gap-6 text-start">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-start font-[600]">
            <div className="bg-[#0b1420] border border-slate-800 p-4 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">{t(lang, 'customsView.filings')}</span>
              <span className="text-xl font-bold font-mono text-white mt-1 block">14,204</span>
            </div>
            <div className="bg-[#0b1420] border border-slate-800 p-4 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">{t(lang, 'customsView.taxStream')}</span>
              <span className="text-xl font-bold font-mono text-[#E0A96D] mt-1 block">22.4B IQD</span>
            </div>
            <div className="bg-[#0b1420] border border-slate-800 p-4 rounded-xl text-center animate-pulse">
              <span className="text-[10px] text-red-400 uppercase font-mono block">{t(lang, 'customsView.holdsCount')}</span>
              <span className="text-xl font-bold font-mono text-red-500 mt-1 block">342</span>
            </div>
            <div className="bg-[#0b1420] border border-slate-800 p-4 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">{t(lang, 'customsView.hsMatch')}</span>
              <span className="text-xl font-bold font-mono text-cyan-400 mt-1 block">98.92%</span>
            </div>
          </div>

          {/* Live Classification Stream */}
          <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl flex flex-col gap-4 text-start font-[600]">
            <SectionHeader title={t(lang, 'customsView.streamTitle')} description={t(lang, 'customsView.streamDesc')} />
            
            <div className="flex flex-col gap-3 font-mono text-xs text-start">
              {customsClassifications.map((item, index) => {
                const translateClassificationStatus = (status: string) => {
                  if (status.includes('100% Match')) return lang === 'en' ? '100% Audit Match' : lang === 'ar' ? 'مطابقة التدقيق ١٠٠٪' : 'هاوتایی پشکنین ١٠٠٪';
                  if (status.includes('Mismatch')) return lang === 'en' ? 'HS Mismatch Resolved' : lang === 'ar' ? 'تم حل عدم التطابق' : 'ناڕێکیی کۆد چارەسەرکرا';
                  return status;
                };
                const translateClassificationLabel = (label: string) => {
                  if (label.includes('Barley feed cargo')) return lang === 'en' ? 'Barley grain cargo' : lang === 'ar' ? 'شحنة شعير زراعي' : 'باری جۆی کشتوکاڵی';
                  if (label.includes('Refined high-grade sugar')) return lang === 'en' ? 'Refined sugar stock' : lang === 'ar' ? 'سكر مكرر مستورد' : 'باری شەکر پۆلێنکراو';
                  if (label.includes('Wheat standard grain')) return lang === 'en' ? 'Wheat standard seed' : lang === 'ar' ? 'حبوب قمح قياسية' : 'باری گەنمی ستاندارد';
                  return label;
                };
                const translateNode = (node: string) => {
                  if (node.toLowerCase().includes('trebil')) return lang === 'en' ? 'Trebil' : lang === 'ar' ? 'طريبيل' : 'ترێبێل';
                  if (node.toLowerCase().includes('umm qasr')) return lang === 'en' ? 'Umm Qasr' : lang === 'ar' ? 'أم قصر' : 'ئوم قەسر';
                  if (node.toLowerCase().includes('ibrahim')) return lang === 'en' ? 'Ibrahim Khalil' : lang === 'ar' ? 'إبراهيم الخليل' : 'ئیبراهیم خەلیل';
                  return node;
                };

                return (
                  <div 
                    key={index} 
                    className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-start font-[600]"
                  >
                    <div className="text-start">
                      <span className="text-[#E0A96D] font-bold block text-xs">[HS: {item.hs}] - {translateClassificationLabel(item.label)}</span>
                      <span className="text-[10px] text-slate-400 mt-1 block">{t(lang, 'customsView.declaredVal')}: {item.declared} • {t(lang, 'customsView.tariffRate')}: {item.taxRate}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <Badge variant={item.status.includes('100%') ? 'success' : 'warning'} className="font-[800]">
                        {translateClassificationStatus(item.status)}
                      </Badge>
                      <span className="text-[10px] text-slate-500 uppercase font-[600]">{translateNode(item.node)} {t(lang, 'customsView.syncActive')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Economic Council View */}
      {activeRole === 'economic' && (
        <div className="flex flex-col gap-6 text-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start font-[600]">
            <div className="bg-[#0b1420] border border-slate-800 p-4.5 rounded-xl text-start flex flex-col gap-2">
              <span className="text-[10px] text-slate-400 uppercase font-mono text-start">{t(lang, 'economicView.forexMatch')}</span>
              <span className="text-2xl font-bold text-[#52B788] font-mono leading-none text-start">98.15%</span>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed text-start font-[600]">
                {t(lang, 'economicView.forexDesc')}
              </p>
            </div>

            <div className="bg-[#0b1420] border border-slate-800 p-4.5 rounded-xl text-start flex flex-col gap-2">
              <span className="text-[10px] text-slate-400 uppercase font-mono text-start">{t(lang, 'economicView.balanceTitle')}</span>
              <span className="text-2xl font-bold text-[#E0A96D] font-mono leading-none text-start">+$9.18B USD</span>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed text-start font-[600]">
                {t(lang, 'economicView.balanceDesc')}
              </p>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl flex flex-col gap-3.5 text-start font-[600]">
            <SectionHeader title={t(lang, 'economicView.corridorsTitle')} description={t(lang, 'economicView.corridorsDesc')} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-start">
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-start">
                <span className="text-[#E0A96D] font-mono uppercase font-bold text-[11px] block text-start">{t(lang, 'economicView.gulfBasra')}</span>
                <p className="text-[11px] text-slate-404 mt-1.5 leading-relaxed text-start font-[600]">
                  {t(lang, 'economicView.gulfBasraDesc')}
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-start font-[600]">
                <span className="text-[#E0A96D] font-mono uppercase font-bold text-[11px] block text-start">{t(lang, 'economicView.levantTransit')}</span>
                <p className="text-[11px] text-slate-404 mt-1.5 leading-relaxed text-start font-[600]">
                  {t(lang, 'economicView.levantTransitDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

VisualAnalyticsPanel.displayName = 'VisualAnalyticsPanel';
