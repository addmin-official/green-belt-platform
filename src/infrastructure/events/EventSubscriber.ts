import { DomainEvent } from './DomainEvent';

export interface EventSubscriber {
  subscribe(eventType: string, handler: (event: DomainEvent) => Promise<void>): void;
}
