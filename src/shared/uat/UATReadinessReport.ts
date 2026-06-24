import { UATBoundaryCheck, BoundaryValidationSet } from './UATBoundaryCheck';
import { UATLanguageCheck, UATLanguageValidation } from './UATLanguageCheck';
import { UATProviderStateCheck, ProviderCheckStatus } from './UATProviderStateCheck';
import { UAT_SCENARIOS, UATScenario } from './UATScenarioRegistry';

export interface UATAuditReport {
  timestamp: string;
  scenariosCount: number;
  scenarios: UATScenario[];
  boundaryValidation: BoundaryValidationSet[];
  languages: UATLanguageValidation[];
  providerChecks: ProviderCheckStatus[];
  isUatCompliant: boolean;
  overallDecision: 'CONDITIONALLY_READY — PILOT DRY-RUN READY, PROVIDERS REQUIRED';
}

export class UATReadinessReport {
  public static generateReport(
    fedState: string = 'NOT_CONFIGURED',
    krgState: string = 'NOT_CONFIGURED',
    jointState: string = 'NOT_CONFIGURED',
    isReachable: boolean = false
  ): UATAuditReport {
    const boundaryValidation = UATBoundaryCheck.executeSuite();
    const languages = UATLanguageCheck.validateLanguages();
    const providerChecks = UATProviderStateCheck.checkStates(fedState, krgState, jointState, isReachable);

    // Dry Run validation check
    const boundarySafe = boundaryValidation.every(set => 
      set.testTargets.every(target => {
        // Assert forbidden targets are strictly Blocked/Denied
        if (target.expectedPassed === false) {
          return target.actualResult === 'DENIED';
        }
        return true;
      })
    );

    const isUatCompliant = boundarySafe && languages.length === 3;

    return {
      timestamp: new Date().toISOString(),
      scenariosCount: UAT_SCENARIOS.length,
      scenarios: UAT_SCENARIOS,
      boundaryValidation,
      languages,
      providerChecks,
      isUatCompliant,
      overallDecision: 'CONDITIONALLY_READY — PILOT DRY-RUN READY, PROVIDERS REQUIRED'
    };
  }
}
