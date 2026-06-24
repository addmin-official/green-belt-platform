import { useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Leaf,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from 'lucide-react';

import { useAuth } from '../auth/AuthProvider';

type LoginPageProps = {
  onBack: () => void;
};

function getAuthErrorMessage(code?: string): string {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'ئیمەیڵ یان وشەی نهێنی دروست نییە.';

    case 'auth/too-many-requests':
      return 'هەوڵی زۆر دراوە. دوای ماوەیەک دووبارە هەوڵ بدە.';

    case 'auth/network-request-failed':
      return 'پەیوەندی ئینتەرنێت هەڵەی هەیە.';

    case 'auth/invalid-email':
      return 'فۆرماتی ئیمەیڵ دروست نییە.';

    default:
      return 'چوونەژوورەوە سەرکەوتوو نەبوو.';
  }
}

export default function LoginPage({ onBack }: LoginPageProps) {
  const { signIn, configured } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('ئیمەیڵ و وشەی نهێنی بنووسە.');
      return;
    }

    try {
      setSubmitting(true);
      await signIn(email, password);
    } catch (caughtError) {
      const authError = caughtError as { code?: string };
      setError(getAuthErrorMessage(authError.code));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#041008] px-4 py-10 text-white"
      dir="rtl"
      lang="ku"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.1),transparent_35%)]" />

      <button
        type="button"
        onClick={onBack}
        className="absolute right-5 top-5 z-10 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-200 backdrop-blur transition hover:bg-white/10"
      >
        <ArrowLeft size={17} />
        گەڕانەوە بۆ وێبسایت
      </button>

      <section className="relative z-10 w-full max-w-md rounded-3xl border border-emerald-500/20 bg-[#07180d]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-500/10">
            <Leaf className="h-7 w-7 text-emerald-400" />
          </div>

          <h1 className="text-2xl font-black">
            پلاتفۆرمی کەمەربەندی سەوز
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            بۆ بینینی داشبۆردی پایلۆت بچۆ ژوورەوە.
          </p>
        </div>

        {!configured ? (
          <div className="mb-5 rounded-xl border border-amber-400/25 bg-amber-400/10 p-4 text-sm leading-6 text-amber-200">
            Firebase Web configuration تەواو نییە. زانیارییەکانی
            <code className="mx-1">.env</code>
            دابنێ و دووبارە build بکە.
          </div>
        ) : null}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-200">
              ئیمەیڵ
            </span>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4">
              <Mail size={18} className="text-emerald-400" />

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                placeholder="demo@greenbelt.krd"
                className="min-w-0 flex-1 bg-transparent py-3.5 text-left text-sm text-white outline-none placeholder:text-slate-600"
                dir="ltr"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-200">
              وشەی نهێنی
            </span>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4">
              <LockKeyhole size={18} className="text-emerald-400" />

              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                className="min-w-0 flex-1 bg-transparent py-3.5 text-left text-sm text-white outline-none"
                dir="ltr"
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="text-slate-400 transition hover:text-white"
                aria-label="نیشاندانی وشەی نهێنی"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          {error ? (
            <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting || !configured}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3.5 text-sm font-black text-[#041008] transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? (
              <LoaderCircle className="h-5 w-5 animate-spin" />
            ) : (
              <ShieldCheck size={19} />
            )}

            {submitting ? 'چوونەژوورەوە...' : 'چوونە ناو پلاتفۆرم'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs leading-5 text-slate-500">
          ئەم پلاتفۆرمە لە قۆناغی پێشکەشکردن و دیمۆدایە.
        </p>
      </section>
    </main>
  );
}
