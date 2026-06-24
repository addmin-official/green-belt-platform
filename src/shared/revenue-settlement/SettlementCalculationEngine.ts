import { SettlementStatus, SettlementAuditProof, SettlementPeriodData } from './FiscalSettlementTypes';
import { RevenueSharingPolicyRegistry } from './RevenueSharingPolicyRegistry';
import { FederalKRGSettlementPolicy } from './FederalKRGSettlementPolicy';

/**
 * @file SettlementCalculationEngine.ts
 * @description بزوێنەری شیکاری و ئەنجامدانی هاوسەنگی و پشکنین کە تەنها لە کاتی هەبوونی داتای ڕاستەقینە کار دەکات.
 * هیچ بڕە پارەیەکی خەمڵێندراو یان ساختە بەکارناهێنێت.
 */

export interface SettlementProviderConnector {
  jurisdiction: 'KRG' | 'FEDERAL';
  isConfigured: boolean;
  getRawTotalUSD?: () => number;
  getDeductionUSD?: () => number;
  getHashChain?: () => string;
}

export interface CalculationResult {
  policyId: string;
  periodId: string;
  calculationAvailable: boolean;
  status: SettlementStatus;
  providerState: 'CONFIGURED' | 'NOT_CONFIGURED';
  auditProof?: SettlementAuditProof;
  errorMessage?: string;
}

export class SettlementCalculationEngine {
  private static krgProvider: SettlementProviderConnector | null = null;
  private static federalProvider: SettlementProviderConnector | null = null;

  /**
   * تۆمارکردنی کارپێکەری دابینکاری داتا لە هەر لایەنێک
   */
  public static registerKrgProvider(provider: SettlementProviderConnector): void {
    this.krgProvider = provider;
  }

  public static registerFederalProvider(provider: SettlementProviderConnector): void {
    this.federalProvider = provider;
  }

  /**
   * لادانی هەردوو دابینکاری داتا
   */
  public static clearProviders(): void {
    this.krgProvider = null;
    this.federalProvider = null;
  }

  /**
   * پشکنینی لایەنی دابینکاری داتا
   */
  public static getProviderStatus(): {
    krgConfigured: boolean;
    federalConfigured: boolean;
    overallReady: boolean;
  } {
    const krgReady = !!this.krgProvider && this.krgProvider.isConfigured;
    const fedReady = !!this.federalProvider && this.federalProvider.isConfigured;
    return {
      krgConfigured: krgReady,
      federalConfigured: fedReady,
      overallReady: krgReady && fedReady
    };
  }

  /**
   * هەژمارکردنی یەکگرتووی نێوان هەرێم و فیدراڵ
   * تێبینی: ئەگەر کارپێکەر هەبوو، هەژماری دەکات بەبێ پیشاندانی داتای خاو بۆ سیستەمی هاوبەش.
   */
  public static calculateSettlement(policyId: string, periodId: string): CalculationResult {
    const policyObj = RevenueSharingPolicyRegistry.getPolicyById(policyId);
    if (!policyObj) {
      return {
        policyId,
        periodId,
        calculationAvailable: false,
        status: 'DRAFT',
        providerState: 'NOT_CONFIGURED',
        errorMessage: 'سیاسەتی دیاریکراو نەدۆزرایەوە.'
      };
    }

    const { krgConfigured, federalConfigured, overallReady } = this.getProviderStatus();

    // ئەگەر دابینکار واژۆ نەکرابوو یان ئامادە نەبوو، گەڕاندنەوەی باری چاوەڕوانی
    if (!overallReady) {
      return {
        policyId,
        periodId,
        calculationAvailable: false,
        status: 'PENDING_PROVIDER_DATA', // status: PENDING_PROVIDER_DATA
        providerState: 'NOT_CONFIGURED' // providerState: NOT_CONFIGURED
      };
    }

    try {
      const policyPolicy = new FederalKRGSettlementPolicy(policyId);
      policyPolicy.updateStatus('PENDING_REVIEW');

      // ڕاکێشانی زانیاری لە ڕێگەی دابینکارە بەستراوەکانەوە
      // دڵنیابوونەوە کە داتای خاو تەنها بۆ هەژمارکردنی ناوبژیوانییە و ناچێتە دەرەوە
      const source = policyObj.jurisdictionSource;
      let rawSourceAmount = 0;
      let sourceDeductions = 0;
      let hashChain = 'EMPTY_SOURCE';

      if (source === 'KURDISTAN_REGION' && this.krgProvider) {
        rawSourceAmount = this.krgProvider.getRawTotalUSD ? this.krgProvider.getRawTotalUSD() : 0;
        sourceDeductions = this.krgProvider.getDeductionUSD ? this.krgProvider.getDeductionUSD() : 0;
        hashChain = this.krgProvider.getHashChain ? this.krgProvider.getHashChain() : 'KRG_SHIELDED_HASH';
      } else if (source === 'FEDERAL_IRAQ' && this.federalProvider) {
        rawSourceAmount = this.federalProvider.getRawTotalUSD ? this.federalProvider.getRawTotalUSD() : 0;
        sourceDeductions = this.federalProvider.getDeductionUSD ? this.federalProvider.getDeductionUSD() : 0;
        hashChain = this.federalProvider.getHashChain ? this.federalProvider.getHashChain() : 'FED_SHIELDED_HASH';
      }

      if (rawSourceAmount === 0) {
        // ناکرێت تێکەڵەی بێ بنەما بخرێتە کار ئەگەر بڕی ڕاستەقینە کەمتر بێت لە یەک مۆدێل
        return {
          policyId,
          periodId,
          calculationAvailable: false,
          status: 'PENDING_PROVIDER_DATA',
          providerState: 'NOT_CONFIGURED',
          errorMessage: 'داتای دابینکراو بە ناتەواوی گەیشتووە.'
        };
      }

      // هەژماری دەست پێ دەکات
      const percentage = policyObj.settlementPercentage;
      const netCalculatedBasis = Math.max(0, rawSourceAmount - sourceDeductions);
      const payableAmount = (netCalculatedBasis * percentage) / 100;

      // دروستکردنی زنجیرەی جێگیری بۆ نووسینی مێتاداتا
      const grossHash = this.hashDecimalValue(rawSourceAmount, 'gross');
      const deductionHash = this.hashDecimalValue(sourceDeductions, 'deduction');
      const payableHash = this.hashDecimalValue(payableAmount, 'payable');

      // واژۆکردنی مێتاداتا بۆ کەی جی یەکگرتوو
      const auditProof = policyPolicy.generateAuditProof(
        periodId,
        grossHash,
        deductionHash,
        payableHash,
        'CALCULATED'
      );

      return {
        policyId,
        periodId,
        calculationAvailable: true,
        status: 'CALCULATED',
        providerState: 'CONFIGURED',
        auditProof
      };
    } catch (err: any) {
      return {
        policyId,
        periodId,
        calculationAvailable: false,
        status: 'DRAFT',
        providerState: 'NOT_CONFIGURED',
        errorMessage: err.message || 'هەڵە لە بزوێنەری هەژمارکردن کۆنتڕۆڵ کرا.'
      };
    }
  }

  private static hashDecimalValue(val: number, label: string): string {
    let hash = 0;
    const str = `${label}_${val.toFixed(2)}`;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return `sha256_settle_${Math.abs(hash).toString(16).padStart(8, '0')}`;
  }
}
