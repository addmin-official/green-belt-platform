import React from 'react';
import { Language } from '../../../types';
import { t } from '../localization/aiTranslations';
import { AIModule } from '../hooks/useSovereignAI';

interface ServiceMapPanelProps {
  lang: Language;
  activeModule: string;
  setActiveModule: (id: string) => void;
  aiModules: AIModule[];
}

export const ServiceMapPanel: React.FC<ServiceMapPanelProps> = React.memo(({
  lang,
  activeModule,
  setActiveModule,
  aiModules
}) => {
  const getModuleStatus = (id: string) => {
    switch (id) {
      case 'hs-classifier': return lang === 'ku' ? 'چالاک و پێشنیارکەر' : lang === 'ar' ? 'متصل ويقدم التوصيات' : 'Live & Recommending';
      case 'customs-auditor': return lang === 'ku' ? 'پاڵپشتی چالاک' : lang === 'ar' ? 'خادم احتياطي نشط' : 'Backup Active';
      case 'logistics-seq': return lang === 'ku' ? 'ڕاستەوخۆ چالاک' : lang === 'ar' ? 'متصل ونشط' : 'Live & Active';
      case 'compliance-intercept': return lang === 'ku' ? 'سیستەمی چاودێری توند' : lang === 'ar' ? 'عديم الثقة النشطة' : 'Strict Zero-Trust';
      case 'risk-assessment': return lang === 'ku' ? 'مۆنیتۆرکردنی ڕاستەوخۆ' : lang === 'ar' ? 'يراقب تدفق البيانات' : 'Monitoring Stream';
      case 'decision-support': return lang === 'ku' ? 'لەسەر هێڵە' : lang === 'ar' ? 'في وضع الاستعداد' : 'On-Standby';
      case 'predictive-corridors': return lang === 'ku' ? 'چالاکە' : lang === 'ar' ? 'نشط' : 'Active';
      case 'economic-forecaster': return lang === 'ku' ? 'چالاکی ڕاستەوخۆ' : lang === 'ar' ? 'مباشر' : 'Live';
      default: return '';
    }
  };

  const getModuleName = (id: string) => {
    switch (id) {
      case 'hs-classifier': return lang === 'ku' ? 'زیرەکیی پۆلێنکردنی کۆدەکانی گومرگی (HS)' : lang === 'ar' ? 'ذكاء تصنيف البضائع والتعرفة الجمركية' : 'HS Classification AI';
      case 'customs-auditor': return lang === 'ku' ? 'هاوکاری زیرەکی وردبینیی گومرگی' : lang === 'ar' ? 'مساعد التدقيق الجمركي الآلي' : 'Customs Assistant AI';
      case 'logistics-seq': return lang === 'ku' ? 'بزوێنەری مۆنیتۆری لۆجستیی نیشتمانی' : lang === 'ar' ? 'محرك جدولة اللوجستية والمسارات' : 'Logistics AI Core';
      case 'compliance-intercept': return lang === 'ku' ? 'زیرەکیی چاودێریی پابەندبوون و دراو' : lang === 'ar' ? 'ذكاء مراقبة الحوالات والامتثال المالي' : 'Compliance Intercept AI';
      case 'risk-assessment': return lang === 'ku' ? 'تۆڕی هەڵسەنگاندنی مەترسییەکانی سنوور' : lang === 'ar' ? 'تحليل المخاطر السيادية للمنافذ' : 'Risk Assessment neural';
      case 'decision-support': return lang === 'ku' ? 'سیرڤسی هاوکاریی بڕیاردانی وەزارەتی' : lang === 'ar' ? 'وكيل دعم القرار الوزاري' : 'Decision Support Agent';
      case 'predictive-corridors': return lang === 'ku' ? 'زیرەکیی پێشبینیی ڕێڕەوەکانی ترانزیت' : lang === 'ar' ? 'ذكاء مسارات الترانزيت التنبؤي' : 'Predictive Transit AI';
      case 'economic-forecaster': return lang === 'ku' ? 'تۆڕی زانیاریی ئابووریی نیشتمانی' : lang === 'ar' ? 'الشبكة الاستخباراتية الاقتصادية الوطنية' : 'Economic Intel Network';
      default: return id;
    }
  };

  const getModuleDetail = (id: string) => {
    switch (id) {
      case 'hs-classifier': return lang === 'ku'
        ? 'پۆلێنکردنی کاڵاکان بەپێی مانیفێستی دیجیتاڵی بە زمانەکانی کوردی و عەرەبی بۆ دیاریکردنی دروستی کۆدەکانی (HS) و ڕێگری لە شاردنەوەی جۆری ماددەکان.'
        : lang === 'ar'
        ? 'يقوم مصنف ترميز البضائع بتحليل المانيفستات متعددة اللغات ومطابقتها بالمؤشرات الجمركية العالمية لمنع التهريب وتصنيف المواد الخطرة.'
        : 'Parses multi-language manifests to match cargo descriptions with global HS-Code indices, intercepting intentional misclassifications intended to bypass tariff regulations.';
      case 'customs-auditor': return lang === 'ku'
        ? 'شیکارکاریی بەهای فاکتۆرەکان. هەڵسەنگاندنی بەهای ڕاستەقینەی کاڵاکان بەراورد بە تێکڕای بازاڕی جیهانی بۆ پاراستنی داهاتی گشتیی فیدراڵی.'
        : lang === 'ar'
        ? 'محلل تقييم الفواتير الجمركية. يقارن أسعار الشحنات بالنطاق السعري في الأسواق العالمية حمايةً للعائد المالي السيادي الوطني.'
        : 'Under-invoicing analyzer. Correlates item valuations against global market averages. Generates instant revenue protection warnings if cargo worth deviates sharply from trade averages.';
      case 'compliance-intercept': return lang === 'ku'
        ? 'تۆڕی پاراستنی پابەندبوونی دارایی. چاودێریکردنی وردی حوالاتەکانی نافزەی فرۆشتنی دراو بۆ ڕێگریکردن لە سپیکردنەوەی پارە و هەناردەی وەهمی.'
        : lang === 'ar'
        ? 'محور الامتثال السيادي لتعاملات نافذة بيع العملة. يكشف عمليات تهريب العملات والاستيرادات الوهمية غير الحقيقية.'
        : 'Sovereign compliance interlock. Monitors high-frequency financial transfers against CBI indices. Exposes capital evasion, currency manipulation, and phantom imports.';
     case 'risk-assessment': return lang === 'ku'
        ? 'هەڵسەنگاندنی ئاستی مەترسیی بارهەڵگرەکان. چاودێریی پەیوەندیی نێوان بەندەرەکان و کۆمپانیاکان دەکات بۆ دیاریکردنی پێشینەی پشکنینی فیزیکی لە دەروازە سنوورییەکان.'
        : lang === 'ar'
        ? 'تقييم درجات المخاطرة للشحنات الواردة. يربط بين بيانات الموانئ والشركات المصدرة والناقلة لتحديد الشحنات المشتبه بها للتدقيق اليدوي الجمركي.'
        : 'Evaluates risk profiles on all inbound shipments. Cross-references shippers, shipping ports, transport fleets, and cargo descriptions to flag physical inspection priorities without impacting clean traders.';
      case 'decision-support': return lang === 'ku'
        ? 'ڕاوێژکاری ستراتیژی بۆ بڕیارە وەزارییەکان. داتاکانی داهات و گومرگ کۆدەکاتەوە بۆ پێشکەشکردنی پێشبینییە فەرمییەکان بە ئامانجی پشتیوانیکردنی سیاسەتە داراییەکان.'
        : lang === 'ar'
        ? 'مستشار الدعم الاستراتيجي لصناع القرار. يلخص العوائد والضرائب ويوفر توقعات دقيقة لدعم السياسات المالية الاتحادية والمحلية.'
        : 'Strategic statecraft advisor. Synthesizes fiscal outcomes, trade tax yields, and commodity flows to provide ministries with forecast summaries, tariff optimizations, and policy projections.';
      case 'predictive-corridors': return lang === 'ku'
        ? 'چاودێریی ڕێڕەوە وشکانییەکان دەکات. بە ئۆتۆماتیکی چاودێریی جووڵەی بارهەڵگرەکانی ترانزیت دەکات لە یەکەم دەروازەی هاتنەوە تا دەروازەی کۆتایی.'
        : lang === 'ar'
        ? 'مراقبة التدفق المستمر عبر الممرات الجافة الإقليمية. يتتبع حركة شحنات الترانزيت ويتحقق من سلامة الأختام الجمركية الإلكترونية.'
        : 'Monitors transit currents across active regional dry links. Tracks transshipments and verifies sealing integrity from initial seaport gates to regional egress terminals.';
      case 'economic-forecaster': return lang === 'ku'
        ? 'یەکخستنی داتاکانی بازرگانیی نێوان حکومەتی فیدراڵی و هەرێمی کوردستان. هاوکاریی وەزارەتی دارایی دەکات لە پێشبینیکردنی نرخەکان و جموجۆڵی بازرگانیدا.'
        : lang === 'ar'
        ? 'توحيد البيانات التجارية بين الحكومة الاتحادية وإقليم كردستان. يساعد وزارة المالية في رصد حركة البضائع والأسعار والتوقعات المالية بدقة.'
        : 'Consolidates trade balance data vectors across Iraq and Kurdistan borders. Assists the Ministry of Finance in predicting domestic market pricing and trade surplus developments.';
      default: return '';
    }
  };

  return (
    <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4 text-start">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-900 pb-2 text-start">
        {t(lang, 'cluster.title')}
      </h3>
      <p className="text-xs text-slate-400 leading-relaxed text-start">
        {t(lang, 'cluster.subtitle')}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-start">
        {aiModules.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            className={`p-3 rounded-lg border text-start transition-all cursor-pointer flex flex-col justify-between h-[125px] w-full ${
              activeModule === m.id
                ? 'bg-emerald-950/20 border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                : 'bg-[#0f1b29]/90 border-slate-800 hover:border-slate-700 hover:bg-[#112032]'
            }`}
          >
            <div className="flex justify-between items-start gap-1 w-full">
              <span className="text-[10px] bg-slate-900 border border-slate-800 rounded px-1 text-slate-400 font-mono font-medium">{m.index}</span>
              <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${activeModule === m.id ? 'bg-[#52B788] animate-pulse' : 'bg-emerald-500/60'}`} />
            </div>
            <div className="w-full">
              <h4 className="font-semibold text-slate-200 text-xs mt-1 leading-snug truncate w-full">{getModuleName(m.id)}</h4>
              <p className="text-[10px] font-mono text-slate-405 mt-1 capitalize truncate w-full">
                {t(lang, 'cluster.dutyGrade')}{getModuleStatus(m.id)}
              </p>
            </div>
            <div className="flex justify-between items-center text-[9px] font-mono mt-1 pt-1 border-t border-slate-800 text-slate-500 w-full">
              <span>{t(lang, 'cluster.precision')}{m.accuracy}</span>
              <span>{t(lang, 'cluster.latency')}{m.latency}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Module Detail Panel */}
      <div className="bg-[#0b1420] p-4 rounded-lg border border-slate-800/85 flex flex-col gap-2 mt-2 text-start">
        <div className="flex justify-between items-center border-b border-slate-800/60 pb-2 mb-2 w-full text-start">
          <span className="text-[10px] font-mono text-[#E0A96D] uppercase font-bold text-start">
            {t(lang, 'cluster.reportPrefix')}{activeModule.toUpperCase()}
          </span>
          <span className="text-[10px] text-slate-500 font-mono text-end">
            {t(lang, 'cluster.nodeHealth')}
          </span>
        </div>
        <p className="text-xs text-slate-350 leading-relaxed font-sans text-start">
          {getModuleDetail(activeModule)}
        </p>
      </div>
    </div>
  );
});

ServiceMapPanel.displayName = 'ServiceMapPanel';
