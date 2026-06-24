import React, { useState, useEffect, useCallback } from 'react';
import { 
  NationalIdentityRegistry,
  VerifiableCredentialEngine,
  DigitalWalletManager,
  PublicKeyTrustPlatform,
  DigitalSignatureEngine,
  CitizenConsentRegistry,
  IdentityFederationBrokerManager,
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
import { IdentityViewModel } from '../../../shared/view-models';

export function useNationalIdentity() {
  const registry = NationalIdentityRegistry.getInstance();
  const vcEngine = VerifiableCredentialEngine.getInstance();
  const walletManager = DigitalWalletManager.getInstance();
  const trustPlatform = PublicKeyTrustPlatform.getInstance();
  const sigEngine = DigitalSignatureEngine.getInstance();
  const consentRegistry = CitizenConsentRegistry.getInstance();
  const federationManager = IdentityFederationBrokerManager.getInstance();

  const [registryData, setRegistryData] = useState({
    citizens: [] as CitizenIdentity[],
    businesses: [] as BusinessIdentity[],
    employees: [] as GovernmentEmployeeIdentity[],
    principals: [] as ServicePrincipalIdentity[],
    credentials: [] as VerifiableCredential[],
    wallets: [] as NationalSovereignWallet[],
    certs: [] as PKICertificate[],
    documents: [] as SovereignDocument[],
    consents: [] as ConsentAgreement[],
    brokers: [] as FederatedIdentityBroker[],
  });

  const [pkiCheckSerial, setPkiCheckSerial] = useState('03:DF:00:11:AA:BB:CC:99');
  const [pkiValidationResult, setPkiValidationResult] = useState<{ isValid: boolean; chain: string[] } | null>(null);

  const [vcForm, setVcForm] = useState({
    holderDid: 'did:idg:citizen:iq-883190',
    type: 'SovereignCustomsImportPermit',
    claimKey: 'importPermitCargoWeightTons',
    claimValue: '420.5'
  });
  const [newVcNotice, setNewVcNotice] = useState<string | null>(null);

  const [sigSelectedDocId, setSigSelectedDocId] = useState('doc-customs-99120');
  const [sigSignerRole, setSigSignerRole] = useState('did:idg:gov:customs-director-01');
  const [registrySearch, setRegistrySearch] = useState('');

  const refreshAllStates = useCallback(() => {
    federationManager.simulatePingRefresh();
    setRegistryData({
      citizens: registry.getAllCitizens(),
      businesses: registry.getAllBusinesses(),
      employees: registry.getAllEmployees(),
      principals: registry.getAllPrincipals(),
      credentials: vcEngine.getAllCredentials(),
      wallets: walletManager.getAllWallets(),
      certs: trustPlatform.getAllCertificates(),
      documents: sigEngine.getAllDocuments(),
      consents: consentRegistry.getAllConsents(),
      brokers: federationManager.getBrokers(),
    });
    const res = trustPlatform.validateTrustPath(pkiCheckSerial);
    setPkiValidationResult(res);
  }, [pkiCheckSerial]);

  const runPkiPathCheck = useCallback((serial: string) => {
    setPkiCheckSerial(serial);
    const res = trustPlatform.validateTrustPath(serial);
    setPkiValidationResult(res);
  }, []);

  const handleIssueCredential = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const claims = {
      [vcForm.claimKey]: vcForm.claimValue,
      assignedDataStewardRole: 'Federal System Self-Issued Agent'
    };

    const newVc = vcEngine.issueCredential(vcForm.holderDid, 'did:idg:authority:digital-cabinet', vcForm.type, claims);
    const targetWallet = walletManager.getWallet(vcForm.holderDid);
    if (targetWallet) {
      targetWallet.associatedCredentials.push(newVc);
    }

    setNewVcNotice(`Successfully issued W3C Verifiable Credential: ${newVc.id}. Cryptographically stored in ${vcForm.holderDid}'s secured digital wallet.`);
    refreshAllStates();
    setTimeout(() => setNewVcNotice(null), 8500);
  }, [vcForm, refreshAllStates]);

  const handleSignDocument = useCallback((docId: string, signerDid: string) => {
    let title = 'Customs Commissioner Inspector General';
    let certSerial = '03:DF:00:11:AA:BB:CC:99';
    let org = 'General Authority for Customs';

    if (signerDid.includes('citizen')) {
      title = 'Primary Registered Importer Agent';
      certSerial = '02:FA:11:92:BC:EF:44:88';
      org = 'Sindbad Logistics Operations';
    } else if (signerDid.includes('gov')) {
      title = 'Ministerial Oversight Director';
      certSerial = '01:AB:88:21:CD:AA:99:11';
      org = 'Ministry of Finance';
    }

    sigEngine.signDocument(docId, signerDid, title, org, certSerial);
    refreshAllStates();
  }, [refreshAllStates]);

  const handleRevokeConsent = useCallback((consentId: string) => {
    consentRegistry.revokeConsent(consentId);
    refreshAllStates();
  }, [refreshAllStates]);

  const handleRevokeCredential = useCallback((vcId: string) => {
    vcEngine.revokeCredential(vcId, 'Data Stewardship flagged regulatory compliance deviance');
    refreshAllStates();
  }, [refreshAllStates]);

  const trustScore = (() => {
    let score = 92.5;
    score -= registryData.certs.filter(c => c.isRevoked).length * 1.5;
    score += registryData.credentials.length * 0.4;
    score += registryData.documents.filter(d => d.status === 'FULLY_SEALED').length * 1.2;
    return Math.min(100, Math.round(score * 10) / 10);
  })();

  const identityViewModel = new IdentityViewModel(
    registryData.citizens,
    registryData.businesses,
    registryData.employees,
    registryData.principals,
    registryData.credentials,
    registryData.wallets,
    registryData.certs,
    registryData.documents,
    registryData.consents,
    registryData.brokers,
    trustScore,
    federationManager.getTokens()
  );

  useEffect(() => {
    refreshAllStates();
  }, [refreshAllStates]);

  return {
    identityViewModel,
    pkiCheckSerial, pkiValidationResult,
    issueHolderDid: vcForm.holderDid,
    setIssueHolderDid: (h: string) => setVcForm(prev => ({ ...prev, holderDid: h })),
    issueType: vcForm.type,
    setIssueType: (t: string) => setVcForm(prev => ({ ...prev, type: t })),
    issueClaimKey: vcForm.claimKey,
    setIssueClaimKey: (k: string) => setVcForm(prev => ({ ...prev, claimKey: k })),
    issueClaimValue: vcForm.claimValue,
    setIssueClaimValue: (v: string) => setVcForm(prev => ({ ...prev, claimValue: v })),
    newVcNotice, sigSelectedDocId, setSigSelectedDocId,
    sigSignerRole, setSigSignerRole, registrySearch, setRegistrySearch,
    refreshAllStates, runPkiPathCheck, handleIssueCredential,
    handleSignDocument, handleRevokeConsent, handleRevokeCredential,
    tokens: federationManager.getTokens()
  };
}
