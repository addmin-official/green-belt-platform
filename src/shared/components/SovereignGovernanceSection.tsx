import React, { useState } from 'react';
import { useGovernment } from '../../providers/GovernmentProvider';
import { IdentityRegistry } from '../identity/IdentityRegistry';
import { DigitalIdentity } from '../identity/IdentityTypes';
import { GovernmentOrganizationRegistry } from '../organization/GovernmentOrganizationRegistry';
import { EmployeeLifecycleEngine } from '../workforce/EmployeeLifecycleEngine';
import { ShiftManagementEngine, WorkShift } from '../workforce/ShiftManagementEngine';
import { CertificationEngine, OfficerCertification } from '../workforce/CertificationEngine';
import { SecurityAuditEngine, SecurityIncident } from '../security/SecurityAuditEngine';
import { Card, Badge, Button } from '../../ui';
import {
  Users, Building2, Shield, ShieldAlert, Award, Radio, AlertTriangle, CheckCircle2,
  Lock, RefreshCw, UserCheck, UserX, UserPlus, ArrowRightLeft, FileText, Ban
} from 'lucide-react';

interface SovereignGovernanceSectionProps {
  governingOrg: 'FEDERAL_IRAQ' | 'KRG' | 'JOINT_OPERATIONS';
}

export default function SovereignGovernanceSection({ governingOrg }: SovereignGovernanceSectionProps) {
  const { userRole, logAction } = useGovernment();
  const [ticker, setTicker] = useState(0);

  // States for Administrative Actions
  const [hireId, setHireId] = useState('');
  const [hireNatId, setHireNatId] = useState('');
  const [hireName, setHireName] = useState('');
  const [hireEmail, setHireEmail] = useState('');
  const [hireRole, setHireRole] = useState('');
  const [hireClearance, setHireClearance] = useState<'unclassified' | 'confidential' | 'secret' | 'top-secret'>('unclassified');

  // Transfer states
  const [selectedEmpId, setSelectedEmpId] = useState('');
  const [targetOrg, setTargetOrg] = useState<'FEDERAL_IRAQ' | 'KRG' | 'JOINT_OPERATIONS'>(governingOrg);
  const [transferRole, setTargetRole] = useState('');

  // Certification states
  const [certEmpId, setCertEmpId] = useState('');
  const [certName, setCertName] = useState('');
  const [certAuthority, setCertAuthority] = useState<'FEDERAL_BOARD' | 'KRG_COUNCIL' | 'JOINT_COMMITTEE'>(
    governingOrg === 'FEDERAL_IRAQ' ? 'FEDERAL_BOARD' : governingOrg === 'KRG' ? 'KRG_COUNCIL' : 'JOINT_COMMITTEE'
  );

  // Active filter tab for the inner governance panel
  const [subTab, setSubTab] = useState<'workforce' | 'structures' | 'security' | 'actions'>('workforce');

  const triggerUpdate = () => setTicker(prev => prev + 1);

  // Fetch relevant registries filtered by governingOrg or context
  const rawEmployees = IdentityRegistry.getAll();
  const employees = rawEmployees.filter(emp => emp.organization === governingOrg);
  const organizations = GovernmentOrganizationRegistry.getUnitsByOrg(governingOrg);
  const registrations = CertificationEngine.getCertifications().filter(cert => {
    const empDetails = IdentityRegistry.getById(cert.employeeId);
    return empDetails?.organization === governingOrg;
  });

  const rawIncidents = SecurityAuditEngine.getIncidents();
  // Filter incidents where the actor belongs to governingOrg, or match organization context flags
  const incidents = rawIncidents.filter(inc => {
    if (!inc.employeeId) return governingOrg === 'FEDERAL_IRAQ'; // Default raw system issues to federal audit
    const empDetails = IdentityRegistry.getById(inc.employeeId);
    return empDetails?.organization === governingOrg;
  });

  // Shift readiness tracking
  const shifts = ShiftManagementEngine.getShifts().filter(s => {
    if (governingOrg === 'FEDERAL_IRAQ') return s.siteName !== 'Ibrahim Khalil Joint Gate' && !s.siteName.includes('Parvizkhan');
    if (governingOrg === 'KRG') return s.siteName.includes('Parvizkhan');
    return s.siteName.includes('Ibrahim Khalil');
  });

  // Highlight executive critical personnel
  const criticalPersonnel = employees.filter(emp =>
    emp.role.includes('Prime Minister') || emp.role.includes('Cabinet') || emp.role.includes('Director') || emp.role.includes('Coordinator')
  );

  // Handlers for workforce transitions
  const handleHire = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hireId || !hireName || !hireEmail || !hireRole) return;
    try {
      EmployeeLifecycleEngine.hireEmployee(
        hireId,
        hireNatId || `IQND-${Math.floor(100000 + Math.random() * 900000)}`,
        hireName,
        hireEmail,
        governingOrg,
        hireRole,
        hireClearance,
        userRole
      );

      logAction(
        userRole,
        `دامەزراندنی فەرمی نوێ: ناسنامەی بریکار ${hireId} ناوی تەواو: ${hireName} ڕۆڵ: ${hireRole}`,
        'GOVERNMENT_WORKFORCE_HIRE'
      );

      // Clear forms
      setHireId('');
      setHireNatId('');
      setHireName('');
      setHireEmail('');
      setHireRole('');
      triggerUpdate();
    } catch (err: any) {
      alert(err.message || 'Error executing sovereign hire command.');
    }
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmpId || !transferRole) return;
    try {
      EmployeeLifecycleEngine.transferEmployee(selectedEmpId, targetOrg, transferRole, userRole);
      const emp = IdentityRegistry.getById(selectedEmpId);
      logAction(
        userRole,
        `گواستنەوەی کارگێڕی فەرمی: ${emp?.fullName} گواسترایەوە بۆ ${targetOrg} بە ڕۆڵی ${transferRole}`,
        'GOVERNMENT_WORKFORCE_TRANSFER'
      );
      setSelectedEmpId('');
      setTargetRole('');
      triggerUpdate();
    } catch (err: any) {
      alert(err.message || 'Error executing employee transfer.');
    }
  };

  const handleSuspend = (empId: string) => {
    try {
      EmployeeLifecycleEngine.suspendEmployee(empId, 'ADMINISTRATIVE_SUSPENSION_OVERSIGHT', userRole);
      const emp = IdentityRegistry.getById(empId);
      logAction(
        userRole,
        `ڕاگرتنی ڕێوشوێنی کارگێڕی: فەرمانبەر ${emp?.fullName} بە کاتی ڕاگیرا لە تەمسیلکردن بە هۆی سەرپێچی.`,
        'GOVERNMENT_WORKFORCE_SUSPEND'
      );
      triggerUpdate();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleReinstate = (empId: string) => {
    try {
      IdentityRegistry.updateIdentity(empId, { status: 'active' });
      const emp = IdentityRegistry.getById(empId);
      logAction(
        userRole,
        `چالاککردنەوەی کارگێڕی: فەرمانبەر ${emp?.fullName} گەڕێندرایەوە بۆ دۆخی ئاسایی.`,
        'GOVERNMENT_WORKFORCE_REINSTATE'
      );
      triggerUpdate();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleIssueCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certEmpId || !certName) return;
    try {
      CertificationEngine.issueCertification(certEmpId, certName, certAuthority, 3);
      const emp = IdentityRegistry.getById(certEmpId);
      logAction(
        userRole,
        `پەسەندکردنی بڕوانامەی شیاوی: بڕوانامەی (${certName}) بەخشرا بە فەرمانبەر ${emp?.fullName}`,
        'GOVERNMENT_WORKFORCE_CERTIFICATE'
      );
      setCertEmpId('');
      setCertName('');
      triggerUpdate();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleVerifyDevice = (empId: string) => {
    const emp = IdentityRegistry.getById(empId);
    if (emp) {
      const nextState = !emp.deviceTrusted;
      IdentityRegistry.updateIdentity(empId, { deviceTrusted: nextState });
      logAction(
        userRole,
        `سەپاندنی متمانەی ئامێر: متمانەی جۆری رێکخراوەیی بۆ بریکار ${emp.fullName} نوێکرایەوە بۆ [${nextState ? 'میثاق' : 'نا متمانە'}]`,
        'DEVICE_SECURITY_MUTATION'
      );
      triggerUpdate();
    }
  };

  // Status mapping colors helper
  const getClearanceBadgeColor = (lvl: string) => {
    if (lvl === 'top-secret') return 'rose';
    if (lvl === 'secret') return 'amber';
    if (lvl === 'confidential') return 'teal';
    return 'slate';
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in text-start">
      {/* Sovereign Workforce Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#0b1329]/90 border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">هۆشدارییە کارگێڕییەکان</span>
            <span className="text-xl font-bold text-white font-mono block mt-1">{employees.length} فەرمانبەر</span>
            <span className="text-[10px] text-teal-400 font-mono mt-1 block">تۆمارە سەروەرەکانی رێکخراوە</span>
          </div>
          <div className="p-3 bg-teal-950/50 border border-teal-900/30 rounded-lg text-teal-400">
            <Users className="w-5 h-5" />
          </div>
        </Card>

        <Card className="bg-[#0b1329]/90 border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">پێگەکانی سەرکردایەتی</span>
            <span className="text-xl font-bold text-white font-mono block mt-1">{criticalPersonnel.length} کەسایەتی</span>
            <span className="text-[10px] text-emerald-400 font-mono mt-1 block">پەسەندکراوی باڵا</span>
          </div>
          <div className="p-3 bg-emerald-950/50 border border-emerald-900/30 rounded-lg text-emerald-400">
            <Shield className="w-5 h-5" />
          </div>
        </Card>

        <Card className="bg-[#0b1329]/90 border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">لادانەکان و هۆشدارییە ئاسایشییەکان</span>
            <span className="text-xl font-bold text-rose-400 font-mono block mt-1">{incidents.length} ئاگادارکەرەوە</span>
            <span className="text-[10px] text-rose-500/80 font-mono mt-1 block">پچڕانی سنوورە نیشتمانییەکان</span>
          </div>
          <div className="p-3 bg-rose-950/50 border border-rose-900/30 rounded-lg text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </Card>

        <Card className="bg-[#0b1329]/90 border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">بڕوانامە شیاوەکان</span>
            <span className="text-xl font-bold text-white font-mono block mt-1">{registrations.length} چالاک</span>
            <span className="text-[10px] text-teal-400 font-mono mt-1 block">نوێکراو و متمانەپێکراو</span>
          </div>
          <div className="p-3 bg-teal-950/50 border border-teal-900/30 rounded-lg text-teal-400">
            <Award className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Roster & Readiness Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left main structural display card */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex bg-slate-950/60 p-1 rounded-xl border border-slate-900 w-fit">
            <button
              onClick={() => setSubTab('workforce')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                subTab === 'workforce' ? 'bg-teal-950 text-teal-400 border border-teal-500/20 font-bold' : 'text-slate-400'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              تۆماری هێزی کار (Roster)
            </button>
            <button
              onClick={() => setSubTab('structures')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                subTab === 'structures' ? 'bg-teal-950 text-teal-400 border border-teal-500/20 font-bold' : 'text-slate-400'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              پێکهاتەی فەرمانگەکان
            </button>
            <button
              onClick={() => setSubTab('security')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                subTab === 'security' ? 'bg-teal-950 text-teal-400 border border-teal-500/20 font-bold' : 'text-slate-400'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              ئاسایش و دۆخی چاودێری
            </button>
            <button
              onClick={() => setSubTab('actions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                subTab === 'actions' ? 'bg-teal-950 text-teal-400 border border-teal-500/20 font-bold' : 'text-slate-400'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              فرمەکانی بەڕێوەبردن
            </button>
          </div>

          {/* Tab Content: Workforce Roster */}
          {subTab === 'workforce' && (
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
              <h3 className="text-sm font-sans font-bold text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-400" />
                لیستی فەرمانبەرانی دەوڵەت و ماف و ڕێسای کارگێڕی چالاک
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-slate-300">
                  <thead className="bg-[#070c17] text-slate-500 uppercase font-mono text-[9px] border-b border-slate-800">
                    <tr>
                      <th className="p-2.5 text-start">ناسنامە</th>
                      <th className="p-2.5 text-start">ناوی فەرمانبەر</th>
                      <th className="p-2.5 text-start">ناونیشان / بەش</th>
                      <th className="p-2.5 text-center">ئاستی ڕێگەپێدان</th>
                      <th className="p-2.5 text-center">بایۆمەتری</th>
                      <th className="p-2.5 text-center">پەیوەندی ئامێر</th>
                      <th className="p-2.5 text-center">بارودۆخ</th>
                      <th className="p-2.5 text-center">کارەکان</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {employees.map(emp => (
                      <tr key={emp.id} className="hover:bg-slate-900/10">
                        <td className="p-2.5 font-mono text-[11px] text-slate-500">{emp.id}</td>
                        <td className="p-2.5">
                          <div className="font-bold text-slate-200">{emp.fullName}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{emp.email}</div>
                        </td>
                        <td className="p-2.5">
                          <div className="text-teal-400 font-bold">{emp.role}</div>
                          <div className="text-[10px] text-slate-500">{emp.directorate} &bull; {emp.department}</div>
                        </td>
                        <td className="p-2.5 text-center">
                          <Badge variant={getClearanceBadgeColor(emp.clearanceLevel)}>
                            {emp.clearanceLevel.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="p-2.5 text-center">
                          <Badge variant={emp.biometricStatus === 'verified' ? 'teal' : 'amber'}>
                            {emp.biometricStatus === 'verified' ? 'ڕێگەپێدراو' : 'مەترسی'}
                          </Badge>
                        </td>
                        <td className="p-2.5 text-center">
                          <button
                            onClick={() => handleVerifyDevice(emp.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer transition ${
                              emp.deviceTrusted 
                                ? 'bg-teal-950/80 text-teal-400 border border-teal-900' 
                                : 'bg-rose-950/80 text-rose-400 border border-rose-900'
                            }`}
                          >
                            {emp.deviceTrusted ? 'TRUSTED_DEV' : 'UNTRUSTED_DEV'}
                          </button>
                        </td>
                        <td className="p-2.5 text-center">
                          <Badge variant={emp.status === 'active' ? 'teal' : 'rose'}>
                            {emp.status === 'active' ? 'چالاک' : 'ڕاگیراو'}
                          </Badge>
                        </td>
                        <td className="p-2.5 text-center">
                          {emp.status === 'active' ? (
                            <button
                              onClick={() => handleSuspend(emp.id)}
                              className="p-1 rounded hover:bg-rose-950/40 text-rose-400 border border-transparent hover:border-rose-900/30 transition cursor-pointer"
                              title="ڕاگرتنی لە سەرپێچی"
                            >
                              <UserX className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleReinstate(emp.id)}
                              className="p-1 rounded hover:bg-emerald-950/40 text-emerald-400 border border-transparent hover:border-emerald-900/30 transition cursor-pointer"
                              title="چالاککردنەوە"
                            >
                              <UserCheck className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Tab Content: Structures */}
          {subTab === 'structures' && (
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
              <h3 className="text-sm font-sans font-bold text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-400" />
                سەنتەری تۆماری یەکە سازمانییەکان و نەخشەی دەسەڵاتە فیدراڵ و هەرێمییەکان
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {organizations.map(org => {
                  const unitStaff = employees.filter(e => e.directorate === org.directorate);
                  return (
                    <div key={org.id} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-500 font-mono font-bold uppercase">{org.id}</span>
                          <Badge variant="teal">{org.parentOrg}</Badge>
                        </div>
                        <h4 className="text-sm font-bold text-slate-200 mt-2 font-sans">{org.nameKu}</h4>
                        <p className="text-xs text-slate-500 font-mono mt-1">{org.nameEn}</p>

                        <div className="mt-4 space-y-1 text-xs text-slate-400 leading-relaxed">
                          <div><span className="text-slate-500 font-bold">بەڕێوەبەرایەتی باڵا:</span> {org.directorate}</div>
                          <div><span className="text-slate-500 font-bold">بەشی تەکنیك:</span> {org.department}</div>
                          <div><span className="text-slate-500 font-bold">یەکەی جێبەجێکردن:</span> {org.unit}</div>
                          <div><span className="text-slate-500 font-bold">سەرپەرشتیار:</span> {org.headPosition}</div>
                        </div>
                      </div>
                      <div className="mt-4 pt-2 border-t border-slate-900/60 flex items-center justify-between text-xs text-slate-400 font-mono">
                        <span>هێزی کاری چالاک لەم بەشەدا</span>
                        <span className="text-teal-400 font-bold">{unitStaff.length} کارمەند</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Tab Content: Security alerts */}
          {subTab === 'security' && (
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
              <h3 className="text-sm font-sans font-bold text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                هەوڵەکانی چوونەژوورەوەی نەشیاو و سەرپێچییەکانی پرۆتۆکۆڵە ئاسایشییەکان
              </h3>

              {incidents.length === 0 ? (
                <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-slate-900 text-slate-500 text-xs">
                  هیچ ڕووداوێکی سەرپێچی تۆمار نەکراوە لەم بەشەدا. سەرجەم کایەکان گەرەنتی کراون.
                </div>
              ) : (
                <div className="space-y-3">
                  {incidents.map(inc => (
                    <div key={inc.incidentId} className="bg-slate-950/80 p-4 rounded-xl border border-rose-950/40 flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <div className="p-2 bg-rose-950/50 border border-rose-900/30 rounded text-rose-400 shrink-0 mt-0.5">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-rose-400">{inc.incidentId}</span>
                            <Badge variant="rose">{inc.severity}</Badge>
                            <span className="text-[10px] text-slate-500 font-mono">{new Date(inc.timestamp).toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-slate-300 font-sans mt-2 leading-relaxed">
                            {inc.detectedEvent}
                          </p>
                          <div className="mt-2 text-[10px] font-mono text-slate-400 leading-relaxed">
                            <span className="text-slate-500 font-bold">بەرپرس:</span> {inc.actorName} &bull; <span className="text-slate-500 font-bold">ناونیشانی ئایپی:</span> {inc.sourceIp}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-teal-400/80">
                          {inc.actionTaken}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {/* Tab Content: Actions Form */}
          {subTab === 'actions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hiring form */}
              <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl text-start">
                <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center gap-1.5">
                  <UserPlus className="w-4 h-4 text-teal-400" />
                  دامەزراندنی فەرمی نوێ (Form)
                </h3>

                <form onSubmit={handleHire} className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">کۆدی فەرمانبەر (ID)</label>
                      <input
                        type="text"
                        required
                        placeholder="EMP-FED-009"
                        value={hireId}
                        onChange={(e) => setHireId(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">ناسنامەی نیشتمانی</label>
                      <input
                        type="text"
                        placeholder="IQ-294021-99"
                        value={hireNatId}
                        onChange={(e) => setHireNatId(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">ناوی تەواو (سەرەکی)</label>
                    <input
                      type="text"
                      required
                      placeholder="لەسەر فەرمانی فەرمی"
                      value={hireName}
                      onChange={(e) => setHireName(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">ئیمەیڵی دەوڵەتی</label>
                    <input
                      type="email"
                      required
                      placeholder="example@idg.gov.iq"
                      value={hireEmail}
                      onChange={(e) => setHireEmail(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">پۆستی کارگێڕی</label>
                      <input
                        type="text"
                        required
                        placeholder="فەرمانبەری گومرگ"
                        value={hireRole}
                        onChange={(e) => setHireRole(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">ئاستی ڕێگەپێدان</label>
                      <select
                        value={hireClearance}
                        onChange={(e) => setHireClearance(e.target.value as any)}
                        className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none font-mono"
                      >
                        <option value="unclassified">UNCLASSIFIED</option>
                        <option value="confidential">CONFIDENTIAL</option>
                        <option value="secret">SECRET</option>
                        <option value="top-secret">TOP-SECRET</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-1.5 rounded bg-teal-600 hover:bg-teal-700 text-slate-900 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    دامەزراندنی فەرمی
                  </button>
                </form>
              </Card>

              {/* Transfer forms */}
              <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl text-start flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center gap-1.5">
                    <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
                    پرۆتۆکۆڵی گواستنەوەی نیشتمانی فەرمانبەران
                  </h3>

                  <form onSubmit={handleTransfer} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">دیاریکردنی فەرمانبەر</label>
                      <select
                        required
                        value={selectedEmpId}
                        onChange={(e) => setSelectedEmpId(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none font-mono"
                      >
                        <option value="">هەڵبژاردنی ناسنامە...</option>
                        {employees.map(emp => (
                          <option key={emp.id} value={emp.id}>
                            {emp.id} - {emp.fullName} ({emp.role})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">ڕێکخراوی ئامانج</label>
                      <select
                        required
                        value={targetOrg}
                        onChange={(e) => setTargetOrg(e.target.value as any)}
                        className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none font-mono"
                      >
                        <option value="FEDERAL_IRAQ">FEDERAL_IRAQ (حکومەتی فیدراڵ)</option>
                        <option value="KRG">KRG (حکومەتی هەرێم)</option>
                        <option value="JOINT_OPERATIONS">JOINT_OPERATIONS (ئۆپەراسیۆنی هاوبەش)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">ڕۆڵ یان پێگەی نوێ</label>
                      <input
                        type="text"
                        required
                        placeholder="بۆ نموونە: گومرگپارێز"
                        value={transferRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-slate-900 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      جێبەجێکردنی گواستنەوەی فەرمی
                    </button>
                  </form>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Right sidebars for operational readiness & certifications */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Shift readiness of target jurisdiction */}
          <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400" />
              جاهیزیەتی ئۆپەراسیۆنەکان و شیفتەکان
            </h3>

            <div className="space-y-3">
              {shifts.map(shift => (
                <div key={shift.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{shift.siteName}</span>
                    <Badge variant={shift.readinessRating === 'OPTIMAL' ? 'teal' : 'rose'}>
                      {shift.readinessRating}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <div>شیفتی کایە: <span className="text-slate-200 font-mono font-bold">{shift.shiftName}</span></div>
                    <div>ڕێژەی ئەفسەران: <span className="text-teal-400 font-mono font-bold">{shift.officerCount}</span></div>
                  </div>
                  <div className="text-[10px] text-slate-500 font-sans mt-2">
                    سەرپەرشتیار: {shift.supervisorName}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Officers Certificate Registry issue */}
          <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-teal-400" />
              بەخشینی بڕوانامەی شیاوی تەکنیك
            </h3>

            <form onSubmit={handleIssueCert} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-mono text-slate-500 font-bold font-sans">دیاریکردنی فەرمانبەر</label>
                <select
                  required
                  value={certEmpId}
                  onChange={(e) => setCertEmpId(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none font-mono"
                >
                  <option value="">هەڵبژاردنی ناسنامە...</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.fullName} ({emp.id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-mono text-slate-500 font-bold font-sans">ناوی بڕوانامەی نوێ</label>
                <input
                  type="text"
                  required
                  placeholder="مۆری دەروازە ئاستی یەك"
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-1.5 rounded bg-teal-600 hover:bg-teal-700 text-slate-900 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                تۆمارکردنی بڕوانامە
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
