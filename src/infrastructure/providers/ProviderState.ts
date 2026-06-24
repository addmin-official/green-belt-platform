export type ProviderState = 
  | 'READY' 
  | 'NOT_CONFIGURED' 
  | 'UNAVAILABLE' 
  | 'MISCONFIGURED' 
  | 'SECURITY_BLOCKED' 
  | 'JURISDICTION_VIOLATION'
  | 'configured'
  | 'not_configured'
  | 'unavailable'
  | 'ready'
  | 'error';
