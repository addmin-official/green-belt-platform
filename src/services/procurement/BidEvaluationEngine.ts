import { ProcurementRegistry } from './ProcurementRegistry';
import { Bid, Tender } from './ProcurementTypes';
import { ProcurementComplianceEngine } from './ProcurementComplianceEngine';

export class BidEvaluationEngine {
  static getBids(): Bid[] {
    return ProcurementRegistry.getBids();
  }

  static getBidsForTender(tenderId: string): Bid[] {
    return this.getBids().filter(b => b.tenderId === tenderId);
  }

  /**
   * Evaluates all bids under a target tender.
   * Compiles and runs compliance rule checks on each bid.
   */
  static evaluateBids(tenderId: string, actor: string): { evaluated: number; failures: number } {
    const tenders = ProcurementRegistry.getTenders();
    const tIndex = tenders.findIndex(t => t.id === tenderId);
    if (tIndex === -1) return { evaluated: 0, failures: 0 };

    const tender = tenders[tIndex];
    const bids = ProcurementRegistry.getBids();
    const tenderBids = bids.filter(b => b.tenderId === tenderId);

    let evaluated = 0;
    let failures = 0;

    tenderBids.forEach(bid => {
      // 1. Audit compliance checks
      const complianceResult = ProcurementComplianceEngine.verifyBidCompliance(tender, bid);
      bid.complianceChecked = true;
      bid.complianceViolations = complianceResult.violations;
      bid.status = complianceResult.compliant ? 'Approved' : 'Rejected';

      // 2. Adjust overall score if compliance rules are violated
      if (!complianceResult.compliant) {
        bid.overallScore = Math.max(0, bid.overallScore - 30); // Heavy penalty
        failures++;
      } else {
        // Technically qualified?
        if (bid.technicalScore < tender.minimumScoreRequired) {
          bid.status = 'Rejected';
          bid.complianceViolations.push(`Failed minimum required technical score of ${tender.minimumScoreRequired}`);
          failures++;
        }
      }

      evaluated++;
    });

    // Save evaluated bids
    ProcurementRegistry.saveBids(bids);

    // Transition tender to Evaluation status
    tender.status = 'Evaluation';
    ProcurementRegistry.saveTenders(tenders);

    ProcurementRegistry.logToLedger(
      'TENDER_BIDS_EVALUATED',
      'TENDER',
      tenderId,
      actor,
      { evaluatedCount: evaluated, complianceFailureCount: failures }
    );

    return { evaluated, failures };
  }

  /**
   * Awards the tender to the highest scoring COMPLIANT bid.
   */
  static awardTender(tenderId: string, bidId: string, actor: string): Bid {
    const tenders = ProcurementRegistry.getTenders();
    const tIndex = tenders.findIndex(t => t.id === tenderId);
    if (tIndex === -1) throw new Error('Tender not found');

    const bids = ProcurementRegistry.getBids();
    const bIndex = bids.findIndex(b => b.id === bidId);
    if (bIndex === -1) throw new Error('Bid not found');

    const bid = bids[bIndex];
    if (bid.status === 'Rejected') {
      throw new Error('Cannot award to a non-compliant or rejected bid');
    }

    // Award this bid, reject the rest of the bids for this tender
    bids.forEach(b => {
      if (b.tenderId === tenderId) {
        b.status = b.id === bidId ? 'Awarded' : 'Rejected';
      }
    });
    ProcurementRegistry.saveBids(bids);

    // Transition Tender to 'Awarded'
    tenders[tIndex].status = 'Awarded';
    ProcurementRegistry.saveTenders(tenders);

    // Log ledger
    ProcurementRegistry.logToLedger(
      'TENDER_AWARDED',
      'TENDER',
      tenderId,
      actor,
      { bidId, awardedVendor: bid.vendorName, finalProposalUSD: bid.proposalUSD }
    );

    return bids[bIndex];
  }
}
