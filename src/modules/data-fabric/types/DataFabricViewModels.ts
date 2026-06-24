import { 
  CatalogDataset, 
  SovereignDomainEvent, 
  DatasetQualityReport, 
  AccessRequestWorkflow 
} from '../../../data-fabric';

export interface LineageImpactNode {
  id: string;
  label: string;
  type: string;
  impactLevel: 'CRITICAL' | 'WARNING' | 'INFO';
  roleAffected: string;
}

export interface ClassificationPieItem {
  label: string;
  value: number;
  color: string;
}

export interface QualityDimension {
  label: string;
  val: number;
}
