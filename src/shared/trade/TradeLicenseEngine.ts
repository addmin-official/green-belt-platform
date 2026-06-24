import { TradeLicense, TradeLicenseType, LicenseStatus, Jurisdiction } from './TradeTypes';

export class TradeLicenseEngine {
  private static licenses: TradeLicense[] = [
    // Federal
    {
      licenseNumber: 'LIC-FED-IMP-2001',
      holderId: 'IMP-FED-001',
      holderName: 'Baghdad National Import & Supply Co.',
      type: 'IMPORT_LICENSE',
      issueDate: new Date(Date.now() - 3600000 * 24 * 300).toISOString(),
      expiryDate: new Date(Date.now() + 3600000 * 24 * 65).toISOString(),
      status: 'ACTIVE',
      jurisdiction: 'federal',
      authorizedCommodities: ['10011900', '87032330', '30049000'],
      approvedQuotaUSD: 25000000,
      exhaustedQuotaUSD: 14500000
    },
    {
      licenseNumber: 'LIC-FED-EXP-2002',
      holderId: 'EXP-FED-002',
      holderName: 'Basra Agricultural Export Guild',
      type: 'EXPORT_LICENSE',
      issueDate: new Date(Date.now() - 3600000 * 24 * 100).toISOString(),
      expiryDate: new Date(Date.now() + 3600000 * 24 * 265).toISOString(),
      status: 'ACTIVE',
      jurisdiction: 'federal',
      authorizedCommodities: ['10011900'],
      approvedQuotaUSD: 8000000,
      exhaustedQuotaUSD: 1200000
    },
    {
      licenseNumber: 'LIC-FED-SPC-2003',
      holderId: 'IMP-FED-003',
      holderName: 'Mesopotamia Mining Enterprises',
      type: 'SPECIAL_LICENSE',
      issueDate: new Date(Date.now() - 3600000 * 24 * 400).toISOString(),
      expiryDate: new Date(Date.now() - 3600000 * 24 * 35).toISOString(), // EXPIRED
      status: 'EXPIRED',
      jurisdiction: 'federal',
      authorizedCommodities: ['36020000'],
      approvedQuotaUSD: 5000000,
      exhaustedQuotaUSD: 5000000
    },
    // KRG
    {
      licenseNumber: 'LIC-KRG-IMP-5001',
      holderId: 'IMP-KRG-001',
      holderName: 'Erbil Food & Grain Distribution Inc.',
      type: 'IMPORT_LICENSE',
      issueDate: new Date(Date.now() - 3600000 * 24 * 180).toISOString(),
      expiryDate: new Date(Date.now() + 3600000 * 24 * 185).toISOString(),
      status: 'ACTIVE',
      jurisdiction: 'krg',
      authorizedCommodities: ['10011900', '30049000'],
      approvedQuotaUSD: 12000000,
      exhaustedQuotaUSD: 8300000
    },
    {
      licenseNumber: 'LIC-KRG-TRN-5002',
      holderId: 'TRN-KRG-002',
      holderName: 'Slemani Caucasus Transit Transit Ltd',
      type: 'TRANSIT_LICENSE',
      issueDate: new Date(Date.now() - 3600000 * 24 * 50).toISOString(),
      expiryDate: new Date(Date.now() + 3600000 * 24 * 315).toISOString(),
      status: 'ACTIVE',
      jurisdiction: 'krg',
      authorizedCommodities: ['87032330', '85176200', '38249992'],
      approvedQuotaUSD: 30000000,
      exhaustedQuotaUSD: 4100000
    },
    {
      licenseNumber: 'LIC-KRG-SPC-5003',
      holderId: 'IMP-KRG-003',
      holderName: 'KRG Telecom Infrastructure Group',
      type: 'SPECIAL_LICENSE',
      issueDate: new Date(Date.now() - 3600000 * 24 * 10).toISOString(),
      expiryDate: new Date(Date.now() + 3600000 * 24 * 355).toISOString(),
      status: 'SUSPENDED',
      jurisdiction: 'krg',
      authorizedCommodities: ['85176200', '88022000'],
      approvedQuotaUSD: 15000000,
      exhaustedQuotaUSD: 150000
    }
  ];

  public static getLicensesByJurisdiction(j: Jurisdiction): TradeLicense[] {
    return this.licenses.filter(l => l.jurisdiction === j);
  }

  public static getLicense(licenseNumber: string): TradeLicense | undefined {
    return this.licenses.find(l => l.licenseNumber === licenseNumber);
  }

  public static issueLicense(data: Omit<TradeLicense, 'licenseNumber' | 'status' | 'exhaustedQuotaUSD'>): TradeLicense {
    const idNum = Math.floor(1000 + Math.random() * 8999);
    const code = data.jurisdiction === 'federal' ? 'FED' : 'KRG';
    const typeAbbr = data.type === 'IMPORT_LICENSE' ? 'IMP' :
                     data.type === 'EXPORT_LICENSE' ? 'EXP' :
                     data.type === 'TRANSIT_LICENSE' ? 'TRN' : 'SPC';

    const licenseNumber = `LIC-${code}-${typeAbbr}-${idNum}`;

    const newLicense: TradeLicense = {
      licenseNumber,
      status: 'ACTIVE',
      exhaustedQuotaUSD: 0,
      ...data
    };

    this.licenses.unshift(newLicense);
    return newLicense;
  }

  public static renewLicense(licenseNumber: string, addedDays: number): boolean {
    const l = this.licenses.find(license => license.licenseNumber === licenseNumber);
    if (l) {
      const currentExpiry = new Date(l.expiryDate).getTime();
      const newExpiryTime = currentExpiry > Date.now() ? currentExpiry + (addedDays * 24 * 3600000) : Date.now() + (addedDays * 24 * 3600000);
      l.expiryDate = new Date(newExpiryTime).toISOString();
      l.status = 'ACTIVE';
      return true;
    }
    return false;
  }

  public static suspendLicense(licenseNumber: string): boolean {
    const l = this.licenses.find(license => license.licenseNumber === licenseNumber);
    if (l) {
      l.status = 'SUSPENDED';
      return true;
    }
    return false;
  }

  public static revokeLicense(licenseNumber: string): boolean {
    const l = this.licenses.find(license => license.licenseNumber === licenseNumber);
    if (l) {
      l.status = 'REVOKED';
      return true;
    }
    return false;
  }

  public static validateLicense(licenseNumber: string, amountUSD: number, hsCode: string): {
    isValid: boolean;
    reason?: string;
  } {
    const l = this.licenses.find(license => license.licenseNumber === licenseNumber);
    if (!l) {
      return { isValid: false, reason: 'License not found in sovereign databases.' };
    }
    if (l.status !== 'ACTIVE') {
      return { isValid: false, reason: `License status is ${l.status}. Operations restricted.` };
    }
    if (new Date(l.expiryDate).getTime() < Date.now()) {
      l.status = 'EXPIRED';
      return { isValid: false, reason: 'License validity period expired.' };
    }
    if (l.exhaustedQuotaUSD + amountUSD > l.approvedQuotaUSD) {
      return { isValid: false, reason: 'Insufficient quota capacity remaining.' };
    }
    if (l.authorizedCommodities.length > 0 && !l.authorizedCommodities.includes(hsCode)) {
      return { isValid: false, reason: `HS Code ${hsCode} is not authorized under this specific license.` };
    }

    return { isValid: true };
  }

  public static captureQuota(licenseNumber: string, amountUSD: number): boolean {
    const l = this.licenses.find(license => license.licenseNumber === licenseNumber);
    if (l && l.status === 'ACTIVE' && l.exhaustedQuotaUSD + amountUSD <= l.approvedQuotaUSD) {
      l.exhaustedQuotaUSD += amountUSD;
      return true;
    }
    return false;
  }
}
