export type ProviderDomain =
  | 'Border'
  | 'Customs'
  | 'Revenue'
  | 'Trade'
  | 'Transparency'
  | 'Identity'
  | 'Workforce'
  | 'Security'
  | 'Intelligence'
  | 'Audit'
  | 'Ledger'
  | 'Workflow';

export type JurisdictionScope = 'FEDERAL_IRAQ' | 'KURDISTAN_REGION' | 'JOINT_OPERATIONS';

export type ApiContractStatus =
  | 'READY'
  | 'NOT_CONFIGURED'
  | 'MISSING_ENDPOINT'
  | 'SCHEMA_INCOMPLETE'
  | 'SECURITY_REQUIREMENT_MISSING'
  | 'JURISDICTION_VIOLATION';

export interface EndpointRequirement {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  expectedResponseKeys: string[];
}

export interface AuthRequirement {
  type: 'JWT' | 'MTLS' | 'API_KEY' | 'OAUTH2';
  roleRequired?: string;
}

export type DataSensitivityLevel = 'PUBLIC' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';

export type AllowedPayloadType = string[];
export type ForbiddenPayloadType = string[];

export interface ApiContract {
  domain: ProviderDomain;
  baseEndpointPlaceholder: string;
  allowedJurisdictions: JurisdictionScope[];
  allowedPayloadTypes: AllowedPayloadType;
  forbiddenPayloadTypes: ForbiddenPayloadType;
  authRequirement: AuthRequirement;
  auditRequired: boolean;
  healthCheckRoute: string;
  readinessRoute: string;
  metadataOnlyRuleIfJoint: boolean;
  routes: EndpointRequirement[];
}
