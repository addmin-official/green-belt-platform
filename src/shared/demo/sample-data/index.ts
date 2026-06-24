import { Checkpoint, TradeAlert, CargoManifest, SystemService } from '../../../types';
import { LedgerBlockDTO } from '../../../contracts/LedgerContract';

export const CHECKPOINTS: Checkpoint[] = [
  {
    id: 'ck-01',
    name: {
      en: 'Ibrahim Khalil Border Crossing',
      ar: 'معبر إبراهيم الخليل الحدودي',
      ku: 'دەروازەی سنووریی ئیبراهیم خەلیل',
    },
    region: {
      en: 'Duhok Gov. (KRG-Iraq)',
      ar: 'محافظة دهوك (إقليم كوردستان)',
      ku: 'پارێزگای دھۆک (هەرێمی کوردستان)',
    },
    type: 'land',
    status: 'active',
    throughputRaw: 840,
    revenueRaw: 7420, // IQD Millions
    processedToday: 1240, // vehicles/trucks
    latitude: 37.1333,
    longitude: 42.5667,
  },
  {
    id: 'ck-02',
    name: {
      en: 'Umm Qasr Deepwater seaport',
      ar: 'ميناء أم قصر الشمالي والجنوبي',
      ku: 'بەندەری قووڵی ئوم قەسر',
    },
    region: {
      en: 'Basra Governorate (Gulf)',
      ar: 'محافظة البصرة (الخليج العربي)',
      ku: 'پارێزگای بەسرە (کەنداو)',
    },
    type: 'sea',
    status: 'active',
    throughputRaw: 1950,
    revenueRaw: 12580,
    processedToday: 2150, // containers
    latitude: 30.0333,
    longitude: 47.9167,
  },
  {
    id: 'ck-03',
    name: {
      en: 'Bashmakh Border Terminal',
      ar: 'منفذ باشماخ الحدودي',
      ku: 'دەروازەی سنووریی باشماخ',
    },
    region: {
      en: 'Sulaymaniyah Gov. (KRG)',
      ar: 'محافظة السليمانية (إقليم كوردستان)',
      ku: 'پارێزگای سلێمانی (هەرێمی کوردستان)',
    },
    type: 'land',
    status: 'active',
    throughputRaw: 420,
    revenueRaw: 3120,
    processedToday: 680,
    latitude: 35.5947,
    longitude: 46.0361,
  },
  {
    id: 'ck-04',
    name: {
      en: 'Trebil Border Compound',
      ar: 'منفذ طريبيل الحدودي',
      ku: 'دەروازەی سنووریی ترێبێل',
    },
    region: {
      en: 'Anbar Governorate (Jordan Gate)',
      ar: 'محافظة الأنبار (بوابة الأردن)',
      ku: 'پارێزگای ئەنبار (بەرەی ئوردن)',
    },
    type: 'land',
    status: 'warning',
    throughputRaw: 210,
    revenueRaw: 1840,
    processedToday: 320,
    latitude: 32.5539,
    longitude: 38.9883,
  },
  {
    id: 'ck-05',
    name: {
      en: 'Baghdad Int Airport Cargo Hub',
      ar: 'مركز شحن مطار بغداد الدولي',
      ku: 'ناوەندی بارهەڵگری فڕۆکەخانەی نێودەوڵەتی بەغداد',
    },
    region: {
      en: 'Baghdad (Capital Territory)',
      ar: 'العاصمة بغداد',
      ku: 'پایتەخت بەغداد',
    },
    type: 'air',
    status: 'active',
    throughputRaw: 550,
    revenueRaw: 4950,
    processedToday: 890,
    latitude: 33.2625,
    longitude: 44.2347,
  },
  {
    id: 'ck-06',
    name: {
      en: 'Al-Munthiriya Central Gate',
      ar: 'منفذ المنذرية الحدودي',
      ku: 'دەروازەی ناوەندیی موندریە',
    },
    region: {
      en: 'Diyala Governorate (East)',
      ar: 'محافظة ديالى (الشرق)',
      ku: 'پارێزگای دیالە (ڕۆژهەڵات)',
    },
    type: 'land',
    status: 'active',
    throughputRaw: 380,
    revenueRaw: 2280,
    processedToday: 540,
    latitude: 34.3314,
    longitude: 45.4211,
  },
];

export const SYSTEM_SERVICES: SystemService[] = [
  {
    name: {
      en: 'Iraq Sovereign Ledger',
      ar: 'دفتر الأستاذ السيادي العراقي',
      ku: 'دەفتەری گشتیی سەروەریی عێراق',
    },
    type: 'Zero-Trust Blockchain Integrity',
    status: 'healthy',
    latency: 8,
    version: ' v2.1.2-sec',
  },
  {
    name: {
      en: 'Central Tariff Registry Engine',
      ar: 'محرك سجل التعرفة الجمركية المركزي',
      ku: 'بزوێنەری تۆماری تاریفەی جومگەیی ناوەندی',
    },
    type: 'Dynamic HS-Code Automated Match',
    status: 'healthy',
    latency: 14,
    version: 'v4.0.1-AI',
  },
  {
    name: {
      en: 'KRG Inter-Ministerial Sync',
      ar: 'مزامنة الوزارات المشتركة للإقليم والمركز',
      ku: 'هاوکاتکاریی نێوان وەزارەتەکانی هەرێم و بەغداد',
    },
    type: 'Federal Cooperative Data Mesh',
    status: 'healthy',
    latency: 22,
    version: 'v1.12.0',
  },
  {
    name: {
      en: 'Custom Risk Analysis Brain (Gemini)',
      ar: 'دماغ تحليل المخاطر الجمركية (Gemini)',
      ku: 'مێشکی شیکردنەوەی مەترسی گومرگی (Gemini)',
    },
    type: 'AI-Native Deep Threat Mitigation',
    status: 'healthy',
    latency: 124,
    version: 'v3.5-s0v',
  },
  {
    name: {
      en: 'CBI Financial Vault API',
      ar: 'واجهة ربط البنك المركزي للتحقق المالي',
      ku: 'سیستەمی فەرمی CBI بۆ ڕەسەنایەتی دارایی',
    },
    type: 'Anti-Money Laundering Trade Validation',
    status: 'degraded',
    latency: 48,
    version: 'v2.8-aml',
  },
];

export const TRADE_ALERTS: TradeAlert[] = [
  {
    id: 'al-101',
    timestamp: '09:24:15 AST',
    checkpointId: 'ck-02',
    checkpointName: {
      en: 'Umm Qasr Port',
      ar: 'ميناء أم قصر',
      ku: 'بەندەری ئوم قەسر',
    },
    severity: 'high',
    title: {
      en: 'HS-Code Mismatch Flagged',
      ar: 'عدم تطابق رمز النظام المنسق',
      ku: 'ناڕێکیی کۆدی HS دۆزرایەوە',
    },
    description: {
      en: 'Automated scan detected chemical polymers misdeclared as industrial food additives under Tariff Section VI.',
      ar: 'كشف الفحص الآلي عن بوليمرات كيميائية تم الإعلان عنها كإضافات غذائية صناعية بموجب القسم السادس من التعرفة.',
      ku: 'پشکنینی ئۆتۆماتیکی پۆلیمەری کیمیایی دۆزیەوە کە بە ناوی پێکهاتەی پیشەسازیی خواردەمەنی ڕاگەیەندراون لە بەشی VI.',
    },
    status: 'investigating',
  },
  {
    id: 'al-102',
    timestamp: '11:05:42 AST',
    checkpointId: 'ck-01',
    checkpointName: {
      en: 'Ibrahim Khalil Border',
      ar: 'منفذ إبراهيم الخليل',
      ku: 'سنووری ئیبراهیم خەلیل',
    },
    severity: 'critical',
    title: {
      en: 'Anomalous Financial Flow Routing',
      ar: 'مسار مالي غير اعتيادي مرصود',
      ku: 'ڕێڕەوی دارایی نائاسایی دیاریکرا',
    },
    description: {
      en: 'CBI trade wire validation reported value inflation by 380% of actual market standards for European machinery components.',
      ar: 'أبلغ نظام البنك المركزي عن تضخم في القيمة بنسبة 380٪ عن المعايير الحالية لمكونات الآلات الأوروبية المستوردة.',
      ku: 'سیستەمی بانکی ناوەندی بەرزبوونەوەی بەهای بە ڕێژەی ۳٨۰٪ لە ستانداردەکان پیشاندا بۆ باری ئامێری ئەوروپی.',
    },
    status: 'escalated',
  },
  {
    id: 'al-103',
    timestamp: '13:50:11 AST',
    checkpointId: 'ck-04',
    checkpointName: {
      en: 'Trebil compound',
      ar: 'منفذ طريبيل',
      ku: 'نووسینگەی ترێبێل',
    },
    severity: 'medium',
    title: {
      en: 'Regional Transit Interruption',
      ar: 'انقطاع مؤقت لحركة الترانزيت الإقليمي',
      ku: 'پچڕانی کاتی لە گواستنەوەی هەرێمی',
    },
    description: {
      en: 'Jordanian transit digital clearance system experienced service delay; offline fallback protocols successfully engaged.',
      ar: 'شهد نظام التخليص الرقمي الأردني تأخراً في الخدمة؛ تم تفعيل بروتوكول العمل دون اتصال بنجاح.',
      ku: 'تۆڕی جومگەیی ئوردن ڕووبەڕووی دواکەوتن بووەوە؛ گۆڕانکاری بۆ دۆخی ئۆفلاین بە سەرکەوتوویی لە خزمەتدایە.',
    },
    status: 'resolved',
  },
];

export const CARGO_PRESETS: CargoManifest[] = [
  {
    manifestId: 'MNF-IRAQ-2026-9081',
    importerName: 'Al-Rafidain Heavy Industries Ltd (Baghdad)',
    exporterName: 'Anadolu Steel & Castings Corp (Turkey)',
    originCountry: 'Turkey',
    destinationCity: 'Baghdad (Tajiat Industrial)',
    hsCodeDeclared: '7208.39.00',
    declaredValueUSD: 345000,
    weightTons: 125.4,
    description: 'Hot-rolled flat iron alloy coils, width exceeding 600mm, for manufacturing pressure tanks and boiler frames.',
    goodsCategory: 'Metals & Manufacturing',
    carrierInfo: 'Al-Ghazal Unified Logistics (Tractor-trailer fleet 8B-Basra)',
  },
  {
    manifestId: 'MNF-IRAQ-2026-4552',
    importerName: 'Mesopotamia Pharmaceuticals (Erbil)',
    exporterName: 'Sovereign Medical Labs GmbH (Germany)',
    originCountry: 'Germany',
    destinationCity: 'Erbil Science Zone',
    hsCodeDeclared: '3004.90.00',
    declaredValueUSD: 890000,
    weightTons: 4.2,
    description: 'Specialist thermal-regulated insulin cartridges and antibiotic suspensions for pediatric hospital distribution.',
    goodsCategory: 'Medical & Life Sciences',
    carrierInfo: 'Caspian Cold-Chain Air Freight (Flight IQ702 Cargo)',
  },
  {
    manifestId: 'MNF-IRAQ-2026-1189',
    importerName: 'Al-Anbar Agricultural Cooperative Group',
    exporterName: 'Deere Agricultural Systems (USA / Jordan)',
    originCountry: 'USA',
    destinationCity: 'Ramadi Farms Expansion',
    hsCodeDeclared: '8432.29.00',
    declaredValueUSD: 195000,
    weightTons: 32.8,
    description: 'Rotary harrows and seed drilling equipment, including mechanical hydraulic replacement kits.',
    goodsCategory: 'Agriculture & Food Machinery',
    carrierInfo: 'Desert Express Land Transit (Reg: 45A-Amman)',
  },
  {
    manifestId: 'MNF-IRAQ-2026-6638',
    importerName: 'Tigris Electronics & Consumables Inst.',
    exporterName: 'Shenzhen Tech Horizon Co. (China)',
    originCountry: 'China',
    destinationCity: 'Basra Free Zone Complex',
    hsCodeDeclared: '8528.72.40',
    declaredValueUSD: 124000,
    weightTons: 18.5,
    description: 'LED-lit color smart telemetry receivers, liquid crystal display configurations, with domestic voltage transformers.',
    goodsCategory: 'Electronics & Cryptographic Hardware',
    carrierInfo: 'Pacific Trade Carrier (Vessel BlueWave-Basra Port)',
  },
];

export const MOCK_LEDGER_BLOCKS: any[] = [
  { block: 10452, hash: '0000a6e8fa12ffad83b400971b31a540bf9e', action: 'Approved Entry at Umm Qasr - Tariff Code 7208', status: 'Secured' },
  { block: 10451, hash: '0000b218cdbcfe22ad71e840a1b3260cfbc1', action: 'Sovereign ID Verified Biomet - Importer: Al-Ghazal Unified', status: 'Secured' },
  { block: 10450, hash: '0000104ac7eb8614ba811ee82451ab09bcde', action: 'KRG-Baghdad Interop Sync Gate - Synced 1,240 customs declarations', status: 'Secured' },
  { block: 10449, hash: '0000ff9abceea121ad700ef2a2331ab0efbc', action: 'Custom Risk Analysis - Flagged HS-Mismatched chemical load at Ibrahim Khalil', status: 'Secured' },
  { block: 10448, hash: '00003cb067fead110bc87ab2ebcc3100feab', action: 'Central Bank Wire Authenticated - Trade Ref ID IDG-2026-6638', status: 'Secured' }
];
