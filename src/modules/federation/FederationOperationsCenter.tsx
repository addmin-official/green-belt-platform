import React, { useState } from 'react';
import { FederationHealthPanel } from '../../app/components/FederationHealthPanel';
import { JointTreatyCenter } from '../../app/components/JointTreatyCenter';
import { TreatyLifecyclePanel } from '../../app/components/TreatyLifecyclePanel';
import { CrossGovernmentWorkflowPanel } from '../../app/components/CrossGovernmentWorkflowPanel';
import ProcurementAuditPanel from '../../app/components/procurement/ProcurementAuditPanel';
import { Card, Badge, PageHeader } from '../../ui';
import { 
  Heart, Globe2, Sliders, Network, ShieldCheck, Activity, Users, Settings, History 
} from 'lucide-react';

interface FederationOperationsCenterProps {
  lang: 'en' | 'ar' | 'ku';
}

type TabType = 'HEALTH' | 'TREATIES' | 'LIFECYCLE' | 'WORKFLOWS' | 'PROCUREMENT_COMPLIANCE';

export const FederationOperationsCenter: React.FC<FederationOperationsCenterProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<TabType>('HEALTH');

  const t = {
    en: {
      title: 'National Federation Operations Command',
      sub: 'Central dual-government orchestration interface coordinating active treaties, unification compliance indices, and cross-boundary transit workflows under Iraqi Law.',
      tabHealth: 'Operations Health',
      tabTreaties: 'Accords Registry',
      tabLifecycle: 'Lifecycle Analyzer',
      tabWorkflows: 'Multi-Stage Workflows',
      tabProcurement: 'Procurement Accords Audit'
    },
    ar: {
      title: 'مركز إدارة العمليات والاتفاقيات الفيدرالية الموحدة',
      sub: 'واجهة التنسيق المركزية المشتركة لإدارة المعاهدات، ومؤشرات الاندماج الفيدرالي وسلاسل التدقيق الجمركي المستقل بين بغداد وأربيل.',
      tabHealth: 'سلامة العمليات',
      tabTreaties: 'سجل الاتفاقيات',
      tabLifecycle: 'محلل المعاهدات',
      tabWorkflows: 'مسارات التدقيق المشترك',
      tabProcurement: 'تدقيق اتفاقيات المشتريات'
    },
    ku: {
      title: 'ناوەندی بەڕێوەبردن و وەبەرهێنانی هاوبەشی فیدراڵ',
      sub: 'دەستەی باڵای ڕێکخستنی پەیوەندی و پەیماننامە تەکنیکییەکان، هاوکاتکردنی داتاکان، و پڕۆسەکانی دەسەڵاتی دادوەری فیدراڵی.',
      tabHealth: 'دۆخی گشتی هاوبەش',
      tabTreaties: 'پەیماننامەکان',
      tabLifecycle: 'وردبینی یاسایی',
      tabWorkflows: 'سیستەمی هێڵەکان',
      tabProcurement: 'وردبینی پەیماننامەی تەندەرەکان'
    }
  }[lang];

  return (
    <div id="federation-operations-center-module" className="flex flex-col gap-6 w-full text-start animate-fade-in">
      
      {/* Page Header Component */}
      <PageHeader
        title={t.title}
        subTitle={t.sub}
        badge={
          <Badge variant="teal">FEDERATION_OPS_ACTIVE_V3</Badge>
        }
      />

      {/* Tab Navigation selectors */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-900 pb-3 mt-1 justify-start">
        {[
          { key: 'HEALTH', label: t.tabHealth, icon: Heart },
          { key: 'TREATIES', label: t.tabTreaties, icon: Globe2 },
          { key: 'LIFECYCLE', label: t.tabLifecycle, icon: Sliders },
          { key: 'WORKFLOWS', label: t.tabWorkflows, icon: Network },
          { key: 'PROCUREMENT_COMPLIANCE', label: t.tabProcurement, icon: History }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as TabType)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border transition cursor-pointer select-none ${
                isActive
                  ? 'bg-sky-950/50 border-sky-600/80 text-slate-100 shadow-[0_0_15px_rgba(3,105,161,0.15)]'
                  : 'bg-slate-950/60 border-slate-930 text-slate-400 hover:text-slate-200 hover:border-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content renderer panels */}
      <div className="w-full mt-2">
        {activeTab === 'HEALTH' && <FederationHealthPanel lang={lang} />}
        {activeTab === 'TREATIES' && <JointTreatyCenter lang={lang} />}
        {activeTab === 'LIFECYCLE' && <TreatyLifecyclePanel lang={lang} />}
        {activeTab === 'WORKFLOWS' && <CrossGovernmentWorkflowPanel lang={lang} />}
        {activeTab === 'PROCUREMENT_COMPLIANCE' && <ProcurementAuditPanel lang={lang} />}
      </div>

    </div>
  );
};
export default FederationOperationsCenter;
