import { useState } from 'react';
import { ShieldCheck, Users, X } from 'lucide-react';

import { useAuth } from '../../auth/AuthProvider';
import { ROLE_CATALOG } from '../../security/roleCatalog';
import type { PlatformRole } from '../../security/permissions';
import {
  assignUserRole,
  deactivateUserRole,
} from '../../services/userRoleService';
import InlineTextEditor from './InlineTextEditor';

const ROLE_KEYS = Object.keys(ROLE_CATALOG) as PlatformRole[];

export default function AdminControlCenter() {
  const { role, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] =
    useState<PlatformRole>('viewer');
  const [message, setMessage] = useState('');

  if (role !== 'admin') return null;

  const saveRole = async () => {
    if (!user?.uid || !uid.trim() || !email.trim()) return;

    await assignUserRole({
      uid: uid.trim(),
      email: email.trim(),
      role: selectedRole,
      assignedBy: user.uid,
      active: true,
    });

    setMessage('ڕۆڵی بەکارهێنەر بە سەرکەوتوویی دیاری کرا.');
  };

  const deactivate = async () => {
    if (!user?.uid || !uid.trim()) return;

    await deactivateUserRole({
      uid: uid.trim(),
      updatedBy: user.uid,
    });

    setMessage('هەژماری بەکارهێنەر ناچالاک کرا.');
  };

  return (
    <div data-admin-ui="true" dir="rtl">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[200] inline-flex items-center gap-2 rounded-xl border border-sky-400/30 bg-[#061720]/95 px-4 py-3 text-sm font-black text-sky-100 shadow-2xl"
      >
        <ShieldCheck size={18} />
        پانێڵی بەڕێوەبەر
      </button>

      {open ? (
        <aside className="fixed inset-y-0 right-0 z-[300] w-full max-w-md overflow-y-auto border-l border-sky-400/20 bg-[#06110a]/98 p-5 text-slate-100 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black text-sky-300">
                دەسەڵاتی گشتیی بەڕێوەبردن
              </span>
              <h2 className="mt-1 text-xl font-black">
                پانێڵی بەڕێوەبەری گشتی
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-white/10 p-2"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-6">
            <InlineTextEditor />
          </div>

          <section className="mt-4 rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-4">
            <div className="flex items-center gap-2 text-sm font-black text-emerald-100">
              <Users size={17} />
              بەڕێوەبردنی بەکارهێنەر و ڕۆڵ
            </div>

            <div className="mt-3 grid gap-3">
              <input
                value={uid}
                onChange={(event) => setUid(event.target.value)}
                placeholder="ناسنامەی بەکارهێنەر"
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm"
              />
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ئیمەیڵی بەکارهێنەر"
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm"
              />
              <select
                value={selectedRole}
                onChange={(event) =>
                  setSelectedRole(event.target.value as PlatformRole)
                }
                className="rounded-xl border border-white/10 bg-[#07170d] px-3 py-2.5 text-sm"
              >
                {ROLE_KEYS.map((item) => (
                  <option key={item} value={item}>
                    {ROLE_CATALOG[item].title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={saveRole}
                className="rounded-xl bg-emerald-500/15 px-4 py-2 text-xs font-black text-emerald-200"
              >
                دیاریکردنی ڕۆڵ
              </button>
              <button
                type="button"
                onClick={deactivate}
                className="rounded-xl bg-red-500/10 px-4 py-2 text-xs font-black text-red-200"
              >
                ناچالاککردنی هەژمار
              </button>
            </div>
          </section>

          {message ? (
            <p className="mt-4 rounded-xl border border-sky-400/15 bg-sky-400/5 p-3 text-xs text-sky-200">
              {message}
            </p>
          ) : null}
        </aside>
      ) : null}
    </div>
  );
}
