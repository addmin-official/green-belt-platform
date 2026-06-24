import { BorderSettlementStatusType } from './BorderSettlementTypes';

/**
 * @file BorderSettlementVisibilityPolicy.ts
 * @description Enforcement logic for border-specific revenue data boundaries. No admin or system role can bypass these rules.
 */

export class BorderSettlementVisibilityPolicy {
  /**
   * KRG can view raw KRG border revenue inside KRG zone.
   */
  public static canKrgViewRawBorderRevenue(
    requesterJurisdiction: 'KRG' | 'FEDERAL' | 'JOINT',
    activeZone: 'KRG' | 'FEDERAL' | 'JOINT'
  ): boolean {
    return requesterJurisdiction === 'KRG' && activeZone === 'KRG';
  }

  /**
   * Federal cannot freely view raw KRG border transaction data.
   */
  public static canFederalViewRawKrgBorderRevenue(): boolean {
    return false; // Strict KRG_ONLY isolation for raw transactions
  }

  /**
   * Federal can view approved settlement summaries and treasury status only when legal basis allows.
   */
  public static canFederalViewApprovedSettlementSummary(
    hasLegalBasisActivation: boolean,
    status: BorderSettlementStatusType
  ): boolean {
    if (!hasLegalBasisActivation) {
      return false;
    }
    const isApprovedOrSettled = [
      'APPROVED',
      'TRANSFER_PENDING',
      'TRANSFER_CONFIRMED',
      'RECONCILED'
    ].includes(status);
    return isApprovedOrSettled;
  }

  /**
   * Joint can view metadata, hashes, proof, settlement status, transfer status, and dispute status only.
   */
  public static canJointViewRawBorderTransactions(): boolean {
    return false; // Joint never accesses raw transaction rows. Metadata/hashes only.
  }

  /**
   * Technical Admin can view configuration and readiness status but not raw KRG border revenue payloads.
   */
  public static canTechnicalAdminInspectSettings(isTechnicalAdmin: boolean): boolean {
    return isTechnicalAdmin;
  }

  public static canTechnicalAdminReadRawPayloads(): boolean {
    return false; // Technical Admins are strictly bound by the same payload isolation protocols.
  }

  /**
   * Admin cannot bypass sovereignty rules.
   */
  public static canAdminBypassSovereigntyRules(): boolean {
    return false; // Strictly forbidden
  }
}
