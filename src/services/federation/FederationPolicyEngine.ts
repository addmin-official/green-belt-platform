export type PolicyType = 'FEDERAL_ONLY' | 'KRG_ONLY' | 'JOINT' | 'DELEGATED' | 'EMERGENCY';

export interface PolicyRule {
  id: string;
  name: string;
  type: PolicyType;
  jurisdictionContext: 'federal' | 'krg' | 'joint';
  requiredRole: string;
  description: string;
  requiresBilateralSignoff: boolean;
  emergencyOverrideAllowed: boolean;
}

export const DECISION_AUTHORITY_MATRIX: PolicyRule[] = [
  {
    id: 'RULE-POL-001',
    name: 'National Sea Port Tariffs Ratification',
    type: 'FEDERAL_ONLY',
    jurisdictionContext: 'federal',
    requiredRole: 'Federal Prime Minister',
    description: 'Ratification of maritime trade tariffs. Purely under federal sovereignty, no sub-national deviation permitted.',
    requiresBilateralSignoff: false,
    emergencyOverrideAllowed: false,
  },
  {
    id: 'RULE-POL-002',
    name: 'Kurdistan Regional Investment Subsidies',
    type: 'KRG_ONLY',
    jurisdictionContext: 'krg',
    requiredRole: 'KRG Prime Minister',
    description: 'Zoning development subsidies inside regional territory. Supervised directly by Erbil cabinet.',
    requiresBilateralSignoff: false,
    emergencyOverrideAllowed: true,
  },
  {
    id: 'RULE-POL-003',
    name: 'Unified Border Point Operations Protocol',
    type: 'JOINT',
    jurisdictionContext: 'joint',
    requiredRole: 'Joint Crisis Coordinator',
    description: 'Customs data federation at joint borders. Requires bilateral assent from both federal and regional directors.',
    requiresBilateralSignoff: true,
    emergencyOverrideAllowed: false,
  },
  {
    id: 'RULE-POL-004',
    name: 'Trade Manifest Clearance Advisory',
    type: 'DELEGATED',
    jurisdictionContext: 'joint',
    requiredRole: 'Federal Customs Auditor',
    description: 'Automated HS classification checks delegated to cross-government AI systems under general guidelines.',
    requiresBilateralSignoff: false,
    emergencyOverrideAllowed: true,
  },
  {
    id: 'RULE-POL-005',
    name: 'Critical Border Closure Mandate',
    type: 'EMERGENCY',
    jurisdictionContext: 'joint',
    requiredRole: 'Joint Crisis Coordinator',
    description: 'Immediate suspension of border and freight corridors due to high risk or security breach.',
    requiresBilateralSignoff: false,
    emergencyOverrideAllowed: true,
  }
];

export class FederationPolicyEngine {
  
  /**
   * Evaluates if a proposed transaction or action of specific PolicyType can proceed
   * given a user role, the active context, and current federation state.
   */
  static evaluateAction({
    policyId,
    actorRole,
    activeContext,
    isEmergencyOverride = false
  }: {
    policyId: string;
    actorRole: string;
    activeContext: string;
    isEmergencyOverride?: boolean;
  }): { allowed: boolean; reason: string; requiresFederatedHandshake: boolean } {
    
    const rule = DECISION_AUTHORITY_MATRIX.find(r => r.id === policyId);
    if (!rule) {
      return { allowed: true, reason: 'No registered policy matches decision parameters. Proceeding under default sovereign allowance.', requiresFederatedHandshake: false };
    }

    // Role-based matching
    const actorLower = actorRole.toLowerCase();
    const isPm = actorLower.includes('prime') || actorLower.includes('pm') || actorLower.includes('minister');
    
    // Emergency Overrides
    if (isEmergencyOverride && rule.emergencyOverrideAllowed) {
      return { 
        allowed: true, 
        reason: `[EMERGENCY OVERRIDE GRANTED] Authority code matched. Active user bypassed standard signoffs under law rule.`, 
        requiresFederatedHandshake: false 
      };
    }

    // Evaluate rules by designation type
    switch (rule.type) {
      case 'FEDERAL_ONLY':
        if (activeContext !== 'FEDERAL_IRAQ') {
          return { allowed: false, reason: 'This directive can only be enacted within the Federal Iraq Administrative Context.', requiresFederatedHandshake: false };
        }
        if (!isPm && !actorLower.includes('federal')) {
          return { allowed: false, reason: 'Requires high-level Federal Ministry executive credentials for action approval.', requiresFederatedHandshake: false };
        }
        return { allowed: true, reason: 'Approved under exclusive Federal Republic sovereign jurisdiction.', requiresFederatedHandshake: false };

      case 'KRG_ONLY':
        if (activeContext !== 'KURDISTAN_REGION') {
          return { allowed: false, reason: 'This directive is strictly reserved for the Kurdistan Regional Government context.', requiresFederatedHandshake: false };
        }
        if (!isPm && !actorLower.includes('krg')) {
          return { allowed: false, reason: 'Requires authorized regional cabinet portfolio clearance.', requiresFederatedHandshake: false };
        }
        return { allowed: true, reason: 'Approved under regional autonomous governance authorization.', requiresFederatedHandshake: false };

      case 'JOINT':
        if (activeContext !== 'JOINT_OPERATIONS') {
          return { allowed: false, reason: 'Requires switching to Joint Operations coordination workspace.', requiresFederatedHandshake: true };
        }
        // Joint operations usually require high coordinate roles
        const isCoordinator = actorLower.includes('coordinator') || actorLower.includes('director') || actorLower.includes('arbitrator') || isPm;
        if (!isCoordinator) {
          return { allowed: false, reason: 'Requires Bilateral Coordination Representative or Prime Ministerial sign-off.', requiresFederatedHandshake: true };
        }
        return { 
          allowed: true, 
          reason: 'Bilateral coordination match succeeded. Action triggers cross-jurisdiction federation handshake.', 
          requiresFederatedHandshake: true 
        };

      case 'DELEGATED':
        // Delegated tasks can be processed by qualified officers from both components
        return { allowed: true, reason: 'Action authorized under general multigovernmental mutual delegation guides.', requiresFederatedHandshake: false };

      case 'EMERGENCY':
        // Emergency rules usually require immediate top oversight
        if (!isPm && !actorLower.includes('coordinator')) {
          return { allowed: false, reason: 'Crisis lockouts require Executive command or Joint Coordination desk verification.', requiresFederatedHandshake: false };
        }
        return { allowed: true, reason: 'Emergency rule matched. Actions synchronized on secondary event lines immediately.', requiresFederatedHandshake: true };

      default:
        return { allowed: false, reason: 'Unknown policy directive classification.', requiresFederatedHandshake: false };
    }
  }
}
export { DECISION_AUTHORITY_MATRIX as DecisionAuthorityMatrix };
