import { 
  CustomsDeclaration, CustomsClearanceStatus, CustomsRegime, RevenueLog 
} from '../../../shared/customs/CustomsTypes';
import { TariffCalculationEngine, TariffInput } from '../../../shared/customs/TariffCalculationEngine';
import { FederalCustomsAuditEngine } from './CustomsAuditEngine';
import { FederalCustomsRevenueLedger } from './CustomsRevenueLedger';

export class FederalCustomsDeclarationEngine {
  private static declarations: CustomsDeclaration[] = [
    {
      id: 'DECL-FED-10020',
      hsCode: '87032330', // passenger motor vehicle
      regime: 'IMPORT',
      importerName: 'Al-Rafidain Heavy Motor Cars Ltd',
      exporterName: 'German Automobile Export Hamburg',
      declaredValueUSD: 85000,
      weightTons: 12.4,
      description: 'Shipment of five premium SUVs with luxury accessories.',
      jurisdiction: 'federal',
      status: 'released', // cleared and released
      tariffDetail: TariffCalculationEngine.calculateTariff({
        hsCode: '87032330',
        declaredValueUSD: 85000,
        weightTons: 12.4
      }, 'federal'),
      submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      lastUpdatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      assignedInspector: 'Federal Customs Inspector Haidar',
      manifestIdField: 'MNF-UMMQASR-90112'
    },
    {
      id: 'DECL-FED-10023',
      hsCode: '30049000', // Pharmaceuticals
      regime: 'IMPORT',
      importerName: 'Baghdad Pharma Wholesale Group',
      exporterName: 'Swiss Pharma Labs Basel',
      declaredValueUSD: 120000,
      weightTons: 2.1,
      description: 'Critical pediatric therapeutic liquid antibiotics and vaccine packs.',
      jurisdiction: 'federal',
      status: 'inspection',
      tariffDetail: TariffCalculationEngine.calculateTariff({
        hsCode: '30049000',
        declaredValueUSD: 120000,
        weightTons: 2.1,
        isSpecialExemption: true // MOH priority clearance
      }, 'federal'),
      submittedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      lastUpdatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      assignedInspector: 'Senior Official Al-Zubaidi',
      manifestIdField: 'MNF-WASSIT-2234'
    }
  ];

  public static createDeclaration(data: {
    hsCode: string;
    regime: CustomsRegime;
    importerName: string;
    exporterName: string;
    declaredValueUSD: number;
    weightTons: number;
    description: string;
    isExempt?: boolean;
    manifestId?: string;
  }, actor: string): CustomsDeclaration {
    
    // Calculate tariff dynamically
    const tariffResult = TariffCalculationEngine.calculateTariff({
      hsCode: data.hsCode,
      declaredValueUSD: data.declaredValueUSD,
      weightTons: data.weightTons,
      isSpecialExemption: data.isExempt
    }, 'federal');

    const newDecl: CustomsDeclaration = {
      id: `DECL-FED-${Math.floor(10000 + Math.random() * 90000)}`,
      hsCode: data.hsCode,
      regime: data.regime,
      importerName: data.importerName,
      exporterName: data.exporterName,
      declaredValueUSD: data.declaredValueUSD,
      weightTons: data.weightTons,
      description: data.description,
      jurisdiction: 'federal',
      status: 'pending',
      tariffDetail: tariffResult,
      submittedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      manifestIdField: data.manifestId
    };

    this.declarations.unshift(newDecl);

    // Initial audit trace
    FederalCustomsAuditEngine.appendEvent(
      newDecl.id,
      actor,
      `Formally filed new Federal ${data.regime} declaration for ${data.importerName}. Duty rate assessed: ${tariffResult.effectiveRate}%.`,
      'pending',
      'pending'
    );

    return newDecl;
  }

  public static updateStatus(
    id: string,
    newStatus: CustomsClearanceStatus,
    actor: string,
    notes?: string
  ): CustomsDeclaration | undefined {
    const decl = this.declarations.find(d => d.id === id);
    if (!decl) return undefined;

    const previousStatus = decl.status;
    decl.status = newStatus;
    decl.lastUpdatedAt = new Date().toISOString();
    if (notes) decl.notes = notes;

    // Log the change in the Audit Engine
    FederalCustomsAuditEngine.appendEvent(
      decl.id,
      actor,
      `Transitioned declaration status from [${previousStatus}] to [${newStatus}].`,
      previousStatus,
      newStatus,
      notes
    );

    // If approved or released, register state in revenue ledger if not registered yet
    if ((newStatus === 'approved' || newStatus === 'released') && previousStatus !== 'approved' && previousStatus !== 'released') {
      FederalCustomsRevenueLedger.recordRevenue({
        declarationId: decl.id,
        baseDutyUSD: decl.tariffDetail.baseDutyUSD,
        borderServiceFeeUSD: decl.tariffDetail.borderServiceFeeUSD,
        inspectionFeeUSD: decl.tariffDetail.inspectionFeeUSD,
        penaltyFeeUSD: decl.tariffDetail.penaltyFeeUSD,
        totalCollectedUSD: decl.tariffDetail.totalTariffUSD
      });
    }

    return decl;
  }

  public static getDeclaration(id: string): CustomsDeclaration | undefined {
    return this.declarations.find(d => d.id === id);
  }

  public static getAllDeclarations(): CustomsDeclaration[] {
    return [...this.declarations];
  }
}
