export interface HITLIncident {
  id: string;
  checkpoint: string;
  cargo: string;
  score: string;
  anomaly: string;
  status: string;
}

export interface HITLApproval {
  id: string;
  action: 'APPROVED' | 'REJECTED';
  timestamp: string;
}

export const getPromptTemplate = (id: string, lang: 'en' | 'ar' | 'ku') => {
  switch(id) {
    case 'hs-prompt':
      return lang === 'ku'
        ? `[ڕێنمایی سیستەمی زیرەکیی دەستکرد: پۆلێنکردنی کاڵاکان]\nتۆ مێشکی بەرپرسیاری پۆلێنکردنی کاڵاکانی گومرگی بۆ دەروازەکانی عێراقیت.\nتکایە وردبینی بۆ ئەم کاڵایەی خوارەوە بکە بۆ دەستنیشانکردنی کۆدی نێودەوڵەتی (HS Code):\n\nپێناسەی کاڵاکە: {{description}}\nوڵاتی سەرچاوە: {{origin}}\nبەها: {{cost}}\n\nپێویستە دیاری بکرێت: (١) کۆدی ٨ خانەیی دروست، (٢) ڕێژەی ڕەسومی گومرگی، (٣) ئاستی مەترسیی بارهەڵگرەکە.`
        : lang === 'ar'
        ? `[تعليمات النظام: محاكي تصنيف البضائع الموحد]\nأنت العقل الاصطناعي المعتمد لتصنيف البضائع الجمركية في البوابة الوطنية العراقية.\nقم بتدقيق الشحنة التالية لتحديد رمز النظام المنسق (HS Code):\n\nوصف البضاعة: {{description}}\nبلد المنشأ: {{origin}}\nالقيمة المصرح بها: {{cost}}\n\nحدد: (١) الرمز الجمركي المكون من ٨ خانات، (٢) الرسوم الجمركية المترتبة، (٣) مؤشر المخاطر والتهديدات.`
        : `[SYSTEM_INSTRUCTION: ACT_AS_SOVEREIGN_IDG_CLASSIFIER]\nYou are the secure HS Classification AI for the Iraq Gateway.\nCargo Description: {{description}}\nOrigin: {{origin}}\nCost: {{cost}}\nDetermine: (1) Correct 8-digit HS Code, (2) Recommended Duty rate, (3) Risk profile.`;
    case 'eval-prompt':
      return lang === 'ku'
        ? `[ڕێنمایی گشتی: فەرمانبەری پاراستنی داهاتی گشتی]\nنرخی ڕاگەیەندراوی کاڵاکە بەراورد بکە لەگەڵ پێوەرە فەرمییەکانی بازرگانیی نێودەوڵەتی.`
        : lang === 'ar'
        ? `[توجيه: ضابط حماية العائد المالي الوطني]\nقارن الأسعار المصرح بها للمواد بمتوسط أسعار الأسواق العالمية القياسية.`
        : `[INSTRUCTION: CHIEF_REVENUE_PROTECT_AGENT]\nCompare the declared price against raw trade indices.\nDescription: {{description}}\nDeclared Value: {{cost}}\nExporter origin: {{origin}}\nEstimate deviation.`;
    case 'quarantine-prompt':
      return lang === 'ku'
        ? `[پشکنەری کشتوکاڵی و بایۆلۆجیی دەروازەکان]\nشیکردنەوەی بارهەڵگرەکانی کەرتی کشتوکاڵ بکە بۆ دڵنیابوون لە پابەندبوون بە مەرجەکانی سەلامەتیی تەندروستی.`
        : lang === 'ar'
        ? `[فلتر الفحص والحجر الصحي والبيولوجي الموحد]\nحلل طبيعة الشحنات الزراعية ومدى مطابقتها للضوابط والمعايير الصحية الاتحادية.`
        : `[SAFETY_INSPECT_FILTER]\nAnalyze agricultural cargos and quarantine codes.\nProduct description: {{description}}\nOrigin: {{origin}}\nCheck biological alerts.`;
    default:
      return '';
  }
};

export const getStandardResponse = (playDesc: string, lang: 'en' | 'ar' | 'ku') => {
  const isDrillPipe = playDesc.toLowerCase().includes('drill') || playDesc.toLowerCase().includes('pipe');
  if (isDrillPipe) {
    if (lang === 'ku') {
     return `[بزوێنەری بڕیاردانی زیرەکی نیشتمانی]\n١. HS-CODE: 7304.22.00\n٢. تاریفە: ٨٪\n٣. مەترسی: سەوز`;
    }
    if (lang === 'ar') {
      return `[محرك الاستدلال السيادي]\n١. الرمز (HS-CODE): 7304.22.00\n٢. الرسوم: ٨٪\n٣. تقرير المخاطر: خضراء`;
    }
    return `[SOVEREIGN_INFERENCE_ENGINE: CLEARED]\n1. RESOLVED HS-CODE: 7304.22.00\n2. TARIFF: 8% Ad-Valorem\n3. INTEGRITY: GREEN`;
  } else {
    if (lang === 'ku') {
      return `[بزوێنەری بڕیاردانی زیرەکی نیشتمانی]\n١. HS-CODE: 8471.30.00\n٢. تاریفە: ٥.٠٪\n٣. مەترسی: نزم`;
    }
    if (lang === 'ar') {
      return `[محرك الاستدلال السيادي]\n١. الرمز (HS-CODE): 8471.30.00\n٢. الرسوم: ٥.٠٪\n٣. تقرير المخاطر: منخفضة`;
    }
    return `[SOVEREIGN_INFERENCE_ENGINE: CLEARED]\n1. RESOVED HS-CODE: 8471.30.00\n2. TARIFF: 5.0%\n3. RISK PROFILE: LOW`;
  }
};

export const getRegistryPrompts = (lang: 'en' | 'ar' | 'ku') => ({
  'hs-prompt': {
    title: lang === 'ku' ? 'پۆلێنکەرە فەرمییەکانی کۆدی گومرگی (Model UR-Cortex)' : lang === 'ar' ? 'مصنف ترميز البضائع (نموذج UR-Cortex)' : 'HS Code Classifier (Model UR-Cortex)',
    desc: 'Multi-axle steel alloy drill pipes for petroleum wells',
    origin: 'Germany',
    cost: '$3,400 USD / Ton'
  },
  'eval-prompt': {
    title: lang === 'ku' ? 'وردبینیکردنی دابەزینی نرخەکان (Model Tigris-Risk)' : lang === 'ar' ? 'مدقق تخفيض الفواتير (نموذج Tigris-Risk)' : 'Under-Invoicing Auditor (Model Tigris-Risk)',
    desc: 'High-density polyethylene resins',
    origin: 'Korea',
    cost: '$450 USD / Ton (Under-invoiced estimate)'
  },
  'quarantine-prompt': {
    title: lang === 'ku' ? 'پشکنەری کشتوکاڵ و کەرەنتینەی فەرمی (Euphrates-Phyto)' : lang === 'ar' ? 'فاحص الحجر الصحي والأمن الحيوي (Euphrates-Phyto)' : 'Biosecurity quarantine scanner (Euphrates-Phyto)',
    desc: 'Bulk seed-potatoes for farming hubs',
    origin: 'Lebanon',
    cost: '$620 USD / Ton'
  }
});
export interface AIModule {
  id: string;
  index: string;
  accuracy: string;
  latency: string;
}

export const aiModules: AIModule[] = [
  { id: 'hs-classifier', index: 'IDG-Cortex-V3', accuracy: '99.8%', latency: '40ms' },
  { id: 'customs-auditor', index: 'Ur-Transit-MoE', accuracy: '99.2%', latency: '52ms' },
  { id: 'logistics-seq', index: 'Tigris-Agent-V2', accuracy: '98.5%', latency: '35ms' },
  { id: 'compliance-intercept', index: 'CBI-Interlock-MoE', accuracy: '99.96%', latency: '65ms' },
  { id: 'risk-assessment', index: 'Iraq-Risk-V1', accuracy: '97.2%', latency: '28ms' },
  { id: 'decision-support', index: 'Ur-Statecraft-LLM', accuracy: '99.1%', latency: '120ms' },
  { id: 'predictive-corridors', index: 'Corridor-Flow-MoE', accuracy: '96.8%', latency: '45ms' },
  { id: 'economic-forecaster', index: 'Fiscal-Atlas-MoE', accuracy: '98.7%', latency: '90ms' }
];
