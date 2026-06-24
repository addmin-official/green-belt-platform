export interface CorridorForecast {
  volumeChangePercentage: number;
  revenueChangePercentage: number;
  treasuryTrendAnalysis: string;
  executiveActionDirective: string;
  isDemoMode?: boolean;
}

export class AnalyticsViewModel {
  private forecast: CorridorForecast;

  constructor(forecast: CorridorForecast) {
    this.forecast = forecast;
  }

  get volumeChange(): string {
    const sign = this.forecast.volumeChangePercentage >= 0 ? '+' : '';
    return `${sign}${this.forecast.volumeChangePercentage}%`;
  }

  get rawVolumeChange(): number {
    return this.forecast.volumeChangePercentage;
  }

  get revenueChange(): string {
    const sign = this.forecast.revenueChangePercentage >= 0 ? '+' : '';
    return `${sign}${this.forecast.revenueChangePercentage}%`;
  }

  get rawRevenueChange(): number {
    return this.forecast.revenueChangePercentage;
  }

  get trendAnalysis(): string {
    return this.forecast.treasuryTrendAnalysis;
  }

  get executiveDirective(): string {
    return this.forecast.executiveActionDirective;
  }

  get isDemo(): boolean {
    return !!this.forecast.isDemoMode;
  }
}
