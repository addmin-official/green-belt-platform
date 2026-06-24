import React, { createContext, useContext, useState, useEffect } from 'react';

export type GovernmentContextType = 'FEDERAL_IRAQ' | 'KURDISTAN_REGION' | 'JOINT_OPERATIONS';
export type JurisdictionType = 'federal' | 'krg' | 'joint';

export interface AuditLog {
  id: string;
  actor: string;
  jurisdiction: JurisdictionType;
  authority: string;
  timestamp: string;
  details: string;
  policyContext: string;
  federationStatus: 'none' | 'pending' | 'federated' | 'denied';
}

export interface CustomsRecord {
  id: string;
  declarationId: string;
  importer: string;
  status: 'approved' | 'audited' | 'flagged' | 'pending';
  origin: string;
  destination: string;
  hsCode: string;
  assessedValue: number;
  taxCollected: number;
  jurisdiction: JurisdictionType;
  governmentId: string;
  authorityId: string;
  regionId: string;
}

export interface PolicyRecord {
  id: string;
  title: string;
  category: string;
  status: 'active' | 'draft' | 'under-review';
  lastUpdated: string;
  jurisdiction: JurisdictionType;
  governmentId: string;
  authorityId: string;
  regionId: string;
  content: string;
}

export interface IdentityRecord {
  id: string;
  nationalId: string;
  fullName: string;
  biometricStatus: 'verified' | 'pending' | 'compromised';
  clearanceLevel: 'unclassified' | 'confidential' | 'secret' | 'top-secret';
  jurisdiction: JurisdictionType;
  governmentId: string;
  authorityId: string;
  regionId: string;
}

export interface PKIAuthority {
  rootCN: string;
  pkiRootSec: string;
  sha256Fingerprint: string;
  certChainDepth: number;
  trustStatus: 'active' | 'revoked' | 'federated';
  signatureAlgorithm: string;
  jurisdiction: JurisdictionType;
  authorityId: string;
}

export interface DataFabricSchema {
  schemaName: string;
  tablesCount: number;
  storageDomain: string;
  eventStreamUrl: string;
  aiContextModel: string;
  jurisdiction: JurisdictionType;
  lastSync: string;
}

export interface FederationTransaction {
  id: string;
  serviceType: 'identity' | 'customs' | 'trade' | 'security' | 'statistics' | 'economic';
  payloadSummary: string;
  sourceJurisdiction: JurisdictionType;
  targetJurisdiction: JurisdictionType;
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  approvedBy?: string;
  timestamp: string;
  complianceDocVerified: boolean;
}

export interface JointCrisisTask {
  id: string;
  taskName: string;
  status: 'open' | 'resolving' | 'mitigated';
  leadAuthority: string;
  jurisdiction: JurisdictionType;
  coordinatingParties: string;
}

interface GovernmentContextData {
  activeContext: GovernmentContextType;
  setActiveContext: (context: GovernmentContextType) => void;
  lang: 'en' | 'ar' | 'ku';
  
  // Dynamic Data Fabric
  customsRecords: CustomsRecord[];
  addCustomsRecord: (record: Omit<CustomsRecord, 'jurisdiction' | 'governmentId' | 'authorityId' | 'regionId'>) => void;
  
  // Dynamic Policies
  policies: PolicyRecord[];
  addPolicy: (policy: Omit<PolicyRecord, 'jurisdiction' | 'governmentId' | 'authorityId' | 'regionId'>) => void;
  
  // Identities
  identities: IdentityRecord[];
  addIdentity: (identity: Omit<IdentityRecord, 'jurisdiction' | 'governmentId' | 'authorityId' | 'regionId'>) => void;
  
  // PKI Roots
  pkiFederal: PKIAuthority;
  pkiKrg: PKIAuthority;
  updatePkiStatus: (jurisdiction: 'federal' | 'krg', status: 'active' | 'revoked' | 'federated') => void;
  
  // Data Fabrics
  federalFabricSchema: DataFabricSchema;
  krgFabricSchema: DataFabricSchema;
  
  // Audits
  auditTrail: AuditLog[];
  logAction: (actor: string, details: string, policyContext: string, federationStatus?: 'none' | 'pending' | 'federated' | 'denied') => void;
  
  // Roles
  userRole: string;
  setUserRole: (role: string) => void;
  availableRoles: string[];
  
  // Federation Gateway
  federationTransactions: FederationTransaction[];
  requestFederation: (serviceType: FederationTransaction['serviceType'], payloadSummary: string, requestedBy: string) => void;
  approveFederation: (id: string, approvedBy: string) => void;
  rejectFederation: (id: string, approvedBy: string) => void;

  // Joint crisis tasks
  jointTasks: JointCrisisTask[];
  addJointTask: (taskName: string, leadAuthority: string, coordinatingParties: string) => void;
  resolveJointTask: (id: string) => void;
}

const GovernmentContext = createContext<GovernmentContextData | undefined>(undefined);

const SEED_CUSTOMS: CustomsRecord[] = [
  // Federal
  {
    id: 'cust-fed-101',
    declarationId: 'DEC-2026-F001',
    importer: 'Baghdad National Import Corp',
    status: 'pending',
    origin: 'Umm Qasr Port, Basra',
    destination: 'Baghdad Central Depot',
    hsCode: '8471.30.10',
    assessedValue: 1450000,
    taxCollected: 116000,
    jurisdiction: 'federal',
    governmentId: 'GOV-IQ-FED',
    authorityId: 'AUTH-CUSTOMS-FED',
    regionId: 'REG-SOUTH',
  },
  {
    id: 'cust-fed-102',
    declarationId: 'DEC-2026-F002',
    importer: 'Mesopotamia Trade Association',
    status: 'audited',
    origin: 'Border Terminal 5, Anbar',
    destination: 'Hillah Industrial Complex',
    hsCode: '8708.29.90',
    assessedValue: 620000,
    taxCollected: 49600,
    jurisdiction: 'federal',
    governmentId: 'GOV-IQ-FED',
    authorityId: 'AUTH-CUSTOMS-FED',
    regionId: 'REG-WEST',
  },
  // KRG
  {
    id: 'cust-krg-201',
    declarationId: 'DEC-2026-K001',
    importer: 'Zagros Logistics Ltd',
    status: 'approved',
    origin: 'Ibrahim Khalil Crossing',
    destination: 'Erbil Distribution Center',
    hsCode: '8429.51.00',
    assessedValue: 890000,
    taxCollected: 71200,
    jurisdiction: 'krg',
    governmentId: 'GOV-KRG-REG',
    authorityId: 'AUTH-CUSTOMS-KRG',
    regionId: 'REG-ERBIL',
  },
  {
    id: 'cust-krg-202',
    declarationId: 'DEC-2026-K002',
    importer: 'Duhok Trade Agencies',
    status: 'flagged',
    origin: 'Soran Logistic Railhead',
    destination: 'Sulaymaniyah Retail Hub',
    hsCode: '7214.20.00',
    assessedValue: 310000,
    taxCollected: 24800,
    jurisdiction: 'krg',
    governmentId: 'GOV-KRG-REG',
    authorityId: 'AUTH-CUSTOMS-KRG',
    regionId: 'REG-DUHOK',
  },
];

const SEED_POLICIES: PolicyRecord[] = [
  // Federal
  {
    id: 'pol-fed-01',
    title: 'Tariff Reform Directive No. 23 (Federal)',
    category: 'Customs & Imposts',
    status: 'active',
    lastUpdated: '2026-05-18',
    jurisdiction: 'federal',
    governmentId: 'GOV-IQ-FED',
    authorityId: 'AUTH-CABINET-FED',
    regionId: 'REG-BAGHDAD',
    content: 'Enforces an 8% flat-rate excise tariff on all high-capacity computing processing units and communication gateways imported through southern sea ports under sovereign trade protocol.',
  },
  // KRG
  {
    id: 'pol-krg-01',
    title: 'Kurdistan Region Investment Tariff Exemption Act',
    category: 'Regional Development',
    status: 'active',
    lastUpdated: '2026-04-22',
    jurisdiction: 'krg',
    governmentId: 'GOV-KRG-REG',
    authorityId: 'AUTH-KRG-CABINET',
    regionId: 'REG-ERBIL',
    content: 'Grants zero-rate customs exemptions for building materials and heavy infrastructure machinery imported directly for authenticated Erbil and Duhok smart-city zoning projects.',
  },
];

const SEED_IDENTITIES: IdentityRecord[] = [
  // Federal
  {
    id: 'id-fed-301',
    nationalId: 'IQ-110293-8472',
    fullName: 'Mustafa Al-Hashimi',
    biometricStatus: 'verified',
    clearanceLevel: 'secret',
    jurisdiction: 'federal',
    governmentId: 'GOV-IQ-FED',
    authorityId: 'AUTH-NID-FED',
    regionId: 'REG-BAGHDAD',
  },
  {
    id: 'id-fed-302',
    nationalId: 'IQ-158291-7541',
    fullName: 'Zainab Al-Khafaji',
    biometricStatus: 'verified',
    clearanceLevel: 'top-secret',
    jurisdiction: 'federal',
    governmentId: 'GOV-IQ-FED',
    authorityId: 'AUTH-NID-FED',
    regionId: 'REG-BASRA',
  },
  // KRG
  {
    id: 'id-krg-401',
    nationalId: 'KR-249102-1294',
    fullName: 'Aram Barzani',
    biometricStatus: 'verified',
    clearanceLevel: 'secret',
    jurisdiction: 'krg',
    governmentId: 'GOV-KRG-REG',
    authorityId: 'AUTH-NID-KRG',
    regionId: 'REG-ERBIL',
  },
  {
    id: 'id-krg-402',
    nationalId: 'KR-285011-8411',
    fullName: 'Shavgar Sulaiman',
    biometricStatus: 'pending',
    clearanceLevel: 'unclassified',
    jurisdiction: 'krg',
    governmentId: 'GOV-KRG-REG',
    authorityId: 'AUTH-NID-KRG',
    regionId: 'REG-SULAYMANIYAH',
  },
];

const SEED_FEDERATION_TX: FederationTransaction[] = [
  {
    id: 'fed-tx-001',
    serviceType: 'identity',
    payloadSummary: 'Cross-registry sync request for Aram Barzani (KR-249102-1294)',
    sourceJurisdiction: 'krg',
    targetJurisdiction: 'federal',
    status: 'approved',
    requestedBy: 'KRG Security Liaison',
    approvedBy: 'Federal Security Auditor',
    timestamp: '2026-06-08T03:10:00Z',
    complianceDocVerified: true,
  },
  {
    id: 'fed-tx-002',
    serviceType: 'customs',
    payloadSummary: 'Ibrahim Khalil custom declaration linkup for DEC-2026-K001',
    sourceJurisdiction: 'krg',
    targetJurisdiction: 'federal',
    status: 'pending',
    requestedBy: 'Kurdistan Customs Administrator',
    timestamp: '2026-06-08T08:15:00Z',
    complianceDocVerified: true,
  }
];

const SEED_JOINT_TASKS: JointCrisisTask[] = [
  {
    id: 'jct-1',
    taskName: 'Customs Interoperability Border Setup at Ibrahim Khalil',
    status: 'resolving',
    leadAuthority: 'Joint Operations Command Center',
    jurisdiction: 'joint',
    coordinatingParties: 'Federal Customs + KRG Customs Commission'
  },
  {
    id: 'jct-2',
    taskName: 'Dual Intelligence Sharing for Northern Freight Corridors',
    status: 'open',
    leadAuthority: 'Federation Intelligence Core',
    jurisdiction: 'joint',
    coordinatingParties: 'Baghdad Security Admin + Erbil Security Bureau'
  }
];

export const GovernmentProvider: React.FC<{ children: React.ReactNode; lang: 'en' | 'ar' | 'ku' }> = ({ children, lang }) => {
  const [activeContext, setActiveContext] = useState<GovernmentContextType>(() => {
    return (localStorage.getItem('idg_government_context') as GovernmentContextType) || 'FEDERAL_IRAQ';
  });

  const [customsList, setCustomsList] = useState<CustomsRecord[]>(SEED_CUSTOMS);
  const [policyList, setPolicyList] = useState<PolicyRecord[]>(SEED_POLICIES);
  const [identityList, setIdentityList] = useState<IdentityRecord[]>(SEED_IDENTITIES);
  const [federationTxList, setFederationTxList] = useState<FederationTransaction[]>(SEED_FEDERATION_TX);
  const [jointTaskList, setJointTaskList] = useState<JointCrisisTask[]>(SEED_JOINT_TASKS);

  const [pkiFederal, setPkiFederal] = useState<PKIAuthority>({
    rootCN: 'Federal Iraq Sovereign NID Root CA - G1',
    pkiRootSec: 'SEC_ROOT_NID_FED_IRAQ_RSA_4096_SHA256_V1',
    sha256Fingerprint: '9B:4C:E6:39:AA:BF:7D:61:A8:CC:DE:B0:12:F4:7E:58:3B:18',
    certChainDepth: 4,
    trustStatus: 'active',
    signatureAlgorithm: 'SHA256withRSA',
    jurisdiction: 'federal',
    authorityId: 'AUTH-PKI-FED'
  });

  const [pkiKrg, setPkiKrg] = useState<PKIAuthority>({
    rootCN: 'KRG National Identity Security CA - R1',
    pkiRootSec: 'SEC_ROOT_NID_KRG_SECURE_ECDSA_384_V1',
    sha256Fingerprint: '3F:8A:23:4C:E6:E1:92:0A:7B:CE:F5:6A:B9:0D:37:C3:FF:11',
    certChainDepth: 3,
    trustStatus: 'active',
    signatureAlgorithm: 'SHA256withECDSA',
    jurisdiction: 'krg',
    authorityId: 'AUTH-PKI-KRG'
  });

  const [auditList, setAuditList] = useState<AuditLog[]>([
    {
      id: 'aud-seed-1',
      actor: 'Federal Prime Minister Agent',
      jurisdiction: 'federal',
      authority: 'Federal Administration Office',
      timestamp: '2026-06-08T01:30:20Z',
      details: 'Sovereign Federal Audit Ticker Initialized. Active schemas checked and sealed.',
      policyContext: 'FEDERAL_SYSTEM_AUDIT_V1',
      federationStatus: 'none',
    },
    {
      id: 'aud-seed-2',
      actor: 'KRG Prime Minister Director',
      jurisdiction: 'krg',
      authority: 'Erbil Cabinet Security Bureau',
      timestamp: '2026-06-08T02:00:15Z',
      details: 'Sovereign KRG Regional Security Engine initialized with ECDSA token verification.',
      policyContext: 'KRG_REGIONAL_SECURITY_ACT_2026',
      federationStatus: 'none',
    }
  ]);

  const federalRoleList = [
    'Federal Prime Minister', 
    'Federal Cabinet', 
    'Federal Border Authority', 
    'Federal Customs Authority', 
    'Federal Revenue Authority', 
    'Federal Trade Authority',
    'Federal Customs Auditor',
    'Federal Identity Analyst'
  ];
  const krgRoleList = [
    'Prime Minister of Kurdistan Region', 
    'KRG Cabinet', 
    'KRG Border Authority', 
    'KRG Customs Authority', 
    'KRG Revenue Authority', 
    'KRG Trade Authority',
    'KRG Prime Minister',
    'KRG Customs Inspector', 
    'KRG PKI Authority'
  ];
  const jointRoleList = [
    'Joint Coordination Council', 
    'Joint Revenue Board', 
    'Joint Border Committee', 
    'Joint Trade Committee',
    'Joint Crisis Coordinator', 
    'Border Arbitrator', 
    'Federation Integration Director'
  ];

  const getRolesForContext = (context: GovernmentContextType) => {
    switch (context) {
      case 'KURDISTAN_REGION':
        return krgRoleList;
      case 'JOINT_OPERATIONS':
        return jointRoleList;
      case 'FEDERAL_IRAQ':
      default:
        return federalRoleList;
    }
  };

  const [userRole, setUserRole] = useState<string>(() => {
    const roles = getRolesForContext(activeContext);
    return roles[0];
  });

  const availableRoles = getRolesForContext(activeContext);

  useEffect(() => {
    localStorage.setItem('idg_government_context', activeContext);
    const roles = getRolesForContext(activeContext);
    setUserRole(roles[0]);

    // Track active context switch in audit trail
    const timestampStr = new Date().toISOString();
    const targetJurisdiction: JurisdictionType = 
      activeContext === 'FEDERAL_IRAQ' ? 'federal' : activeContext === 'KURDISTAN_REGION' ? 'krg' : 'joint';
    
    const newLog: AuditLog = {
      id: `aud-sw-${Date.now()}`,
      actor: `User Profile Switcher`,
      jurisdiction: targetJurisdiction,
      authority: `${activeContext === 'FEDERAL_IRAQ' ? 'Federal National Portal' : activeContext === 'KURDISTAN_REGION' ? 'Erbil Regional Portal' : 'Joint Operations Room'}`,
      timestamp: timestampStr,
      details: `Active Command Center context pivoted to ${activeContext}. Roles, security registries, and datasets isolated.`,
      policyContext: 'IDG_JURISDICTION_GOVERNANCE_SYSTEM',
      federationStatus: 'none'
    };
    setAuditList(prev => [newLog, ...prev]);

  }, [activeContext]);

  // Shared schemas definitions for isolated physical-logic fabrics
  const federalFabricSchema: DataFabricSchema = {
    schemaName: 'Sovereign Federal Main Trade Schema (v5.4)',
    tablesCount: 142,
    storageDomain: 'FEDERAL_SECURE_CLOUD_BAGHDAD',
    eventStreamUrl: 'amqps://eventbus.federal.idg.gov.iq:5671/customs-events',
    aiContextModel: 'FEDERAL_COGNITIVE_MODEL_V5_STABLE',
    jurisdiction: 'federal',
    lastSync: '2026-06-08T08:10:00Z',
  };

  const krgFabricSchema: DataFabricSchema = {
    schemaName: 'KRG Sovereign Regional Schema (v3.2)',
    tablesCount: 89,
    storageDomain: 'KRG_CLUSTER_DATABASE_ERBIL',
    eventStreamUrl: 'amqps://eventbus.krg.gov.krd:5671/regional-customs',
    aiContextModel: 'KRG_COGNITIVE_MODEL_V3_REGIONAL_STABLE',
    jurisdiction: 'krg',
    lastSync: '2026-06-08T08:14:00Z',
  };

  // Log Actions helper
  const logAction = (actor: string, details: string, policyContext: string, federationStatus: AuditLog['federationStatus'] = 'none') => {
    const activeJurisdiction: JurisdictionType = 
      activeContext === 'FEDERAL_IRAQ' ? 'federal' : activeContext === 'KURDISTAN_REGION' ? 'krg' : 'joint';
    
    const newLog: AuditLog = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      actor,
      jurisdiction: activeJurisdiction,
      authority: activeJurisdiction === 'federal' ? 'Federal Iraq Authority' : activeJurisdiction === 'krg' ? 'KRG Executive Council' : 'Joint Operations Cabinet',
      timestamp: new Date().toISOString(),
      details,
      policyContext,
      federationStatus,
    };
    setAuditList(prev => [newLog, ...prev]);
  };

  const addCustomsRecord = (record: Omit<CustomsRecord, 'jurisdiction' | 'governmentId' | 'authorityId' | 'regionId'>) => {
    const currentJurisdiction: JurisdictionType = 
      activeContext === 'FEDERAL_IRAQ' ? 'federal' : activeContext === 'KURDISTAN_REGION' ? 'krg' : 'joint';
    
    const newRecord: CustomsRecord = {
      ...record,
      id: `cust-${Date.now()}`,
      jurisdiction: currentJurisdiction,
      governmentId: currentJurisdiction === 'federal' ? 'GOV-IQ-FED' : currentJurisdiction === 'krg' ? 'GOV-KRG-REG' : 'GOV-IQ-JOINT',
      authorityId: currentJurisdiction === 'federal' ? 'AUTH-CUSTOMS-FED' : currentJurisdiction === 'krg' ? 'AUTH-CUSTOMS-KRG' : 'AUTH-CUSTOMS-JOINT',
      regionId: currentJurisdiction === 'federal' ? 'REG-BAGHDAD' : currentJurisdiction === 'krg' ? 'REG-ERBIL' : 'REG-JOINT',
    };

    setCustomsList(prev => [newRecord, ...prev]);
    logAction(
      userRole,
      `Compiled Customs Record ${record.declarationId} for importer ${record.importer}. Target Destination: ${record.destination}`,
      'CUSTOMS_TAXATION_LAW_23'
    );
  };

  const addPolicy = (policy: Omit<PolicyRecord, 'jurisdiction' | 'governmentId' | 'authorityId' | 'regionId'>) => {
    const currentJurisdiction: JurisdictionType = 
      activeContext === 'FEDERAL_IRAQ' ? 'federal' : activeContext === 'KURDISTAN_REGION' ? 'krg' : 'joint';
    
    const newPolicy: PolicyRecord = {
      ...policy,
      id: `pol-${Date.now()}`,
      jurisdiction: currentJurisdiction,
      governmentId: currentJurisdiction === 'federal' ? 'GOV-IQ-FED' : currentJurisdiction === 'krg' ? 'GOV-KRG-REG' : 'GOV-IQ-JOINT',
      authorityId: currentJurisdiction === 'federal' ? 'AUTH-CABINET-FED' : currentJurisdiction === 'krg' ? 'AUTH-KRG-CABINET' : 'AUTH-JOINT-COMMITTEE',
      regionId: currentJurisdiction === 'federal' ? 'REG-BAGHDAD' : currentJurisdiction === 'krg' ? 'REG-ERBIL' : 'REG-JOINT',
    };

    setPolicyList(prev => [newPolicy, ...prev]);
    logAction(
      userRole,
      `Formulated active legal policy record: ${policy.title} under system catalog. Category: ${policy.category}`,
      'POLICY_GOVERNANCE_PROTOCOL'
    );
  };

  const addIdentity = (identity: Omit<IdentityRecord, 'jurisdiction' | 'governmentId' | 'authorityId' | 'regionId'>) => {
    const currentJurisdiction: JurisdictionType = 
      activeContext === 'FEDERAL_IRAQ' ? 'federal' : activeContext === 'KURDISTAN_REGION' ? 'krg' : 'joint';
    
    const newIdentity: IdentityRecord = {
      ...identity,
      id: `id-${Date.now()}`,
      jurisdiction: currentJurisdiction,
      governmentId: currentJurisdiction === 'federal' ? 'GOV-IQ-FED' : currentJurisdiction === 'krg' ? 'GOV-KRG-REG' : 'GOV-IQ-JOINT',
      authorityId: currentJurisdiction === 'federal' ? 'AUTH-NID-FED' : currentJurisdiction === 'krg' ? 'AUTH-NID-KRG' : 'AUTH-NID-JOINT',
      regionId: currentJurisdiction === 'federal' ? 'REG-BAGHDAD' : currentJurisdiction === 'krg' ? 'REG-ERBIL' : 'REG-JOINT',
    };

    setIdentityList(prev => [newIdentity, ...prev]);
    logAction(
      userRole,
      `Registered digital citizen profile: ${identity.fullName} with secure National Unique ID ${identity.nationalId}. Biometrics: ${identity.biometricStatus}`,
      'FEDERAL_CITIZEN_TRUST_SYSTEM'
    );
  };

  const updatePkiStatus = (jurisdiction: 'federal' | 'krg', status: PKIAuthority['trustStatus']) => {
    if (jurisdiction === 'federal') {
      setPkiFederal(prev => ({ ...prev, trustStatus: status }));
    } else {
      setPkiKrg(prev => ({ ...prev, trustStatus: status }));
    }
    logAction(
      userRole,
      `Updated cryptographic certificate authority certificate status for ${jurisdiction} PKI root to ${status}.`,
      'PKI_KEY_REVOCATION_LOG_V1_2'
    );
  };

  const requestFederation = (serviceType: FederationTransaction['serviceType'], payloadSummary: string, requestedBy: string) => {
    const currentJurisdiction: JurisdictionType = 
      activeContext === 'FEDERAL_IRAQ' ? 'federal' : activeContext === 'KURDISTAN_REGION' ? 'krg' : 'joint';
    
    const target: JurisdictionType = currentJurisdiction === 'federal' ? 'krg' : 'federal';

    const newTx: FederationTransaction = {
      id: `fed-tx-${Date.now()}`,
      serviceType,
      payloadSummary,
      sourceJurisdiction: currentJurisdiction,
      targetJurisdiction: target,
      status: 'pending',
      requestedBy,
      timestamp: new Date().toISOString(),
      complianceDocVerified: true
    };

    setFederationTxList(prev => [newTx, ...prev]);
    logAction(
      requestedBy,
      `Initiated Dual Federation Request [Type: ${serviceType}] across gateway node: ${payloadSummary}`,
      'CROSS_JURISDICTION_FEDERATION_PROTOCOL',
      'pending'
    );
  };

  const approveFederation = (id: string, approvedBy: string) => {
    let affectedTx: FederationTransaction | undefined;
    setFederationTxList(prev => prev.map(tx => {
      if (tx.id === id) {
        affectedTx = tx;
        return { ...tx, status: 'approved', approvedBy };
      }
      return tx;
    }));

    if (affectedTx) {
      logAction(
        approvedBy,
        `Approved cross-border trade/customs federation link and security handshake for ID: ${id} (${affectedTx.payloadSummary}).`,
        'FEDERATE_COMPLIANCE_LINK_SETTLED',
        'federated'
      );
    }
  };

  const rejectFederation = (id: string, approvedBy: string) => {
    let affectedTx: FederationTransaction | undefined;
    setFederationTxList(prev => prev.map(tx => {
      if (tx.id === id) {
        affectedTx = tx;
        return { ...tx, status: 'rejected', approvedBy };
      }
      return tx;
    }));

    if (affectedTx) {
      logAction(
        approvedBy,
        `Rejected trade federation transaction handshake with ID: ${id}. Secure boundaries preserved intact.`,
        'FEDERATE_DECLINE_RESTRCTION',
        'denied'
      );
    }
  };

  const addJointTask = (taskName: string, leadAuthority: string, coordinatingParties: string) => {
    const newTask: JointCrisisTask = {
      id: `jct-${Date.now()}`,
      taskName,
      status: 'open',
      leadAuthority,
      jurisdiction: 'joint',
      coordinatingParties,
    };
    setJointTaskList(prev => [newTask, ...prev]);
    logAction(
      userRole,
      `Command drafted inside Joint Operations: ${taskName}. Collaborators assigned: ${coordinatingParties}`,
      'JOINT_BORDER_SECURITY_EMERGENCY_ACT'
    );
  };

  const resolveJointTask = (id: string) => {
    setJointTaskList(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: 'mitigated' };
      }
      return t;
    }));
    logAction(
      userRole,
      `Resolved and closed Joint Crisis response task id: ${id}`,
      'JOINT_BORDER_SECURITY_EMERGENCY_ACT'
    );
  };

  return (
    <GovernmentContext.Provider value={{
      activeContext,
      setActiveContext,
      lang,
      customsRecords: customsList,
      addCustomsRecord,
      policies: policyList,
      addPolicy,
      identities: identityList,
      addIdentity,
      pkiFederal,
      pkiKrg,
      updatePkiStatus,
      federalFabricSchema,
      krgFabricSchema,
      auditTrail: auditList,
      logAction,
      userRole,
      setUserRole,
      availableRoles,
      federationTransactions: federationTxList,
      requestFederation,
      approveFederation,
      rejectFederation,
      jointTasks: jointTaskList,
      addJointTask,
      resolveJointTask,
    }}>
      {children}
    </GovernmentContext.Provider>
  );
};

export const useGovernment = () => {
  const context = useContext(GovernmentContext);
  if (!context) {
    throw new Error('useGovernment must be used within a GovernmentProvider');
  }
  return context;
};
