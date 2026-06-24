// IDG Sovereign Real-Time Event Broker System
// Supports asynchronous decoupled integration events across national ministries

export type EventTopic = 
  | 'identity.citizen.unified'
  | 'customs.manifest.declared'
  | 'financial.wire.flagged'
  | 'security.enclave.alarm'
  | 'audit.key.rotated';

export interface SovereignDomainEvent {
  eventId: string;
  topic: EventTopic;
  timestamp: string;
  sourceSystem: string;
  payload: any;
  securitySignature: string; // HMAC validation signature
}

export type EventConsumerCallback = (event: SovereignDomainEvent) => void;

export class SovereignEventBus {
  private static instance: SovereignEventBus;
  private eventHistory: SovereignDomainEvent[] = [];
  
  // Registration map holding topic interest
  private topicSubscribers: Map<EventTopic, EventConsumerCallback[]> = new Map();

  private constructor() {
    this.seedRecentEventHistory();
  }

  public static getInstance(): SovereignEventBus {
    if (!SovereignEventBus.instance) {
      SovereignEventBus.instance = new SovereignEventBus();
    }
    return SovereignEventBus.instance;
  }

  private seedRecentEventHistory() {
    this.eventHistory = [
      {
        eventId: 'evt-cbi-88120',
        topic: 'financial.wire.flagged',
        timestamp: new Date(Date.now() - 300000).toISOString(), // 5 mins ago
        sourceSystem: 'Central Bank compliance-ledger matcher',
        payload: {
          wireId: 'WIR-882193-IQD',
          amountIQD: 4500000000,
          remitterName: 'Sumer National Logistics Inc.',
          flagReason: 'Deviation exceeding average monthly volume by 420%',
          suspectedHsCode: '84.21.39'
        },
        securitySignature: 'hmac-sha256-cbi-0928cdbfa'
      },
      {
        eventId: 'evt-customs-9921',
        topic: 'customs.manifest.declared',
        timestamp: new Date(Date.now() - 600000).toISOString(), // 10 mins ago
        sourceSystem: 'Ibrahim Khalil Gate local terminal',
        payload: {
          manifestId: 'MNF-IKG-992120-C',
          importerName: 'Babylon Food Imports Ltd',
          goodsCategory: 'Grain/Agriculture Seeds',
          weightTons: 42.8,
          riskTier: 'LOW'
        },
        securitySignature: 'hmac-sha250-customs-88d9cda'
      },
      {
        eventId: 'evt-alarm-022',
        topic: 'security.enclave.alarm',
        timestamp: new Date(Date.now() - 900000).toISOString(), // 15 mins ago
        sourceSystem: 'Basra Sea Port Enclave Aggregator',
        payload: {
          enclaveId: 'dev-basra-terminal-card-9',
          alarmType: 'HARDWARE_TAMPER_SIGNAL_HIGH',
          enforcementActionState: 'ISOLATED_PORT_LINEED_RE-AUTH'
        },
        securitySignature: 'hmac-sha250-enclave-alarm-true991'
      }
    ];
  }

  /**
   * Subscribes a micro-subsystem consumer to target event topic
   */
  public subscribe(topic: EventTopic, callback: EventConsumerCallback) {
    if (!this.topicSubscribers.has(topic)) {
      this.topicSubscribers.set(topic, []);
    }
    this.topicSubscribers.get(topic)!.push(callback);
  }

  /**
   * Publishes secure sovereign events dynamically and routes to registered lines
   */
  public publish(topic: EventTopic, sourceSystem: string, payload: any): SovereignDomainEvent {
    const eventId = `IDG-EVT-${Math.floor(10000 + Math.random() * 90000)}`;
    const timestamp = new Date().toISOString();
    
    // Dynamic signature generation
    const securitySignature = `hmac-sha256-live-dispatch-${eventId}-${timestamp.slice(11,19)}`;

    const newEvent: SovereignDomainEvent = {
      eventId,
      topic,
      timestamp,
      sourceSystem,
      payload,
      securitySignature
    };

    // Store in history (bounded cache)
    this.eventHistory.unshift(newEvent);
    if (this.eventHistory.length > 50) {
      this.eventHistory.pop();
    }

    // Route to subscribers
    const callbacks = this.topicSubscribers.get(topic);
    if (callbacks) {
      callbacks.forEach(cb => {
        try {
          cb(newEvent);
        } catch (e) {
          console.error(`Subsystem Event Routing Failure on topic [${topic}]:`, e);
        }
      });
    }

    return newEvent;
  }

  public getEventHistory(): SovereignDomainEvent[] {
    return this.eventHistory;
  }
}
