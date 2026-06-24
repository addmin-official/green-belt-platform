export interface TelemetryService {
  logEvent(name: string, payload: any): void;
}
