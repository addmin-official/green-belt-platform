export interface AnalyticsGateway {
  getMetricTrends(metricName: string): Promise<unknown>;
}
