export interface BRSBusinessVerificationContract {
  providerName: 'KRG_BRS';
  servicePurpose: 'Kurdish Business Registry Service Verification';
  supportedQueries: {
    lookupByUen: {
      parameterName: 'uen';
      description: 'Unique Entity Number representing regional business incorporation';
    };
    statusVerification: {
      parameterName: 'status';
      description: 'Business activity status registration indicator';
    };
  };
  sovereigntyFilterRules: {
    allowedFieldsIfJoint: string[];
    strictlyProhibitedFieldsIfJoint: string[];
  };
  endpoints: {
    lookup: string;
    verify: string;
    readiness: string;
  };
}

export const BRS_VERIFICATION_CONTRACT: BRSBusinessVerificationContract = {
  providerName: 'KRG_BRS',
  servicePurpose: 'Kurdish Business Registry Service Verification',
  supportedQueries: {
    lookupByUen: {
      parameterName: 'uen',
      description: 'Unique Entity Number representing regional business incorporation'
    },
    statusVerification: {
      parameterName: 'status',
      description: 'Business activity status registration indicator'
    }
  },
  sovereigntyFilterRules: {
    allowedFieldsIfJoint: [
      'businessVerified',
      'verificationHash',
      'workflowStatus',
      'complianceStatus'
    ],
    strictlyProhibitedFieldsIfJoint: [
      'ownerName',
      'ownerPersonalData',
      'ownerIdentity',
      'UPN',
      'address',
      'rawFeeDetails',
      'paymentRecord',
      'fullBusinessRecord'
    ]
  },
  endpoints: {
    lookup: 'https://brs.krg.example/api/v1/business/lookup',
    verify: 'https://brs.krg.example/api/v1/business/verify',
    readiness: 'https://brs.krg.example/api/v1/business/readiness'
  }
};
