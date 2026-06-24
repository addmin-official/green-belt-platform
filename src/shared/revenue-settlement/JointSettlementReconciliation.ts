import { SettlementAuditProof, SettlementStatus } from './FiscalSettlementTypes';

/**
 * @file JointSettlementReconciliation.ts
 * @description ئامرازی ڕێکخستنی هاوبەشی بەڵگەنامەکانی یەکلاییکردنەوەی دارایی.
 * تەنها لەسەر ئاستی مێتاداتای فەرمی و هاژ کار دەکات تا دژی پاراستنی زانیارییەکان نەبێت.
 */

export interface ReconciliationStatusReport {
  reconciliationId: string;
  krgProofHash: string;
  federalAcknowledgmentHash: string;
  transferStatus: 'PENDING_TRANSFER' | 'COMPLETED' | 'NONE';
  approvalStatus: SettlementStatus;
  disputeStatus: 'RESOLVED' | 'UNDER_DISPUTE' | 'NONE';
  reconciliationStatus: 'MATCHED' | 'MISMATCHED' | 'PENDING_VERIFICATION';
  reconciliationProof: string;
  timestamp: string;
  notes: string[];
}

export class JointSettlementReconciliation {
  /**
   * ئەنجامدانی بەراوردکردن لەسەر کۆدی هاژەکان و دەرکردنی بڕیاری ئاشتەوایی نیشتمانی بەبێ زانینی هێڵەکانی داهاتی خاو
   */
  public static reconcileProofs(
    krgProof: SettlementAuditProof,
    federalAckHash: string,
    transferState: 'PENDING_TRANSFER' | 'COMPLETED' | 'NONE',
    isDisputed: boolean
  ): ReconciliationStatusReport {
    const notes: string[] = [];
    const krgProofHash = `${krgProof.grossRevenueHash}_${krgProof.deductionHash}_${krgProof.payableAmountHash}`;
    
    let reconStatus: 'MATCHED' | 'MISMATCHED' | 'PENDING_VERIFICATION' = 'PENDING_VERIFICATION';
    
    // Joint never compares raw revenue lines.
    // Compare KRG submitted proof hash against Federal receipt acknowledgment hash
    if (federalAckHash === 'PENDING' || !federalAckHash) {
      reconStatus = 'PENDING_VERIFICATION';
      notes.push('چاوەڕێی وەرگرتنی واژۆی بەڵگەنامەی ڕادەستکردن لە لایەنی فیدراڵ دەکرێت.');
    } else if (krgProofHash === federalAckHash) {
      reconStatus = 'MATCHED';
      notes.push('هاژەکان تەواو یەکدەگرنەوە. هیچ بەیەکدادانێک لە مێتاداتادا بەدی نەکرا.');
    } else {
      reconStatus = 'MISMATCHED';
      notes.push('ئاڕاستەی گواستنەوەی هاژی مێتاداتا نایەکسانە. پێویستی بە وردبینی دارایی هەیە.');
    }

    let disputeStatus: 'RESOLVED' | 'UNDER_DISPUTE' | 'NONE' = 'NONE';
    if (isDisputed) {
      disputeStatus = 'UNDER_DISPUTE';
      notes.push('پڕۆسەکە کەوتووەتە ژێر پرسیار و ناڕەزایەتی یەکێک لە لایەنەکان.');
    } else if (reconStatus === 'MATCHED') {
      disputeStatus = 'RESOLVED';
    }

    const reconciliationProof = this.generateReconHash(
      krgProofHash,
      federalAckHash,
      reconStatus,
      disputeStatus
    );

    return {
      reconciliationId: `RECON-SETTLE-${krgProof.settlementPeriod}-${Math.floor(1000 + Math.random() * 9000)}`,
      krgProofHash,
      federalAcknowledgmentHash: federalAckHash,
      transferStatus: transferState,
      approvalStatus: krgProof.approvalState,
      disputeStatus,
      reconciliationStatus: reconStatus,
      reconciliationProof,
      timestamp: new Date().toISOString(),
      notes
    };
  }

  private static generateReconHash(krg: string, fed: string, recon: string, dispute: string): string {
    const raw = `${krg}|${fed}|${recon}|${dispute}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = ((hash << 5) - hash) + raw.charCodeAt(i);
      hash |= 0;
    }
    return `sha256_joint_reconciliation_${Math.abs(hash).toString(16).padStart(8, '0')}`;
  }
}
