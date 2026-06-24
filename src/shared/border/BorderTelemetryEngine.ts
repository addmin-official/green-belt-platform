import { BorderTelemetryPing, BorderGate, BorderJurisdiction } from './BorderTypes';
import { BorderGateRegistry } from './BorderGateRegistry';
import { BorderAuditEngine } from './BorderAuditEngine';

export class BorderTelemetryEngine {
  private static sensors: BorderTelemetryPing[] = [
    {
      id: 'SNS-CCTV-001',
      gateId: 'BG-IBRAHIMKHALIL',
      timestamp: '2026-06-09T09:20:00Z',
      sensorType: 'CCTV',
      sensorStatus: 'ONLINE',
      reading: '| چاودێری ڕاستەوخۆ چالاکە - هیچ لادانێک نییە',
      jurisdiction: 'JOINT',
      ownership: 'JOINT',
      authority: 'Joint Federal-Region Border Operations Committee',
      visibility: 'PUBLIC',
      accessPolicy: 'LEVEL-4-JOINT'
    },
    {
      id: 'SNS-ANPR-002',
      gateId: 'BG-IBRAHIMKHALIL',
      timestamp: '2026-06-09T09:21:00Z',
      sensorType: 'ANPR_CAMERA',
      sensorStatus: 'ONLINE',
      reading: '| خوێندنەوەی پلێتی بارهەڵگرەکان بەردەوامە (IQ-ERB-92817)',
      jurisdiction: 'JOINT',
      ownership: 'JOINT',
      authority: 'Joint Federal-Region Border Operations Committee',
      visibility: 'PUBLIC',
      accessPolicy: 'LEVEL-4-JOINT'
    },
    {
      id: 'SNS-RAD-003',
      gateId: 'BG-UMMQASR',
      timestamp: '2026-06-09T09:18:00Z',
      sensorType: 'RADIATION_DETECTOR',
      sensorStatus: 'ONLINE',
      reading: '| ڕێژەی تیشکدانەوە ئاساییە: 0.12 μSv/h',
      jurisdiction: 'FEDERAL',
      ownership: 'FEDERAL_IRAQ',
      authority: 'Federal Border Ports Commission / Basra',
      visibility: 'RESTRICTED',
      accessPolicy: 'LEVEL-5-SECURE'
    },
    {
      id: 'SNS-SCALE-004',
      gateId: 'BG-PARWIZKHAN',
      timestamp: '2026-06-09T09:05:00Z',
      sensorType: 'WEIGH_SCALE',
      sensorStatus: 'ONLINE',
      reading: '| تەرازووی کارگۆی باکوور چالاکە - نێوەندی کێش: ٣٤.٥ تۆن',
      jurisdiction: 'JOINT',
      ownership: 'JOINT',
      authority: 'Joint Border Directorate / KRG-Federal',
      visibility: 'PUBLIC',
      accessPolicy: 'LEVEL-4-JOINT'
    },
    {
      id: 'SNS-CCTV-005',
      gateId: 'BG-ERBIL-AIRPORT',
      timestamp: '2026-06-09T09:10:00Z',
      sensorType: 'CCTV',
      sensorStatus: 'ONLINE',
      reading: '| کامێرای سەرەکی هۆڵی پێشوازی گەشتیاران چاودێری دەکات',
      jurisdiction: 'KRG',
      ownership: 'KRG',
      authority: 'KRG Ministry of Interior - Airport Security Control',
      visibility: 'RESTRICTED',
      accessPolicy: 'LEVEL-3-REGIONAL'
    }
  ];

  public static getSensors(gateId?: string): BorderTelemetryPing[] {
    if (gateId) {
      return this.sensors.filter(s => s.gateId === gateId);
    }
    return [...this.sensors];
  }

  public static updateSensorStatus(
    id: string,
    status: BorderTelemetryPing['sensorStatus'],
    reading: string,
    actor: string
  ): BorderTelemetryPing {
    const sensor = this.sensors.find(s => s.id === id);
    if (!sensor) {
      throw new Error(`Sensor ${id} not found.`);
    }

    sensor.sensorStatus = status;
    sensor.reading = reading;
    sensor.timestamp = new Date().toISOString();

    BorderAuditEngine.appendRecord(
      'UPDATE_SENSOR',
      actor,
      `State change of sensor ${id} (${sensor.sensorType}) to ${status}. Live reading: ${reading}`,
      sensor.jurisdiction,
      sensor.ownership,
      sensor.authority,
      sensor.visibility,
      sensor.accessPolicy
    );

    return sensor;
  }
}
