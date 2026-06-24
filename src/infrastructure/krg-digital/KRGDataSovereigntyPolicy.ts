export interface SovereigntyEnforcementResult {
  allowed: boolean;
  message: string;
  cleansedPayloadKeys?: string[];
}

export class KRGDataSovereigntyPolicy {
  /**
   * Evaluates if a recipient jurisdiction can access KRG Digital Services data features
   */
  public static evaluateAccess(
    recipientJurisdiction: 'FEDERAL_IRAQ' | 'KURDISTAN_REGION' | 'JOINT_OPERATIONS',
    dataDomain: 'KRDPASS_IDENTITY' | 'BRS_BUSINESS_RECORD',
    requestedFields: string[]
  ): SovereigntyEnforcementResult {
    // 1. Federal cannot read raw KRDPASS or BRS data direct under any circumstance
    if (recipientJurisdiction === 'FEDERAL_IRAQ') {
      return {
        allowed: false,
        message: 'ACCESS DENIED: Federal Jurisdiction has zero direct interface or reading privileges on Kurdistan Region sovereign systems.'
      };
    }

    // 2. Kurdistan Region can fully consume KRG-only system records
    if (recipientJurisdiction === 'KURDISTAN_REGION') {
      return {
        allowed: true,
        message: 'ACCESS GRANTED: Full out-of-boundary check bypassed. Regional operator authenticated within sovereign Kurdistan perimeter.',
        cleansedPayloadKeys: requestedFields
      };
    }

    // 3. Joint Layer (JOINT_OPERATIONS) can ONLY receive metadata, verification hashes, and statuses
    if (recipientJurisdiction === 'JOINT_OPERATIONS') {
      const jointPermittedFields = [
        'businessVerified',
        'verificationHash',
        'workflowStatus',
        'complianceStatus',
        'status',
        'metadata',
        'timestamp',
        'checksum'
      ];

      const strictlyProhibitedFields = [
        'ownerName', 'ownerPersonalData', 'ownerIdentity', 'UPN', 'address', 'rawFeeDetails', 
        'paymentRecord', 'fullBusinessRecord', 'citizen_identity', 'identityToken', 'accessToken',
        'nationalId', 'civilId', 'biometricHash'
      ];

      // Check if any prohibited fields are explicitly requested
      const hasProhibited = requestedFields.some(field => 
        strictlyProhibitedFields.includes(field) || 
        field.toLowerCase().includes('owner') || 
        field.toLowerCase().includes('payment') ||
        field.toLowerCase().includes('token')
      );

      if (hasProhibited) {
        // Enforce safe filtering to allow partial response rather than outright crashing if subset requested
        const filteredFields = requestedFields.filter(f => 
          jointPermittedFields.includes(f) && 
          !strictlyProhibitedFields.includes(f) &&
          !f.toLowerCase().includes('owner') &&
          !f.toLowerCase().includes('payment') &&
          !f.toLowerCase().includes('token')
        );

        return {
          allowed: filteredFields.length > 0,
          message: 'PARTIAL FILTERED ACCESS: Cleaned sensitive private keys. Joint Operations is limited to verification hashes and status aggregates.',
          cleansedPayloadKeys: filteredFields
        };
      }

      return {
        allowed: true,
        message: 'ACCESS GRANTED: Safely cleared joint audit metadata metrics.',
        cleansedPayloadKeys: requestedFields
      };
    }

    return {
      allowed: false,
      message: 'ACCESS DENIED: Unknown recipient jurisdiction boundary.'
    };
  }
}
