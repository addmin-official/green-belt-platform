export interface CheckpointDTO {
  id: string;
  name: { en: string; ar: string; ku: string };
  region: { en: string; ar: string; ku: string };
  type: 'land' | 'sea' | 'air';
  status: 'active' | 'warning' | 'alert';
  throughputRaw: number;
  revenueRaw: number;
  processedToday: number;
  latitude: number;
  longitude: number;
}

export interface CheckpointRepository {
  getAll(): Promise<CheckpointDTO[]>;
  getById(id: string): Promise<CheckpointDTO | null>;
}
