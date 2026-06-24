import React from 'react';
import { Sparkles } from 'lucide-react';
import { Language } from '../../../types';
import { t } from '../localization/ccTranslations';
import { colors } from '../../../design-system/tokens/colors';

interface RoleSelectorPanelProps {
  lang: Language;
  activeRole: 'pmo' | 'ministries' | 'customs' | 'border' | 'economic';
  setActiveRole: (r: 'pmo' | 'ministries' | 'customs' | 'border' | 'economic') => void;
}

export const RoleSelectorPanel: React.FC<RoleSelectorPanelProps> = React.memo(({
  lang,
  activeRole,
  setActiveRole
}) => {
  const isRtl = lang !== 'en';
  
  const getBannerData = () => {
    switch (activeRole) {
      case 'pmo':
        return {
          title: t(lang, 'roles.pmo.title'),
          sub: t(lang, 'roles.pmo.sub')
        };
      case 'ministries':
        return {
          title: t(lang, 'roles.ministries.title'),
          sub: t(lang, 'roles.ministries.sub')
        };
      case 'customs':
        return {
          title: t(lang, 'roles.customs.title'),
          sub: t(lang, 'roles.customs.sub')
        };
      case 'border':
        return {
          title: t(lang, 'roles.border.title'),
          sub: t(lang, 'roles.border.sub')
        };
      case 'economic':
        return {
          title: t(lang, 'roles.economic.title'),
          sub: t(lang, 'roles.economic.sub')
        };
    }
  };

  const banner = getBannerData();

  return (
    <div 
      className="p-4 rounded flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 rtl:border-l-0 rtl:border-r-4 mt-6 text-start"
      style={{
        borderLeftColor: colors.accent.gold,
        borderRightColor: isRtl ? colors.accent.gold : undefined,
        background: 'rgba(26, 44, 66, 0.25)'
      }}
    >
      <div className="text-start">
        <h3 className="font-semibold text-slate-105 flex items-center gap-2 text-xs uppercase font-mono text-start">
          <Sparkles className="w-4 h-4 text-[#E0A96D]" />
          {banner.title}
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-normal text-start">
          {banner.sub}
        </p>
      </div>
      <div className="bg-slate-900 border border-slate-800 p-2 rounded font-mono text-[10px] text-slate-400 select-none self-start md:self-auto shrink-0 uppercase">
        {t(lang, 'roles.jwtPass')}<span className="text-[#E0A96D] font-bold">{activeRole}_GOV_ROOT_SECURE</span>
      </div>
    </div>
  );
});

RoleSelectorPanel.displayName = 'RoleSelectorPanel';
export default RoleSelectorPanel;
