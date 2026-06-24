import React, { useState, useEffect } from 'react';
import { useGovernment, JointCrisisTask } from '../../providers/GovernmentProvider';
import { useFederation, FederationModeType } from '../../services/federation/GovernmentFederationProvider';
import { UnificationReadinessEngine } from '../../services/federation/UnificationReadinessEngine';
import { FederationGateway, RouteSLA } from '../../services/federation/FederationGateway';
import { FederationEventBus, FederationBusEvent } from '../../services/federation/FederationEventBus';
import { CrossTrustRegistry } from '../../services/federation/CrossTrustRegistry';
import { Card, Button, Badge, Alert } from '../../ui';
import { 
  Users, CheckCircle2, AlertTriangle, Play, RefreshCw, 
  Settings, Network, ShieldAlert, Cpu, Activity, Database, Check
} from 'lucide-react';

interface JointExecutiveCouncilProps {
  lang: 'en' | 'ar' | 'ku';
}

export const JointExecutiveCouncil: React.FC<JointExecutiveCouncilProps> = ({ lang }) => {
  const { 
    federationTransactions,
    jointTasks,
    addJointTask,
    resolveJointTask,
    identities,
    customsRecords,
    policies,
    userRole,
    logAction
  } = useGovernment();

  const { federationMode, setFederationMode, flags, toggleFlag } = useFederation();

  // Joint crisis task states
  const [newTaskName, setNewTaskName] = useState('');
  const [partnerLogos, setPartnerLogos] = useState('Federal NID & KRG Bureau');
  
  // Real-time Event bus states
  const [eventLogs, setEventLogs] = useState<FederationBusEvent[]>([]);

  // Setup live event bus reading
  useEffect(() => {
    setEventLogs(FederationEventBus.getHistory());
    
    // Subscribe to events
    const unsub_dec = FederationEventBus.subscribe('EXECUTIVE_DECISION', (evt) => {
      setEventLogs(prev => [evt, ...prev]);
    });
    const unsub_dat = FederationEventBus.subscribe('DATA_SHARED', (evt) => {
      setEventLogs(prev => [evt, ...prev]);
    });
    const unsub_pol = FederationEventBus.subscribe('POLICY_UPDATED', (evt) => {
      setEventLogs(prev => [evt, ...prev]);
    });

    return () => {
      unsub_dec();
      unsub_dat();
      unsub_pol();
    };
  }, []);

  // Compute Unification readiness
  const readinessMetrics = UnificationReadinessEngine.evaluateCurrentReadiness({
    activeMode: federationMode,
    identities,
    customs: customsRecords,
    policies
  });

  const routes = FederationGateway.getRouteSLAs();

  const t = {
    en: {
      title: 'Joint Federal & KRG Cabinet Command Council',
      sub: 'Bilateral national reconciliation, crisis coordination, policy unification matrices, and active event busses.',
      modeLabel: 'Sovereign Federation Operational Mode',
      readyLabel: 'National Integration Readiness',
      readySub: 'Computed quantitative institutional alignment parameters:',
      checklistHeader: 'Integration Milestone Checklist',
      routesHeader: 'Infrastructure Gate SLAs & Cryptographic Handshakes',
      crisisHeader: 'Joint Interoperability Coordination & Incident Log',
      crisisSub: 'Coordinating high-clearance joint border task items across Baghdad and Erbil teams.',
      taskField: 'Action Task Title',
      partnerField: 'Assigned Combined Agencies',
      createTaskBtn: 'Launch Joint Coordination Mission',
      resolve: 'Mitigate Incident',
      activeEvents: 'Active Federation Event Bus Stream',
      eventSign: 'Crypto Sign'
    },
    ar: {
      title: 'مجلس القيادة المشترك والتكامل السيادي',
      sub: 'المصالحة الوطنية، وتنسيق الطوارئ والحدود المشتركة، معالجة الممرات الموحدة وبوابات التحقق.',
      modeLabel: 'وضع تشغيل الفيدرالية السيادية المشتركة',
      readyLabel: 'مؤشر جاهزية التكامل المؤسسي والسيادي',
      readySub: 'قائمة المتطلبات الكمية والارتباط المتبادل للأنظمة الموحدة:',
      checklistHeader: 'مراحل ومخرجات خطة السلامة الجمركية المشتركة',
      routesHeader: 'معدل قياس سلامة البنية التحتية والمصافحة الكريبتوغرافية',
      crisisHeader: 'إدارة وتنسيق مهام اللجان والعمليات المشتركة',
      crisisSub: 'التنسيق والرد التلقائي لإزالة التضارب في معابر الفيدرالية الموحدة.',
      taskField: 'عنوان المهمة المشتركة',
      partnerField: 'الوكالات المشتركة المكلفة',
      createTaskBtn: 'تفويض فريق عمل تنسيقي عاجل',
      resolve: 'حل وتخفيف الأزمة',
      activeEvents: 'خط سير بث أحداث الفيدرالية والمزامنة الرقمية',
      eventSign: 'البصمة الرقمية'
    },
    ku: {
      title: 'ئەنجومەنی باڵای هاوبەشی فیدراڵ و هەرێم',
      sub: 'هەماهەنگی کتوپڕ، متمانەسازی بەیەکەوەیی، هەڵسەنگاندنی ئاستی یەکگرتن و تۆماری ڕووداوەکان.',
      modeLabel: 'دۆخی هەڵسووڕانی فیدراڵیی هاوبەش',
      readyLabel: 'ڕێژەی ئامادەیی بۆ یەکگرتنی تەواو',
      readySub: 'دیاریکردنی ئاستی تەشەنەسەندنی هاوبەش لە نێوان سیستەمەکان:',
      checklistHeader: 'کارەکانی تەواوکردنی قۆناغی یەکگرتن',
      routesHeader: 'دۆخی هێڵەکان و بریکارەکانی پاراستنی کریپتۆگرافی',
      crisisHeader: 'بۆردی بەڕێوەبردن و بەدواداچوونی چالاکییە هاوبەشەکان',
      crisisSub: 'ئامادەکاری و هەماهەنگی خێرا بۆ شیکردنەوەی ناکۆکی غەرامە گومرگییەکان.',
      taskField: 'ناونیشانی ئەرکی هاوبەش',
      partnerField: 'فەرمانگە هاوبەشە ڕاسپێردراوەکان',
      createTaskBtn: 'ڕاسپاردنی کارگرووپی هاوبەشی بەپەلە',
      resolve: 'چارەسەرکردن و داخستنی کێشە',
      activeEvents: 'هێڵی گواستنەوەی ڕووداوە فیدراڵییەکان',
      eventSign: 'کلیل واژۆ'
    }
  }[lang];

  const handleLaunchTask = () => {
    if (!newTaskName.trim()) return;
    addJointTask(newTaskName, userRole, partnerLogos);
    
    // Publish Event
    FederationEventBus.publish({
      type: 'EXECUTIVE_DECISION',
      sourceJurisdiction: 'joint',
      actor: userRole,
      payload: { task: newTaskName, assigned: partnerLogos }
    });

    setNewTaskName('');
  };

  const handleModeSwitch = (mode: FederationModeType) => {
    setFederationMode(mode);
    FederationEventBus.publish({
      type: 'POLICY_UPDATED',
      sourceJurisdiction: 'joint',
      actor: userRole,
      payload: { targetMode: mode }
    });
  };

  return (
    <div id="joint-executive-desk-panel" className="flex flex-col gap-6 w-full animate-fade-in text-start">
      
      {/* Executive Command Header */}
      <Card className="bg-[#0c1f2e]/95 border-sky-800/40 p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="p-3 bg-sky-950/60 border border-sky-800 rounded-lg text-sky-400">
            <Users className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-sans font-medium text-slate-100 tracking-tight flex items-center gap-2">
              {t.title}
              <Badge variant="teal">JOINT_DESK_V2_ACTIVE</Badge>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">{t.sub}</p>
          </div>
        </div>
      </Card>

      {/* Mode selectors & Unification Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Paradigm Mode Swapper */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl flex flex-col gap-5">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Settings className="w-4 h-4 text-sky-400" />
              {t.modeLabel}
            </h3>

            <div className="flex flex-col gap-3">
              {[
                { 
                  code: 'SEPARATED', 
                  title: 'A. SEPARATED', 
                  desc: lang === 'en' ? 'Absolute isolated silos' : ' جیاکراوەی تەواو'
                },
                { 
                  code: 'FEDERATED', 
                  title: 'B. FEDERATED', 
                  desc: lang === 'en' ? 'Sovereign bridged exchange' : ' بریکاری هاوبەش'
                },
                { 
                  code: 'UNIFIED', 
                  title: 'C. UNIFIED', 
                  desc: lang === 'en' ? 'Fully consolidated union' : ' یەکگرتوویی تەواو'
                }
              ].map((m) => (
                <button
                  key={m.code}
                  onClick={() => handleModeSwitch(m.code as FederationModeType)}
                  className={`p-3 rounded-lg border text-start transition-all cursor-pointer ${
                    federationMode === m.code
                      ? 'bg-sky-950/45 border-sky-600/80 shadow-[0_0_15px_rgba(3,105,161,0.15)]'
                      : 'bg-slate-950/60 border-slate-930 hover:border-slate-800 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-sans font-bold text-slate-100">{m.title}</span>
                    {federationMode === m.code && (
                      <Badge variant="teal">ACTIVE</Badge>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{m.desc}</p>
                </button>
              ))}
            </div>

            <hr className="border-slate-800/80" />

            {/* Feature Flags Checklist */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{lang === 'en' ? 'Active Feature Gates' : 'بریکارەکانی کارامەیی'}</span>
              {[
                { key: 'enableJointOperations', label: 'Bilateral Incident Center' },
                { key: 'enableSharedDatasets', label: 'Cross-Boundary Fabrics' },
                { key: 'enableCrossGovernmentApproval', label: 'Handshake Transits' },
                { key: 'enableUnifiedIdentity', label: 'FederatedCitizenID Indexes' }
              ].map((gate) => (
                <div key={gate.key} className="flex items-center justify-between text-xs text-slate-300">
                  <span>{gate.label}</span>
                  <button 
                    onClick={() => toggleFlag(gate.key as any)}
                    className={`px-2.5 py-0.5 text-[10px] rounded font-mono transition cursor-pointer ${flags[gate.key as keyof typeof flags] ? 'bg-sky-950 border border-sky-800 text-sky-300' : 'bg-slate-950 text-slate-500'}`}
                  >
                    {flags[gate.key as keyof typeof flags] ? 'ACTIVE' : 'LOCKED'}
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Integration Metrics dashboard block */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl flex flex-col gap-4">
            <h3 className="text-sm font-sans font-semibold text-slate-200 uppercase tracking-wide flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              {t.readyLabel}
            </h3>
            <p className="text-xs text-slate-400 leading-normal">{t.readySub}</p>

            {/* Visual indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
              
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Registry Sync Density</span>
                <div className="text-lg font-bold font-mono text-amber-500 mt-1">{readinessMetrics.identityResolutionDensity}%</div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-500 h-full transition-all" style={{ width: `${readinessMetrics.identityResolutionDensity}%` }} />
                </div>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Treaty Adoption Rating</span>
                <div className="text-lg font-bold font-mono text-emerald-400 mt-1">{readinessMetrics.treatyCompliancePercent}%</div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-400 h-full transition-all" style={{ width: `${readinessMetrics.treatyCompliancePercent}%` }} />
                </div>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Logistics Alignment Score</span>
                <div className="text-lg font-bold font-mono text-teal-400 mt-1">{readinessMetrics.dataAlignmentScore}%</div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-teal-400 h-full transition-all" style={{ width: `${readinessMetrics.dataAlignmentScore}%` }} />
                </div>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Unification Readiness Rating</span>
                <div className="text-lg font-bold font-mono text-sky-400 mt-1">{readinessMetrics.overallReadinessPercent}%</div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-sky-400 h-full transition-all" style={{ width: `${readinessMetrics.overallReadinessPercent}%` }} />
                </div>
              </div>

            </div>

            {/* Alignment Checklist */}
            <div className="flex flex-col gap-2.5 mt-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{t.checklistHeader}</span>
              <div className="flex flex-col gap-2">
                {readinessMetrics.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-2.5 text-xs bg-slate-950/40 p-2 rounded-lg border border-slate-900 justify-between">
                    <div className="flex gap-2.5 items-start">
                      {item.satisfied ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      )}
                      <span className="text-slate-200 text-left">{item.task[lang] || item.task.en}</span>
                    </div>
                    {item.blocker && !item.satisfied && (
                      <span className="px-1.5 py-0.5 bg-rose-950 text-rose-300 text-[10px] rounded shrink-0 font-bold uppercase font-sans">Blocker</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </Card>
        </div>
      </div>

      {/* Gateway SLAs and Event Bus */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Gateway SLAs */}
        <div className="lg:col-span-5 h-full">
          <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl flex flex-col gap-4 h-full text-start">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Network className="w-4 h-4 text-sky-400" />
              {t.routesHeader}
            </h3>

            <div className="flex flex-col gap-3">
              {Object.entries(routes).map(([key, data]) => {
                const nodeSLA = data as RouteSLA;
                return (
                  <div key={key} className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-200 font-sans">{key}</span>
                      <Badge variant={nodeSLA.status === 'healthy' ? 'teal' : 'rose'}>{nodeSLA.status.toUpperCase()}</Badge>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">{nodeSLA.endpoint}</div>
                    <div className="flex justify-between text-[11px] font-mono mt-1 text-slate-400">
                      <span>{nodeSLA.encryptionMode}</span>
                      <span>{nodeSLA.pingMs}ms latency</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Real-time Event bus */}
        <div className="lg:col-span-7 h-full">
          <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl flex flex-col gap-4 h-full text-start">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-500" />
              {t.activeEvents}
            </h3>

            <div className="overflow-y-auto max-h-[290px] flex flex-col gap-2.5">
              {eventLogs.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">No active signals on the event lines.</div>
              ) : (
                eventLogs.map(evt => (
                  <div key={evt.id} className="p-3 bg-slate-950/60 rounded border border-slate-800 text-start">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span className="text-amber-400 font-bold">{evt.type}</span>
                      <span>{evt.timestamp.slice(11, 19)} UTC</span>
                    </div>
                    <p className="text-xs text-slate-100 font-sans">{lang === 'en' ? 'Actor' : 'بەرپرس'} : <span className="text-slate-400 font-mono text-[10px]">{evt.actor}</span></p>
                    <div className="bg-slate-950/80 p-2 rounded border border-slate-900 mt-2 text-[10px] font-mono text-slate-300">
                      {JSON.stringify(evt.payload)}
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 mt-1 flex justify-between">
                      <span>{t.eventSign}: <span className="text-emerald-500">{evt.cryptographicSignature}</span></span>
                      <span>Source: {evt.sourceJurisdiction.toUpperCase()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

      </div>

      {/* Joint Interoperability and Crisis incident Desk */}
      <div className="w-full">
        <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl flex flex-col gap-4">
          <h3 className="text-sm font-sans font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            {t.crisisHeader}
          </h3>
          <p className="text-xs text-slate-400 leading-normal">{t.crisisSub}</p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
            
            {/* Form builder for joint actions */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-[#0c1b2c]/65 p-4 rounded-lg border border-slate-800 flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-slate-400">{t.taskField}</label>
                  <input
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="e.g. Sync regional and federal custom rules at border"
                    className="bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 p-2.5 outline-none focus:border-sky-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-slate-400">{t.partnerField}</label>
                  <select
                    value={partnerLogos}
                    onChange={(e) => setPartnerLogos(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 p-2.5 outline-none"
                  >
                    <option value="Federal Customs + KRG Customs Commission">Federal Customs + KRG Customs Commission</option>
                    <option value="Baghdad Security Admin + Erbil Security Bureau">Baghdad Security Admin + Erbil Security Bureau</option>
                    <option value="National NID Registry + KRG Citizenship Platform">National NID Registry + KRG Citizenship Platform</option>
                  </select>
                </div>

                <Button 
                  variant="sky" 
                  onClick={handleLaunchTask} 
                  disabled={!newTaskName.trim()}
                  className="text-xs py-2 cursor-pointer"
                >
                  {t.createTaskBtn}
                </Button>
              </div>
            </div>

            {/* List log of dual active coordination missions */}
            <div className="lg:col-span-8">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-xs text-slate-300">
                  <thead className="bg-slate-950/80 border-b border-slate-800/50">
                    <tr>
                      <th className="p-3 text-left font-sans">{lang === 'en' ? 'Mission Target' : 'کار'}</th>
                      <th className="p-3 text-left">{lang === 'en' ? 'Task Originator' : 'دەسەڵاتی سەرۆک'}</th>
                      <th className="p-3 text-left">{lang === 'en' ? 'Combined Agencies' : 'هاوبەشان'}</th>
                      <th className="p-3 text-center">{lang === 'en' ? 'Status' : 'دۆخ'}</th>
                      <th className="p-3 text-center">{lang === 'en' ? 'Resolution' : 'کردار'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {jointTasks.map((task: JointCrisisTask) => (
                      <tr key={task.id} className="hover:bg-slate-900/40">
                        <td className="p-3 font-semibold text-slate-200 text-left">{task.taskName}</td>
                        <td className="p-3 text-slate-400 font-mono text-left">{task.leadAuthority}</td>
                        <td className="p-3 text-slate-400 text-left">{task.coordinatingParties}</td>
                        <td className="p-3 text-center">
                          <Badge variant={task.status === 'open' ? 'rose' : task.status === 'resolving' ? 'gold' : 'teal'}>
                            {task.status.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          {task.status !== 'mitigated' ? (
                            <button
                              onClick={() => {
                                resolveJointTask(task.id);
                                FederationEventBus.publish({
                                  type: 'EXECUTIVE_DECISION',
                                  sourceJurisdiction: 'joint',
                                  actor: userRole,
                                  payload: { action: 'mitigate', taskId: task.id }
                                });
                              }}
                              className="px-2.5 py-1 rounded bg-sky-950/70 hover:bg-sky-900 border border-sky-800 text-sky-300 font-medium transition text-[11px] cursor-pointer"
                            >
                              {t.resolve}
                            </button>
                          ) : (
                            <span className="text-emerald-400 font-semibold flex items-center justify-center gap-1 font-mono text-[11px]">
                              <Check className="w-3.5 h-3.5" />
                              SOLVED
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </Card>
      </div>

    </div>
  );
};
