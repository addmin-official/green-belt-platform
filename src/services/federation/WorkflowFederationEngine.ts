import { LocalizedString, TreatyRegistry } from './TreatyRegistry';
import { FederationEventBus } from './FederationEventBus';

export interface WorkflowStage {
  id: string;
  label: LocalizedString;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'LOCKED';
  assignedAuthority: string;
  lastUpdated?: string;
  signatureUsed?: string;
}

export interface CrossGovWorkflow {
  id: string;
  name: LocalizedString;
  type: 'customs-transit' | 'border-incident' | 'joint-infra' | 'id-verification';
  status: 'PENDING_INIT' | 'IN_PROGRESS' | 'COMPLETED' | 'TERMINATED';
  stages: WorkflowStage[];
  currentStageIndex: number;
  dateCreated: string;
  treatyConstraintId: string;
  log: string[];
}

const INITIAL_WORKFLOWS: CrossGovWorkflow[] = [
  {
    id: 'WORKFLOW-2026-F101',
    name: {
      en: 'Multi-Modal Northern Economic Transit Line approval',
      ar: 'الموافقة على ممر العبور الاقتصادي الشمالي متعدد الوسائط',
      ku: 'پەسەندکردنی متمانەی گومرگی هێڵەکانی باکوور'
    },
    type: 'customs-transit',
    status: 'IN_PROGRESS',
    currentStageIndex: 1,
    treatyConstraintId: 'TREATY-2026-CUST-01',
    dateCreated: '2026-06-05T08:00:00Z',
    stages: [
      {
        id: 'S1',
        label: { en: 'Regional Custom Filing', ar: 'تسجيل البيان الإقليمي', ku: 'پڕکردنەوەی جۆری خۆماڵی' },
        status: 'APPROVED',
        assignedAuthority: 'KRG Customs Commission',
        lastUpdated: '2026-06-05T09:30:00Z',
        signatureUsed: 'Awat Janab Noori (Signed via ECDSA)'
      },
      {
        id: 'S2',
        label: { en: 'Bilateral Joint Settlement Review', ar: 'التدقيق الجمركي الفيدرالي المستقل', ku: 'پیاچوونەوەی دوولایەنەی هاوبەش' },
        status: 'PENDING',
        assignedAuthority: 'Joint Federal & KRG Cabinet Command'
      },
      {
        id: 'S3',
        label: { en: 'Federal Central Escrow Settlement', ar: 'المقاصة المالية المركزية ببغداد', ku: 'جێگیرکردنی داهاتی فیدراڵی ناوەندی' },
        status: 'LOCKED',
        assignedAuthority: 'Federal Ministry of Finance'
      }
    ],
    log: [
      'Workflow formulated under Customs Accords.',
      'Stage 1: Approved - KRG Customs Commission completed declaration.'
    ]
  },
  {
    id: 'WORKFLOW-2026-F102',
    name: {
      en: 'Identity Verification Escrow Handshake - Aram Barzani',
      ar: 'مصافحة التحقق من الهوية الفيدرالية المتبادلة',
      ku: 'پشتڕاستکردنی مەدەنی هاوبەش'
    },
    type: 'id-verification',
    status: 'COMPLETED',
    currentStageIndex: 2,
    treatyConstraintId: 'TREATY-2026-ID-03',
    dateCreated: '2026-06-08T02:00:00Z',
    stages: [
      {
        id: 'S1',
        label: { en: 'Erbil Entry Authentication Check', ar: 'فحص بوابات الدخول بأربيل', ku: 'هەڵسەنگاندنی هاتنەناوەوەی هەولێر' },
        status: 'APPROVED',
        assignedAuthority: 'Kurdistan Region Identity Registry',
        lastUpdated: '2026-06-08T02:15:00Z',
        signatureUsed: 'Rebar Ahmed Khalid'
      },
      {
        id: 'S2',
        label: { en: 'Unified Database Matching', ar: 'مطابقة قيود السجل الاتحادي', ku: 'هاوتاکردنی داتاکان' },
        status: 'APPROVED',
        assignedAuthority: 'Federal Civil Status Directorate',
        lastUpdated: '2026-06-08T03:10:00Z',
        signatureUsed: 'Abdul Amir Al-Shammari'
      }
    ],
    log: [
      'Workflow dispatched under Identity Compact.',
      'Stage 1 Approved by Erbil Liaison.',
      'Sovereign synchronization complete. Match rate verified at 100%.'
    ]
  }
];

export class WorkflowFederationEngine {
  private static workflows: CrossGovWorkflow[] = [...INITIAL_WORKFLOWS];

  public static getWorkflows(): CrossGovWorkflow[] {
    return this.workflows;
  }

  public static launchWorkflow(workflow: {
    name: LocalizedString;
    type: CrossGovWorkflow['type'];
    treatyConstraintId: string;
    stages: Omit<WorkflowStage, 'status'>[];
  }): CrossGovWorkflow {
    const treaty = TreatyRegistry.getTreatyById(workflow.treatyConstraintId);
    if (!treaty || treaty.status === 'SUSPENDED' || treaty.status === 'TERMINATED') {
      throw new Error(`Execution blocked: Target Treaty is not active.`);
    }

    const fresh: CrossGovWorkflow = {
      id: `WORKFLOW-2026-F${Math.floor(Math.random() * 900 + 100)}`,
      name: workflow.name,
      type: workflow.type,
      status: 'IN_PROGRESS',
      currentStageIndex: 0,
      treatyConstraintId: workflow.treatyConstraintId,
      dateCreated: new Date().toISOString(),
      stages: workflow.stages.map((stg, idx) => ({
        ...stg,
        status: idx === 0 ? 'PENDING' : 'LOCKED'
      })),
      log: [`Sovereign cross-gov workflow initiated. Guided by Treaty ${treaty.id} rules.`]
    };

    this.workflows.unshift(fresh);
    return fresh;
  }

  public static approveWorkflowStage(workflowId: string, signature: string): CrossGovWorkflow | undefined {
    const wf = this.workflows.find(w => w.id === workflowId);
    if (!wf || wf.status !== 'IN_PROGRESS') return wf;

    const currentStage = wf.stages[wf.currentStageIndex];
    if (!currentStage) return wf;

    currentStage.status = 'APPROVED';
    currentStage.signatureUsed = signature;
    currentStage.lastUpdated = new Date().toISOString();
    wf.log.push(`Stage [${currentStage.label.en}] APPROVED with executive signature: ${signature}.`);

    // Advance to next stage or complete
    if (wf.currentStageIndex < wf.stages.length - 1) {
      wf.currentStageIndex += 1;
      wf.stages[wf.currentStageIndex].status = 'PENDING';
      wf.log.push(`Advanced workflow focus to stage: [${wf.stages[wf.currentStageIndex].label.en}].`);
    } else {
      wf.status = 'COMPLETED';
      wf.log.push('Sovereign cross-boundary process successfully completed and archived.');
    }

    // Publish to event bus
    FederationEventBus.publish({
      type: 'EXECUTIVE_DECISION',
      sourceJurisdiction: 'joint',
      actor: signature,
      payload: { workflowId, stageId: currentStage.id, action: 'APPROVED' }
    });

    return wf;
  }

  public static rejectWorkflow(workflowId: string, signature: string, reason: string): CrossGovWorkflow | undefined {
    const wf = this.workflows.find(w => w.id === workflowId);
    if (!wf || wf.status !== 'IN_PROGRESS') return wf;

    const currentStage = wf.stages[wf.currentStageIndex];
    if (currentStage) {
      currentStage.status = 'REJECTED';
      currentStage.signatureUsed = signature;
      currentStage.lastUpdated = new Date().toISOString();
    }

    wf.status = 'TERMINATED';
    wf.log.push(`TERMINATED by ${signature}. Reason: ${reason}`);

    FederationEventBus.publish({
      type: 'EXECUTIVE_DECISION',
      sourceJurisdiction: 'joint',
      actor: signature,
      payload: { workflowId, action: 'TERMINATED', reason }
    });

    return wf;
  }
}
