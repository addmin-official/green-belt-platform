import React from 'react';
import { Activity } from 'lucide-react';
import { Language } from '../../../types';
import { SovereignDomainEvent } from '../../../data-fabric';
import { Button, Badge } from '../../../ui';
import { t } from '../localization/dataFabricTranslations';

export interface EventBusPanelProps {
  lang: Language;
  activeEvents: SovereignDomainEvent[];
  simTopic: 'customs.manifest.declared' | 'identity.citizen.unified' | 'financial.wire.flagged';
  setSimTopic: (topic: any) => void;
  simPayloadKey: string;
  setSimPayloadKey: (key: string) => void;
  simPayloadValue: string;
  setSimPayloadValue: (value: string) => void;
  dispatchCustomSimulatorEvent: () => void;
}

export const EventBusPanel: React.FC<EventBusPanelProps> = React.memo(({
  lang,
  activeEvents,
  simTopic,
  setSimTopic,
  simPayloadKey,
  setSimPayloadKey,
  simPayloadValue,
  setSimPayloadValue,
  dispatchCustomSimulatorEvent
}) => {
  return (
    <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl flex flex-col gap-4 text-start animate-fade-in">
      <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-widest pb-2 border-b border-slate-900 flex justify-between items-center">
        <span className="flex items-center gap-1.5 font-sans">
          <Activity className="text-[#E0A96D] w-4.5 h-4.5" />
          {t(lang, 'eventbus.title')}
        </span>
      </h3>

      {/* Simulated Event Trigger Sandbox */}
      <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-900 flex flex-col gap-3 font-mono text-xs">
        <span className="text-[10px] text-[#E0A96D] font-bold uppercase block border-b border-slate-900 pb-1">
          {t(lang, 'eventbus.sandboxTitle')}
        </span>
        
        <div className="flex flex-col gap-2">
          <label className="text-[10px] text-slate-400">
            {t(lang, 'eventbus.selectTopic')}
          </label>
          <select
            value={simTopic}
            onChange={(e) => setSimTopic(e.target.value as any)}
            className="bg-[#111e2e] border border-slate-800 text-[11px] p-1.5 rounded focus:outline-none text-white w-full"
          >
            <option value="customs.manifest.declared">customs.manifest.declared</option>
            <option value="identity.citizen.unified">identity.citizen.unified</option>
            <option value="financial.wire.flagged">financial.wire.flagged</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-slate-400">
            {t(lang, 'eventbus.payloadKeys')}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input 
              type="text" 
              placeholder={t(lang, 'eventbus.keyLabel')} 
              value={simPayloadKey} 
              onChange={(e) => setSimPayloadKey(e.target.value)}
              className="bg-[#111e2e] border border-slate-800 text-[10.5px] p-1.5 rounded text-white focus:outline-none w-full"
            />
            <input 
              type="text" 
              placeholder={t(lang, 'eventbus.valueLabel')} 
              value={simPayloadValue} 
              onChange={(e) => setSimPayloadValue(e.target.value)}
              className="bg-[#111e2e] border border-slate-800 text-[10.5px] p-1.5 rounded text-white focus:outline-none w-full"
            />
          </div>
        </div>

        <Button
          size="sm"
          variant="default"
          onClick={dispatchCustomSimulatorEvent}
          className="bg-[#E0A96D] hover:bg-[#E0A96D]/90 text-slate-950 font-bold text-[11px] w-full mt-1.5 py-1.5"
        >
          {t(lang, 'eventbus.publishBtn')}
        </Button>
      </div>

      {/* List Chronological events from Bus */}
      <div className="flex flex-col gap-2.5 max-h-[300px] overflow-y-auto pr-1">
        {activeEvents.map((evt) => {
          const isAlarm = evt.topic.includes('alarm') || evt.topic.includes('flagged');
          return (
            <div 
              key={evt.eventId}
              className={`p-3 rounded border text-xs font-mono flex flex-col gap-1.5 leading-normal ${
                isAlarm ? 'bg-red-950/20 border-red-500/30' : 'bg-slate-900 border-slate-850'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-950 pb-1">
                <span className="text-[#E0A96D] font-bold text-[10px]">{evt.eventId}</span>
                <span className="text-slate-500 text-[9px]">{evt.timestamp.slice(11, 19)}Z</span>
              </div>

              <div className="flex justify-between text-[11px]">
                <span className="text-white font-semibold">{evt.topic}</span>
                <Badge variant={isAlarm ? 'danger' : 'slate'}>
                  {evt.sourceSystem.split(' ')[0]}
                </Badge>
              </div>

              {/* Compacted payload rendering */}
              <div className="bg-slate-950 p-2 border border-slate-950 text-[10px] text-slate-400 capitalize max-h-16 overflow-y-auto">
                {Object.entries(evt.payload).map(([k, v]: any) => (
                  <div key={k} className="flex justify-between items-center">
                    <span>{k}:</span>
                    <strong className="text-slate-300 font-bold">{v}</strong>
                  </div>
                ))}
              </div>

              <span className="text-[9px] text-slate-500 break-all leading-none italic font-normal text-start">
                {t(lang, 'eventbus.hmacSig')}{evt.securitySignature}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
});

EventBusPanel.displayName = 'EventBusPanel';
export default EventBusPanel;
