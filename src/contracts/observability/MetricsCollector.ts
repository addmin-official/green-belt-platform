export interface MetricsCollector {
  incrementMetric(name: string): void;
}
