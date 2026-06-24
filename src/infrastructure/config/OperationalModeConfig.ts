import { ProviderEnvironmentConfig } from './ProviderEnvironmentConfig';

export const OperationalModeConfig = {
  isOperationalMode: ProviderEnvironmentConfig.OPERATIONAL_MODE === 'true',
  providerMode: ProviderEnvironmentConfig.PROVIDER_MODE,
  enableDemoMode: ProviderEnvironmentConfig.ENABLE_DEMO_MODE === 'true',
  enableTrainingMode: ProviderEnvironmentConfig.ENABLE_TRAINING_MODE === 'true',
};
