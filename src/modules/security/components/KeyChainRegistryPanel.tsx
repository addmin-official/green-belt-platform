import React from 'react';
import { Lock } from 'lucide-react';
import { Language } from '../../../types';
import { Badge } from '../../../ui';
import { t } from '../localization/securityTranslations';

interface EncryptionKey {
  keyId: string;
  algorithm: string;
  status: string;
  expiresAt: string;
}

interface KeyChainRegistryPanelProps {
  lang: Language;
  keysList: EncryptionKey[];
}

export const KeyChainRegistryPanel: React.FC<KeyChainRegistryPanelProps> = React.memo(({
  lang,
  keysList
}) => {
  return (
    <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl text-start flex flex-col gap-4">
      <h3 className="text-sm font-[650] text-slate-200 uppercase tracking-widest pb-2 border-b border-slate-900 flex justify-between items-center">
        <span className="flex items-center gap-1.5">
          <Lock className="text-[#E0A96D] w-4 h-4" />
          {t(lang, 'sidebar.keychain.title')}
        </span>
      </h3>

      <div className="flex flex-col gap-2 font-mono text-xs">
        {keysList.map((key) => {
          const isActive = key.status === 'ACTIVE';
          return (
            <div 
              key={key.keyId} 
              className={`p-3 rounded border flex flex-col gap-1.5 ${
                isActive 
                  ? 'bg-slate-900/60 border-[#E0A96D]/30' 
                  : 'bg-[#0c1421]/30 border-slate-850 opacity-60'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className={isActive ? 'text-white font-bold' : 'text-slate-400'}>
                  {key.keyId}
                </span>
                <Badge variant={isActive ? 'success' : 'slate'}>
                  {isActive ? t(lang, 'sidebar.keychain.active') : t(lang, 'sidebar.keychain.expired')}
                </Badge>
              </div>
              <div className="text-[10px] text-slate-500">
                {t(lang, 'sidebar.keychain.algo')}: <span className="text-[#E0A96D]">{key.algorithm}</span><br />
                {t(lang, 'sidebar.keychain.expiry')}: {key.expiresAt.slice(0, 10)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

KeyChainRegistryPanel.displayName = 'KeyChainRegistryPanel';
