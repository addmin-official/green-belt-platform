/**
 * Release and Deployment Configuration
 * Governs active environments, deployment targets, and feature switches.
 * Highly restricted options with default safe fallbacks.
 */

export const ReleaseConfig = {
  releaseChannel: ((import.meta as any).env?.VITE_RELEASE_CHANNEL || 'STAGING') as 'STAGING' | 'PRODUCTION' | 'DEVELOPMENT',
  buildTarget: ((import.meta as any).env?.VITE_BUILD_TARGET || 'PRODUCTION') as 'PRODUCTION' | 'PILOT',
  operationalMode: (import.meta as any).env?.VITE_OPERATIONAL_MODE === 'true',
  providerMode: ((import.meta as any).env?.VITE_PROVIDER_MODE || 'DEMO') as 'DEMO' | 'OPERATIONAL',
  demoModeEnabled: (import.meta as any).env?.VITE_ENABLE_DEMO_MODE !== 'false',
  trainingModeEnabled: (import.meta as any).env?.VITE_ENABLE_TRAINING_MODE === 'true',
  qaPanelEnabled: (import.meta as any).env?.VITE_ENABLE_QA_PANEL !== 'false',
  providerStatusPanelEnabled: (import.meta as any).env?.VITE_ENABLE_PROVIDER_STATUS_PANEL !== 'false'
};
