import React from 'react';
import { Language } from '../../../types';
import { SectionHeader, Badge } from '../../../ui';
import { FederatedIdentityBroker } from '../../../digital-identity';
import { t } from '../localization/identityTranslations';

interface FederationPanelProps {
  lang: Language;
  brokers: FederatedIdentityBroker[];
  tokens: any[];
}

const FederationPanelComponent: React.FC<FederationPanelProps> = ({
  lang,
  brokers,
  tokens
}) => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in text-start font-[600]">
      <SectionHeader
        title={t(lang, 'digitalIdentity.iam.secTitle')}
        description={t(lang, 'digitalIdentity.iam.secDesc')}
        className="font-[800]"
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-2 font-[600]">
        <div className="flex flex-col gap-3 text-start">
          <span className="text-xs uppercase font-[800] tracking-widest text-[#E0A96D] font-mono block text-start">
            {t(lang, 'digitalIdentity.iam.title')}
          </span>
          
          <div className="grid grid-cols-1 gap-4">
            {brokers.map(b => (
              <div key={b.id} className="bg-[#0b1420] border border-slate-850 p-4 rounded-xl flex items-center justify-between font-mono text-xs leading-normal font-[600]">
                <div>
                  <strong className="text-white text-sm font-sans block font-[800]">
                    {b.name === 'National Identity IAM' ? t(lang, 'digitalIdentity.iam.nationalId') : t(lang, 'digitalIdentity.iam.corporatePortal')}
                  </strong>
                  <span className="text-[10px] text-slate-350 block truncate mt-0.5">
                    {t(lang, 'digitalIdentity.iam.endpoint')}: <span className="text-slate-200 font-[600]">{b.endpointUri}</span>
                  </span>
                  <div className="flex gap-2 mt-1.5 items-center font-[600]">
                    <Badge variant="gold" className="text-[9px] font-[800]">{b.protocol}</Badge>
                    <span className="text-[10px] text-slate-350">
                      {t(lang, 'digitalIdentity.iam.crypto')}: <span className="text-slate-200 font-[600]">{b.signatureAlgorithm}</span>
                    </span>
                  </div>
                </div>

                <div className="text-right flex flex-col gap-1 items-end">
                  <Badge variant={b.connectionStatus === 'ONLINE' ? 'success' : 'warning'} className="font-[800]">
                    {b.connectionStatus === 'ONLINE' ? t(lang, 'digitalIdentity.consent.active') : t(lang, 'digitalIdentity.signatures.pending')}
                  </Badge>
                  <span className="text-[10px] text-[#52B788] font-[800] block pt-1">
                    {t(lang, 'digitalIdentity.iam.ping')}: {b.lastPingTimeMs}ms
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 text-start font-[600]">
          <span className="text-xs uppercase font-[800] tracking-widest text-[#52B788] font-mono block text-start">
            {t(lang, 'digitalIdentity.iam.tokenLedger')}
          </span>
          
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-900 font-mono text-xs flex flex-col gap-4 max-h-[360px] overflow-y-auto text-start">
            {tokens.map(tok => (
              <div key={tok.jti} className="border-b border-slate-900 pb-3 flex flex-col gap-2">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-[600]">
                  <span>JTI Token: {tok.jti}</span>
                  <span>Exp: {new Date(tok.exp * 1000).toLocaleTimeString()}Z</span>
                </div>

                <div className="flex justify-between">
                  <strong className="text-white font-sans text-xs font-[800]">
                    {t(lang, 'digitalIdentity.iam.issuer')}: <span className="text-slate-200 font-[600]">{tok.iss.replace('https://', '')}</span>
                  </strong>
                  <Badge variant="slate" className="font-[800]">{tok.protocolUsed}</Badge>
                </div>

                <div className="text-[11px] text-slate-300 font-[600]">
                  {t(lang, 'digitalIdentity.iam.claimsSubject')}: <strong className="text-white font-[800]">{tok.sub}</strong>
                </div>

                <div className="flex flex-wrap gap-1 mt-1">
                  {tok.claims.map((claimField: string, idx: number) => (
                    <Badge key={idx} variant="slate" className="scale-90 font-[600]">{claimField}</Badge>
                  ))}
                </div>

                <div className="text-[9.5px] text-slate-400 break-all bg-[#0b1420] p-2 rounded border border-slate-950 italic mt-1 leading-relaxed font-[600]">
                  {t(lang, 'digitalIdentity.iam.hashVerify')}: {tok.signatureVerificationHex}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FederationPanel = React.memo(FederationPanelComponent);
FederationPanel.displayName = 'FederationPanel';
