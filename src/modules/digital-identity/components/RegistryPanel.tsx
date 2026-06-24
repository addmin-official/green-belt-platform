import React from 'react';
import { useI18n } from '../../../providers/I18nProvider';
import { SectionHeader, Input, Table, Badge } from '../../../ui';
import { 
  CitizenIdentity, 
  BusinessIdentity, 
  GovernmentEmployeeIdentity 
} from '../../../digital-identity';

interface RegistryPanelProps {
  citizens: CitizenIdentity[];
  businesses: BusinessIdentity[];
  employees: GovernmentEmployeeIdentity[];
  registrySearch: string;
  setRegistrySearch: (val: string) => void;
}

export const RegistryPanel: React.FC<RegistryPanelProps> = React.memo(({
  citizens,
  businesses,
  employees,
  registrySearch,
  setRegistrySearch
}) => {
  const { t, locale } = useI18n();

  const filteredCitizens = citizens.filter(c => 
    c.fullName.en.toLowerCase().includes(registrySearch.toLowerCase()) || 
    c.fullName.ar.includes(registrySearch) ||
    c.nationalIdNumber.includes(registrySearch)
  );

  const filteredBusinesses = businesses.filter(b => 
    b.companyName.en.toLowerCase().includes(registrySearch.toLowerCase()) ||
    b.companyName.ar.includes(registrySearch) ||
    b.tradeLicenseNumber.includes(registrySearch)
  );

  return (
    <div className="flex flex-col gap-5 animate-fade-in text-start">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-900 pb-3">
        <SectionHeader
          title={t('digitalIdentity.citizens.title')}
          description={t('digitalIdentity.wallet.heldSecurely')}
        />
        <div className="w-full md:w-72">
          <Input 
            placeholder={t('digitalIdentity.citizens.title')} 
            value={registrySearch}
            onChange={(e) => setRegistrySearch(e.target.value)}
            id="reg-search-field"
          />
        </div>
      </div>

      {/* Citizens Table */}
      <div className="flex flex-col gap-1.5 pt-2">
        <span className="text-xs uppercase font-semibold tracking-widest text-[#E0A96D] font-mono">{t('digitalIdentity.citizens.title')}</span>
        <div className="overflow-x-auto">
          <Table headers={[t('digitalIdentity.citizens.did'), t('digitalIdentity.citizens.nationalId'), t('digitalIdentity.citizens.fullName'), t('digitalIdentity.citizens.biometricMarkers'), t('digitalIdentity.citizens.status')]}>
            {filteredCitizens.map(cit => (
              <tr key={cit.id} className="text-xs font-mono text-slate-300">
                <td className="px-4 py-2 text-white font-semibold">{cit.id}</td>
                <td className="px-4 py-2 font-medium">{cit.nationalIdNumber}</td>
                <td className="px-4 py-2 font-sans">
                  <span className="block text-slate-200 font-semibold">{locale === 'en' ? cit.fullName.en : locale === 'ar' ? cit.fullName.ar : cit.fullName.ku}</span>
                  <span className="text-[10px] text-slate-500 font-mono">DOB: {cit.dateOfBirth}</span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded leading-none ${cit.isFingerprintVerified ? 'bg-emerald-950/40 text-[#52B788] border border-emerald-900/30' : 'bg-slate-900'}`}>
                      {t('digitalIdentity.citizens.fingerprintBound')}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded leading-none ${cit.isIrisVerified ? 'bg-emerald-950/40 text-[#52B788] border border-emerald-900/30' : 'bg-slate-900'}`}>
                      {t('digitalIdentity.citizens.irisBound')}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <Badge variant="success">{t('digitalIdentity.citizens.active')}</Badge>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>

      {/* Businesses Table */}
      <div className="flex flex-col gap-1.5 pt-4 border-t border-slate-900">
        <span className="text-xs uppercase font-semibold tracking-widest text-cyan-400 font-mono">{t('digitalIdentity.businesses.title')}</span>
        <div className="overflow-x-auto">
          <Table headers={[t('digitalIdentity.businesses.did'), t('digitalIdentity.businesses.tradeLicense'), t('digitalIdentity.businesses.sovereignCapital'), t('digitalIdentity.businesses.category'), t('digitalIdentity.businesses.publicKey')]}>
            {filteredBusinesses.map(biz => (
              <tr key={biz.id} className="text-xs font-mono text-slate-300">
                <td className="px-4 py-2 text-white font-semibold">{biz.id}</td>
                <td className="px-4 py-2 font-medium">{biz.tradeLicenseNumber}</td>
                <td className="px-4 py-2 text-cyan-400 font-semibold">{biz.registeredCapitalIQD.toLocaleString()} IQD</td>
                <td className="px-4 py-2 font-sans">{biz.primaryCategory}</td>
                <td className="px-4 py-2 text-[10px] text-slate-500 break-all select-all font-mono">
                  {biz.publicKeyPem.slice(0, 48)}...
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>

      {/* Employees Table */}
      <div className="flex flex-col gap-1.5 pt-4 border-t border-slate-900">
        <span className="text-xs uppercase font-semibold tracking-widest text-[#E0A96D] font-mono">{t('digitalIdentity.government.title')}</span>
        <div className="overflow-x-auto">
          <Table headers={[t('digitalIdentity.government.did'), t('digitalIdentity.government.badgeId'), t('digitalIdentity.government.ministryNode'), t('digitalIdentity.government.signatoryTitle'), t('digitalIdentity.government.clearance')]}>
            {employees.map(emp => (
              <tr key={emp.id} className="text-xs font-mono text-slate-300">
                <td className="px-4 py-2 text-white font-semibold">{emp.id}</td>
                <td className="px-4 py-2">{emp.badgeId}</td>
                <td className="px-4 py-2 text-[#E0A96D]">{emp.ministry}</td>
                <td className="px-4 py-2 font-sans font-semibold text-slate-200">
                  {locale === 'en' ? emp.title.en : locale === 'ar' ? emp.title.ar : emp.title.ku}
                </td>
                <td className="px-4 py-2">
                  <Badge variant="danger">{t('digitalIdentity.government.secret')}</Badge>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
});

RegistryPanel.displayName = 'RegistryPanel';
