import { CustomsAuditEvent, CustomsClearanceStatus } from '../../../shared/customs/CustomsTypes';

export class FederalCustomsAuditEngine {
  private static events: CustomsAuditEvent[] = [
    {
      id: 'AUD-FED-001',
      declarationId: 'DECL-FED-10020',
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      actor: 'Secured Federal Central Gateway',
      actionDetails: 'Declaration drafted automatically from port manifest hash validation.',
      previousStatus: 'pending',
      newStatus: 'pending',
      notes: 'Initial ingestion. Automated HS Validation score: 98% matching.'
    },
    {
      id: 'AUD-FED-002',
      declarationId: 'DECL-FED-10020',
      timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
      actor: 'Federal Customs Inspector Haidar',
      actionDetails: 'Assigned inspection crew and designated high-risk cargo container physical scan.',
      previousStatus: 'pending',
      newStatus: 'inspection'
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
      id: `AUD-FED-${Math.floor(100000 + Math.random() * 900000)}`,
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
    // Isolated - only accessible within Federal contexts
    return [...this.events];
  }
}
