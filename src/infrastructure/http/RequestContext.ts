export interface RequestContext {
  requestId: string;
  timestamp: string;
  userId?: string;
  headers: Record<string, string>;
}
