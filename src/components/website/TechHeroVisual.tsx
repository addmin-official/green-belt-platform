import { Database, Leaf, ShieldCheck, TreePine } from 'lucide-react';
import { motion } from 'motion/react';

type Language = 'ku' | 'ar' | 'en';

type TechHeroVisualProps = {
  language: Language;
};

export default function TechHeroVisual({
  language,
}: TechHeroVisualProps) {
  const copy = {
    ku: {
      monitorLabel: 'چاودێری زیرەک',
      monitorValue: 'پشکنینی بەردەوام',
      beltLabel: 'پشتێنەی سەوزایی',
      beltValue: 'گەشەی پێوانەکراو',
      status: 'سیستەمی هەڵسەنگاندن ئامادەیە',
    },
    ar: {
      monitorLabel: 'مراقبة ذكية',
      monitorValue: 'تحقق مستمر',
      beltLabel: 'الحزام الأخضر',
      beltValue: 'نمو قابل للقياس',
      status: 'نظام التقييم جاهز',
    },
    en: {
      monitorLabel: 'Smart monitoring',
      monitorValue: 'Continuous verification',
      beltLabel: 'Green belt',
      beltValue: 'Measurable growth',
      status: 'Assessment system ready',
    },
  }[language];

  return (
    <motion.div
      className="hero-visual hero-visual-3d"
      initial={{ opacity: 0, scale: 0.92, rotateY: -8 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1, delay: 0.1 }}
    >
      <div className="tech-orbit orbit-one" />
      <div className="tech-orbit orbit-two" />
      <div className="tech-orbit orbit-three" />

      <div className="green-world">
        <div className="world-grid" />
        <div className="world-glow" />

        <div className="smart-city">
          <span className="tower tower-one" />
          <span className="tower tower-two" />
          <span className="tower tower-three" />
          <span className="tower tower-four" />
        </div>

        <div className="green-belt-ring">
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={index}
              className="tree-node"
              style={{
                transform: `rotate(${index * 20}deg) translateY(-132px)`,
              }}
            >
              <TreePine size={18} />
            </span>
          ))}
        </div>

        <div className="drone-system">
          <span className="drone-body">
            <Leaf size={21} />
          </span>

          <i className="drone-arm arm-one" />
          <i className="drone-arm arm-two" />
          <i className="drone-rotor rotor-one" />
          <i className="drone-rotor rotor-two" />
          <i className="drone-rotor rotor-three" />
          <i className="drone-rotor rotor-four" />
          <span className="drone-scan" />
        </div>

        <div className="data-core">
          <Database size={28} />
          <span className="core-ring ring-a" />
          <span className="core-ring ring-b" />
        </div>

        <div className="growth-path">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <motion.div
        className="holo-card holo-card-top"
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 4.2, repeat: Infinity }}
      >
        <ShieldCheck size={18} />

        <div>
          <small>{copy.monitorLabel}</small>
          <strong>{copy.monitorValue}</strong>
        </div>
      </motion.div>

      <motion.div
        className="holo-card holo-card-bottom"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.8, repeat: Infinity }}
      >
        <TreePine size={18} />

        <div>
          <small>{copy.beltLabel}</small>
          <strong>{copy.beltValue}</strong>
        </div>
      </motion.div>

      <div className="system-status">
        <span className="status-light" />
        {copy.status}
      </div>
    </motion.div>
  );
}
