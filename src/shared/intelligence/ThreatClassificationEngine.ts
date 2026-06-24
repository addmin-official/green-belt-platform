import { ThreatEvent } from './NationalThreatTypes';

export type SecurityDomainClass = 'SovereignIntrusion' | 'FiscalFraud' | 'AdministrativeAnomalies' | 'OperationalDisruption';

export class ThreatClassificationEngine {
  public static classify(event: ThreatEvent): {
    domainClass: SecurityDomainClass;
    requiredClearance: 'unclassified' | 'confidential' | 'secret' | 'top-secret';
    automatedActionKu: string;
  } {
    if (event.sourceDomain === 'border' || event.sourceDomain === 'security') {
      return {
        domainClass: 'SovereignIntrusion',
        requiredClearance: 'top-secret',
        automatedActionKu: 'بەرپەرچدانەوەی ئۆپەراسیۆنی خێرا و ئاگادارکردنەوەی فەرماندەی هێزی هاوبەش'
      };
    }

    if (event.sourceDomain === 'customs' || event.sourceDomain === 'revenue' || event.sourceDomain === 'trade') {
      return {
        domainClass: 'FiscalFraud',
        requiredClearance: 'secret',
        automatedActionKu: 'ڕاوەستاندنی ڕێکارەکانی گومرگی و بلۆککردنی کاتی کۆد و مۆڵەتەکانی گواستنەوە'
      };
    }

    if (event.sourceDomain === 'integrity' || event.sourceDomain === 'workforce') {
      return {
        domainClass: 'AdministrativeAnomalies',
        requiredClearance: 'confidential',
        automatedActionKu: 'ڕەوانەکردنی ڕاستەوخۆ بۆ لێکۆڵینەوە لە بەشی نزاهەت و ڕاگرتنی فەرمانبەری گوماناوی'
      };
    }

    return {
      domainClass: 'OperationalDisruption',
      requiredClearance: 'unclassified',
      automatedActionKu: 'پەسەندکردنی دووبارەی لۆگەکانی چوونەژوورەوە و پشکنینی ڕایەڵەی ئامێرە متمانەپێکراوەکان'
    };
  }
}
