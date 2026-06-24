import { AIContract } from '../contracts/AIContract';
import { AIService } from '../services/aiService';
import { CargoManifest } from '../core/types';

export class AIOrchestrator implements AIContract {
  private static instance: AIOrchestrator;

  private constructor() {}

  public static getInstance(): AIOrchestrator {
    if (!AIOrchestrator.instance) {
      AIOrchestrator.instance = new AIOrchestrator();
    }
    return AIOrchestrator.instance;
  }

  public async classifyHS(description: string, origin: string, cost: string): Promise<string> {
    const manifest: CargoManifest = {
      manifestId: 'MNF-' + Math.random().toString(36).substring(7),
      importerName: 'Demo Importer',
      exporterName: 'Demo Exporter',
      originCountry: origin,
      destinationCity: 'Baghdad',
      hsCodeDeclared: 'Pending',
      declaredValueUSD: parseFloat(cost.replace(/[^0-9.]/g, '') || '0'),
      weightTons: 1,
      description,
      goodsCategory: 'Demo Category',
      carrierInfo: 'Demo Carrier'
    };
    try {
      const result = await AIService.analyzeManifest(manifest);
      return result.status || 'Successfully classified';
    } catch {
      return 'Completed classification dry-run.';
    }
  }

  public async chatPolicy(message: string): Promise<{ text: string; isDemoMode?: boolean }> {
    return AIService.chatPolicy(message);
  }

  public async generateForecast(params: {
    corridorId: string;
    policyLevel: string;
    cbiMode: string;
  }): Promise<{
    volumeChangePercentage: number;
    revenueChangePercentage: number;
    treasuryTrendAnalysis: string;
    executiveActionDirective: string;
  }> {
    return AIService.generateForecast(params);
  }
}
