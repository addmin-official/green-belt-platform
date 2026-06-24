import { MOCK_LEDGER_BLOCKS, CHECKPOINTS } from '../mockData';

export interface TelemetryMetrics {
  uptime: number;
  processedTodayCumulative: number;
  revenueTodayCumulative: number; // Millions IQD
  ledgerBlocks: typeof MOCK_LEDGER_BLOCKS;
}

export class CommandCenterOrchestrator {
  private static instance: CommandCenterOrchestrator;
  
  private metrics: TelemetryMetrics = {
    uptime: 99.982,
    processedTodayCumulative: 5820,
    revenueTodayCumulative: 31940,
    ledgerBlocks: MOCK_LEDGER_BLOCKS,
  };

  private constructor() {}

  public static getInstance(): CommandCenterOrchestrator {
    if (!CommandCenterOrchestrator.instance) {
      CommandCenterOrchestrator.instance = new CommandCenterOrchestrator();
    }
    return CommandCenterOrchestrator.instance;
  }

  public getMetrics(): TelemetryMetrics {
    return this.metrics;
  }

  public tickMetrics(): TelemetryMetrics {
    this.metrics.processedTodayCumulative += Math.floor(Math.random() * 2) + 1;
    this.metrics.revenueTodayCumulative += Math.floor(Math.random() * 15) + 5;
    
    if (Math.random() > 0.7) {
      const randomActions = [
        `Approved Manifest Hash at ${CHECKPOINTS[Math.floor(Math.random() * CHECKPOINTS.length)].name.en}`,
        `Anti-Money Laundering verification passed - CBS Portal sync`,
        `Authorized clearance cert signed via federal token key-pair`,
        `Secure state ledger commit verified globally`
      ];
      const newBlock = {
        block: this.metrics.ledgerBlocks[0].block + 1,
        hash: '0000' + Math.random().toString(16).substring(2, 12),
        action: randomActions[Math.floor(Math.random() * randomActions.length)],
        status: 'Secured'
      };
      this.metrics.ledgerBlocks = [newBlock, ...this.metrics.ledgerBlocks.slice(0, 4)];
    }
    return this.metrics;
  }
}
