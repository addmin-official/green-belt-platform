import { SettlementCalculationEngine } from './SettlementCalculationEngine';
import { RevenueSharingPolicyRegistry } from './RevenueSharingPolicyRegistry';

/**
 * @file FiscalSettlementReadinessReport.ts
 * @description ئامادەکردنی ڕاپۆرتی فەرمی لە سەر باری ئامادەیی سیستەمی یەکلاییکردنەوەی بودجە و داهات.
 * دۆخی کۆتایی: "CONDITIONALLY_READY — FISCAL SETTLEMENT POLICY READY, PROVIDERS REQUIRED"
 */

export interface SettlementReadinessSummary {
  finalReadiness: 'CONDITIONALLY_READY' | 'NOT_READY' | 'PILOT_READY';
  hasRegisteredPolicies: boolean;
  policyCount: number;
  krgProviderState: 'CONFIGURED' | 'NOT_CONFIGURED';
  federalProviderState: 'CONFIGURED' | 'NOT_CONFIGURED';
  legalAgreementActive: boolean;
  realTransferConfirmed: boolean;
  realCalculationCreated: boolean;
  timestamp: string;
  reconciliationStatus: string;
  notes: string[];
}

export class FiscalSettlementReadinessReport {
  /**
   * دەرکردنی نووسراوی فەرمی لەسەر باری سیستم
   */
  public static generateReport(): SettlementReadinessSummary {
    const policyCount = RevenueSharingPolicyRegistry.getAllPolicies().length;
    const { krgConfigured, federalConfigured } = SettlementCalculationEngine.getProviderStatus();

    const notes: string[] = [
      'سیاسەتەکانی ڕێککەوتن بە تەواوی دانراون بەڵام پەسەندکردنیان بەندە بە تەواوبوونی پڕۆسەی واژۆکردنی یاسایی.',
      'دابینکاری داتای ناوخۆیی کەی جی و فیدراڵ هێشتا کۆنفۆگەر نەکراون بۆ قۆناغی بڵاوکردنەوەی گشتی.',
      'ئەم سیستمە بۆ نیشاندانی تاقیکاری کار دەکات بەبێ ئەنجامدانی هیچ کایەیەکی ساختەی هەسارەیی.'
    ];

    return {
      finalReadiness: 'CONDITIONALLY_READY', // CONDITIONALLY_READY — FISCAL SETTLEMENT POLICY READY, PROVIDERS REQUIRED
      hasRegisteredPolicies: policyCount > 0,
      policyCount,
      krgProviderState: krgConfigured ? 'CONFIGURED' : 'NOT_CONFIGURED',
      federalProviderState: federalConfigured ? 'CONFIGURED' : 'NOT_CONFIGURED',
      legalAgreementActive: false, // Do not claim legal agreement is active
      realTransferConfirmed: false, // Do not claim transfer occurred
      realCalculationCreated: false, // Do not claim real settlement calculation exists
      timestamp: new Date().toISOString(),
      reconciliationStatus: 'PENDING_PROVIDERS',
      notes
    };
  }
}
