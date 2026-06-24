import { CargoManifest, AIAnalysisResult } from '../core/types';

export class AIService {
  static async analyzeManifest(manifest: CargoManifest): Promise<AIAnalysisResult> {
    const response = await fetch('/api/idg/analyze-manifest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ manifest }),
    });
    if (!response.ok) {
      throw new Error(`Analyze manifest failed with status: ${response.status}`);
    }
    return response.json();
  }

  static async chatPolicy(message: string): Promise<{ text: string; isDemoMode?: boolean }> {
    const response = await fetch('/api/idg/chat-policy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) {
      throw new Error(`Chat policy instruction failed with status: ${response.status}`);
    }
    return response.json();
  }

  static async generateForecast(params: {
    corridorId: string;
    policyLevel: string;
    cbiMode: string;
  }): Promise<{
    volumeChangePercentage: number;
    revenueChangePercentage: number;
    treasuryTrendAnalysis: string;
    executiveActionDirective: string;
    isDemoMode?: boolean;
    errorNotice?: string;
  }> {
    const response = await fetch('/api/idg/generate-forecast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        corridorId: params.corridorId,
        policyLevel: params.policyLevel,
        cbiMode: params.cbiMode,
      }),
    });
    if (!response.ok) {
      throw new Error(`Generate forecast failed with status: ${response.status}`);
    }
    return response.json();
  }
}
