import { useState, useCallback, useMemo } from 'react';
import { Language } from '../../../types';
import { 
  getPromptTemplate, getStandardResponse, getRegistryPrompts, aiModules, HITLIncident, HITLApproval 
} from '../data/aiMockData';

export type { HITLIncident, HITLApproval, AIModule } from '../data/aiMockData';

export function useSovereignAI(lang: Language) {
  const [activeModule, setActiveModule] = useState<string>('hs-classifier');
  const [activePromptId, setActivePromptId] = useState<string>('hs-prompt');
  const [promptTemplate, setPromptTemplate] = useState<string>(() => getPromptTemplate('hs-prompt', lang));

  const [playDesc, setPlayDesc] = useState<string>('Multi-axle steel alloy drill pipes for petroleum wells');
  const [playOrigin, setPlayOrigin] = useState<string>('Germany');
  const [playCost, setPlayCost] = useState<string>('$3,400 USD / Ton');
  
  const [isInferencing, setIsInferencing] = useState<boolean>(false);
  const [inferenceResult, setInferenceResult] = useState<string | null>(null);

  const [hitlList, setHitlList] = useState<HITLIncident[]>([
    { id: 'hitl-2061', checkpoint: 'Umm Qasr Sea', cargo: 'Refined Vegetable Oils', score: '78%', anomaly: 'Weight/volume ratio diverges by 42% from standard merchant profiles', status: 'pending' },
    { id: 'hitl-2062', checkpoint: 'Ibrahim Khalil Land', cargo: 'Wireless Telemetry Systems', score: '61%', anomaly: 'Exporter matching flagged on dual-use RF transmitter registry without MoD seal', status: 'pending' },
    { id: 'hitl-2063', checkpoint: 'Trebil Crossing Land', cargo: 'Agricultural Feed Strains', score: '82%', anomaly: 'Grain inspection certificates mismatch phytosanitary stamp hash', status: 'pending' }
  ]);
  const [hitlApprovals, setHitlApprovals] = useState<HITLApproval[]>([]);

  const runTestInference = useCallback(() => {
    setIsInferencing(true);
    setInferenceResult(null);
    setTimeout(() => {
      setInferenceResult(getStandardResponse(playDesc, lang));
      setIsInferencing(false);
    }, 1800);
  }, [playDesc, lang]);

  const handleHITLResolve = useCallback((id: string, action: 'APPROVED' | 'REJECTED') => {
    setHitlList(prev => prev.filter(h => h.id !== id));
    setHitlApprovals(prev => [{ id, action, timestamp: 'Confirmed' }, ...prev]);
  }, []);

  const registryPrompts = useMemo(() => getRegistryPrompts(lang), [lang]);

  const loadPrompt = useCallback((id: string) => {
    const p = (registryPrompts as any)[id];
    if (p) {
      setActivePromptId(id);
      setPromptTemplate(getPromptTemplate(id, lang));
      setPlayDesc(p.desc);
      setPlayOrigin(p.origin);
      setPlayCost(p.cost);
    }
  }, [registryPrompts, lang]);

  return {
    activeModule, setActiveModule,
    activePromptId, setActivePromptId,
    promptTemplate, setPromptTemplate,
    playDesc, setPlayDesc,
    playOrigin, setPlayOrigin,
    playCost, setPlayCost,
    isInferencing, inferenceResult,
    hitlList, hitlApprovals,
    runTestInference, handleHITLResolve,
    loadPrompt, aiModules
  };
}
