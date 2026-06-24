import { Router, Request, Response } from 'express';
import { AuditLogger } from '../../security/auditLogger.js';

const router = Router();

router.get('/metadata', (req: Request, res: Response) => {
  AuditLogger.log({
    jurisdiction: 'KURDISTAN_REGION',
    route: '/api/v1/krg/brs/metadata',
    providerState: 'NOT_CONFIGURED',
    decision: 'PROVIDER_NOT_CONNECTED_FALLBACK'
  }, req.id || '');

  res.status(200).json({
    status: 'NOT_CONFIGURED',
    providerState: 'NOT_CONFIGURED',
    jurisdiction: 'KURDISTAN_REGION',
    message: 'KRG digital provider approval required'
  });
});

router.get('/readiness', (req: Request, res: Response) => {
  AuditLogger.log({
    jurisdiction: 'KURDISTAN_REGION',
    route: '/api/v1/krg/brs/readiness',
    providerState: 'NOT_CONFIGURED',
    decision: 'PROVIDER_NOT_CONNECTED_FALLBACK'
  }, req.id || '');

  res.status(200).json({
    status: 'NOT_CONFIGURED',
    providerState: 'NOT_CONFIGURED',
    jurisdiction: 'KURDISTAN_REGION',
    message: 'KRG digital provider approval required'
  });
});

export default router;
