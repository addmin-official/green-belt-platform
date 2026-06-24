import { TradePartner } from './TradeTypes';

export class TradePartnerRegistry {
  private static partners: TradePartner[] = [
    { id: 'PRT-DE-HAM', name: 'Port of Hamburg', type: 'PORT', countryCode: 'DE', reliabilityRating: 98, isSanctioned: false },
    { id: 'PRT-NL-ROT', name: 'Port of Rotterdam', type: 'PORT', countryCode: 'NL', reliabilityRating: 99, isSanctioned: false },
    { id: 'PRT-AE-JBL', name: 'Jebel Ali Port', type: 'PORT', countryCode: 'AE', reliabilityRating: 96, isSanctioned: false },
    { id: 'PRT-TR-MERS', name: 'Port of Mersin', type: 'PORT', countryCode: 'TR', reliabilityRating: 91, isSanctioned: false },
    { id: 'PRT-CN-SHG', name: 'Port of Shanghai', type: 'PORT', countryCode: 'CN', reliabilityRating: 95, isSanctioned: false },
    
    { id: 'CO-CN-SINO', name: 'Sinotech Industrial Group', type: 'BILATERAL_AGENCY', countryCode: 'CN', reliabilityRating: 88, isSanctioned: false },
    { id: 'CO-IR-VARA', name: 'Varamin Agri Export Co.', type: 'BILATERAL_AGENCY', countryCode: 'IR', reliabilityRating: 75, isSanctioned: false },
    { id: 'CO-CH-PHAR', name: 'Novavaxis Biotech Zug', type: 'BILATERAL_AGENCY', countryCode: 'CH', reliabilityRating: 97, isSanctioned: false },
    { id: 'CO-X-SANC1', name: 'Quds Freight Forwarders', type: 'EXPRESS_CARRIER', countryCode: 'IR', reliabilityRating: 15, isSanctioned: true },
    { id: 'CO-X-SANC2', name: 'Anatolia Black Sea Logistics', type: 'EXPRESS_CARRIER', countryCode: 'TR', reliabilityRating: 42, isSanctioned: true },
    
    { id: 'AUTH-UN-ESCWA', name: 'UN ESCWA Trade Council', type: 'BILATERAL_AGENCY', countryCode: 'X', reliabilityRating: 100, isSanctioned: false },
    { id: 'AUTH-JO-GATE', name: 'Jordan National Customs Liaison', type: 'BILATERAL_AGENCY', countryCode: 'JO', reliabilityRating: 89, isSanctioned: false }
  ];

  public static getAllPartners(): TradePartner[] {
    return [...this.partners];
  }

  public static getPartnerById(id: string): TradePartner | undefined {
    return this.partners.find(u => u.id === id);
  }

  public static registerPartner(partner: Omit<TradePartner, 'id'>): TradePartner {
    const newPartner: TradePartner = {
      id: `PRT-${partner.countryCode}-${Math.floor(100 + Math.random() * 899)}`,
      ...partner
    };
    this.partners.push(newPartner);
    return newPartner;
  }

  public static toggleSanctionStatus(id: string): boolean {
    const p = this.partners.find(u => u.id === id);
    if (p) {
      p.isSanctioned = !p.isSanctioned;
      return true;
    }
    return false;
  }

  public static updateReliability(id: string, score: number): boolean {
    const p = this.partners.find(u => u.id === id);
    if (p && score >= 0 && score <= 100) {
      p.reliabilityRating = score;
      return true;
    }
    return false;
  }
}
