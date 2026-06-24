export interface ProviderResponse {
  status: "PROVIDER_NOT_CONNECTED" | "METADATA_PROVIDER_NOT_CONNECTED";
  providerState: "NOT_CONFIGURED" | "CONFIGURED";
  jurisdiction: "FEDERAL_IRAQ" | "KURDISTAN_REGION" | "JOINT_OPERATIONS";
  message: string;
  metadataOnly?: boolean;
}

export interface AuditLogEntry {
  requestId: string;
  timestamp: string;
  jurisdiction: "FEDERAL_IRAQ" | "KURDISTAN_REGION" | "JOINT_OPERATIONS";
  route: string;
  providerState: string;
  decision: string;
}
