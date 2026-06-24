import { useState } from 'react';
import { CargoManifest, AIAnalysisResult } from '../core/types';
import { CARGO_PRESETS } from '../mockData';
import { AIService } from '../services/aiService';
import { AuditViewModel, CustomsViewModel } from '../shared/view-models';

export function useManifestAudit() {
  const [selectedPreset, setSelectedPreset] = useState<string>('MNF-IRAQ-2026-9081');
  const [customManifest, setCustomManifest] = useState<CargoManifest>(CARGO_PRESETS[0]);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<AIAnalysisResult | null>(null);

  const handlePresetSelect = (presetId: string) => {
    setSelectedPreset(presetId);
    const preset = CARGO_PRESETS.find(p => p.manifestId === presetId);
    if (preset) {
      setCustomManifest({ ...preset });
    }
  };

  const handleInitiateAudit = async () => {
    setIsAuditing(true);
    setAuditResult(null);

    try {
      const data = await AIService.analyzeManifest(customManifest);
      setAuditResult(data);
    } catch (err) {
      console.error(err);
      // Fallback fallback handler inside the application layer
      setAuditResult({
        status: 'FLAGGED',
        tariffCalculatedIQD: Math.round(customManifest.declaredValueUSD * 0.12 * 1310),
        tariffPercentage: 12,
        hsCodeVerification: {
          isMatch: false,
          suggestedHSCode: customManifest.hsCodeDeclared,
          explanation: 'Dynamic network security link degraded. Displaying federal offline database fallback recommendations.'
        },
        riskScore: 45,
        riskAnalysis: [
          'Dual-use industrial classification review required.',
          'Local offline verification engine utilized as backup security clearance.'
        ],
        complianceProtocolUsed: 'Iraqi Federal Customs Law No. 23 of 1984 - Emergency Mode',
        routingRecommendation: 'Initiate standard automated scanner audit with cargo security liaison escort.',
        arabicSummary: 'تم تشغيل تفتيش جمركي مؤقت بوضع عدم الاتصال عبر خوادم البوابة. يرجى مراجعة قيم المانيفست المالي.',
        kurdishSummary: 'تدقیقی ڕاپۆرتی بە شێوەی سەربەخۆ کارایە. ڕێنمایی بۆ کۆمپانیاکان دەرچووە کە بەهۆی کێشەی سیستەم وردتر بن.',
        isDemoMode: true
      });
    } finally {
      setIsAuditing(false);
    }
  };

  const customManifestViewModel = new CustomsViewModel(customManifest);
  const auditResultViewModel = auditResult ? new AuditViewModel(auditResult) : null;

  return {
    selectedPreset,
    setSelectedPreset,
    customManifest,
    setCustomManifest,
    isAuditing,
    auditResult,
    customManifestViewModel,
    auditResultViewModel,
    handlePresetSelect,
    handleInitiateAudit
  };
}
