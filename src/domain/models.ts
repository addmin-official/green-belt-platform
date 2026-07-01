export type EntityId = string;
export type IsoDateTime = string;

export type RecordStatus = 'active' | 'inactive' | 'archived';
export type EvidenceState = 'draft' | 'verified' | 'rejected';

export interface AuditMetadata {
  createdAt: IsoDateTime;
  createdBy: EntityId;
  updatedAt: IsoDateTime;
  updatedBy: EntityId;
  version: number;
}

export interface Restaurant extends AuditMetadata {
  id: EntityId;
  name: string;
  region: string;
  contactEmail?: string;
  status: RecordStatus;
  sourceSeparationEnabled: boolean;
}

export interface CollectionEvent extends AuditMetadata {
  id: EntityId;
  restaurantId: EntityId;
  collectedAt: IsoDateTime;
  weightKg: number;
  contaminationPercent?: number;
  moisturePercent?: number;
  evidenceState: EvidenceState;
  manifestId?: EntityId;
}

export type BatchStage =
  | 'active'
  | 'pfrp_met'
  | 'curing'
  | 'ready_for_sampling'
  | 'lab_pending'
  | 'qa_passed'
  | 'rework'
  | 'rejected';

export interface CompostBatch extends AuditMetadata {
  id: EntityId;
  name: string;
  stage: BatchStage;
  inputWeightKg: number;
  startedAt: IsoDateTime;
  temperatureC?: number;
  moisturePercent?: number;
  labResultId?: EntityId;
  qaReleaseId?: EntityId;
}

export interface LaboratoryResult extends AuditMetadata {
  id: EntityId;
  batchId: EntityId;
  sampledAt: IsoDateTime;
  reportedAt?: IsoDateTime;
  passed: boolean;
  laboratoryName: string;
  certificateReference?: string;
}

export interface QaRelease extends AuditMetadata {
  id: EntityId;
  batchId: EntityId;
  releasedAt: IsoDateTime;
  releasedBy: EntityId;
  passed: boolean;
  locked: boolean;
}

export interface AuditLogEntry {
  id: EntityId;
  entityType: string;
  entityId: EntityId;
  action: 'create' | 'update' | 'status_change' | 'correction' | 'reject';
  actorId: EntityId;
  occurredAt: IsoDateTime;
  reasonCode?: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
}
