export const env = {
  PORT: process.env.PORT || '8787',
  FEDERAL_DB_URL: process.env.FEDERAL_DB_URL || '',
  KRG_DB_URL: process.env.KRG_DB_URL || '',
  JOINT_METADATA_DB_URL: process.env.JOINT_METADATA_DB_URL || '',
  PROVIDER_MODE: process.env.PROVIDER_MODE || 'not_configured',
  ENABLE_AUDIT_LOG: process.env.ENABLE_AUDIT_LOG !== 'false'
};
