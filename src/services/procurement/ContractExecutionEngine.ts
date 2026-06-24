import { ProcurementRegistry } from './ProcurementRegistry';
import { Tender, Bid, Contract, Jurisdiction } from './ProcurementTypes';
import { ContractRegistry } from './ContractRegistry';

export class ContractExecutionEngine {
  /**
   * Automatically executes and instantiates a formal Sovereign Contract
   * once a tender is bid-awarded.
   */
  static executeContract(tenderId: string, bidId: string, actor: string): Contract {
    const tenders = ProcurementRegistry.getTenders();
    const tender = tenders.find(t => t.id === tenderId);
    if (!tender) throw new Error('Tender not found');

    const bids = ProcurementRegistry.getBids();
    const bid = bids.find(b => b.id === bidId);
    if (!bid) throw new Error('Bid not found');

    if (bid.status !== 'Awarded') {
      throw new Error('Can only execute contract for an officially Awarded bid');
    }

    const id = `ct-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const signingDate = new Date().toISOString().split('T')[0];
    
    // contract completion default to 1 year from signing
    const compDate = new Date();
    compDate.setFullYear(compDate.getFullYear() + 1);
    const completionDate = compDate.toISOString().split('T')[0];

    const newContract: Contract = {
      id,
      tenderId,
      vendorId: bid.vendorId,
      vendorName: bid.vendorName,
      title: tender.title,
      jurisdiction: tender.jurisdiction,
      valueUSD: bid.proposalUSD,
      spentUSD: 0,
      authority: tender.authority,
      signingDate,
      completionDate,
      status: 'Active',
      milestones: [
        {
          id: `ms-${id}-1`,
          description: {
            en: 'Establishment Logistics & Site Mobilization',
            ar: 'تعبئة الموقع والتجهيزات اللوجستية الأولية',
            ku: 'ئامادەکاری لۆجستی مەیدانی و جێگیرکردنی پڕۆژە'
          },
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          weight: 20,
          status: 'Pending',
          progress: 0,
        },
        {
          id: `ms-${id}-2`,
          description: {
            en: 'Structural Core Implementation Checkpoint',
            ar: 'إنجاز الهيكل الخرساني والإنشائي الأساسي',
            ku: 'تەواوکردنی بەشی بنیاتنانی سەرەکی پڕۆژەکە'
          },
          dueDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          weight: 50,
          status: 'Pending',
          progress: 0,
        },
        {
          id: `ms-${id}-3`,
          description: {
            en: 'Final Inspection & Intergovernmental Sign-off',
            ar: 'التفتيش النهائي وتسليم المشروع رسمياً',
            ku: 'پشکنینی کۆتایی و واژۆکردنی نێوان لایەنەکان'
          },
          dueDate: completionDate,
          weight: 30,
          status: 'Pending',
          progress: 0,
        }
      ],
      performanceScore: 100, // Starts pristine
    };

    // 1. Save standard contract
    ContractRegistry.createContract(newContract, actor);

    // 2. Adjust Vendor stats
    const vendors = ProcurementRegistry.getVendors();
    const vIndex = vendors.findIndex(v => v.id === bid.vendorId);
    if (vIndex !== -1) {
      vendors[vIndex].activeContracts += 1;
      vendors[vIndex].totalContractValueUSD += newContract.valueUSD;
      ProcurementRegistry.saveVendors(vendors);
    }

    // 3. Mark tender as Closed in Tender Registry
    tender.status = 'Closed';
    ProcurementRegistry.saveTenders(tenders);

    ProcurementRegistry.logToLedger(
      'CONTRACT_EXECUTED',
      'CONTRACT',
      id,
      actor,
      { tenderId, bidId, contractValueUSD: newContract.valueUSD }
    );

    return newContract;
  }

  /**
   * Simulates sovereign funds dispatching & audits
   */
  static disburseMilestoneFunds(contractId: string, milestoneId: string, actor: string): void {
    const contracts = ProcurementRegistry.getContracts();
    const index = contracts.findIndex(c => c.id === contractId);
    if (index !== -1) {
      const contract = contracts[index];
      const milestone = contract.milestones.find(m => m.id === milestoneId);
      if (milestone) {
        if (milestone.status === 'Approved') return; // Already paid

        // Mark progress 100% and Approved
        ContractRegistry.updateMilestoneProgress(contractId, milestoneId, 100, 'Approved', actor);
      }
    }
  }
}
