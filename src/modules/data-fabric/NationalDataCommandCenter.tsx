import React, { useState } from 'react';
import { Database, Activity, CheckSquare, Layers3 } from 'lucide-react';
import { Language } from '../../types';

// Import UI Library Components
import { 
  Badge, 
  StatCard, 
  PageHeader
} from '../../ui';

// Import Hook Abstractions
import { useNationalDataFabric } from './hooks/useNationalDataFabric';
import { useDataLineage } from './hooks/useDataLineage';
import { useEventBus } from './hooks/useEventBus';
import { useGovernance } from './hooks/useGovernance';

// Import View Panels
import { DataCatalogPanel } from './components/DataCatalogPanel';
import { DatasetDetailsPanel } from './components/DatasetDetailsPanel';
import { DataLineagePanel } from './components/DataLineagePanel';
import { EventBusPanel } from './components/EventBusPanel';
import { MdmResolutionPanel } from './components/MdmResolutionPanel';
import { GovernanceWorkflowPanel } from './components/GovernanceWorkflowPanel';

// Import Centralized Localizer
import { t } from './localization/dataFabricTranslations';

// Import Government provider
import { useGovernment } from '../../providers/GovernmentProvider';

interface NationalDataCommandCenterProps {
  lang: Language;
}

export default function NationalDataCommandCenter({ lang }: NationalDataCommandCenterProps) {
  // Extract Government context
  const { activeContext, federalFabricSchema, krgFabricSchema } = useGovernment();

  // 1. Initialize Decoupled State & Actions Hooks
  const {
    datasets,
    selectedDatasetId,
    selectDataset,
    selectedDatasetDetails,
    selectedDatasetQuality,
    nationalDataQualityScore,
    duplicates,
    resolveMdmDuplicate,
    reloadData
  } = useNationalDataFabric();

  const {
    impactSourceNode,
    impactResult,
    lineageGraph,
    triggerImpactSimulation
  } = useDataLineage();

  const {
    activeEvents,
    simTopic,
    setSimTopic,
    simPayloadKey,
    setSimPayloadKey,
    simPayloadValue,
    setSimPayloadValue,
    dispatchCustomSimulatorEvent
  } = useEventBus(reloadData); // Pass reloadData to automatically refresh datasets on event publishing

  const {
    workflows,
    executeApprovalSignoff
  } = useGovernance();

  // 2. Filters & Searches UI State (Kept close to search container)
  const [searchQuery, setSearchQuery] = useState('');
  const isRtl = lang !== 'en';

  const filteredDatasets = searchQuery
    ? datasets.filter(ds => {
        const query = searchQuery.toLowerCase();
        return (
          ds.id.toLowerCase().includes(query) ||
          ds.dataSteward.toLowerCase().includes(query) ||
          ds.name.en.toLowerCase().includes(query) ||
          ds.name.ar.toLowerCase().includes(query) ||
          ds.name.ku.toLowerCase().includes(query)
        );
      })
    : datasets;

  // Identify active domain credentials
  const activeSchema = activeContext === 'KURDISTAN_REGION' ? krgFabricSchema : federalFabricSchema;

  return (
    <div id="national-data-fabric-command-center" className="flex flex-col gap-6 text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Dynamic Page Header */}
      <PageHeader
        icon={<Database />}
        title={activeContext === 'FEDERAL_IRAQ' ? 'Federal Logical Data Fabric' : activeContext === 'KURDISTAN_REGION' ? 'KRG Regional Data Fabric' : t(lang, 'header.title')}
        description={`${t(lang, 'header.subtitle')} • [Zone: ${activeSchema.storageDomain}]`}
        status={
          <div className="flex items-center gap-2">
            <Badge variant="gold">{t(lang, 'header.badge')}</Badge>
            <Badge variant="teal">{activeContext}</Badge>
          </div>
        }
      />

      {/* Sovereign National Data Readiness Index Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title={t(lang, 'stats.quality.title')}
          value={`${nationalDataQualityScore}%`}
          subtitle={t(lang, 'stats.quality.subtitle')}
          icon={<CheckSquare className="w-5 h-5 text-[#52B788]" />}
          trend={{ value: t(lang, 'stats.quality.trend'), isPositive: true }}
        />

        <StatCard
          title={t(lang, 'stats.records.title')}
          value="48.5M+"
          subtitle={t(lang, 'stats.records.subtitle')}
          icon={<Layers3 className="w-5 h-5 text-[#E0A96D]" />}
          trend={{ value: t(lang, 'stats.records.trend'), isPositive: true }}
        />

        <StatCard
          title={t(lang, 'stats.datasets.title')}
          value={datasets.length.toString()}
          subtitle={t(lang, 'stats.datasets.subtitle')}
          icon={<Database className="w-5 h-5 text-cyan-400" />}
          trend={{ value: t(lang, 'stats.datasets.trend'), isPositive: true }}
        />

        <StatCard
          title={t(lang, 'stats.eventbus.title')}
          value={t(lang, 'stats.eventbus.activeBtn')}
          subtitle={
            lang === 'en' ? `Buffered ${activeEvents.length} recent system` :
            lang === 'ar' ? `تم تخزين ${activeEvents.length} حدثاً بالخادم` :
            `پاراستنی ${activeEvents.length} گۆڕانکاریی`
          }
          icon={<Activity className="w-5 h-5 text-purple-400" />}
          trend={{ value: t(lang, 'stats.eventbus.trend'), isPositive: true }}
        />
      </div>

      {/* Main Grid Columns Area (2 Left, 1 Right layout) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Side (Two Column Width Span) */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <DataCatalogPanel
            lang={lang}
            datasets={filteredDatasets}
            selectedDatasetId={selectedDatasetId}
            selectDataset={selectDataset}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <DatasetDetailsPanel
            lang={lang}
            selectedDatasetDetails={selectedDatasetDetails}
            selectedDatasetQuality={selectedDatasetQuality}
          />

          <DataLineagePanel
            lang={lang}
            impactSourceNode={impactSourceNode}
            impactResult={impactResult}
            lineageGraph={lineageGraph}
            triggerImpactSimulation={triggerImpactSimulation}
          />
        </div>

        {/* Right Area Column */}
        <div className="flex flex-col gap-6">
          <EventBusPanel
            lang={lang}
            activeEvents={activeEvents}
            simTopic={simTopic}
            setSimTopic={setSimTopic}
            simPayloadKey={simPayloadKey}
            setSimPayloadKey={setSimPayloadKey}
            simPayloadValue={simPayloadValue}
            setSimPayloadValue={setSimPayloadValue}
            dispatchCustomSimulatorEvent={dispatchCustomSimulatorEvent}
          />

          <MdmResolutionPanel
            lang={lang}
            duplicates={duplicates}
            resolveMdmDuplicate={resolveMdmDuplicate}
          />

          <GovernanceWorkflowPanel
            lang={lang}
            workflows={workflows}
            executeApprovalSignoff={executeApprovalSignoff}
          />
        </div>

      </div>

    </div>
  );
}
