export interface PermissionProvider {
  hasPermission(permission: string): boolean;
}
