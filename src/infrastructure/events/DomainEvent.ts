export interface DomainEvent {
  type: string;
  payload: unknown;
  timestamp: string;
}
