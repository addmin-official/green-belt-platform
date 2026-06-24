export type Language = 'en' | 'ar' | 'ku';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export * from '../../contracts/IdentityContract';
export * from '../../contracts/SecurityContract';
export * from '../../contracts/WorkflowContract';
export * from '../../contracts/AuditContract';
export * from '../../contracts/AIContract';
export * from '../../contracts/DataFabricContract';
