import { CitizenIdentity, BusinessIdentity, GovernmentEmployeeIdentity, ServicePrincipalIdentity, VerifiableCredential, NationalSovereignWallet, PKICertificate, SovereignDocument, ConsentAgreement, FederatedIdentityBroker } from '../../digital-identity';

export class IdentityViewModel {
  constructor(
    public citizens: CitizenIdentity[],
    public businesses: BusinessIdentity[],
    public employees: GovernmentEmployeeIdentity[],
    public principals: ServicePrincipalIdentity[],
    public credentials: VerifiableCredential[],
    public wallets: NationalSovereignWallet[],
    public certs: PKICertificate[],
    public documents: SovereignDocument[],
    public consents: ConsentAgreement[],
    public brokers: FederatedIdentityBroker[],
    public trustScore: number,
    public tokens: any[] // Consider defining a proper Token interface
  ) {}

  get citizenCount(): number { return this.citizens.length; }
  get businessCount(): number { return this.businesses.length; }
  get credentialCount(): number { return this.credentials.length; }
}
