import { AlertSeverity } from '../intelligence/NationalThreatTypes';
import { SovereignThreatLedger } from '../intelligence/SovereignThreatLedger';

export interface DispatchAlert {
  alertId: string;
  severity: AlertSeverity;
  alertTitleKu: string;
  alertMessageKu: string;
  targetedJurisdiction: 'federal' | 'krg' | 'joint';
  acknowledgedBy: string[];
  timestamp: string;
}

export class NationalAlertEngine {
  private static alerts: DispatchAlert[] = [];

  static {
    // Baseline alert seeding
    this.alerts.push({
      alertId: "AL-EMERG-001",
      severity: "EMERGENCY",
      alertTitleKu: "ئاگادارکردنەوەی جومگەی بارودۆخی دەروازەی سنووری نیشتمانی",
      alertMessageKu: "ناڕێکی باج و مانیفێست لە سنووری پاککردنەوەی چەن شیفتێک بینراوە، پشتڕاستکردنەوە پێویستە.",
      targetedJurisdiction: "joint",
      acknowledgedBy: [],
      timestamp: new Date().toISOString()
    });
  }

  public static broadcastNationalAlert(
    severity: AlertSeverity,
    titleKu: string,
    messageKu: string,
    jurisdiction: 'federal' | 'krg' | 'joint'
  ): DispatchAlert {
    const alertId = `AL-${severity.slice(0, 5)}-${Math.floor(100 + Math.random() * 900)}`;
    const alert: DispatchAlert = {
      alertId,
      severity,
      alertTitleKu: titleKu,
      alertMessageKu: messageKu,
      targetedJurisdiction: jurisdiction,
      acknowledgedBy: [],
      timestamp: new Date().toISOString()
    };

    this.alerts.push(alert);

    // Immutable logging
    SovereignThreatLedger.sealAndPublish('alert', {
      alertId,
      severity,
      jurisdiction
    });

    return alert;
  }

  public static getAlerts(jurisdiction: 'federal' | 'krg' | 'joint'): DispatchAlert[] {
    return this.alerts.filter(x => x.targetedJurisdiction === jurisdiction || x.targetedJurisdiction === 'joint');
  }

  public static acknowledgeAlert(alertId: string, actor: string): void {
    const alert = this.alerts.find(a => a.alertId === alertId);
    if (alert && !alert.acknowledgedBy.includes(actor)) {
      alert.acknowledgedBy.push(actor);
    }
  }
}
