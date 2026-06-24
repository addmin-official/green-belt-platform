export interface AIAnalysisResult {
  status: 'APPROVED' | 'FLAGGED' | 'REJECTED';
  tariffCalculatedIQD: number;
  tariffPercentage: number;
  hsCodeVerification: {
    isMatch: boolean;
    suggestedHSCode: string;
    explanation: string;
  };
  riskScore: number;
  riskAnalysis: string[];
  complianceProtocolUsed: string;
  routingRecommendation: string;
  arabicSummary?: string;
  kurdishSummary?: string;
  notice?: string;
  isDemoMode?: boolean;
}
