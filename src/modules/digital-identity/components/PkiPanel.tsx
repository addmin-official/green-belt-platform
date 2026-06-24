import React from 'react';
import { ShieldCheck, ShieldAlert, ArrowDown } from 'lucide-react';
import { Language } from '../../../types';
import { SectionHeader, Table, Badge } from '../../../ui';
import { PKICertificate } from '../../../digital-identity';
import { t } from '../localization/identityTranslations';

interface PkiPanelProps {
  lang: Language;
  certs: PKICertificate[];
  pkiCheckSerial: string;
  pkiValidationResult: { isValid: boolean; chain: string[] } | null;
  runPkiPathCheck: (serial: string) => void;
}

const PkiPanelComponent: React.FC<PkiPanelProps> = ({
  lang,
  certs,
  pkiCheckSerial,
  pkiValidationResult,
  runPkiPathCheck
}) => {
  const isSecurePath = pkiValidationResult?.isValid ?? false;
  const pkiChain = pkiValidationResult?.chain ?? [];

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-start font-[600]">
      <SectionHeader
        title={t(lang, 'digitalIdentity.pki.secTitle')}
        description={t(lang, 'digitalIdentity.pki.secDesc')}
        className="font-[800]"
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-2 font-[600]">
        <div className="bg-[#0b1420] border border-slate-850 p-5 rounded-xl flex flex-col gap-4 text-start font-mono text-xs font-[600]">
          <h4 className="text-xs font-[800] uppercase text-[#E0A96D] border-b border-slate-900 pb-2 font-sans tracking-wider text-start">
            {t(lang, 'digitalIdentity.pki.title')}
          </h4>

          <div className="flex flex-col gap-1 text-start">
            <label className="text-[10.5px] text-slate-355 font-[650] text-start">{t(lang, 'digitalIdentity.pki.selectCert')}</label>
            <select
              value={pkiCheckSerial}
              onChange={(e) => runPkiPathCheck(e.target.value)}
              className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-[600] text-white focus:outline-none"
            >
              {certs.map(c => (
                <option key={c.serialNumber} value={c.serialNumber}>
                  {c.subjectCommonName.slice(0, 36)}... ({c.serialNumber.slice(-8)})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 pt-1 text-start">
            <span className="text-[10px] uppercase text-slate-355 font-[650] block tracking-wide">{t(lang, 'digitalIdentity.pki.chain')}</span>
            <div className="flex flex-col gap-2 items-center bg-[#070d15] p-3 rounded border border-slate-910">
              {pkiChain.map((nodeSubject: string, idx: number) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <ArrowDown className="w-3.5 h-3.5 text-slate-500" />}
                  <div className="w-full bg-[#111e2e] p-2 rounded border border-slate-800 text-[10.5px] text-start font-[600]">
                    <span className="text-[#E0A96D] font-[800] block">{nodeSubject}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {isSecurePath ? (
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3.5 flex flex-col gap-1 text-start font-[600]">
              <div className="flex items-center gap-1.5 text-[#52B788] text-xs font-[800] uppercase font-sans">
                <ShieldCheck className="w-4 h-4" />
                {t(lang, 'digitalIdentity.pki.securePath')}
              </div>
              <p className="text-[10.5px] text-slate-300 font-sans leading-relaxed">
                {t(lang, 'digitalIdentity.pki.validationSuccess')}
              </p>
            </div>
          ) : (
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-3.5 flex flex-col gap-1 text-start font-[600]">
              <div className="flex items-center gap-1.5 text-red-100 text-xs font-[800] uppercase font-sans">
                <ShieldAlert className="w-4 h-4" />
                {t(lang, 'digitalIdentity.pki.compromised')}
              </div>
              <p className="text-[10.5px] text-slate-300 font-sans leading-relaxed">
                {t(lang, 'digitalIdentity.pki.validationFailure')}
              </p>
            </div>
          )}
        </div>

        <div className="xl:col-span-2 flex flex-col gap-4 text-start font-[600]">
          <span className="text-xs uppercase font-[800] tracking-widest text-[#52B788] font-mono block text-start">
            {t(lang, 'digitalIdentity.pki.caLedger')}
          </span>

          <div className="overflow-x-auto border border-slate-850 rounded">
            <Table headers={[
              t(lang, 'digitalIdentity.pki.serialCertName'),
              t(lang, 'digitalIdentity.pki.issuerParent'),
              t(lang, 'digitalIdentity.pki.usageType'),
              t(lang, 'digitalIdentity.pki.algorithm'),
              t(lang, 'digitalIdentity.pki.validity')
            ]}>
              {certs.map(ca => (
                <tr key={ca.serialNumber} className={`text-xs font-mono font-[600] text-slate-200 ${ca.isRevoked ? 'bg-rose-950/20' : ''}`}>
                  <td className="px-4 py-3 font-[800] text-white">
                    {ca.serialNumber}
                    <span className="text-[10px] text-slate-330 block font-[600]">{ca.subjectCommonName}</span>
                    {ca.isRevoked && (
                      <span className="text-[9px] text-red-400 block font-[850] uppercase mt-0.5">
                        ❌ {t(lang, 'digitalIdentity.pki.compromisedLabel')}: {ca.revocationReason || 'COMPROMISED'}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-300">{ca.issuerCommonName}</td>
                  <td className="px-4 py-3">
                    <Badge variant="slate" className="font-[800] font-sans scale-95">{ca.hierarchyLevel}</Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{ca.signatureAlgorithm}</td>
                  <td className="px-4 py-3 font-[600]">
                    <span className="block text-slate-200">{t(lang, 'digitalIdentity.pki.til')}: {ca.validTo.slice(0, 10)}</span>
                    <span className="text-[9.5px] text-slate-400 block">{t(lang, 'digitalIdentity.pki.from')}: {ca.validFrom.slice(0, 10)}</span>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PkiPanel = React.memo(PkiPanelComponent);
PkiPanel.displayName = 'PkiPanel';
