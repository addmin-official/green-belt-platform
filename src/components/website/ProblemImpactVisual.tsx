import {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  AlertTriangle,
  ArrowUpLeft,
  Building2,
  Database,
  ExternalLink,
  Factory,
  Leaf,
  MapPin,
  Recycle,
  Route,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import './ProblemImpactVisual.css';

type ProblemCard = {
  title: string;
  body: string;
};

type ProblemImpactVisualProps = {
  cards: ProblemCard[];
};

const RESEARCH_SOURCE =
  'https://www.researchgate.net/figure/Satellite-image-of-Erbil-Landfill-Kani-Qrzhala-site_fig4_323457594';

const cardIcons = [Recycle, Database, Truck];

const processItems = [
  {
    icon: Recycle,
    label: 'جیاکردنەوە',
    detail: 'لە سەرچاوە',
  },
  {
    icon: Route,
    label: 'گواستنەوە',
    detail: 'بە تۆماری دیجیتاڵی',
  },
  {
    icon: Database,
    label: 'بەرهەمهێنان',
    detail: 'کۆمپوست و داتا',
  },
];

const evidenceRows = [
  {
    current: 'پاشماوەی خۆراک لەگەڵ زبڵی گشتی تێکەڵ دەبێت',
    response: 'جیاکردنەوە لە سەرچاوە و پشکنینی هەر بار',
  },
  {
    current: 'کێش و پێکهاتەی پاشماوە بەردەوام تۆمار ناکرێت',
    response: 'کێشکردن، ناسنامەدان و زنجیرەی بەڵگە',
  },
  {
    current: 'ماددەی ئۆرگانیکی دەچێتە زبڵدان',
    response: 'گۆڕینی کۆنترۆڵکراو بۆ کۆمپوستی پشکنراو',
  },
  {
    current: 'کاریگەریی ژینگەیی بەبێ بنچینە بانگەشە دەکرێت',
    response: 'پێوانەکردنی کێش، تێچوو و ئەنجام بە داتای بەڵگەدار',
  },
];

function useViewportActivity() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = rootRef.current;

    if (!element) {
      return;
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    if (reducedMotion.matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        rootMargin: '120px 0px',
        threshold: 0.08,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { rootRef, isActive };
}

function CircularEconomyIllustration() {
  return (
    <svg
      className="circular-impact__svg"
      viewBox="0 0 800 560"
      role="img"
      aria-labelledby="circular-impact-title circular-impact-description"
    >
      <title id="circular-impact-title">
        مۆدێلی بازنەیی کەمەربەندی سەوز
      </title>
      <desc id="circular-impact-description">
        گۆڕینی پاشماوەی خۆراک بۆ کۆمپوست، داتا و کاریگەریی پێوانەکراو
      </desc>

      <defs>
        <linearGradient id="greenLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f7f49" />
          <stop offset="100%" stopColor="#56d68d" />
        </linearGradient>
        <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="12"
            stdDeviation="14"
            floodColor="#0d5e37"
            floodOpacity=".16"
          />
        </filter>
      </defs>

      <g
        fill="none"
        stroke="url(#greenLine)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          className="circular-impact__flow"
          strokeDasharray="18 16"
          d="M115 150 H270 C315 150 315 245 360 245 H445"
        />
        <path
          className="circular-impact__flow"
          strokeDasharray="18 16"
          d="M445 245 H560 C605 245 605 155 650 155 H710"
        />
        <path
          className="circular-impact__flow"
          strokeDasharray="18 16"
          d="M360 330 H240 C195 330 195 425 150 425 H90"
        />
        <path
          className="circular-impact__flow"
          strokeDasharray="18 16"
          d="M445 330 H565 C610 330 610 430 655 430 H720"
        />
      </g>

      <g className="circular-impact__float" filter="url(#softShadow)">
        <circle cx="402" cy="285" r="118" fill="#edf6eb" stroke="#178553" strokeWidth="8" />
        <circle
          className="circular-impact__pulse"
          cx="402"
          cy="285"
          r="92"
          fill="#ffffff"
          stroke="#56d68d"
          strokeWidth="4"
          strokeDasharray="10 12"
        />
        <path d="M348 225 H456 L444 370 H360 Z" fill="#f8fcf7" stroke="#0f7f49" strokeWidth="7" />
        <path d="M368 225 V200 H438 V225" stroke="#0f7f49" strokeWidth="7" strokeLinecap="round" />
        <path d="M401 274 C366 244 356 307 399 337 C442 306 436 246 401 274 Z" fill="#178553" />
        <text x="402" y="257" textAnchor="middle" fill="#0f7f49" fontSize="24" fontWeight="800" fontFamily="Arial, sans-serif">
          COMPOST
        </text>
      </g>

      <g fill="#fff" stroke="#0f7f49" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M82 112 H184 L214 146 V206 H82 Z" />
        <path d="M184 112 V146 H214" />
        <circle cx="112" cy="214" r="15" />
        <circle cx="184" cy="214" r="15" />

        <path d="M608 108 H692 L722 140 V202 H608 Z" />
        <path d="M692 108 V140 H722" />
        <circle cx="635" cy="210" r="15" />
        <circle cx="700" cy="210" r="15" />

        <path d="M64 390 H177 L205 425 V486 H64 Z" />
        <circle cx="95" cy="494" r="15" />
        <circle cx="176" cy="494" r="15" />

        <path d="M608 390 H692 L725 425 V486 H608 Z" />
        <circle cx="637" cy="494" r="15" />
        <circle cx="700" cy="494" r="15" />
      </g>
    </svg>
  );
}

function ErbilEvidenceMap() {
  return (
    <svg
      className="erbil-evidence__map-svg"
      viewBox="0 0 860 510"
      role="img"
      aria-labelledby="erbil-map-title erbil-map-description"
    >
      <title id="erbil-map-title">
        نەخشەی ڕوونکەرەوەی هەولێر و کانی‌قرژاڵە
      </title>
      <desc id="erbil-map-description">
        نەخشەیەکی نوێی ڕوونکەرەوە بۆ پیشاندانی پەیوەندی نێوان ناوەندی هەولێر، شوێنی مێژوویی زبڵدان و دەستێوەردانی پێشنیارکراوی کەمەربەندی سەوز
      </desc>

      <defs>
        <radialGradient id="mapGround" cx="60%" cy="48%" r="75%">
          <stop offset="0%" stopColor="#dbe3c8" />
          <stop offset="55%" stopColor="#c5c49f" />
          <stop offset="100%" stopColor="#9b9876" />
        </radialGradient>
        <linearGradient id="cityGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4f7e9" stopOpacity=".95" />
          <stop offset="100%" stopColor="#d6dfc0" stopOpacity=".45" />
        </linearGradient>
        <filter id="mapShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="9" stdDeviation="8" floodColor="#102518" floodOpacity=".24" />
        </filter>
      </defs>

      <rect width="860" height="510" rx="24" fill="url(#mapGround)" />
      <g opacity=".18" stroke="#344a34" strokeWidth="2">
        <path d="M20 78 C180 112 235 42 395 88 S680 152 840 92" />
        <path d="M10 354 C210 314 325 410 480 350 S700 278 850 344" />
        <path d="M70 10 C105 155 43 265 110 500" />
        <path d="M730 8 C682 160 768 275 708 510" />
      </g>

      <g transform="translate(545 258)">
        <circle r="152" fill="url(#cityGlow)" stroke="#f6f8ed" strokeWidth="4" opacity=".9" />
        <circle r="110" fill="none" stroke="#7b8c6c" strokeWidth="4" />
        <circle r="67" fill="none" stroke="#7b8c6c" strokeWidth="4" />
        <circle r="27" fill="#f5efe0" stroke="#9c704d" strokeWidth="5" />
        <g stroke="#75866a" strokeWidth="5" strokeLinecap="round">
          <path d="M0 -150 V-28" />
          <path d="M0 28 V150" />
          <path d="M-150 0 H-28" />
          <path d="M28 0 H150" />
          <path d="M-105 -105 L-22 -22" />
          <path d="M22 22 L105 105" />
          <path d="M-105 105 L-22 22" />
          <path d="M22 -22 L105 -105" />
        </g>
        <text x="0" y="7" textAnchor="middle" fill="#233827" fontSize="21" fontWeight="800" fontFamily="Noto Sans Arabic, Arial, sans-serif">
          هەولێر
        </text>
      </g>

      <g filter="url(#mapShadow)" transform="translate(205 260)">
        <circle r="28" fill="#7d2e2e" stroke="#ffe2d4" strokeWidth="6" />
        <path d="M0 34 L-15 61 H15 Z" fill="#7d2e2e" />
        <circle r="8" fill="#ffe2d4" />
      </g>

      <path
        d="M235 260 C320 240 375 248 430 258"
        fill="none"
        stroke="#244f37"
        strokeWidth="5"
        strokeDasharray="12 10"
      />

      <g transform="translate(54 176)">
        <rect width="250" height="72" rx="16" fill="#13291c" fillOpacity=".94" stroke="#e9c77b" strokeOpacity=".45" />
        <text x="20" y="30" fill="#f5faf6" fontSize="17" fontWeight="800" fontFamily="Noto Sans Arabic, Arial, sans-serif">
          شوێنی مێژوویی کانی‌قرژاڵە
        </text>
        <text x="20" y="54" fill="#d8bd7b" fontSize="12" fontWeight="700" fontFamily="Noto Sans Arabic, Arial, sans-serif">
          بەڵگەی توێژینەوەی ساڵی ٢٠١٨
        </text>
      </g>

      <g transform="translate(570 64)">
        <rect width="230" height="72" rx="16" fill="#13291c" fillOpacity=".94" stroke="#56d68d" strokeOpacity=".42" />
        <text x="20" y="30" fill="#f5faf6" fontSize="17" fontWeight="800" fontFamily="Noto Sans Arabic, Arial, sans-serif">
          ناوەندی شاری هەولێر
        </text>
        <text x="20" y="54" fill="#8ed9aa" fontSize="12" fontWeight="700" fontFamily="Noto Sans Arabic, Arial, sans-serif">
          ناوچەی خزمەتگوزاریی پایلۆت
        </text>
      </g>
    </svg>
  );
}

function ErbilWasteEvidenceSection() {
  return (
    <section className="erbil-evidence" aria-labelledby="erbil-evidence-title">
      <div className="erbil-evidence__heading">
        <span className="erbil-evidence__kicker">
          <MapPin size={17} />
          بەڵگەی ناوخۆیی · هەولێر
        </span>
        <h3 id="erbil-evidence-title">
          دۆخی پاشماوەی هەولێر و شوێنی دەستێوەردانی کەمەربەندی سەوز
        </h3>
        <p>
          ئەم بەشە بەڵگەی مێژوویی، سنووری زانیاری و چارەسەری پێشنیارکراو بە یەکەوە دەبەستێتەوە. نەخشەکە نوێ و ڕوونکەرەوەیە؛ وێنەی توێژینەوەکە کۆپی نەکراوەتەوە.
        </p>
      </div>

      <div className="erbil-evidence__layout">
        <article className="erbil-evidence__map-card">
          <div className="erbil-evidence__map-head">
            <div>
              <span>نەخشەی ڕوونکەرەوە</span>
              <strong>هەولێر و کانی‌قرژاڵە</strong>
            </div>
            <span className="erbil-evidence__history-badge">
              بەڵگەی مێژوویی · ٢٠١٨
            </span>
          </div>

          <ErbilEvidenceMap />

          <div className="erbil-evidence__map-legend">
            <span><i className="city" /> ناوەندی شار</span>
            <span><i className="landfill" /> شوێنی زبڵدان</span>
            <span><i className="route" /> پەیوەندیی ڕوونکەرەوە</span>
          </div>
        </article>

        <div className="erbil-evidence__side">
          <article className="erbil-evidence__source-card">
            <div className="erbil-evidence__source-icon">
              <Factory size={23} />
            </div>
            <div>
              <span className="erbil-evidence__source-state">
                سەرچاوەی دەرەکی · مێژوویی
              </span>
              <h4>هەڵسەنگاندنی گەرمایی و داراییی پاشماوەی شارستانیی هەولێر</h4>
              <p>
                توێژینەوەی Aziz و Mustafa لە ساڵی ٢٠١٨ کێشەکانی زبڵدانی کراوە، تێکەڵکردنی پاشماوە و نەبوونی کۆکردنەوەی شلە و گاز باس دەکات. ئەم دۆزینەوانە بۆ ناساندنی دۆخی مێژوویی بەکار دەهێنرێن؛ نە بۆ بانگەشەی دۆخی ئێستای ٢٠٢٦.
              </p>
              <a href={RESEARCH_SOURCE} target="_blank" rel="noreferrer">
                بینینی سەرچاوەی توێژینەوە
                <ExternalLink size={15} />
              </a>
            </div>
          </article>

          <article className="erbil-evidence__boundary-card">
            <ShieldCheck size={22} />
            <div>
              <strong>سنووری زانیاری</strong>
              <p>
                هیچ شوێن، ژمارە یان دۆخێک بە «پشتڕاستکراو» نیشان نادرێت، مەگەر سەرچاوە، بەروار و بەڵگەی پشکنینی هەبێت.
              </p>
            </div>
          </article>
        </div>
      </div>

      <div className="erbil-evidence__comparison">
        <div className="erbil-evidence__comparison-head">
          <div>
            <span>لە کێشەوە بۆ چارەسەر</span>
            <h4>شوێنی ڕاستەقینەی دەستێوەردانی پایلۆت</h4>
          </div>
          <Leaf size={26} />
        </div>

        <div className="erbil-evidence__table" role="table" aria-label="بەراوردی دۆخی ئێستا و وەڵامی کەمەربەندی سەوز">
          <div className="erbil-evidence__table-row erbil-evidence__table-header" role="row">
            <span role="columnheader">دۆخی ئێستا</span>
            <span role="columnheader">وەڵامی کەمەربەندی سەوز</span>
          </div>
          {evidenceRows.map((row) => (
            <div className="erbil-evidence__table-row" role="row" key={row.current}>
              <span role="cell"><AlertTriangle size={16} />{row.current}</span>
              <span role="cell"><ArrowUpLeft size={16} />{row.response}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="erbil-evidence__decision-strip">
        <Building2 size={21} />
        <p>
          ئەم بەشە بۆ پلاندانانی پایلۆت و گفتوگۆی هاوبەشییە؛ شوێنی کۆتاییی پرۆسەکردن، ڕێڕەوی گواستنەوە و خاڵەکانی ڕێستورانت تەنها دوای پشکنین و ڕەزامەندیی نووسراو زیاد دەکرێن.
        </p>
      </div>
    </section>
  );
}

export default function ProblemImpactVisual({ cards }: ProblemImpactVisualProps) {
  const { rootRef, isActive } = useViewportActivity();

  return (
    <div
      ref={rootRef}
      className={isActive ? 'circular-impact is-active' : 'circular-impact'}
    >
      <div className="circular-impact__visual">
        <div className="circular-impact__eyebrow">
          <span>مۆدێلی ئابووریی بازنەیی</span>
          <strong>لە پاشماوەوە بۆ سەرچاوە</strong>
        </div>

        <div className="circular-impact__status">
          سیستەمی کەمەربەندی سەوز
        </div>

        <div className="circular-impact__stage">
          <CircularEconomyIllustration />
        </div>

        <div className="circular-impact__steps">
          {processItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div className="circular-impact__step" key={item.label}>
                <span className="circular-impact__step-number">
                  ٠{index + 1}
                </span>
                <span className="circular-impact__step-icon">
                  <Icon size={18} />
                </span>
                <span className="circular-impact__step-copy">
                  <strong>{item.label}</strong>
                  <small>{item.detail}</small>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="circular-impact__cards">
        {cards.map((card, index) => {
          const Icon = cardIcons[index] ?? AlertTriangle;

          return (
            <article className="circular-impact__card" key={card.title}>
              <div className="circular-impact__card-head">
                <span className="circular-impact__card-icon">
                  <Icon size={21} />
                </span>
                <span className="circular-impact__card-index">
                  ٠{index + 1}
                </span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <div className="circular-impact__card-state">
                خاڵی پێویستی بە چارەسەر
              </div>
            </article>
          );
        })}
      </div>

      <ErbilWasteEvidenceSection />
    </div>
  );
}
