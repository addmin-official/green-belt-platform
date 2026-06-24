import { ProcurementRegistry } from './ProcurementRegistry';
import { Contract } from './ProcurementTypes';

export class ContractRegistry {
  static getContracts(): Contract[] {
    return ProcurementRegistry.getContracts();
  }

  static getContractById(id: string): Contract | undefined {
    return this.getContracts().find(c => c.id === id);
  }

  static createContract(contract: Contract, actor: string): void {
    const contracts = this.getContracts();
    contracts.push(contract);
    ProcurementRegistry.saveContracts(contracts);
    
    ProcurementRegistry.logToLedger(
      'CONTRACT_CREATED',
      'CONTRACT',
      contract.id,
      actor,
      contract
    );
  }

  static updateContractStatus(id: string, status: Contract['status'], actor: string): void {
    const contracts = this.getContracts();
    const index = contracts.findIndex(c => c.id === id);
    if (index !== -1) {
      contracts[index].status = status;
      ProcurementRegistry.saveContracts(contracts);

      ProcurementRegistry.logToLedger(
        'CONTRACT_STATUS_UPDATED',
        'CONTRACT',
        id,
        actor,
        { status }
      );
    }
  }

  static updateMilestoneProgress(
    contractId: string,
    milestoneId: string,
    progress: number,
    status: Contract['milestones'][0]['status'],
    actor: string
  ): void {
    const contracts = this.getContracts();
    const cIndex = contracts.findIndex(c => c.id === contractId);
    if (cIndex !== -1) {
      const contract = contracts[cIndex];
      const mIndex = contract.milestones.findIndex(m => m.id === milestoneId);
      if (mIndex !== -1) {
        const milestone = contract.milestones[mIndex];
        const oldProgress = milestone.progress;
        milestone.progress = progress;
        milestone.status = status;

        // If newly approved milestone, add to spent budget based on its weight
        if (status === 'Approved' && progress === 100 && oldProgress < 100) {
          const addedSpent = contract.valueUSD * (milestone.weight / 100);
          contract.spentUSD = Math.min(contract.valueUSD, contract.spentUSD + addedSpent);
        }

        // recalculate contract performance score based on milestone completion and statuses
        const totalMilestones = contract.milestones.length;
        const totalProgress = contract.milestones.reduce((acc, m) => acc + m.progress, 0);
        const avgProgress = totalProgress / totalMilestones;
        const delayedCount = contract.milestones.filter(m => m.status === 'Delayed').length;
        
        // Base score affected by progress and heavily penalized by delays
        const calculatedPerformance = Math.max(0, Math.min(100, Math.round(avgProgress - (delayedCount * 15))));
        contract.performanceScore = calculatedPerformance;

        contracts[cIndex] = contract;
        ProcurementRegistry.saveContracts(contracts);

        // Update vendor statistics too!
        const vendors = ProcurementRegistry.getVendors();
        const vIndex = vendors.findIndex(v => v.id === contract.vendorId);
        if (vIndex !== -1) {
          // calculate average compliance and performance of the vendor
          const vendorContracts = contracts.filter(c => c.vendorId === contract.vendorId);
          const totalPerf = vendorContracts.reduce((sum, c) => sum + c.performanceScore, 0);
          vendors[vIndex].complianceRating = Math.round(totalPerf / vendorContracts.length);
          ProcurementRegistry.saveVendors(vendors);
        }

        ProcurementRegistry.logToLedger(
          'MILESTONE_UPDATED',
          'CONTRACT',
          contractId,
          actor,
          { milestoneId, progress, status, spentUSD: contract.spentUSD, performanceScore: contract.performanceScore }
        );
      }
    }
  }
}
