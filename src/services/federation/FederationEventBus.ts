export type FederationEventType = 'POLICY_UPDATED' | 'DATA_SHARED' | 'IDENTITY_VERIFIED' | 'PKI_TRUST_UPDATED' | 'EXECUTIVE_DECISION';

export interface FederationBusEvent {
  id: string;
  type: FederationEventType;
  sourceJurisdiction: 'federal' | 'krg' | 'joint';
  actor: string;
  payload: any;
  timestamp: string;
  cryptographicSignature: string;
}

export type EventSubscriberFn = (event: FederationBusEvent) => void;

export class FederationEventBus {
  private static subscribers: Record<FederationEventType, EventSubscriberFn[]> = {
    POLICY_UPDATED: [],
    DATA_SHARED: [],
    IDENTITY_VERIFIED: [],
    PKI_TRUST_UPDATED: [],
    EXECUTIVE_DECISION: []
  };

  private static eventHistory: FederationBusEvent[] = [
    {
      id: 'EVT-001',
      type: 'PKI_TRUST_UPDATED',
      sourceJurisdiction: 'federal',
      actor: 'Federal Security Auditor',
      payload: { rootCN: 'Federal Iraq Sovereign NID Root CA - G1', newStatus: 'active' },
      timestamp: '2026-06-08T03:10:00Z',
      cryptographicSignature: '0X981D84B9A1009DF8'
    },
    {
      id: 'EVT-002',
      type: 'IDENTITY_VERIFIED',
      sourceJurisdiction: 'krg',
      actor: 'KRG High Registrar',
      payload: { nationalId: 'KR-249102-1294', hash: 'SHA256_A982F' },
      timestamp: '2026-06-08T04:20:00Z',
      cryptographicSignature: '0XC820A1249A90BC72'
    }
  ];

  static subscribe(type: FederationEventType, callback: EventSubscriberFn): () => void {
    this.subscribers[type].push(callback);
    // Return unsubscribe fn
    return () => {
      this.subscribers[type] = this.subscribers[type].filter(cb => cb !== callback);
    };
  }

  static publish({
    type,
    sourceJurisdiction,
    actor,
    payload
  }: {
    type: FederationEventType;
    sourceJurisdiction: 'federal' | 'krg' | 'joint';
    actor: string;
    payload: any;
  }): FederationBusEvent {
    
    // Simulate solid crypto signature hash
    const rawSum = `${type}-${actor}-${JSON.stringify(payload)}-${Date.now()}`;
    let hashVal = 0;
    for (let i = 0; i < rawSum.length; i++) {
      hashVal = (hashVal << 5) - hashVal + rawSum.charCodeAt(i);
      hashVal |= 0;
    }
    const sig = `0X${Math.abs(hashVal).toString(16).toUpperCase()}`;

    const newEvent: FederationBusEvent = {
      id: `EVT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type,
      sourceJurisdiction,
      actor,
      payload,
      timestamp: new Date().toISOString(),
      cryptographicSignature: sig
    };

    this.eventHistory.unshift(newEvent);

    // Trigger subscribers
    const callbackList = this.subscribers[type] || [];
    callbackList.forEach(cb => {
      try {
        cb(newEvent);
      } catch (e) {
        console.error('Failure inside EventBus subscriber callback:', e);
      }
    });

    return newEvent;
  }

  static getHistory(): FederationBusEvent[] {
    return this.eventHistory;
  }

  static clearHistory() {
    this.eventHistory = [];
  }
}
