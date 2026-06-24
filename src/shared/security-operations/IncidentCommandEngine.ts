import { SovereignThreatLedger } from '../intelligence/SovereignThreatLedger';

export interface CommandDirective {
  directiveId: string;
  targetUnitId: string;
  assignedJurisdiction: 'federal' | 'krg' | 'joint';
  commandNameKu: string;
  status: 'DISPATCHED' | 'EXECUTING' | 'RESOLVED';
  initiatedBy: string;
  timestamp: string;
}

export class IncidentCommandEngine {
  private static activeDirectives: CommandDirective[] = [];

  public static dispatchEmergencyAction(params: {
    targetUnitId: string;
    jurisdiction: 'federal' | 'krg' | 'joint';
    commandNameKu: string;
    initiatedBy: string;
  }): CommandDirective {
    const directiveId = `ICE-DIR-${Math.floor(1000 + Math.random() * 9000)}`;
    const directive: CommandDirective = {
      directiveId,
      targetUnitId: params.targetUnitId,
      assignedJurisdiction: params.jurisdiction,
      commandNameKu: params.commandNameKu,
      status: 'DISPATCHED',
      initiatedBy: params.initiatedBy,
      timestamp: new Date().toISOString()
    };

    this.activeDirectives.push(directive);

    // Seal administrative response dispatch in immutable ledger
    SovereignThreatLedger.sealAndPublish('reconciliation', {
      directiveId,
      action: 'CRISIS_TACTICAL_DISPATCH',
      target: params.targetUnitId,
      actor: params.initiatedBy
    });

    return directive;
  }

  public static getDirectives(): CommandDirective[] {
    return [...this.activeDirectives];
  }

  public static updateDirectiveStatus(directiveId: string, status: CommandDirective['status']): void {
    const d = this.activeDirectives.find(x => x.directiveId === directiveId);
    if (d) {
      d.status = status;
    }
  }
}
