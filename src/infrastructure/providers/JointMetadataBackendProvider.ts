import { PilotBackendClient, BackendResponse } from '../http/PilotBackendClient';
import { ProviderState } from './ProviderState';

export class JointMetadataBackendProvider {
  public get jurisdiction(): "JOINT_OPERATIONS" {
    return "JOINT_OPERATIONS";
  }

  public async getProviderState(): Promise<ProviderState> {
    if (!PilotBackendClient.isEndpointConfigured('JOINT')) {
      return 'NOT_CONFIGURED';
    }
    const res = await PilotBackendClient.queryEndpoint('JOINT', '/api/v1/joint/health');
    if (res === 'NOT_CONFIGURED') return 'NOT_CONFIGURED';
    if (res === 'UNAVAILABLE') return 'UNAVAILABLE';
    if (res.status === 'METADATA_PROVIDER_NOT_CONNECTED') {
      return 'NOT_CONFIGURED';
    }
    return 'READY';
  }

  public async fetchRoute(routePath: string, payload?: any): Promise<BackendResponse<any>> {
    const cleanRoute = routePath.startsWith('/') ? routePath : `/${routePath}`;

    // Validate jurisdiction path boundaries
    if (!cleanRoute.startsWith('/api/v1/joint')) {
      throw new Error(`JURISDICTION_MISMATCH: Joint backend cannot access "${cleanRoute}"`);
    }

    const options = payload ? { method: 'POST' as const, body: payload } : undefined;
    const res = await PilotBackendClient.queryEndpoint('JOINT', cleanRoute, options);
    
    if (res === 'NOT_CONFIGURED') {
      return {
        status: 'METADATA_PROVIDER_NOT_CONNECTED',
        providerState: 'NOT_CONFIGURED',
        jurisdiction: 'JOINT_OPERATIONS',
        metadataOnly: true
      };
    }
    if (res === 'UNAVAILABLE') {
      return {
        status: 'METADATA_PROVIDER_NOT_CONNECTED',
        providerState: 'NOT_CONFIGURED',
        jurisdiction: 'JOINT_OPERATIONS',
        metadataOnly: true
      };
    }
    return res;
  }
}
