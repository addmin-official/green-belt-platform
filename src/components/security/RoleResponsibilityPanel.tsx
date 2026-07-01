import { useEffect } from 'react';
import { BadgeCheck, ShieldCheck, UserCog } from 'lucide-react';

import { useAuth } from '../../auth/AuthProvider';
import { ROLE_CATALOG, type DashboardModule } from '../../security/roleCatalog';

const TAB_LABELS: Record<DashboardModule, string> = {
  overview: 'تەختەی چاودێری سەرەکی',
  restaurants: 'تۆڕی ڕێستورانتەکان',
  wasteOps: 'چاودێریی گواستنەوە و کۆکردنەوە',
  compost: 'زنجیرەی پەیینسازی',
  trees: 'نەخشەی کاریگەریی درەختەکان',
  advisors: 'ڕاوێژکاران و هاوبەشان',
};

const ROLE_LABELS = {
  admin: 'بەڕێوەبەری گشتی',
  operator: 'بەڕێوەبەری ئۆپەراسیۆن',
  collection_officer: 'بەرپرسی کۆکردنەوە',
  facility_operator: 'بەرپرسی شوێنی پرۆسەکردن',
  qa_manager: 'بەڕێوەبەری دڵنیایی جۆرایەتی',
  laboratory: 'نوێنەری تاقیگە',
  viewer: 'بینەر / ئەندامی لیژنە',
} as const;

export default function RoleResponsibilityPanel() {
  const { role } = useAuth();

  useEffect(() => {
    if (!role) return;

    const profile = ROLE_CATALOG[role];
    const allowedLabels = new Set(
      profile.allowedModules.map((moduleId) => TAB_LABELS[moduleId]),
    );

    const applyPolicy = () => {
      const dashboard = document.getElementById('green-belt-dashboard-root');
      if (!dashboard) return;

      dashboard.dataset.activeRole = role;

      dashboard.querySelectorAll<HTMLButtonElement>('nav button').forEach((button) => {
        const buttonLabel = button.textContent?.trim() ?? '';
        const isAllowed = Array.from(allowedLabels).some((label) =>
          buttonLabel.includes(label),
        );

        button.hidden = !isAllowed;
        button.setAttribute('aria-hidden', String(!isAllowed));
        button.tabIndex = isAllowed ? 0 : -1;
      });

      dashboard
        .querySelectorAll<HTMLElement>('[data-edit-control="true"]')
        .forEach((control) => {
          const isEnabled = profile.canUseEditControls;
          control.style.display = isEnabled ? '' : 'none';
          control.setAttribute('aria-hidden', String(!isEnabled));
        });
    };

    applyPolicy();
    const observer = new MutationObserver(applyPolicy);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [role]);

  if (!role) {
    return (
      <section
        className="mb-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5"
        dir="rtl"
      >
        <strong className="text-sm font-black text-amber-200">
          ڕۆڵی بەکارهێنەر دیاری نەکراوە
        </strong>
        <p className="mt-2 text-xs leading-7 text-slate-400">
          تا ڕۆڵێکی چالاک لە تۆماری بەکارهێنەر دیاری نەکرێت، مافی
          بەکارهێنانی بەشە ئۆپەراسیۆنییەکان نادرێت.
        </p>
      </section>
    );
  }

  const profile = ROLE_CATALOG[role];

  return (
    <section
      className="mb-5 overflow-hidden rounded-2xl border border-sky-400/15 bg-[#07170d] shadow-xl"
      dir="rtl"
      aria-label="ڕۆڵ و بەرپرسیارییەکان"
    >
      <div className="border-b border-white/5 bg-gradient-to-l from-sky-400/10 to-transparent p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-sky-300/20 bg-sky-300/10 text-sky-200">
              <UserCog size={20} />
            </span>
            <div>
              <span className="text-[10px] font-black text-sky-300">
                ڕۆڵی چالاکی بەکارهێنەر
              </span>
              <h2 className="mt-1 text-base font-black text-white">
                {profile.title}
              </h2>
              <p className="mt-2 max-w-4xl text-xs leading-7 text-slate-400">
                {profile.purpose}
              </p>
            </div>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-[10px] font-black text-emerald-200">
            <BadgeCheck size={14} />
            {ROLE_LABELS[role]}
          </span>
        </div>
      </div>

      <div className="grid gap-4 p-5 lg:grid-cols-[1fr_.8fr]">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-black text-slate-200">
            <ShieldCheck size={16} className="text-sky-300" />
            بەرپرسیارییە سەرەکییەکان
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            {profile.responsibilities.map((responsibility) => (
              <div
                key={responsibility}
                className="rounded-xl border border-white/5 bg-black/10 px-3 py-3 text-[11px] leading-6 text-slate-400"
              >
                {responsibility}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 text-xs font-black text-slate-200">
            بەشە ڕێگەپێدراوەکان
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.allowedModules.map((moduleId) => (
              <span
                key={moduleId}
                className="rounded-full border border-sky-300/15 bg-sky-300/5 px-3 py-1.5 text-[10px] font-bold text-sky-200"
              >
                {TAB_LABELS[moduleId]}
              </span>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-white/5 bg-black/10 p-3 text-[10px] leading-6 text-slate-500">
            مافی دەستکاری:{' '}
            <strong
              className={
                profile.canUseEditControls
                  ? 'text-emerald-300'
                  : 'text-amber-300'
              }
            >
              {profile.canUseEditControls
                ? 'ڕێگەپێدراوە'
                : 'سنووردارە؛ تەنها بینین ڕێگەپێدراوە'}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
