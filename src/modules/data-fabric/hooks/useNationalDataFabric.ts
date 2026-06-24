import { useState, useEffect, useCallback, useMemo } from 'react';
import { CatalogDataset, DatasetQualityReport } from '../../../data-fabric';
import { DataFabricOrchestrator } from '../services/DataFabricOrchestrator';

export function useNationalDataFabric() {
  const orchestrator = useMemo(() => DataFabricOrchestrator.getInstance(), []);

  const [datasets, setDatasets] = useState<CatalogDataset[]>([]);
  const [qualityReports, setQualityReports] = useState<DatasetQualityReport[]>([]);
  const [duplicates, setDuplicates] = useState<any[]>([]);
  const [selectedDatasetId, setSelectedDatasetId] = useState('ds-national-citizens-01');

  const reloadData = useCallback(() => {
    setDatasets(orchestrator.getAllDatasets());
    setQualityReports(orchestrator.getQualityReports());
    setDuplicates(orchestrator.getPendingDuplicates());
  }, [orchestrator]);

  useEffect(() => {
    reloadData();
  }, [reloadData]);

  const selectDataset = useCallback((id: string) => {
    setSelectedDatasetId(id);
  }, []);

  const resolveMdmDuplicate = useCallback((dupId: string, action: 'MERGE' | 'REJECT_OUTLIER') => {
    orchestrator.resolveDuplicate(dupId, action);
    setDuplicates(orchestrator.getPendingDuplicates());
  }, [orchestrator]);

  const selectedDatasetDetails = useMemo(() => {
    return datasets.find(d => d.id === selectedDatasetId) || null;
  }, [datasets, selectedDatasetId]);

  const selectedDatasetQuality = useMemo(() => {
    return qualityReports.find(q => q.datasetId === selectedDatasetId) || null;
  }, [qualityReports, selectedDatasetId]);

  const nationalDataQualityScore = useMemo(() => {
    return orchestrator.computeNationalQualityScore();
  }, [orchestrator, qualityReports]); // Recompute when quality reports change

  return {
    datasets,
    qualityReports,
    duplicates,
    selectedDatasetId,
    selectDataset,
    resolveMdmDuplicate,
    selectedDatasetDetails,
    selectedDatasetQuality,
    nationalDataQualityScore,
    reloadData
  };
}
