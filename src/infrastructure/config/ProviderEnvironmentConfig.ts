export const ProviderEnvironmentConfig = {
  FEDERAL_API_BASE_URL: (import.meta as any).env?.VITE_FEDERAL_API_BASE_URL || '',
  KRG_API_BASE_URL: (import.meta as any).env?.VITE_KRG_API_BASE_URL || '',
  JOINT_API_BASE_URL: (import.meta as any).env?.VITE_JOINT_API_BASE_URL || '',
  PROVIDER_MODE: (import.meta as any).env?.VITE_PROVIDER_MODE || '',
  OPERATIONAL_MODE: (import.meta as any).env?.VITE_OPERATIONAL_MODE || '',
  ENABLE_DEMO_MODE: (import.meta as any).env?.VITE_ENABLE_DEMO_MODE || '',
  ENABLE_TRAINING_MODE: (import.meta as any).env?.VITE_ENABLE_TRAINING_MODE || '',
};
