// IDG National Data Lineage Engine - End-to-End Provenance & Traceability
// Tracks raw source inputs through micro-transformations to dashboards

export interface LineageNode {
  id: string; // e.g., 'src-moi-civil-db'
  label: string;
  type: 'SOURCE_DATABASE' | 'TRANSFORMATION_PIPELINE' | 'CENTRAL_DATALAKE' | 'SECURE_API_ROUTER' | 'COMPLIANCE_REPORT' | 'EXECUTIVE_DASHBOARD';
  ministry: string;
  fields: string[];
}

export interface LineageEdge {
  id: string;
  source: string;
  target: string;
  transformationLogic?: string;
  syncFrequency: string;
}

export interface LineageGraph {
  nodes: LineageNode[];
  edges: LineageEdge[];
}

export interface ImpactAnalysisNode {
  nodeId: string;
  label: string;
  type: string;
  impactLevel: 'CRITICAL' | 'MEDIUM' | 'LOW';
  roleAffected: string;
}

export class DataLineageEngine {
  private static instance: DataLineageEngine;
  private graph: LineageGraph = { nodes: [], edges: [] };

  private constructor() {
    this.buildSovereignLineageGraph();
  }

  public static getInstance(): DataLineageEngine {
    if (!DataLineageEngine.instance) {
      DataLineageEngine.instance = new DataLineageEngine();
    }
    return DataLineageEngine.instance;
  }

  private buildSovereignLineageGraph() {
    this.graph.nodes = [
      // DB Sources
      {
        id: 'src-moi-civil-db',
        label: 'Ministry of Interior (MoI) Civil Cards Database',
        type: 'SOURCE_DATABASE',
        ministry: 'Ministry of Interior',
        fields: ['nationalCardId', 'fatherName', 'motherName', 'biometricHash']
      },
      {
        id: 'src-mot-companies-db',
        label: 'Ministry of Trade Registry System',
        type: 'SOURCE_DATABASE',
        ministry: 'Ministry of Trade',
        fields: ['regNumber', 'companyCapital', 'permitList', 'taxIdentity']
      },
      {
        id: 'src-[#E0A96D]',
        label: 'Central Bank (CBI) Interbanking Ledger',
        type: 'SOURCE_DATABASE',
        ministry: 'Central Bank of Iraq',
        fields: ['wireTransactionId', 'sendingBank', 'receivingPartyTin', 'wireAmount']
      },

      // Transformations
      {
        id: 'pipe-idg-etl-processor',
        label: 'IDG Sovereign ETL & Resolution Worker',
        type: 'TRANSFORMATION_PIPELINE',
        ministry: 'Sovereign Digital Authority',
        fields: ['goldenCitizenId', 'goldenBizTin', 'unifiedComplianceIndex']
      },

      // Datalake / Fabric Core
      {
        id: 'core-datalake-isolated',
        label: 'Federal Isolated Unified Data Ocean',
        type: 'CENTRAL_DATALAKE',
        ministry: 'National Secure Cloud Foundation',
        fields: ['goldenCitizenId', 'unifiedComplianceIndex', 'revenueDailyMetrics']
      },

      // API Router
      {
        id: 'api-sovereign-dispatch',
        label: 'National Identity Authorization API Gateway',
        type: 'SECURE_API_ROUTER',
        ministry: 'Sovereign Digital Authority',
        fields: ['passengerPassport', 'securityClearanceLevel', 'validSovereignSignature']
      },

      // Consuming Reports / Dashboards
      {
        id: 'report-fiu-terrorism-compliance',
        label: 'Terrorist Finance Prevention Audit Report',
        type: 'COMPLIANCE_REPORT',
        ministry: 'Central Bank of Iraq',
        fields: ['highRiskCompanyTins', 'withdrawnLicences', 'reconciliationMatchingRate']
      },
      {
        id: 'dash-customs-realtime-telemetry',
        label: 'National Customs Operational Command Center',
        type: 'EXECUTIVE_DASHBOARD',
        ministry: 'General Authority for Customs',
        fields: ['dailyTruckThroughput', 'collectedTariffIQD', 'customsAlarmsActive']
      }
    ];

    this.graph.edges = [
      {
        id: 'edge-1',
        source: 'src-moi-civil-db',
        target: 'pipe-idg-etl-processor',
        transformationLogic: 'Deduplicate & Mask Biometric Signatures',
        syncFrequency: 'REAL_TIME_STREAM'
      },
      {
        id: 'edge-2',
        source: 'src-mot-companies-db',
        target: 'pipe-idg-etl-processor',
        transformationLogic: 'Extract Corporate TIN & Export Permits Index',
        syncFrequency: 'NIGHTLY_BATCH_1AM'
      },
      {
        id: 'edge-3',
        source: 'src-[#E0A96D]',
        target: 'pipe-idg-etl-processor',
        transformationLogic: 'Parse Wire transfer parties and resolve duplicates',
        syncFrequency: 'REAL_TIME_STREAM'
      },
      {
        id: 'edge-4',
        source: 'pipe-idg-etl-processor',
        target: 'core-datalake-isolated',
        transformationLogic: 'Load verified master golden records in crypted sectors',
        syncFrequency: 'HOURLY_COMMIT'
      },
      {
        id: 'edge-5',
        source: 'core-datalake-isolated',
        target: 'api-sovereign-dispatch',
        transformationLogic: 'Proxy requests using JSON-ID with custom claim metadata',
        syncFrequency: 'ON_DEMAND'
      },
      {
        id: 'edge-6',
        source: 'api-sovereign-dispatch',
        target: 'report-fiu-terrorism-compliance',
        transformationLogic: 'Extract mismatch indicators and flag risk ratings',
        syncFrequency: 'REAL_TIME_STREAM'
      },
      {
        id: 'edge-7',
        source: 'core-datalake-isolated',
        target: 'dash-customs-realtime-telemetry',
        transformationLogic: 'Re-summarize customs totals and sensor counts',
        syncFrequency: 'REAL_TIME_STREAM'
      }
    ];
  }

  public getLineageGraph(): LineageGraph {
    return this.graph;
  }

  /**
   * Evaluates the impact of a dataset or database resource breakdown downstream
   */
  public executeImpactSimulation(nodeId: string): ImpactAnalysisNode[] {
    const affected: ImpactAnalysisNode[] = [];
    
    // Quick breath-first traversal simulate to catch affected downstream nodes
    const visited = new Set<string>();
    const queue: string[] = [nodeId];
    visited.add(nodeId);

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      
      // Find all target nodes of edges leaving currentId
      const targetEdges = this.graph.edges.filter(e => e.source === currentId);
      for (const edge of targetEdges) {
        if (!visited.has(edge.target)) {
          visited.add(edge.target);
          queue.push(edge.target);

          const targetNode = this.graph.nodes.find(n => n.id === edge.target);
          if (targetNode) {
            let impactLevel: 'CRITICAL' | 'MEDIUM' | 'LOW' = 'LOW';
            let roleAffected = 'Standard Analysts';

            if (targetNode.type === 'EXECUTIVE_DASHBOARD' || targetNode.type === 'COMPLIANCE_REPORT') {
              impactLevel = 'CRITICAL';
              roleAffected = 'National Cabinet Officials & Security Directors';
            } else if (targetNode.type === 'SECURE_API_ROUTER') {
              impactLevel = 'CRITICAL';
              roleAffected = 'Customs Officers and Gate Enforcers';
            } else if (targetNode.type === 'CENTRAL_DATALAKE') {
              impactLevel = 'MEDIUM';
              roleAffected = 'Data Platform Governance Custodians';
            }

            affected.push({
              nodeId: targetNode.id,
              label: targetNode.label,
              type: targetNode.type,
              impactLevel,
              roleAffected
            });
          }
        }
      }
    }

    return affected;
  }
}
