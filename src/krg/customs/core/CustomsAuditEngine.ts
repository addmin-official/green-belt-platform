import { CustomsAuditEvent, CustomsClearanceStatus } from '../../../shared/customs/CustomsTypes';

export class KRGCustomsAuditEngine {
  private static events: CustomsAuditEvent[] = [
    {
      id: 'AUD-KRG-001',
      declarationId: 'DECL-KRG-80021',
      timestamp: new Date(Date.now() - 3600000 * 30).toISOString(),
      actor: 'Ibrahim Khalil Gate Controller',
      actionDetails: 'Automated regional manifest onboarding finalized.',
      previousStatus: 'pending',
      newStatus: 'pending',
      notes: 'Ingested into local Erbil ledger. HS Code evaluated successfully.'
    },
    {
      id: 'AUD-KRG-002',
      declarationId: 'DECL-KRG-80021',
      timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
      actor: 'Regional Customs Inspector Hemen',
      actionDetails: 'Physical scanner review bypassed after local PKI credential verification.',
      previousStatus: 'pending',
      newStatus: 'approved'
    }
  ];

  public static appendEvent(
    declarationId: string,
    actor: string,
    actionDetails: string,
    previousStatus: CustomsClearanceStatus,
    newStatus: CustomsClearanceStatus,
    notes?: string
  ): CustomsAuditEvent {
    const newEvent: CustomsAuditEvent = {
      id: `AUD-KRG-${Math.floor(100000 + Math.random() * 900000)}`,
      declarationId,
      timestamp: new Date().toISOString(),
      actor,
      actionDetails,
      previousStatus,
      newStatus,
      notes
    };
    this.events.unshift(newEvent);
    return newEvent;
  }

  public static getEventsForDeclaration(declarationId: string): CustomsAuditEvent[] {
    return this.events.filter(e => e.declarationId === declarationId);
  }

  public static getAllEvents(): CustomsAuditEvent[] {
    // Isolated - only accessible within KRG contexts
    return [...this.events];
  }
}
