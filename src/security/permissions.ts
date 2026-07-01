export type PlatformRole =
  | 'admin'
  | 'operator'
  | 'collection_officer'
  | 'facility_operator'
  | 'qa_manager'
  | 'laboratory'
  | 'viewer';

export type Permission =
  | 'platform.read'
  | 'restaurant.manage'
  | 'collection.create'
  | 'manifest.manage'
  | 'facility.receive'
  | 'batch.manage'
  | 'sample.manage'
  | 'lab.submit'
  | 'qa.release'
  | 'audit.read'
  | 'user.manage';

const ROLE_PERMISSIONS: Record<PlatformRole, readonly Permission[]> = {
  admin: [
    'platform.read',
    'restaurant.manage',
    'collection.create',
    'manifest.manage',
    'facility.receive',
    'batch.manage',
    'sample.manage',
    'lab.submit',
    'qa.release',
    'audit.read',
    'user.manage',
  ],
  operator: [
    'platform.read',
    'restaurant.manage',
    'collection.create',
    'manifest.manage',
    'facility.receive',
    'batch.manage',
    'sample.manage',
    'audit.read',
  ],
  collection_officer: ['platform.read', 'collection.create', 'manifest.manage'],
  facility_operator: ['platform.read', 'facility.receive', 'batch.manage', 'sample.manage'],
  qa_manager: ['platform.read', 'sample.manage', 'qa.release', 'audit.read'],
  laboratory: ['platform.read', 'lab.submit'],
  viewer: ['platform.read'],
};

export function hasPermission(
  role: PlatformRole | null | undefined,
  permission: Permission,
): boolean {
  return role ? ROLE_PERMISSIONS[role].includes(permission) : false;
}

export function isPlatformRole(value: unknown): value is PlatformRole {
  return typeof value === 'string' && value in ROLE_PERMISSIONS;
}
