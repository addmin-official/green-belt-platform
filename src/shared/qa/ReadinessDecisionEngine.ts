import { ReadinessStatus, ProductionGateResult } from './QAStatusTypes';
import { DemoModeController } from '../demo/DemoModeController';
import { ProviderReadinessReport } from '../../infrastructure/providers/ProviderReadinessReport';
import { ProviderConfigurationValidator } from '../../infrastructure/providers/ProviderConfigurationValidator';
import { ApiContractRegistry } from '../../infrastructure/api-contracts/ApiContractRegistry';
import { ApiContractValidationEngine } from '../../infrastructure/api-contracts/ApiContractValidationEngine';
import { JurisdictionScope } from '../../infrastructure/api-contracts/ApiContractTypes';

export class ReadinessDecisionEngine {
  /**
   * Decides on the readiness status of the application based on structural QA checks, API contracts, and actual provider states.
   */
  public static calculateReadiness(gateResult: ProductionGateResult): ReadinessStatus {
    // 1. If any critical QA check fails (status is 'FAIL').
    const checks = [
      gateResult.mockDependencyCheck,
      gateResult.sovereignBoundaryCheck,
      gateResult.localizationCoverageCheck,
      gateResult.rtlTypographyCheck,
      gateResult.hardcodedSuccessCheck,
      gateResult.demoIsolationCheck,
      gateResult.buildCheck,
    ];

    if (checks.some(c => c.status === 'FAIL')) {
      return 'BLOCKED';
    }

    // 2. Read provider configurations & run API contract validation
    const providersList = ProviderReadinessReport.getRegisteredProviders();
    const configStates = providersList.map(p => ProviderConfigurationValidator.validateProvider(p));

    let hasMissingContract = false;
    let hasContractViolation = false;
    let allContractsPass = true;

    const mapJurisdictionScope = (jur: 'FEDERAL' | 'KRG' | 'JOINT'): JurisdictionScope => {
      if (jur === 'FEDERAL') return 'FEDERAL_IRAQ';
      if (jur === 'KRG') return 'KURDISTAN_REGION';
      return 'JOINT_OPERATIONS';
    };

    for (const prov of providersList) {
      const scope = mapJurisdictionScope(prov.jurisdiction);
      const contract = ApiContractRegistry.getContractByDomainAndJurisdiction(prov.domain as any, scope);

      if (!contract) {
        hasMissingContract = true;
        allContractsPass = false;
      } else {
        const validation = ApiContractValidationEngine.validate(contract, scope);
        if (validation.status === 'JURISDICTION_VIOLATION') {
          hasContractViolation = true;
          allContractsPass = false;
        } else if (validation.status !== 'READY') {
          allContractsPass = false;
        }
      }
    }

    // Rule: If API contracts violate jurisdiction rules:
    // BLOCKED
    if (hasContractViolation) {
      return 'BLOCKED';
    }

    // Rule: If API contracts are missing:
    // CONDITIONALLY_READY
    if (hasMissingContract) {
      return 'CONDITIONALLY_READY';
    }

    // Check if any registered providers are completely unconfigured/using default placeholders:
    const hasUnconfigured = configStates.some(s => s === 'NOT_CONFIGURED');
    
    // Check if any registered providers suffer jurisdiction base mismatches:
    const hasJurisdictionViolation = configStates.some(
      s => s === 'JURISDICTION_VIOLATION' || s === 'SECURITY_BLOCKED' || s === 'MISCONFIGURED'
    );

    // 3. Read active demo module states from controller (for simulated health checks / toggles)
    const demoProviders = ['checkpoint', 'operational', 'audit', 'ledger', 'workflow'];
    const demoStates = demoProviders.map(p => DemoModeController.getProviderState(p));
    
    const hasFailedDemoHealth = demoStates.some(
      s => s === 'unavailable' || s === 'error' || s === 'UNAVAILABLE'
    );

    // Rule: If providers are configured but health checks fail or have violations:
    // BLOCKED
    if (hasJurisdictionViolation || hasFailedDemoHealth) {
      return 'BLOCKED';
    }

    // Phase 5.9 Decision Matrix
    const latestReachable = (ProviderReadinessReport as any).latestBackendReachable;
    const fedState = (ProviderReadinessReport as any).latestFederalBackendState || 'NOT_CONFIGURED';
    const krgState = (ProviderReadinessReport as any).latestKrgBackendState || 'NOT_CONFIGURED';
    const jointState = (ProviderReadinessReport as any).latestJointBackendState || 'NOT_CONFIGURED';

    if (!latestReachable) {
      return 'CONDITIONALLY_READY — BACKEND UNAVAILABLE';
    }

    const providersNotConfigured = fedState === 'NOT_CONFIGURED' || krgState === 'NOT_CONFIGURED' || jointState === 'NOT_CONFIGURED';
    if (providersNotConfigured) {
      return 'CONDITIONALLY_READY — TRAINING PACKAGE FULLY VERIFIED, PROVIDERS REQUIRED';
    }

    if (fedState === 'READY' && krgState === 'READY' && jointState === 'READY') {
      return 'PILOT_READY';
    }

    return 'CONDITIONALLY_READY — TRAINING PACKAGE FULLY VERIFIED, PROVIDERS REQUIRED';
  }
}

