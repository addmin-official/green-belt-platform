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
    purpose: 'بەڕێوەبردنی دەسەڵاتەکان، بەکارهێنەران، سیاسەتەکان و چاودێریی گشتیی پلاتفۆرم.',
    responsibilities: [
      'دروستکردن و بەڕێوەبردنی هەژمار و ڕۆڵەکان',
      'پەسەندکردنی سیاسەت و ڕێڕەوی کار',
      'بینینی هەموو بەش و تۆمارەکانی چاودێری',
      'قوفڵکردن و هەڵگرتنی ڕاپۆرتی کۆتایی',
    ],
    allowedModules: ['overview', 'restaurants', 'wasteOps', 'compost', 'trees', 'advisors'],
    canUseEditControls: true,
  },
  operator: {
    title: 'بەڕێوەبەری ئۆپەراسیۆن',
    purpose: 'بەڕێوەبردنی کاری ڕۆژانە و هەماهەنگیکردنی نێوان سەرچاوە، پڕۆسەی گواستنەوە و شوێنی پرۆسەکردن.',
    responsibilities: [
      'بەڕێوەبردنی ڕێستورانتە بەشدارەکان و خشتەی کۆکردنەوە',
      'هەماهەنگیکردنی تۆماری بار، وەرگرتن و وەجبەکان',
      'چاودێریکردنی کێشە و کردارە چاکسازەکان',
      'ئامادەکردنی ڕاپۆرتی ئۆپەراسیۆنی',
    ],
    allowedModules: ['overview', 'restaurants', 'wasteOps', 'compost', 'trees'],
    canUseEditControls: true,
  },
  collection_officer: {
    title: 'بەرپرسی کۆکردنەوە',
    purpose: 'تۆمارکردنی سەرچاوە، بار، کێش، وێنە، شوێن و پڕۆسەی گواستنەوە.',
    responsibilities: [
      'پشکنینی جیاکردنەوە لە سەرچاوە',
      'تۆمارکردنی کێش، وێنە، شوێن، کات و ژمارەی سەتڵ',
      'دروستکردن و تەواوکردنی تۆماری بار',
      'تۆمارکردنی تێکەڵبوونی ناپاکی و هۆکاری ڕەتکردنەوە',
    ],
    allowedModules: ['overview', 'restaurants', 'wasteOps'],
    canUseEditControls: true,
  },
  facility_operator: {
    title: 'بەرپرسی شوێنی پرۆسەکردن',
    purpose: 'وەرگرتنی بار، پشکنین، دروستکردنی وەجبە و چاودێریی پڕۆسەی پەیینسازی.',
    responsibilities: [
      'پەسەندکردن، جیاکردنەوە یان ڕەتکردنەوەی بار',
      'تۆمارکردنی وەرگرتنی بار و موازەنەی ماددەیی',
      'دروستکردنی وەجبە و تۆمارکردنی گەرما و شێداری',
      'تۆمارکردنی بۆن، شلەی دەرچوو و کردارە چاکسازەکان',
    ],
    allowedModules: ['overview', 'wasteOps', 'compost'],
    canUseEditControls: true,
  },
  qa_manager: {
    title: 'بەڕێوەبەری دڵنیایی جۆرایەتی',
    purpose: 'چاودێریی نموونەوەرگرتن، تاقیگە، پابەندی و پەسەندکردنی کۆتایی.',
    responsibilities: [
      'پەسەندکردنی پلانی نموونەوەرگرتن و زنجیرەی بەرپرسیاریی نموونە',
      'پشکنینی ئەنجامی تاقیگە و سنوورەکانی پەسەندکردن',
      'دروستکردن و قوفڵکردنی پەسەندکردنی جۆرایەتی',
      'بڕیاردان لەسەر دووبارەکارکردن یان ڕەتکردنەوە',
    ],
    allowedModules: ['overview', 'compost', 'trees'],
    canUseEditControls: false,
  },
  laboratory: {
    title: 'نوێنەری تاقیگە',
    purpose: 'وەرگرتنی نموونە و ناردنی ئەنجامی فەرمیی تاقیگە.',
    responsibilities: [
      'پشتڕاستکردنەوەی زانیاریی نموونە و زنجیرەی گواستنەوە',
      'تۆمارکردنی جۆری پشکنین و بەرواری دەرچوونی ئەنجام',
      'ناردنی ئەنجامی فەرمی بەبێ دەستکاریی تۆمارە ئۆپەراسیۆنییەکان',
      'ئاگادارکردنەوەی بەڕێوەبەری جۆرایەتی لە ئەنجامی دەرەوەی سنوور',
    ],
    allowedModules: ['overview', 'compost'],
    canUseEditControls: false,
  },
  viewer: {
    title: 'بینەر / ئەندامی لیژنە',
    purpose: 'بینینی تەنها-خوێندنەوەی بڕیار، بەڵگە، پێوەرەکان، نەخشە و ڕاپۆرتەکان.',
    responsibilities: [
      'بینینی دۆخی تاقیکردنەوە و مەرجەکانی دەستپێکردن یان وەستاندن',
      'پشکنینی بەڵگە، مەترسی و مێژووی بڕیارەکان',
      'هەڵگرتنی ڕاپۆرت بۆ هەڵسەنگاندن',
      'نەکردنی هیچ گۆڕانکارییەک لە داتا یان ڕێڕەوی کار',
    ],
    allowedModules: ['overview', 'trees', 'advisors'],
    canUseEditControls: false,
  },
};
