import React, { useState, useEffect } from 'react';
import { 
  Shield, Landmark, Activity, Network, Layers, BadgeAlert, Cpu, AlertTriangle, 
  Play, RefreshCw, Key, KeySquare, Truck, UserCheck, Scale, Camera, FileCheck, CheckCircle2, Ban, Eye, Fingerprint, Info, Search
} from 'lucide-react';
import { Language } from '../../../types';
import { PageHeader, Badge, Button, Card } from '../../../ui';
import { useGovernment } from '../../../providers/GovernmentProvider';
import { useI18n } from '../../../providers/I18nProvider';

// Import Domain Services
import { BorderGateRegistry } from '../../../shared/border/BorderGateRegistry';
import { BorderTrafficEngine } from '../../../shared/border/BorderTrafficEngine';
import { BorderInspectionEngine } from '../../../shared/border/BorderInspectionEngine';
import { BorderRiskEngine } from '../../../shared/border/BorderRiskEngine';
import { BorderTelemetryEngine } from '../../../shared/border/BorderTelemetryEngine';
import { BorderPolicyEngine } from '../../../shared/border/BorderPolicyEngine';
import { BorderOperationsEngine } from '../../../shared/border/BorderOperationsEngine';
import { BorderAuditEngine } from '../../../shared/border/BorderAuditEngine';
import { BorderGate, BorderTrafficRecord, BorderInspectionRecord, BorderGateStatus, BorderGateType } from '../../../shared/border/BorderTypes';

interface BorderCommandCenterProps {
  lang: Language;
}

export default function BorderCommandCenter({ lang }: BorderCommandCenterProps) {
  const { activeContext } = useGovernment();
  const isRtl = lang !== 'en';

  // State Management
  const [ticker, setTicker] = useState<number>(0);
  const [activeSubTab, setActiveSubTab] = useState<'gates' | 'transit' | 'inspections' | 'telemetry' | 'alerts' | 'audit'>('gates');
  
  // Forms states
  const [selectedGateId, setSelectedGateId] = useState<string>('BG-IBRAHIMKHALIL');
  const [trafficType, setTrafficType] = useState<'VEHICLE' | 'CARGO' | 'PASSENGER'>('VEHICLE');
  const [vehiclePlate, setVehiclePlate] = useState<string>('');
  const [vehicleType, setVehicleType] = useState<'CAR' | 'TRUCK' | 'BUS'>('TRUCK');
  const [cargoVal, setCargoVal] = useState<string>('150000');
  const [cargoWeight, setCargoWeight] = useState<string>('24000');
  const [cargoCat, setCargoCat] = useState<string>('machinery');
  const [passengerNation, setPassengerNation] = useState<string>('IQ');
  const [passengerPassport, setPassengerPassport] = useState<string>('');

  // Inspection states
  const [inspectTrafficRecordId, setInspectTrafficRecordId] = useState<string>('');
  const [inspectType, setInspectType] = useState<'XRAY' | 'MANUAL' | 'BIOMETRIC' | 'DOCUMENT'>('XRAY');
  const [inspectCompliance, setInspectCompliance] = useState<'COMPLIANT' | 'NON_COMPLIANT' | 'SUSPICIOUS'>('COMPLIANT');
  const [inspectFinesUSD, setInspectFinesUSD] = useState<string>('0');
  const [inspectNotes, setInspectNotes] = useState<string>('');

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { t } = useI18n();

  // Trigger pulse simulation to show live dynamic behavior
  const handlePulseSimulator = () => {
    BorderOperationsEngine.triggerActivityPulse('| ' + t('common.nationalPulse'));
    setTicker(prev => prev + 1);
  };

  // Kurdish localizers dictionary
  const getKurdishLabel = (key: string, enVal: string) => {
    return t(`common.${key}`);
  };

  // Retrieve current statistics
  const kpis = BorderOperationsEngine.getOperationsKPIs();

  // Retrieve data from services
  const rawGates = BorderGateRegistry.getGates();
  const rawTraffic = BorderTrafficEngine.getTraffic();
  const rawInspections = BorderInspectionEngine.getInspections();
  const rawAlerts = BorderRiskEngine.getAlerts();
  const rawSensors = BorderTelemetryEngine.getSensors();
  const rawPolicies = BorderPolicyEngine.getPolicies();
  const rawLedger = BorderAuditEngine.getLedger();

  // FILTER LOGIC - Sovereign Data Separation & Leakage Protection Rules
  // Federal Iraq context -> See FEDERAL and JOINT
  // KRG context -> See KRG and JOINT
  // Joint operations context -> See ALL
  const isAllowedByContext = (entityJurisdiction: 'FEDERAL' | 'KRG' | 'JOINT') => {
    if (activeContext === 'FEDERAL_IRAQ') {
      return entityJurisdiction === 'FEDERAL' || entityJurisdiction === 'JOINT';
    }
    if (activeContext === 'KURDISTAN_REGION') {
      return entityJurisdiction === 'KRG' || entityJurisdiction === 'JOINT';
    }
    return true; // JOINT_OPERATIONS sees everything
  };

  const filteredGates = rawGates.filter(g => isAllowedByContext(g.jurisdiction) && 
    (searchQuery === '' || g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const filteredTraffic = rawTraffic.filter(t => isAllowedByContext(t.jurisdiction)).reverse();
  const filteredInspections = rawInspections.filter(i => isAllowedByContext(i.jurisdiction)).reverse();
  const filteredAlerts = rawAlerts.filter(a => isAllowedByContext(a.jurisdiction)).reverse();
  const filteredSensors = rawSensors.filter(s => isAllowedByContext(s.jurisdiction));
  const filteredLedger = rawLedger.filter(l => isAllowedByContext(l.jurisdiction)).reverse();

  // Action Handlers
  const handleToggleGateStatus = (gateId: string, currentStatus: BorderGateStatus) => {
    const nextStatusMap: Record<BorderGateStatus, BorderGateStatus> = {
      'ACTIVE': 'SUSPENDED',
      'SUSPENDED': 'MAINTENANCE',
      'MAINTENANCE': 'CLOSED',
      'CLOSED': 'ACTIVE'
    };
    const nextStatus = nextStatusMap[currentStatus];
    BorderGateRegistry.updateGateStatus(gateId, nextStatus, '| ' + t('common.nationalPulse'));
    setTicker(prev => prev + 1);
  };

  const handleRegisterTransitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetGate = rawGates.find(g => g.id === selectedGateId);
    if (!targetGate) return;

    BorderTrafficEngine.recordTraffic({
      gateId: selectedGateId,
      trafficType,
      vehiclePlate: trafficType === 'VEHICLE' ? vehiclePlate : undefined,
      vehicleType: trafficType === 'VEHICLE' ? vehicleType : undefined,
      cargoDeclarationValueUSD: trafficType === 'CARGO' ? parseFloat(cargoVal) : undefined,
      cargoWeightKg: trafficType === 'CARGO' ? parseFloat(cargoWeight) : undefined,
      cargoCategory: trafficType === 'CARGO' ? cargoCat : undefined,
      passengerNationality: trafficType === 'PASSENGER' ? passengerNation : undefined,
      passengerPassportHash: trafficType === 'PASSENGER' ? (passengerPassport ? `passport_sha256_${passengerPassport}` : 'unspecified') : undefined,
      jurisdiction: targetGate.jurisdiction,
      ownership: targetGate.ownership,
      authority: targetGate.authority,
      visibility: targetGate.visibility,
      accessPolicy: targetGate.accessPolicy,
      actionApplied: 'CLEAR'
    }, '| ' + t('common.civPaxCenter'));

    // Reset inputs
    setVehiclePlate('');
    setPassengerPassport('');
    setTicker(prev => prev + 1);
  };

  const handlePerformInspectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetGate = rawGates.find(g => g.id === selectedGateId);
    if (!targetGate) return;

    BorderInspectionEngine.performInspection({
      gateId: selectedGateId,
      trafficRecordId: inspectTrafficRecordId || undefined,
      inspectorName: '| ' + t('common.intlInspector'),
      inspectionType: inspectType,
      complianceStatus: inspectCompliance,
      fineImposedUSD: parseFloat(inspectFinesUSD) || 0,
      notes: inspectNotes || '| ' + t('common.normalInspection'),
      jurisdiction: targetGate.jurisdiction,
      ownership: targetGate.ownership,
      authority: targetGate.authority,
      visibility: targetGate.visibility,
      accessPolicy: targetGate.accessPolicy
    }, '| ' + t('common.qualityInspectionCommittee'));

    setInspectTrafficRecordId('');
    setInspectFinesUSD('0');
    setInspectNotes('');
    setTicker(prev => prev + 1);
  };

  const handleResolveAlert = (alertId: string) => {
    BorderRiskEngine.resolveAlert(alertId, '| ' + t('common.antiSmugglingRoom'));
    setTicker(prev => prev + 1);
  };

  const handlePolicyToggle = (code: string) => {
    BorderPolicyEngine.togglePolicy(code, '| ' + t('common.economicProtectionCommittee'));
    setTicker(prev => prev + 1);
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in text-start">
      
      {/* Page Header */}
      <PageHeader
        icon={<Shield className="text-[#cca553] w-6 h-6" />}
        title={t('common.borderOpsTitle')}
        description={t('common.borderOpsDesc')}
        status={
          <div className="flex items-center gap-2">
            <Badge variant="teal">{activeContext}</Badge>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] text-slate-400 font-mono">INTEGRITY SECURE</span>
          </div>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button 
              onClick={handlePulseSimulator}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#0d1b2a] shadow font-bold text-xs flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>{t('common.pulseActivity')}</span>
            </Button>
          </div>
        }
      />

      {/* KPI METRICS SHELF */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        
        <div className="bg-[#111e2e] border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
          <span className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">{getKurdishLabel('activeGates', 'Active Gates')}</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-emerald-400">{kpis.activeGatesCount}</span>
            <span className="text-xs text-slate-500">/ {kpis.totalGatesCount}</span>
          </div>
          <span className="text-[9px] text-slate-500 font-mono mt-1">OPERATIONAL CHANNELS</span>
        </div>

        <div className="bg-[#111e2e] border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
          <span className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">{getKurdishLabel('transitRecords', 'Transit Records')}</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-slate-100">{kpis.totalTransitRecords}</span>
            <span className="text-xs text-teal-400 font-mono">+Live</span>
          </div>
          <span className="text-[9px] text-slate-500 font-mono mt-1">VEHICLES/PASSPORT LOGS</span>
        </div>

        <div className="bg-[#111e2e] border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
          <span className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">{getKurdishLabel('cargoValuation', 'Cargo Valuation')}</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-bold text-amber-400">${(kpis.totalCargoValueUSD / 1000000).toFixed(2)}M</span>
          </div>
          <span className="text-[9px] text-slate-500 font-mono mt-1">SOVEREIGN TRADE INPUT</span>
        </div>

        <div className="bg-[#111e2e] border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
          <span className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">{getKurdishLabel('complianceRate', 'Customs Compliance')}</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-teal-400">{kpis.compliantInspectionRate}%</span>
          </div>
          <span className="text-[9px] text-slate-500 font-mono mt-1">COMPLIANCE SAMPLING</span>
        </div>

        <div className="bg-[#111e2e] border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
          <span className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">{getKurdishLabel('totalFines', 'Fines Enforced')}</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-red-400">${kpis.totalFinesUSD.toLocaleString()}</span>
          </div>
          <span className="text-[9px] text-slate-500 font-mono mt-1">EVASION PENALTIES</span>
        </div>

        <div className="bg-[#111e2e] border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
          <span className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">{getKurdishLabel('compoundRiskIndex', 'Composite Risk')}</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className={`text-2xl font-bold ${kpis.compositeRiskIndex < 25 ? 'text-emerald-400' : kpis.compositeRiskIndex < 50 ? 'text-amber-400' : 'text-red-500'}`}>{kpis.compositeRiskIndex}</span>
            <span className="text-[10px] text-slate-400 font-mono">Index</span>
          </div>
          <span className="text-[9px] text-slate-500 font-mono mt-1">INTELLIGENCE FACTOR</span>
        </div>

      </div>

      {/* REAL-TIME INFORMATION STRAP ON SOVEREIGN DATA LEAKAGE PREVENTION */}
      <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/80 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-500 shrink-0" />
          <p className="text-xs text-slate-400 font-mono">
            {t('common.securityProtocol')} <b className="text-amber-500">{t('common.levelJointCooperative')}</b>. {t('common.onlyShowingRecords')} <b className="text-teal-400">{activeContext === 'FEDERAL_IRAQ' ? 'FEDERAL/JOINT' : activeContext === 'KURDISTAN_REGION' ? 'KRG/JOINT' : 'ALL_COOPERATIVE'}</b>. {t('common.dbIsolationEnforced')}
          </p>
        </div>
      </div>

      {/* LAYOUT GRID: Left 2 column control board / Right 1 column regulatory policy & alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COMPONENT BOARD - 2 COLS */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* NAV SUB-TABS */}
          <div className="bg-[#111e2e] py-1 px-2 rounded-lg border border-slate-800 flex flex-wrap gap-1">
            {[
              { id: 'gates', label: getKurdishLabel('registeredGates', 'Registered Gates'), icon: Landmark },
              { id: 'transit', label: getKurdishLabel('transitLog', 'Transit Logs'), icon: Truck },
              { id: 'inspections', label: getKurdishLabel('inspections', 'Customs Inspections'), icon: FileCheck },
              { id: 'telemetry', label: getKurdishLabel('telemetryDevices', 'Sensory Telemetry'), icon: Camera },
              { id: 'audit', label: getKurdishLabel('identityAuditChain', 'Audit Ledger Chain'), icon: KeySquare }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeSubTab === tab.id
                    ? 'bg-[#1a2c42] text-white border-b-2 border-amber-500 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5 text-amber-500" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ACTIVE SUBTAB PANEL */}
          <Card className="bg-[#111e2e]/90 border border-slate-800/80 p-5 rounded-xl shadow-md min-h-[350px]">
            
            {/* SUB-TAB 1: GATES REGULATION */}
            {activeSubTab === 'gates' && (
              <div className="flex flex-col gap-4">
                
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{getKurdishLabel('registeredGates', 'Gateway Checkpoint Sovereignty Matrix')}</h3>
                    <p className="text-xs text-slate-400">National registration database of all international land gateways, seaport docks, and airport transit security hubs.</p>
                  </div>
                  <div className="relative w-48 font-mono">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder={t('common.searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950 text-xs text-slate-300 border border-slate-800 rounded-lg pl-8.5 pr-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto w-full border border-slate-800/80 rounded-lg bg-slate-950/60 mt-2">
                  <table className="w-full text-xs text-left" dir={isRtl ? 'rtl' : 'ltr'}>
                    <thead className="bg-[#101c2a] text-slate-400 font-mono border-b border-slate-800 py-2.5">
                      <tr>
                        <th className="px-4 py-3 text-start">ID</th>
                        <th className="px-4 py-3 text-start">{getKurdishLabel('gateName', 'Gate / Location')}</th>
                        <th className="px-4 py-3 text-start">{getKurdishLabel('gateType', 'Type')}</th>
                        <th className="px-4 py-3 text-start">{getKurdishLabel('jurisdiction', 'Jurisdiction')}</th>
                        <th className="px-4 py-3 text-start">{getKurdishLabel('utilization', 'Utilization')}</th>
                        <th className="px-4 py-3 text-start">{getKurdishLabel('riskScore', 'Risk')}</th>
                        <th className="px-4 py-3 text-start">{getKurdishLabel('status', 'Status')}</th>
                        <th className="px-4 py-3 text-start">{getKurdishLabel('actions', 'Oversight')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium font-sans">
                      {filteredGates.map(gate => (
                        <tr key={gate.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="px-4 py-3 font-mono text-slate-500 text-[11px]">{gate.id}</td>
                          <td className="px-4 py-3 text-start">
                            <div className="font-semibold text-slate-200">{gate.name}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{gate.authority}</div>
                          </td>
                          <td className="px-4 py-3 text-start">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono tracking-wider font-bold">
                              {gate.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-start">
                            <Badge variant={gate.jurisdiction === 'JOINT' ? 'gold' : gate.jurisdiction === 'KRG' ? 'teal' : 'default'}>
                              {gate.jurisdiction}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-start w-32">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-slate-400 font-mono w-7">{gate.currentUtilization}%</span>
                              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: `${gate.currentUtilization}%` }}></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-start">
                            <span className={`font-mono text-xs font-[800] ${gate.currentRiskScore < 20 ? 'text-emerald-400' : gate.currentRiskScore < 50 ? 'text-amber-400' : 'text-red-500'}`}>
                              {gate.currentRiskScore}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-start">
                            <Badge variant={
                              gate.status === 'ACTIVE' ? 'teal' :
                              gate.status === 'SUSPENDED' ? 'outline' :
                              gate.status === 'MAINTENANCE' ? 'gold' : 'danger'
                            }>
                              {gate.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-start">
                            <Button 
                              onClick={() => handleToggleGateStatus(gate.id, gate.status)}
                              className="bg-slate-900 border border-slate-800 text-[10px] py-1 px-2 text-slate-300 hover:text-white hover:bg-slate-800 font-mono font-bold whitespace-nowrap cursor-pointer"
                            >
                              ROTATE STATE
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* CAPACITY SUMMARY INFO BOX */}
                <div className="bg-[#101b2a] border border-slate-800 rounded-lg p-3.5 mt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-400">
                      <b>{t('common.fedSovereigntyRule')}</b> {t('common.borderTetherText')}
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* SUB-TAB 2: TRANSIT LOG AND RECORDING FORM */}
            {activeSubTab === 'transit' && (
              <div className="flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* LEFT Column: Real-time Register Form */}
                  <div className="col-span-1 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                    <span className="text-[#cca553] text-[10px] uppercase font-mono block tracking-wider">Transit Registry Console</span>
                    <h4 className="text-sm font-semibold text-slate-200 mt-0.5 mb-3">{getKurdishLabel('registerTransit', 'Register Trade / Pax')}</h4>
                    
                    <form onSubmit={handleRegisterTransitSubmit} className="flex flex-col gap-3 font-mono text-[11px] text-start">
                      
                      <div className="flex flex-col gap-1">
                        <label className="text-slate-400 text-[10px] uppercase">{getKurdishLabel('gateName', 'Select Checkpoint')}</label>
                        <select 
                          value={selectedGateId}
                          onChange={(e) => setSelectedGateId(e.target.value)}
                          className="bg-[#0e1723] text-slate-200 border border-slate-800 rounded px-2 py-1.5 focus:outline-none"
                        >
                          {filteredGates.map(g => (
                            <option key={g.id} value={g.id}>{g.name.replace('| ', '')}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-slate-400 text-[10px] uppercase">{getKurdishLabel('gateType', 'Transit Type')}</label>
                        <div className="flex gap-1 bg-[#101b27] p-1 rounded border border-slate-800">
                          {['VEHICLE', 'CARGO', 'PASSENGER'].map(tType => (
                            <button
                              key={tType}
                              type="button"
                              onClick={() => setTrafficType(tType as any)}
                              className={`flex-1 text-[10px] py-1 rounded text-center font-bold ${
                                trafficType === tType ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-[#0d1b2a]' : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {tType}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* CONDITIONALLY RENDER PARAMS BASED ON TYPE */}
                      {trafficType === 'VEHICLE' && (
                        <div className="flex flex-col gap-3 animate-fade-in">
                          <div className="flex flex-col gap-1">
                            <label className="text-slate-400 text-[10px] uppercase">Vehicle Plate Code</label>
                            <input
                              type="text"
                              value={vehiclePlate}
                              onChange={(e) => setVehiclePlate(e.target.value)}
                              placeholder="IQ-ERB-99120"
                              className="bg-[#0e1723] text-slate-200 border border-slate-800 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-slate-400 text-[10px] uppercase">Classification</label>
                            <div className="flex gap-1">
                              {['CAR', 'TRUCK', 'BUS'].map(v => (
                                <button
                                  key={v}
                                  type="button"
                                  onClick={() => setVehicleType(v as any)}
                                  className={`flex-1 py-1 rounded border border-slate-800 text-[9px] text-center font-semibold uppercase font-mono ${
                                    vehicleType === v ? 'bg-slate-800 text-slate-100' : 'text-slate-500 hover:text-slate-300'
                                  }`}
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {trafficType === 'CARGO' && (
                        <div className="flex flex-col gap-3 animate-fade-in">
                          <div className="flex flex-col gap-1">
                            <label className="text-slate-400 text-[10px] uppercase">Declaration Value (USD)</label>
                            <input
                              type="number"
                              value={cargoVal}
                              onChange={(e) => setCargoVal(e.target.value)}
                              className="bg-[#0e1723] text-slate-200 border border-slate-800 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-slate-400 text-[10px] uppercase">Cargo Weight (KG)</label>
                            <input
                              type="number"
                              value={cargoWeight}
                              onChange={(e) => setCargoWeight(e.target.value)}
                              className="bg-[#0e1723] text-slate-200 border border-slate-800 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-slate-400 text-[10px] uppercase">Category Class</label>
                            <select
                              value={cargoCat}
                              onChange={(e) => setCargoCat(e.target.value)}
                              className="bg-[#0e1723] text-slate-200 border border-slate-800 rounded px-2.5 py-1.5 focus:outline-none"
                            >
                              <option value="machinery">{'| ' + t('common.machineryGenerators')}</option>
                              <option value="minerals">{'| ' + t('common.mineralRawMaterials')}</option>
                              <option value="poultry">{'| ' + t('common.poultryFoodstuffs')}</option>
                              <option value="textiles">{'| ' + t('common.textilesApparel')}</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {trafficType === 'PASSENGER' && (
                        <div className="flex flex-col gap-2 animate-fade-in">
                          <div className="flex flex-col gap-1">
                            <label className="text-slate-400 text-[10px] uppercase">Nationality Code</label>
                            <input
                              type="text"
                              value={passengerNation}
                              onChange={(e) => setPassengerNation(e.target.value)}
                              placeholder="IQ, TR, DE, US"
                              maxLength={2}
                              className="bg-[#0e1723] text-slate-200 border border-slate-800 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-slate-400 text-[10px] uppercase">Passport Identification ID No.</label>
                            <input
                              type="text"
                              value={passengerPassport}
                              onChange={(e) => setPassengerPassport(e.target.value)}
                              placeholder="A0918721"
                              className="bg-[#0e1723] text-slate-200 border border-slate-800 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                              required
                            />
                          </div>
                        </div>
                      )}

                      <Button 
                        type="submit" 
                        className="bg-[#cca553] text-[#0d1b2a] hover:bg-amber-500 w-full mt-2 font-bold cursor-pointer text-xs"
                      >
                        LOG PORT ENTRY
                      </Button>

                    </form>
                  </div>

                  {/* RIGHT 2-Columns: Dynamic lists of log of transits */}
                  <div className="md:col-span-2 flex flex-col gap-3">
                    <h4 className="text-sm font-semibold text-slate-200">National Transit Ledger Records</h4>
                    <p className="text-xs text-slate-400 -mt-1.5">Sequential logs of recorded traffic entries. Action buttons copy IDs to clipboard for customs inspection execution.</p>
                    
                    <div className="overflow-y-auto max-h-[300px] border border-slate-800 rounded-lg p-3 bg-slate-950/40">
                      <div className="flex flex-col gap-2">
                        {filteredTraffic.map(record => (
                          <div key={record.id} className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center justify-between gap-4 hover:border-slate-700 transition-all text-xs font-mono">
                            <div className="flex items-start gap-2.5 text-start">
                              <div className="bg-slate-850 p-2 rounded border border-slate-800 text-amber-500">
                                {record.trafficType === 'PASSENGER' ? <UserCheck className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-slate-100 font-bold text-[11px]">{record.id}</span>
                                  <Badge variant={record.jurisdiction === 'JOINT' ? 'gold' : record.jurisdiction === 'KRG' ? 'teal' : 'default'}>{record.jurisdiction}</Badge>
                                  <span className="text-[10px] text-slate-500">{new Date(record.timestamp).toLocaleTimeString()}</span>
                                </div>
                                <div className="text-[11px] text-slate-300 mt-1">
                                  {record.trafficType === 'VEHICLE' && `Plate: ${record.vehiclePlate} (${record.vehicleType})`}
                                  {record.trafficType === 'CARGO' && `${record.cargoCategory?.replace('| ', '') || 'Cargo'} - Worth $${record.cargoDeclarationValueUSD?.toLocaleString()} (${record.cargoWeightKg?.toLocaleString()} Kg)`}
                                  {record.trafficType === 'PASSENGER' && `Pax: Nationality ${record.passengerNationality} - Passport hash ${record.passengerPassportHash?.substring(0, 16)}...`}
                                </div>
                                <div className="text-[10px] text-[#cca553] mt-0.5">{record.authority}</div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1.5 shrink-0">
                              <span className={`text-[10px] font-bold ${record.riskScore < 15 ? 'text-emerald-400' : record.riskScore < 30 ? 'text-amber-400' : 'text-red-400'}`}>
                                RISK: {record.riskScore}
                              </span>
                              <Button 
                                onClick={() => {
                                  setInspectTrafficRecordId(record.id);
                                  setSelectedGateId(record.gateId);
                                  setActiveSubTab('inspections');
                                }} 
                                className="bg-slate-950 hover:bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 border border-slate-800 font-bold cursor-pointer whitespace-nowrap"
                              >
                                INSPECT
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* SUB-TAB 3: CUSTOMS INSPECTION SYSTEM */}
            {activeSubTab === 'inspections' && (
              <div className="flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* LEFT Column: Perform Inspection form */}
                  <div className="col-span-1 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                    <span className="text-[#cca553] text-[10px] uppercase font-mono block tracking-wider">Customs Examination Deck</span>
                    <h4 className="text-sm font-semibold text-slate-200 mt-0.5 mb-3">{getKurdishLabel('performInspection', 'Create Inspection Note')}</h4>
                    
                    <form onSubmit={handlePerformInspectionSubmit} className="flex flex-col gap-3 font-mono text-[11px] text-start">
                      
                      <div className="flex flex-col gap-1">
                        <label className="text-slate-400 text-[10px] uppercase">Select Gate</label>
                        <select 
                          value={selectedGateId}
                          onChange={(e) => setSelectedGateId(e.target.value)}
                          className="bg-[#0e1723] text-slate-200 border border-slate-800 rounded px-2 py-1.5 focus:outline-none"
                        >
                          {filteredGates.map(g => (
                            <option key={g.id} value={g.id}>{g.name.replace('| ', '')}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-slate-400 text-[10px] uppercase">Traffic Record ID (Optional)</label>
                        <input
                          type="text"
                          value={inspectTrafficRecordId}
                          onChange={(e) => setInspectTrafficRecordId(e.target.value)}
                          placeholder="TRF-VEH-12345"
                          className="bg-[#0e1723] text-slate-200 border border-slate-800 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-slate-400 text-[10px] uppercase">Inspection Class</label>
                        <select
                          value={inspectType}
                          onChange={(e) => setInspectType(e.target.value as any)}
                          className="bg-[#0e1723] text-slate-200 border border-slate-800 rounded px-2 py-1.5 focus:outline-none"
                        >
                          <option value="XRAY">X-RAY CARGO SCANNER</option>
                          <option value="MANUAL">MANUAL STRAP INSPECTION</option>
                          <option value="BIOMETRIC">BIOMETRIC PAX VERIFY</option>
                          <option value="DOCUMENT">DOC/INVOICE RE-AUDIT</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-slate-400 text-[10px] uppercase">Compliance Status</label>
                        <select
                          value={inspectCompliance}
                          onChange={(e) => setInspectCompliance(e.target.value as any)}
                          className="bg-[#0e1723] text-slate-200 border border-slate-800 rounded px-2 py-1.5 focus:outline-none"
                        >
                          <option value="COMPLIANT">COMPLIANT (APPROVED)</option>
                          <option value="SUSPICIOUS">SUSPICIOUS (HOLD)</option>
                          <option value="NON_COMPLIANT">NON-COMPLIANT (FINED/CANCELED)</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-slate-400 text-[10px] uppercase">Fine Imposed (USD)</label>
                        <input
                          type="number"
                          value={inspectFinesUSD}
                          onChange={(e) => setInspectFinesUSD(e.target.value)}
                          className="bg-[#0e1723] text-slate-200 border border-slate-800 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-slate-400 text-[10px] uppercase">Examination Notes / Details</label>
                        <textarea
                          rows={2}
                          value={inspectNotes}
                          onChange={(e) => setInspectNotes(e.target.value)}
                          placeholder={'| ' + t('common.normalInspection')}
                          className="bg-[#0e1723] text-slate-200 border border-slate-800 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="bg-[#cca553] text-[#0d1b2a] hover:bg-amber-500 w-full mt-2 font-bold cursor-pointer text-xs"
                      >
                        LOG EXAMINATION RECORD
                      </Button>

                    </form>
                  </div>

                  {/* RIGHT 2-Columns: History log representing Inspections in the country */}
                  <div className="md:col-span-2 flex flex-col gap-3">
                    <h4 className="text-sm font-semibold text-slate-200">Historical Customs Inspections & Detections</h4>
                    <p className="text-xs text-slate-400 -mt-1.5">Official audit register of custom inspections, radiation pings, and smuggling prevention investigations.</p>
                    
                    <div className="overflow-y-auto max-h-[300px] border border-slate-800 rounded-lg p-3 bg-slate-950/40">
                      <div className="flex flex-col gap-2">
                        {filteredInspections.map(insp => (
                          <div key={insp.id} className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center justify-between gap-4 hover:border-slate-700 transition-all text-xs font-mono">
                            <div className="flex items-start gap-2.5 text-start">
                              <div className="bg-slate-850 p-2 rounded border border-slate-800 text-teal-400">
                                {insp.inspectionType === 'XRAY' ? <Cpu className="w-4 h-4" /> : <FileCheck className="w-4 h-4" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-slate-100 font-bold text-[11px]">{insp.id}</span>
                                  {insp.trafficRecordId && (
                                    <span className="text-[9px] text-[#cca553] bg-[#cca553]/10 px-1 py-0.2 rounded border border-[#cca553]/20">
                                      TRAFFIC ID: {insp.trafficRecordId}
                                    </span>
                                  )}
                                  <Badge variant={insp.complianceStatus === 'COMPLIANT' ? 'teal' : insp.complianceStatus === 'SUSPICIOUS' ? 'gold' : 'danger'}>
                                    {insp.complianceStatus}
                                  </Badge>
                                </div>
                                <div className="text-[11px] text-slate-300 mt-1 uppercase">
                                  <b>TYPE: {insp.inspectionType}</b> | Notes: <span className="text-slate-400 font-sans">{insp.notes}</span>
                                </div>
                                <div className="text-[10px] text-slate-500 mt-1">
                                  Inspector: {insp.inspectorName} ({insp.authority})
                                </div>
                              </div>
                            </div>
                            {insp.fineImposedUSD > 0 && (
                              <div className="bg-red-950/40 border border-red-500/20 text-red-400 font-bold p-2 rounded text-end shrink-0 select-all">
                                <span className="text-[8px] uppercase block tracking-wider text-red-500">Fine Imposed</span>
                                <span>${insp.fineImposedUSD.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* SUB-TAB 4: DEVICES SENSORS AND TELEMETRY */}
            {activeSubTab === 'telemetry' && (
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-100">Live Sensory IoT Network & Camera Telemetry</h3>
                  <p className="text-xs text-slate-400">Integrated automated hardware readers scanning plate numbers, ionizing radioactive leakage, and container weight dimensions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {filteredSensors.map(sensor => {
                    const sensorGate = rawGates.find(g => g.id === sensor.gateId);
                    return (
                      <div key={sensor.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3 text-start">
                        <div className="bg-slate-900 border border-slate-800 p-2.5 rounded text-amber-500 mt-0.5 shrink-0">
                          {sensor.sensorType === 'CCTV' || sensor.sensorType === 'ANPR_CAMERA' ? <Camera className="w-5 h-5" /> : <Scale className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2.5">
                            <span className="text-xs font-mono font-bold text-slate-300">{sensor.id} ({sensor.sensorType})</span>
                            <Badge variant={sensor.sensorStatus === 'ONLINE' ? 'teal' : 'danger'}>{sensor.sensorStatus}</Badge>
                          </div>
                          <div className="text-xs text-slate-400 mt-1 font-sans font-medium">
                            Location Checkpoint: <b>{sensorGate ? sensorGate.name.replace('| ', '') : sensor.gateId}</b>
                          </div>
                          <div className="text-[11px] text-emerald-400 font-mono mt-1.5 p-1 px-2 border border-emerald-500/10 rounded bg-emerald-950/20 truncate">
                            Live data: {sensor.reading}
                          </div>
                          <div className="text-[9px] text-slate-500 font-mono text-end mt-1 font-bold">
                            SYNC PING: {new Date(sensor.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SUB-TAB 5: IMMUTABLE AUDIT TRAIL SHA256 BLOCKCHAIN-LIKE LEDGER */}
            {activeSubTab === 'audit' && (
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-100">Immutable Cryptographic Audit trail (SHA-256 Chain)</h3>
                  <p className="text-xs text-slate-400">Sovereign electronic block-hashes safeguarding transaction integrity and preventing tampering or modification of customs records.</p>
                </div>

                <div className="overflow-x-auto w-full border border-slate-800/80 rounded-lg bg-slate-950/60 mt-2">
                  <table className="w-full text-xs text-left" dir={isRtl ? 'rtl' : 'ltr'}>
                    <thead className="bg-[#101c2a] text-slate-400 font-mono border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-2.5 text-start">{getKurdishLabel('auditHash', 'Hash Pointer')}</th>
                        <th className="px-4 py-2.5 text-start">Operation Action</th>
                        <th className="px-4 py-2.5 text-start">Actor</th>
                        <th className="px-4 py-2.5 text-start">Oversight Boundary</th>
                        <th className="px-4 py-2.5 text-start">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-[10px] text-slate-300">
                      {filteredLedger.map((block, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                          <td className="px-4 py-2 text-start select-all text-amber-500 font-bold font-mono tracking-xs w-48 truncate max-w-[190px]">
                            {block.hash}
                          </td>
                          <td className="px-4 py-2 text-start text-emerald-400 uppercase font-bold tracking-tight">
                            {block.action}
                          </td>
                          <td className="px-4 py-2 text-start text-slate-400">
                            {block.actor}
                          </td>
                          <td className="px-4 py-2 text-start">
                            <Badge variant={block.jurisdiction === 'JOINT' ? 'gold' : block.jurisdiction === 'KRG' ? 'teal' : 'default'}>
                              {block.jurisdiction}
                            </Badge>
                          </td>
                          <td className="px-4 py-2 text-start text-slate-300 font-sans font-medium text-[11px] max-w-xs truncate">
                            {block.details}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </Card>

        </div>

        {/* RIGHT Column: Policies & Active Risk Alerts */}
        <div className="col-span-1 flex flex-col gap-6 text-start">
          
          {/* COMPONENT A: ACTIVE RISK ALERTS */}
          <Card className="bg-slate-950/90 border border-slate-800/90 p-5 rounded-xl shadow">
            
            <div className="flex justify-between items-center mb-3">
              <span className="flex items-center gap-1.5 text-xs text-red-500 font-bold font-mono uppercase tracking-wide animate-pulse">
                <BadgeAlert className="w-4 h-4 text-red-500" />
                <span>RISK RADAR CENTER</span>
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase font-mono">LIVE EVALUATING</span>
            </div>

            <h3 className="text-base font-bold text-slate-100">{getKurdishLabel('riskAlerts', 'Anomalies & Investigations')}</h3>
            <p className="text-xs text-slate-400 mt-1">Real-time alerts flagged by ionizing radiation systems, invoice valuation deep learning models, and security networks.</p>

            <div className="flex flex-col gap-3.5 mt-4 max-h-[350px] overflow-y-auto pr-1">
              {filteredAlerts.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-slate-800 rounded-lg bg-slate-900/10">
                  <span className="text-xs text-slate-600 font-mono">NO ACTIVE THREATS PENDING</span>
                </div>
              ) : (
                filteredAlerts.map(alert => (
                  <div key={alert.id} className={`p-4 rounded-xl border flex flex-col gap-2.5 transition-all text-xs font-mono text-start ${
                    alert.isResolved 
                      ? 'bg-slate-900/30 border-slate-900 text-slate-500' 
                      : alert.severity === 'CRITICAL' 
                      ? 'bg-red-950/40 border-red-500/30 text-slate-200' 
                      : alert.severity === 'HIGH' 
                      ? 'bg-amber-950/20 border-amber-500/20 text-slate-200' 
                      : 'bg-blue-950/10 border-blue-800/25 text-slate-200'
                  }`}>
                    
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${alert.isResolved ? 'bg-slate-600' : 'bg-red-500 animate-pulse'}`}></span>
                        <span className="font-bold text-[11px] text-slate-100">{alert.id}</span>
                        <Badge variant={alert.isResolved ? 'outline' : alert.severity === 'CRITICAL' ? 'danger' : 'gold'}>
                          {alert.isResolved ? 'RESOLVED' : alert.severity}
                        </Badge>
                      </div>
                      <span className="text-[10px] text-slate-500">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>

                    <div className="text-[11px] text-slate-300 font-sans leading-relaxed">
                      <b>Source: {alert.source}</b> — <span className="font-medium text-slate-200">{alert.description}</span>
                    </div>

                    <div className="flex justify-between items-center bg-slate-950/45 p-1.5 px-2.5 rounded border border-slate-900 text-[10px]">
                      <span className="text-slate-400">JURISDICTION:</span>
                      <span className="text-slate-200 font-semibold">{alert.jurisdiction}</span>
                    </div>

                    {!alert.isResolved && (
                      <Button 
                        onClick={() => handleResolveAlert(alert.id)}
                        className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-[10px] text-[#cca553] font-bold tracking-tight px-3 py-1 mr-auto cursor-pointer"
                      >
                        RESOLVE INCIDENT
                      </Button>
                    )}

                  </div>
                ))
              )}
            </div>

          </Card>

          {/* COMPONENT B: REGULATORY POLICIES */}
          <Card className="bg-[#111e2e]/80 border border-slate-800/80 p-5 rounded-xl shadow-md">
            
            <div className="flex items-center gap-1.5 mb-2.5">
              <Landmark className="w-4 h-4 text-[#cca553]" />
              <h3 className="text-sm font-semibold uppercase font-mono tracking-wide text-slate-300">Regulatory Oversight</h3>
            </div>

            <h3 className="text-base font-bold text-slate-100">{getKurdishLabel('regulatoryPolicies', 'National Border Agreements')}</h3>
            <p className="text-xs text-slate-400">Cooperative legislative rules harmonized to unify tariffs across all federal-region border gates.</p>

            <div className="flex flex-col gap-3 mt-4">
              {rawPolicies.map(policy => (
                <div key={policy.code} className="bg-slate-950/60 border border-slate-900 p-3 rounded-lg flex items-start gap-2 text-xs font-mono">
                  <div className="mt-0.5 shrink-0">
                    <input 
                      type="checkbox" 
                      checked={policy.isActive} 
                      onChange={() => handlePolicyToggle(policy.code)}
                      className="cursor-pointer h-3.5 w-3.5 accent-amber-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-1 text-start">
                    <span className="font-bold text-slate-200">{policy.code}</span>
                    <span className="text-[11px] text-slate-300 font-sans leading-snug">{policy.titleKurdish}</span>
                    <span className="text-[10px] text-slate-500 italic mt-0.5">{policy.notes}</span>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Badge variant={policy.isActive ? 'teal' : 'outline'}>{policy.isActive ? 'ENFORCED' : 'DISABLED'}</Badge>
                      <Badge variant="gold">{policy.jurisdiction}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </Card>

        </div>

      </div>

    </div>
  );
}
