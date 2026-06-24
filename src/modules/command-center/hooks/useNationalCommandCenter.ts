import { useState, useEffect, useCallback, useMemo } from 'react';
import { Language, Checkpoint } from '../../../types';
import { DemoModeController } from '../../../shared/demo/DemoModeController';

export function useNationalCommandCenter(lang: Language) {
  // Active User Profile Role Selection
  const [activeRole, setActiveRole] = useState<'pmo' | 'ministries' | 'customs' | 'border' | 'economic'>('pmo');

  // Selected Gate/Checkpoint for granular analysis
  const [selectedGate, setSelectedGate] = useState<Checkpoint>(DemoModeController.getCheckpoints()[0]);

  // Command Desk Live Simulations
  const [thermalSensors, setThermalSensors] = useState<Record<string, number>>({ 
    'Umm Qasr Sea': 42.1, 
    'Ibrahim Khalil Land': 37.4, 
    'Trebil Land': 39.5, 
    'Baghdad Air Cargo': 21.4 
  });
  
  const [fiberOpticsSpeed, setFiberOpticsSpeed] = useState<number>(982); // mbps
  
  const [unresolvedCrisisList, setUnresolvedCrisisList] = useState([
    { 
      id: 'c-01', 
      location: 'Trebil Border Compound', 
      type: 'Hazardous Chemicals', 
      desc: 'Custom cargo scanning reported 18 tons of chemical reagents without Ministry of Defense dual-use clearance stamps.', 
      severity: 'high', 
      timestamp: '10 mins ago', 
      actionRequired: 'Hold & Alert Military Police' 
    },
    { 
      id: 'c-02', 
      location: 'Umm Qasr Seaport', 
      type: 'Severe Vessel Backlog', 
      desc: 'High-speed Basra pilotage reported minor basin congestion due to tidal fluctuations; vessel queues expanded to 6 anchors.', 
      severity: 'medium', 
      timestamp: '34 mins ago', 
      actionRequired: 'Deploy AI Logistics Sequence' 
    },
    { 
      id: 'c-03', 
      location: 'Ibrahim Khalil Crossing', 
      type: 'Currency Outflow Risk', 
      desc: 'Central trade wire compliance flags value inflation of imported European machinery by 410% relative to market median.', 
      severity: 'critical', 
      timestamp: '1 hr ago', 
      actionRequired: 'Initiate CBI Interdiction Anchor' 
    }
  ]);

  const [crisisResolutionNote, setCrisisResolutionNote] = useState<Record<string, string>>({});
  const [pastResolutions, setPastResolutions] = useState<Array<{ id: string; location: string; action: string; note: string; timestamp: string }>>([]);

  // Live ticker metric simulation
  useEffect(() => {
    const liveCCTVTicker = setInterval(() => {
      setThermalSensors(prev => ({
        'Umm Qasr Sea': Number((42.0 + Math.random() * 0.4).toFixed(1)),
        'Ibrahim Khalil Land': Number((37.2 + Math.random() * 0.5).toFixed(1)),
        'Trebil Land': Number((39.3 + Math.random() * 0.4).toFixed(1)),
        'Baghdad Air Cargo': Number((21.2 + Math.random() * 0.3).toFixed(1))
      }));
      setFiberOpticsSpeed(() => Math.floor(980 + Math.random() * 10 - 5));
    }, 5000);
    return () => clearInterval(liveCCTVTicker);
  }, []);

  const handleResolveCrisis = useCallback((id: string, location: string) => {
    const note = crisisResolutionNote[id] || 'Sovereign override executed without comment.';
    setUnresolvedCrisisList(prev => prev.filter(c => c.id !== id));
    setPastResolutions(prev => [
      { id, location, action: 'Mitigation Program Initiated', note, timestamp: 'Just now by SECURE_JWT_098' },
      ...prev
    ]);
  }, [crisisResolutionNote]);

  const pmoRevenueData = useMemo(() => [
    { label: lang === 'ku' ? 'ئوم قەسر' : lang === 'ar' ? 'ميناء أم قصر' : 'Umm Qasr', value: 240 },
    { label: lang === 'ku' ? 'ئیبراهیم خەلیل' : lang === 'ar' ? 'إبراهيم الخليل' : 'Ibrahim Khalil', value: 310 },
    { label: lang === 'ku' ? 'ترێبێل' : lang === 'ar' ? 'طريبيل' : 'Trebil', value: 180 },
    { label: lang === 'ku' ? 'فڕۆکەخانەی بەغداد' : lang === 'ar' ? 'مطار بغداد' : 'Baghdad Airport', value: 120 },
    { label: lang === 'ku' ? 'باشماخ' : lang === 'ar' ? 'باشماخ' : 'Bashmakh', value: 95 }
  ], [lang]);

  const checkpointFlowNodes = useMemo(() => [
    { id: '1', label: lang === 'ku' ? 'پشکنینی مانیفێست' : lang === 'ar' ? 'فك التشفير' : 'Manifest Decrypt', status: 'passed' as const },
    { id: '2', label: lang === 'ku' ? 'هاوتاکردنی CBI' : lang === 'ar' ? 'طوابق البنك' : 'CBI Asset Match', status: 'passed' as const },
    { id: '3', label: lang === 'ku' ? 'تدقیقی مەترسیی زانیاری' : lang === 'ar' ? 'تدقيق المخاطر' : 'Gemini Risk Audit', status: 'active' as const },
    { id: '4', label: lang === 'ku' ? 'تۆمارکردن لە دەفتەر' : lang === 'ar' ? 'سلسلة الكتل' : 'Ledger Write', status: 'pending' as const },
    { id: '5', label: lang === 'ku' ? 'تەواوکردنی ڕێکارەکان' : lang === 'ar' ? 'تخليص الجمرك' : 'State Clearance', status: 'pending' as const }
  ], [lang]);

  const hourlyTrafficData = useMemo(() => [
    { label: '03:00Z', value: 32 },
    { label: '06:00Z', value: 55 },
    { label: '09:00Z', value: 92 },
    { label: '12:00Z', value: 81 },
    { label: '15:00Z', value: 44 },
    { label: '18:00Z', value: 15 }
  ], []);

  const scanningHeatmapData = useMemo(() => [
    { name: lang === 'ku' ? 'مەفرەزەی تیشکی ١' : lang === 'ar' ? 'مفرزة السونار ١' : 'Lane 01 Scanners', densities: [0.2, 0.4, 0.9, 0.8, 0.3, 0.1] },
    { name: lang === 'ku' ? 'مەفرەزەی تیشکی ٢' : lang === 'ar' ? 'مفرزة التشفير ٢' : 'Lane 02 Decryptors', densities: [0.1, 0.2, 0.5, 0.9, 0.6, 0.2] }
  ], [lang]);

  const customsClassifications = useMemo(() => [
    { 
      hs: '8471.3000', 
      label: lang === 'ku' ? 'حاسیبەی دەستی' : lang === 'ar' ? 'أجهزة حاسوب محمولة' : 'Portable Computers', 
      declared: '$41,200', 
      taxRate: '5%', 
      status: lang === 'ku' ? '١٠٠٪ هاوتا' : lang === 'ar' ? '١٠٠٪ مطابقة' : '100% Match', 
      node: 'DUHOK_GATE' 
    },
    { 
      hs: '8703.2300', 
      label: lang === 'ku' ? 'ئۆتۆمبێلی گواستنەوەی نەفەر' : lang === 'ar' ? 'سيارة صالون ركاب' : 'Motor Passenger Car', 
      declared: `$12,400 (${lang === 'ku' ? 'نرخاندنی کەم' : lang === 'ar' ? 'تقييم منخفض' : 'Low Valuation'})`, 
      taxRate: '15%', 
      status: lang === 'ku' ? '٦٢٪ پشکنین' : lang === 'ar' ? '٦٢٪ فحص فني' : '62% Check', 
      node: 'BASRA_SEAPORT' 
    },
    { 
      hs: '3004.9000', 
      label: lang === 'ku' ? 'پێکهاتەی دەرمانی پزیشکی' : lang === 'ar' ? 'مستحضرات وتركيبات طبية' : 'Medicinal formulation', 
      declared: `$148,000 (${lang === 'ku' ? 'ڕێککەوتنی تەندروستی' : lang === 'ar' ? 'إعفاء وزارة الصحة' : 'MOH Health Accord'})`, 
      taxRate: '0%', 
      status: lang === 'ku' ? '١٠٠٪ هاوتا' : lang === 'ar' ? '١٠٠٪ مطابقة' : '100% Match', 
      node: 'BAGHDAD_AIR' 
    }
  ], [lang]);

  return {
    activeRole,
    setActiveRole,
    selectedGate,
    setSelectedGate,
    thermalSensors,
    fiberOpticsSpeed,
    unresolvedCrisisList,
    crisisResolutionNote,
    setCrisisResolutionNote,
    pastResolutions,
    handleResolveCrisis,
    pmoRevenueData,
    checkpointFlowNodes,
    hourlyTrafficData,
    scanningHeatmapData,
    customsClassifications
  };
}
