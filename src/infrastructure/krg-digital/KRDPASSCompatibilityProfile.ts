export interface KRDPASSCompatibilityProfile {
  oauthVersion: 'OAuth2.0' | 'OIDC_1.0';
  authFlows: {
    userAuthentication: 'Authorization Code Grant + PKCE';
    serviceToService: 'Client Credentials';
  };
  jwksUriPlaceholder: string;
  jwtConstraints: {
    expectedIssuerPlaceholder: string;
    expectedAudiencePlaceholder: string;
    signatureAlgorithm: 'RS256';
    clockSkewSeconds: number;
  };
  redirectUris: string[];
  registeredScopes: {
    scope: string;
    sensitivity: 'PUBLIC' | 'RESTRICTED' | 'HIGH_SENSITIVITY';
    jurisdictionLimit: 'KRG_ONLY' | 'ALL_SYSTEM';
    description: string;
  }[];
}

export const KRD_PASS_PROFILE: KRDPASSCompatibilityProfile = {
  oauthVersion: 'OIDC_1.0',
  authFlows: {
    userAuthentication: 'Authorization Code Grant + PKCE',
    serviceToService: 'Client Credentials'
  },
  jwksUriPlaceholder: 'https://auth.krg.example/krdpass/.well-known/jwks.json',
  jwtConstraints: {
    expectedIssuerPlaceholder: 'https://auth.krg.example/krdpass',
    expectedAudiencePlaceholder: 'iraq-digital-gateway-client',
    signatureAlgorithm: 'RS256',
    clockSkewSeconds: 60
  },
  redirectUris: [
    'https://idg.gov.example/auth/krdpass/callback',
    'http://localhost:3000/auth/krdpass/callback'
  ],
  registeredScopes: [
    {
      scope: 'openid',
      sensitivity: 'PUBLIC',
      jurisdictionLimit: 'ALL_SYSTEM',
      description: 'Minimum required scope to establish OIDC identity token.'
    },
    {
      scope: 'profile',
      sensitivity: 'RESTRICTED',
      jurisdictionLimit: 'ALL_SYSTEM',
      description: 'Basic regional worker metadata such as visual names and organization departments.'
    },
    {
      scope: 'citizen_identity',
      sensitivity: 'HIGH_SENSITIVITY',
      jurisdictionLimit: 'KRG_ONLY',
      description: 'National security citizen registers, civil ID references, and residential records.'
    }
  ]
};
