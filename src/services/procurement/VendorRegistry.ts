import { ProcurementRegistry } from './ProcurementRegistry';
import { Vendor, Jurisdiction } from './ProcurementTypes';

export class VendorRegistry {
  static getVendors(): Vendor[] {
    return ProcurementRegistry.getVendors();
  }

  static getVendorById(id: string): Vendor | undefined {
    return this.getVendors().find(v => v.id === id);
  }

  static registerVendor(vendor: Omit<Vendor, 'id' | 'supplierRiskScore' | 'complianceRating' | 'completedContracts' | 'activeContracts' | 'totalContractValueUSD'>, actor: string): Vendor {
    const vendors = this.getVendors();
    const id = `vn-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const newVendor: Vendor = {
      ...vendor,
      id,
      supplierRiskScore: this.calculateRiskScore(vendor.qualificationScore, 100, 0, 'Approved'),
      complianceRating: 100,
      completedContracts: 0,
      activeContracts: 0,
      totalContractValueUSD: 0,
    };

    vendors.push(newVendor);
    ProcurementRegistry.saveVendors(vendors);

    ProcurementRegistry.logToLedger(
      'VENDOR_REGISTERED',
      'VENDOR',
      id,
      actor,
      newVendor
    );

    return newVendor;
  }

  static updateVendorStatus(id: string, status: Vendor['status'], actor: string): void {
    const vendors = this.getVendors();
    const index = vendors.findIndex(v => v.id === id);
    if (index !== -1) {
      vendors[index].status = status;
      vendors[index].supplierRiskScore = this.calculateRiskScore(
        vendors[index].qualificationScore,
        vendors[index].complianceRating,
        vendors[index].activeContracts,
        status
      );
      ProcurementRegistry.saveVendors(vendors);

      ProcurementRegistry.logToLedger(
        'VENDOR_STATUS_UPDATED',
        'VENDOR',
        id,
        actor,
        { status, newRiskScore: vendors[index].supplierRiskScore }
      );
    }
  }

  static auditVendor(id: string, qualificationScore: number, complianceRating: number, actor: string): void {
    const vendors = this.getVendors();
    const index = vendors.findIndex(v => v.id === id);
    if (index !== -1) {
      vendors[index].qualificationScore = qualificationScore;
      vendors[index].complianceRating = complianceRating;
      vendors[index].lastAudited = new Date().toISOString().split('T')[0];
      vendors[index].supplierRiskScore = this.calculateRiskScore(
        qualificationScore,
        complianceRating,
        vendors[index].activeContracts,
        vendors[index].status
      );
      
      // Auto blacklist if compliance gets too low
      if (complianceRating < 40 && vendors[index].status !== 'Blacklisted') {
        vendors[index].status = 'Blacklisted';
        ProcurementRegistry.logToLedger('VENDOR_AUTO_BLACKLISTED', 'VENDOR', id, 'ComplianceEngine', { complianceRating });
      }

      ProcurementRegistry.saveVendors(vendors);

      ProcurementRegistry.logToLedger(
        'VENDOR_AUDITED',
        'VENDOR',
        id,
        actor,
        { qualificationScore, complianceRating, newRiskScore: vendors[index].supplierRiskScore, status: vendors[index].status }
      );
    }
  }

  static calculateRiskScore(
    qualification: number,
    compliance: number,
    activeContracts: number,
    status: Vendor['status']
  ): number {
    if (status === 'Blacklisted') return 100;
    if (status === 'Suspended') return 85;

    // Standard formula: penalize low compliance, low qualification, and high active contract saturation
    const baseRisk = 100 - (compliance * 0.6 + qualification * 0.4);
    const overloadPenalty = activeContracts > 3 ? (activeContracts - 3) * 10 : 0;
    const finalRisk = Math.round(baseRisk + overloadPenalty);

    return Math.max(0, Math.min(99, finalRisk));
  }
}
