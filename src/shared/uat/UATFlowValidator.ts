import { UATRoleProfile } from './UATRoleRegistry';

export interface UATValidationResult {
  passed: boolean;
  message: string;
  remedyCode?: string;
}

export class UATFlowValidator {
  /**
    * Direct authorization validator targeting UAT Dry-Run interactions.
    * Rules: No fake data loaded, no cross-jurisdiction bypass.
    */
  public static validateAccess(role: UATRoleProfile, targetZone: string): UATValidationResult {
    // Technical Administrator configures infrastructure but has NO raw database query privileges
    if (role.id === 'tech-administrator') {
      if (targetZone.includes('Raw') || targetZone.toLowerCase().includes('revenue')) {
        return {
          passed: false,
          message: 'ACCESS BLOCKED: Technical Administrative role has infrastructure privileges only. Database content query is forbidden.',
          remedyCode: 'RESTRICT_ADMIN_DATABASE_PRIVILEGES'
        };
      }
      return {
        passed: true,
        message: 'AUTHORIZED: Administrator accessing infrastructure registry assets.'
      };
    }

    // Federal Viewers can never look into KRG Private Raw files
    if (role.jurisdiction === 'FEDERAL_IRAQ') {
      if (targetZone.includes('KRG') || targetZone.toLowerCase().includes('regional')) {
        return {
          passed: false,
          message: 'ACCESS DENIED: Federal Jurisdiction boundaries strictly prohibit reading regional KRG providers or operations.',
          remedyCode: 'BLOCK_FEDERAL_READING_KRG'
        };
      }
    }

    // KRG Viewers can never look into Federal Private Raw files
    if (role.jurisdiction === 'KRG') {
      if (targetZone.includes('Federal') || targetZone.toLowerCase().includes('national')) {
        if (targetZone !== 'National Aggregates' && targetZone !== 'Regional Aggregates') {
          return {
            passed: false,
            message: 'ACCESS DENIED: KRG Jurisdiction boundaries strictly prohibit reading national Federal systems or databases.',
            remedyCode: 'BLOCK_KRG_READING_FEDERAL'
          };
        }
      }
    }

    // Joint Auditor/Operators can never access raw revenue, raw customs, raw identity, raw workforce, raw intelligence, or raw security records.
    if (role.jurisdiction === 'JOINT_OPERATIONS') {
      const forbiddenSovereignTargets = [
        'raw revenue', 'raw customs', 'raw identity', 'raw workforce', 'raw intelligence', 'raw security',
        'raw_revenue', 'raw_customs', 'raw_identity', 'raw_workforce', 'raw_intelligence', 'raw_security',
        'revenue records', 'customs ledger'
      ];
      
      const normalizedTarget = targetZone.toLowerCase();
      const containsForbidden = forbiddenSovereignTargets.some(term => normalizedTarget.includes(term));
      if (containsForbidden) {
        return {
          passed: false,
          message: 'ACCESS DENIED: Joint Operations are strictly limited to metadata aggregates and reconciliation hashes. Viewing raw sovereign records is blocked.',
          remedyCode: 'ENFORCE_JOINT_SOVEREIGN_ISOLATION'
        };
      }
    }

    return {
      passed: true,
      message: 'AUTHORIZED: Access requests match registered role jurisdiction capabilities.'
    };
  }
}
