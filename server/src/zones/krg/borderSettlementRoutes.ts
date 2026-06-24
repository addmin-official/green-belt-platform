import { Router, Request, Response } from 'express';
import { AuditLogger } from '../../security/auditLogger.js';

const router = Router();

/**
 * @route GET /api/v1/krg/border-settlement/readiness
 * @description KRG border settlement readiness assessment. Returns NOT_CONFIGURED unless real border provider is available.
 */
router.get('/border-settlement/readiness', (req: Request, res: Response) => {
  AuditLogger.log({
    jurisdiction: 'KURDISTAN_REGION',
    route: '/api/v1/krg/border-settlement/readiness',
    providerState: 'NOT_CONFIGURED',
    decision: 'KRG_BORDER_SETTLEMENT_READINESS_NOT_CONFIGURED'
  }, req.id || '');

  res.status(200).json({
    status: 'NOT_CONFIGURED',
    providerState: 'NOT_CONFIGURED',
    jurisdiction: 'KURDISTAN_REGION',
    message: 'دابینکاری داتای دەروازە گومرگییە ڕاستەقینەکان دەبێت گرێ درا بێت بۆ ئەنجامدانی وردبینی.'
  });
});

export default router;
