import { 
  CitizenIdentity, 
  BusinessIdentity, 
  GovernmentEmployeeIdentity, 
  ServicePrincipalIdentity,
  VerifiableCredential,
  NationalSovereignWallet,
  PKICertificate,
  SovereignDocument,
  ConsentAgreement,
  FederatedIdentityBroker
} from '../../../digital-identity';

export interface IdentityRegistryViewModels {
  citizens: CitizenIdentity[];
  businesses: BusinessIdentity[];
  employees: GovernmentEmployeeIdentity[];
  principals: ServicePrincipalIdentity[];
}

export interface WalletViewModel extends NationalSovereignWallet {
  // Add UI specific properties if needed
}
