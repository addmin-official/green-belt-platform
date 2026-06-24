import { ApiContract, ApiContractStatus, JurisdictionScope } from './ApiContractTypes';

export interface ContractValidationResult {
  status: ApiContractStatus;
  errors: string[];
  schemaComplete: boolean;
  securityVerified: boolean;
  jointCompliant: boolean;
}

export class ApiContractValidationEngine {
  private static FORBIDDEN_JOINT_PAYLOADS = [
    'raw_revenue',
    'raw_customs',
    'raw_customs_records',
    'raw_identity',
    'raw_identity_records',
    'raw_workforce',
    'raw_workforce_records',
    'raw_intelligence',
    'raw_intelligence_records',
    'raw_security',
    'raw_security_records',
    'raw_biometric_data',
    'raw_personal_data'
  ];

  public static validate(contract: ApiContract, jurisdiction: JurisdictionScope): ContractValidationResult {
    const errors: string[] = [];
    let schemaComplete = true;
    let securityVerified = true;
    let jointCompliant = true;

    // 1. Check base endpoint placeholders
    if (!contract.baseEndpointPlaceholder || contract.baseEndpointPlaceholder.trim() === '') {
      errors.push(`Domain ${contract.domain}: baseEndpointPlaceholder is missing.`);
      schemaComplete = false;
    } else if (!contract.baseEndpointPlaceholder.startsWith('https://')) {
      errors.push(`Domain ${contract.domain}: baseEndpointPlaceholder must be a secure secure (HTTPS) URL.`);
      schemaComplete = false;
    }

    // 2. Validate jurisdiction mapping
    const isAllowed = contract.allowedJurisdictions.includes(jurisdiction);
    if (!isAllowed) {
      errors.push(`Domain ${contract.domain} is not authorized for jurisdiction ${jurisdiction}.`);
      return {
        status: 'JURISDICTION_VIOLATION',
        errors,
        schemaComplete: false,
        securityVerified: false,
        jointCompliant: false
      };
    }

    // 3. Health & Readiness checks
    const hasHealthRoute = contract.routes.some(r => r.path === contract.healthCheckRoute);
    const hasReadinessRoute = contract.routes.some(r => r.path === contract.readinessRoute);

    if (!hasHealthRoute) {
      errors.push(`Domain ${contract.domain}: health check route '${contract.healthCheckRoute}' is not defined in route list.`);
      schemaComplete = false;
    }
    if (!hasReadinessRoute) {
      errors.push(`Domain ${contract.domain}: readiness route '${contract.readinessRoute}' is not defined in route list.`);
      schemaComplete = false;
    }

    // Standard baseline routes check
    const standardRoutes = ['/metadata', '/audit-events', '/sync-status'];
    for (const routePath of standardRoutes) {
      const exists = contract.routes.some(r => r.path === routePath);
      if (!exists) {
        errors.push(`Domain ${contract.domain}: standard route '${routePath}' is missing.`);
        schemaComplete = false;
      }
    }

    // 4. Secure Auth & Audit checks
    if (!contract.authRequirement || !contract.authRequirement.type) {
      errors.push(`Domain ${contract.domain}: authentication requirement is missing.`);
      securityVerified = false;
    }
    if (!contract.auditRequired) {
      errors.push(`Domain ${contract.domain}: centralized audit logging requirement is disabled (auditRequired: false).`);
      securityVerified = false;
    }

    // 5. Sovereignty: Joint raw-data exposure check
    if (jurisdiction === 'JOINT_OPERATIONS') {
      if (!contract.metadataOnlyRuleIfJoint) {
        errors.push(`Domain ${contract.domain}: Joint contracts MUST enable metadata-only enforcement (metadataOnlyRuleIfJoint: true).`);
        jointCompliant = false;
      }

      // Check allowed payloads for any forbidden raw types
      const rawPayloadViolations = contract.allowedPayloadTypes.filter(p =>
        this.FORBIDDEN_JOINT_PAYLOADS.some(forbidden => p.toLowerCase().includes(forbidden))
      );

      if (rawPayloadViolations.length > 0) {
        errors.push(`Domain ${contract.domain} violates joint sovereign isolation: exposes raw types: ${rawPayloadViolations.join(', ')}`);
        jointCompliant = false;
      }

      // Ensure forbidden arrays explicitly mention critical fields
      const missingProtections = this.FORBIDDEN_JOINT_PAYLOADS.filter(f =>
        !contract.forbiddenPayloadTypes.some(p => p.toLowerCase().includes(f))
      );
      if (missingProtections.length > 5) {
        errors.push(`Domain ${contract.domain}: Missing explicit payload protections. Forbid list is incomplete.`);
        jointCompliant = false;
      }
    } else {
      // Federal can't have KRG and KRG can't have Federal
      if (jurisdiction === 'FEDERAL_IRAQ' && contract.allowedPayloadTypes.some(p => p.toLowerCase().includes('krg'))) {
        errors.push(`Domain ${contract.domain}: Federal contract contains KRG context namespaces.`);
        return {
          status: 'JURISDICTION_VIOLATION',
          errors,
          schemaComplete,
          securityVerified,
          jointCompliant
        };
      }
      if (jurisdiction === 'KURDISTAN_REGION' && contract.allowedPayloadTypes.some(p => p.toLowerCase().includes('federal'))) {
        errors.push(`Domain ${contract.domain}: KRG contract contains Federal context namespaces.`);
        return {
          status: 'JURISDICTION_VIOLATION',
          errors,
          schemaComplete,
          securityVerified,
          jointCompliant
        };
      }
    }

    // Determine final statuses
    let status: ApiContractStatus = 'READY';

    if (!jointCompliant) {
      status = 'JURISDICTION_VIOLATION';
    } else if (!securityVerified) {
      status = 'SECURITY_REQUIREMENT_MISSING';
    } else if (!schemaComplete) {
      status = 'SCHEMA_INCOMPLETE';
    }

    return {
      status,
      errors,
      schemaComplete,
      securityVerified,
      jointCompliant
    };
  }
}
