import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { failed: boolean };

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Green Belt application failure', error, info);
  }

  render() {
    if (this.state.failed) {
      return (
        <main className="grid min-h-screen place-items-center bg-[#051109] p-6 text-slate-100" dir="rtl">
          <section className="max-w-xl rounded-2xl border border-red-400/20 bg-red-400/5 p-6 text-center">
            <h1 className="text-xl font-black text-red-200">هەڵەیەکی نائاسایی ڕوویدا</h1>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              بۆ پاراستنی داتا، کردارەکە وەستێنرا. پەڕەکە نوێ بکەرەوە؛ ئەگەر هەڵەکە بەردەوام بوو، بە بەڕێوەبەری سیستەم ڕابگەیەنە.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold"
            >
              نوێکردنەوەی پەڕە
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
