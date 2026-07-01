const replacements: Array<[string, string]> = [
  ['پەسەندکراوی دامەزراوەی روانگە و DCA', 'پێشنیارکراو بۆ هەڵسەنگاندنی هاوبەشان'],
  ['مۆری نێودەوڵەتی', 'ناسنامەی ناوخۆیی و بەدواداچوونپێکراوی'],
  ['ڕێکخراوی نیشتمانی DCA', 'ڕێنمایی ناوخۆیی دڵنیایی جۆرایەتی'],
  ['کۆمپوستی ئۆرگانیک', 'پەیینی سروشتی'],
  ['کۆمپوستی بەرهەمهاتوو', 'پەیینی سروشتیی بەرهەمهاتوو'],
  ['زنجیرەی کۆمپوستکردن', 'زنجیرەی پەیینسازی'],
  ['دەستەی بەرهەم', 'وەجبەی بەرهەم'],
];

function applyTextDiscipline(root: ParentNode = document): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let current = walker.nextNode();

  while (current) {
    if (current.parentElement && !['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT'].includes(current.parentElement.tagName)) {
      nodes.push(current as Text);
    }
    current = walker.nextNode();
  }

  nodes.forEach((node) => {
    let value = node.nodeValue ?? '';
    replacements.forEach(([from, to]) => {
      value = value.replaceAll(from, to);
    });
    node.nodeValue = value;
  });
}

function markDemonstrationMetrics(): void {
  document.querySelectorAll<HTMLElement>('[data-platform-dashboard-mode]').forEach((root) => {
    if (root.querySelector('[data-claim-discipline-badge]')) return;

    const badge = document.createElement('div');
    badge.dataset.claimDisciplineBadge = 'true';
    badge.dir = 'rtl';
    badge.textContent = 'پێوەرە ژمارەییەکان تا کاتی پەیوەستکردنی سەرچاوەی مەیدانی، بە داتای نمایشی مامەڵەیان لەگەڵ دەکرێت.';
    badge.style.cssText = 'margin:0 0 16px;padding:12px 14px;border:1px solid rgba(245,158,11,.2);border-radius:14px;background:rgba(245,158,11,.06);color:#fde68a;font-size:11px;font-weight:800;line-height:1.8;text-align:right';
    root.prepend(badge);
  });
}

function run(): void {
  applyTextDiscipline();
  markDemonstrationMetrics();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', run, { once: true });
} else {
  run();
}

const observer = new MutationObserver(() => run());
observer.observe(document.documentElement, { childList: true, subtree: true });
