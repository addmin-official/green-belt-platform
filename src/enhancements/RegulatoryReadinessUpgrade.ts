const CALRECYCLE_SOURCE = 'https://calrecycle.ca.gov/regulatedbusiness/';

const readinessItems = [
  {
    title: 'تۆمارکردن و ناسنامەدان',
    body: 'ڕێستورانت، گواستنەوەر، شوێنی پرۆسەکردن و تاقیگە دەبێت ناسنامە و دۆخی پەسەندکردنی ڕوونیان هەبێت.',
  },
  {
    title: 'مۆڵەت و پێش‌مەرجی کارکردن',
    body: 'هیچ شوێنێکی پرۆسەکردن پێش هەڵسەنگاندنی یاسایی، ژینگەیی، تەندروستی و سەلامەتی بەکارنەهێنرێت.',
  },
  {
    title: 'ڕاپۆرت و زنجیرەی بەڵگە',
    body: 'کێش، سەرچاوە، گواستنەوە، وەجبە، نموونە و ئەنجامی تاقیگە دەبێت لە یەک زنجیرەی پشکنین‌پێکراودا تۆمار بکرێن.',
  },
  {
    title: 'چاودێری دارایی و خزمەتگوزاری',
    body: 'هەر خەرجی، کرێ، پارەدان و خزمەتگوزارییەک دەبێت بە گرێبەست، پسوولە و بەرپرسی دیاریکراو بەسترابێتەوە.',
  },
];

const regulatedRoles = [
  'ڕێستورانت و بەرهەمهێنەری پاشماوەی خۆراک',
  'کۆکەرەوە و گواستنەوەری پەسەندکراو',
  'شوێنی وەرگرتن و پرۆسەکردنی پاشماوە',
  'بەڕێوەبەری وەجبەی پەیینسازی',
  'تاقیگە و لایەنی دڵنیایی جۆرایەتی',
  'بەڕێوەبەری پلاتفۆرم و چاودێری داتا',
];

function buildRegulatorySection(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'regulatory-readiness';
  section.setAttribute('aria-labelledby', 'regulatory-readiness-title');

  section.innerHTML = `
    <div class="regulatory-readiness__intro">
      <span class="regulatory-readiness__kicker">ئامادەیی بۆ کارکردنی ڕێکخراو</span>
      <h2 id="regulatory-readiness-title">چارچێوەی بەڕێوەبردن، مۆڵەت و ڕاپۆرتکردن</h2>
      <p>
        کەمەربەندی سەوز لە مۆدێلی CalRecycle تەنها وەک سەرچاوەی فێربوون سوود وەردەگرێت: تۆمارکردن، مۆڵەت، ڕاپۆرتکردن، چاودێری و بەرپرسیاریی ڕوون. ئەم چارچێوەیە یاسای کالیفۆرنیا بۆ عێراق جێبەجێ ناکات؛ بەڵکو بنەمایەکی پیشەیی بۆ دیزاینکردنی سیستەمی خۆمان دابین دەکات.
      </p>
    </div>

    <div class="regulatory-readiness__grid">
      ${readinessItems.map((item, index) => `
        <article>
          <span class="regulatory-readiness__number">٠${index + 1}</span>
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        </article>
      `).join('')}
    </div>

    <div class="regulatory-readiness__roles">
      <div class="regulatory-readiness__roles-copy">
        <span>لایەنە ژێرچاودێرییەکان</span>
        <h3>هەر لایەنێک ڕۆڵ، ماف و بەرپرسیاریی دیاریکراوی هەبێت</h3>
        <p>
          دەستگەیشتن بە پلاتفۆرم، مۆڵەت و ڕاپۆرت بەپێی ڕۆڵ جیا دەکرێتەوە. هیچ بەکارهێنەرێکی بێ ڕۆڵ نابێت داتای ناوخۆیی ببینێت یان کردارێکی مەیدانی تۆمار بکات.
        </p>
      </div>
      <div class="regulatory-readiness__role-list">
        ${regulatedRoles.map((role) => `<span>${role}</span>`).join('')}
      </div>
    </div>

    <div class="regulatory-readiness__footer">
      <p>
        سەرچاوەی فێربوون: پەڕەی Regulated Businesses ـی CalRecycle، کە دامەزراوە، گواستنەوەر، پەیینسازی، ڕاپۆرتکردن و پڕۆسەی مۆڵەتکردن جیا دەکاتەوە.
      </p>
      <a href="${CALRECYCLE_SOURCE}" target="_blank" rel="noreferrer">بینینی سەرچاوەی فەرمی</a>
    </div>
  `;

  return section;
}

function insertRegulatorySection(): boolean {
  if (document.querySelector('.regulatory-readiness')) {
    return true;
  }

  const evidenceSection = document.querySelector<HTMLElement>('.erbil-evidence');

  if (!evidenceSection) {
    return false;
  }

  evidenceSection.insertAdjacentElement('afterend', buildRegulatorySection());
  return true;
}

function initializeRegulatoryReadiness(): void {
  if (insertRegulatorySection()) {
    return;
  }

  const observer = new MutationObserver(() => {
    if (insertRegulatorySection()) {
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeRegulatoryReadiness, {
    once: true,
  });
} else {
  initializeRegulatoryReadiness();
}
