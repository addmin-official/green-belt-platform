import React, { useState } from 'react';
import { Layers, BookOpen, Shield, Activity, Database, Cpu, Server } from 'lucide-react';
import { BLUEPRINT_METADATA } from '../../constants/blueprintMetadata';
import { PageHeader, Badge } from '../../ui';
import { useGovernment } from '../../providers/GovernmentProvider';

export interface SovereignAtlasPanelProps {
  lang: 'en' | 'ar' | 'ku';
}

export const SovereignAtlasPanel: React.FC<SovereignAtlasPanelProps> = ({ lang }) => {
  const [activeBlueprintId, setActiveBlueprintId] = useState<string>('system-context');
  const { activeContext, userRole } = useGovernment();

  const isAdminRole = userRole && (
    userRole.toLowerCase().includes('prime minister') || 
    userRole.toLowerCase().includes('cabinet') || 
    userRole.toLowerCase().includes('director') || 
    userRole.toLowerCase().includes('council') || 
    userRole.toLowerCase().includes('liaison') ||
    userRole.toLowerCase().includes('authority') ||
    userRole.toLowerCase().includes('admin')
  );

  return (
    <div className="bg-[#111e2e]/90 p-5 lg:p-6 rounded-xl border border-slate-800/80 shadow-lg animate-fade-in flex flex-col gap-6 w-full max-w-full overflow-hidden">
      
      <PageHeader
        icon={<Layers />}
        title={lang === 'en' ? 'Sovereign Digital Infrastructure - Master Architect Blueprint Suite' : lang === 'ar' ? 'البنية التحتية القيادية الرقمية - مخططات المكتَب الهندسي الاستراتيجي العيادي' : 'ژێرخانی دیجیتاڵیی هەمەلایەن - نەخشەسازی سەرەکی ئەندازیاری نیشتمانیی'}
        description={lang === 'en' ? 'Explore the formal enterprise-grade system diagrams prepared by the Chief enterprise and systems architects for the Republic of Iraq Trade & Customs Ecosystem.' : lang === 'ar' ? 'استطلع مخططات النمذجة التقنية لجمهورية العراق المعدة من قبل المهندسين والمستشارين الفنيين لبوابة المنافذ الموحدة والمكوس.' : 'سەیری نەخشەسازی فەرمیی نیشتمانیی بکە کە لە لایەن گەورە ئەندازیارانی عێراق ئامادەکراوە بۆ هەمەجۆریی سیستەمی دەروازەی سنووری نیشتمانیی.'}
        status={
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="gold">
              {isAdminRole 
                ? (lang === 'en' ? "Architecture / Infrastructure Atlas" : lang === 'ar' ? "أطلس معمارية البنية التحتية" : "ئەتڵەسی تەلارسازی")
                : (lang === 'en' ? "Operational Overview / Read-only Map" : lang === 'ar' ? "الخريطة التشغيلية العامة [قراءة فقط]" : "نەخشەی گشتی ڕێڕەوی چالاکییەکان [تەنها خوێندنەوە]")
              }
            </Badge>
            <Badge variant="teal">{activeContext}</Badge>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full max-w-full overflow-hidden">
        
        {/* Left sidebar directory selector */}
        <div className="lg:col-span-1 flex flex-col gap-1 w-full">
          <h3 className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-2 px-2 font-bold">
            {lang === 'en' ? 'Cabinet Blueprints (A-Z)' : lang === 'ar' ? 'مخططات مجلس الوزراء (أ-ي)' : 'نەخشەکانی کابینەی حکومەت'}
          </h3>
          {BLUEPRINT_METADATA.map((bp) => (
            <button
              key={bp.id}
              onClick={() => setActiveBlueprintId(bp.id)}
              className={`w-full text-start px-3 py-2.5 rounded-lg text-xs font-[650] transition-all cursor-pointer ${
                activeBlueprintId === bp.id 
                  ? 'bg-[#1a2c42] text-white border-l-4 border-[#cca553] shadow' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#0c1521]'
              }`}
            >
              {bp.title[lang]}
            </button>
          ))}
        </div>

        {/* Right column view area for Selected Blueprint */}
        <div className="lg:col-span-3 bg-slate-950/85 rounded-xl border border-slate-800/80 p-5 md:p-6 flex flex-col gap-6 w-full max-w-full overflow-hidden">
          
          {/* Meta details */}
          <div>
            <h3 className="text-base font-display font-semibold text-[#cca553] flex items-center gap-2">
              <BookOpen className="w-4.5 h-4.5" />
              {BLUEPRINT_METADATA.find(b => b.id === activeBlueprintId)?.title[lang]}
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed mt-2 p-3 bg-slate-900/60 rounded border-l-2 border-[#cca553]/60 italic font-mono">
              "{BLUEPRINT_METADATA.find(b => b.id === activeBlueprintId)?.desc[lang]}"
            </p>
          </div>

          {/* SVG Visualizations Render - Wrapped under safe overflow for mobile swiping */}
          <div className="bg-[#0c1421] rounded-xl p-2 md:p-6 border border-slate-800 shadow-inner flex items-center justify-center min-h-[300px] w-full max-w-full overflow-x-auto select-none">
            
            {activeBlueprintId === 'system-context' && (
              <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" className="w-full min-w-[650px] md:min-w-0 max-w-full h-auto font-mono text-[10px] text-slate-300">
                <rect width="800" height="400" fill="none" stroke="rgba(207, 168, 94, 0.04)" strokeWidth="1" rx="8"/>

                {/* CORE IDG GATEWAY SYSTEM (Point 3) */}
                <g transform="translate(300, 150)">
                  <rect x="0" y="0" width="200" height="100" rx="6" fill="#111e2e" stroke="#cca553" strokeWidth="2" />
                  <text x="100" y="32" textAnchor="middle" fill="#cca553" fontWeight="bold" fontSize="11">{lang === 'en' ? 'IDG DIGITAL GATEWAY' : lang === 'ar' ? 'البوابة الرقمية IDG' : 'دەروازەی دیجیتاڵیی نیشتمانی'}</text>
                  <text x="100" y="52" textAnchor="middle" fill="#94a3b8" fontSize="8.5">{lang === 'en' ? 'Iraq Core Sovereign Core' : lang === 'ar' ? 'النواة السيادية الوطنية' : 'ناوەندی سەروەریی نیشتمانی'}</text>
                  <text x="100" y="72" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">{lang === 'en' ? '● ACTIVE & SECURED' : lang === 'ar' ? '● نشط ومؤمن' : '● چالاک و پارێزراو'}</text>
                  
                  {/* Point 3 Marker Badge */}
                  <circle cx="15" cy="15" r="9" fill="#cca553" stroke="#111e2e" strokeWidth="1.5" />
                  <text x="15" y="18" textAnchor="middle" fill="#111e2e" fontWeight="extrabold" fontSize="8.5">3</text>
                </g>

                {/* EXTERNAL Actor 1: Importer Systems (Point 1) */}
                <g transform="translate(40, 60)">
                  <rect x="0" y="0" width="160" height="50" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
                  <text x="80" y="22" textAnchor="middle" fill="#f8fafc" fontWeight="medium" fontSize="9.5">{lang === 'en' ? 'Importers & Carrier Fleets' : lang === 'ar' ? 'المستوردون وأساطيل النقل' : 'هاوردەکاران و هێڵی گواستنەوە'}</text>
                  <text x="80" y="38" textAnchor="middle" fill="#64748b" fontSize="8.5">{lang === 'en' ? 'Digital Manifest submission' : lang === 'ar' ? 'تقديم المانيفست الرقمي' : 'ناردنی تێپەڕنامەی دیجیتاڵی'}</text>
                  
                  {/* Point 1 Marker Badge */}
                  <circle cx="12" cy="12" r="8.5" fill="#cca553" stroke="#111e2e" strokeWidth="1.5" />
                  <text x="12" y="15" textAnchor="middle" fill="#111e2e" fontWeight="extrabold" fontSize="8">1</text>
                </g>

                {/* EXTERNAL Actor 2: CBI (Point 2) */}
                <g transform="translate(600, 60)">
                  <rect x="0" y="0" width="160" height="50" rx="4" fill="#1e293b" stroke="#eab308" strokeWidth="1"/>
                  <text x="80" y="22" textAnchor="middle" fill="#f8fafc" fontWeight="medium" fontSize="9.5">{lang === 'en' ? 'Central Bank of Iraq (CBI)' : lang === 'ar' ? 'البنك المركزي العراقي' : 'بانکی ناوەندیی عێراق'}</text>
                  <text x="80" y="38" textAnchor="middle" fill="#eab308" fontSize="8.5">{lang === 'en' ? 'Wire compliance verification' : lang === 'ar' ? 'التحقق من الحوالات' : 'پشکنینی هاوتاییی دارایی'}</text>
                  
                  {/* Point 2 Marker Badge */}
                  <circle cx="12" cy="12" r="8.5" fill="#cca553" stroke="#111e2e" strokeWidth="1.5" />
                  <text x="12" y="15" textAnchor="middle" fill="#111e2e" fontWeight="extrabold" fontSize="8">2</text>
                </g>

                {/* EXTERNAL Actor 3: KRG & Baghdad Min of Finance */}
                <g transform="translate(600, 290)">
                  <rect x="0" y="0" width="160" height="50" rx="4" fill="#1e293b" stroke="#cca553" strokeWidth="1"/>
                  <text x="80" y="22" textAnchor="middle" fill="#f8fafc" fontWeight="medium" fontSize="9.5">{lang === 'en' ? 'Federal Ministry of Finance' : lang === 'ar' ? 'وزارة المالية الاتحادية' : 'وەزارەتی داراییی فیدراڵ'}</text>
                  <text x="80" y="38" textAnchor="middle" fill="#cca553" fontSize="8.5">{lang === 'en' ? 'Erbil-Baghdad unified sync' : lang === 'ar' ? 'المزامنة الموحدة للتعرفة' : 'هاوسەنگیی هەولێر-بەغدا'}</text>
                </g>

                {/* EXTERNAL Actor 4: Physical Ports Checkpoint Nodes (Point 4) */}
                <g transform="translate(40, 290)">
                  <rect x="0" y="0" width="160" height="50" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1"/>
                  <text x="80" y="22" textAnchor="middle" fill="#f8fafc" fontWeight="medium" fontSize="9.5">{lang === 'en' ? 'Custom Checkpoints' : lang === 'ar' ? 'النقاط الجمركية' : 'خاڵەکانی پشکنینی گومرگ'}</text>
                  <text x="80" y="38" textAnchor="middle" fill="#10b981" fontSize="8.5">{lang === 'en' ? 'Thermal Scanners & Gateways' : lang === 'ar' ? 'الماسحات الحرارية والمنافذ' : 'سکانی گەرمیی دەروازەکان'}</text>
                  
                  {/* Point 4 Marker Badge */}
                  <circle cx="12" cy="12" r="8.5" fill="#cca553" stroke="#111e2e" strokeWidth="1.5" />
                  <text x="12" y="15" textAnchor="middle" fill="#111e2e" fontWeight="extrabold" fontSize="8">4</text>
                </g>

                {/* CONNECTIONS & LINES */}
                <path d="M 200 85 L 250 85 L 250 170 L 300 170" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4"/>
                <circle cx="300" cy="170" r="3" fill="#64748b"/>
                <text x="250" y="115" textAnchor="middle" fill="#94a3b8" fontSize="8">{lang === 'en' ? 'Secure REST API' : lang === 'ar' ? 'واجهة التطبيق الآمنة' : 'کۆدی REST API پارێزراو'}</text>

                {/* IDG Core -> CBI */}
                <path d="M 500 180 L 550 180 L 550 85 L 600 85" fill="none" stroke="#eab308" strokeWidth="1.5"/>
                <circle cx="600" cy="85" r="3" fill="#eab308"/>
                <text x="550" y="145" textAnchor="middle" fill="#eab308" fontSize="8">{lang === 'en' ? 'AML Check' : lang === 'ar' ? 'مكافحة غسيل الأموال' : 'پشکنینی پارەسپیکردنەوە'}</text>

                {/* IDG Core -> Federal Ministry */}
                <path d="M 500 220 L 550 220 L 550 315 L 600 315" fill="none" stroke="#cca553" strokeWidth="1.5"/>
                <circle cx="600" cy="315" r="3" fill="#cca553"/>
                <text x="550" y="270" textAnchor="middle" fill="#cca553" fontSize="8">{lang === 'en' ? 'Tariff sync' : lang === 'ar' ? 'مزامنة التعرفة' : 'هاوکاتکردنی باج'}</text>

                {/* Checkpoint Nodes <-> IDG Core */}
                <path d="M 200 315 L 250 315 L 250 220 L 300 220" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4"/>
                <circle cx="300" cy="220" r="3" fill="#10b981"/>
                <text x="250" y="270" textAnchor="middle" fill="#10b981" fontSize="8">{lang === 'en' ? 'gRPC stream' : lang === 'ar' ? 'بث gRPC فوري' : 'ڕەوتی داتای gRPC'}</text>
              </svg>
            )}

            {activeBlueprintId === 'business-capabilities' && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[650px] font-sans text-start">
                <div className="bg-[#112235] p-4 rounded-lg border border-[#cca553]/30 text-start flex flex-col justify-start">
                  <h4 className="font-semibold text-slate-100 flex items-center gap-1.5 text-xs mb-2 text-[#cca553] text-start">
                    <Shield className="w-4 h-4 text-[#cca553]" /> {lang === 'en' ? 'Customs Clearance Layer' : lang === 'ar' ? 'طبقة التخليص الجمركي' : 'بەشی مۆڵەتپێدان و گومرگ'}
                  </h4>
                  <ul className="text-xs text-slate-300 flex flex-col gap-1.5 font-mono text-start">
                    <li>{lang === 'en' ? '• Unified Tariff Computation (Decree 1984)' : lang === 'ar' ? '• حوسبة التعرفة الموحدة (مرسوم ١٩٨٤)' : '• حیسابکردنی باجی یەکگرتوو (بڕیاری ١٩٨٤)'}</li>
                    <li>{lang === 'en' ? '• Digitized Manifest Registry Management' : lang === 'ar' ? '• إدارة سجل المانيفست الرقمي' : '• بەڕێوەبردنی دیجیتاڵیی تۆماری مانیفێست'}</li>
                    <li>{lang === 'en' ? '• 8-digit HS Code Auto-Matching engine' : lang === 'ar' ? '• محرك مطابقة رمز تنسيق النظام الجمركي (HS)' : '• بزوێنەری خۆکاری هاوتاییی کۆدی HS ی ٨ خانەیی'}</li>
                    <li>{lang === 'en' ? '• Instant Dual-Use licensing checks' : lang === 'ar' ? '• الفحص الفوري لتراخيص الاستخدام المزدوج' : '• پشکنینی ڕاستەوخۆی مۆڵەتە دوولایەنە نیشتمانییەکان'}</li>
                  </ul>
                </div>
                <div className="bg-[#112235] p-4 rounded-lg border border-[#cca553]/30 text-start flex flex-col justify-start">
                  <h4 className="font-semibold text-slate-100 flex items-center gap-1.5 text-xs mb-2 text-[#cca553] text-start">
                    <Activity className="w-4 h-4 text-[#cca553]" /> {lang === 'en' ? 'Legal Harmonization Portal' : lang === 'ar' ? 'بوابة المواءمة القانونية' : 'پۆرتاڵی یاسایی و هاوئاهەنگی'}
                  </h4>
                  <ul className="text-xs text-slate-300 flex flex-col gap-1.5 font-mono text-start">
                    <li>{lang === 'en' ? '• Erbil-Baghdad dynamic treaty compliance' : lang === 'ar' ? '• الامتثال الديناميكي لمعاهدة بغداد-أربيل' : '• هاوتاییی کارای ڕێککەوتنامەی نێوان هەولێر و بەغدا'}</li>
                    <li>{lang === 'en' ? '• Central Sovereign Revenue Integration' : lang === 'ar' ? '• تكامل الإيرادات السيادية المركزية' : '• یەکگرتنی گشتیی داهاتە فیدراڵییە سەروەرییەکان'}</li>
                    <li>{lang === 'en' ? '• Customs Clearance mutual recognition' : lang === 'ar' ? '• الاعتراف المتبادل بالتخليص الجمركي' : '• قبوڵکردنی دوولایەنەی ڕێکارەکانی بەڕێکردنی گومرگی'}</li>
                    <li>{lang === 'en' ? '• Inter-provincial bypass auditing' : lang === 'ar' ? '• التدقيق لمكافحة التجاوزات بين المحافظات' : '• پێداچوونەوە و ڕێگری لە خۆدزینەوە لە باجی سەر سنورەکان'}</li>
                  </ul>
                </div>
                <div className="bg-[#112235] p-4 rounded-lg border border-[#cca553]/30 text-start flex flex-col justify-start">
                  <h4 className="font-semibold text-slate-100 flex items-center gap-1.5 text-xs mb-2 text-[#cca553] text-start">
                    <Database className="w-4 h-4 text-[#cca553]" /> {lang === 'en' ? 'Anti-Fraud & Compliance (AML)' : lang === 'ar' ? 'مكافحة الاحتيال والامتثال (AML)' : 'پشکنینی ساختەکاری و پابەندبوون (AML)'}
                  </h4>
                  <ul className="text-xs text-slate-300 flex flex-col gap-1.5 font-mono text-start">
                    <li>{lang === 'en' ? '• Central Bank of Iraq trade wire validation' : lang === 'ar' ? '• تدقيق التحويلات المالية للبنك المركزي العراقي' : '• هاوتاییی پشکنینی داراییی بانکی ناوەندیی عێراق'}</li>
                    <li>{lang === 'en' ? '• Unit valuation comparison (fraud check)' : lang === 'ar' ? '• مقارنة تقييم الوحدات للرصد الاحتيالي' : '• بەراوردکاری نرخەکان بۆ دۆزینەوەی ساختەکاری'}</li>
                  </ul>
                </div>
              </div>
            )}

            {activeBlueprintId === 'ddd-boundaries' && (
              <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" className="w-full min-w-[650px] md:min-w-0 max-w-full h-auto font-mono text-[10px] text-slate-300">
                <rect width="800" height="400" fill="none" stroke="rgba(207, 168, 94, 0.04)" strokeWidth="1" rx="8"/>
                
                {/* Bounded Context 1: Core Manifest Evaluation */}
                <g transform="translate(40, 60)">
                  <rect width="330" height="135" rx="6" fill="#131e2d" stroke="#1d4ed8" strokeWidth="2.5" strokeDasharray="3 3"/>
                  <rect width="210" height="25" rx="4" fill="#1d4ed8" x="10" y="-12"/>
                  <text x="115" y="5" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="9">{lang === 'en' ? 'Core Manifest Context' : lang === 'ar' ? 'سياق المانيفست الأساسي' : 'مەودای مانیفێستی سەرەکی'}</text>
                  <text x="15" y="40" fill="#94a3b8" fontSize="8.5">{lang === 'en' ? '• Manifest aggregation entity' : lang === 'ar' ? '• كينونة تجميع بيانات الشحن' : '• قەوارەی کۆکردنەوەی مانیفێست'}</text>
                  <text x="15" y="65" fill="#94a3b8" fontSize="8.5">{lang === 'en' ? '• Validates cargo descriptions' : lang === 'ar' ? '• تدقيق وتأكيد وصف البضائع' : '• سەلماندنی پێناسەی بارەکان'}</text>
                  <text x="15" y="90" fill="#94a3b8" fontSize="8.5">{lang === 'en' ? '• Formulates digital customs files' : lang === 'ar' ? '• صياغة ملفات التخليص الجمركي' : '• ئامادەکردنی بەیانی دیجیتاڵی'}</text>
                  
                  {/* Point 1 Marker Badge */}
                  <circle cx="310" cy="18" r="9.5" fill="#cca553" stroke="#131e2d" strokeWidth="1.5" />
                  <text x="310" y="21" textAnchor="middle" fill="#111e2e" fontWeight="extrabold" fontSize="9">1</text>
                </g>

                {/* Bounded Context 2: Financial Integrity Core */}
                <g transform="translate(430, 60)">
                  <rect width="330" height="135" rx="6" fill="#131e2d" stroke="#b45309" strokeWidth="2.5"/>
                  <rect width="210" height="25" rx="4" fill="#b45309" x="10" y="-12"/>
                  <text x="115" y="5" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="9">{lang === 'en' ? 'Financial Settlement Sync' : lang === 'ar' ? 'مزامنة التسويات المالية' : 'هاوسەنگیی تەسوییەی دارایی'}</text>
                  <text x="15" y="40" fill="#f59e0b" fontSize="8.5">{lang === 'en' ? '• Central Bank wire validation value' : lang === 'ar' ? '• مطابقة حوالات البنك المركزي' : '• هاوتاییی حەواڵە لە بانکی ناوەندی'}</text>
                  <text x="15" y="65" fill="#f59e0b" fontSize="8.5">{lang === 'en' ? '• Dynamic tariff calculation rules' : lang === 'ar' ? '• حوسبة قواعد التعرفة الديناميكية' : '• حیسابکردنی خۆکارانەی ڕێژەی باج'}</text>
                  <text x="15" y="90" fill="#f59e0b" fontSize="8.5">{lang === 'en' ? '• Anti-money laundering records' : lang === 'ar' ? '• سجلات مكافحة غسيل الأموال' : '• تۆماری ڕێگری لە سپیکردنەوەی پارە'}</text>
                  
                  {/* Point 2 Marker Badge */}
                  <circle cx="310" cy="18" r="9.5" fill="#cca553" stroke="#131e2d" strokeWidth="1.5" />
                  <text x="310" y="21" textAnchor="middle" fill="#111e2e" fontWeight="extrabold" fontSize="9">2</text>
                </g>

                {/* Bounded Context 3: Risk Intelligence & Ledgers */}
                <g transform="translate(230, 230)">
                  <rect width="340" height="130" rx="6" fill="#131e2d" stroke="#10b981" strokeWidth="2.5"/>
                  <rect width="210" height="25" rx="4" fill="#10b981" x="10" y="-12"/>
                  <text x="115" y="5" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="9">{lang === 'en' ? 'Risk Intelligence & Ledger' : lang === 'ar' ? 'استخبارات المخاطر والتدقيق' : 'زانیاریی مەترسی و تۆماری فەرمی'}</text>
                  <text x="15" y="40" fill="#a7f3d0" fontSize="8.5">{lang === 'en' ? '• Gemini cognitive risk analysis' : lang === 'ar' ? '• تحليل المخاطر بذكاء جيميناي' : '• شیکردنەوەی مەترسییەکان بە Gemini'}</text>
                  <text x="15" y="65" fill="#a7f3d0" fontSize="8.5">{lang === 'en' ? '• Iraqi Sovereign Ledger logs' : lang === 'ar' ? '• سجل المعاملات السيادية اللامركزي' : '• تۆمارەکانی دەفتەری نیشتمانیی عێراق'}</text>
                  <text x="15" y="90" fill="#a7f3d0" fontSize="8.5">{lang === 'en' ? '• Checkpoint route command hub' : lang === 'ar' ? '• مركز توجيه وإدارة نقاط التفتيش' : '• ناوەندی ئۆپەراسیۆنی خاڵە دەرەکییەکان'}</text>
                  
                  {/* Point 3 Marker Badge */}
                  <circle cx="16" cy="16" r="9.5" fill="#cca553" stroke="#1a2233" strokeWidth="1.5" />
                  <text x="16" y="19" textAnchor="middle" fill="#111e2e" fontWeight="extrabold" fontSize="9">3</text>
                  
                  {/* Point 4 Marker Badge */}
                  <circle cx="320" cy="16" r="9.5" fill="#cca553" stroke="#1a2233" strokeWidth="1.5" />
                  <text x="320" y="19" textAnchor="middle" fill="#111e2e" fontWeight="extrabold" fontSize="9">4</text>
                </g>

                {/* Inter-domain Shared kernel bridge */}
                <path d="M 370 120 L 430 120" stroke="#cca553" strokeWidth="2"/>
                <text x="400" y="110" textAnchor="middle" fill="#cca553" fontSize="8" fontWeight="bold">{lang === 'en' ? 'Shared SDK' : lang === 'ar' ? 'حزمة مشتركة' : 'پشکی هاوبەش'}</text>
              </svg>
            )}

            {activeBlueprintId === 'event-architecture' && (
              <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" className="w-full min-w-[650px] md:min-w-0 max-w-full h-auto font-mono text-[10px] text-slate-300">
                <rect width="800" height="400" fill="none" stroke="rgba(207, 168, 94, 0.04)" strokeWidth="1" rx="8"/>
                
                {/* Event Bus center stream (Point 1) */}
                <rect x="50" y="180" width="700" height="40" rx="4" fill="#111e2e" stroke="#cca553" strokeWidth="2" />
                <text x="400" y="205" textAnchor="middle" fill="#cca553" fontWeight="bold" fontSize="9.5" letterSpacing="0.05em">
                  {lang === 'en' ? 'APACHE KAFKA SOVEREIGN EVENT BUS • MULTI-REGION HIGHWAY' : lang === 'ar' ? 'مجرى الأحداث السيادي الوطني كافكا • ممر متعدد المناطق' : 'ڕێڕەوی داتای فەرمیی نیشتمانی ئەپاچی کافكا • هێڵی هاوبەشی ناوچەکان'}
                </text>
                
                {/* Point 1 Marker Badge */}
                <g transform="translate(60, 185)">
                  <circle cx="12" cy="15" r="9.5" fill="#cca553" stroke="#111e2e" strokeWidth="1.5" />
                  <text x="12" y="18" textAnchor="middle" fill="#111e2e" fontWeight="extrabold" fontSize="9">1</text>
                </g>

                {/* Event Producers/Publishers (Point 2 triggers) */}
                <g transform="translate(80, 50)">
                  <rect width="180" height="60" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="1"/>
                  <text x="90" y="22" textAnchor="middle" fill="#ffffff" fontWeight="semibold" fontSize="9">{lang === 'en' ? 'Manifest Portal' : lang === 'ar' ? 'بوابة المانيفست' : 'پۆرتاڵی مانیفێست'}</text>
                  <text x="90" y="42" textAnchor="middle" fill="#3b82f6" fontSize="8">{lang === 'en' ? 'Publishes: ManifestSubmitted' : lang === 'ar' ? 'يرسل: تم_تقديم_المانيفست' : 'بڵاوکردنەوە: ManifestSubmitted'}</text>
                  <path d="M 90 60 L 90 130" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3"/>
                  
                  {/* Point 2 Marker Badge */}
                  <circle cx="12" cy="12" r="8.5" fill="#cca553" stroke="#1e293b" strokeWidth="1.5" />
                  <text x="12" y="15" textAnchor="middle" fill="#111e2e" fontWeight="extrabold" fontSize="8">2</text>
                </g>

                <g transform="translate(310, 50)">
                  <rect width="180" height="60" rx="4" fill="#1e293b" stroke="#eab308" strokeWidth="1"/>
                  <text x="90" y="22" textAnchor="middle" fill="#ffffff" fontWeight="semibold" fontSize="9">{lang === 'en' ? 'CBI Gateway Portal' : lang === 'ar' ? 'بوابة البنك المركزي' : 'دەروازەی بانکی ناوەندی'}</text>
                  <text x="90" y="42" textAnchor="middle" fill="#eab308" fontSize="8">{lang === 'en' ? 'Publishes: CBTWireVerified' : lang === 'ar' ? 'يرسل: تم_تأكيد_الحوالة' : 'بڵاوکردنەوە: CBTWireVerified'}</text>
                  <path d="M 90 60 L 90 130" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3 3"/>
                </g>

                <g transform="translate(540, 50)">
                  <rect width="180" height="60" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1"/>
                  <text x="90" y="22" textAnchor="middle" fill="#ffffff" fontWeight="semibold" fontSize="9">{lang === 'en' ? 'Gemini Risk Engine' : lang === 'ar' ? 'محرك مخاطر جيميناي' : 'سیستەمی مەترسیی Gemini'}</text>
                  <text x="90" y="42" textAnchor="middle" fill="#10b981" fontSize="8">{lang === 'en' ? 'Publishes: RiskAudited' : lang === 'ar' ? 'يرسل: تم_تدقيق_المخاطر' : 'بڵاوکردنەوە: RiskAudited'}</text>
                  <path d="M 90 60 L 90 130" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3"/>
                </g>

                {/* Consumers (Point 3 Offline Standby & Point 4 Security checking) */}
                <g transform="translate(200, 290)">
                  <rect width="180" height="60" rx="4" fill="#0f172a" stroke="#cca553" strokeWidth="1"/>
                  <text x="90" y="25" textAnchor="middle" fill="#cca553" fontWeight="bold" fontSize="9">{lang === 'en' ? 'Sovereign Ledger Worker' : lang === 'ar' ? 'معالج السجل السيادي' : 'تۆمارکاری دەفتەری نیشتمانی'}</text>
                  <text x="90" y="43" textAnchor="middle" fill="#94a3b8" fontSize="8">{lang === 'en' ? 'Writes logs to Spanner' : lang === 'ar' ? 'يكتب السجلات في Spanner' : 'پاشەکەوتکردن لە d3/Spanner'}</text>
                  <path d="M 90 0 L 90 -70" stroke="#cca553" strokeWidth="1.5"/>
                  
                  {/* Point 3 Marker Badge */}
                  <circle cx="12" cy="12" r="8.5" fill="#cca553" stroke="#0f172a" strokeWidth="1.5" />
                  <text x="12" y="15" textAnchor="middle" fill="#111e2e" fontWeight="extrabold" fontSize="8">3</text>
                </g>

                <g transform="translate(440, 290)">
                  <rect width="180" height="60" rx="4" fill="#0f172a" stroke="#cca553" strokeWidth="1"/>
                  <text x="90" y="25" textAnchor="middle" fill="#cca553" fontWeight="bold" fontSize="9">{lang === 'en' ? 'Notification System' : lang === 'ar' ? 'نظام الإشعارات الموحد' : 'سیستەمی ئاگادارکەرەوە'}</text>
                  <text x="90" y="43" textAnchor="middle" fill="#94a3b8" fontSize="8">{lang === 'en' ? 'Issues gateway release pass' : lang === 'ar' ? 'يصدر تصاريح المرور' : 'دەرکردنی مۆڵەتی تێپەڕین'}</text>
                  <path d="M 90 0 L 90 -70" stroke="#cca553" strokeWidth="1.5"/>
                  
                  {/* Point 4 Marker Badge */}
                  <circle cx="12" cy="12" r="8.5" fill="#cca553" stroke="#0f172a" strokeWidth="1.5" />
                  <text x="12" y="15" textAnchor="middle" fill="#111e2e" fontWeight="extrabold" fontSize="8">4</text>
                </g>
              </svg>
            )}

            {/* Fallback for remaining blueprints */}
            {!['system-context', 'business-capabilities', 'ddd-boundaries', 'event-architecture'].includes(activeBlueprintId) && (
              <div className="text-center py-6 px-4">
                <div className="w-16 h-16 rounded-full bg-[#111e2e] border border-[#cca553] flex items-center justify-center mx-auto mb-4 shadow ">
                  <Server className="w-7 h-7 text-[#cca553]" />
                </div>
                <h4 className="font-semibold text-slate-200 uppercase tracking-widest text-sm mb-1">
                  {lang === 'en' ? 'Sovereign Specification Detail' : lang === 'ar' ? 'تفاصيل المواصفات الفنية السيادية' : 'فۆرمی ووردەکارییەکانی ڕێبەرنامەی فەرمی'}
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                  {lang === 'en' ? 'Full implementation blueprints, API specifications, database parameters, and server configurations are optimized as decoupled service structures below.' : lang === 'ar' ? 'مخططات التنفيذ الكاملة، ومواصفات واجهة برمجة التطبيقات (API)، ومعلمات قاعدة البيانات، وتكوينات الخادم مُحسَّنة كبنى خدمات منفصلة أدناه.' : 'نەخشەکانی جێبەجێکردنی تەواو، فۆرم و چوارچێوەی API، داتابەیسەکان، و ڕێکخستنی سێرڤەرەکان وەکو سێرڤسی سەربەخۆ دانراون.'}
                </p>
                <div className="inline-block bg-[#1a2c42] border border-slate-700/60 rounded px-3 py-1.5 text-xs text-slate-300 font-mono">
                  {lang === 'en' ? 'Security Clearance Certified • Zero-Trust Interoperability Handled' : lang === 'ar' ? 'مصادق عليه أمنياً • جرت صياغة التوافقية وفق مبدأ صفر ثقة' : 'مۆری ڕێگەپێدانی ئاسایش • پارێزراو بە متمانەی گشتی سفر'}
                </div>
              </div>
            )}

          </div>

          {/* Key architectural requirements specifications lists */}
          <div className="mt-2">
            <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-3">
              {lang === 'en' ? 'Architectural Integrity Rules' : lang === 'ar' ? 'ضوابط السلامة والنزاهة الهندسية' : 'یاساکانی سەلامەتی و یەکپارچەیی ژێرخان'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BLUEPRINT_METADATA.find(b => b.id === activeBlueprintId)?.points[lang].map((pt, idx) => (
                <div key={idx} className="bg-slate-900/40 p-3.5 rounded-lg border border-slate-800/80 flex items-start gap-2.5">
                  <span className="bg-[#cca553]/15 text-[#cca553] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">{pt}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default SovereignAtlasPanel;
