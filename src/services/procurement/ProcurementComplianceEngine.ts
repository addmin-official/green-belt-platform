import { ProcurementRegistry } from './ProcurementRegistry';
import { Tender, Bid, Vendor, Contract, ProcurementPolicy, Jurisdiction } from './ProcurementTypes';

export class ProcurementComplianceEngine {
  static getPolicies(): ProcurementPolicy[] {
    return ProcurementRegistry.getPolicies();
  }

  static verifyBidCompliance(tender: Tender, bid: Bid): { compliant: boolean; violations: string[] } {
    const violations: string[] = [];
    const vendors = ProcurementRegistry.getVendors();
    const vendor = vendors.find(v => v.id === bid.vendorId);

    if (!vendor) {
      violations.push('Vendor profile is unregistered or missing.');
      return { compliant: false, violations };
    }

    // 1. Core Sanction Check: Blacklisted vendors cannot win contracts
    if (vendor.status === 'Blacklisted') {
      violations.push('Vendor is currently on the Sovereign Blacklist due to prior compliance failures.');
    }
    if (vendor.status === 'Suspended') {
      violations.push('Vendor is currently suspended pending an active procurement audit.');
    }

    // 2. Financial Threshold Overload Check
    if (bid.proposalUSD > tender.budgetUSD * 1.15) {
      violations.push(`Proposal of $${bid.proposalUSD}M exceeds the published tender budget limit of $${tender.budgetUSD}M by more than 15%.`);
    }

    // 3. Vendor Supplier Risk Cap Check
    // If supplier risk score is critical (> 70) and proposal is federal/joint, raise violation
    if (vendor.supplierRiskScore > 70 && tender.jurisdiction !== 'krg') {
      violations.push(`Sovereign risk score of ${vendor.supplierRiskScore}% exceeds maximum threshold for federal/joint procurements.`);
    }

    // 4. Policy Matching Rules
    const activePolicies = this.getPolicies().filter(p => p.active && p.jurisdiction === tender.jurisdiction);
    activePolicies.forEach(policy => {
      // If the tender exceeds the policy threshold, check rules
      if (tender.budgetUSD >= policy.thresholdMillionsUSD) {
        if (policy.jurisdiction === 'joint') {
          // Rule requirement: joint vendors need dual authorization clearances
          if (vendor.jurisdiction !== 'joint' && !vendor.registrationNumber.includes('INT')) {
            violations.push(`Treaty Compliance: Large joint contract ($${tender.budgetUSD}M >= $${policy.thresholdMillionsUSD}M) requires an intergovernmental joint portal registration.`);
          }
        }
        if (policy.jurisdiction === 'federal') {
          // Rule requirement: maximum risk qualification cap of 80
          if (vendor.qualificationScore < 70) {
            violations.push(`Federal Rule: Vendor qualification score is ${vendor.qualificationScore} (required >= 70 for major infrastructure).`);
          }
        }
        if (policy.jurisdiction === 'krg') {
          // KRG threshold limits
          if (vendor.qualificationScore < 60) {
            violations.push(`KRG Rule: Qualification rating too low (${vendor.qualificationScore} < 60).`);
          }
        }
      }
    });

    return {
      compliant: violations.length === 0,
      violations,
    };
  }

  static verifyContractCompliance(contract: Contract): { compliant: boolean; violations: string[] } {
    const violations: string[] = [];
    const vendors = ProcurementRegistry.getVendors();
    const vendor = vendors.find(v => v.id === contract.vendorId);

    if (!vendor) {
      violations.push('Associated vendor record is missing.');
    } else {
      if (vendor.status === 'Blacklisted') {
        violations.push('Contract active with a blacklisted supplier.');
      }
    }

    // Performance threshold violation: if composite score drops below 50, raise alert
    if (contract.performanceScore < 50) {
      violations.push(`Contract performance rating has dropped dangerously low (${contract.performanceScore}%). High risk of default.`);
    }

    // Over-budget spending check
    if (contract.spentUSD > contract.valueUSD) {
      violations.push(`Disbursement overload: Spent $${contract.spentUSD}M exceeds total contract valuation limit of $${contract.valueUSD}M.`);
    }

    return {
      compliant: violations.length === 0,
      violations,
    };
  }
}
