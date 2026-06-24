export interface EventEnvelope<T> {
  metadata: Record<string, unknown>;
  data: T;
}
