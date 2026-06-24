export interface SecurityGateway {
  checkPermission(userId: string, action: string): Promise<boolean>;
}
