export type Jurisdiction = 'FEDERAL' | 'KRG' | 'JOINT';

export interface SecurityAccessRequest {
  callerJurisdiction: Jurisdiction;
  targetProviderJurisdiction: Jurisdiction;
  dataType: string; // e.g., 'raw_revenue', 'raw_customs', 'raw_identity', 'raw_workforce', 'raw_intelligence', 'raw_security', 'metadata', 'hash', 'aggregate', 'reconciliation'
}

export class ProviderSecurityPolicy {
  /**
   * Enforces rules for data isolation and access permission:
   * Rule 10: Federal code must not read KRG providers.
   * Rule 11: KRG code must not read Federal providers.
   * Rule 12 & 13: Joint code must only read metadata, hashes, aggregates, and reconciliation status.
   * Joint code must never read raw revenue, raw customs, raw identity, raw workforce, raw intelligence, or raw security records.
   */
  public static validateAccess(request: SecurityAccessRequest): { allowed: boolean; reason?: string } {
    const { callerJurisdiction, targetProviderJurisdiction, dataType } = request;

    // Rule 10: Federal code must not read KRG providers.
    if (callerJurisdiction === 'FEDERAL' && targetProviderJurisdiction === 'KRG') {
      return { allowed: false, reason: 'SECURITY_BLOCKED: Federal code must not read KRG providers' };
    }

    // Rule 11: KRG code must not read Federal providers.
    if (callerJurisdiction === 'KRG' && targetProviderJurisdiction === 'FEDERAL') {
      return { allowed: false, reason: 'SECURITY_BLOCKED: KRG code must not read Federal providers' };
    }

    // Rule 12, 13: Joint code must only read metadata, hashes, aggregates, and reconciliation status.
    // Joint code must never read raw revenue, raw customs, raw identity, raw workforce, raw intelligence, or raw security records.
    if (callerJurisdiction === 'JOINT') {
      const forbiddenRawData = [
        'raw_revenue',
        'raw_customs',
        'raw_identity',
        'raw_workforce',
        'raw_intelligence',
        'raw_security'
      ];
      if (forbiddenRawData.includes(dataType)) {
        return { allowed: false, reason: `SECURITY_BLOCKED: Joint code must never read raw data type: ${dataType}` };
      }
    }

    return { allowed: true };
  }
}
