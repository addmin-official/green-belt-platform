import React from 'react';
import { Language } from '../../../types';
import { SectionHeader, Button, Badge } from '../../../ui';
import { SovereignDocument } from '../../../digital-identity';
import { t } from '../localization/identityTranslations';

interface SignaturesPanelProps {
  lang: Language;
  documents: SovereignDocument[];
  sigSelectedDocId: string;
  setSigSelectedDocId: (id: string) => void;
  sigSignerRole: string;
  setSigSignerRole: (role: string) => void;
  handleSignDocument: (docId: string, signerDid: string) => void;
}

export const SignaturesPanel: React.FC<SignaturesPanelProps> = React.memo(({
  lang,
  documents,
  sigSelectedDocId,
  setSigSelectedDocId,
  sigSignerRole,
  setSigSignerRole,
  handleSignDocument
}) => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in text-start font-[600]">
      <SectionHeader
        title={t(lang, 'digitalIdentity.signatures.secTitle')}
        description={t(lang, 'digitalIdentity.signatures.secDesc')}
        className="font-[800]"
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-2 font-[600]">
        <div className="bg-[#0b1420] border border-slate-850 p-5 rounded-xl flex flex-col gap-4 font-mono text-xs text-start font-[600]">
          <h4 className="text-xs font-[800] uppercase text-[#E0A96D] border-b border-slate-900 pb-2 font-sans tracking-wider text-start">
            {t(lang, 'digitalIdentity.signatures.title')}
          </h4>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10.5px] text-slate-350 font-[650] text-start">{t(lang, 'digitalIdentity.signatures.targetFile')}</label>
              <select
                value={sigSelectedDocId}
                onChange={(e) => setSigSelectedDocId(e.target.value)}
                className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-[600] text-white focus:outline-none"
              >
                {documents.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.title.slice(0, 36)}...
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10.5px] text-slate-350 font-[650] text-start">{t(lang, 'digitalIdentity.signatures.signatory')}</label>
              <select
                value={sigSignerRole}
                onChange={(e) => setSigSignerRole(e.target.value)}
                className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-[600] text-white focus:outline-none"
              >
                <option value="did:idg:citizen:iq-883190">{t(lang, 'digitalIdentity.signatures.roleSupervisor')}</option>
                <option value="did:idg:gov:customs-director-01">{t(lang, 'digitalIdentity.signatures.roleAuditor')}</option>
                <option value="did:idg:gov:finance-minister">{t(lang, 'digitalIdentity.signatures.roleMinister')}</option>
              </select>
            </div>

            <Button
              variant="default"
              onClick={() => handleSignDocument(sigSelectedDocId, sigSignerRole)}
              className="bg-[#E0A96D] hover:bg-[#E0A96D]/90 text-slate-950 font-[800] uppercase tracking-wider text-[11px] py-2 w-full mt-2"
            >
              {t(lang, 'digitalIdentity.signatures.affixSecureSig')}
            </Button>
          </div>
        </div>

        <div className="xl:col-span-2 flex flex-col gap-3 text-start font-[600]">
          <span className="text-xs uppercase font-[800] tracking-widest text-[#E0A96D] font-mono block text-start">
            {t(lang, 'digitalIdentity.signatures.registry')}
          </span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => {
              const isSealed = doc.status === 'FULLY_SEALED';
              return (
                <div key={doc.id} className="bg-[#0b1420] border border-slate-850 p-4.5 rounded-xl flex flex-col gap-3 leading-normal text-start font-[600]">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                    <div>
                      <strong className="text-white text-xs block truncate font-sans font-[800]">{doc.title}</strong>
                      <span className="text-[9.5px] text-slate-350 font-mono font-[600]">Payload JTI: {doc.id}</span>
                    </div>
                    <Badge variant={isSealed ? 'success' : 'warning'} className="font-[800]">
                      {isSealed ? t(lang, 'digitalIdentity.signatures.sealSecured') : t(lang, 'digitalIdentity.signatures.pendingSigs')}
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-1 text-[10.5px] font-mono text-slate-300">
                    <div>{t(lang, 'digitalIdentity.signatures.requiredSig')}: <strong className="text-slate-200 font-[800]">{doc.requiredSovereignSignersCount}</strong></div>
                    <div>{t(lang, 'digitalIdentity.signatures.typeClass')} <strong className="text-[#E0A96D] font-[800]">{doc.type}</strong></div>
                  </div>

                  <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-900 text-start">
                    <span className="text-[10px] text-slate-350 font-[650] uppercase font-mono">{t(lang, 'digitalIdentity.signatures.appliedSeals')}</span>
                    {doc.currentSignatures.length === 0 ? (
                      <span className="text-[10.5px] text-slate-450 italic font-[600]">{t(lang, 'digitalIdentity.signatures.noSignatures')}</span>
                    ) : (
                      <div className="flex flex-col gap-1.5 font-mono text-[9.5px]">
                        {doc.currentSignatures.map((sig, i) => (
                          <div key={i} className="bg-[#111e2e]/80 p-2 border border-slate-850 rounded font-[600]">
                            <div className="flex justify-between items-center font-[800] text-[#52B788]">
                              <span>{sig.signatoryTitle}</span>
                              <span className="font-sans font-[800]">{t(lang, 'digitalIdentity.signatures.verifiedBadge')}</span>
                            </div>
                            <div className="text-slate-350 mt-0.5">{t(lang, 'digitalIdentity.signatures.org')} {sig.signatoryOrganization}</div>
                            <div className="text-slate-400 mt-0.5 break-all">{t(lang, 'digitalIdentity.signatures.hash')} {sig.signatureHash.slice(0, 36)}...</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

SignaturesPanel.displayName = 'SignaturesPanel';
