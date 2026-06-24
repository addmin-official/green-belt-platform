import { Jurisdiction } from './AuditTypes';

export interface CorrelatedPattern {
  id: string; // PAT-XXX
  patternName: string;
  contributingSectors: string[];
  reliabilityWeight: number; // 0-100
  correlationStrengthPercent: number; // 0-100
  verdict: string;
}

export class PatternCorrelationEngine {
  public static getCorrelatedPatterns(jurisdiction: Jurisdiction): CorrelatedPattern[] {
    if (jurisdiction === 'federal') {
      return [
        {
          id: 'PAT-001',
          patternName: 'Simultaneous Gate Scale Zero-Weight & Fast Clearance Track',
          contributingSectors: ['BORDER_CONTROL', 'CUSTOMS_ADMINISTRATION'],
          reliabilityWeight: 92,
          correlationStrengthPercent: 95.8,
          verdict: 'High probability of collusion allowing unchecked cargo pass.'
        }
      ];
    } else {
      return [
        {
          id: 'PAT-002',
          patternName: 'Repeated Trader Invoice Mismatch paired with Manual Override Logs',
          contributingSectors: ['REVENUE_BANKING', 'CUSTOMS_AUDITING'],
          reliabilityWeight: 85,
          correlationStrengthPercent: 89.2,
          verdict: 'Tariff classification manipulation via selective officer override.'
        }
      ];
    }
  }
}
