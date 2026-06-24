import { ProviderEnvironmentConfig } from './ProviderEnvironmentConfig';

export interface EndpointConfig {
  federalEndpoint: string;
  krgEndpoint: string;
  jointEndpoint: string;
}

export const JurisdictionEndpointConfig: EndpointConfig = {
  federalEndpoint: ProviderEnvironmentConfig.FEDERAL_API_BASE_URL,
  krgEndpoint: ProviderEnvironmentConfig.KRG_API_BASE_URL,
  jointEndpoint: ProviderEnvironmentConfig.JOINT_API_BASE_URL,
};
