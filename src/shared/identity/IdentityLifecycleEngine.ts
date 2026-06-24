import { DigitalIdentity, LifecycleEvent } from './IdentityTypes';
import { IdentityRegistry } from './IdentityRegistry';

export class IdentityLifecycleEngine {
  private static eventLog: LifecycleEvent[] = [];

  public static getEvents(): LifecycleEvent[] {
    return this.eventLog;
  }

  private static generateAuditHash(event: Omit<LifecycleEvent, 'auditHash'>): string {
    const rawData = `${event.eventId}-${event.employeeId}-${event.type}-${event.fromDetails}-${event.toDetails}-${event.approvedBy}-${event.timestamp}`;
    // Simple fast DJB2 hash-turned-hex representation for sovereign ledger
    let hash = 5381;
    for (let i = 0; i < rawData.length; i++) {
      hash = (hash * 33) ^ rawData.charCodeAt(i);
    }
    return `LEDGER_HASH_${(hash >>> 0).toString(16).toUpperCase()}`;
  }

  public static executeLifecycleAction(
    employeeId: string,
    action: 'hire' | 'transfer' | 'promote' | 'suspend' | 'terminate' | 'retire' | 'reassign',
    from: string,
    to: string,
    operator: string
  ): LifecycleEvent {
    const identity = IdentityRegistry.getById(employeeId);
    if (!identity) {
      throw new Error(`Employee ${employeeId} does not exist in registry.`);
    }

    // Execute state transitions
    let nextStatus: DigitalIdentity['status'] = identity.status;
    let nextRole: string = identity.role;
    let nextOrg = identity.organization;

    if (action === 'suspend') nextStatus = 'suspended';
    else if (action === 'terminate') nextStatus = 'terminated';
    else if (action === 'retire') nextStatus = 'retired';
    else if (action === 'hire' || action === 'reassign') nextStatus = 'active';

    if (action === 'transfer') {
      const parts = to.split('::');
      if (parts[0] === 'FEDERAL_IRAQ' || parts[0] === 'KRG' || parts[0] === 'JOINT_OPERATIONS') {
        nextOrg = parts[0];
      }
      if (parts[1]) {
        nextRole = parts[1];
      }
    }

    // Apply updates
    IdentityRegistry.updateIdentity(employeeId, {
      status: nextStatus,
      role: nextRole,
      organization: nextOrg,
    });

    const event: LifecycleEvent = {
      eventId: `EVT-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      employeeId,
      type: action,
      fromDetails: from,
      toDetails: to,
      approvedBy: operator,
      timestamp: new Date().toISOString(),
      auditHash: '',
    };

    event.auditHash = this.generateAuditHash(event);
    this.eventLog.push(event);

    return event;
  }
}
