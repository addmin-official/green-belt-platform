import {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  AlertTriangle,
  Database,
  Recycle,
  ScanLine,
  Truck,
} from 'lucide-react';
import { motion } from 'motion/react';

type ProblemCard = {
  title: string;
  body: string;
};

type ProblemImpactVisualProps = {
  cards: ProblemCard[];
};

const icons = [
  Recycle,
  Database,
  Truck,
];

function useSectionVisibility() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    const updateMotionPreference = () => {
      setReduceMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener(
      'change',
      updateMotionPreference,
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: '180px 0px',
        threshold: 0.08,
      },
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener(
        'change',
        updateMotionPreference,
      );
    };
  }, []);

  return {
    rootRef,
    shouldAnimate: isVisible && !reduceMotion,
  };
}

export default function ProblemImpactVisual({
  cards,
}: ProblemImpactVisualProps) {
  const {
    rootRef,
    shouldAnimate,
  } = useSectionVisibility();

  return (
    <div
      ref={rootRef}
      className={
        shouldAnimate
          ? 'problem-experience is-active'
          : 'problem-experience'
      }
    >
      <div className="problem-hologram-shell">
        <div className="problem-grid-floor" />

        <motion.div
          className="problem-core"
          initial={false}
          animate={
            shouldAnimate
              ? {
                  rotateY: [0, 120, 240, 360],
                  rotateX: [3, -3, 3],
                }
              : {
                  rotateY: 0,
                  rotateX: 0,
                }
          }
          transition={
            shouldAnimate
              ? {
                  duration: 36,
                  repeat: Infinity,
                  ease: 'linear',
                }
              : {
                  duration: 0,
                }
          }
        >
          <div className="problem-core-ring ring-a" />
          <div className="problem-core-ring ring-b" />
          <div className="problem-core-ring ring-c" />

          <motion.div
            className="problem-core-center"
            initial={false}
            animate={
              shouldAnimate
                ? {
                    scale: [1, 1.04, 1],
                  }
                : {
                    scale: 1,
                  }
            }
            transition={
              shouldAnimate
                ? {
                    duration: 4.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : {
                    duration: 0,
                  }
            }
          >
            <AlertTriangle size={42} />
          </motion.div>

          <div className="problem-orbit-data">
            <span>CO₂</span>
            <span>DATA</span>
            <span>WASTE</span>
          </div>
        </motion.div>

        <motion.div
          className="problem-scan-line"
          initial={false}
          animate={
            shouldAnimate
              ? {
                  y: [-130, 130],
                  opacity: [0, 0.75, 0],
                }
              : {
                  y: 0,
                  opacity: 0,
                }
          }
          transition={
            shouldAnimate
              ? {
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : {
                  duration: 0,
                }
          }
        />

        <div className="problem-sensor sensor-a">
          <ScanLine size={16} />
          <span>چاودێری سەرچاوە</span>
        </div>

        <div className="problem-sensor sensor-b">
          <Database size={16} />
          <span>تۆماری داتا</span>
        </div>

        <div className="problem-pulse pulse-a" />
        <div className="problem-pulse pulse-b" />
        <div className="problem-pulse pulse-c" />
      </div>

      <div className="problem-card-grid">
        {cards.map((card, index) => {
          const Icon = icons[index] ?? AlertTriangle;

          return (
            <motion.article
              className="problem-tech-card"
              key={card.title}
              initial={{
                opacity: 0,
                y: 22,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -4,
              }}
            >
              <div className="problem-card-glow" />

              <div className="problem-card-head">
                <span className="problem-card-index">
                  ٠{index + 1}
                </span>

                <span className="problem-card-icon">
                  <Icon size={23} />
                </span>
              </div>

              <h3>{card.title}</h3>
              <p>{card.body}</p>

              <div className="problem-card-status">
                <span />
                چاودێری چالاک
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
