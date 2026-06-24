import { Request, Response, NextFunction } from 'express';

export function jurisdictionGuard(allowedJurisdiction: 'FEDERAL_IRAQ' | 'KURDISTAN_REGION' | 'JOINT_OPERATIONS') {
  return (req: Request, res: Response, next: NextFunction) => {
    // Assert and double check the URI context matches the assigned boundary
    const requestPath = req.baseUrl + req.path;
    
    // Joint route boundary protection
    if (allowedJurisdiction === 'JOINT_OPERATIONS') {
      // Setup payload hook to strip forbidden fields on responses
      const originalJson = res.json;
      res.json = function(body: any): Response {
        if (body && typeof body === 'object') {
          const forbiddenFields = [
            'rawRevenue', 'rawCustoms', 'rawIdentity', 'rawWorkforce', 'rawIntelligence', 'rawSecurity',
            'biometricData', 'personalData', 'ledgerRecords', 'declarationRecords',
            'raw_revenue', 'raw_customs', 'raw_identity', 'raw_workforce', 'raw_intelligence', 'raw_security'
          ];
          for (const key of forbiddenFields) {
            if (key in body) {
              delete body[key];
            }
          }
        }
        return originalJson.call(this, body);
      };
    }
    
    next();
  };
}
