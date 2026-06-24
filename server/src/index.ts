import express from 'express';
import { env } from './config/env.js';
import { requestContext } from './middleware/requestContext.js';
import { errorHandler } from './middleware/errorHandler.js';
import healthRoutes from './health/healthRoutes.js';
import readinessRoutes from './health/readinessRoutes.js';
import federalRoutes from './zones/federal/routes.js';
import krgRoutes from './zones/krg/routes.js';
import jointRoutes from './zones/joint/routes.js';

const app = express();
const PORT = parseInt(env.PORT, 10) || 8787;

app.use(express.json());
app.use(requestContext);

// Global operational headers
app.use((req, res, next) => {
  res.setHeader('X-IDG-Platform-Zone', 'SOVEREIGN_GATEWAY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// Root and API health/readiness endpoints
app.use('/', healthRoutes);
app.use('/', readinessRoutes);
app.use('/api/v1', healthRoutes);
app.use('/api/v1', readinessRoutes);

// Isolated Jurisdiction Zones
app.use('/api/v1/federal', federalRoutes);
app.use('/api/v1/krg', krgRoutes);
app.use('/api/v1/joint', jointRoutes);

app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[IDG-BACKEND] Pilot Backend MVP Scaffold online on port ${PORT}`);
  console.log(`[IDG-BACKEND] Standing isolated zones ready for configuration:`);
  console.log(` - Federal : /api/v1/federal`);
  console.log(` - KRG     : /api/v1/krg`);
  console.log(` - Joint   : /api/v1/joint (Metadata-Only)`);
});
export default app;
