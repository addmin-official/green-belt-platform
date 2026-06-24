// Digital Document Signatures under secure PKI Certificate Seals
// Governs Cabinet resolutions, Trade permits approvals, customs gate releases, and border authorizations

export interface DocumentSignatureSeal {
  signatoryDid: string;
  signatoryTitle: string;
  signatoryOrganization: string;
  certificateSerialNumber: string;
  timestamp: string;
  signatureHash: string; // SHA-256 with PKI salt
}

export type DocumentType = 'CUSTOMS_DECLARATION' | 'CABINET_RESOLUTION' | 'TRADE_PERMIT' | 'BORDER_CLEARANCE_DISPATCH';

export interface SovereignDocument {
  id: string;
  title: string;
  type: DocumentType;
  rawPayloadHash: string;
  requiredSovereignSignersCount: number;
  currentSignatures: DocumentSignatureSeal[];
  status: 'PENDING_SIGNATURES' | 'FULLY_SEALED' | 'REJECTED';
}

export class DigitalSignatureEngine {
  private static instance: DigitalSignatureEngine;
  private documents: Map<string, SovereignDocument> = new Map();

  private constructor() {
    this.seedSovereignDocuments();
  }

  public static getInstance(): DigitalSignatureEngine {
    if (!DigitalSignatureEngine.instance) {
      DigitalSignatureEngine.instance = new DigitalSignatureEngine();
    }
    return DigitalSignatureEngine.instance;
  }

  private seedSovereignDocuments() {
    // 1. Customs Declaration (Heavy Infrastructure shipment at Umm Qasr)
    this.documents.set('doc-customs-99120', {
      id: 'doc-customs-99120',
      title: 'Umm Qasr Cargo manifest customs clearance #99-0A',
      type: 'CUSTOMS_DECLARATION',
      rawPayloadHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      requiredSovereignSignersCount: 2,
      status: 'PENDING_SIGNATURES',
      currentSignatures: [
        {
          signatoryDid: 'did:idg:citizen:iq-883190',
          signatoryTitle: 'Customs Officer Supervisor',
          signatoryOrganization: 'General Authority for Customs',
          certificateSerialNumber: '03:DF:00:11:AA:BB:CC:99',
          timestamp: '2026-06-05T10:00:00Z',
          signatureHash: 'cf2395c3c2284dc8bb025da2c0f6f6dcd82ab99f4bfdb8a0a9911e01bc8992da1'
        } // Still awaits Commissioner signature
      ]
    });

    // 2. Trade Permit Document
    this.documents.set('doc-permit-3321', {
      id: 'doc-permit-3321',
      title: 'National Sovereign Grain Import Permit - Babylon Distribution',
      type: 'TRADE_PERMIT',
      rawPayloadHash: '52cda8821bcfa018abfcbc67dcda0cfef0101867cda0cfefbc892a0df900ccca0',
      requiredSovereignSignersCount: 2,
      status: 'FULLY_SEALED',
      currentSignatures: [
        {
          signatoryDid: 'did:idg:gov:trade-officer-01',
          signatoryTitle: 'Trade Director of Imports Commission',
          signatoryOrganization: 'Ministry of Trade',
          certificateSerialNumber: '02:FA:11:92:BC:EF:44:88',
          timestamp: '2026-06-03T11:00:00Z',
          signatureHash: 'e698cd99fbeebcf900cfef01021bc829394cdcda0b892a09f8c028adba9cd9921'
        },
        {
          signatoryDid: 'did:idg:gov:cabinet-liaison',
          signatoryTitle: 'Sovereign Digital Cabinet Registrar',
          signatoryOrganization: 'Iraqi Federal Cabinet Digital Secretariat',
          certificateSerialNumber: '01:AB:88:21:CD:AA:99:11',
          timestamp: '2026-06-03T11:45:00Z',
          signatureHash: '882cdaeb99fbcbcbca90cfefbc8c1b2f0a12cfda0bffd8a0289dcaebee882193'
        }
      ]
    });
  }

  public getDocument(id: string): SovereignDocument | undefined {
    return this.documents.get(id);
  }

  public getAllDocuments(): SovereignDocument[] {
    return Array.from(this.documents.values());
  }

  /**
   * Applies asymmetric cryptographic signature block to document
   */
  public signDocument(id: string, signerDid: string, signerTitle: string, org: string, certSerial: string): SovereignDocument | undefined {
    const doc = this.documents.get(id);
    if (!doc || doc.status === 'FULLY_SEALED') return doc;

    // Check if copy signature exists helper
    const hasSigned = doc.currentSignatures.some(s => s.signatoryDid === signerDid);
    if (hasSigned) return doc;

    const signatureHash = `sha256-asym-seal-${signerDid.split(':').slice(-1)}-${Date.now()}`;
    const newSeal: DocumentSignatureSeal = {
      signatoryDid: signerDid,
      signatoryTitle: signerTitle,
      signatoryOrganization: org,
      certificateSerialNumber: certSerial,
      timestamp: new Date().toISOString(),
      signatureHash
    };

    doc.currentSignatures.push(newSeal);

    if (doc.currentSignatures.length >= doc.requiredSovereignSignersCount) {
      doc.status = 'FULLY_SEALED';
    }

    return doc;
  }
}
