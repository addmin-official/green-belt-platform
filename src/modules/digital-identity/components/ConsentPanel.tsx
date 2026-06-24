import React from 'react';
import { Language } from '../../../types';
import { SectionHeader, Table, Badge, Button } from '../../../ui';
import { ConsentAgreement } from '../../../digital-identity';
import { t } from '../localization/identityTranslations';

interface ConsentPanelProps {
  lang: Language;
  consents: ConsentAgreement[];
  handleRevokeConsent: (consentId: string) => void;
}

const ConsentPanelComponent: React.FC<ConsentPanelProps> = ({
  lang,
  consents,
  handleRevokeConsent
}) => {
  return (
    <div className="flex flex-col gap-5 animate-fade-in text-start font-[600]">
      <SectionHeader
        title={t(lang, 'digitalIdentity.consent.secTitle')}
        description={t(lang, 'digitalIdentity.consent.secDesc')}
        className="font-[800]"
      />

      <div className="overflow-x-auto border border-slate-850 rounded pt-2 text-start font-[600]">
        <Table headers={[
          t(lang, 'digitalIdentity.consent.serial'),
          t(lang, 'digitalIdentity.consent.citizenDid'),
          t(lang, 'digitalIdentity.consent.department'),
          t(lang, 'digitalIdentity.consent.purpose'),
          t(lang, 'digitalIdentity.consent.claimsGranted'),
          t(lang, 'digitalIdentity.consent.lifetime'),
          t(lang, 'digitalIdentity.consent.status'),
          t(lang, 'digitalIdentity.consent.actions')
        ]}>
          {consents.map(c => (
            <tr key={c.id} className="text-xs font-mono text-slate-200 text-start font-[600]">
              <td className="px-4 py-3 font-[800] text-white">{c.id}</td>
              <td className="px-4 py-3 text-slate-300">{c.citizenDid}</td>
              <td className="px-4 py-3 text-[#E0A96D] font-[800]">{c.targetMinistry}</td>
              <td className="px-4 py-3 font-sans font-[600] max-w-xs text-slate-200">{c.purpose}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {c.grantedClaims.map((cl, idx) => (
                    <Badge key={idx} variant="slate" className="scale-90 font-[600]">{cl}</Badge>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 font-[600]">
                <span className="block text-slate-300">{t(lang, 'digitalIdentity.consent.expires')}: {c.expiresAt.slice(0, 10)}</span>
                <span className="text-[9.5px] text-slate-400 block">{t(lang, 'digitalIdentity.consent.granted')}: {c.timestamp.slice(0, 10)}</span>
              </td>
              <td className="px-4 py-3">
                <Badge variant={c.status === 'ACTIVE' ? 'success' : 'danger'} className="font-[800]">
                  {c.status === 'ACTIVE' ? t(lang, 'digitalIdentity.consent.active') : t(lang, 'digitalIdentity.consent.revoked')}
                </Badge>
              </td>
              <td className="px-4 py-3">
                {c.status === 'ACTIVE' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRevokeConsent(c.id)}
                    className="border-red-950 text-red-100 hover:bg-red-950/20 text-[9px] px-2 py-0.5 font-[800] bg-red-955"
                  >
                    {t(lang, 'digitalIdentity.consent.revokeConsent')}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
};

export const ConsentPanel = React.memo(ConsentPanelComponent);
ConsentPanel.displayName = 'ConsentPanel';
