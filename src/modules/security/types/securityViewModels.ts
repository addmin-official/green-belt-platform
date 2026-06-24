import { ZeroTrustSession, AuditEvent } from '../../../security';

export interface SecuritySessionViewModel extends ZeroTrustSession {
  // Add UI properties if needed
}

export interface SecurityAuditEventViewModel extends AuditEvent {
  // Add UI properties if needed
}

export interface ComplianceItemViewModel {
  code: string;
  framework: string;
  name: {
    en: string;
    ar: string;
    ku: string;
  };
  status: 'COMPLIANT' | 'NON_COMPLIANT';
  level: {
    en: string;
    ar: string;
    ku: string;
  };
}

export interface SessionDistributionItem {
  label: string;
  value: number;
  color: string;
}
