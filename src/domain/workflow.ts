import type { BatchStage, CompostBatch } from './models';

const allowedTransitions: Record<BatchStage, readonly BatchStage[]> = {
  active: ['pfrp_met', 'rework', 'rejected'],
  pfrp_met: ['curing', 'rework', 'rejected'],
  curing: ['ready_for_sampling', 'rework', 'rejected'],
  ready_for_sampling: ['lab_pending', 'rework', 'rejected'],
  lab_pending: ['qa_passed', 'rework', 'rejected'],
  qa_passed: [],
  rework: ['active', 'curing', 'rejected'],
  rejected: [],
};

export function canTransitionBatch(
  current: BatchStage,
  next: BatchStage,
): boolean {
  return allowedTransitions[current].includes(next);
}

export function assertBatchTransition(
  batch: CompostBatch,
  next: BatchStage,
): void {
  if (!canTransitionBatch(batch.stage, next)) {
    throw new Error(`Invalid batch transition: ${batch.stage} -> ${next}`);
  }

  if (next === 'qa_passed' && (!batch.labResultId || !batch.qaReleaseId)) {
    throw new Error('A batch cannot pass QA without both lab result and QA release.');
  }
}

export function isMarketReady(batch: CompostBatch): boolean {
  return batch.stage === 'qa_passed'
    && Boolean(batch.labResultId)
    && Boolean(batch.qaReleaseId);
}
