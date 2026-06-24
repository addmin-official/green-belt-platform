import { TradeDeclaration, DeclarationStatus, Jurisdiction } from './TradeTypes';
import { TradeComplianceEngine } from './TradeComplianceEngine';
import { TradeRiskEngine } from './TradeRiskEngine';
import { TradeAuditEngine } from './TradeAuditEngine';

export class ExportManagementEngine {
  private static declarations: TradeDeclaration[] = [
    // Pre-filled Exports
    {
      id: 'TDEC-FED-EXP-7001',
      partnerName: 'Port of Hamburg',
      regime: 'EXPORT',
      corridorId: 'COR-UQ',
      commodity: TradeComplianceEngine.getCommodityByCode('27101921'), // Refined Diesel
      declaredValueUSD: 5400000,
      weightTons: 6200,
      status: 'RELEASED',
      riskScore: 22,
      complianceScore: 100,
      submittedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
      lastUpdatedAt: new Date(Date.now() - 3600000 * 36).toISOString(),
      jurisdiction: 'federal',
      assignedInspector: 'Basra Marine Inspector Kadhim',
      reconciliationHash: 'reconciliation_hash_fed_7001'
    },
    {
      id: 'TDEC-KRG-EXP-6002',
      partnerName: 'Port of Rotterdam',
      regime: 'EXPORT',
      corridorId: 'COR-IK',
      commodity: TradeComplianceEngine.getCommodityByCode('10011900'), // Wheat
      declaredValueUSD: 110000,
      weightTons: 350,
      status: 'RELEASED',
      riskScore: 15,
      complianceScore: 100,
      submittedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
      lastUpdatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      jurisdiction: 'krg',
      assignedInspector: 'Erbil Trade Controller Barzani',
      reconciliationHash: 'reconciliation_hash_krg_6002'
    },
    {
      id: 'TDEC-FED-EXP-7003',
      partnerName: 'Varamin Agri Export Co.',
      regime: 'EXPORT',
      corridorId: 'COR-PK',
      commodity: TradeComplianceEngine.getCommodityByCode('10011900'), // Wheat
      declaredValueUSD: 95000,
      weightTons: 280,
      status: 'FILED',
      riskScore: 45,
      complianceScore: 100,
      submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      lastUpdatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      jurisdiction: 'federal',
      assignedInspector: 'Border Liaison Officer Al-Dulaymi',
      reconciliationHash: 'reconciliation_hash_fed_7003'
    }
  ];

  public static getDeclarationsByJurisdiction(j: Jurisdiction): TradeDeclaration[] {
    return this.declarations.filter(d => d.jurisdiction === j);
  }

  public static getDeclaration(id: string): TradeDeclaration | undefined {
    return this.declarations.find(d => d.id === id);
  }

  /**
   * Registers a new export and applies strategic export control logic
   */
  public static registerExport(data: {
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
    const id = `TDEC-${code}-EXP-${Math.floor(10000 + Math.random() * 89999)}`;

    // Strategic goods verification (petroleum and heavy strategic resources)
    const isStrategicGood = commodity.category === 'PETROLEUM' || commodity.category === 'EXPLOSIVES' || commodity.isDualUse;

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

    let computedRisk = riskResult.riskScore;
    if (isStrategicGood) {
      computedRisk = Math.min(100, computedRisk + 15); // Bump risk score due to strategic nature of the exported good
    }

    const status: DeclarationStatus = computedRisk > 75 || !complianceResult.isApproved ? 'TRANSIT_HOLD' : 'FILED';

    const newDecl: TradeDeclaration = {
      id,
      partnerName: data.partnerName,
      regime: 'EXPORT',
      corridorId: data.corridorId,
      commodity,
      declaredValueUSD: data.declaredValueUSD,
      weightTons: data.weightTons,
      status,
      riskScore: computedRisk,
      complianceScore: complianceResult.complianceScore,
      submittedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      jurisdiction: data.jurisdiction,
      reconciliationHash: `joint_recon_proof_exp_${Math.random().toString(36).substring(2, 8)}`
    };

    this.declarations.unshift(newDecl);

    // Audit trace
    TradeAuditEngine.logAction(
      data.actor,
      'EXPORT_REGISTRATION',
      newDecl.id,
      'DECLARATION',
      `Filed export declaration of ${commodity.name} to ${data.partnerName}. Strategic good: ${isStrategicGood ? 'YES' : 'NO'}. Assessed Risk: ${computedRisk}%.`
    );

    return newDecl;
  }

  public static updateExportStatus(id: string, status: DeclarationStatus, actor: string): boolean {
    const d = this.declarations.find(decl => decl.id === id);
    if (d) {
      d.status = status;
      d.lastUpdatedAt = new Date().toISOString();
      TradeAuditEngine.logAction(
        actor,
        'EXPORT_STATUS_UPDATE',
        d.id,
        'DECLARATION',
        `Export declaration status manually transitioned to ${status}.`
      );
      return true;
    }
    return false;
  }
}
