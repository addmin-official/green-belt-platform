import { JurisdictionEndpointConfig } from '../config/JurisdictionEndpointConfig';
import { ProviderState } from './ProviderState';

export interface ProviderMetadata {
  id: string;
  name: string;
  domain: string;
  jurisdiction: 'FEDERAL' | 'KRG' | 'JOINT';
  endpoint?: string;
}

export class ProviderConfigurationValidator {
  /**
   * Validates target provider config and endpoint jurisdiction rules.
   * If endpoint is missing, returns NOT_CONFIGURED.
   * If endpoint does not align with the provider jurisdiction, returns JURISDICTION_VIOLATION.
   * If endpoint format is invalid, returns MISCONFIGURED.
   */
  public static validateProvider(provider: ProviderMetadata): ProviderState {
    if (!provider.endpoint || provider.endpoint.trim() === '') {
      return 'NOT_CONFIGURED';
    }

    const { jurisdiction, endpoint } = provider;

    // Federal provider: may only use Federal endpoint
    if (jurisdiction === 'FEDERAL') {
      const fBase = JurisdictionEndpointConfig.federalEndpoint;
      if (!fBase || fBase.trim() === '') {
        return 'NOT_CONFIGURED';
      }
      if (!endpoint.startsWith(fBase)) {
        return 'JURISDICTION_VIOLATION';
      }
    }

    // KRG provider: may only use KRG endpoint
    if (jurisdiction === 'KRG') {
      const kBase = JurisdictionEndpointConfig.krgEndpoint;
      if (!kBase || kBase.trim() === '') {
        return 'NOT_CONFIGURED';
      }
      if (!endpoint.startsWith(kBase)) {
        return 'JURISDICTION_VIOLATION';
      }
    }

    // Joint provider: may only use metadata / reconciliation endpoint
    if (jurisdiction === 'JOINT') {
      const jBase = JurisdictionEndpointConfig.jointEndpoint;
      if (!jBase || jBase.trim() === '') {
        return 'NOT_CONFIGURED';
      }
      if (!endpoint.startsWith(jBase)) {
        return 'JURISDICTION_VIOLATION';
      }
    }

    // Basic URL structure sanity check
    if (!endpoint.startsWith('/') && !endpoint.startsWith('http://') && !endpoint.startsWith('https://')) {
      return 'MISCONFIGURED';
    }

    return 'READY';
  }
}
