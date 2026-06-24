import { 
  NationalDataCatalog,
  MasterDataManagement,
  DataLineageEngine,
  SovereignEventBus,
  NationalDataQualityFramework,
  NationalDataGovernance,
  CatalogDataset,
  DatasetQualityReport,
  SovereignDomainEvent,
  AccessRequestWorkflow,
  EventTopic
} from '../../../data-fabric';

export class DataFabricOrchestrator {
  private static instance: DataFabricOrchestrator;

  public catalog = NationalDataCatalog.getInstance();
  public mdm = MasterDataManagement.getInstance();
  public lineageEngine = DataLineageEngine.getInstance();
  public eventBus = SovereignEventBus.getInstance();
  public qualityFramework = NationalDataQualityFramework.getInstance();
  public governance = NationalDataGovernance.getInstance();

  private constructor() {}

  public static getInstance(): DataFabricOrchestrator {
    if (!DataFabricOrchestrator.instance) {
      DataFabricOrchestrator.instance = new DataFabricOrchestrator();
    }
    return DataFabricOrchestrator.instance;
  }

  public getAllDatasets(): CatalogDataset[] {
    return this.catalog.getAllDatasets();
  }

  public getQualityReports(): DatasetQualityReport[] {
    return this.qualityFramework.getReports();
  }

  public getEventHistory(): SovereignDomainEvent[] {
    return this.eventBus.getEventHistory();
  }

  public getWorkflows(): AccessRequestWorkflow[] {
    return this.governance.getWorkflows();
  }

  public getPendingDuplicates(): any[] {
    return this.mdm.getPendingDuplicates();
  }

  public executeImpactSimulation(nodeId: string): any[] {
    return this.lineageEngine.executeImpactSimulation(nodeId);
  }

  public getLineageGraph(): any {
    return this.lineageEngine.getLineageGraph();
  }

  public publishEvent(topic: EventTopic, source: string, payload: Record<string, any>): void {
    this.eventBus.publish(topic, source, payload);
  }

  public triggerLiveRecalculationAssessment(targetDs: string, nextCompleteness: number): void {
    const currentRep = this.qualityFramework.getReport(targetDs);
    if (currentRep) {
      this.qualityFramework.triggerLiveRecalculationAssessment(targetDs, { completeness: nextCompleteness });
    }
  }

  public signWorkflowApprovalStep(wfId: string, approverRole: string, approverName: string): void {
    this.governance.signWorkflowApprovalStep(wfId, approverRole, approverName);
  }

  public resolveDuplicate(dupId: string, action: 'MERGE' | 'REJECT_OUTLIER'): void {
    this.mdm.resolveDuplicate(dupId, action);
  }

  public computeNationalQualityScore(): number {
    return this.qualityFramework.computeNationalQualityScore();
  }
}
