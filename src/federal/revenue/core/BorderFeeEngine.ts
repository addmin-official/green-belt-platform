import { BorderTrafficEngine } from '../../../shared/border/BorderTrafficEngine';
import { BorderTrafficRecord } from '../../../shared/border/BorderTypes';

export interface BorderFeeCalculation {
  recordId: string;
  gateId: string;
  trafficType: 'VEHICLE' | 'CARGO' | 'PASSENGER';
  expectedFeeUSD: number;
  actualPaidUSD: number;
  discrepancyUSD: number;
}

export class FederalBorderFeeEngine {
  // Compute expected fee based on standard pricing rules
  public static calculateExpectedFee(record: BorderTrafficRecord): number {
    let fee = 0;

    // 1. Passenger Based Rules
    if (record.trafficType === 'PASSENGER') {
      const isForeign = record.passengerNationality && record.passengerNationality !== 'IQ';
      fee += isForeign ? 25 : 10; // $25 for foreign, $10 for domestics
    }

    // 2. Vehicle Based Rules
    if (record.trafficType === 'VEHICLE') {
      if (record.vehicleType === 'CAR') fee += 30;
      else if (record.vehicleType === 'BUS') fee += 80;
      else if (record.vehicleType === 'TRUCK') fee += 160;
      
      // Weight penalty if cargo values exist
      if (record.cargoWeightKg) {
        fee += Math.round((record.cargoWeightKg / 1000) * 15); // $15 per ton
      }
    }

    // 3. Cargo Surcharges
    if (record.trafficType === 'CARGO') {
      if (record.cargoDeclarationValueUSD) {
        fee += Math.round(record.cargoDeclarationValueUSD * 0.005); // 0.5% clearance fee
      }
      if (record.cargoWeightKg) {
        fee += Math.round((record.cargoWeightKg / 1000) * 20); // $20 per ton
      }
    }

    return fee;
  }

  public static evaluateBorderFees(): BorderFeeCalculation[] {
    const records = BorderTrafficEngine.getTraffic().filter(
      r => r.jurisdiction === 'FEDERAL'
    );

    return records.map(r => {
      const expectedFeeUSD = this.calculateExpectedFee(r);
      // Let's assume paid amount is either full if clear or partially leaking/unpaid if risk is high
      // To simulate real leakage: if riskScore is high, paid fee might be lower (simulating bribe or evasion)
      let actualPaidUSD = expectedFeeUSD;
      if (r.riskScore && r.riskScore > 25) {
        actualPaidUSD = Math.round(expectedFeeUSD * (1 - (r.riskScore / 100)));
      }

      return {
        recordId: r.id,
        gateId: r.gateId,
        trafficType: r.trafficType,
        expectedFeeUSD,
        actualPaidUSD,
        discrepancyUSD: expectedFeeUSD - actualPaidUSD
      };
    });
  }

  public static getTotals() {
    const list = this.evaluateBorderFees();
    return list.reduce((acc, curr) => {
      acc.totalExpectedUSD += curr.expectedFeeUSD;
      acc.totalCollectedUSD += curr.actualPaidUSD;
      acc.totalDiscrepancyUSD += curr.discrepancyUSD;
      return acc;
    }, { totalExpectedUSD: 0, totalCollectedUSD: 0, totalDiscrepancyUSD: 0 });
  }
}
