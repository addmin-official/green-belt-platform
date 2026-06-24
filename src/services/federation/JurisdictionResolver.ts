import { GovernmentContextType, JurisdictionType } from '../../providers/GovernmentProvider';

export class JurisdictionResolver {
  
  /**
   * وەرگێڕانی GovernmentContext-ی ڕووکار بۆ جۆرێکی لیتراڵی داتابەیسی دەسەڵاتی دادوەری (Jurisdiction)
   */
  static resolveContextToJurisdiction(context: GovernmentContextType): JurisdictionType {
    switch (context) {
      case 'FEDERAL_IRAQ':
        return 'federal';
      case 'KURDISTAN_REGION':
        return 'krg';
      case 'JOINT_OPERATIONS':
        return 'joint';
      default:
        return 'federal';
    }
  }

  /**
   * پشتڕاستکردنەوەی ئەوەی کە ئایا ڕۆڵی بەکارهێنەر لە چوارچێوەی چالاکدا ڕێگەی پێدەدرێت
   * دەستی بگات بە سەرچاوەیەک کە سەر بە دەسەڵاتێکی دیاریکراوە.
   */
  static hasAccess({
    userRole,
    activeContext,
    resourceJurisdiction,
    federationMode = 'SEPARATED'
  }: {
    userRole: string;
    activeContext: GovernmentContextType;
    resourceJurisdiction: JurisdictionType;
    federationMode: 'SEPARATED' | 'FEDERATED' | 'UNIFIED';
  }): boolean {
    
    // لە دۆخی UNIFIED، هەموو سنوورەکان نامێنن؛ هەرکەسێک متمانەی گونجاوی هەبێت دەتوانێت ببینێت
    if (federationMode === 'UNIFIED') {
      return true;
    }

    const contextJur = this.resolveContextToJurisdiction(activeContext);

    // ئەگەر لە چوارچێوەی "Joint Operations" بین، بینینی هاوبەشمان دەبێت 
    // (بەڵام یاساکانی کارکردن هەر بەکاردێن!)
    if (activeContext === 'JOINT_OPERATIONS') {
      return true;
    }

    // دۆخی SEPARATED (جیاکراوە): هیچ جۆرە دەستپێگەیشتنێکی پەڕینەوە لە سنوورەکان لە هیچ دۆخێکدا ڕێگەپێدراو نییە
    if (federationMode === 'SEPARATED') {
      return contextJur === resourceJurisdiction || resourceJurisdiction === 'joint';
    }

    // دۆخی FEDERATED (فیدراڵی): دڵنیایی دوولایەنە (Handshake) ڕێگە بە خوێندنەوە دەدات 
    // بەڵام داتاکان بە لۆژیکی جیادەهێڵێتەوە
    if (federationMode === 'FEDERATED') {
      // ڕێگە بە بینینی فیدراڵی و خۆماڵی دەدات، بەڵام گۆڕانکارییە قووڵەکان سنووردار دەکات
      return true; 
    }

    return false;
  }

  /**
   * دیاری دەکات کە ئایا ڕۆڵی بەکارهێنەری چالاک دەتوانێت بڕیارەکانی فیدراڵیزەکردن پەسەند بکات
   * (وەک پەسەندکردن یان ڕەتکردنەوە).
   */
  static canMutateFederation({
    userRole,
    activeContext,
    federationMode
  }: {
    userRole: string;
    activeContext: GovernmentContextType;
    federationMode: 'SEPARATED' | 'FEDERATED' | 'UNIFIED';
  }): boolean {
    if (federationMode === 'SEPARATED') {
      return false; // لە دۆخی جیابوونەوەی ڕەها، فیدراڵیزەکردن ناچالاک دەبێت
    }

    // ڕۆڵە باڵاکان هەمیشە دەتوانن پەسەند یان هەماهەنگی بکەن
    const lowerRole = userRole.toLowerCase();
    const isPrimeMinister = lowerRole.includes('prime') || lowerRole.includes('pm') || lowerRole.includes('minister');
    const isDirectorOrCoordinator = lowerRole.includes('director') || lowerRole.includes('coordinator') || lowerRole.includes('authority') || lowerRole.includes('arbitrator');

    return isPrimeMinister || isDirectorOrCoordinator;
  }
}