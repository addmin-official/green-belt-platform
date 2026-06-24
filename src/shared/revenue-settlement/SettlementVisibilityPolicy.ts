import { SettlementStatus } from './FiscalSettlementTypes';

/**
 * @file SettlementVisibilityPolicy.ts
 * @description سیاسەتی فەرمی جیاکردنەوەی زانیارییەکان و سنووری بینین.
 * ڕێگە نادات هیچ بەڕێوەبەرێکی گشتی یان ئەدمینێکی تەکنیکی دەسەڵاتی تێپەڕاندنی بینینی داتای خاوی کەی جی هەبێت لە ناو زۆنی فیدراڵدا.
 */

export type UserRoleType = 'ADMIN' | 'TECHNICAL_ADMINISTRATOR' | 'OPERATOR' | 'VIEWER';
export type JurisdictionZoneType = 'KURDISTAN_REGION' | 'FEDERAL_IRAQ' | 'JOINT_ZONE';

export class SettlementVisibilityPolicy {
  /**
   * کەی جی دەتوانێت داتای خاوی داهاتی خۆی ببینێت تەنها لە زۆنی کەی جی
   */
  public static canViewRawKrgRevenue(
    viewerJurisdiction: 'KRG' | 'FEDERAL' | 'JOINT',
    currentZone: 'KRG' | 'FEDERAL' | 'JOINT'
  ): boolean {
    // KRG can view raw KRG revenue within KRG zone
    return viewerJurisdiction === 'KRG' && currentZone === 'KRG';
  }

  /**
   * فیدراڵ ناتوانێت هیچ کات داتای خاوی داهاتی کەی جی ببینێت
   */
  public static canFederalViewRawKrgRevenue(): boolean {
    return false; // Federal cannot view raw KRG revenue. Under any circumstances it remains false.
  }

  /**
   * فیدراڵ دەتوانێت پێداچوونەوە بکات بە کورتەی فەرمی پاش پەسەندکردن گەر سیاسەت ڕێگەی پێ بدات
   */
  public static canFederalViewApprovedSummary(
    policyAllows: boolean,
    status: SettlementStatus
  ): boolean {
    // Federal can view approved settlement summaries only if policy allows and status is calculated/approved/etc.
    const isApprovedOrPast = [
      'APPROVED',
      'TRANSFER_PENDING',
      'TRANSFER_CONFIRMED',
      'RECONCILED'
    ].includes(status);
    return policyAllows && isApprovedOrPast;
  }

  /**
   * فەرمانی بینین بۆ بەرپرسانی هاوبەش (Joint) یان سیستمەکە
   */
  public static canJointViewRawPayload(): boolean {
    return false; // Joint can view metadata/hash/status/reconciliation proof only.
  }

  /**
   * ئەو بەشانەی ئەدمین دەتوانێت بیبینێت پشکنین دەکات بۆ دڵنیابوونەوە کە ناتوانێت بلۆکەر تێپەڕێنێت
   */
  public static canAdminBypassVisibility(): boolean {
    return false; // Admin cannot bypass settlement visibility.
  }

  /**
   * ئایە بەڕێوەبەری تەکنیکی دەتوانێت داتای نوێ و کۆنفۆگەراسیۆن بشکنێت؟
   */
  public static canTechnicalAdminInspectConfig(): boolean {
    return true; // Technical Administrator can inspect configuration
  }

  public static canTechnicalAdminInspectRawPayload(): boolean {
    return false; // Technical Administrator can inspect configuration but not raw settlement payloads.
  }
}
