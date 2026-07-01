import { serverTimestamp } from 'firebase/firestore';

import type { AuditLogEntry } from '../domain/models';
import { COLLECTIONS } from './collections';
import { createRecord } from './firestoreRepository';

export type AuditInput = Omit<AuditLogEntry, 'id' | 'occurredAt'>;

export async function recordAuditEvent(input: AuditInput): Promise<string> {
  return createRecord(COLLECTIONS.auditLogs, {
    ...input,
    occurredAt: serverTimestamp(),
  });
}
