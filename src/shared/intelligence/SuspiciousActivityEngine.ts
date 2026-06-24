import { ThreatEvent } from './NationalThreatTypes';
import { NationalIntelligenceRegistry } from './NationalIntelligenceRegistry';

export class SuspiciousActivityEngine {
  public static scanSystemActivityLog(activities: Array<{
    userId: string;
    ipAddress: string;
    location: string;
    action: string;
    hourLocal24: number;
  }>): ThreatEvent[] {
    const generatedThreats: ThreatEvent[] = [];

    activities.forEach(act => {
      // 1. Off-hours administration (between 23:00 and 04:00)
      if (act.hourLocal24 >= 23 || act.hourLocal24 <= 4) {
        if (act.action.includes('CLEAR') || act.action.includes('MODIFY') || act.action.includes('BYPASS')) {
          generatedThreats.push({
            id: `TE-SUSP-${Math.floor(100 + Math.random() * 900)}`,
            sourceDomain: 'rbac',
            jurisdiction: 'joint',
            titleEn: "Off-Hours Critical System Action",
            titleKu: "کارکردنی سیستمی هەستیار لە دەرەوەی کاتی فەرمی",
            descriptionEn: `Suspicious activity: User ${act.userId} initiated critical bypass action [${act.action}] at hour ${act.hourLocal24} from IP ${act.ipAddress}.`,
            descriptionKu: `چالاکی گوماناوی: بەرکارهێنەر ${act.userId} لە کایەی ${act.location} کاتی کارکردنی پەرش وبڵاو [${act.action}] جێبەجێکرد لە ژمارە ئایپی ${act.ipAddress}.`,
            indicatorWeight: 45,
            timestamp: new Date().toISOString(),
            sealedHash: 'STL-PENDING',
            associatedEntities: [act.userId]
          });
        }
      }
    });

    return generatedThreats;
  }
}
