import { serverTimestamp } from 'firebase/firestore';

import type {
  CollectionEvent,
  CompostBatch,
  LaboratoryResult,
  QaRelease,
} from '../domain/models';
import { assertBatchTransition } from '../domain/workflow';
import { COLLECTIONS } from '../data/collections';
import {
  createRecord,
  getRecord,
  updateRecord,
} from '../data/firestoreRepository';
import { recordAuditEvent } from '../data/auditService';

export async function registerCollectionEvent(
  event: Omit<CollectionEvent, 'id' | 'createdAt' | 'updatedAt' | 'version'>,
): Promise<string> {
  if (event.weightKg <= 0) throw new Error('Collection weight must be greater than zero.');

  const id = await createRecord(COLLECTIONS.collectionEvents, {
    ...event,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    version: 1,
  });

  await recordAuditEvent({
    entityType: 'collectionEvent',
    entityId: id,
    action: 'create',
    actorId: event.createdBy,
    after: { restaurantId: event.restaurantId, weightKg: event.weightKg },
  });

  return id;
}

export async function transitionBatch(
  batchId: string,
  nextStage: CompostBatch['stage'],
  actorId: string,
  reasonCode?: string,
): Promise<void> {
  const batch = await getRecord<CompostBatch>(COLLECTIONS.compostBatches, batchId);
  if (!batch) throw new Error('Batch not found.');

  assertBatchTransition(batch, nextStage);

  await updateRecord(COLLECTIONS.compostBatches, batchId, {
    stage: nextStage,
    updatedBy: actorId,
    version: batch.version + 1,
  });

  await recordAuditEvent({
    entityType: 'compostBatch',
    entityId: batchId,
    action: 'status_change',
    actorId,
    reasonCode,
    before: { stage: batch.stage },
    after: { stage: nextStage },
  });
}

export async function attachLaboratoryResult(
  result: Omit<LaboratoryResult, 'id' | 'createdAt' | 'updatedAt' | 'version'>,
): Promise<string> {
  const id = await createRecord(COLLECTIONS.laboratoryResults, {
    ...result,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    version: 1,
  });

  await updateRecord(COLLECTIONS.compostBatches, result.batchId, {
    labResultId: id,
    updatedBy: result.createdBy,
  });

  return id;
}

export async function createQaRelease(
  release: Omit<QaRelease, 'id' | 'createdAt' | 'updatedAt' | 'version'>,
): Promise<string> {
  if (!release.locked) throw new Error('QA releases must be locked at creation.');

  const id = await createRecord(COLLECTIONS.qaReleases, {
    ...release,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    version: 1,
  });

  await updateRecord(COLLECTIONS.compostBatches, release.batchId, {
    qaReleaseId: id,
    updatedBy: release.releasedBy,
  });

  return id;
}
