export const COLLECTIONS = {
  users: 'users',
  restaurants: 'restaurants',
  collectionEvents: 'collectionEvents',
  manifests: 'manifests',
  facilityReceipts: 'facilityReceipts',
  compostBatches: 'compostBatches',
  processReadings: 'processReadings',
  samples: 'samples',
  laboratoryResults: 'laboratoryResults',
  qaReleases: 'qaReleases',
  auditLogs: 'auditLogs',
  incidents: 'incidents',
  complaints: 'complaints',
  costRecords: 'costRecords',
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
