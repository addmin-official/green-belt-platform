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

export class KRGBorderFeeEngine {
  public static calculateExpectedFee(record: BorderTrafficRecord): number {
    let fee = 0;

    // 1. Regional Passenger Crossing Fee Rules
    if (record.trafficType === 'PASSENGER') {
      const isForeign = record.passengerNationality && record.passengerNationality !== 'IQ';
      fee += isForeign ? 20 : 8; // KRG local concession: $20 foreign, $8 domestics
    }

    // 2. Regional Vehicle Crossing Fee Rules
    if (record.trafficType === 'VEHICLE') {
      if (record.vehicleType === 'CAR') fee += 25;
      else if (record.vehicleType === 'BUS') fee += 75;
      else if (record.vehicleType === 'TRUCK') fee += 150;
      
      if (record.cargoWeightKg) {
        fee += Math.round((record.cargoWeightKg / 1000) * 12); // $12 per ton regional gate discount
      }
    }

    // 3. Regional Commercial Volume charges
    if (record.trafficType === 'CARGO') {
      if (record.cargoDeclarationValueUSD) {
        fee += Math.round(record.cargoDeclarationValueUSD * 0.004); // 0.4% baseline fee
      }
      if (record.cargoWeightKg) {
        fee += Math.round((record.cargoWeightKg / 1000) * 18); // $18 per ton
      }
    }

    return fee;
  }

  public static evaluateBorderFees(): BorderFeeCalculation[] {
    const records = BorderTrafficEngine.getTraffic().filter(
      r => r.jurisdiction === 'KRG'
    );

    return records.map(r => {
      const expectedFeeUSD = this.calculateExpectedFee(r);
      // Leakage simulation
      let actualPaidUSD = expectedFeeUSD;
      if (r.riskScore && r.riskScore > 20) {
        actualPaidUSD = Math.round(expectedFeeUSD * (1 - (r.riskScore / 110)));
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
