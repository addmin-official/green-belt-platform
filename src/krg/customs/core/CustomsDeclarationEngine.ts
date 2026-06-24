import { 
  CustomsDeclaration, CustomsClearanceStatus, CustomsRegime, RevenueLog 
} from '../../../shared/customs/CustomsTypes';
import { TariffCalculationEngine, TariffInput } from '../../../shared/customs/TariffCalculationEngine';
import { KRGCustomsAuditEngine } from './CustomsAuditEngine';
import { KRGCustomsRevenueLedger } from './CustomsRevenueLedger';

export class KRGCustomsDeclarationEngine {
  private static declarations: CustomsDeclaration[] = [
    {
      id: 'DECL-KRG-80021',
      hsCode: '84713000', // laptops
      regime: 'IMPORT',
      importerName: 'Hewler Premium Tech Distribution',
      exporterName: 'Silicon Logistics Dubai Outsource',
      declaredValueUSD: 54000,
      weightTons: 1.8,
      description: 'Importation of bulk corporate high-performance workstations.',
      jurisdiction: 'krg',
      status: 'approved',
      tariffDetail: TariffCalculationEngine.calculateTariff({
        hsCode: '84713000',
        declaredValueUSD: 54000,
        weightTons: 1.8
      }, 'krg'),
      submittedAt: new Date(Date.now() - 3600000 * 30).toISOString(),
      lastUpdatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      assignedInspector: 'KRG Inspector Hemen',
      manifestIdField: 'MNF-ERBIL-AIR-8012'
    },
    {
      id: 'DECL-KRG-80025',
      hsCode: '25232900', // portland cement
      regime: 'IMPORT',
      importerName: 'Soran Infrastructure Development Co',
      exporterName: 'Anatolia Limestone Mills Turkey',
      declaredValueUSD: 180000,
      weightTons: 640,
      description: 'Commercial cement supply cargo for regional beltway rehabilitation.',
      jurisdiction: 'krg',
      status: 'pending',
      tariffDetail: TariffCalculationEngine.calculateTariff({
        hsCode: '25232900',
        declaredValueUSD: 180000,
        weightTons: 640
      }, 'krg'),
      submittedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
      lastUpdatedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
      assignedInspector: 'Director General Hemen',
      manifestIdField: 'MNF-IBRAHIM-KK-401'
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
    
    // Calculate tariff dynamically using regional schedule
    const tariffResult = TariffCalculationEngine.calculateTariff({
      hsCode: data.hsCode,
      declaredValueUSD: data.declaredValueUSD,
      weightTons: data.weightTons,
      isSpecialExemption: data.isExempt
    }, 'krg');

    const newDecl: CustomsDeclaration = {
      id: `DECL-KRG-${Math.floor(80000 + Math.random() * 19999)}`,
      hsCode: data.hsCode,
      regime: data.regime,
      importerName: data.importerName,
      exporterName: data.exporterName,
      declaredValueUSD: data.declaredValueUSD,
      weightTons: data.weightTons,
      description: data.description,
      jurisdiction: 'krg',
      status: 'pending',
      tariffDetail: tariffResult,
      submittedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      manifestIdField: data.manifestId
    };

    this.declarations.unshift(newDecl);

    // Initial audit trace
    KRGCustomsAuditEngine.appendEvent(
      newDecl.id,
      actor,
      `Formally filed new KRG Regional ${data.regime} declaration for ${data.importerName}. Duty rate assessed: ${tariffResult.effectiveRate}%.`,
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
    KRGCustomsAuditEngine.appendEvent(
      decl.id,
      actor,
      `Transitioned regional declaration status from [${previousStatus}] to [${newStatus}].`,
      previousStatus,
      newStatus,
      notes
    );

    // If approved or released, register state in regional revenue ledger if not registered yet
    if ((newStatus === 'approved' || newStatus === 'released') && previousStatus !== 'approved' && previousStatus !== 'released') {
      KRGCustomsRevenueLedger.recordRevenue({
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
