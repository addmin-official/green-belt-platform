export enum SovereignPermission {
  VIEW_FEDERAL_CUSTOMS = 'VIEW_FEDERAL_CUSTOMS',
  WRITE_FEDERAL_CUSTOMS = 'WRITE_FEDERAL_CUSTOMS',
  APPROVE_FEDERAL_CUSTOMS = 'APPROVE_FEDERAL_CUSTOMS',

  VIEW_FEDERAL_REVENUE = 'VIEW_FEDERAL_REVENUE',
  WRITE_FEDERAL_REVENUE = 'WRITE_FEDERAL_REVENUE',

  VIEW_FEDERAL_TRADE = 'VIEW_FEDERAL_TRADE',
  WRITE_FEDERAL_TRADE = 'WRITE_FEDERAL_TRADE',

  VIEW_KRG_CUSTOMS = 'VIEW_KRG_CUSTOMS',
  WRITE_KRG_CUSTOMS = 'WRITE_KRG_CUSTOMS',
  APPROVE_KRG_CUSTOMS = 'APPROVE_KRG_CUSTOMS',

  VIEW_KRG_REVENUE = 'VIEW_KRG_REVENUE',
  WRITE_KRG_REVENUE = 'WRITE_KRG_REVENUE',

  VIEW_KRG_TRADE = 'VIEW_KRG_TRADE',
  WRITE_KRG_TRADE = 'WRITE_KRG_TRADE',

  VIEW_JOINT_DATA = 'VIEW_JOINT_DATA',
  RECONCILE_JOINT_DATA = 'RECONCILE_JOINT_DATA',

  PERFORM_SOVEREIGN_AUDIT = 'PERFORM_SOVEREIGN_AUDIT',
  INITIATE_INVESTIGATION = 'INITIATE_INVESTIGATION',

  DECREE_ISSUANCE = 'DECREE_ISSUANCE',
  WORKFORCE_HIRE_TRANSFER = 'WORKFORCE_HIRE_TRANSFER',
  SECURITY_INTEGRITY_VIEW = 'SECURITY_INTEGRITY_VIEW'
}

export const PERMISSION_DESCRIPTIONS: Record<SovereignPermission, { nameKu: string; nameEn: string }> = {
  [SovereignPermission.VIEW_FEDERAL_CUSTOMS]: { nameKu: 'بینینی گومرگی فیدراڵ', nameEn: 'View Federal Customs Declarations' },
  [SovereignPermission.WRITE_FEDERAL_CUSTOMS]: { nameKu: 'تۆمارکردنی گومرگی فیدراڵ', nameEn: 'Write Federal Customs Records' },
  [SovereignPermission.APPROVE_FEDERAL_CUSTOMS]: { nameKu: 'پەسەندکردنی گومرگی فیدراڵ', nameEn: 'Approve Federal Customs' },

  [SovereignPermission.VIEW_FEDERAL_REVENUE]: { nameKu: 'بینینی داهاتی فیدراڵ', nameEn: 'View Federal Revenue Accounts' },
  [SovereignPermission.WRITE_FEDERAL_REVENUE]: { nameKu: 'تۆمارکردنی داهاتی فیدراڵ', nameEn: 'Write Federal Revenue Ledger' },

  [SovereignPermission.VIEW_FEDERAL_TRADE]: { nameKu: 'بینینی مۆڵەتی بازرگانی فیدراڵ', nameEn: 'View Federal Trade Licenses' },
  [SovereignPermission.WRITE_FEDERAL_TRADE]: { nameKu: 'دەرکردنی مۆڵەتی بازرگانی فیدراڵ', nameEn: 'Issue Federal Trade Licenses' },

  [SovereignPermission.VIEW_KRG_CUSTOMS]: { nameKu: 'بینینی گومرگی هەرێمی کوردستان', nameEn: 'View KRG Customs Declarations' },
  [SovereignPermission.WRITE_KRG_CUSTOMS]: { nameKu: 'تۆمارکردنی گومرگی هەرێمی کوردستان', nameEn: 'Write KRG Customs Records' },
  [SovereignPermission.APPROVE_KRG_CUSTOMS]: { nameKu: 'پەسەندکردنی گومرگی هەرێمی کوردستان', nameEn: 'Approve KRG Customs' },

  [SovereignPermission.VIEW_KRG_REVENUE]: { nameKu: 'بینینی داهاتی هەرێمی کوردستان', nameEn: 'View KRG Revenue Accounts' },
  [SovereignPermission.WRITE_KRG_REVENUE]: { nameKu: 'تۆمارکردنی داهاتی هەرێمی کوردستان', nameEn: 'Write KRG Revenue Ledger' },

  [SovereignPermission.VIEW_KRG_TRADE]: { nameKu: 'بینینی مۆڵەتی بازرگانی هەرێم', nameEn: 'View KRG Trade Licenses' },
  [SovereignPermission.WRITE_KRG_TRADE]: { nameKu: 'دەرکردنی مۆڵەتی بازرگانی هەرێم', nameEn: 'Issue KRG Trade Licenses' },

  [SovereignPermission.VIEW_JOINT_DATA]: { nameKu: 'بینینی داتای هاوبەش', nameEn: 'View Joint Operation Reconciled Datasets' },
  [SovereignPermission.RECONCILE_JOINT_DATA]: { nameKu: 'هاوتاکردنی داتای هاوبەش', nameEn: 'Reconcile Joint Customs and Revenue' },

  [SovereignPermission.PERFORM_SOVEREIGN_AUDIT]: { nameKu: 'وردبینی دەوڵەت و فیدراڵ', nameEn: 'Perform Sovereign Integrity Audit' },
  [SovereignPermission.INITIATE_INVESTIGATION]: { nameKu: 'دەستپێکردنی لێکۆڵینەوە', nameEn: 'Initiate Public Corruption Auditing' },

  [SovereignPermission.DECREE_ISSUANCE]: { nameKu: 'دەرکردنی بڕیاری فەرمی دەوڵەت', nameEn: 'Issue Sovereign Cabinet Decrees' },
  [SovereignPermission.WORKFORCE_HIRE_TRANSFER]: { nameKu: 'بەڕێوەبردنی هێزی کار', nameEn: 'Govern Workforce Appointments & Transfers' },
  [SovereignPermission.SECURITY_INTEGRITY_VIEW]: { nameKu: 'بینینی دۆخی ئاسایش و لادانی کارگێڕی', nameEn: 'Monitor Security Incidents & Violations' }
};
