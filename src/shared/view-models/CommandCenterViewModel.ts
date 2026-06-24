import { MOCK_LEDGER_BLOCKS } from '../../mockData';

export interface TelemetryData {
  uptime: number;
  processedTodayCumulative: number;
  revenueTodayCumulative: number;
}

export class CommandCenterViewModel {
  private telemetry: TelemetryData;
  private activeRole: string;
  private ledgerBlocks: any[];

  constructor(telemetry: TelemetryData, activeRole: string, ledgerBlocks: any[] = MOCK_LEDGER_BLOCKS) {
    this.telemetry = telemetry;
    this.activeRole = activeRole;
    this.ledgerBlocks = ledgerBlocks;
  }

  get uptime(): string {
    return this.telemetry.uptime.toFixed(3);
  }

  get rawUptime(): number {
    return this.telemetry.uptime;
  }

  get processedCumulative(): string {
    return this.telemetry.processedTodayCumulative.toLocaleString();
  }

  get rawProcessedCumulative(): number {
    return this.telemetry.processedTodayCumulative;
  }

  get revenueCumulative(): string {
    return this.telemetry.revenueTodayCumulative.toLocaleString();
  }

  get rawRevenueCumulative(): number {
    return this.telemetry.revenueTodayCumulative;
  }

  get currentRole(): string {
    return this.activeRole;
  }

  get blocks(): any[] {
    return this.ledgerBlocks;
  }
}
