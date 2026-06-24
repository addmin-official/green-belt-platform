import { PilotBackendClient, BackendResponse } from '../http/PilotBackendClient';
import { ProviderState } from './ProviderState';

export class FederalBackendProvider {
  public get jurisdiction(): "FEDERAL_IRAQ" {
    return "FEDERAL_IRAQ";
  }

  public async getProviderState(): Promise<ProviderState> {
    if (!PilotBackendClient.isEndpointConfigured('FEDERAL')) {
      return 'NOT_CONFIGURED';
    }
    const res = await PilotBackendClient.queryEndpoint('FEDERAL', '/api/v1/federal/health');
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
    if (!cleanRoute.startsWith('/api/v1/federal')) {
      throw new Error(`JURISDICTION_MISMATCH: Federal backend cannot access "${cleanRoute}"`);
    }

    const res = await PilotBackendClient.queryEndpoint('FEDERAL', cleanRoute);
    if (res === 'NOT_CONFIGURED') {
      return {
        status: 'PROVIDER_NOT_CONNECTED',
        providerState: 'NOT_CONFIGURED',
        jurisdiction: 'FEDERAL_IRAQ',
        message: 'Provider endpoint is not configured in local environment.'
      };
    }
    if (res === 'UNAVAILABLE') {
      return {
        status: 'PROVIDER_NOT_CONNECTED',
        providerState: 'NOT_CONFIGURED',
        jurisdiction: 'FEDERAL_IRAQ',
        message: 'Provider backend offline or unreachable.'
      };
    }
    return res;
  }
}
