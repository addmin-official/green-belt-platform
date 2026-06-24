import React from 'react';
import { useI18n } from '../../../providers/I18nProvider';
import { SectionHeader, Badge } from '../../../ui';
import { NationalSovereignWallet } from '../../../digital-identity';

interface WalletPanelProps {
  wallets: NationalSovereignWallet[];
}

export const WalletPanel: React.FC<WalletPanelProps> = React.memo(({
  wallets
}) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-5 animate-fade-in text-start">
      <SectionHeader
        title={t('digitalIdentity.wallet.title')}
        description={t('digitalIdentity.wallet.description')}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-2">
        {wallets.map((wl) => (
          <div key={wl.ownerDid} className="bg-[#0b1420] border border-slate-800 p-5 rounded-xl flex flex-col gap-4 font-mono text-xs">
            
            <div className="border-b border-slate-900 pb-3 flex justify-between items-center text-start">
              <div>
                <strong className="text-white text-sm font-sans block">{wl.ownerName}</strong>
                <span className="text-[10px] text-slate-500 block mt-0.5">{wl.ownerDid}</span>
              </div>
              <Badge variant={wl.walletType === 'GOVERNMENT' ? 'danger' : wl.walletType === 'BUSINESS' ? 'gold' : 'slate'}>
                {t(`digitalIdentity.wallet.${wl.walletType.toLowerCase()}`)}
              </Badge>
            </div>

            <div className="flex flex-col gap-3 text-start">
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider font-mono">{t('digitalIdentity.wallet.securedDocuments')}</span>
              
              {wl.securedAssets.length === 0 ? (
                <span className="text-[10.5px] text-slate-500 italic">{t('digitalIdentity.wallet.noCredentials')}</span>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {wl.securedAssets.map((ast) => (
                    <div key={ast.assetId} className="bg-[#111e2e]/70 border border-slate-850 p-3 rounded flex flex-col gap-1.5 leading-normal">
                      <div className="flex justify-between items-start font-semibold text-white">
                        <span className="font-sans text-[11.5px] font-semibold text-slate-100">{ast.name}</span>
                        <Badge variant="slate" className="text-[9px] scale-90">{ast.category.replace(/_/g, ' ')}</Badge>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {t('digitalIdentity.wallet.issuer')}: <strong className="text-slate-300 font-semibold">{ast.issuerMinistry}</strong>
                      </div>
                      <div className="flex justify-between items-center text-[9px] text-[#E0A96D] pt-1">
                        <span>{t('digitalIdentity.wallet.serialId')}: {ast.serialNumber}</span>
                        <span>{t('digitalIdentity.wallet.signedUnder')}: {ast.secureSigningKeyAlgorithm}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-2 pt-2 border-t border-slate-900 flex flex-col gap-2 text-start">
              <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">{t('digitalIdentity.wallet.jsonProofs')}</span>
              
              {wl.associatedCredentials.map((c) => (
                <div key={c.id} className="bg-slate-950 p-2.5 rounded font-mono text-[9px] text-slate-450 max-h-36 overflow-y-auto leading-relaxed border border-slate-950/60 text-start">
                  <div className="text-[#52B788] font-semibold pb-1 flex justify-between">
                    <span>{t('digitalIdentity.wallet.verifiedW3C')}</span>
                    <span>{c.type[1]}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 font-[600]">
                    <span>{t('digitalIdentity.wallet.id')} {c.id}</span>
                    <span>{t('digitalIdentity.wallet.issuerKey')} {c.issuer}</span>
                    <span>{t('digitalIdentity.wallet.sigProof')} {c.proof.jws.slice(0, 36)}...</span>
                    <span className="text-[#E0A96D] font-semibold mt-1">{t('digitalIdentity.wallet.claimsMap')}:</span>
                    {Object.entries(c.credentialSubject).map(([key, value]) => (
                      <span key={key} className="pl-2">- {key}: {String(value)}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
});

WalletPanel.displayName = 'WalletPanel';
