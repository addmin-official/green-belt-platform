import { UAT_ROLES, UATRoleProfile } from './UATRoleRegistry';
import { UATFlowValidator } from './UATFlowValidator';

export interface BoundaryValidationSet {
  roleId: string;
  roleName: string;
  testTargets: {
    zone: string;
    expectedPassed: boolean;
    actualResult: 'ALLOWED' | 'DENIED' | 'ERROR';
    rawReport: string;
  }[];
}

export class UATBoundaryCheck {
  public static executeSuite(): BoundaryValidationSet[] {
    const results: BoundaryValidationSet[] = [];

    for (const role of UAT_ROLES) {
      const testSet: BoundaryValidationSet = {
        roleId: role.id,
        roleName: role.name,
        testTargets: []
      };

      // Test federal target
      const fedResult = UATFlowValidator.validateAccess(role, 'Federal Private Raw Revenue');
      testSet.testTargets.push({
        zone: 'Federal Private Raw Revenue',
        expectedPassed: role.jurisdiction === 'FEDERAL_IRAQ' || role.jurisdiction === 'ALL_SYSTEM' ? true : false,
        actualResult: fedResult.passed ? 'ALLOWED' : 'DENIED',
        rawReport: fedResult.message
      });

      // Test KRG target
      const krgResult = UATFlowValidator.validateAccess(role, 'KRG Private Raw Revenue');
      testSet.testTargets.push({
        zone: 'KRG Private Raw Revenue',
        expectedPassed: role.jurisdiction === 'KRG' ? true : false,
        actualResult: krgResult.passed ? 'ALLOWED' : 'DENIED',
        rawReport: krgResult.message
      });

      // Test Joint metadata target
      const jointMetaResult = UATFlowValidator.validateAccess(role, 'Joint Metadata aggregates');
      testSet.testTargets.push({
        zone: 'Joint Metadata aggregates',
        expectedPassed: true, // Everyone is allowed to view sanitized shared aggregates
        actualResult: jointMetaResult.passed ? 'ALLOWED' : 'DENIED',
        rawReport: jointMetaResult.message
      });

      // Test Joint raw target (No role except potentially pure (but blocked) Admin should try, check that joint role is denied)
      const jointRawResult = UATFlowValidator.validateAccess(role, 'Joint raw revenue records');
      testSet.testTargets.push({
        zone: 'Joint raw revenue records',
        expectedPassed: false, // Absolutely blocked for all
        actualResult: jointRawResult.passed ? 'ALLOWED' : 'DENIED',
        rawReport: jointRawResult.message
      });

      results.push(testSet);
    }

    return results;
  }
}
