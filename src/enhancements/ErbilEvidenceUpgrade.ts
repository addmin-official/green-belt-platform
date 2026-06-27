const LANDFILL_LAT = 36.173056;
const LANDFILL_LNG = 43.592222;
const MAP_BBOX = '43.38,36.02,44.16,36.36';

const OPENSTREETMAP_EMBED =
  `https://www.openstreetmap.org/export/embed.html?bbox=${MAP_BBOX}` +
  `&layer=mapnik&marker=${LANDFILL_LAT},${LANDFILL_LNG}`;

const OPENSTREETMAP_LINK =
  `https://www.openstreetmap.org/?mlat=${LANDFILL_LAT}` +
  `&mlon=${LANDFILL_LNG}#map=12/${LANDFILL_LAT}/${LANDFILL_LNG}`;

function setText(selector: string, text: string): void {
  const element = document.querySelector<HTMLElement>(selector);

  if (element) {
    element.textContent = text;
  }
}

function upgradeEvidenceSection(): boolean {
  const section = document.querySelector<HTMLElement>('.erbil-evidence');

  if (!section || section.dataset.mapUpgrade === 'complete') {
    return Boolean(section);
  }

  const mapSvg = section.querySelector<SVGElement>('.erbil-evidence__map-svg');

  if (!mapSvg) {
    return false;
  }

  const mapFrame = document.createElement('div');
  mapFrame.className = 'erbil-live-map';
  mapFrame.innerHTML = `
    <iframe
      title="نەخشەی ڕاستەقینەی شوێنی زبڵدانی کانی‌قرژاڵە لە هەولێر"
      src="${OPENSTREETMAP_EMBED}"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen
    ></iframe>
    <div class="erbil-live-map__overlay">
      <div>
        <span>شوێنی توێژینەوە</span>
        <strong>زبڵدانی کانی‌قرژاڵە — هەولێر</strong>
        <small>36°10′23″N · 43°35′32″E</small>
      </div>
      <a href="${OPENSTREETMAP_LINK}" target="_blank" rel="noreferrer">
        کردنەوەی نەخشەی گەورە
      </a>
    </div>
  `;

  mapSvg.replaceWith(mapFrame);

  setText(
    '.erbil-evidence__heading h3',
    'بەڵگەی شوێنی: زبڵدانی کانی‌قرژاڵە و پەیوەندییەکەی بە بەڕێوەبردنی پاشماوەی هەولێر',
  );
  setText(
    '.erbil-evidence__heading p',
    'ئەم بەشە شوێنی زبڵدانی کانی‌قرژاڵە لەسەر نەخشەی ڕاستەقینە نیشان دەدات و دۆزینەوە مێژووییەکانی توێژینەوەی ٢٠١٨ لە داتای ئێستای پڕۆژە جیا دەکاتەوە. شوێنەکە بنەمای ڕوونکردنەوەی کێشەی بەڕێوەبردنی پاشماوەیە؛ نە شوێنی پشتڕاستکراوی جێبەجێکردنی پایلۆت.',
  );
  setText('.erbil-evidence__map-head span', 'نەخشەی ڕاستەقینە و جووڵاو');
  setText('.erbil-evidence__map-head strong', 'شوێنی زبڵدانی کانی‌قرژاڵە لە ڕۆژئاوای هەولێر');
  setText(
    '.erbil-evidence__source-card h4',
    'هەڵسەنگاندنی گەرمایی و داراییی پاشماوەی شارستانی لە شاری هەولێر',
  );
  setText(
    '.erbil-evidence__source-card p',
    'توێژینەوەی Aziz و Mustafa شوێنی کانی‌قرژاڵە لەسەر ڕێگای هەولێر–موسڵ دیاری دەکات؛ بە دووری نزیکەی ١٥ کیلۆمەتر لە ناوەندی شار و بە ڕووبەری ٣٧ هێکتار. دۆزینەوەکانی ساڵی ٢٠١٧ تێکەڵکردنی پاشماوە، نەبوونی کۆکردنەوەی گاز و شلەی دەرچوو و پێویستیی سیستەمی جیاکردنەوە باس دەکەن. ئەم زانیارییانە تەنها وەک بنچینەی مێژوویی بەکار دەهێنرێن و نابێت وەک دۆخی پشتڕاستکراوی ٢٠٢٦ بخوێندرێنەوە.',
  );
  setText(
    '.erbil-evidence__boundary-card strong',
    'سنووری بەڵگە و بەرواری زانیاری',
  );
  setText(
    '.erbil-evidence__boundary-card p',
    'شوێن و زانیارییە بنەڕەتییەکان لە توێژینەوەی بڵاوکراوەی ٢٠١٨ و سەردانی مەیدانیی ٢٠١٧ هاتوون. هەر بانگەشەیەک دەربارەی دۆخی ئێستا پێویستی بە پشکنینی نوێ، سەرچاوەی نوێ و بەرواری ڕوون هەیە.',
  );
  setText(
    '.erbil-evidence__comparison-head span',
    'لە بەڵگەی مێژووییەوە بۆ دەستێوەردانی پێوانەکراو',
  );
  setText(
    '.erbil-evidence__comparison-head h4',
    'کەمەربەندی سەوز چۆن بەشێک لە کێشەکە لە سەرچاوەوە چارەسەر دەکات',
  );
  setText(
    '.erbil-evidence__decision-strip p',
    'پایلۆتی کەمەربەندی سەوز جێگرەوەی سیستەمی بەڕێوەبردنی پاشماوەی شار نییە. دەستێوەردانەکە بە شێوەی سنووردار لە جیاکردنەوەی پاشماوەی خۆراک لە ڕێستورانت، تۆمارکردنی بار و پرۆسەکردنی کۆنترۆڵکراو دەست پێ دەکات. شوێنی پرۆسەکردن و ڕێڕەوی گواستنەوە تەنها دوای هەڵسەنگاندنی یاسایی، ژینگەیی و تەکنیکی دیاری دەکرێن.',
  );

  const legend = section.querySelector<HTMLElement>('.erbil-evidence__map-legend');

  if (legend) {
    legend.innerHTML = `
      <span><i class="landfill"></i> نیشانە: شوێنی کانی‌قرژاڵە</span>
      <span><i class="city"></i> نەخشە: OpenStreetMap</span>
      <span><i class="route"></i> شوێن: بەپێی توێژینەوەی ٢٠١٨</span>
    `;
  }

  section.dataset.mapUpgrade = 'complete';
  return true;
}

function initializeEvidenceUpgrade(): void {
  if (upgradeEvidenceSection()) {
    return;
  }

  const observer = new MutationObserver(() => {
    if (upgradeEvidenceSection()) {
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeEvidenceUpgrade, {
    once: true,
  });
} else {
  initializeEvidenceUpgrade();
}
