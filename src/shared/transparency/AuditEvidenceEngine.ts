import { AuditEvidence } from './AuditTypes';

export class AuditEvidenceEngine {
  private static evidenceRegistry: AuditEvidence[] = [
    {
      id: 'EVD-001',
      caseId: 'INV-001',
      registeredBy: 'Federal Ethics Inspector',
      registeredAt: '2026-06-08T11:00:00Z',
      evidenceType: 'DOCUMENT',
      title: 'Ibraham Khalil Customs Discrepancy Ledger Log',
      description: 'Discrepancies identified between declared computer system components and physical gateway scans.',
      secureHash: 'f49bda87ce91cd82dfbaef0287cf039abfecda821cdbe8fa'
    },
    {
      id: 'EVD-002',
      caseId: 'INV-002',
      registeredBy: 'KRG Audit Committee',
      registeredAt: '2026-06-08T15:20:00Z',
      evidenceType: 'HASH_PROOF',
      title: 'Undervalued Wheat Imports Contract Proof',
      description: 'Verified purchase contract showing grain weight under-reporting to bypass high cargo thresholds.',
      secureHash: '8cb3da921bcdafecdaee0293bfcaef291bcde02dfade0a22'
    }
  ];

  public static registerEvidence(
    caseId: string,
    registeredBy: string,
    evidenceType: 'DOCUMENT' | 'HASH_PROOF' | 'IMAGE' | 'LOG_DUMP',
    title: string,
    description: string
  ): AuditEvidence {
    const id = `EVD-${String(this.evidenceRegistry.length + 1).padStart(3, '0')}`;
    const registeredAt = new Date().toISOString();
    
    // Generate simulated cryptographic hash
    const secureHash = this.generateHash(id, title, registeredAt);

    const evidence: AuditEvidence = {
      id,
      caseId,
      registeredBy,
      registeredAt,
      evidenceType,
      title,
      description,
      secureHash
    };

    this.evidenceRegistry.push(evidence);
    return evidence;
  }

  public static getEvidenceForCase(caseId: string): AuditEvidence[] {
    return this.evidenceRegistry.filter(e => e.caseId === caseId);
  }

  private static generateHash(id: string, title: string, date: string): string {
    let hash = 901;
    const combinedStr = `${id}-${title}-${date}`;
    for (let i = 0; i < combinedStr.length; i++) {
      hash = (hash << 5) - hash + combinedStr.charCodeAt(i);
    }
    return Math.abs(hash).toString(16) + '48af21d8bcefda';
  }
}
