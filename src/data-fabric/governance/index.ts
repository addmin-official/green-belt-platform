// IDG National Data Governance Layer - Policies, Retention & Approval Workflows
// Compliant with Federal Information Management Standards

export interface RetentionPolicy {
  id: string;
  categoryName: string;
  rentetionPeriodYears: number;
  encryptionModeRequired: 'HSM_AES_256_GCM' | 'STANDARD_SSL' | 'NONE';
  purgingProcedure: 'PHYSICAL_DESTRUCTION' | 'CRYPTOGRAPHIC_ERASURE_MANDATORY' | 'OFFLINE_COLD_ARCHIVE';
}

export interface GovernanceStewardshipMap {
  ministry: string;
  dataOwnerRole: string; // The principal official responsible
  dataStewardName: string; // The operational compliance officer
  dataCustodianSystem: string; // The hosting datacenter infrastructure
}

export interface AccessRequestWorkflow {
  id: string;
  requestorUsername: string;
  requestorRole: string;
  targetDatasetId: string;
  requiredClassification: string;
  justification: string;
  approversChain: { role: string; signed: boolean; name?: string }[];
  status: 'PENDING_APPROVAL' | 'APPROVED_AND_KEY_GRANTED' | 'REJECTED';
  startedAt: string;
  resolvedAt?: string;
}

export class NationalDataGovernance {
  private static instance: NationalDataGovernance;

  private activeWorkflows: AccessRequestWorkflow[] = [];
  private retentionPolicies: RetentionPolicy[] = [];
  private stewardshipList: GovernanceStewardshipMap[] = [];

  private constructor() {
    this.seedGovernanceElements();
  }

  public static getInstance(): NationalDataGovernance {
    if (!NationalDataGovernance.instance) {
      NationalDataGovernance.instance = new NationalDataGovernance();
    }
    return NationalDataGovernance.instance;
  }

  private seedGovernanceElements() {
    this.stewardshipList = [
      {
        ministry: 'Ministry of Interior',
        dataOwnerRole: 'Director General of National Civil Registration',
        dataStewardName: 'Major General Ahmed Al-Yassiri',
        dataCustodianSystem: 'Federal Secure Datacenter - Node Baghdad'
      },
      {
        ministry: 'Ministry of Trade',
        dataOwnerRole: 'Sovereign Registrar of Companies Commissioner',
        dataStewardName: 'Dr. Layla Salem',
        dataCustodianSystem: 'Federal Private Cloud - Node Erbil backup'
      },
      {
        ministry: 'Central Bank of Iraq',
        dataOwnerRole: 'Governor of the Central Bank of Iraq',
        dataStewardName: 'Firas Al-Husseini (AOC/FIU Director)',
        dataCustodianSystem: 'CBI Sovereign Ledger Isolation Vault'
      },
      {
        ministry: 'General Authority for Customs',
        dataOwnerRole: 'Director of Federal Customs Control',
        dataStewardName: 'Colonel Salman Al-Rawi',
        dataCustodianSystem: 'Border Gate Edge Datacenters Cluster'
      }
    ];

    this.retentionPolicies = [
      {
        id: 'ret-citizens-id',
        categoryName: 'Biometric Civil Identity Data Records',
        rentetionPeriodYears: 99, // Intergenerational retention
        encryptionModeRequired: 'HSM_AES_256_GCM',
        purgingProcedure: 'CRYPTOGRAPHIC_ERASURE_MANDATORY'
      },
      {
        id: 'ret-commercial-tax',
        categoryName: 'Corporate Financial Master Records & Audits',
        rentetionPeriodYears: 15,
        encryptionModeRequired: 'HSM_AES_256_GCM',
        purgingProcedure: 'OFFLINE_COLD_ARCHIVE'
      },
      {
        id: 'ret-customs-passengers',
        categoryName: 'Border Transit Manifests & Customs Decs',
        rentetionPeriodYears: 10,
        encryptionModeRequired: 'STANDARD_SSL',
        purgingProcedure: 'CRYPTOGRAPHIC_ERASURE_MANDATORY'
      }
    ];

    // Seed Active Workflows
    this.activeWorkflows.push({
      id: 'gwf-1002',
      requestorUsername: 'Intelligence Officer - Nassim Al-Sadr',
      requestorRole: 'Intelligence Analyst',
      targetDatasetId: 'ds-currency-reserves-03',
      requiredClassification: 'SECRET',
      justification: 'Audit matching suspect foreign trade remittance anomalies with custom HS codes.',
      startedAt: '2026-06-05T09:00:00Z',
      status: 'PENDING_APPROVAL',
      approversChain: [
        { role: 'CBI Financial Governor Delegator', signed: true, name: 'Firas Al-Husseini' },
        { role: 'National Security Agency Supervisor', signed: false }
      ]
    });

    this.activeWorkflows.push({
      id: 'gwf-1001',
      requestorUsername: 'Border Officer - Aras Karwan',
      requestorRole: 'Border Officer',
      targetDatasetId: 'ds-national-citizens-01',
      requiredClassification: 'TOP_SECRET',
      justification: 'Biometric lookups on cross-border diplomatic travelers.',
      startedAt: '2026-06-04T12:00:00Z',
      resolvedAt: '2026-06-04T14:30:00Z',
      status: 'APPROVED_AND_KEY_GRANTED',
      approversChain: [
        { role: 'Directorate of National Cards Delegator', signed: true, name: 'Major General Ahmed Al-Yassiri' },
        { role: 'Ministry of Interior Supreme Approver', signed: true, name: 'Dr. Tariq Al-Jamil' }
      ]
    });
  }

  public getStewardships(): GovernanceStewardshipMap[] {
    return this.stewardshipList;
  }

  public getRetentionPolicies(): RetentionPolicy[] {
    return this.retentionPolicies;
  }

  public getWorkflows(): AccessRequestWorkflow[] {
    return this.activeWorkflows;
  }

  /**
   * Actioning access request workflow sign-off dynamic step-up approvals
   */
  public signWorkflowApprovalStep(workflowId: string, approverRole: string, approverName: string): AccessRequestWorkflow | undefined {
    const wf = this.activeWorkflows.find(w => w.id === workflowId);
    if (!wf) return undefined;

    // Find unsigned step matching approver
    const step = wf.approversChain.find(s => s.role === approverRole && !s.signed);
    if (step) {
      step.signed = true;
      step.name = approverName;
    }

    // If all steps signed, promote state
    const allSigned = wf.approversChain.every(s => s.signed);
    if (allSigned) {
      wf.status = 'APPROVED_AND_KEY_GRANTED';
      wf.resolvedAt = new Date().toISOString();
    }

    return wf;
  }
}
