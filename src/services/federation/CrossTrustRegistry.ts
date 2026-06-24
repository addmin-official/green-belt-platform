export interface CrossTrustHandshake {
  id: string;
  sourceCN: string;
  targetCN: string;
  verifiedAt: string;
  expiresAt: string;
  trustBridgeId: string;
  cryptographicSignature: string;
  status: 'valid' | 'expired' | 'revoked';
}

export const CROSS_TRUST_REGISTRY: CrossTrustHandshake[] = [
  {
    id: 'BRIDGE-TX-841',
    sourceCN: 'Federal Iraq Sovereign NID Root CA - G1',
    targetCN: 'KRG National Identity Security CA - R1',
    verifiedAt: '2026-06-08T00:00:00Z',
    expiresAt: '2027-06-08T00:00:00Z',
    trustBridgeId: 'IQ-FED-KRG-HYBRID-TRUST-001',
    cryptographicSignature: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0Yt06P5k8M9P...X5D3yKq3Bf',
    status: 'valid'
  }
];

export class CrossTrustRegistry {
  private static handshakes: CrossTrustHandshake[] = [...CROSS_TRUST_REGISTRY];

  static getActiveHandshakes(): CrossTrustHandshake[] {
    return this.handshakes;
  }

  static verifyTrustBetween({
    sourceCN,
    targetCN
  }: {
    sourceCN: string;
    targetCN: string;
  }): boolean {
    const handshake = this.handshakes.find(
      h => h.sourceCN === sourceCN && h.targetCN === targetCN && h.status === 'valid'
    );
    return !!handshake;
  }

  static registerHandshake(handshake: CrossTrustHandshake) {
    this.handshakes.push(handshake);
  }

  static revokeHandshake(id: string) {
    this.handshakes = this.handshakes.map(h => h.id === id ? { ...h, status: 'revoked' } : h);
  }
}
