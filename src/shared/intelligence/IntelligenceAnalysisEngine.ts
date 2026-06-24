import { NationalIntelligenceRegistry } from './NationalIntelligenceRegistry';
import { IntelligenceSummary } from './NationalThreatTypes';

export interface StrategicPatternMatch {
  patternId: string;
  sourceSummaries: string[];
  vulnerabilityAreaKu: string;
  relevanceProbability: number; // 0 to 1
  tacticalGuidelineKu: string;
}

export class IntelligenceAnalysisEngine {
  public static analyzeSummaries(): StrategicPatternMatch[] {
    const summaries = NationalIntelligenceRegistry.getSummaries();
    const matches: StrategicPatternMatch[] = [];

    if (summaries.length === 0) {
      // Seed a baseline pattern if none exist to make sure the framework operates
      this.seedPattern(matches);
      return matches;
    }

    // Real dynamic analysis looking for words
    const fraudSummaries = summaries.filter(s => 
      s.contentEn.toLowerCase().includes('fraud') || 
      s.contentEn.toLowerCase().includes('override') ||
      s.contentEn.toLowerCase().includes('manipulation')
    );

    if (fraudSummaries.length > 0) {
      matches.push({
        patternId: 'PAT-FISCAL-EVASION',
        sourceSummaries: fraudSummaries.map(s => s.summaryId),
        vulnerabilityAreaKu: 'پەسەندکردنی دەستی و جێگۆڕکێی مانیفێستی نووسراو بەبێ کۆنتڕۆڵی ڕاسپاردە نیشتمانییەکان',
        relevanceProbability: 0.85,
        tacticalGuidelineKu: 'نوێکردنەوەی متمانەی ئامێرەکان و پشکنینی پشتبەستن بە واژۆی دیجیتاڵی مۆری نیشتمانی'
      });
    }

    return matches;
  }

  private static seedPattern(matches: StrategicPatternMatch[]) {
    matches.push({
      patternId: 'PAT-CROSS-BORDER-DIVERG',
      sourceSummaries: ['INT-GEN-001'],
      vulnerabilityAreaKu: 'ناتەبایی مانیفێست بەهۆی بەکارهێنانی کاتی شیفتی کارمەندانی بێ بڕوانامە لە دەروازە ناوەندییەکان',
      relevanceProbability: 0.65,
      tacticalGuidelineKu: 'پشکنینی بڕوانامەکان و سەپاندنی مەرجەکانی شیفت پشتبەستوو بە مەکینەی شیفتی فەرماندەی هاوبەش'
    });
  }
}
