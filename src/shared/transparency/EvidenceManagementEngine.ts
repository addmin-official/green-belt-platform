import { AuditEvidenceEngine } from './AuditEvidenceEngine';
import { AuditEvidence } from './AuditTypes';

export class EvidenceManagementEngine {
  public static fetchFiles(caseId: string): AuditEvidence[] {
    return AuditEvidenceEngine.getEvidenceForCase(caseId);
  }

  public static addFile(
    caseId: string,
    title: string,
    description: string,
    type: 'DOCUMENT' | 'HASH_PROOF' | 'IMAGE' | 'LOG_DUMP',
    actor: string
  ): AuditEvidence {
    return AuditEvidenceEngine.registerEvidence(caseId, actor, type, title, description);
  }
}
