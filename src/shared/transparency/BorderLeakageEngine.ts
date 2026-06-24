import { Jurisdiction } from './AuditTypes';

export interface BorderTransitAnomaly {
  transitId: string;
  gateId: string;
  manifestWeightTons: number;
  scaleWeightTons: number;
  varianceTons: number;
  anomalyType: 'WEIGHBRIDGE_MISMATCH' | 'UNLOGGED_CROSSED' | 'STAMP_FORGERY';
  estimatedUndeclaredValueUSD: number;
  timestamp: string;
}

export class BorderLeakageEngine {
  public static getBorderTransitAnomalies(jurisdiction: Jurisdiction): BorderTransitAnomaly[] {
    if (jurisdiction === 'federal') {
      return [
        {
          transitId: 'TR-FED-952',
          gateId: 'Trebil Crossing West',
          manifestWeightTons: 15.4,
          scaleWeightTons: 22.1,
          varianceTons: 6.7, // Heavy unexplained load
          anomalyType: 'WEIGHBRIDGE_MISMATCH',
          estimatedUndeclaredValueUSD: 85000,
          timestamp: '2026-06-08T18:40:00Z'
        },
        {
          transitId: 'TR-FED-991',
          gateId: 'Safwan Crossing South',
          manifestWeightTons: 0,
          scaleWeightTons: 11.2,
          varianceTons: 11.2,
          anomalyType: 'UNLOGGED_CROSSED',
          estimatedUndeclaredValueUSD: 140000,
          timestamp: '2026-06-09T03:15:00Z'
        }
      ];
    } else {
      return [
        {
          transitId: 'TR-KRG-403',
          gateId: 'Ibrahim Khalil Gate North',
          manifestWeightTons: 18.2,
          scaleWeightTons: 25.8,
          varianceTons: 7.6,
          anomalyType: 'WEIGHBRIDGE_MISMATCH',
          estimatedUndeclaredValueUSD: 95000,
          timestamp: '2026-06-08T22:12:00Z'
        },
        {
          transitId: 'TR-KRG-441',
          gateId: 'Parwezkhan Border Desk',
          manifestWeightTons: 5.0,
          scaleWeightTons: 9.8,
          varianceTons: 4.8,
          anomalyType: 'STAMP_FORGERY',
          estimatedUndeclaredValueUSD: 45000,
          timestamp: '2026-06-09T06:50:00Z'
        }
      ];
    }
  }
}
