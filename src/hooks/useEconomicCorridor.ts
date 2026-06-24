import { useState } from 'react';
import { AIService } from '../services/aiService';
import { AnalyticsViewModel } from '../shared/view-models';

export function useEconomicCorridor() {
  const [selectedCorridor, setSelectedCorridor] = useState<string>('al-faw-dev-road');
  const [policyLevel, setPolicyLevel] = useState<string>('harmonized');
  const [cbiSurveillance, setCbiSurveillance] = useState<string>('standard');
  const [isPredicting, setIsPredicting] = useState<boolean>(false);
  const [predictionResult, setPredictionResult] = useState<any | null>(null);

  const handleTriggerForecast = async () => {
    setIsPredicting(true);
    setPredictionResult(null);

    try {
      const data = await AIService.generateForecast({
        corridorId: selectedCorridor,
        policyLevel,
        cbiMode: cbiSurveillance
      });
      setPredictionResult(new AnalyticsViewModel(data));
    } catch (err) {
      console.error(err);
      setPredictionResult(new AnalyticsViewModel({
        volumeChangePercentage: 14,
        revenueChangePercentage: 18,
        treasuryTrendAnalysis: 'Under static parameters, alignment of customs duties and treasury balances yields sustained capital growth curves.',
        executiveActionDirective: 'Conduct full monitoring of land border operations and request digital bank reports for trade wires.',
        isDemoMode: true
      }));
    } finally {
      setIsPredicting(false);
    }
  };

  return {
    selectedCorridor,
    setSelectedCorridor,
    policyLevel,
    setPolicyLevel,
    cbiSurveillance,
    setCbiSurveillance,
    isPredicting,
    predictionResult,
    handleTriggerForecast
  };
}
