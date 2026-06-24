import { TreatyRegistry, Treaty, TreatyStatus } from './TreatyRegistry';
import { CustomsRecord, IdentityRecord } from '../../providers/GovernmentProvider';

export class TreatyEngine {
  
  /**
   * Evaluates if a given transaction or custom record crosses any active operational treaties and blocks/warns appropriately.
   */
  public static evaluateCustomsRecordCompliance(record: CustomsRecord): {
    compliant: boolean;
    brokenTreatyId?: string;
    warningMessage?: string;
  } {
    const treaties = TreatyRegistry.getTreaties().filter(t => t.type === 'customs' && t.status === 'ACTIVE');

    for (const treaty of treaties) {
      // Rule 1: Customs treaties mandate tariff synchronization. If value is above 500,000 and taxCollected is 0, warning
      if (record.assessedValue > 500000 && record.taxCollected === 0) {
        return {
          compliant: false,
          brokenTreatyId: treaty.id,
          warningMessage: `Potential treaty breach under ${treaty.id} (${treaty.title.en}). Large importer value without assessed tax.`
        };
      }
    }

    return { compliant: true };
  }

  /**
   * Evaluates if identity records are in compliance with federated trust rules.
   */
  public static evaluateIdentityCompliance(record: IdentityRecord): {
    compliant: boolean;
    brokenTreatyId?: string;
    reason?: string;
  } {
    const treaties = TreatyRegistry.getTreaties().filter(t => t.type === 'identity-federation');
    const hasActiveFederatedIdCompact = treaties.some(t => t.status === 'ACTIVE' || t.status === 'RATIFIED');

    if (!hasActiveFederatedIdCompact && record.jurisdiction === 'joint') {
      return {
        compliant: false,
        reason: 'No ratified Identity federation compact is active to handle Joint-cleared identity structures.'
      };
    }

    if (record.biometricStatus === 'compromised') {
      return {
        compliant: false,
        reason: 'CRITICAL: Citizen biometrics compromised. Access routes revoked under National Identity Treaty.'
      };
    }

    return { compliant: true };
  }

  /**
   * Generates dynamic behavior based on active treaties.
   */
  public static isCapabilityAllowed(type: 'customs-auto-clear' | 'identity-search' | 'joint-military-patrol'): boolean {
    const activeTreaties = TreatyRegistry.getTreaties().filter(t => t.status === 'ACTIVE');

    if (type === 'customs-auto-clear') {
      return activeTreaties.some(t => t.type === 'customs');
    }
    if (type === 'identity-search') {
      return activeTreaties.some(t => t.type === 'identity-federation');
    }
    if (type === 'joint-military-patrol') {
      return activeTreaties.some(t => t.type === 'security-cooperation');
    }

    return false;
  }
}
