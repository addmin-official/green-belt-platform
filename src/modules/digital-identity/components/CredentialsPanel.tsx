import React from 'react';
import { CheckCircle2, CheckSquare, XCircle } from 'lucide-react';
import { Language } from '../../../types';
import { SectionHeader, Button, Table, Badge } from '../../../ui';
import { VerifiableCredential } from '../../../digital-identity';
import { t } from '../localization/identityTranslations';

interface CredentialsPanelProps {
  lang: Language;
  credentials: VerifiableCredential[];
  issueHolderDid: string;
  setIssueHolderDid: (did: string) => void;
  issueType: string;
  setIssueType: (type: string) => void;
  issueClaimKey: string;
  setIssueClaimKey: (key: string) => void;
  issueClaimValue: string;
  setIssueClaimValue: (val: string) => void;
  newVcNotice: string | null;
  handleIssueCredential: (e: React.FormEvent) => void;
  handleRevokeCredential: (vcId: string) => void;
  vcEngine: any;
}

const CredentialsPanelComponent: React.FC<CredentialsPanelProps> = ({
  lang,
  credentials,
  issueHolderDid,
  setIssueHolderDid,
  issueType,
  setIssueType,
  issueClaimKey,
  setIssueClaimKey,
  issueClaimValue,
  setIssueClaimValue,
  newVcNotice,
  handleIssueCredential,
  handleRevokeCredential,
  vcEngine
}) => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in text-start font-[600]">
      <SectionHeader
        title={t(lang, 'digitalIdentity.w3c.secTitle')}
        description={t(lang, 'digitalIdentity.w3c.secDesc')}
        className="font-[800]"
      />

      {newVcNotice && (
        <div className="bg-emerald-950/35 border border-emerald-500/30 text-[#52B788] rounded-xl p-4 font-sans font-[600] text-xs flex items-center gap-3 animate-pulse text-start">
          <CheckCircle2 className="w-5 h-5" />
          <span>{newVcNotice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-2">
        <div className="bg-[#0b1420] border border-slate-850 p-5 rounded-xl flex flex-col gap-4 font-mono text-xs text-start">
          <h4 className="text-xs font-[800] uppercase text-[#E0A96D] border-b border-slate-900 pb-2 font-sans tracking-wider">
            {t(lang, 'digitalIdentity.w3c.title')}
          </h4>

          <form onSubmit={handleIssueCredential} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10.5px] text-slate-350 font-[650] text-start">{t(lang, 'digitalIdentity.w3c.selectDestHolder')}</label>
              <select
                value={issueHolderDid}
                onChange={(e) => setIssueHolderDid(e.target.value)}
                className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-[600] text-white focus:outline-none"
              >
                <option value="did:idg:citizen:iq-883190">{t(lang, 'digitalIdentity.w3c.destCitizen')}</option>
                <option value="did:idg:business:trade-sindbad">{t(lang, 'digitalIdentity.w3c.destBusiness')}</option>
                <option value="did:idg:gov:customs-director-01">{t(lang, 'digitalIdentity.w3c.destAuditor')}</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10.5px] text-slate-350 font-[650] text-start">{t(lang, 'digitalIdentity.w3c.selectW3cType')}</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-[600] text-white focus:outline-none"
              >
                <option value="SovereignCustomsImportPermit">SovereignCustomsImportPermit</option>
                <option value="SovereignTaxCertificate">SovereignTaxCertificate</option>
                <option value="SovereignCitizenCredential">SovereignCitizenCredential</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10.5px] text-slate-350 font-[650] text-start">{t(lang, 'digitalIdentity.w3c.setClaimAttributes')}</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder={t(lang, 'digitalIdentity.w3c.keyPlaceholder')}
                  value={issueClaimKey}
                  onChange={(e) => setIssueClaimKey(e.target.value)}
                  className="bg-[#111e2e] border border-slate-800 text-[10.5px] p-2 rounded text-white focus:outline-none font-[600]"
                  required
                />
                <input
                  type="text"
                  placeholder={t(lang, 'digitalIdentity.w3c.valuePlaceholder')}
                  value={issueClaimValue}
                  onChange={(e) => setIssueClaimValue(e.target.value)}
                  className="bg-[#111e2e] border border-slate-800 text-[10.5px] p-2 rounded text-white focus:outline-none font-[600]"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="default"
              className="bg-[#E0A96D] hover:bg-[#E0A96D]/90 text-slate-950 font-[800] uppercase tracking-wider text-[11px] py-2 w-full mt-2"
            >
              {t(lang, 'digitalIdentity.w3c.sealAndDispatch')}
            </Button>
          </form>
        </div>

        <div className="xl:col-span-2 flex flex-col gap-4 text-start font-[600]">
          <span className="text-xs uppercase font-[800] tracking-widest text-[#52B788] font-mono block">{t(lang, 'digitalIdentity.w3c.auditTrail')}</span>
          
          <div className="overflow-x-auto border border-slate-850 rounded">
            <Table headers={[
              t(lang, 'digitalIdentity.w3c.w3cId'),
              t(lang, 'digitalIdentity.w3c.issuingAuthority'),
              t(lang, 'digitalIdentity.w3c.holderOwnerDid'),
              t(lang, 'digitalIdentity.w3c.issuanceTimestamp'),
              t(lang, 'digitalIdentity.w3c.sealValidation'),
              t(lang, 'digitalIdentity.w3c.actions')
            ]}>
              {credentials.map((vc) => {
                const isValidSig = vcEngine.verifyCredentialSignature(vc);
                return (
                  <tr key={vc.id} className={`text-xs font-mono font-[600] text-slate-200 ${vc.isRevoked ? 'bg-red-950/20' : ''}`}>
                    <td className="px-4 py-3 font-[800] text-white">
                      {vc.id}
                      <span className="text-[10px] text-slate-330 block font-[600]">{t(lang, 'digitalIdentity.w3c.class')}: {vc.type[1]}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{vc.issuer.split(':').slice(-1)}</td>
                    <td className="px-4 py-3 text-slate-300">{vc.credentialSubject.id.split(':').slice(-1)}</td>
                    <td className="px-4 py-3 text-slate-300">{vc.issuanceDate.slice(0, 16).replace('T', ' ')}</td>
                    <td className="px-4 py-3">
                      {vc.isRevoked ? (
                        <Badge variant="danger" className="font-[800]">{t(lang, 'digitalIdentity.w3c.revoked')}</Badge>
                      ) : isValidSig ? (
                        <div className="flex items-center gap-1.5 text-[#52B788] text-[11px] font-[800] font-sans">
                          <CheckSquare className="w-3.5 h-3.5" />
                          {t(lang, 'digitalIdentity.w3c.cryptoVerified')}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-red-500 text-[11px] font-[800] font-sans">
                          <XCircle className="w-3.5 h-3.5" />
                          {t(lang, 'digitalIdentity.w3c.invalidProof')}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {!vc.isRevoked && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRevokeCredential(vc.id)}
                            className="border-red-950 text-red-400 hover:bg-red-950/20 text-[9px] px-2 py-0.5 font-[800]"
                          >
                            {t(lang, 'digitalIdentity.w3c.revoke')}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CredentialsPanel = React.memo(CredentialsPanelComponent);
CredentialsPanel.displayName = 'CredentialsPanel';
