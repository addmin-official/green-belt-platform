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

export default function ProblemImpactVisual({
  cards,
}: ProblemImpactVisualProps) {
  return (
    <div className="problem-experience">
      <div className="problem-hologram-shell">
        <div className="problem-grid-floor" />

        <motion.div
          className="problem-core"
          animate={{
            rotateY: [0, 360],
            rotateX: [4, -4, 4],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="problem-core-ring ring-a" />
          <div className="problem-core-ring ring-b" />
          <div className="problem-core-ring ring-c" />

          <motion.div
            className="problem-core-center"
            animate={{
              scale: [1, 1.08, 1],
              boxShadow: [
                '0 0 35px rgba(86,214,141,.22)',
                '0 0 70px rgba(86,214,141,.42)',
                '0 0 35px rgba(86,214,141,.22)',
              ],
            }}
            transition={{
              duration: 3.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
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
          animate={{
            y: [-150, 150],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
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
                y: 35,
                rotateX: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotateX: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.65,
                delay: index * 0.12,
              }}
              whileHover={{
                y: -8,
                rotateX: 2,
                rotateY: index === 1 ? 0 : index === 0 ? 2 : -2,
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
