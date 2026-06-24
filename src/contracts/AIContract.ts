export interface AIPromptTemplate {
  id: string;
  title: string;
  template: string;
}

export interface AIContract {
  classifyHS(description: string, origin: string, cost: string): Promise<string>;
  chatPolicy(message: string): Promise<{ text: string; isDemoMode?: boolean }>;
  generateForecast(params: {
    corridorId: string;
    policyLevel: string;
    cbiMode: string;
  }): Promise<{
    volumeChangePercentage: number;
    revenueChangePercentage: number;
    treasuryTrendAnalysis: string;
    executiveActionDirective: string;
  }>;
}
