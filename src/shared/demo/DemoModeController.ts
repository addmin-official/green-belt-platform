export type DemoMode = 'PRESENTATION_MODE' | 'TRAINING_MODE' | 'OPERATIONAL_MODE';

import { CHECKPOINTS, SYSTEM_SERVICES, TRADE_ALERTS, CARGO_PRESETS, MOCK_LEDGER_BLOCKS } from './sample-data';
import { ProviderState } from '../../infrastructure/providers/ProviderState';


export class DemoModeController {
  private static activeMode: DemoMode = 'PRESENTATION_MODE';

  // Configurable provider states for simulation in UI
  private static providerStates: Record<string, ProviderState> = {
    checkpoint: 'not_configured',
    operational: 'not_configured',
    audit: 'not_configured',
    ledger: 'not_configured',
    workflow: 'not_configured'
  };

  public static getActiveMode(): DemoMode {
    return this.activeMode;
  }

  public static setActiveMode(mode: DemoMode): void {
    if (mode === 'PRESENTATION_MODE' || mode === 'TRAINING_MODE' || mode === 'OPERATIONAL_MODE') {
      this.activeMode = mode;
    }
  }

  public static getProviderState(name: string): ProviderState {
    return this.providerStates[name] || 'not_configured';
  }

  public static setProviderState(name: string, state: ProviderState): void {
    if (this.providerStates[name] !== undefined) {
      this.providerStates[name] = state;
    }
  }

  public static getModeDescription(mode: DemoMode): string {
    switch (mode) {
      case 'PRESENTATION_MODE':
        return 'Fully responsive sandbox loaded with high-fidelity sovereign simulation scenarios for national leadership review.';
      case 'TRAINING_MODE':
        return 'Interactive training environment with step-by-step guides for customs and boundary integrity officers.';
      case 'OPERATIONAL_MODE':
        return 'Encrypted live operational mode. Locks down simulation features and connects exclusively to production secure nodes.';
      default:
        return '';
    }
  }

  // Quarantined Demo/Sample Data Getters
  public static getCheckpoints() {
    return CHECKPOINTS;
  }

  public static getSystemServices() {
    return SYSTEM_SERVICES;
  }

  public static getTradeAlerts() {
    return TRADE_ALERTS;
  }

  public static getCargoPresets() {
    return CARGO_PRESETS;
  }

  public static getMockLedgerBlocks() {
    return MOCK_LEDGER_BLOCKS;
  }
}
export type { ProviderState };
