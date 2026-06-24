// Sovereign Digital Multi-Tenant Wallet Engine
// Represents client holder views of credentials, licenses, permits, certificates, and keys

import { VerifiableCredential, VerifiableCredentialEngine } from '../credentials';

export interface WalletIdentityAsset {
  assetId: string;
  name: string;
  category: 'TRADE_LICENSE' | 'CUSTOMS_CERTIFICATE' | 'IMPORT_PERMIT' | 'EXPORT_PERMIT' | 'TAX_CERTIFICATE' | 'IDENTITY_RECORD';
  issuerMinistry: string;
  serialNumber: string;
  issuedAt: string;
  expiresBy: string;
  secureSigningKeyAlgorithm: 'Ed25519' | 'RSA_4096_PKCS1' | 'ECDSA_P256';
  isRevoked: boolean;
}

export interface NationalSovereignWallet {
  ownerDid: string;
  ownerName: string;
  walletType: 'CITIZEN' | 'BUSINESS' | 'GOVERNMENT';
  associatedCredentials: VerifiableCredential[];
  securedAssets: WalletIdentityAsset[];
}

export class DigitalWalletManager {
  private static instance: DigitalWalletManager;
  private wallets: Map<string, NationalSovereignWallet> = new Map();

  private constructor() {
    this.seedDefaultWallets();
  }

  public static getInstance(): DigitalWalletManager {
    if (!DigitalWalletManager.instance) {
      DigitalWalletManager.instance = new DigitalWalletManager();
    }
    return DigitalWalletManager.instance;
  }

  private seedDefaultWallets() {
    const vcEngine = VerifiableCredentialEngine.getInstance();

    // 1. Citizen Wallet (Amir Al-Moussawi)
    const amirVc = vcEngine.getCredential('urn:uuid:vc-citizen-id-883190')!;
    this.wallets.set('did:idg:citizen:iq-883190', {
      ownerDid: 'did:idg:citizen:iq-883190',
      ownerName: 'Amir Al-Moussawi',
      walletType: 'CITIZEN',
      associatedCredentials: amirVc ? [amirVc] : [],
      securedAssets: [
        {
          assetId: 'ast-citizen-card',
          name: 'Federal National Iraqi Identity Document',
          category: 'IDENTITY_RECORD',
          issuerMinistry: 'Ministry of Interior',
          serialNumber: 'SN-MOI-992108-Z',
          issuedAt: '2026-01-10T10:00:00Z',
          expiresBy: '2036-01-10T10:00:00Z',
          secureSigningKeyAlgorithm: 'ECDSA_P256',
          isRevoked: false
        }
      ]
    });

    // 2. Business Wallet (Sindbad Sea Logistics)
    const sindbadCustomsVc = vcEngine.getCredential('urn:uuid:vc-customs-permit-9008')!;
    const sindbadTaxVc = vcEngine.getCredential('urn:uuid:vc-tax-exemption-320')!;
    this.wallets.set('did:idg:business:trade-sindbad', {
      ownerDid: 'did:idg:business:trade-sindbad',
      ownerName: 'Sindbad Sea Logistics Ltd',
      walletType: 'BUSINESS',
      associatedCredentials: [sindbadCustomsVc, sindbadTaxVc].filter(Boolean),
      securedAssets: [
        {
          assetId: 'ast-sindbad-license',
          name: 'National Commercial Trade Import License',
          category: 'TRADE_LICENSE',
          issuerMinistry: 'Ministry of Trade',
          serialNumber: 'LIC-BAGHDAD-2026-892',
          issuedAt: '2026-02-14T08:00:00Z',
          expiresBy: '2027-02-14T08:00:00Z',
          secureSigningKeyAlgorithm: 'RSA_4096_PKCS1',
          isRevoked: false
        },
        {
          assetId: 'ast-sindbad-customs-transit',
          name: 'HS-Code Port Gateway Clear Certificate',
          category: 'CUSTOMS_CERTIFICATE',
          issuerMinistry: 'General Authority for Customs',
          serialNumber: 'HS-CUSTOMS-X99210',
          issuedAt: '2026-06-01T08:00:00Z',
          expiresBy: '2026-09-01T08:00:00Z',
          secureSigningKeyAlgorithm: 'Ed25519',
          isRevoked: false
        },
        {
          assetId: 'ast-tax-vat-exemption',
          name: 'Sovereign Business Tax Exemption Certificate',
          category: 'TAX_CERTIFICATE',
          issuerMinistry: 'Ministry of Finance',
          serialNumber: 'TAX-EXE-SIND991',
          issuedAt: '2026-03-15T09:00:00Z',
          expiresBy: '2027-03-15T09:00:00Z',
          secureSigningKeyAlgorithm: 'ECDSA_P256',
          isRevoked: false
        }
      ]
    });

    // 3. Government Official Wallet (Ahmed Al-Yassiri / Customs General)
    this.wallets.set('did:idg:gov:customs-director-01', {
      ownerDid: 'did:idg:gov:customs-director-01',
      ownerName: 'Gen. Ahmed Al-Yassiri (Director of Auditing)',
      walletType: 'GOVERNMENT',
      associatedCredentials: [],
      securedAssets: [
        {
          assetId: 'ast-gov-badge',
          name: 'Supreme Ministry of Finance Command Credential',
          category: 'IDENTITY_RECORD',
          issuerMinistry: 'Ministry of Finance',
          serialNumber: 'BADGE-CUST-8812-SIGN-KEY',
          issuedAt: '2026-01-05T08:00:00Z',
          expiresBy: '2030-01-05T08:00:00Z',
          secureSigningKeyAlgorithm: 'RSA_4096_PKCS1',
          isRevoked: false
        }
      ]
    });
  }

  public getWallet(ownerDid: string): NationalSovereignWallet | undefined {
    return this.wallets.get(ownerDid);
  }

  public addAssetToWallet(ownerDid: string, asset: WalletIdentityAsset) {
    const wl = this.wallets.get(ownerDid);
    if (wl) {
      wl.securedAssets.push(asset);
    }
  }

  public getWalletByOwnershipType(type: 'CITIZEN' | 'BUSINESS' | 'GOVERNMENT'): NationalSovereignWallet[] {
    return Array.from(this.wallets.values()).filter(w => w.walletType === type);
  }

  public getAllWallets(): NationalSovereignWallet[] {
    return Array.from(this.wallets.values());
  }
}
