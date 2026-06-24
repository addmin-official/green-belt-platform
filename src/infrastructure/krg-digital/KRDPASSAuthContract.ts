export interface KRDPASSAuthContract {
  providerName: 'KRDPASS';
  standard: 'OIDC / OAuth2 + PKCE';
  requiredConfigurationKeys: string[];
  endpoints: {
    authorization: string;
    token: string;
    jwks: string;
    userInfo: string;
  };
  policyEnforcements: {
    requirePkce: boolean;
    requireHttps: boolean;
    blockRawTokenTransmissionToJointAuditors: boolean;
    strictKrgOnlySovereigntyForCitizenIdentity: boolean;
  };
}

export const KRDPASS_AUTH_CONTRACT: KRDPASSAuthContract = {
  providerName: 'KRDPASS',
  standard: 'OIDC / OAuth2 + PKCE',
  requiredConfigurationKeys: [
    'KRG_KRDPASS_CLIENT_ID',
    'KRG_KRDPASS_CLIENT_SECRET',
    'KRG_KRDPASS_DISCOVERY_URL'
  ],
  endpoints: {
    authorization: 'https://auth.krg.example/krdpass/oauth2/v1/authorize',
    token: 'https://auth.krg.example/krdpass/oauth2/v1/token',
    jwks: 'https://auth.krg.example/krdpass/.well-known/jwks.json',
    userInfo: 'https://auth.krg.example/krdpass/oauth2/v1/userinfo'
  },
  policyEnforcements: {
    requirePkce: true,
    requireHttps: true,
    blockRawTokenTransmissionToJointAuditors: true,
    strictKrgOnlySovereigntyForCitizenIdentity: true
  }
};
