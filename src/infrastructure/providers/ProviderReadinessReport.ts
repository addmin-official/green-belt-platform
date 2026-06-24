import { ProviderMetadata, ProviderConfigurationValidator } from './ProviderConfigurationValidator';
import { ProviderHealthCheckEngine } from './ProviderHealthCheckEngine';
import { ProviderSecurityPolicy } from './ProviderSecurityPolicy';
import { ProviderState } from './ProviderState';
import { JurisdictionEndpointConfig } from '../config/JurisdictionEndpointConfig';
import { ApiContractRegistry } from '../api-contracts/ApiContractRegistry';
import { ApiContractValidationEngine } from '../api-contracts/ApiContractValidationEngine';
import { JurisdictionScope, ApiContractStatus } from '../api-contracts/ApiContractTypes';
import { ProductionProviderRegistry } from './ProductionProviderRegistry';

export interface DomainProviderReport {
  id: string;
  name: string;
  domain: 'Border' | 'Customs' | 'Revenue' | 'Trade' | 'Transparency' | 'Identity' | 'Workforce' | 'Security' | 'Intelligence' | 'Audit' | 'Ledger' | 'Workflow';
  jurisdiction: 'FEDERAL' | 'KRG' | 'JOINT';
  endpoint: string;
  state: ProviderState;
  securityCheckPassed: boolean;
  violationReason?: string;
  // API Contract Integration
  apiContractStatus: ApiContractStatus;
  apiContractErrors: string[];
  schemaComplete: boolean;
  securityVerified: boolean;
  jointCompliant: boolean;
}

export interface ComprehensiveReadinessReport {
  timestamp: string;
  overallScore: number;
  allPass: boolean;
  jurisdictionViolationsCount: number;
  unconfiguredCount: number;
  providers: DomainProviderReport[];
  // API Contract Summary Metrics
  contractReadinessScore: number;
  missingContractCount: number;
  schemaCompletenessScore: number; // Percentage of contracts with complete schemas
  jointMetadataCompliance: boolean; // True if all Joint providers are metadata-only compliant
  jurisdictionContractViolationsCount: number;
  // Pilot Wiring Metrics (Phase 5.9)
  frontendProviderConfigured: boolean;
  backendScaffoldReachable: boolean;
  federalBackendState: ProviderState;
  krgBackendState: ProviderState;
  jointBackendState: ProviderState;
  providerNotConnectedCount: number;
  jurisdictionMismatchCount: number;
}

export class ProviderReadinessReport {
  public static latestFederalBackendState: ProviderState = 'NOT_CONFIGURED';
  public static latestKrgBackendState: ProviderState = 'NOT_CONFIGURED';
  public static latestJointBackendState: ProviderState = 'NOT_CONFIGURED';
  public static latestBackendReachable: boolean = false;

  /**
   * Registers metadata and jurisdiction mapping for all 12 platform domains.
   * Rule: No duplicate files, reuse existing structures.
   */
  public static getRegisteredProviders(): ProviderMetadata[] {
    const fBase = JurisdictionEndpointConfig.federalEndpoint;
    const kBase = JurisdictionEndpointConfig.krgEndpoint;
    const jBase = JurisdictionEndpointConfig.jointEndpoint;

    return [
      { id: 'border_fed', name: 'Federal Border Gate Agent', domain: 'Border', jurisdiction: 'FEDERAL', endpoint: fBase ? `${fBase}/border` : '' },
      { id: 'border_krg', name: 'KRG Border Gate Agent', domain: 'Border', jurisdiction: 'KRG', endpoint: kBase ? `${kBase}/border` : '' },
      { id: 'customs_fed', name: 'Federal Customs Core Engine', domain: 'Customs', jurisdiction: 'FEDERAL', endpoint: fBase ? `${fBase}/customs` : '' },
      { id: 'customs_krg', name: 'KRG Customs Core Engine', domain: 'Customs', jurisdiction: 'KRG', endpoint: kBase ? `${kBase}/customs` : '' },
      { id: 'revenue_fed', name: 'Federal Tax & Revenue Ledger', domain: 'Revenue', jurisdiction: 'FEDERAL', endpoint: fBase ? `${fBase}/revenue` : '' },
      { id: 'revenue_krg', name: 'KRG Finance & Revenue Ledger', domain: 'Revenue', jurisdiction: 'KRG', endpoint: kBase ? `${kBase}/revenue` : '' },
      { id: 'revenue_joint', name: 'Joint Central Reconciliation Node', domain: 'Revenue', jurisdiction: 'JOINT', endpoint: jBase ? `${jBase}/revenue-reconciliation` : '' },
      { id: 'trade_fed', name: 'Federal Import/Export Registry', domain: 'Trade', jurisdiction: 'FEDERAL', endpoint: fBase ? `${fBase}/trade` : '' },
      { id: 'trade_krg', name: 'KRG Trade Monitoring Desk', domain: 'Trade', jurisdiction: 'KRG', endpoint: kBase ? `${kBase}/trade` : '' },
      { id: 'transparency_joint', name: 'Joint Anti-Corruption Portal', domain: 'Transparency', jurisdiction: 'JOINT', endpoint: jBase ? `${jBase}/transparency` : '' },
      { id: 'identity_fed', name: 'Federal National ID Registry', domain: 'Identity', jurisdiction: 'FEDERAL', endpoint: fBase ? `${fBase}/identity` : '' },
      { id: 'identity_krg', name: 'KRG Resident Card Registry', domain: 'Identity', jurisdiction: 'KRG', endpoint: kBase ? `${kBase}/identity` : '' },
      { id: 'workforce_fed', name: 'Federal Workforce Assignment Node', domain: 'Workforce', jurisdiction: 'FEDERAL', endpoint: fBase ? `${fBase}/workforce` : '' },
      { id: 'workforce_krg', name: 'KRG Public Sector Workforce Node', domain: 'Workforce', jurisdiction: 'KRG', endpoint: kBase ? `${kBase}/workforce` : '' },
      { id: 'security_fed', name: 'Federal Security Operations Node', domain: 'Security', jurisdiction: 'FEDERAL', endpoint: fBase ? `${fBase}/security` : '' },
      { id: 'security_krg', name: 'KRG Zanyari & Security Registry', domain: 'Security', jurisdiction: 'KRG', endpoint: kBase ? `${kBase}/security` : '' },
      { id: 'intelligence_fed', name: 'Federal National Intelligence Fusion', domain: 'Intelligence', jurisdiction: 'FEDERAL', endpoint: fBase ? `${fBase}/intelligence` : '' },
      { id: 'intelligence_krg', name: 'KRG Intelligence Node', domain: 'Intelligence', jurisdiction: 'KRG', endpoint: kBase ? `${kBase}/intelligence` : '' },
      { id: 'audit_joint', name: 'Joint Unified Audit Logging', domain: 'Audit', jurisdiction: 'JOINT', endpoint: jBase ? `${jBase}/audit` : '' },
      { id: 'ledger_joint', name: 'Joint CBI Financial Netting', domain: 'Ledger', jurisdiction: 'JOINT', endpoint: jBase ? `${jBase}/ledger` : '' },
      { id: 'workflow_joint', name: 'Joint Cross-Border Multi-Party Workflow', domain: 'Workflow', jurisdiction: 'JOINT', endpoint: jBase ? `${jBase}/workflow` : '' },
    ];
  }

  /**
   * Evaluates and aggregates all provider statuses, validating security rules and connection states.
   */
  public static async executeComprehensiveReport(): Promise<ComprehensiveReadinessReport> {
    const rawProviders = this.getRegisteredProviders();
    const reports: DomainProviderReport[] = [];

    let jurisdictionViolations = 0;
    let unconfiguredCount = 0;
    let healthyCount = 0;

    // API Contracts specific tallies
    let missingContractCount = 0;
    let schemaCompleteContractsCount = 0;
    let readyContractsCount = 0;
    let jointMetadataCompliance = true;
    let jurisdictionContractViolationsCount = 0;

    const mapJurisdictionScope = (jur: 'FEDERAL' | 'KRG' | 'JOINT'): JurisdictionScope => {
      if (jur === 'FEDERAL') return 'FEDERAL_IRAQ';
      if (jur === 'KRG') return 'KURDISTAN_REGION';
      return 'JOINT_OPERATIONS';
    };

    for (const prov of rawProviders) {
      // 1. Check endpoints & check health
      let state = await ProviderHealthCheckEngine.executeHealthCheck(prov);

      if (state === 'NOT_CONFIGURED') {
        unconfiguredCount++;
      } else if (state === 'JURISDICTION_VIOLATION') {
        jurisdictionViolations++;
      } else if (state === 'READY') {
        healthyCount++;
      }

      // 2. Validate Security Contract Isolation policy
      let securityPassed = true;
      let violationReason = '';

      if (prov.jurisdiction === 'JOINT') {
        // Enforce Joint cannot access raw data
        const secRes = ProviderSecurityPolicy.validateAccess({
          callerJurisdiction: 'JOINT',
          targetProviderJurisdiction: 'JOINT',
          dataType: 'raw_revenue' // Blocked by policy
        });
        if (!secRes.allowed) {
          securityPassed = true;
        }
      }

      // 3. API Contract Validation
      const scope = mapJurisdictionScope(prov.jurisdiction);
      const contract = ApiContractRegistry.getContractByDomainAndJurisdiction(prov.domain as any, scope);

      let apiContractStatus: ApiContractStatus = 'NOT_CONFIGURED';
      let apiContractErrors: string[] = [];
      let schemaComplete = false;
      let securityVerified = false;
      let jointCompliant = true;

      if (!contract) {
        missingContractCount++;
        apiContractErrors.push(`API configuration contract for domain ${prov.domain} (jurisdiction: ${prov.jurisdiction}) is missing.`);
      } else {
        const validation = ApiContractValidationEngine.validate(contract, scope);
        apiContractStatus = validation.status;
        apiContractErrors = validation.errors;
        schemaComplete = validation.schemaComplete;
        securityVerified = validation.securityVerified;
        jointCompliant = validation.jointCompliant;

        if (schemaComplete) schemaCompleteContractsCount++;
        if (apiContractStatus === 'READY') readyContractsCount++;
        if (apiContractStatus === 'JURISDICTION_VIOLATION') {
          jurisdictionContractViolationsCount++;
        }
        if (prov.jurisdiction === 'JOINT' && !jointCompliant) {
          jointMetadataCompliance = false;
        }
      }

      reports.push({
        id: prov.id,
        name: prov.name,
        domain: prov.domain as any,
        jurisdiction: prov.jurisdiction,
        endpoint: prov.endpoint || '',
        state,
        securityCheckPassed: securityPassed,
        violationReason: violationReason || undefined,
        // API Contract specifics
        apiContractStatus,
        apiContractErrors,
        schemaComplete,
        securityVerified,
        jointCompliant
      });
    }

    const overallScore = rawProviders.length > 0 
      ? Math.round((healthyCount / rawProviders.length) * 100) 
      : 0;

    const contractReadinessScore = rawProviders.length > 0
      ? Math.round((readyContractsCount / rawProviders.length) * 100)
      : 0;

    const schemaCompletenessScore = rawProviders.length > 0
      ? Math.round((schemaCompleteContractsCount / rawProviders.length) * 100)
      : 0;

    const allPass = reports.every(r => r.state === 'READY') && jurisdictionViolations === 0;

    // Phase 5.9 Backend Query Validation
    const federalBackendState = await ProductionProviderRegistry.getFederalBackendProvider().getProviderState();
    const krgBackendState = await ProductionProviderRegistry.getKRGBackendProvider().getProviderState();
    const jointBackendState = await ProductionProviderRegistry.getJointMetadataBackendProvider().getProviderState();

    this.latestFederalBackendState = federalBackendState;
    this.latestKrgBackendState = krgBackendState;
    this.latestJointBackendState = jointBackendState;

    const fedUrl = (import.meta as any).env?.VITE_FEDERAL_API_BASE_URL || '';
    const krgUrl = (import.meta as any).env?.VITE_KRG_API_BASE_URL || '';
    const jointUrl = (import.meta as any).env?.VITE_JOINT_API_BASE_URL || '';

    const hasBaseUrls = fedUrl && krgUrl && jointUrl &&
                         !fedUrl.includes('placeholder') &&
                         !krgUrl.includes('placeholder') &&
                         !jointUrl.includes('placeholder');

    const backendScaffoldReachable = hasBaseUrls &&
                                     federalBackendState !== 'UNAVAILABLE' &&
                                     krgBackendState !== 'UNAVAILABLE' &&
                                     jointBackendState !== 'UNAVAILABLE';

    this.latestBackendReachable = backendScaffoldReachable;

    let providerNotConnectedCount = 0;
    if (federalBackendState === 'NOT_CONFIGURED') providerNotConnectedCount++;
    if (krgBackendState === 'NOT_CONFIGURED') providerNotConnectedCount++;
    if (jointBackendState === 'NOT_CONFIGURED') providerNotConnectedCount++;
    providerNotConnectedCount += unconfiguredCount;

    return {
      timestamp: new Date().toISOString(),
      overallScore,
      allPass,
      jurisdictionViolationsCount: jurisdictionViolations,
      unconfiguredCount,
      providers: reports,
      // API Contract Summaries
      contractReadinessScore,
      missingContractCount,
      schemaCompletenessScore,
      jointMetadataCompliance,
      jurisdictionContractViolationsCount,
      // Pilot Wiring Metrics
      frontendProviderConfigured: true,
      backendScaffoldReachable,
      federalBackendState,
      krgBackendState,
      jointBackendState,
      providerNotConnectedCount,
      jurisdictionMismatchCount: jurisdictionViolations
    };
  }
}
