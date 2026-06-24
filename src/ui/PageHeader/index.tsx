import React from 'react';

export interface PageHeaderProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  status?: React.ReactNode;
  actions?: React.ReactNode;
  // Maintain backward-compatibility props so existing code doesn’t break
  subtitle?: string;
  badge?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  icon,
  title,
  description,
  status,
  actions,
  subtitle,
  badge,
}) => {
  const displayDescription = description || subtitle;
  const displayStatus = status || badge;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 text-start w-full" id="idg-standardized-header">
      <div className="flex items-start gap-3 flex-1 text-start">
        {icon && (
          <div className="p-1.5 bg-[#E0A96D]/10 rounded-xl border border-[#E0A96D]/30 text-[#E0A96D] shrink-0 self-center">
            {React.cloneElement(icon as React.ReactElement, {
              className: 'w-7 h-7 shrink-0',
            })}
          </div>
        )}
        <div className="flex flex-col gap-1 text-start">
          <div className="flex items-center gap-2.5 flex-wrap text-start">
            <h2 className="text-lg md:text-xl font-bold font-display text-white tracking-wide uppercase text-start">
              {title}
            </h2>
            {displayStatus && (
              <div className="inline-flex shrink-0">
                {displayStatus}
              </div>
            )}
          </div>
          {displayDescription && (
            <p className="text-xs text-slate-400 font-mono tracking-wide max-w-3xl leading-relaxed text-start">
              {displayDescription}
            </p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
