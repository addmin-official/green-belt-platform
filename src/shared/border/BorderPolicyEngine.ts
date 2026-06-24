import { BorderJurisdiction } from './BorderTypes';
import { BorderAuditEngine } from './BorderAuditEngine';

export interface RegulatoryPolicy {
  code: string;
  titleKurdish: string;
  jurisdiction: BorderJurisdiction;
  isActive: boolean;
  notes: string;
}

export class BorderPolicyEngine {
  private static policies: RegulatoryPolicy[] = [
    {
      code: 'POL-TAR-2026',
      titleKurdish: '| خشتەی تاریفەی گومرگی یەکگرتوو - بڕیاری ٢٠٢٦',
      jurisdiction: 'JOINT',
      isActive: true,
      notes: 'Unified customs tariff rates enforced cooperatively at all federal and regional checkpoints.'
    },
    {
      code: 'POL-AGR-KRG',
      titleKurdish: '| پرۆتۆکۆڵی پاراستنی بەرهەمی کشتوکاڵی ناوخۆیی',
      jurisdiction: 'KRG',
      isActive: true,
      notes: 'Seasonal import restrictions on specific agricultural goods to protect domestic farming.'
    },
    {
      code: 'POL-CHEM-BAN',
      titleKurdish: '| لیستی دەرمان و کەرەستە کیمیاوییە سنووردارکراوەکانی فیدراڵی',
      jurisdiction: 'FEDERAL',
      isActive: true,
      notes: 'Mandatory pre-approval certificates registered for dangerous chemical imports.'
    }
  ];

  public static getPolicies(): RegulatoryPolicy[] {
    return [...this.policies];
  }

  public static togglePolicy(code: string, actor: string): RegulatoryPolicy {
    const policy = this.policies.find(p => p.code === code);
    if (!policy) {
      throw new Error(`Regulatory policy ${code} not found.`);
    }

    policy.isActive = !policy.isActive;

    BorderAuditEngine.appendRecord(
      'TOGGLE_POLICY',
      actor,
      `Toggled regulatory policy ${code} to ${policy.isActive ? 'ACTIVE' : 'INACTIVE'}`,
      policy.jurisdiction,
      policy.jurisdiction === 'JOINT' ? 'JOINT' : policy.jurisdiction === 'KRG' ? 'KRG' : 'FEDERAL_IRAQ',
      'National Border Regulatory Agency'
    );

    return policy;
  }
}
