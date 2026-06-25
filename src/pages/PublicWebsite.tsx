import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Database,
  Factory,
  Leaf,
  Menu,
  Recycle,
  ShieldCheck,
  Sparkles,
  Sprout,
  TreePine,
  Truck,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import TechHeroVisual from '../components/website/TechHeroVisual';
import OperatingModelVisual from '../components/website/OperatingModelVisual';
import ProblemImpactVisual from '../components/website/ProblemImpactVisual';

type Language = 'ku' | 'ar' | 'en';

type Copy = {
  brand: string;
  tagline: string;
  nav: string[];
  hero: { eyebrow: string; title: string; body: string; primary: string; secondary: string; notice: string };
  stats: { value: string; label: string; detail: string }[];
  problem: { kicker: string; title: string; body: string; cards: { title: string; body: string }[] };
  model: { kicker: string; title: string; body: string; steps: { title: string; body: string }[] };
  pilot: { kicker: string; title: string; body: string; phases: { label: string; value: string; body: string }[] };
  tech: { kicker: string; title: string; body: string; items: { title: string; body: string }[] };
  trust: { kicker: string; title: string; body: string; items: string[] };
  partners: { kicker: string; title: string; body: string; list: string[]; action: string };
  faq: { kicker: string; title: string; items: { q: string; a: string }[] };
  footer: { summary: string; note: string };
};

const copy: Record<Language, Copy> = {
  ku: {
    brand: 'کەمەربەندی سەوز',
    tagline: 'پلاتفۆرمی زیرەکی ئابووریی بازنەیی',
    nav: ['دەربارە', 'شێوازی کار', 'هەڵسەنگاندن', 'تەکنەلۆژیا', 'ڕووناکی'],
    hero: {
      eyebrow: 'لە پاشماوەوە بۆ سەرچاوە',
      title: 'پاشماوەی خۆراک دەگۆڕین بۆ کۆمپوست، داتا و کاریگەریی سەوز.',
      body: 'کەمەربەندی سەوز سیستەمێکی تاقیکردنەوەی کۆنترۆڵکراوە بۆ جیاکردنەوەی پاشماوەی خۆراک لە ڕێستورانتەکان، کۆکردنەوەی ڕێکخراو، کۆمپوستکردنی چاودێریکراو و تۆمارکردنی ئەنجامە ژینگەییەکان.',
      primary: 'بینینی پلانی هەڵسەنگاندن',
      secondary: 'تێگەیشتن لە مۆدێلەکە',
      notice: 'قۆناغی ئێستا: نموونەی سەرەتایی و ئامادەکاریی هەڵسەنگاندن — هێشتا داتای مەیدانیی پشتڕاستکراو نییە.',
    },
    stats: [
      { value: '٩٠ ڕۆژ', label: 'ماوەی هەڵسەنگاندن', detail: 'تاقیکردنەوەی بچووک و پێوانەکراو' },
      { value: '٥–١٠', label: 'ڕێستورانتی ئامانج', detail: 'بەشداربوونی قۆناغی یەکەم' },
      { value: '٣ دۆخ', label: 'داتای ڕوون', detail: 'نمایشی · ئامانج · پشتڕاستکراو' },
      { value: '١ ڕاپۆرت', label: 'ئەنجامی یەکگرتوو', detail: 'کۆکردنەوە، کۆمپوست و پێوانە' },
    ],
    problem: {
      kicker: 'کێشەکە',
      title: 'پاشماوەی خۆراک هەم خەرجییە، هەم مەترسیی ژینگەیی.',
      body: 'کاتێک پاشماوەی خۆراک بەبێ جیاکردنەوە و تۆمارکردن فڕێ دەدرێت، دەبێتە سەرچاوەیەکی مەترسیدار بۆ پیسبوونی خاک، ئاو و هەوا. ئەگەر ئەم ڕەوتە بەردەوام بێت، لە داهاتووی نزیکدا قەبارەی پاشماوەکان بە شێوەیەکی نائاسایی کەڵەکە دەبێت. کەمەربەندی سەوز لە یەکەم ڕۆژەوە جیاکردنەوە، پێوانەکردن، تۆمارکردن و بەرپرسیارێتی دەخاتە ناو هەموو قۆناغەکانی پرۆسەکە.',
      cards: [
        { title: 'جیاکردنەوەی لاواز', body: 'تێکەڵبوونی پاشماوەی ئۆرگانیک بە ماددەی ناپاک، کوالێتی کۆمپوست کەم دەکاتەوە.' },
        { title: 'داتای نەبوو', body: 'بەبێ بنچینەی پێوانە و تۆمار، ناتوانرێت خەرجی، کەمکردنەوە و ئەنجام بسەلمێنرێت.' },
        { title: 'زنجیرەی نادیار', body: 'کۆکردنەوە، گواستنەوە و پرۆسەکردن پێویستیان بە بەرپرسیاری ڕوون هەیە.' },
      ],
    },
    model: {
      kicker: 'مۆدێلی کار',
      title: 'چوار هەنگاوی ڕوون، لە سەرچاوەوە تا ئەنجام.',
      body: 'هەر هەنگاوێک تۆمار، خاڵی کۆنترۆڵ و بەرپرسیاری دیاریکراوی خۆی هەیە.',
      steps: [
        { title: 'جیاکردنەوە لە سەرچاوە', body: 'ڕێستورانت پاشماوەی گونجاو لە ناو سندوقی داخراو جیا دەکاتەوە.' },
        { title: 'کۆکردنەوە و گواستنەوە', body: 'خشتەی کۆکردنەوە، کێش و دۆخی هەر بارێک تۆمار دەکرێت.' },
        { title: 'کۆمپوستکردنی کۆنترۆڵکراو', body: 'گەرمی، شێداری، کات و دۆخی گەڕی بەرهەمهێنان بە شێوەیەکی سادە چاودێری دەکرێن.' },
        { title: 'ڕاپۆرت و بەکارهێنان', body: 'کۆمپوست و داتاکان بۆ هەڵسەنگاندنی کوالێتی و کاریگەری کۆدەکرێنەوە.' },
      ],
    },
    pilot: {
      kicker: 'هەڵسەنگاندنی ٩٠ ڕۆژە',
      title: 'سەرەتا بچووک، بەڵام بەڵگەدار.',
      body: 'ئامانجی قۆناغی یەکەم ئەوە نییە ژمارەی گەورە بسەلمێنێت؛ ئامانج ئەوەیە مۆدێلێکی سەلامەت، جێبەجێکراو و گونجاو بۆ فراوانکردن تاقی بکرێتەوە.',
      phases: [
        { label: 'قۆناغی ١', value: 'ڕۆژی ١–١٥', body: 'هەڵبژاردنی شوێن، بنچینەی پێوانە، ڕاهێنان و دابینکردنی سندوق.' },
        { label: 'قۆناغی ٢', value: 'ڕۆژی ١٦–٧٥', body: 'کۆکردنەوەی ڕێکخراو، چاودێری گەڕی بەرهەمهێنان و چارەسەری کێشەکان.' },
        { label: 'قۆناغی ٣', value: 'ڕۆژی ٧٦–٩٠', body: 'هەڵسەنگاندن، تاقیکردنەوەی کوالێتی و ڕاپۆرتی کۆتایی.' },
      ],
    },
    tech: {
      kicker: 'پلاتفۆرمی دیجیتاڵی',
      title: 'تەکنەلۆژیا بۆ تۆمارکردن و بڕیاردان — نە بۆ بانگەشە.',
      body: 'سیستەمەکە لە قۆناغی هەڵسەنگاندندا سادە و بەکارهێنەر-محورە؛ هەر تایبەتمەندییەک دەبێت کێشەیەکی ڕاستەقینە چارەسەر بکات.',
      items: [
        { title: 'تۆماری شوێن و بار', body: 'ناسنامەی ڕێستورانت، کات، کێش و دۆخی کۆکردنەوە.' },
        { title: 'چاودێری گەڕی بەرهەمهێنان', body: 'گەرمی، شێداری، ماوە و تێبینییە فنییەکان.' },
        { title: 'تەختەی چاودێری هەڵسەنگاندن', body: 'پێوانە سەرەکییەکان بە نیشانی نمایشی، ئامانج یان پشتڕاستکراو.' },
        { title: 'ڕاپۆرتی دابەزێنراو', body: 'پوختەی مانگانە بۆ هاوبەش و لایەنی چاودێر.' },
      ],
    },
    trust: {
      kicker: 'ڕووناکی و متمانە',
      title: 'هیچ ژمارەیەک بەبێ دۆخ و سەرچاوە پیشان نادرێت.',
      body: 'لە قۆناغی نموونەی سەرەتاییدا ژمارەکان دەبێت بە ڕوونی لە نێوان پێشبینی، ئامانج و ئەنجامی مەیدانی جیا بکرێنەوە.',
      items: [
        'هەموو داتای نمایشی بە «نمایشی» نیشان دەدرێت.',
        'هەموو ئامانجێک بە «ئامانج» نیشان دەدرێت.',
        'تەنها داتای پشکنراو بە «پشتڕاستکراو» بڵاودەکرێتەوە.',
        'هیچ بانگەشەیەکی دووئۆکسیدی کاربۆن یان ژمارەی درەخت بەبێ میتۆدۆلۆجی بڵاوناکرێتەوە.',
      ],
    },
    partners: {
      kicker: 'هاوبەشی هەڵسەنگاندن',
      title: 'پڕۆژەکە بە هاوکاری سەرکەوتوو دەبێت.',
      body: 'هەڵسەنگاندنەکە پێویستی بە هاوبەشی ڕێستورانت، پسپۆڕی ژینگە، لایەنی کشتوکاڵ و دامەزراوەی پشتگیر هەیە.',
      list: ['ڕێستورانت و چێشتخانە', 'پسپۆڕ و ڕاوێژکاری ژینگە', 'زانکۆ و تاقیگە', 'ڕێکخراو و دامەزراوەی پشتگیر'],
      action: 'دەستپێکردنی گفتوگۆی هاوبەشی',
    },
    faq: {
      kicker: 'پرسیاری باو',
      title: 'وەڵامی ڕوون بۆ خاڵە سەرەکییەکان.',
      items: [
        { q: 'ئایا پڕۆژەکە ئێستا کار دەکات؟', a: 'نەخێر. ئێستا لە قۆناغی قۆناغی نموونەی سەرەتایی و ئامادەکاریی هەڵسەنگاندندایە؛ جێبەجێکردنی مەیدانی هێشتا دەست پێ نەکردووە.' },
        { q: 'ئایا ژمارەکانی داشبۆرد ڕاستەقینەن؟', a: 'تەنها ئەو ژمارانەی بە «پشتڕاستکراو» نیشان دەدرێن داتای مەیدانی دەبن. لە قۆناغی ئێستا زۆربەی ژمارەکان نمایشی یان ئامانجن.' },
        { q: 'ئایا کۆمپوست لە هەر شوێنێک دروست دەکرێت؟', a: 'نەخێر. شوێن، پاکوخاوێنی، ڕێنمایی ژینگەیی و پرۆسەی کۆنترۆڵکراو پێویستن پێش دەستپێکردنی هەر کارێکی مەیدانی.' },
        { q: 'هەڵسەنگاندنەکە چی دەسەلمێنێت؟', a: 'دەسەلمێنێت ئایا مۆدێلی جیاکردنەوە، کۆکردنەوە، کۆمپوستکردن و ڕاپۆرتکردن لە ڕووی کردار و خەرجییەوە جێبەجێکراوە یان نا.' },
      ],
    },
    footer: {
      summary: 'کەمەربەندی سەوز — چارەسەرێکی تاقیکراوە، ڕوون و پێوانەکراو بۆ پاشماوەی خۆراک.',
      note: 'هەموو داتاکانی ئەم وێبسایتە لە قۆناغی ئێستادا نمایشی یان ئامانجی هەڵسەنگاندنن، مەگەر بە «پشتڕاستکراو» نیشان درابن.',
    },
  },
  ar: {
    brand: 'الحزام الأخضر', tagline: 'منصة تجريبية للاقتصاد الدائري',
    nav: ['عن المشروع', 'نموذج العمل', 'التجربة', 'التقنية', 'الشفافية'],
    hero: { eyebrow: 'من النفايات إلى مورد', title: 'نحوّل مخلفات الطعام إلى سماد وبيانات وأثر أخضر قابل للقياس.', body: 'الحزام الأخضر نموذج تجريبي منظم لفرز مخلفات الطعام من المطاعم وجمعها ومعالجتها ضمن عملية تسميد مراقبة وتوثيق النتائج البيئية بوضوح.', primary: 'استعراض خطة التجربة', secondary: 'فهم نموذج العمل', notice: 'المرحلة الحالية: نموذج أولي وتحضير للتجربة — لا توجد نتائج ميدانية موثقة حتى الآن.' },
    stats: [
      { value: '90 يوماً', label: 'مدة التجربة', detail: 'اختبار محدود وقابل للقياس' },
      { value: '5–10', label: 'مطاعم مستهدفة', detail: 'المرحلة الأولى' },
      { value: '3 حالات', label: 'بيانات واضحة', detail: 'نمایشی · ئامانج · پشتڕاستکراو' },
      { value: 'تقرير واحد', label: 'نتيجة موحدة', detail: 'جمع وتسميد وقياس' },
    ],
    problem: { kicker: 'المشكلة', title: 'مخلفات الطعام تكلفة ومخاطر بيئية في آن واحد.', body: 'عندما تُرمى المخلفات دون فرز أو توثيق تضيع قيمتها ويصعب قياس أثرها. يبدأ المشروع من القياس والمسؤولية منذ اليوم الأول.', cards: [
      { title: 'فرز غير كافٍ', body: 'اختلاط المواد العضوية بالملوثات يخفض جودة السماد.' },
      { title: 'غياب البيانات', body: 'لا يمكن إثبات التكلفة أو التحسن دون خط أساس وسجلات.' },
      { title: 'سلسلة غير واضحة', body: 'الجمع والنقل والمعالجة تحتاج مسؤوليات ونقاط تحكم واضحة.' },
    ] },
    model: { kicker: 'نموذج العمل', title: 'أربع خطوات واضحة من المصدر إلى النتيجة.', body: 'لكل خطوة سجل ونقطة تحكم ومسؤولية محددة.', steps: [
      { title: 'الفرز من المصدر', body: 'يفصل المطعم المخلفات المناسبة في حاويات مغلقة.' },
      { title: 'الجمع والنقل', body: 'يتم تسجيل وقت ووزن وحالة كل حمولة.' },
      { title: 'تسميد مراقب', body: 'تتابع الحرارة والرطوبة والمدة وحالة الدفعة.' },
      { title: 'التقرير والاستخدام', body: 'تجمع نتائج الجودة والأثر في تقرير واضح.' },
    ] },
    pilot: { kicker: 'تجربة 90 يوماً', title: 'بداية صغيرة، لكن موثقة.', body: 'الهدف ليس إعلان أرقام كبيرة، بل اختبار نموذج آمن وقابل للتنفيذ والتوسع.', phases: [
      { label: 'المرحلة 1', value: 'اليوم 1–15', body: 'اختيار المواقع، خط الأساس، التدريب والحاويات.' },
      { label: 'المرحلة 2', value: 'اليوم 16–75', body: 'جمع منتظم، مراقبة الدفعات وحل المشكلات.' },
      { label: 'المرحلة 3', value: 'اليوم 76–90', body: 'تقييم واختبار جودة وتقرير ختامي.' },
    ] },
    tech: { kicker: 'المنصة الرقمية', title: 'تقنية للتوثيق والقرار، لا للدعاية.', body: 'في مرحلة التجربة تبقى المنصة بسيطة وموجهة للمستخدم، وكل وظيفة تحل مشكلة عملية.', items: [
      { title: 'سجل المواقع والحمولات', body: 'هوية المطعم والوقت والوزن وحالة الجمع.' },
      { title: 'متابعة الدفعات', body: 'الحرارة والرطوبة والمدة والملاحظات الفنية.' },
      { title: 'لوحة التجربة', body: 'مؤشرات موسومة بوضوح: Demo أو Target أو Verified.' },
      { title: 'تقارير قابلة للتنزيل', body: 'ملخص شهري للشركاء والجهة المشرفة.' },
    ] },
    trust: { kicker: 'الشفافية والثقة', title: 'لا يُعرض أي رقم دون حالة ومصدر.', body: 'يجب الفصل بوضوح بين التقدير والهدف والنتيجة الميدانية.', items: [
      'كل بيانات العرض تحمل وسم Demo.', 'كل هدف يحمل وسم Target.', 'البيانات الميدانية المنشورة فقط تحمل Verified.', 'لا ادعاءات للكربون أو الأشجار دون منهجية موثقة.'
    ] },
    partners: { kicker: 'شراكة التجربة', title: 'نجاح المشروع يعتمد على التعاون.', body: 'تحتاج التجربة إلى مطاعم وخبراء بيئة وزراعة ومؤسسات داعمة.', list: ['المطاعم والمطابخ', 'خبراء البيئة', 'الجامعات والمختبرات', 'المنظمات والجهات الداعمة'], action: 'بدء حوار الشراكة' },
    faq: { kicker: 'أسئلة شائعة', title: 'إجابات واضحة عن النقاط الأساسية.', items: [
      { q: 'هل المشروع يعمل ميدانياً الآن؟', a: 'لا. المشروع في مرحلة النموذج الأولي والتحضير للتجربة، ولم يبدأ التنفيذ الميداني بعد.' },
      { q: 'هل أرقام اللوحة حقيقية؟', a: 'فقط الأرقام الموسومة Verified تمثل بيانات ميدانية. أما في المرحلة الحالية فالأرقام Demo أو Target.' },
      { q: 'هل يمكن إنتاج السماد في أي مكان؟', a: 'لا. يلزم موقع مناسب وإجراءات نظافة وإرشاد بيئي وعملية مراقبة قبل التنفيذ.' },
      { q: 'ماذا تثبت التجربة؟', a: 'تختبر قابلية تنفيذ الفرز والجمع والتسميد والتقرير من ناحية التشغيل والتكلفة.' },
    ] },
    footer: { summary: 'الحزام الأخضر — حل تجريبي واضح وقابل للقياس لمخلفات الطعام.', note: 'كل بيانات الموقع الحالية تجريبية أو أهداف، ما لم تحمل وسم Verified.' },
  },
  en: {
    brand: 'Green Belt', tagline: 'Circular economy pilot platform',
    nav: ['About', 'Operating model', 'Pilot', 'Technology', 'Transparency'],
    hero: { eyebrow: 'From waste to resource', title: 'Turning food waste into compost, data and measurable green impact.', body: 'Green Belt is a controlled pilot system for source-separating restaurant food waste, organizing collection, monitoring composting and reporting environmental outcomes with clarity.', primary: 'View the pilot plan', secondary: 'Understand the model', notice: 'Current stage: prototype and pilot preparation — no verified field results yet.' },
    stats: [
      { value: '90 days', label: 'Pilot duration', detail: 'Small and measurable test' },
      { value: '5–10', label: 'Target restaurants', detail: 'First-stage participation' },
      { value: '3 states', label: 'Clear data status', detail: 'نمایشی · ئامانج · پشتڕاستکراو' },
      { value: '1 report', label: 'Unified outcome', detail: 'Collection, compost and measures' },
    ],
    problem: { kicker: 'The problem', title: 'Food waste is both a cost and an environmental risk.', body: 'When food waste is discarded without separation or records, its real cost and value disappear. Green Belt introduces measurement and accountability from day one.', cards: [
      { title: 'Poor source separation', body: 'Contamination lowers the quality and usability of compost.' },
      { title: 'Missing baseline data', body: 'Without records, cost, reduction and impact cannot be demonstrated.' },
      { title: 'Unclear chain of custody', body: 'Collection, transport and processing need clear responsibilities and controls.' },
    ] },
    model: { kicker: 'Operating model', title: 'Four clear steps from source to outcome.', body: 'Every step has its own record, control point and assigned responsibility.', steps: [
      { title: 'Separate at source', body: 'Restaurants place suitable organic waste in sealed containers.' },
      { title: 'Collect and transport', body: 'Time, weight and condition are recorded for each load.' },
      { title: 'Controlled composting', body: 'Temperature, moisture, duration and batch status are monitored.' },
      { title: 'Report and use', body: 'Quality and outcome data are compiled into a transparent report.' },
    ] },
    pilot: { kicker: '90-day pilot', title: 'Start small, prove it properly.', body: 'The first phase is not designed to claim large numbers. It is designed to test a safe, workable and scalable model.', phases: [
      { label: 'Phase 1', value: 'Days 1–15', body: 'Site selection, baseline, training and container setup.' },
      { label: 'Phase 2', value: 'Days 16–75', body: 'Scheduled collection, batch monitoring and issue resolution.' },
      { label: 'Phase 3', value: 'Days 76–90', body: 'Evaluation, quality checks and final reporting.' },
    ] },
    tech: { kicker: 'Digital platform', title: 'Technology for records and decisions — not hype.', body: 'The pilot platform stays simple and user-centred. Every feature must solve a real operational problem.', items: [
      { title: 'Site and load records', body: 'Restaurant identity, timestamp, weight and collection condition.' },
      { title: 'Batch monitoring', body: 'Temperature, moisture, duration and technical notes.' },
      { title: 'Pilot dashboard', body: 'Core metrics labelled Demo, Target or Verified.' },
      { title: 'Downloadable reporting', body: 'Monthly summaries for partners and supervisors.' },
    ] },
    trust: { kicker: 'Transparency and trust', title: 'No number is shown without status and source.', body: 'Prototype figures must clearly distinguish estimates, targets and verified field results.', items: [
      'All illustrative data is labelled Demo.', 'All planned outcomes are labelled Target.', 'Only checked field data is labelled Verified.', 'No carbon or tree claims are published without a documented method.'
    ] },
    partners: { kicker: 'Pilot partnership', title: 'The pilot succeeds through collaboration.', body: 'Green Belt needs participating restaurants, environmental expertise, agricultural input and institutional support.', list: ['Restaurants and kitchens', 'Environmental specialists', 'Universities and laboratories', 'NGOs and supporting institutions'], action: 'Start a partnership conversation' },
    faq: { kicker: 'Common questions', title: 'Clear answers to the essential points.', items: [
      { q: 'Is the project operating in the field now?', a: 'No. It is currently a prototype in pilot preparation, and field implementation has not started.' },
      { q: 'Are dashboard figures real?', a: 'Only figures marked Verified represent field data. Current figures are Demo or Target.' },
      { q: 'Can composting happen anywhere?', a: 'No. A suitable site, hygiene controls, environmental guidance and a monitored process are required.' },
      { q: 'What will the pilot prove?', a: 'It tests whether separation, collection, composting and reporting are operationally and financially workable.' },
    ] },
    footer: { summary: 'Green Belt — a clear, measurable pilot approach to food waste.', note: 'All current website data is illustrative or target-based unless explicitly labelled Verified.' },
  },
};

const sectionIds = ['about', 'model', 'pilot', 'technology', 'transparency'];
const stepIcons = [Recycle, Truck, Factory, BarChart3];
const techIcons = [Building2, Database, ClipboardCheck, ShieldCheck];

function SectionHeading({ kicker, title, body }: { kicker: string; title: string; body?: string }) {
  return <div className="section-heading"><span>{kicker}</span><h2>{title}</h2>{body ? <p>{body}</p> : null}</div>;
}

export default function App() {
  const [language, setLanguage] = useState<Language>('ku');
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const t = copy[language];
  const rtl = language !== 'en';
  const year = useMemo(() => new Date().getFullYear(), []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <div className="site" dir={rtl ? 'rtl' : 'ltr'} lang={language}>
      <header className="site-header">
        <div className="container nav-bar">
          <button className="brand" onClick={() => go('top')} type="button">
            <span className="brand-mark"><Leaf size={22} /></span>
            <span><strong>{t.brand}</strong><small>{t.tagline}</small></span>
          </button>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {t.nav.map((label, index) => <button type="button" onClick={() => go(sectionIds[index])} key={label}>{label}</button>)}
          </nav>

          <div className="nav-actions">
            <div className="language-switcher" aria-label="Language selector">
              {(['ku', 'ar', 'en'] as Language[]).map((item) => <button key={item} className={language === item ? 'active' : ''} onClick={() => setLanguage(item)} type="button">{item.toUpperCase()}</button>)}
            </div>
            <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} type="button" aria-label="Menu">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
        <AnimatePresence>{menuOpen ? <motion.nav className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}><div className="container">{t.nav.map((label, index) => <button type="button" onClick={() => go(sectionIds[index])} key={label}>{label}</button>)}</div></motion.nav> : null}</AnimatePresence>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-glow one" /><div className="hero-glow two" />
          <div className="container hero-grid">
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
              <span className="eyebrow"><Sparkles size={17} />{t.hero.eyebrow}</span>
              <h1>{t.hero.title}</h1>
              <p>{t.hero.body}</p>
              <div className="hero-actions">
                <button className="button primary" onClick={() => go('pilot')} type="button">{t.hero.primary}<ArrowLeft size={18} /></button>
                <button className="button secondary" onClick={() => go('model')} type="button">{t.hero.secondary}</button>
              </div>
              <div className="notice"><span className="pulse" />{t.hero.notice}</div>
            </motion.div>

            <TechHeroVisual language={language} />
          </div>

          <div className="container stats-grid">{t.stats.map((item, index) => <motion.article key={item.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}><strong>{item.value}</strong><span>{item.label}</span><small>{item.detail}</small></motion.article>)}</div>
        </section>

        <section
          id="about"
          className="section surface problem-section"
        >
          <div className="container problem-section-inner">
            <SectionHeading
              kicker={t.problem.kicker}
              title={t.problem.title}
              body={t.problem.body}
            />

            <ProblemImpactVisual cards={t.problem.cards} />
          </div>
        </section>

        <section id="model" className="section model-section">
          <div className="container">
            <SectionHeading
              kicker={t.model.kicker}
              title={t.model.title}
              body={t.model.body}
            />

            <OperatingModelVisual
              language={language}
              steps={t.model.steps}
            />
          </div>
        </section>

        <section id="pilot" className="section pilot"><div className="container pilot-grid"><div><SectionHeading kicker={t.pilot.kicker} title={t.pilot.title} body={t.pilot.body} /><div className="pilot-chip"><Sprout size={19} /><span>{language === 'ku' ? 'هەڵسەنگاندنی کۆنترۆڵکراو · هەولێر · بەڵگە لە پێشەوە' : language === 'ar' ? 'تقييم منظم · أربيل · الدليل أولاً' : 'Controlled assessment · Erbil focus · Evidence first'}</span></div></div><div className="timeline">{t.pilot.phases.map((item, index) => <article key={item.value}><div className="timeline-number">{index + 1}</div><div><small>{item.label}</small><h3>{item.value}</h3><p>{item.body}</p></div></article>)}</div></div></section>

        <section id="technology" className="section surface"><div className="container"><SectionHeading kicker={t.tech.kicker} title={t.tech.title} body={t.tech.body} /><div className="grid four">{t.tech.items.map((item, index) => { const Icon = techIcons[index]; return <article className="card tech" key={item.title}><span className="icon"><Icon size={22} /></span><h3>{item.title}</h3><p>{item.body}</p></article>; })}</div></div></section>

        <section id="transparency" className="section trust"><div className="container trust-grid"><div><SectionHeading kicker={t.trust.kicker} title={t.trust.title} body={t.trust.body} /><div className="legend">
      <span className="demo">
        {language === 'ku' ? 'نمایشی' : language === 'ar' ? 'تجريبي' : 'Demo'}
      </span>
      <span className="target">
        {language === 'ku' ? 'ئامانج' : language === 'ar' ? 'هدف' : 'Target'}
      </span>
      <span className="verified">
        {language === 'ku' ? 'پشتڕاستکراو' : language === 'ar' ? 'موثق' : 'Verified'}
      </span>
    </div></div><div className="check-list">{t.trust.items.map((item) => <div key={item}><CheckCircle2 size={20} /><span>{item}</span></div>)}</div></div></section>

        <section className="section"><div className="container partner-card"><div><span className="section-kicker">{t.partners.kicker}</span><h2>{t.partners.title}</h2><p>{t.partners.body}</p></div><div className="partner-list">{t.partners.list.map((item) => <span key={item}><CheckCircle2 size={17} />{item}</span>)}</div><button className="button light" onClick={() => go('faq')} type="button">{t.partners.action}<ArrowLeft size={18} /></button></div></section>

        <section id="faq" className="section surface"><div className="container faq-grid"><SectionHeading kicker={t.faq.kicker} title={t.faq.title} /><div className="faq-list">{t.faq.items.map((item, index) => <article className={faqOpen === index ? 'open' : ''} key={item.q}><button type="button" onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}><span>{item.q}</span><ChevronDown size={20} /></button><AnimatePresence initial={false}>{faqOpen === index ? <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{item.a}</p></motion.div> : null}</AnimatePresence></article>)}</div></div></section>
      </main>

      <footer className="footer"><div className="container footer-grid"><div className="brand footer-brand"><span className="brand-mark"><Leaf size={22} /></span><span><strong>{t.brand}</strong><small>{t.footer.summary}</small></span></div><div className="footer-note"><ShieldCheck size={18} /><span>{t.footer.note}</span></div><span className="copyright">
      © {year}{' '}
      {language === 'ku'
        ? 'کەمەربەندی سەوز'
        : language === 'ar'
          ? 'الحزام الأخضر'
          : 'Green Belt'}
    </span></div></footer>
    </div>
  );
}
