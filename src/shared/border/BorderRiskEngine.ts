import { BorderRiskAlert, BorderGate } from './BorderTypes';
import { BorderGateRegistry } from './BorderGateRegistry';
import { BorderAuditEngine } from './BorderAuditEngine';

export class BorderRiskEngine {
  private static alerts: BorderRiskAlert[] = [
    {
      id: 'ALT-RSK-92817',
      gateId: 'BG-UMMQASR',
      timestamp: '2026-06-09T08:05:00Z',
      severity: 'HIGH',
      source: '| سکانەری تیشکی دەروازەی بەلەمپی',
      description: '| جیاوازی زۆر لە کێشی ڕاستەقینە لەگەڵ مانیفێستی پێشەکەشکراوی کەرەستە پیشەسازییەکان.',
      isResolved: false,
      jurisdiction: 'FEDERAL',
      ownership: 'FEDERAL_IRAQ',
      authority: 'Federal Border Ports Commission / Basra',
      visibility: 'RESTRICTED',
      accessPolicy: 'LEVEL-5-SECURE'
    },
    {
      id: 'ALT-RSK-10294',
      gateId: 'BG-IBRAHIMKHALIL',
      timestamp: '2026-06-09T08:50:00Z',
      severity: 'CRITICAL',
      source: '| سیستەمی بێ تەل دژە تیشك',
      description: '| نیشاندەری بەرزبوونەوەی لەناکاوی ڕێژەی تیشکی گاما لە کامیۆنێکی بارهەڵگری کۆنکرێتی.',
      isResolved: false,
      jurisdiction: 'JOINT',
      ownership: 'JOINT',
      authority: 'Joint Federal-Region Border Operations Committee',
      visibility: 'SECRET',
      accessPolicy: 'LEVEL-4-JOINT'
    },
    {
      id: 'ALT-RSK-48192',
      gateId: 'BG-ZURBATIYAH',
      timestamp: '2026-06-09T09:05:00Z',
      severity: 'MEDIUM',
      source: '| نیشاندەری چوونەژوورەوەی لۆرییەکان',
      description: '| ناسنامەی کۆنی لۆرییەک مۆڵەتەکەی بەسەرچووە بەپێی تۆڕی نیشتمانی گومرگ.',
      isResolved: true,
      jurisdiction: 'FEDERAL',
      ownership: 'FEDERAL_IRAQ',
      authority: 'Federal Border Ports Commission / Wasit Sector',
      visibility: 'PUBLIC',
      accessPolicy: 'LEVEL-5-SECURE'
    }
  ];

  public static getAlerts(gateId?: string): BorderRiskAlert[] {
    if (gateId) {
      return this.alerts.filter(a => a.gateId === gateId);
    }
    return [...this.alerts];
  }

  public static triggerAlert(
    alert: Omit<BorderRiskAlert, 'id' | 'timestamp' | 'isResolved'>,
    actor: string
  ): BorderRiskAlert {
    const gate = BorderGateRegistry.getGateById(alert.gateId);
    if (!gate) {
      throw new Error(`Gate not found for risk alert: ${alert.gateId}`);
    }

    const id = `ALT-RSK-${Math.floor(10000 + Math.random() * 90000)}`;
    const timestamp = new Date().toISOString();

    const newAlert: BorderRiskAlert = {
      ...alert,
      id,
      timestamp,
      isResolved: false
    };

    this.alerts.push(newAlert);

    // Increase risk score of the gate significantly based on severity
    let penalty = 5;
    if (alert.severity === 'HIGH') penalty = 15;
    if (alert.severity === 'CRITICAL') penalty = 30;
    BorderGateRegistry.updateRiskScore(gate.id, Math.min(100, gate.currentRiskScore + penalty));

    BorderAuditEngine.appendRecord(
      'TRIGGER_RISK_ALERT',
      actor,
      `Triggered ${alert.severity} risk alert (ID: ${id}) at gate ${gate.name}. Detail: ${alert.description}`,
      newAlert.jurisdiction,
      newAlert.ownership,
      newAlert.authority,
      newAlert.visibility,
      newAlert.accessPolicy
    );

    return newAlert;
  }

  public static resolveAlert(alertId: string, actor: string): BorderRiskAlert {
    const alert = this.alerts.find(a => a.id === alertId);
    if (!alert) {
      throw new Error(`Alert id ${alertId} not found.`);
    }

    alert.isResolved = true;

    // Relieve some pressure of the gate risk rating
    const gate = BorderGateRegistry.getGateById(alert.gateId);
    if (gate) {
      let relief = 5;
      if (alert.severity === 'HIGH') relief = 12;
      if (alert.severity === 'CRITICAL') relief = 25;
      BorderGateRegistry.updateRiskScore(gate.id, Math.max(5, gate.currentRiskScore - relief));
    }

    BorderAuditEngine.appendRecord(
      'RESOLVE_RISK_ALERT',
      actor,
      `Resolved risk alert (ID: ${alertId}) at gate ${gate ? gate.name : alert.gateId}. Details updated to resolved status.`,
      alert.jurisdiction,
      alert.ownership,
      alert.authority,
      alert.visibility,
      alert.accessPolicy
    );

    return alert;
  }

  public static calculateNationalRiskIndex(): number {
    const activeAlerts = this.alerts.filter(a => !a.isResolved);
    if (activeAlerts.length === 0) return 10;
    
    // Average risk index based on active alert frequencies and weights
    let score = 15;
    activeAlerts.forEach(a => {
      if (a.severity === 'LOW') score += 2;
      if (a.severity === 'MEDIUM') score += 5;
      if (a.severity === 'HIGH') score += 15;
      if (a.severity === 'CRITICAL') score += 30;
    });

    return Math.min(100, score);
  }
}
