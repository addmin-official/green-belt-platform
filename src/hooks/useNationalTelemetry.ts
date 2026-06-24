import { useState, useEffect } from 'react';
import { MOCK_LEDGER_BLOCKS, CHECKPOINTS } from '../mockData';

export function useNationalTelemetry() {
  const [ledgerBlocks, setLedgerBlocks] = useState(MOCK_LEDGER_BLOCKS);
  const [uptime, setUptime] = useState<number>(99.982);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(3);
  const [processedTodayCumulative, setProcessedTodayCumulative] = useState<number>(5820);
  const [revenueTodayCumulative, setRevenueTodayCumulative] = useState<number>(31940); // millions IQD

  useEffect(() => {
    const timer = setInterval(() => {
      setProcessedTodayCumulative(prev => prev + Math.floor(Math.random() * 2) + 1);
      setRevenueTodayCumulative(prev => prev + Math.floor(Math.random() * 15) + 5);
      
      // Generate simulated ledger blocks randomly
      if (Math.random() > 0.7) {
        const randomActions = [
          `Approved Manifest Hash at ${CHECKPOINTS[Math.floor(Math.random() * CHECKPOINTS.length)].name.en}`,
          `Anti-Money Laundering verification passed - CBS Portal sync`,
          `Authorized clearance cert signed via federal token key-pair`,
          `Secure state ledger commit verified globally`
        ];
        const newBlock = {
          block: ledgerBlocks[0].block + 1,
          hash: '0000' + Math.random().toString(16).substring(2, 12),
          action: randomActions[Math.floor(Math.random() * randomActions.length)],
          status: 'Secured'
        };
        setLedgerBlocks(prev => [newBlock, ...prev.slice(0, 4)]);
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [ledgerBlocks]);

  return {
    ledgerBlocks,
    setLedgerBlocks,
    uptime,
    setUptime,
    simulationSpeed,
    setSimulationSpeed,
    processedTodayCumulative,
    revenueTodayCumulative
  };
}
