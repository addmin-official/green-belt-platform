import { ApiContract, ProviderDomain, JurisdictionScope } from './ApiContractTypes';
import { BorderApiContract } from './BorderApiContract';
import { CustomsApiContract } from './CustomsApiContract';
import { RevenueApiContract } from './RevenueApiContract';
import { TradeApiContract } from './TradeApiContract';
import { TransparencyApiContract } from './TransparencyApiContract';
import { IdentityApiContract } from './IdentityApiContract';
import { WorkforceApiContract } from './WorkforceApiContract';
import { SecurityApiContract } from './SecurityApiContract';
import { IntelligenceApiContract } from './IntelligenceApiContract';
import { AuditApiContract } from './AuditApiContract';
import { LedgerApiContract } from './LedgerApiContract';
import { WorkflowApiContract } from './WorkflowApiContract';
import { JointReconciliationApiContract } from './JointReconciliationApiContract';

export class ApiContractRegistry {
  private static contracts: ApiContract[] = [
    BorderApiContract,
    CustomsApiContract,
    RevenueApiContract,
    TradeApiContract,
    TransparencyApiContract,
    IdentityApiContract,
    WorkforceApiContract,
    SecurityApiContract,
    IntelligenceApiContract,
    AuditApiContract,
    LedgerApiContract,
    WorkflowApiContract,
    JointReconciliationApiContract
  ];

  public static getAllContracts(): ApiContract[] {
    return this.contracts;
  }

  public static getContractsByDomain(domain: ProviderDomain): ApiContract[] {
    return this.contracts.filter(c => c.domain === domain);
  }

  public static getContractsByJurisdiction(jurisdiction: JurisdictionScope): ApiContract[] {
    return this.contracts.filter(c => c.allowedJurisdictions.includes(jurisdiction));
  }

  public static getContractByDomainAndJurisdiction(domain: ProviderDomain, jurisdiction: JurisdictionScope): ApiContract | undefined {
    // Check jurisdiction mapping:
    // If jurisdiction is JOINT_OPERATIONS, prefer a joint contract, otherwise standard
    const matches = this.contracts.filter(c => c.domain === domain && c.allowedJurisdictions.includes(jurisdiction));
    
    if (jurisdiction === 'JOINT_OPERATIONS') {
      const jointSpecific = matches.find(c => c.metadataOnlyRuleIfJoint);
      if (jointSpecific) return jointSpecific;
    }
    return matches[0];
  }
}
