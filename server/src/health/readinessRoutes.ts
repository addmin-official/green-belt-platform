import { Router, Request, Response } from 'express';

const router = Router();

router.get('/readiness', (req: Request, res: Response) => {
  res.status(200).json({
    status: "CONDITIONALLY_READY",
    readinessDecision: "BORDER_API_SURFACE_VERIFIED_PROVIDERS_REQUIRED",
    providerState: "NOT_CONFIGURED",
    providersRequired: true,
    operationalDataConnected: false,
    productionReady: false,
    pilotReady: false
  });
});

export default router;
