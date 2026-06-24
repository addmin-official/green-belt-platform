export interface OrganizationUnit {
  id: string;
  nameKu: string;
  nameEn: string;
  parentOrg: 'FEDERAL_IRAQ' | 'KRG' | 'JOINT_OPERATIONS';
  directorate: string;
  department: string;
  unit: string;
  headPosition: string;
}

export const SOVEREIGN_ORGANIZATION_UNITS: OrganizationUnit[] = [
  // Federal Iraq
  {
    id: 'ORG-FED-01',
    nameKu: 'سەرۆکایەتی دیوانی ئەنجومەنی وەزیرانی فیدراڵ',
    nameEn: 'Federal Secretariat General of the Council of Ministers (Cabinet)',
    parentOrg: 'FEDERAL_IRAQ',
    directorate: 'Cabinet Diwan',
    department: 'Policy Secretariat',
    unit: 'Executive Sovereign Unit',
    headPosition: 'Cabinet Secretary General',
  },
  {
    id: 'ORG-FED-02',
    nameKu: 'بەڕێوەبەرایەتی گشتی پاسەوانی سنووری فیدراڵ',
    nameEn: 'General Directorate of Federal Border Guards',
    parentOrg: 'FEDERAL_IRAQ',
    directorate: 'Border Security Command',
    department: 'Border Points Administration',
    unit: 'Strategic Crossings Unit',
    headPosition: 'General Commander',
  },
  {
    id: 'ORG-FED-03',
    nameKu: 'دەستەی گشتی گومرگەکانی فیدراڵ',
    nameEn: 'Federal General Commission for Customs',
    parentOrg: 'FEDERAL_IRAQ',
    directorate: 'Customs Administration & Tariff Control',
    department: 'Tariff & Audit Directorate',
    unit: 'Umm Qasr Audit Base',
    headPosition: 'Director General of Customs',
  },
  {
    id: 'ORG-FED-04',
    nameKu: 'فەرمانگەی گشتی باجەکانی کۆماری عێراق',
    nameEn: 'Federal General Commission for Taxes & Revenue',
    parentOrg: 'FEDERAL_IRAQ',
    directorate: 'Sovereign Treasury Collections',
    department: 'Corporate Auditing',
    unit: 'Financial Audit Division',
    headPosition: 'Director of Federal Revenue',
  },
  {
    id: 'ORG-FED-05',
    nameKu: 'دیوانی چاودێری دارایی فیدراڵی',
    nameEn: 'Federal Board of Supreme Audit',
    parentOrg: 'FEDERAL_IRAQ',
    directorate: 'National Audit & Supervision',
    department: 'Petrochemical & Customs Audit',
    unit: 'Sovereign Audit Ledger',
    headPosition: 'Auditor General of Federal Iraq',
  },

  // KRG
  {
    id: 'ORG-KRG-01',
    nameKu: 'دیوانی سەرۆکایەتی ئەنجومەنی وەزیرانی هەرێمی کوردستان',
    nameEn: 'KRG Council of Ministers Secretariat',
    parentOrg: 'KRG',
    directorate: 'High Secretariat of Cabinet',
    department: 'Regional Coordination Council',
    unit: 'Ministerial Secretariat',
    headPosition: 'High Cabinet Director',
  },
  {
    id: 'ORG-KRG-02',
    nameKu: 'بەڕێوەبەرایەتی پاراستنی سنووری هەرێمی کوردستان',
    nameEn: 'Kurdistan Regional Border Guard Command',
    parentOrg: 'KRG',
    directorate: 'Regional Security Council',
    department: 'Peshmerga Border Guard Brigade',
    unit: 'Northern Crossings Guard Unit',
    headPosition: 'Regional Border Commander',
  },
  {
    id: 'ORG-KRG-03',
    nameKu: 'بەڕێوەبەرایەتی گشتی گومرگەکانی کوردستان',
    nameEn: 'KRG General Customs Directorate',
    parentOrg: 'KRG',
    directorate: 'Customs Operations Office',
    department: 'Regional Tariffs Division',
    unit: 'Ibrahim Khalil Operations Center',
    headPosition: 'Director of KRG Customs Control',
  },
  {
    id: 'ORG-KRG-04',
    nameKu: 'دیوانی باڵای چاودێری دارایی هەرێمی کوردستان',
    nameEn: 'KRG Supreme Board of Audit & Transparency',
    parentOrg: 'KRG',
    directorate: 'Regional Financial Review Command',
    department: 'Public Revenue Audit Office',
    unit: 'Erbil Ledger Verification Division',
    headPosition: 'Auditor General of Kurdistan',
  },

  // Joint Operations
  {
    id: 'ORG-JNT-01',
    nameKu: 'ئەنجومەنی هەماهەنگی هاوبەشی فیدراڵ و هەرێم',
    nameEn: 'Joint Federal-Regional Coordination Council',
    parentOrg: 'JOINT_OPERATIONS',
    directorate: 'Joint Command Secretariat',
    department: 'Customs Interoperability Division',
    unit: 'Joint Operations Room',
    headPosition: 'Joint Executive Coordinator',
  },
  {
    id: 'ORG-JNT-02',
    nameKu: 'لیژنەی نیشتمانی هاوبەشی داهاتی خاڵە سنوورییەکان',
    nameEn: 'Joint Sovereign Border Revenue Board',
    parentOrg: 'JOINT_OPERATIONS',
    directorate: 'Financial Harmonization Board',
    department: 'Inter-governmental Reconciliation Desk',
    unit: 'Tariff Equalization Staff',
    headPosition: 'Technical Chairman of Board',
  }
];

export class GovernmentOrganizationRegistry {
  public static getUnitsByOrg(org: 'FEDERAL_IRAQ' | 'KRG' | 'JOINT_OPERATIONS'): OrganizationUnit[] {
    return SOVEREIGN_ORGANIZATION_UNITS.filter(u => u.parentOrg === org);
  }

  public static getUnitById(id: string): OrganizationUnit | undefined {
    return SOVEREIGN_ORGANIZATION_UNITS.find(u => u.id === id);
  }
}
