import { TradeDeclaration, DeclarationStatus, Jurisdiction } from './TradeTypes';
import { TradeComplianceEngine } from './TradeComplianceEngine';
import { TradeRiskEngine } from './TradeRiskEngine';
import { TradeAuditEngine } from './TradeAuditEngine';

export class ImportManagementEngine {
  private static declarations: TradeDeclaration[] = [
    // Pre-filled Imports
    {
      id: 'TDEC-FED-IMP-8001',
      partnerName: 'Novavaxis Biotech Zug',
      regime: 'IMPORT',
      corridorId: 'COR-BGW',
      commodity: TradeComplianceEngine.getCommodityByCode('30049000'), // Pharma
      declaredValueUSD: 850000,
      weightTons: 1.8,
      status: 'RELEASED',
      riskScore: 12,
      complianceScore: 100,
      submittedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      lastUpdatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      jurisdiction: 'federal',
      assignedInspector: 'Federal Agent Al-Hassan',
      reconciliationHash: 'reconciliation_hash_fed_8001'
    },
    {
      id: 'TDEC-KRG-IMP-9002',
      partnerName: 'Sinotech Industrial Group',
      regime: 'IMPORT',
      corridorId: 'COR-IK',
      commodity: TradeComplianceEngine.getCommodityByCode('85176200'), // Telecom
      declaredValueUSD: 1250000,
      weightTons: 15.4,
      status: 'RELEASED',
      riskScore: 35,
      complianceScore: 100,
      submittedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      lastUpdatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      jurisdiction: 'krg',
      assignedInspector: 'Director KRG-Zebari',
      reconciliationHash: 'reconciliation_hash_krg_9002'
    },
    {
      id: 'TDEC-KRG-IMP-9004',
      partnerName: 'Quds Freight Forwarders',
      regime: 'IMPORT',
      corridorId: 'COR-PK',
      commodity: TradeComplianceEngine.getCommodityByCode('38249992'), // toxic chemical precursor
      declaredValueUSD: 140000,
      weightTons: 8.5,
      status: 'TRANSIT_HOLD',
      riskScore: 92,
      complianceScore: 30,
      submittedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      lastUpdatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      jurisdiction: 'krg',
      assignedInspector: 'Border Officer Sherwani',
      reconciliationHash: 'reconciliation_hash_krg_9004'
    },
    {
      id: 'TDEC-FED-IMP-8005',
      partnerName: 'Anatolia Black Sea Logistics',
      regime: 'IMPORT',
      corridorId: 'COR-UQ',
      commodity: TradeComplianceEngine.getCommodityByCode('36020000'), // explosive
      declaredValueUSD: 350000,
      weightTons: 12.0,
      status: 'INSPECTING',
      riskScore: 88,
      complianceScore: 50,
      submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      lastUpdatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      jurisdiction: 'federal',
      assignedInspector: 'Iraqi Navy Patrol Officer Jassim',
      reconciliationHash: 'reconciliation_hash_fed_8005'
    }
  ];

  public static getDeclarationsByJurisdiction(j: Jurisdiction): TradeDeclaration[] {
    return this.declarations.filter(d => d.jurisdiction === j);
  }

  public static getDeclaration(id: string): TradeDeclaration | undefined {
    return this.declarations.find(d => d.id === id);
  }

  public static registerImport(data: {
    partnerName: string;
    corridorId: string;
    hsCode: string;
    declaredValueUSD: number;
    weightTons: number;
    jurisdiction: Jurisdiction;
    actor: string;
  }): TradeDeclaration {
    const commodity = TradeComplianceEngine.getCommodityByCode(data.hsCode);
    const code = data.jurisdiction === 'federal' ? 'FED' : 'KRG';
    const id = `TDEC-${code}-IMP-${Math.floor(10000 + Math.random() * 89999)}`;

    // Compliance assessment
    const complianceResult = TradeComplianceEngine.runComplianceCheck({
      partnerName: data.partnerName,
      hsCode: data.hsCode,
      declaredValueUSD: data.declaredValueUSD,
      weightTons: data.weightTons
    });

    // Risk assessment
    const riskResult = TradeRiskEngine.calculateRisk({
      partnerName: data.partnerName,
      hsCode: data.hsCode,
      declaredValueUSD: data.declaredValueUSD,
      weightTons: data.weightTons,
      corridorId: data.corridorId
    });

    const status: DeclarationStatus = riskResult.riskScore > 75 || !complianceResult.isApproved ? 'TRANSIT_HOLD' : 'FILED';

    const newDecl: TradeDeclaration = {
      id,
      partnerName: data.partnerName,
      regime: 'IMPORT',
      corridorId: data.corridorId,
      commodity,
      declaredValueUSD: data.declaredValueUSD,
      weightTons: data.weightTons,
      status,
      riskScore: riskResult.riskScore,
      complianceScore: complianceResult.complianceScore,
      submittedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      jurisdiction: data.jurisdiction,
      reconciliationHash: `joint_recon_proof_${Math.random().toString(36).substring(2, 8)}`
    };

    this.declarations.unshift(newDecl);

    // Audit trace
    TradeAuditEngine.logAction(
      data.actor,
      'IMPORT_REGISTRATION',
      newDecl.id,
      'DECLARATION',
      `Filed import declaration of ${commodity.name} via corridor ${data.corridorId}. Risk: ${riskResult.riskScore}%. Compliance: ${complianceResult.complianceScore}%.`
    );

    return newDecl;
  }

  public static updateImportStatus(id: string, status: DeclarationStatus, actor: string): boolean {
    const d = this.declarations.find(decl => decl.id === id);
    if (d) {
      d.status = status;
      d.lastUpdatedAt = new Date().toISOString();
      TradeAuditEngine.logAction(
        actor,
        'IMPORT_STATUS_UPDATE',
        d.id,
        'DECLARATION',
        `Import declaration status manually transitioned to ${status}.`
      );
      return true;
    }
    return false;
  }
}
