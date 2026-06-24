import { AIAnalysisResult } from '../../core/types';

export class AuditViewModel {
  private result: AIAnalysisResult;

  constructor(result: AIAnalysisResult) {
    this.result = result;
  }

  get status(): 'APPROVED' | 'FLAGGED' | 'REJECTED' {
    return this.result.status;
  }

  get tariffCalculatedIQD(): number {
    return this.result.tariffCalculatedIQD;
  }

  get formattedTariffCalculatedIQD(): string {
    return this.result.tariffCalculatedIQD.toLocaleString();
  }

  get tariffPercentage(): number {
    return this.result.tariffPercentage;
  }

  get isMatch(): boolean {
    return this.result.hsCodeVerification.isMatch;
  }

  get suggestedHSCode(): string {
    return this.result.hsCodeVerification.suggestedHSCode;
  }

  get explanation(): string {
    return this.result.hsCodeVerification.explanation;
  }

  get riskScore(): number {
    return this.result.riskScore;
  }

  get isHighRisk(): boolean {
    return this.result.riskScore > 50;
  }

  get riskAnalysis(): string[] {
    return this.result.riskAnalysis;
  }

  get complianceProtocolUsed(): string {
    return this.result.complianceProtocolUsed;
  }

  get routingRecommendation(): string {
    return this.result.routingRecommendation;
  }

  get arabicSummary(): string | undefined {
    return this.result.arabicSummary;
  }

  get kurdishSummary(): string | undefined {
    return this.result.kurdishSummary;
  }

  get notice(): string | undefined {
    return this.result.notice;
  }

  get isDemoMode(): boolean | undefined {
    return this.result.isDemoMode;
  }
}
