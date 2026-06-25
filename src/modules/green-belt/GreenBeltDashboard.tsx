import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  TreePine, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Flame, 
  Droplets, 
  Thermometer, 
  Database, 
  Globe, 
  Building, 
  Award, 
  Sparkles, 
  Compass, 
  RefreshCw,
  Search,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import GoogleProjectsMap from '../../components/maps/GoogleProjectsMap';

// Kurdish Sorani translation map for the entire dashboard UI
const DK = {
  title: "کەمەربەندی سەوز",
  subtitle: "پلاتفۆرمی زیرەکی ئابووریی بازنەیی و تۆماری سەرچاوە ژینگەییەکان",
  overview: "تەختەی چاودێری سەرەکی",
  restaurants: "تۆڕی ڕێستورانتەکان",
  wasteOps: "چاودێری گواستنەوە و کۆکردنەوە",
  compostCenter: "زنجیرەی کۆمپوستکردن",
  treeImpact: "نەخشەی کاریگەری درەختەکان",
  partnerships: "ڕاوێژکاران و هاوبەشەکان",
  
  // KPI Titles
  foodWasteCollected: "پاشماوەی کۆکراوە",
  compostProduced: "کۆمپوستی بەرهەمهاتوو",
  activeRestaurants: "ڕێستورانتە بەشدارەکان",
  carbonReduction: "کەمکردنەوەی کاربۆن",
  treesSupported: "درەختە پشتگیریکراوەکان",
  ecoImpactScore: "نمرەی کاریگەری ژینگەیی",
  
  // Specific required Kurdish demo values (exact text strings as requested)
  valFoodWasteCollected: "٢٨.٢ تەن پاشماوەی کۆکراوە",
  valCompostProduced: "٢٢.٠ تەن کۆمپوستی بەرهەمهاتوو",
  valActiveRestaurants: "٧ شوێنی بەشدار",
  valTreesSupported: "١٢,٤٥٠ درەختی پشتگیریکراو",
  valCarbonReduction: "٦٩.٣ تەن CO₂ کەمکراوە",
  valEcoImpactScore: "٩٤.٨٪ نمرەی کاریگەری",

  units: {
    tons: "تەن",
    kg: "کگم",
    sites: "شوێن",
    trees: "درەخت"
  }
};

// Cleaned Kurdish Sorani Reforestation Demo Projects
const INITIAL_TREE_PROJECTS = [
  { id: 'tree-proj-01', lat: 36.5320, lng: 44.2740, name: 'کەمەربەندی سەوزی کێوی سەفین', treesSupported: 5200, compostReceived: 10.5, supervisor: 'د. ئالان ڕۆستەم', survivalRate: 98.2, description: 'پڕۆژەی چاندنی نەمام لە لێوارەکانی کێوی سەفین بۆ ڕێگریکردن لە ڕاماڵینی خاک و بنیاتنانەوەی پۆشەری سەوزایی.' },
  { id: 'tree-proj-02', lat: 36.1911, lng: 44.0092, name: 'کەمربەندی دەوروبەری هەولێر', treesSupported: 3600, compostReceived: 7.8, supervisor: 'لێپرسراو شێروان قادر', survivalRate: 95.8, description: 'پشتوێنی سەوزی باکووری شاری هەولێر بۆ کەمکردنەوەی کاریگەری تۆز و خۆڵ و نزمکردنەوەی پلەی گەرمی هاوین.' },
  { id: 'tree-proj-03', lat: 35.5840, lng: 45.4360, name: 'سەوزایی دامێنی شاخی گۆیژە', treesSupported: 2150, compostReceived: 4.5, supervisor: 'ئەندازیار هێرش ڕەحمان', survivalRate: 94.6, description: 'دارستانکردن و خزمەتکردنی نەمامەکانی شاخی گۆیژە بە بەکارهێنانی سسیستەمی ئاودێری مۆدێرن و کۆمپوستی ئۆرگانیک.' },
  { id: 'tree-proj-04', lat: 36.9180, lng: 44.0470, name: 'ناوچەی پارێزراوی بارزان', treesSupported: 1550, compostReceived: 3.2, supervisor: 'د. کاروان عومەر', survivalRate: 98.9, description: 'پەرەپێدانی زیندەیی و چاندنی داربەڕووی بومی لە ناوچە شاخاوییەکان بە هاوکاری کۆمەڵگەی خۆجێیی.' }
];

// Cleaned Kurdish Sorani Restaurants (only Erbil, Suly, Duhok - no federal reference)
const INITIAL_RESTAURANTS = [
  { id: 'rest-01', name: 'چێشتخانەی بێستوونی دێرین', region: 'هەولێر', wasteCollected: 4850, size: 'گەورە', qualityScore: 98, status: 'چالاک', certificate: 'پلاتینیۆم ژینگەیی', moistureAvg: 55, contact: 'erbil@bestoon.com' },
  { id: 'rest-02', name: 'چێشتخانەی لوتکەی کێوی گۆیژە', region: 'سلێمانی', wasteCollected: 4100, size: 'ناوەند', qualityScore: 96, status: 'چالاک', certificate: 'زێڕینی ژینگەیی', moistureAvg: 58, contact: 'suli@goizhamount.com' },
  { id: 'rest-03', name: 'کافتریای زانکۆی سەڵاحەدین', region: 'هەولێر', wasteCollected: 3120, size: 'ناوەند', qualityScore: 94, status: 'چالاک', certificate: 'کۆمپوستی ژینگەیی', moistureAvg: 57, contact: 'zanko@su.edu.krd' },
  { id: 'rest-04', name: 'چێشتخانەی پردی دەلال', region: 'دهۆک', wasteCollected: 2330, size: 'بچووک', qualityScore: 92, status: 'چالاک', certificate: 'دۆستی ژینگە', moistureAvg: 59, contact: 'delal@duhok.krd' },
  { id: 'rest-05', name: 'چێشتخانەی پارکی ئازادی', region: 'سلێمانی', wasteCollected: 1800, size: 'بچووک', qualityScore: 95, status: 'چالاک', certificate: 'ڕیسایکڵەری زێڕین', moistureAvg: 56, contact: 'azadi_restaurant@suli.krd' },
  { id: 'rest-06', name: 'چێشتخانەی لالش هەولێر', region: 'هەولێر', wasteCollected: 1200, size: 'ناوەند', qualityScore: 90, status: 'چالاک', certificate: 'دۆستی ژینگە', moistureAvg: 60, contact: 'lalish@erbil.krd' },
  { id: 'rest-07', name: 'چێشتخانەی تاقانە سلێمانی', region: 'سلێمانی', wasteCollected: 1000, size: 'ناوەند', qualityScore: 93, status: 'چالاک', certificate: 'پلاتینیۆم ژینگەیی', moistureAvg: 54, contact: 'taqana@suli.krd' }
];

// Composting biological batches in Kurdish Sorani
const INITIAL_BATCHES = [
  { id: 'کۆد-٠١', name: 'بەرهەمی تاقیکاری زیندەیی کەمەربەندی باکوور', moisture: 54, temp: 62, durationDays: 14, state: 'قۆناغی گەرمی چالاک', certStatus: 'پشکنین سەرکەوتوو بوو', compostTons: 6.8 },
  { id: 'کۆد-٠٢', name: 'خۆراکی کۆمپوستی شاخی سەفین', moisture: 58, temp: 58, durationDays: 28, state: 'قۆناغی نیشتن', certStatus: 'لە ژێر وردبینیدایە', compostTons: 5.5 },
  { id: 'کۆد-٠٣', name: 'تێکەڵەی خۆڵ و بایۆچار بۆ کێوی گۆیژە', moisture: 50, temp: 31, durationDays: 45, state: 'ئامادەیە بۆ بەکارهێنان', certStatus: 'پشکنین سەرکەوتوو بوو', compostTons: 9.7 }
];

// Experts in Kurdish Sorani
const EXPERT_PROFILES = [
  {
    name: 'پڕۆفیسۆر ئالان ڕۆستەم',
    role: 'پسپۆڕی کۆمپوستی زیندەیی',
    field: 'زیندەناسی وردەزیندەوەرانی خاک',
    institution: 'زانکۆی سەڵاحەدین',
    bio: 'پسپۆڕ لە باشترکردنی پێکهاتەی خاک و گۆڕینی پاشماوەی خۆراک بۆ ماددەیەکی سوودبەخش بۆ نەمام و درەخت.',
    img: 'ئار',
  },
  {
    name: 'دکتۆر کاروان عومەر',
    role: 'ڕاوێژکاری باڵای کشتوکاڵی ژینگەیی',
    field: 'کیمیای خاک',
    institution: 'دەستەی پاراستن و چاککردنی ژینگە',
    bio: 'شارەزا لە هەڵسەنگاندنی جۆرێتی خاک و کەمکردنەوەی ترشێتیی خاک بە بەکارهێنانی کۆمپوستی ئۆرگانیک.',
    img: 'کع',
  },
  {
    name: 'شێروان قادر',
    role: 'بەڕێوەبەری نووسینگەی لوتکەی سەوز',
    field: 'ژینگەناسی و دارستان',
    institution: 'دەزگای ڕوانگە',
    bio: 'سەرپەرشتیاری دابەشکردنی نەمام و چاندنی درەخت لە پڕۆژەکانی کەمەربەندی سەوزی کوردستان.',
    img: 'شق',
  },
  {
    name: 'ئینگەر سورێنسن',
    role: 'ڕاوێژکاری باڵای ئابووریی بازنەیی',
    field: 'چاودێری خولی کاربۆن',
    institution: 'ڕێکخراوی DCA ـی دانیمارک',
    bio: 'ڕاوێژکار لە گۆڕینی زنجیرەی گواستنەوەی چێشتخانەکان بۆ شێوازێکی جێگیر و دۆستی ژینگە.',
    img: 'ئس',
  },
  {
    name: 'هێرش ڕەحمان',
    role: 'پسپۆڕی وردبینی دارایی و کاریگەری ژینگەیی',
    field: 'پێوانەکردنی گازە زیانبەخشەکان',
    institution: 'سندوقی وەبەرهێنانی سەوز',
    bio: 'هەڵسەنگێنەری کەمکردنەوەی گازە زیانبەخشەکان و کاریگەریی دارایی و ژینگەیی پڕۆژەکە.',
    img: 'هر',
  },
];

// Logistics routes in Kurdish
const INITIAL_ROUTES = [
  { id: 'ڕێگا-٠١', name: 'هێڵی کەمەربەندی باکووری هەولێر', stops: 4, vehicle: 'ئۆتۆمبێلی کارەبایی پاشماوە ٠١', driver: 'سامان کارزان', loadRatio: 82, status: 'لە ڕێگادایە', frequency: 'ڕۆژانە' },
  { id: 'ڕێگا-٠٢', name: 'هێڵی گواستنەوەی ناوشاری سلێمانی', stops: 3, vehicle: 'ئۆتۆمبێلی کارەبایی پاشماوە ٠٢', driver: 'ئاری ئەحمەد', loadRatio: 65, status: 'کۆتایی هات', frequency: 'ڕۆژانە' },
  { id: 'ڕێگا-٠٣', name: 'هێڵی کۆکردنەوەی چێشتخانەکانی دهۆک', stops: 2, vehicle: 'ئۆتۆمبێلی هایبرید ٠٤', driver: 'دلاوەر بارزانی', loadRatio: 45, status: 'ئامادەباشی', frequency: 'هەفتانە دوو ڕۆژ' }
];

export default function GreenBeltDashboard({ lang }: { lang: 'en' | 'ar' | 'ku' }) {
  // Always enforce Kurdish Sorani irrespective of prop
  const [activeTab, setActiveTab] = useState('overview');
  const [restaurants, setRestaurants] = useState(INITIAL_RESTAURANTS);
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  const [treeProjects, setTreeProjects] = useState(INITIAL_TREE_PROJECTS);
  const [routes, setRoutes] = useState(INITIAL_ROUTES);
  
  const totalWaste = restaurants.reduce((sum, r) => sum + r.wasteCollected, 0) / 1000;
  const totalCompost = batches.reduce((sum, b) => sum + b.compostTons, 0);
  
  // Interactive Simulator and Logs (100% Sorani Kurdish)
  const [auditLogs, setAuditLogs] = useState<string[]>([
    "سیستەمەکە دەستی بەکارکردن کرد: چاودێریی باڵای کەمەربەندی سەوز کارایە.",
    "کارگێڕی: ئۆتۆمبێلی کارەبایی ٠١ بارکانی گەیاندە وێستگەی کۆمپوست.",
    "تاقیگە: پشکنینی پۆتاسیۆم و نایترۆجین لە دەستپێشخەری بەرهەمی تاقیکاری سەرکەوتوو بوو.",
    "ژینگە: کەمەربەندی سەوزی کێوی سەفین گەشەی سروشتی نەمامەکانی بە ڕێژەی ٩٨.٢٪ ڕاگەیاند."
  ]);
  const [isSimulatorRunning, setIsSimulatorRunning] = useState(true);
  
  // New entry states for the interactive Kurdish logs form
  const [newLogRest, setNewLogRest] = useState('rest-01');
  const [newLogWeight, setNewLogWeight] = useState('120');
  const [newLogMoisture, setNewLogMoisture] = useState('55');
  const [showLogSuccess, setShowLogSuccess] = useState(false);
  
  // New batch state
  const [newBatchName, setNewBatchName] = useState('');
  const [newBatchCompost, setNewBatchCompost] = useState('4.5');
  const [showBatchSuccess, setShowBatchSuccess] = useState(false);

  // Selected project for canopy map details
  const [activeProject, setActiveProject] = useState(INITIAL_TREE_PROJECTS[0]);
  const [restSearch, setRestSearch] = useState('');

  // Auto-generator simulator loop (Produces 100% Sorani Kurdish logs)
  useEffect(() => {
    if (!isSimulatorRunning) return;
    const interval = setInterval(() => {
      const restNames = restaurants.map(r => r.name);
      const chosenRest = restNames[Math.floor(Math.random() * restNames.length)];
      const weight = Math.floor(Math.random() * 30) + 10;
      const newLog = `گواستنەوەی ڕاستەوخۆ: بڕی ${weight} کگم پاشماوە لە چێشتخانەی "${chosenRest}" کۆکرایەوە و مۆرکرا.`;
      
      setAuditLogs(prev => [newLog, ...prev.slice(0, 5)]);
      
      // Update restaurant collected data to simulate active persistence
      setRestaurants(prev => prev.map(r => {
        if (r.name === chosenRest) {
          return { ...r, wasteCollected: r.wasteCollected + weight };
        }
        return r;
      }));
    }, 12000);
    return () => clearInterval(interval);
  }, [isSimulatorRunning, restaurants]);

  // Handle Manual logs submission
  const handleAddNewCollection = (e: React.FormEvent) => {
    e.preventDefault();
    const targetRest = restaurants.find(r => r.id === newLogRest);
    if (!targetRest) return;
    
    const weightVal = parseFloat(newLogWeight);
    if (isNaN(weightVal) || weightVal <= 0) return;
    const moistureVal = parseFloat(newLogMoisture) || 55;

    setRestaurants(prev => prev.map(r => {
      if (r.id === newLogRest) {
        return {
          ...r,
          wasteCollected: r.wasteCollected + weightVal,
          moistureAvg: Math.round((r.moistureAvg + moistureVal) / 2)
        };
      }
      return r;
    }));

    const systemMessage = `سەرپەرشتیاری مەیدانی: ڕێژەی ${weightVal} کگم پاشماوە بە شێداریی ${moistureVal}% لە چێشتخانەی "${targetRest.name}" وەرگیرا.`;
    setAuditLogs(prev => [systemMessage, ...prev.slice(0, 5)]);
    
    setShowLogSuccess(true);
    setTimeout(() => setShowLogSuccess(false), 3000);
  };

  // Handle Manual batch creation
  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchName.trim()) return;

    const tons = parseFloat(newBatchCompost) || 4.5;
    const newBatch = {
      id: `کۆد-${Math.floor(10 + Math.random() * 89)}`,
      name: newBatchName,
      moisture: 55,
      temp: 61,
      durationDays: 1,
      state: 'قۆناغی گەرمی چالاک',
      certStatus: 'لە ژێر وردبینیدایە',
      compostTons: tons
    };

    setBatches(prev => [newBatch, ...prev]);
    setAuditLogs(prev => [`تۆماری ئۆرگانیک: بەرهەمی نوێی کۆمپوست بە ناوی "${newBatchName}" بە توانای ${tons} تەن بە سەرکەوتوویی جێگیرکرا.`, ...prev.slice(0, 5)]);
    
    setNewBatchName('');
    setShowBatchSuccess(true);
    setTimeout(() => setShowBatchSuccess(false), 3000);
  };

  // Filter restaurants
  const filteredRestaurants = restaurants.filter(r => 
    r.name.toLowerCase().includes(restSearch.toLowerCase()) || 
    r.region.toLowerCase().includes(restSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 text-right" id="green-belt-dashboard-root" dir="rtl">
      
      {/* Pilot Demonstration Notice Banner */}
      <div className="bg-[#cca553]/15 border-2 border-[#cca553]/35 rounded-2xl px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-[#cca553]/20 p-2.5 rounded-xl border border-[#cca553]/40 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6 text-[#cca553]" />
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-black text-[#cca553]">
                داتای نمایشی بۆ هەڵسەنگاندنی ٩٠ ڕۆژە
              </span>
              <span className="text-[10px] bg-red-950/85 text-red-400 border border-red-900/40 px-2 py-0.5 rounded font-bold">
                تەنها بۆ پیشاندانی نموونە
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-4xl leading-relaxed">
              ئەم پلاتفۆرمە لەسەر داتای خەمڵێنراو و پێشبینیکراوی قۆناغی تاقیکاری هەڵسەنگاندنی ٩٠ ڕۆژە کاردەکات بۆ پیشاندانی توانای پێشبینیکراو و کاریگەرییە ژینگەییەکانی کەمەربەندی سەوز.
            </p>
          </div>
        </div>
        <div className="bg-[#cca553]/10 text-[#cca553] text-[11px] font-bold px-3.5 py-1.5 rounded-full border border-[#cca553]/25 shrink-0">
          داتای نمایشی بۆ هەڵسەنگاندنی ٩٠ ڕۆژە
        </div>
      </div>

      {/* 1. Dynamic Live Telemetry Stream bar (Sorani lock) */}
      <div className="bg-[#0b2414] border border-[#10b981]/20 rounded-xl px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-[#10b981]/15 p-1.5 rounded-lg border border-[#10b981]/30 flex items-center justify-center animate-pulse">
            <Activity className="w-4 h-4 text-[#10b981]" />
          </div>
          <div className="text-right">
            <span className="text-[11px] text-emerald-400 font-bold tracking-wider block">
              چاودێری ڕاستەوخۆ (چالاکییەکانی مەیدان)
            </span>
            <p className="text-xs text-emerald-200 font-mono italic mt-0.5 max-w-2xl">
              {auditLogs[0]}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            data-edit-control="true"
            onClick={() => setIsSimulatorRunning(!isSimulatorRunning)} 
            className="px-3.5 py-1.5 text-xs font-semibold rounded border flex items-center gap-1.5 cursor-pointer transition-all bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/20"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulatorRunning ? 'animate-spin' : ''}`} />
            {isSimulatorRunning ? "ڕاگرتنی چاودێری ڕاستەوخۆ" : "کارپێکردنەوەی چاودێری ڕاستەوخۆ"}
          </button>
        </div>
      </div>

      {/* 2. Main KPI Grid (Pure Kurdish Sorani Only - as requested) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        
        {/* KPI 1: Food Waste Collected */}
        <div className="bg-[#0b2313] border border-[#10b981]/15 rounded-2xl p-4 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#10b981]/30 transition-all duration-300">
          <div className="absolute left-0 bottom-0 -translate-x-3 translate-y-3 opacity-5">
            <Leaf className="w-20 h-20 text-emerald-500" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-emerald-400 font-bold">
              {DK.foodWasteCollected}
            </span>
            <div className="bg-[#10b981]/10 p-1.5 rounded-lg border border-[#10b981]/20">
              <Leaf className="w-4 h-4 text-[#10b981]" />
            </div>
          </div>
          <div className="text-right mt-2">
            <div className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-bold inline-block mb-1">
              پێشبینیی هەڵسەنگاندنی ٩٠ ڕۆژە
            </div>
            <p className="text-xl font-bold text-white font-mono">
              {DK.valFoodWasteCollected}
            </p>
            <p className="text-[10px] text-[#cca553] mt-1.5 font-semibold">
              بەرزترین ڕێژەی تۆمارکراو
            </p>
          </div>
        </div>

        {/* KPI 2: Organic Compost Produced */}
        <div className="bg-[#0b2313] border border-[#10b981]/15 rounded-2xl p-4 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#10b981]/30 transition-all duration-300">
          <div className="absolute left-0 bottom-0 -translate-x-3 translate-y-3 opacity-5">
            <Database className="w-20 h-20 text-emerald-400" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-emerald-400 font-bold">
              {DK.compostProduced}
            </span>
            <div className="bg-[#10b981]/10 p-1.5 rounded-lg border border-[#10b981]/20">
              <Database className="w-4 h-4 text-[#10b981]" />
            </div>
          </div>
          <div className="text-right mt-2">
            <div className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-bold inline-block mb-1">
              پێشبینیی هەڵسەنگاندنی ٩٠ ڕۆژە
            </div>
            <p className="text-xl font-bold text-white font-mono">
              {DK.valCompostProduced}
            </p>
            <p className="text-[10px] text-emerald-400 mt-1.5 font-semibold">
              خاوێن و جێگیر
            </p>
          </div>
        </div>

        {/* KPI 3: Active Restaurants */}
        <div className="bg-[#0b2313] border border-[#10b981]/15 rounded-2xl p-4 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#10b981]/30 transition-all duration-300">
          <div className="absolute left-0 bottom-0 -translate-x-3 translate-y-3 opacity-5">
            <Building className="w-20 h-20 text-[#cca553]" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-emerald-400 font-bold">
              {DK.activeRestaurants}
            </span>
            <div className="bg-[#cca553]/10 p-1.5 rounded-lg border border-[#cca553]/20">
              <Building className="w-4 h-4 text-[#cca553]" />
            </div>
          </div>
          <div className="text-right mt-2">
            <div className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold inline-block mb-1">
              ئامانجی هەڵسەنگاندن
            </div>
            <p className="text-xl font-bold text-white font-mono">
              {DK.valActiveRestaurants}
            </p>
            <p className="text-[10px] text-[#10b981] mt-1.5 font-semibold">
              هاوبەشی کەمەربەندی هاوچەرخ
            </p>
          </div>
        </div>

        {/* KPI 4: Supported Trees */}
        <div className="bg-[#0b2313] border border-[#10b981]/15 rounded-2xl p-4 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#10b981]/30 transition-all duration-300">
          <div className="absolute left-0 bottom-0 -translate-x-3 translate-y-3 opacity-5">
            <TreePine className="w-20 h-20 text-[#cca553]" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-emerald-400 font-bold">
              {DK.treesSupported}
            </span>
            <div className="bg-[#cca553]/10 p-1.5 rounded-lg border border-[#cca553]/20">
              <TreePine className="w-4 h-4 text-[#cca553]" />
            </div>
          </div>
          <div className="text-right mt-2">
            <div className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold inline-block mb-1">
              ئامانجی هەڵسەنگاندن
            </div>
            <p className="text-xl font-bold text-white font-mono">
              {DK.valTreesSupported}
            </p>
            <p className="text-[10px] text-[#10b981] mt-1.5 font-semibold">
              نەمامی پارێزراو بە کۆنترۆڵ
            </p>
          </div>
        </div>

        {/* KPI 5: Carbon Reduction */}
        <div className="bg-[#0b2313] border border-[#10b981]/15 rounded-2xl p-4 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#10b981]/30 transition-all duration-300">
          <div className="absolute left-0 bottom-0 -translate-x-3 translate-y-3 opacity-5">
            <Sparkles className="w-20 h-20 text-emerald-300" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-emerald-400 font-bold">
              {DK.carbonReduction}
            </span>
            <div className="bg-[#10b981]/10 p-1.5 rounded-lg border border-[#10b981]/20">
              <Activity className="w-4 h-4 text-[#10b981]" />
            </div>
          </div>
          <div className="text-right mt-2">
            <div className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-bold inline-block mb-1">
              پێشبینیی هەڵسەنگاندنی ٩٠ ڕۆژە
            </div>
            <p className="text-xl font-bold text-white font-mono">
              {DK.valCarbonReduction}
            </p>
            <p className="text-[10px] text-[#cca553] mt-1.5 font-semibold">
              کەمکردنەوەی گازە ژەهراوییەکان
            </p>
          </div>
        </div>

        {/* KPI 6: Eco Impact Score */}
        <div className="bg-[#0b2313] border border-[#cca553]/20 rounded-2xl p-4 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#cca553]/40 transition-all duration-300">
          <div className="absolute left-0 bottom-0 -translate-x-3 translate-y-3 opacity-5">
            <Award className="w-20 h-20 text-[#cca553]" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#cca553] font-bold">
              {DK.ecoImpactScore}
            </span>
            <div className="bg-[#cca553]/10 p-1.5 rounded-lg border border-[#cca553]/20">
              <Award className="w-4 h-4 text-[#cca553]" />
            </div>
          </div>
          <div className="text-right mt-2">
            <div className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded font-bold inline-block mb-1">
              پێشبینیکراو
            </div>
            <p className="text-xl font-bold text-[#cca553] font-mono">
              {DK.valEcoImpactScore}
            </p>
            <p className="text-[10px] text-emerald-400 mt-1.5 font-semibold">
              پلەی یەکەمی فەرمی
            </p>
          </div>
        </div>

      </div>

      {/* 3. Sub-Navigation Tab bar - Exactly the 6 requested labels */}
      <nav className="bg-[#0b1b10] border border-[#10b981]/15 rounded-xl p-1.5 flex flex-wrap gap-1 shadow-inner relative z-10 w-full">
        {[
          { id: 'overview', label: DK.overview, icon: Leaf },
          { id: 'restaurants', label: DK.restaurants, icon: Building },
          { id: 'wasteOps', label: DK.wasteOps, icon: Calendar },
          { id: 'compost', label: DK.compostCenter, icon: Database },
          { id: 'trees', label: DK.treeImpact, icon: TreePine },
          { id: 'advisors', label: DK.partnerships, icon: Users }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-[#0d2e18] to-[#125327] text-white border-b-2 border-[#cca553] shadow' 
                : 'text-emerald-400/80 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4 text-[#cca553]" />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* 4. Active Tab Panel Rendering */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            
            {/* TAB 1: EXECUTIVE OVERVIEW (تەختەی چاودێری سەرەکی) */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Visual Circular Flow Infographic Card */}
                <div className="md:col-span-2 bg-[#0b2112] border border-[#10b981]/15 rounded-2xl p-6 shadow-xl text-right">
                  <div className="flex items-center justify-between border-b border-[#10b981]/10 pb-4 mb-5">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#cca553]" />
                        خولی ئابووریی بازنەیی و گۆڕینی پاشماوە
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        جێبەجێکردنی زنجیرەی چاودێریکردن لە پاشماوەی چێشتخانەکانەوە تا گەشەپێدانی دارستانەکان
                      </p>
                    </div>
                    <span className="text-[10px] bg-[#cca553]/10 text-[#cca553] px-2.5 py-1 rounded-full border border-[#cca553]/20 font-bold">
                      پەسەندکراوی دامەزراوەی روانگە و DCA
                    </span>
                  </div>

                  {/* Flow Map Visualizer */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 py-4 relative">
                    
                    {/* Node 1 */}
                    <div className="bg-[#08170d] border border-[#10b981]/20 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-emerald-500 transition-all shadow-md">
                      <div className="bg-[#10b981]/10 p-3 rounded-full border border-emerald-500/20 mb-3">
                        <Building className="w-6 h-6 text-[#10b981]" />
                      </div>
                      <h4 className="text-xs font-bold text-white">١. سەرچاوەی پاشماوە</h4>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-mono">تۆڕی چێشتخانە بەشدارەکان</p>
                      <p className="text-[11px] text-emerald-400 font-mono mt-0.5 font-bold">٢٨.٢ تەن کۆکراوە</p>
                    </div>

                    {/* Node 2 */}
                    <div className="bg-[#08170d] border border-[#10b981]/20 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-emerald-500 transition-all shadow-md">
                      <div className="bg-[#cca553]/10 p-3 rounded-full border border-[#cca553]/20 mb-3">
                        <Calendar className="w-6 h-6 text-[#cca553]" />
                      </div>
                      <h4 className="text-xs font-bold text-white">٢. لۆجیستیکی چالاک</h4>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-mono">{routes.length} هێڵی چالاک</p>
                      <p className="text-[11px] text-[#cca553] font-mono mt-0.5 font-bold">١٠٠٪ چاودێریکراو</p>
                    </div>

                    {/* Node 3 */}
                    <div className="bg-[#08170d] border border-[#10b981]/20 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-emerald-500 transition-all shadow-md">
                      <div className="bg-[#10b981]/10 p-3 rounded-full border border-emerald-500/20 mb-3">
                        <Database className="w-6 h-6 text-[#10b981]" />
                      </div>
                      <h4 className="text-xs font-bold text-white">٣. خۆڵکردنەوە و شیبوونەوە</h4>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-mono">بەرهەمی کۆمپوستی بەپیت</p>
                      <p className="text-[11px] text-emerald-400 font-mono mt-0.5 font-bold">٢٢.٠ تەن نوێ</p>
                    </div>

                    {/* Node 4 */}
                    <div className="bg-[#08170d] border border-[#cca553]/30 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-[#cca553] transition-all shadow-md">
                      <div className="bg-[#cca553]/10 p-3 rounded-full border border-[#cca553]/20 mb-3 animate-pulse">
                        <TreePine className="w-6 h-6 text-[#cca553]" />
                      </div>
                      <h4 className="text-xs font-bold text-white">٤. چاندنی نەمام</h4>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-mono">گۆڕین بۆ نەمام لە باکوور و ناوەڕاست</p>
                      <p className="text-[11px] text-[#cca553] font-mono mt-0.5 font-bold">١٢,٤٥٠ نەمام</p>
                    </div>

                  </div>

                  {/* Carbon Reduction Trend: Custom Vector SVG Chart */}
                  <div className="mt-6 border-t border-[#10b981]/10 pt-5">
                    <h4 className="text-xs font-bold uppercase text-emerald-300 mb-3 flex items-center justify-between">
                      <span>ڕەوتی گەشەکردنی کەمکردنەوەی کاربۆن لە سەرەتای دەستپێکردنی پڕۆژە</span>
                      <span className="text-[11px] text-[#cca553] font-bold">ئامانج: ١٠٠ تەن کاربۆن CO₂e</span>
                    </h4>
                    
                    {/* SVG Chart */}
                    <div className="h-44 bg-[#08160d] border border-[#10b981]/10 rounded-xl p-3 flex flex-col justify-end relative overflow-hidden">
                      <svg className="w-full h-32 absolute bottom-2 left-0 overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"></stop>
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.01"></stop>
                          </linearGradient>
                        </defs>
                        <path d="M 0 30 Q 15 25 30 18 T 60 12 T 90 5 L 100 5 L 100 30 Z" fill="url(#chartGrad)"></path>
                        <path d="M 0 30 Q 15 25 30 18 T 60 12 T 90 5 L 100 5" fill="none" stroke="#10b981" strokeWidth="1.5"></path>
                        <circle cx="30" cy="18" r="1.5" fill="#cca553"></circle>
                        <circle cx="65" cy="11" r="1.5" fill="#cca553"></circle>
                        <circle cx="100" cy="5" r="2" fill="#10b981" className="animate-ping"></circle>
                        <circle cx="100" cy="5" r="1.5" fill="#cca553"></circle>
                      </svg>
                      
                      <div className="flex justify-between text-[10px] text-slate-500 font-bold relative z-10 w-full px-2">
                        <span>دەستپێکردنی پڕۆژە</span>
                        <span>تەواوبوونی قۆناغی یەکەم</span>
                        <span>لوتکەی کۆکردنەوە و کۆمپوست</span>
                        <span>موسمی چاندنی نەمامەکان</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Left Side: ESG Investor & Advisory Panel */}
                <div className="bg-[#0b2112] border border-[#10b981]/15 rounded-2xl p-6 shadow-xl flex flex-col justify-between text-right">
                  <div>
                    {/* Simple Pilot Status Card as requested */}
                    <div className="bg-gradient-to-br from-[#123019] to-[#0a1f10] border-2 border-[#cca553]/40 rounded-2xl p-5 mb-5 shadow-lg">
                      <h4 className="text-sm font-black text-[#cca553] mb-3 flex items-center gap-1.5 border-b border-[#cca553]/25 pb-2">
                        <Layers className="w-4 h-4 text-[#cca553]" />
                        دەفتەری دۆخی هەڵسەنگاندن
                      </h4>
                      <div className="flex flex-col gap-2.5 text-xs">
                        <div className="flex justify-between items-center bg-[#051109] px-3 py-2 rounded-lg border border-[#cca553]/15">
                          <span className="text-slate-400">دۆخی هەڵسەنگاندن:</span>
                          <span className="text-[#cca553] font-bold">لە قۆناغی ئامادەکاری</span>
                        </div>
                        <div className="flex justify-between items-center bg-[#051109] px-3 py-2 rounded-lg border border-[#cca553]/15">
                          <span className="text-slate-400">شوێن:</span>
                          <span className="text-white font-bold">هەولێر</span>
                        </div>
                        <div className="flex justify-between items-center bg-[#051109] px-3 py-2 rounded-lg border border-[#cca553]/15">
                          <span className="text-slate-400">ماوە:</span>
                          <span className="text-white font-bold">٩٠ ڕۆژ</span>
                        </div>
                        <div className="flex justify-between items-center bg-[#051109] px-3 py-2 rounded-lg border border-[#cca553]/15">
                          <span className="text-slate-400">ئامانج:</span>
                          <span className="text-[#10b981] font-bold">٥ تا ١٠ ڕێستورانت</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#cca553]" />
                      ڕاپۆرتی کاریگەری و هەڵسەنگاندن
                    </h3>
                    <p className="text-xs text-slate-400 border-b border-[#10b981]/10 pb-4 mb-4">
                      ڕاپۆرت و پێوەرەکانی سەوزایی و خولی ئابووری کە لەژێر وردبینی پێوەرە نێودەوڵەتییەکان جێگیرکراوە بۆ کاڵای کشتوکاڵی بەپیت.
                    </p>

                    <div className="flex flex-col gap-4">
                      
                      <div className="bg-[#08170d] border border-[#10b981]/15 rounded-xl p-3.5 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-300">ڕێژەی نوێکردنەوەی خاک</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">بەپیتکردنی خاکی لێوارە شاخاوییەکان</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-900/20 px-2 py-0.5 rounded">
                          {(totalCompost * 1.5).toFixed(1)} دۆنم
                        </span>
                      </div>

                      <div className="bg-[#08170d] border border-[#10b981]/15 rounded-xl p-3.5 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-300">ماتماتیکی ڕێژەی ژیانی نەمامەکان</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">ڕێژەی گەشە و ژیانی سەرکەوتووانە سەر و وێستگەکان</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-900/20 px-2 py-0.5 rounded">
                          ٩٥.٣٪ سەرکەوتوو
                        </span>
                      </div>

                      <div className="bg-[#08170d] border border-[#cca553]/15 rounded-xl p-3.5 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-300">ڕێگریکردن لە گازی مێسان لە زبڵدان</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">دوورخستنەوەی پاشماوەکان لە زاڵبوونی پاش پاشماوەکان</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#cca553] bg-amber-900/20 px-2 py-0.5 rounded">
                          {(totalWaste * 0.9).toFixed(1)} تەن چاودێری
                        </span>
                      </div>

                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#10b981]/10 bg-gradient-to-r from-emerald-950/20 to-transparent p-3 rounded-lg border border-[#10b981]/10 text-right">
                    <p className="text-[11px] text-emerald-300 leading-relaxed italic">
                      "لەکاتی بەکارهێنانی کەرەستە ئۆرگانیکەکان بۆ بەرهەمهێنانی کۆمپوست، دڵنیایی دەدرێت کە ژینگە دەپارێزرێت و کەمەربەندی سەوزی کوردستان بەهێز دەکرێت." 
                      <span className="block mt-1 font-bold text-[9px] text-[#cca553]">— ڕاپۆرتی بڵاوکراوەی هاوبەشی دەزگای روانگە و ڕێکخراوی DCA</span>
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: RESTAURANT NETWORK (تۆڕی ڕێستورانتەکان) */}
            {activeTab === 'restaurants' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Searchable Restaurant List Panel */}
                <div className="lg:col-span-2 bg-[#0b2112] border border-[#10b981]/15 rounded-2xl p-6 shadow-xl text-right">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#10b981]/10 pb-4 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Building className="w-5 h-5 text-[#cca553]" />
                        تۆماری چێشتخانە و دەستپێشخەرە ژینگەیی و بازنەییەکان
                      </h3>
                      <p className="text-xs text-slate-400">گەڕان و چاودێریکردنی جۆرێتی پاشماوە و بڕی فڕێدراو لە سەرچاوەکانەوە</p>
                    </div>
                    
                    {/* Search Field */}
                    <div className="relative w-full sm:w-60">
                      <input 
                        type="text"
                        value={restSearch}
                        onChange={(e) => setRestSearch(e.target.value)}
                        placeholder="گەڕان لە تۆماری چێشتخانەکان..."
                        className="w-full bg-[#08170d] text-white border border-[#10b981]/20 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#cca553]"
                      />
                      <Search className="w-4 h-4 text-slate-500 absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  {/* Desktop view table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                      <thead>
                        <tr className="border-b border-emerald-950/80 text-emerald-400 font-bold">
                          <th className="pb-3 pr-2">ناوی چێشتخانە</th>
                          <th className="pb-3 text-center">ناوچە</th>
                          <th className="pb-3 text-center">پاشماوەی کۆکراوە (کگم)</th>
                          <th className="pb-3 text-center">نمرەی دڵنیایی جۆرێتی</th>
                          <th className="pb-3 text-center">بڕوانامە ژینگەیی</th>
                          <th className="pb-3 pl-2 text-left">کارگێڕی</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRestaurants.map(r => (
                          <tr key={r.id} className="border-b border-slate-900/60 hover:bg-[#08170d]/40 transition-colors">
                            <td className="py-3.5 pr-2 font-semibold">
                              <div className="flex flex-col">
                                <span className="text-white text-sm">{r.name}</span>
                                <span className="text-[10px] text-slate-500 font-mono">{r.contact}</span>
                              </div>
                            </td>
                            <td className="py-3.5 text-center text-slate-300 font-bold">{r.region}</td>
                            <td className="py-3.5 text-emerald-400 font-mono font-bold text-center">{(r.wasteCollected).toLocaleString()} کگم</td>
                            <td className="py-3.5 text-center">
                              <span className="bg-[#cca553]/10 text-[#cca553] px-2.5 py-0.5 rounded font-mono font-bold">
                                %{r.qualityScore}
                              </span>
                            </td>
                            <td className="py-3.5 text-center">
                              <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-900 px-2 py-0.5 rounded text-[10px]">
                                {r.certificate}
                              </span>
                            </td>
                            <td className="py-3.5 pl-2 text-left">
                              <button 
                                onClick={() => alert(`بینینی ناسنامەی QRی گواستنەوەی چۆنێتی هاوکات: ${r.name} - پێوەرەکان و نمرەکەی زۆر باشن.`)}
                                className="bg-[#10b981]/15 text-[#10b981] hover:bg-[#10b981]/30 px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-all"
                              >
                                پشکنینی QR
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>

                {/* Form to Log New Collection Manual Entry */}
                <div className="bg-[#0b2112] border border-[#10b981]/15 rounded-2xl p-6 shadow-xl text-right flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#cca553] mb-1.5 uppercase tracking-wider flex items-center gap-1.5 border-b border-[#10b981]/10 pb-3">
                      <Plus className="w-4 h-4 text-[#cca553]" />
                      تۆمارکردنی گواستنەوەی نوێی پاشماوە
                    </h4>
                    <p className="text-xs text-slate-400 mb-4">
                      لێرەوە دەتوانن بڕی پاشماوە کۆکراوەکانی چێشتخانەکان تۆمار بکەن بەپێی نمرەی کێش کە لەلایەن کارمەندانەوە هاوچەرخکراوە.
                    </p>

                    <form onSubmit={handleAddNewCollection} className="flex flex-col gap-4">
                      <div>
                        <label className="block text-[11px] text-slate-350 mb-1.5 font-bold">دیاریکردنی چێشتخانەی بەشدار</label>
                        <select 
                          value={newLogRest}
                          onChange={(e) => setNewLogRest(e.target.value)}
                          className="w-full bg-[#08170d] text-white border border-[#10b981]/25 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#cca553]"
                        >
                          {restaurants.map(r => (
                            <option key={r.id} value={r.id}>{r.name} ({r.region})</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-slate-350 mb-1.5 font-bold">بڕی کۆکراوە (کگم)</label>
                          <input 
                            type="number"
                            value={newLogWeight}
                            onChange={(e) => setNewLogWeight(e.target.value)}
                            className="w-full bg-[#08170d] text-white border border-[#10b981]/25 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#cca553] text-center"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-350 mb-1.5 font-bold">ڕێژەی شێداری (٪)</label>
                          <input 
                            type="number"
                            value={newLogMoisture}
                            onChange={(e) => setNewLogMoisture(e.target.value)}
                            className="w-full bg-[#08170d] text-white border border-[#10b981]/25 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#cca553] text-center"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-emerald-900 to-[#125327] hover:from-emerald-800 hover:to-green-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow cursor-pointer transition-all flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-4 h-4 text-[#cca553]" />
                        تۆمارکردنی بار لە دەفتەرەکەدا
                      </button>
                    </form>

                    <AnimatePresence>
                      {showLogSuccess && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-4 p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>باركە بە سەرکەوتوویی تۆمارکرا! پێوەرەکانی سەوزایی و جێگیری نوێکرانەوە.</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-4 bg-[#08170d] border border-slate-900 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-500 leading-normal">
                      پرۆتۆکۆلی پاراستن: هەموو باریەک بە شێوەیەکی فەرمی پێناسی تایبەت وەردەگرێت و مۆری نێودەوڵەتی وەردەگرێت بۆ پاراستنی متمانەی کاریگەری ژینگەیی.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: WASTE OPERATIONS (چاودێری پاشماوە) */}
            {activeTab === 'wasteOps' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-right">
                
                {/* Active EV Routes Panel */}
                <div className="lg:col-span-2 bg-[#0b2112] border border-[#10b981]/15 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#10b981]/10 pb-4 mb-5">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Activity className="w-5 h-5 text-[#cca553]" />
                        چاودێری هێڵەکانی گواستنەوەی کارەبایی و دۆستی ژینگە
                      </h3>
                      <p className="text-xs text-slate-400">هێڵەکانی ئۆتۆمبێلی پاک بۆ گەیاندنی خێرا بۆ کۆگا فەرمییەکان</p>
                    </div>
                    <span className="text-[11px] font-mono bg-[#10b981]/10 text-emerald-400 border border-[#10b981]/20 px-3 py-1 rounded-full">
                      {routes.length} هێڵی چالاک بۆ ئەمرۆ
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {routes.map(route => (
                      <div key={route.id} className="bg-[#08170d] border border-slate-800 p-4.5 rounded-xl flex flex-col justify-between gap-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] text-[#cca553] font-bold">{route.id}</span>
                          <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-900 px-2 py-0.5 rounded font-bold">{route.status}</span>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-white mb-1">{route.name}</h4>
                          <p className="text-[11px] text-slate-400">شۆفێر: {route.driver}</p>
                          <p className="text-[11px] text-slate-400">کاتەکان: {route.frequency}</p>
                        </div>

                        <div className="border-t border-slate-850/60 pt-3 flex flex-col gap-2">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-400">ڕێژەی گەیشتوو بە تەن:</span>
                            <span className="text-emerald-400 font-bold font-mono">%{route.loadRatio}</span>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${route.loadRatio}%` }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audit Logger panel */}
                <div className="bg-[#0b2112] border border-[#10b981]/15 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5 border-b border-[#10b981]/10 pb-3">
                      <Sparkles className="w-4 h-4 text-[#cca553]" />
                      تۆماری ڕووداوەکانی سیستەم
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">
                      ئەم تۆمارانە ڕووداو مەیدانییەکانی لۆجیستیک دەخەنە بەردەم بەڕێوەبەری پڕۆژە لە هەموو ناوچەکان بە سەرکەوتوویی:
                    </p>

                    <div className="flex flex-col gap-2.5">
                      {auditLogs.map((log, index) => (
                        <div key={index} className="bg-[#08170d] border border-slate-950 p-3 rounded-lg text-xs leading-relaxed text-slate-300 flex gap-2">
                          <span className="text-emerald-400 font-bold font-mono">#{index+1}</span>
                          <span className="text-right">{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                    <button 
                      data-edit-control="true"
            onClick={() => setAuditLogs([`تۆماری دەستی: نوێکردنەوە لە کاتی ڕاستەقینەدا گەیشت لە کەمەربەندی ناوەڕاست.`, ...auditLogs.slice(0, 4)])}
                      className="text-[#cca553] text-[11px] font-bold hover:underline"
                    >
                      نوێکردنەوەی تۆمارە مەیدانییەکان
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: COMPOST PRODUCTION (بەرهەمهێنانی کۆمپوست) */}
            {activeTab === 'compost' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Active Composting Bioreactor Batches */}
                <div className="lg:col-span-2 bg-[#0b2112] border border-[#10b981]/15 rounded-2xl p-6 shadow-xl text-right">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#10b981]/10 pb-4 mb-5">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Flame className="w-5 h-5 text-[#cca553]" />
                        تۆماری دەستەکانی بەرهەمهێنانی کۆمپوستی بەپیت
                      </h3>
                      <p className="text-xs text-slate-400">چاودێری پلەی گەرمی و شێ لە پاشماوەکاندا بۆ دەرهێنانی باشترین پێکهاتە</p>
                    </div>
                    <span className="bg-[#10b981]/10 text-emerald-400 border border-[#10b981]/25 px-3 py-1 rounded-full text-xs font-mono font-bold">
                      {batches.length} دەستەی بەرهەم
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {batches.map(batch => (
                      <div key={batch.id} className="bg-[#08170d] border border-slate-800 p-4.5 rounded-xl flex flex-col justify-between gap-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-[#cca553] font-bold">{batch.id}</span>
                          <span className="text-[10px] text-emerald-400 bg-emerald-900/20 px-2 py-0.5 rounded font-bold">{batch.state}</span>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-white mb-2">{batch.name}</h4>
                          
                          <div className="grid grid-cols-3 gap-2 py-2.5 bg-[#0b2112]/40 border border-slate-800/40 rounded-xl px-2">
                            <div className="text-center">
                              <p className="text-[9px] text-slate-500 font-bold">ڕێژەی شێداری</p>
                              <p className="text-xs font-bold text-blue-300 font-mono mt-0.5 flex justify-center items-center gap-0.5">
                                <Droplets className="w-3 text-blue-400" />
                                {batch.moisture}%
                              </p>
                            </div>

                            <div className="text-center border-x border-slate-800">
                              <p className="text-[9px] text-slate-500 font-bold">گەرمی (°C)</p>
                              <p className="text-xs font-bold text-red-300 font-mono mt-0.5 flex justify-center items-center gap-0.5">
                                <Thermometer className="w-3 text-red-400" />
                                {batch.temp}°
                              </p>
                            </div>

                            <div className="text-center">
                              <p className="text-[9px] text-slate-500 font-bold">ماوەی مانەوە</p>
                              <p className="text-xs font-bold text-[#cca553] font-mono mt-0.5">
                                {batch.durationDays} ڕۆژ
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-850/60 pt-2.5 text-xs">
                          <span className="text-slate-400">تواناکە: <b className="text-white font-mono">{batch.compostTons} تەن</b></span>
                          <span className="text-[10px] font-mono bg-emerald-900/20 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                            {batch.certStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Batch Initiator Form */}
                <div className="bg-[#0b2112] border border-[#10b981]/15 rounded-2xl p-6 shadow-xl text-right flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-1.5 border-b border-[#10b981]/10 pb-3">
                      <Database className="w-4 h-4 text-[#cca553]" />
                      بەرهەمهێنان و بەپیتکردنی دەستەیەکی نوێ
                    </h4>
                    <p className="text-xs text-slate-400 mb-4">
                      ڕێکخستنی سەرەتای تێکەڵکردنی پاشماوە ی ئۆرگانیک لەگەڵ کوتراوی وشک بە سیستەمێکی زۆر ڕیک بۆ دارستانەکان.
                    </p>

                    <form onSubmit={handleCreateBatch} className="flex flex-col gap-4">
                      <div>
                        <label className="block text-[11px] text-slate-350 mb-1.5 font-bold">ناوی دەستە یان کۆدەکە</label>
                        <input 
                          type="text"
                          value={newBatchName}
                          onChange={(e) => setNewBatchName(e.target.value)}
                          placeholder="بۆ نموونە: کۆمپوستی شاخی سەفین دەستەی چوارەم"
                          className="w-full bg-[#08170d] text-white border border-[#10b981]/25 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#cca553] text-right"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-350 mb-1.5 font-bold">بڕی خەڵوز و وشکایی لێ بێت (تەن)</label>
                        <input 
                          type="number"
                          step="0.1"
                          value={newBatchCompost}
                          onChange={(e) => setNewBatchCompost(e.target.value)}
                          className="w-full bg-[#08170d] text-white border border-[#10b981]/25 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#cca553] text-center font-mono"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-emerald-900 to-[#125327] hover:from-emerald-800 hover:to-green-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow cursor-pointer transition-all flex items-center justify-center gap-1"
                      >
                        <Database className="w-4 h-4 text-[#cca553]" />
                        دەستپێکردنی گەرمی و چاوڕوانکردنی کۆمپوست
                      </button>
                    </form>

                    <AnimatePresence>
                      {showBatchSuccess && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-4 p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>دەستەکە بە سەرکەوتوویی دروستکرا! چیپس و هاندەرەکان خەریکی تێکەڵکردنی زیندەیین.</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-4 bg-[#08170d] border border-slate-900 p-3 rounded-xl text-[10px] text-slate-500 leading-normal">
                    پێوەری جۆر: تێکەڵەی کۆمپوستەکە بەپێی معایەرەکانی ڕێکخراوی نیشتمانی DCA و لێوردبینەوەی فەرمی جێگا کراوە.
                  </div>
                </div>

              </div>
            )}

            {/* TAB 5: SEVEN MILLION TREES IMPACT (کاریگەری ٧ ملیۆن درەخت) */}
            {activeTab === 'trees' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* SVG Geographical Projection Map */}
                <div className="lg:col-span-2 bg-[#0b2112] border border-[#10b981]/15 rounded-2xl p-6 shadow-xl text-right">
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#10b981]/10 pb-4 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <TreePine className="w-5 h-5 text-[#cca553]" />
                        نەخشەی دارستانەکان و کەمەربەندی سەوز
                      </h3>
                      <p className="text-xs text-slate-400">بۆ زانیاریی زیاتر دەربارەی شوێنەکانی چاندنی درەخت و ناوچەکانی کار، کرتە لەسەر نیشانەکانی نەخشەکە بکەن.</p>
                    </div>
                    <span className="text-[11px] font-mono bg-[#cca553]/15 text-[#cca553] border border-[#cca553]/30 px-3 py-1 rounded-full font-bold">
                      ئامانجی گشتی: ٧,٠٠٠,٠٠٠ درەخت
                    </span>
                  </div>
                  <GoogleProjectsMap
                    projects={treeProjects}
                    activeProjectId={activeProject.id}
                    onSelect={setActiveProject}
                  />
                </div>

                {/* Selected Project In-depth Panel */}
                <div className="bg-[#0b2112] border border-[#10b981]/15 rounded-2xl p-6 shadow-xl text-right flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#cca553] mb-1.5 uppercase tracking-wider flex items-center gap-1.5 border-b border-[#10b981]/10 pb-3">
                      <Compass className="w-4 h-4 text-[#cca553]" />
                      چاودێری زیندەیی: {activeProject.name}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {activeProject.description}
                    </p>

                    <div className="flex flex-col gap-3">
                      
                      <div className="bg-[#08170d] p-3 rounded-xl border border-slate-850 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-slate-400">ژمارەی نەمامی چێندراو</p>
                          <p className="text-xs text-white font-bold font-mono">{activeProject.treesSupported.toLocaleString()} درەخت</p>
                        </div>
                        <TreePine className="w-5 h-5 text-emerald-400" />
                      </div>

                      <div className="bg-[#08170d] p-3 rounded-xl border border-slate-850 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-slate-400">بڕی کۆمپوستی بەکارهێنراو</p>
                          <p className="text-xs text-white font-bold font-mono">{activeProject.compostReceived} تەن ئۆرگانیک</p>
                        </div>
                        <Database className="w-5 h-5 text-[#cca553]" />
                      </div>

                      <div className="bg-[#08170d] p-3 rounded-xl border border-slate-850 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-slate-400">ڕێژەی گەشەکردنی سەرکەوتووانە</p>
                          <p className="text-xs text-emerald-400 font-bold font-mono">%{activeProject.survivalRate}</p>
                        </div>
                        <Award className="w-5 h-5 text-[#cca553]" />
                      </div>

                      <div className="bg-[#08170d] p-3 rounded-xl border border-slate-850 text-right">
                        <p className="text-[10px] text-slate-400">سەرپەرشتیاری ناوچەیی</p>
                        <p className="text-xs text-white font-semibold flex items-center gap-1.5 mt-1">
                          <span className="w-5 h-5 rounded-full bg-emerald-900/40 border border-emerald-500/20 text-[#cca553] text-[9px] flex items-center justify-center">س</span>
                          {activeProject.supervisor}
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <p className="text-[10px] text-slate-500">
                      کرتە لە هێماکانی درەخت لەسەر نەخشەکە بکەن بۆ گۆڕینی زانیاری پاشماوە و کۆنترۆڵەکان.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 6: PARTNERS & ADVISORS (هاوبەشەکان و ڕاوێژکاران) */}
            {activeTab === 'advisors' && (
              <div className="flex flex-col gap-6 text-right">
                
                {/* Alliance Header */}
                <div className="bg-[#0b2112] border border-[#10b981]/15 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#cca553]" />
                    ئەندامانی ئەنجومەنی زانستی و هاوبەشە فەرمییەکان
                  </h3>
                  <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
                    تۆڕی کەمەربەندی سەوز لە پسپۆڕانی خاک و ژینگە، شارەزایانی گواستنەوە و هاوبەشە دامەزراوەییەکان پێکهاتووە؛ بۆ دیاریکردنی ڕێڕەوی زانستی و کارگێڕی پڕۆژەکە.
                  </p>
                </div>

                {/* Profiles Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {EXPERT_PROFILES.map((profile, idx) => (
                    <div key={idx} className="bg-[#0b2112] border border-[#10b981]/25 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-500 transition-all shadow-md group">
                      <div>
                        {/* Avatar Block */}
                        <div className="w-12 h-12 rounded-xl bg-[#08170d] border border-slate-800 text-[#cca553] font-mono text-sm font-bold flex items-center justify-center mb-3.5 group-hover:bg-[#0c2615]">
                          {profile.img}
                        </div>

                        <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded mb-2 bg-[#cca553]/10 text-[#cca553] border border-[#cca553]/20">
                          ڕاوێژکاری باڵا
                        </span>

                        <h4 className="text-xs font-bold text-white uppercase">{profile.name}</h4>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{profile.role}</p>
                        <p className="text-[10px] text-emerald-400 font-bold">{profile.field}</p>
                        
                        <p className="text-[11px] text-slate-420 leading-relaxed mt-2.5 border-t border-[#10b981]/10 pt-2.5">
                          {profile.bio}
                        </p>
                      </div>

                      <div className="text-[10px] text-slate-500 font-bold mt-3 uppercase border-t border-slate-850/60 pt-2">
                        {profile.institution}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit strategic advisors form */}
                <div className="bg-[#0b2112] border border-[#cca553]/20 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-[#cca553] uppercase">پێشنیار و داواکارییە زانستییەکان</h4>
                    <p className="text-[11px] text-slate-400 mt-1">بۆ ناردنی پێشنیار یان داواکاریی هاوکاری، تکایە پەیوەندی بە بەڕێوەبەری پڕۆژەوە بکەن.</p>
                  </div>
                  <button 
                    data-edit-control="true"
            onClick={() => alert("تکایە پەیوەندی بکەن بە لێژنەی هاوبەشی دەزگای روانگە و dca بۆ پرۆسەی فەرمی هاوکاران.")} 
                    className="bg-[#cca553] hover:bg-amber-600 text-slate-900 font-bold text-xs py-2 px-4 rounded-lg cursor-pointer transition-colors"
                  >
                    ناردنی داواکاری
                  </button>
                </div>

              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Note as requested */}
      <div className="mt-8 border-t border-[#10b981]/15 pt-5 text-center">
        <p className="text-xs text-[#cca553] bg-[#cca553]/10 border border-[#cca553]/25 rounded-xl py-3 px-5 inline-block font-bold">
          ئەم تەختەی چاودێرییە مۆدێلی کاری کەمەربەندی سەوز و داتای نمایشی قۆناغی هەڵسەنگاندن پیشان دەدات.
        </p>
      </div>

    </div>
  );
}
