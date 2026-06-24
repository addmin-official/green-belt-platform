import { Router, Request, Response } from 'express';
import { AuditLogger } from '../../security/auditLogger.js';

const router = Router();

/**
 * @route GET /api/v1/joint/border-settlement/reconciliation
 * @description Joint border settlement reconciliation metadata check. Returns NOT_CONFIGURED.
 */
router.get('/border-settlement/reconciliation', (req: Request, res: Response) => {
  AuditLogger.log({
    jurisdiction: 'JOINT_OPERATIONS',
    route: '/api/v1/joint/border-settlement/reconciliation',
    providerState: 'NOT_CONFIGURED',
    decision: 'JOINT_BORDER_SETTLEMENT_RECON_NOT_CONFIGURED'
  }, req.id || '');

  res.status(200).json({
    status: 'NOT_CONFIGURED',
    providerState: 'NOT_CONFIGURED',
    jurisdiction: 'JOINT_OPERATIONS',
    message: 'سیستەمی گشتی یەکگری گومرگەکان هیچ زانیارییەکی گواستنەوەی فەرمی کۆن نەکردووە بەهۆی نەبوونی داتای فەرمی دەروازە.'
  });
});

export default router;
