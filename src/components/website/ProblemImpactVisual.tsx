import {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  AlertTriangle,
  Database,
  Recycle,
  Route,
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

const cardIcons = [
  Recycle,
  Database,
  Truck,
];

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

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    rootRef,
    isActive,
  };
}

function CircularEconomyIllustration() {
  return (
    <svg
      className="circular-impact__svg"
      viewBox="0 0 800 800"
      role="img"
      aria-labelledby="circular-impact-title circular-impact-description"
    >
      <title id="circular-impact-title">
        مۆدێلی بازنەیی کەمەربەندی سەوز
      </title>
      <desc id="circular-impact-description">
        گۆڕینی پاشماوەی خۆراک بۆ کۆمپوست، گواستنەوەی ڕێکخراو و گەڕاندنەوەی سەرچاوەکان بۆ ژینگە
      </desc>

      <defs>
        <linearGradient id="greenLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f7f49" />
          <stop offset="100%" stopColor="#56d68d" />
        </linearGradient>
        <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#0d5e37" floodOpacity=".16" />
        </filter>
      </defs>

      <g fill="none" stroke="url(#greenLine)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path className="circular-impact__flow" strokeDasharray="18 16" d="M120 170 H250 C290 170 290 245 330 245 H440 C485 245 485 160 530 160 H680" />
        <path className="circular-impact__flow" strokeDasharray="18 16" d="M95 515 H230 C275 515 275 445 320 445 H455 C500 445 500 540 545 540 H700" />
        <path className="circular-impact__flow" strokeDasharray="18 16" d="M185 300 V410 C185 455 250 455 250 500 V645" />
        <path className="circular-impact__flow" strokeDasharray="18 16" d="M615 250 V360 C615 405 555 405 555 450 V630" />
      </g>

      <g className="circular-impact__float" filter="url(#softShadow)">
        <circle cx="400" cy="355" r="128" fill="#edf6eb" stroke="#178553" strokeWidth="8" />
        <circle className="circular-impact__pulse" cx="400" cy="355" r="102" fill="#ffffff" stroke="#56d68d" strokeWidth="4" strokeDasharray="10 12" />

        <path d="M338 278 H462 L448 454 H352 Z" fill="#f8fcf7" stroke="#0f7f49" strokeWidth="7" strokeLinejoin="round" />
        <path d="M360 278 V250 H440 V278" stroke="#0f7f49" strokeWidth="7" strokeLinecap="round" />
        <circle cx="372" cy="441" r="15" fill="#edf6eb" stroke="#0f7f49" strokeWidth="6" />
        <circle cx="428" cy="441" r="15" fill="#edf6eb" stroke="#0f7f49" strokeWidth="6" />
        <path d="M400 345 C360 312 350 380 398 409 C446 378 437 313 400 345 Z" fill="#178553" />
        <text x="400" y="326" textAnchor="middle" fill="#0f7f49" fontSize="30" fontWeight="800" fontFamily="Arial, sans-serif">COMPOST</text>
      </g>

      <g className="circular-impact__float" fill="#fff" stroke="#0f7f49" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M95 135 H200 L225 175 V235 H95 Z" />
        <path d="M112 135 V105 H165 V135" />
        <circle cx="125" cy="242" r="17" />
        <circle cx="195" cy="242" r="17" />

        <path d="M565 120 H650 L686 158 V218 H565 Z" />
        <path d="M650 120 V158 H686" />
        <circle cx="590" cy="225" r="17" />
        <circle cx="660" cy="225" r="17" />

        <path d="M95 495 H205 L232 530 V590 H95 Z" />
        <circle cx="126" cy="598" r="17" />
        <circle cx="199" cy="598" r="17" />

        <path d="M560 515 H652 L685 548 V608 H560 Z" />
        <circle cx="590" cy="616" r="17" />
        <circle cx="660" cy="616" r="17" />
      </g>

      <g fill="#fff" stroke="#0f7f49" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M72 300 L115 275 L155 300 V360 H72 Z" />
        <path d="M88 360 V404 H142 V360" />
        <path d="M652 292 C676 260 709 278 710 312 C711 345 680 363 653 340 C625 365 593 346 594 313 C595 280 628 261 652 292 Z" />
        <path d="M653 340 V405" />
        <path d="M315 625 L345 590 L375 625 V690 H315 Z" />
        <path d="M610 650 C625 610 654 610 668 650 C653 666 625 666 610 650 Z" />
        <path d="M639 650 V700" />
      </g>

      <g fill="#0f7f49">
        <circle cx="120" cy="170" r="9" />
        <circle cx="680" cy="160" r="9" />
        <circle cx="95" cy="515" r="9" />
        <circle cx="700" cy="540" r="9" />
      </g>
    </svg>
  );
}

export default function ProblemImpactVisual({
  cards,
}: ProblemImpactVisualProps) {
  const {
    rootRef,
    isActive,
  } = useViewportActivity();

  return (
    <div
      ref={rootRef}
      className={
        isActive
          ? 'circular-impact is-active'
          : 'circular-impact'
      }
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
              <div
                className="circular-impact__step"
                key={item.label}
              >
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
            <article
              className="circular-impact__card"
              key={card.title}
            >
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
    </div>
  );
}
