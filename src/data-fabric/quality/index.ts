// IDG National Data Quality Assurance Platform
// Quantifies metric compliance according to standard data dimensions

export interface QualityMetricDimension {
  completeness: number; // 0 to 100 percentage
  accuracy: number;     // 0 to 100 percentage
  consistency: number;  // 0 to 100 percentage
  timeliness: number;   // 0 to 100 percentage
  uniqueness: number;   // 0 to 100 percentage
  validity: number;     // 0 to 100 percentage
}

export interface DatasetQualityReport {
  datasetId: string;
  datasetName: string;
  assessedAt: string;
  metrics: QualityMetricDimension;
  aggregateScore: number;
  failedRulesCount: number;
  criticalAnomalies: string[];
}

export class NationalDataQualityFramework {
  private static instance: NationalDataQualityFramework;

  private qualityReports: Map<string, DatasetQualityReport> = new Map();

  private constructor() {
    this.calculateInitialQualityLeagues();
  }

  public static getInstance(): NationalDataQualityFramework {
    if (!NationalDataQualityFramework.instance) {
      NationalDataQualityFramework.instance = new NationalDataQualityFramework();
    }
    return NationalDataQualityFramework.instance;
  }

  private calculateInitialQualityLeagues() {
    // 1. National Citizen Registry Report
    this.qualityReports.set('ds-national-citizens-01', {
      datasetId: 'ds-national-citizens-01',
      datasetName: 'National Citizen Master Record',
      assessedAt: new Date().toISOString(),
      metrics: {
        completeness: 99.8,
        accuracy: 99.1,
        consistency: 98.4,
        timeliness: 96.2,
        uniqueness: 100.0,
        validity: 99.5
      },
      aggregateScore: 98.8,
      failedRulesCount: 0,
      criticalAnomalies: []
    });

    // 2. Businesses Registry Report
    this.qualityReports.set('ds-commercial-companies-02', {
      datasetId: 'ds-commercial-companies-02',
      datasetName: 'National Registered Companies Catalog',
      assessedAt: new Date().toISOString(),
      metrics: {
        completeness: 95.0,
        accuracy: 94.2,
        consistency: 93.8,
        timeliness: 91.0,
        uniqueness: 99.1,
        validity: 96.0
      },
      aggregateScore: 94.8,
      failedRulesCount: 1,
      criticalAnomalies: ['Conflicting Capital fields between Ministry of Trade and Tax Registry']
    });

    // 3. Central Bank Currency reserves (High precision required)
    this.qualityReports.set('ds-currency-reserves-03', {
      datasetId: 'ds-currency-reserves-03',
      datasetName: 'National Foreign Exchange Transaction Vault',
      assessedAt: new Date().toISOString(),
      metrics: {
        completeness: 100.0,
        accuracy: 99.9,
        consistency: 99.8,
        timeliness: 99.5,
        uniqueness: 100.0,
        validity: 100.0
      },
      aggregateScore: 99.8,
      failedRulesCount: 0,
      criticalAnomalies: []
    });

    // 4. Customs Passenger & Cargo manifests
    this.qualityReports.set('ds-port-cargo-manifests-04', {
      datasetId: 'ds-port-cargo-manifests-04',
      datasetName: 'Border Crossings Integrated Cargo Log',
      assessedAt: new Date().toISOString(),
      metrics: {
        completeness: 91.5,
        accuracy: 90.4,
        consistency: 92.1,
        timeliness: 88.0,
        uniqueness: 98.9,
        validity: 90.8
      },
      aggregateScore: 91.9,
      failedRulesCount: 3,
      criticalAnomalies: [
        'Invalid or unverified HS-Codes flagged on legacy agricultural containers',
        'Incomplete customs officer badge sign-off weights'
      ]
    });
  }

  /**
   * Generates the sovereign unified single percentage representing National Data Quality
   */
  public computeNationalQualityScore(): number {
    const list = Array.from(this.qualityReports.values());
    if (list.length === 0) return 100;
    
    // Average the aggregates
    const total = list.reduce((acc, rep) => acc + rep.aggregateScore, 0);
    return Math.round((total / list.length) * 100) / 100;
  }

  public getReports(): DatasetQualityReport[] {
    return Array.from(this.qualityReports.values());
  }

  public getReport(datasetId: string): DatasetQualityReport | undefined {
    return this.qualityReports.get(datasetId);
  }

  /**
   * Recalculates metrics live with updated telemetry streams
   */
  public triggerLiveRecalculationAssessment(datasetId: string, customDimensions?: Partial<QualityMetricDimension>): DatasetQualityReport | undefined {
    const report = this.qualityReports.get(datasetId);
    if (!report) return undefined;

    if (customDimensions) {
      report.metrics = {
        ...report.metrics,
        ...customDimensions
      };
    }

    // Weighted average recalc
    const m = report.metrics;
    const nextAggregate = Math.round(((m.completeness + m.accuracy + m.consistency + m.timeliness + m.uniqueness + m.validity) / 6) * 10) / 10;
    
    report.aggregateScore = nextAggregate;
    report.assessedAt = new Date().toISOString();

    return report;
  }
}
