import { RevenueLeakageAnalysisEngine } from './RevenueLeakageAnalysisEngine';
import { Jurisdiction } from './AuditTypes';

export interface MismatchRecord {
  gatewayId: string;
  traderName: string;
  declaredAtGatewayUSD: number;
  recordedInCargoLedgerUSD: number;
  discrepancyUSD: number;
  discrepancyPercent: number;
}

export class TransactionMismatchEngine {
  public static analyzeMismatches(jurisdiction: Jurisdiction): MismatchRecord[] {
    // Generate some simulated real discrepancies based on current state parameters
    if (jurisdiction === 'federal') {
      return [
        {
          gatewayId: 'COR-UQ',
          traderName: 'Mesopotamian Electronics',
          declaredAtGatewayUSD: 240000,
          recordedInCargoLedgerUSD: 410000,
          discrepancyUSD: 170000,
          discrepancyPercent: 70.8
        },
        {
          gatewayId: 'COR-SF',
          traderName: 'Ur Freight Systems',
          declaredAtGatewayUSD: 150000,
          recordedInCargoLedgerUSD: 210000,
          discrepancyUSD: 60000,
          discrepancyPercent: 40.0
        }
      ];
    } else if (jurisdiction === 'krg') {
      return [
        {
          gatewayId: 'COR-IK',
          traderName: 'Zagros Logistics Erbil',
          declaredAtGatewayUSD: 400000,
          recordedInCargoLedgerUSD: 620000,
          discrepancyUSD: 220000,
          discrepancyPercent: 55.0
        }
      ];
    } else {
      return [
        {
          gatewayId: 'COR-UQ',
          traderName: 'Mesopotamian Electronics',
          declaredAtGatewayUSD: 240000,
          recordedInCargoLedgerUSD: 410000,
          discrepancyUSD: 170000,
          discrepancyPercent: 70.8
        },
        {
          gatewayId: 'COR-IK',
          traderName: 'Zagros Logistics Erbil',
          declaredAtGatewayUSD: 400000,
          recordedInCargoLedgerUSD: 620000,
          discrepancyUSD: 220000,
          discrepancyPercent: 55.0
        }
      ];
    }
  }

  public static runAutomaticAudit(jurisdiction: Jurisdiction): void {
    const list = this.analyzeMismatches(jurisdiction);
    list.forEach(item => {
      if (item.discrepancyUSD > 100000) {
        RevenueLeakageAnalysisEngine.createLeakageAlert(
          `Automated Mismatch Alert: ${item.traderName} at ${item.gatewayId}`,
          jurisdiction,
          item.recordedInCargoLedgerUSD,
          item.declaredAtGatewayUSD,
          'TARIFF_UNDERVALUATION',
          item.gatewayId
        );
      }
    });
  }
}
