import { ProcurementRegistry } from './ProcurementRegistry';
import { Tender, Bid, Jurisdiction } from './ProcurementTypes';

export class TenderEngine {
  static getTenders(): Tender[] {
    return ProcurementRegistry.getTenders();
  }

  static getTenderById(id: string): Tender | undefined {
    return this.getTenders().find(t => t.id === id);
  }

  static publishTender(
    tender: Omit<Tender, 'id' | 'status' | 'publishDate' | 'bidIds'>,
    actor: string
  ): Tender {
    const tenders = this.getTenders();
    const id = `td-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const newTender: Tender = {
      ...tender,
      id,
      status: 'Published',
      publishDate: new Date().toISOString().split('T')[0],
      bidIds: [],
    };

    tenders.unshift(newTender);
    ProcurementRegistry.saveTenders(tenders);

    ProcurementRegistry.logToLedger(
      'TENDER_PUBLISHED',
      'TENDER',
      id,
      actor,
      newTender
    );

    return newTender;
  }

  static transitionStatus(id: string, status: Tender['status'], actor: string): void {
    const tenders = this.getTenders();
    const index = tenders.findIndex(t => t.id === id);
    if (index !== -1) {
      tenders[index].status = status;
      ProcurementRegistry.saveTenders(tenders);

      ProcurementRegistry.logToLedger(
        'TENDER_STATUS_TRANSITIONED',
        'TENDER',
        id,
        actor,
        { status }
      );
    }
  }

  static submitBid(
    tenderId: string,
    vendorId: string,
    proposalUSD: number,
    technicalScore: number,
    actor: string
  ): Bid {
    const tenders = this.getTenders();
    const tIndex = tenders.findIndex(t => t.id === tenderId);
    if (tIndex === -1) {
      throw new Error(`Tender with ID ${tenderId} does not exist.`);
    }

    const vendors = ProcurementRegistry.getVendors();
    const vendor = vendors.find(v => v.id === vendorId);
    if (!vendor) {
      throw new Error(`Vendor with ID ${vendorId} does not exist.`);
    }

    if (vendor.status === 'Blacklisted' || vendor.status === 'Suspended') {
      throw new Error(`Vendor ${vendor.name.en} is ${vendor.status} and is barred from bidding.`);
    }

    const bids = ProcurementRegistry.getBids();
    const id = `bd-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Financial score is inversely proportional to cost relative to tender budget
    // e.g. if cost is exactly budget, score is 80. If half budget, score is 100. If over budget, score drops.
    const tenderBudget = tenders[tIndex].budgetUSD;
    const ratio = proposalUSD / tenderBudget;
    const financialScore = Math.max(0, Math.min(100, Math.round(100 - (ratio - 0.7) * 50)));

    // Overall is weighted: 60% technical, 40% financial
    const overallScore = Math.round(technicalScore * 0.6 + financialScore * 0.4);

    const newBid: Bid = {
      id,
      tenderId,
      vendorId,
      vendorName: vendor.name.en,
      proposalUSD,
      technicalScore,
      financialScore,
      overallScore,
      complianceChecked: false,
      complianceViolations: [],
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'Submitted',
    };

    bids.push(newBid);
    tenders[tIndex].bidIds.push(id);

    // If tender was published, change to Bid Open
    if (tenders[tIndex].status === 'Published') {
      tenders[tIndex].status = 'Bid Open';
    }

    ProcurementRegistry.saveBids(bids);
    ProcurementRegistry.saveTenders(tenders);

    ProcurementRegistry.logToLedger(
      'BID_SUBMITTED',
      'BID',
      id,
      actor,
      newBid
    );

    return newBid;
  }
}
