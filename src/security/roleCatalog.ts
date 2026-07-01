import type { PlatformRole } from './permissions';

export type DashboardModule =
  | 'overview'
  | 'restaurants'
  | 'wasteOps'
  | 'compost'
  | 'trees'
  | 'advisors';

export type RoleProfile = {
  title: string;
  purpose: string;
  responsibilities: readonly string[];
  allowedModules: readonly DashboardModule[];
  canUseEditControls: boolean;
};

export const ROLE_CATALOG: Record<PlatformRole, RoleProfile> = {
  admin: {
    title: 'بەڕێوەبەری گشتیی سیستەم',
    purpose: 'بەڕێوەبردنی دەسەڵات، بەکارهێنەر، سیاسەت، پەسەندکردن و چاودێریی گشتی.',
    responsibilities: [
      'دروستکردن و بەڕێوەبردنی هەژمار و ڕۆڵەکان',
      'پەسەندکردنی سیاسەت، ڕێڕەو و گۆڕانکارییە گرنگەکان',
      'بینینی هەموو ماژوول، بەڵگە و تۆماری چاودێری',
      'قوفڵکردن، ڕەتکردنەوە و هەڵگرتنی ڕاپۆرتی کۆتایی',
    ],
    allowedModules: ['overview', 'restaurants', 'wasteOps', 'compost', 'trees', 'advisors'],
    canUseEditControls: true,
  },
  operator: {
    title: 'بەڕێوەبەری ئۆپەراسیۆن',
    purpose: 'بەڕێوەبردنی ڕۆژانەی پایلۆت و هەماهەنگی نێوان سەرچاوە، گواستنەوە و شوێنی پرۆسەکردن.',
    responsibilities: [
      'بەڕێوەبردنی ڕێستورانت و خشتەی کۆکردنەوە',
      'هەماهەنگی مانیفێست، وەرگرتن و وەجبەکان',
      'چاودێری کێشە، ڕەتکردنەوە و کردارە چاکسازەکان',
      'ئامادەکردنی ڕاپۆرتی ئۆپەراسیۆنی بۆ لیژنە',
    ],
    allowedModules: ['overview', 'restaurants', 'wasteOps', 'compost', 'trees'],
    canUseEditControls: true,
  },
  collection_officer: {
    title: 'بەرپرسی کۆکردنەوە',
    purpose: 'تۆمارکردنی سەرچاوە، بار، کێش، وێنە، GPS و مانیفێستی گواستنەوە.',
    responsibilities: [
      'پشکنینی جیاکردنەوە لە سەرچاوە',
      'تۆمارکردنی کێش، وێنە، GPS، کات و Bin ID',
      'دروستکردن و تەواوکردنی مانیفێست',
      'تۆمارکردنی ناپاکی و هۆکاری ڕەتکردنەوە',
    ],
    allowedModules: ['overview', 'restaurants', 'wasteOps'],
    canUseEditControls: true,
  },
  facility_operator: {
    title: 'بەرپرسی شوێنی پرۆسەکردن',
    purpose: 'وەرگرتنی بار، پشکنین، دروستکردنی وەجبە و چاودێریی پڕۆسەی پەیینسازی.',
    responsibilities: [
      'پەسەندکردن، قرنطینە یان ڕەتکردنەوەی بار',
      'تۆمارکردنی facility receipt و mass balance',
      'دروستکردنی وەجبە و تۆمارکردنی گەرما و شێداری',
      'تۆمارکردنی بۆن، شلەی دەرچوو و کردارە چاکسازەکان',
    ],
    allowedModules: ['overview', 'wasteOps', 'compost'],
    canUseEditControls: true,
  },
  qa_manager: {
    title: 'بەڕێوەبەری دڵنیایی جۆرایەتی',
    purpose: 'چاودێری نموونە، تاقیگە، پابەندی، پەسەندکردن و قوفڵکردنی QA Release.',
    responsibilities: [
      'پەسەندکردنی پلانی نموونەوەرگرتن و chain of custody',
      'پشکنینی ئەنجامی تاقیگە و سنوورەکانی پەسەندکردن',
      'دروستکردن و قوفڵکردنی QA Release',
      'ڕەتکردنەوە، rework و تۆمارکردنی هۆکاری بڕیار',
    ],
    allowedModules: ['overview', 'compost', 'trees'],
    canUseEditControls: false,
  },
  laboratory: {
    title: 'نوێنەری تاقیگە',
    purpose: 'وەرگرتنی نموونە، تۆمارکردنی زنجیرەی بەرپرسیاری و ناردنی ئەنجامی فەرمیی تاقیگە.',
    responsibilities: [
      'پشتڕاستکردنەوەی زانیاریی نموونە و زنجیرەی گواستنەوە',
      'تۆمارکردنی panel، method، reportedAt و certificate reference',
      'ناردنی ئەنجام بەبێ دەستکاریی تۆماری ئۆپەراسیۆن',
      'ئاگادارکردنەوەی QA لە ئەنجامی دەرەوەی سنوور',
    ],
    allowedModules: ['overview', 'compost'],
    canUseEditControls: false,
  },
  viewer: {
    title: 'بینەر / ئەندامی لیژنە',
    purpose: 'بینینی تەنها-خوێندنەوەی بڕیار، بەڵگە، KPI، نەخشە و ڕاپۆرتەکان.',
    responsibilities: [
      'بینینی دۆخی پایلۆت و مەرجەکانی Go / No-Go',
      'پشکنینی بەڵگە، مەترسی، KPI و مێژووی بڕیار',
      'هەڵگرتنی ڕاپۆرت بۆ هەڵسەنگاندن',
      'نەکردنی هیچ گۆڕانکارییەک لە داتا یان workflow',
    ],
    allowedModules: ['overview', 'trees', 'advisors'],
    canUseEditControls: false,
  },
};
