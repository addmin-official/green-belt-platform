import { PilotBackendClient, BackendResponse } from '../http/PilotBackendClient';
import { ProviderState } from './ProviderState';

export class KRGBackendProvider {
  public get jurisdiction(): "KURDISTAN_REGION" {
    return "KURDISTAN_REGION";
  }

  public async getProviderState(): Promise<ProviderState> {
    if (!PilotBackendClient.isEndpointConfigured('KRG')) {
      return 'NOT_CONFIGURED';
    }
    const res = await PilotBackendClient.queryEndpoint('KRG', '/api/v1/krg/health');
    if (res === 'NOT_CONFIGURED') return 'NOT_CONFIGURED';
    if (res === 'UNAVAILABLE') return 'UNAVAILABLE';
    if (res.status === 'PROVIDER_NOT_CONNECTED') {
      return 'NOT_CONFIGURED';
    }
    return 'READY';
  }

  public async fetchRoute(routePath: string): Promise<BackendResponse<any>> {
    const cleanRoute = routePath.startsWith('/') ? routePath : `/${routePath}`;

    // Validate jurisdiction path boundaries
    if (!cleanRoute.startsWith('/api/v1/krg')) {
      throw new Error(`JURISDICTION_MISMATCH: KRG backend cannot access "${cleanRoute}"`);
    }

    const res = await PilotBackendClient.queryEndpoint('KRG', cleanRoute);
    if (res === 'NOT_CONFIGURED') {
      return {
        status: 'PROVIDER_NOT_CONNECTED',
        providerState: 'NOT_CONFIGURED',
        jurisdiction: 'KURDISTAN_REGION',
        message: 'KRG provider endpoint is not configured in local environment.'
      };
    }
    if (res === 'UNAVAILABLE') {
      return {
        status: 'PROVIDER_NOT_CONNECTED',
        providerState: 'NOT_CONFIGURED',
        jurisdiction: 'KURDISTAN_REGION',
        message: 'KRG provider backend offline or unreachable.'
      };
    }
    return res;
  }
}
