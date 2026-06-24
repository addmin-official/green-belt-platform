import { IdentityRecord } from '../../providers/GovernmentProvider';

export interface FederatedCitizenID {
  nationalId: string;
  regionalId: string;
  federatedId: string;
  fullName: string;
  mappedAt: string;
  jointVerificationKey: string;
}

export class IdentityFederationEngine {
  
  // A local simulated memory index mapping National ID (Federal) to KRG identity systems
  private static federatedMappings: FederatedCitizenID[] = [
    {
      nationalId: 'IQ-110293-8472',
      regionalId: 'KR-249102-1294',
      federatedId: 'FED-IQ-KR-0925184',
      fullName: 'Mustafa Aram Al-Hashimi',
      mappedAt: '2026-06-08T03:00:00Z',
      jointVerificationKey: 'SIG_HYBRID_NID_FED_KRG_HASH_738419'
    }
  ];

  /**
   * Translates a federal citizen identity into a regional or joint federated citizen structure,
   * checking key trust bounds.
   */
  static federateIdentity(citizen: IdentityRecord): FederatedCitizenID {
    const matched = this.federatedMappings.find(m => m.nationalId === citizen.nationalId || m.regionalId === citizen.nationalId);
    if (matched) {
      return matched;
    }

    // Dynamic generation if a mapping doesn't exist yet but trust is requested
    const tempFedId = `FED-${citizen.jurisdiction.toUpperCase()}-${Math.floor(Math.random() * 9000000 + 1000000)}`;
    const newMapping: FederatedCitizenID = {
      nationalId: citizen.jurisdiction === 'federal' ? citizen.nationalId : `FED-MAPPED-${citizen.nationalId}`,
      regionalId: citizen.jurisdiction === 'krg' ? citizen.nationalId : `KRG-MAPPED-${citizen.nationalId}`,
      federatedId: tempFedId,
      fullName: citizen.fullName,
      mappedAt: new Date().toISOString(),
      jointVerificationKey: `SIG_HYBRID_AUTO_GENERATED_${Math.floor(Math.random() * 900000)}`
    };

    this.federatedMappings.push(newMapping);
    return newMapping;
  }

  static getFederatedMappings(): FederatedCitizenID[] {
    return this.federatedMappings;
  }

  /**
   * Search query against either registries, returning bridged details under FEDERATED mode.
   */
  static findFederatedProfile(query: string, rawCitizensList: IdentityRecord[]): {
    federalProfile?: IdentityRecord;
    krgProfile?: IdentityRecord;
    federatedId?: string;
    trustVerified: boolean;
  } {
    const q = query.toLowerCase();
    
    // Find matching records in raw lists
    const matches = rawCitizensList.filter(
      c => c.nationalId.toLowerCase().includes(q) || c.fullName.toLowerCase().includes(q)
    );

    const federalProfile = matches.find(c => c.jurisdiction === 'federal');
    const krgProfile = matches.find(c => c.jurisdiction === 'krg');

    let federatedId: string | undefined;
    
    // Attempt mapping
    if (federalProfile) {
      const mapped = this.federatedMappings.find(m => m.nationalId === federalProfile.nationalId);
      if (mapped) federatedId = mapped.federatedId;
    } else if (krgProfile) {
      const mapped = this.federatedMappings.find(m => m.regionalId === krgProfile.nationalId);
      if (mapped) federatedId = mapped.federatedId;
    }

    return {
      federalProfile,
      krgProfile,
      federatedId,
      trustVerified: !!federalProfile || !!krgProfile
    };
  }
}
