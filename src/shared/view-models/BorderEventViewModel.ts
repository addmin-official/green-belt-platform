import { Checkpoint, TradeAlert } from '../../core/types';

export class BorderEventViewModel {
  private checkpoint?: Checkpoint;
  private alert?: TradeAlert;

  constructor(checkpoint?: Checkpoint, alert?: TradeAlert) {
    this.checkpoint = checkpoint;
    this.alert = alert;
  }

  get checkpointId(): string | undefined {
    return this.checkpoint?.id;
  }

  get checkpointName(): { en: string; ar: string; ku: string } | undefined {
    return this.checkpoint?.name;
  }

  get checkpointRegion(): { en: string; ar: string; ku: string } | undefined {
    return this.checkpoint?.region;
  }

  get checkpointType(): 'land' | 'sea' | 'air' | undefined {
    return this.checkpoint?.type;
  }

  get checkpointStatus(): 'active' | 'warning' | 'alert' | undefined {
    return this.checkpoint?.status;
  }

  get throughputRaw(): number | undefined {
    return this.checkpoint?.throughputRaw;
  }

  get revenueRaw(): number | undefined {
    return this.checkpoint?.revenueRaw;
  }

  get processedToday(): number | undefined {
    return this.checkpoint?.processedToday;
  }

  get formattedRevenue(): string {
    return this.checkpoint ? `${this.checkpoint.revenueRaw.toLocaleString()} IQD M` : '';
  }

  get formattedProcessed(): string {
    return this.checkpoint ? this.checkpoint.processedToday.toLocaleString() : '';
  }

  get alertId(): string | undefined {
    return this.alert?.id;
  }

  get alertSeverity(): string | undefined {
    return this.alert?.severity;
  }

  get alertTitle(): { en: string; ar: string; ku: string } | undefined {
    return this.alert?.title;
  }

  get alertDescription(): { en: string; ar: string; ku: string } | undefined {
    return this.alert?.description;
  }

  get alertStatus(): string | undefined {
    return this.alert?.status;
  }
}
