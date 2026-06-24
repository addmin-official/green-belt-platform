export interface Checkpoint {
  id: string;
  name: {
    en: string;
    ar: string;
    ku: string;
  };
  region: {
    en: string;
    ar: string;
    ku: string;
  };
  type: 'land' | 'sea' | 'air';
  status: 'active' | 'warning' | 'alert';
  throughputRaw: number;
  revenueRaw: number;
  processedToday: number;
  latitude: number;
  longitude: number;
}

export interface TradeAlert {
  id: string;
  timestamp: string;
  checkpointId: string;
  checkpointName: { en: string; ar: string; ku: string };
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: { en: string; ar: string; ku: string };
  description: { en: string; ar: string; ku: string };
  status: 'investigating' | 'resolved' | 'escalated';
}
