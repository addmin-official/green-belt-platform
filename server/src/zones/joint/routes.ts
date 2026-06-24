import { Router, Request, Response } from 'express';
import { jurisdictionGuard } from '../../security/jurisdictionGuard.js';
import { AuditLogger } from '../../security/auditLogger.js';
// settlementRoutes (general fiscal settlement reconciliation) has been archived/disabled
import borderSettlementRoutes from './borderSettlementRoutes.js';

const router = Router();
router.use(jurisdictionGuard('JOINT_OPERATIONS'));
router.use('/', borderSettlementRoutes);

const jointPaths = [
  '/health',
  '/readiness',
  '/metadata',
  '/audit-events',
  '/sync-status',
  '/joint/border-reconciliation',
  '/joint/border-settlement-reconciliation',
  '/joint/hash-verification',
  '/joint/metadata-exchange',
  '/joint/audit-verification',
  '/joint/provider-readiness'
];

jointPaths.forEach(path => {
  // Use post matching for verification checks under joint if necessary
  const handler = (req: Request, res: Response) => {
    AuditLogger.log({
      jurisdiction: 'JOINT_OPERATIONS',
      route: req.baseUrl + path,
      providerState: 'NOT_CONFIGURED',
      decision: 'JOINT_PROVIDER_NOT_CONNECTED_FALLBACK'
    }, req.id || '');

    res.status(200).json({
      status: "METADATA_PROVIDER_NOT_CONNECTED",
      providerState: "NOT_CONFIGURED",
      jurisdiction: "JOINT_OPERATIONS",
      metadataOnly: true
    });
  };

  if (path === '/joint/hash-verification') {
    router.post(path, handler);
  } else {
    router.get(path, handler);
  }
});

export default router;
