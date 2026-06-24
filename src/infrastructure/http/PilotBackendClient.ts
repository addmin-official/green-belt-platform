import { ProviderEnvironmentConfig } from '../config/ProviderEnvironmentConfig';

export interface BackendResponse<T = any> {
  status: "PROVIDER_NOT_CONNECTED" | "METADATA_PROVIDER_NOT_CONNECTED" | "OK";
  providerState: "NOT_CONFIGURED" | "CONFIGURED";
  jurisdiction: "FEDERAL_IRAQ" | "KURDISTAN_REGION" | "JOINT_OPERATIONS";
  message?: string;
  metadataOnly?: boolean;
  data?: T;
}

export class PilotBackendClient {
  public static getBaseUrl(zone: 'FEDERAL' | 'KRG' | 'JOINT'): string {
    if (zone === 'FEDERAL') return ProviderEnvironmentConfig.FEDERAL_API_BASE_URL || '';
    if (zone === 'KRG') return ProviderEnvironmentConfig.KRG_API_BASE_URL || '';
    return ProviderEnvironmentConfig.JOINT_API_BASE_URL || '';
  }

  public static isEndpointConfigured(zone: 'FEDERAL' | 'KRG' | 'JOINT'): boolean {
    const url = this.getBaseUrl(zone);
    return !(!url || url.includes('placeholder') || url.trim() === '');
  }

  public static async queryEndpoint<T>(
    zone: 'FEDERAL' | 'KRG' | 'JOINT',
    path: string,
    options?: { method?: 'GET' | 'POST'; body?: any }
  ): Promise<BackendResponse<T> | 'NOT_CONFIGURED' | 'UNAVAILABLE'> {
    if (!this.isEndpointConfigured(zone)) {
      return 'NOT_CONFIGURED';
    }

    const baseUrl = this.getBaseUrl(zone);
    // Sanitize slash joining
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const url = `${cleanBase}${cleanPath}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(url, {
        method: options?.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-IDG-Client': 'FrontendWiring'
        },
        body: options?.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        // Safe check for offline / status: PROVIDER_NOT_CONNECTED
        try {
          const errData = await response.json();
          if (errData && (errData.status === 'PROVIDER_NOT_CONNECTED' || errData.status === 'METADATA_PROVIDER_NOT_CONNECTED')) {
            return errData;
          }
        } catch {
          // Fall through
        }
        return 'UNAVAILABLE';
      }

      const body = await response.json();
      return body as BackendResponse<T>;
    } catch (err) {
      console.warn(`[PilotBackendClient] failed query to ${url}:`, err);
      return 'UNAVAILABLE';
    }
  }
}
