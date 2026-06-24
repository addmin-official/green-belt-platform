import { Router, Request, Response } from 'express';
import { AuditLogger } from '../../security/auditLogger.js';

const router = Router();

/**
 * @route GET /api/v1/krg/settlement/readiness
 * @description بەدەستهێنانی باری ئامادەیی یەکلاییکردنەوەی دارایی بۆ لایەنی هەرێمی کوردستان.
 */
router.get('/settlement/readiness', (req: Request, res: Response) => {
  AuditLogger.log({
    jurisdiction: 'KURDISTAN_REGION',
    route: '/api/v1/krg/settlement/readiness',
    providerState: 'NOT_CONFIGURED',
    decision: 'KRG_SETTLEMENT_PROVIDER_CHECK_FALLBACK'
  }, req.id || '');

  res.status(200).json({
    status: 'NOT_CONFIGURED',
    providerState: 'NOT_CONFIGURED',
    jurisdiction: 'KURDISTAN_REGION',
    hasActiveLegalAgreement: false,
    hasRealCalculation: false,
    message: 'کۆنفۆگەرکردنی دابینکاری دەتای داهات فەرزە پێش چالاککردن.'
  });
});

export default router;
