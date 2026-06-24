export interface SystemService {
  name: { en: string; ar: string; ku: string };
  type: string;
  status: 'healthy' | 'degraded' | 'offline';
  latency: number;
  version: string;
}
