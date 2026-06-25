import {
  Building2,
  CheckCircle2,
  Database,
  Leaf,
  Recycle,
  ScanLine,
  Sprout,
  Thermometer,
  TreePine,
  Truck,
  Weight,
} from 'lucide-react';
import { motion } from 'motion/react';

type Language = 'ku' | 'ar' | 'en';

type Step = {
  title: string;
  body: string;
};

type OperatingModelVisualProps = {
  language: Language;
  steps: Step[];
};

type StepVisual = {
  status: string;
  metric: string;
  value: string;
};

const stepVisualCopy: Record<Language, StepVisual[]> = {
  ku: [
    {
      status: 'جیاکردنەوە چالاکە',
      metric: 'پاکیی سەرچاوە',
      value: '٩٤٪',
    },
    {
      status: 'ڕێڕەوی گواستنەوە',
      metric: 'بار تۆمارکرا',
      value: '١٢٥ کگم',
    },
    {
      status: 'چاودێری زیندەیی',
      metric: 'پلەی گەرمی',
      value: '٥٨°',
    },
    {
      status: 'گەشەی پشتێنەی سەوزایی',
      metric: 'داتای پشتڕاستکراو',
      value: 'چالاک',
    },
  ],
  ar: [
    {
      status: 'الفرز نشط',
      metric: 'نقاء المصدر',
      value: '94٪',
    },
    {
      status: 'مسار النقل',
      metric: 'حمولة مسجلة',
      value: '125 كغم',
    },
    {
      status: 'مراقبة حيوية',
      metric: 'درجة الحرارة',
      value: '58°',
    },
    {
      status: 'نمو الحزام الأخضر',
      metric: 'بيانات موثقة',
      value: 'نشط',
    },
  ],
  en: [
    {
      status: 'Separation active',
      metric: 'Source purity',
      value: '94%',
    },
    {
      status: 'Collection route',
      metric: 'Load registered',
      value: '125 kg',
    },
    {
      status: 'Biological monitoring',
      metric: 'Temperature',
      value: '58°',
    },
    {
      status: 'Green belt growth',
      metric: 'Verified data',
      value: 'Active',
    },
  ],
};

function SeparationScene() {
  return (
    <div className="model-scene separation-scene">
      <div className="restaurant-building">
        <Building2 size={45} />
        <span className="building-signal signal-one" />
        <span className="building-signal signal-two" />
      </div>

      <div className="sorting-stream">
        <motion.span
          animate={{ x: [0, 105], opacity: [0, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          <Leaf size={17} />
        </motion.span>

        <motion.span
          animate={{ x: [0, 105], opacity: [0, 1, 0] }}
          transition={{ duration: 2.4, delay: 0.8, repeat: Infinity }}
        >
          <Recycle size={17} />
        </motion.span>
      </div>

      <div className="smart-bin">
        <ScanLine size={23} />
        <i />
        <span />
      </div>

      <div className="scan-floor" />
    </div>
  );
}

function CollectionScene() {
  return (
    <div className="model-scene collection-scene">
      <div className="route-map">
        <span className="route-point point-a" />
        <span className="route-point point-b" />
        <span className="route-point point-c" />
        <span className="route-line line-a" />
        <span className="route-line line-b" />
      </div>

      <motion.div
        className="smart-truck"
        animate={{
          x: [-95, 92],
          y: [20, -15, 12],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Truck size={49} />
        <span className="truck-signal" />
      </motion.div>

      <div className="weight-module">
        <Weight size={21} />
        <span>١٢٥</span>
      </div>

      <div className="map-radar">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

function CompostScene() {
  return (
    <div className="model-scene compost-scene">
      <div className="compost-chamber">
        <div className="organic-layer layer-one" />
        <div className="organic-layer layer-two" />
        <div className="organic-layer layer-three" />

        <motion.div
          className="heat-wave wave-one"
          animate={{ y: [0, -55], opacity: [0, 0.8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />

        <motion.div
          className="heat-wave wave-two"
          animate={{ y: [0, -65], opacity: [0, 0.7, 0] }}
          transition={{
            duration: 2.5,
            delay: 0.7,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="temperature-core">
        <Thermometer size={31} />
        <strong>٥٨°</strong>
      </div>

      <div className="bio-ring bio-ring-one" />
      <div className="bio-ring bio-ring-two" />

      <div className="microbe-particles">
        {Array.from({ length: 9 }).map((_, index) => (
          <motion.i
            key={index}
            animate={{
              scale: [0.5, 1.2, 0.5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + index * 0.15,
              repeat: Infinity,
              delay: index * 0.18,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function GrowthScene() {
  return (
    <div className="model-scene growth-scene">
      <div className="digital-soil">
        <span />
        <span />
        <span />
        <span />
      </div>

      <motion.div
        className="growth-tree"
        initial={{ scale: 0.2, y: 40 }}
        whileInView={{ scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <TreePine size={76} />
      </motion.div>

      <div className="growth-sprouts">
        <motion.span
          animate={{ scale: [0.6, 1, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <Sprout size={28} />
        </motion.span>

        <motion.span
          animate={{ scale: [0.7, 1.15, 0.7] }}
          transition={{
            duration: 2.6,
            delay: 0.5,
            repeat: Infinity,
          }}
        >
          <Sprout size={23} />
        </motion.span>
      </div>

      <div className="data-satellite">
        <Database size={24} />
        <span className="satellite-ring" />
      </div>

      <div className="growth-chart">
        <i style={{ height: '28%' }} />
        <i style={{ height: '46%' }} />
        <i style={{ height: '67%' }} />
        <i style={{ height: '91%' }} />
      </div>
    </div>
  );
}

const scenes = [
  SeparationScene,
  CollectionScene,
  CompostScene,
  GrowthScene,
];

export default function OperatingModelVisual({
  language,
  steps,
}: OperatingModelVisualProps) {
  const localizedVisuals = stepVisualCopy[language];

  return (
    <div className="operating-model">
      <div className="model-energy-line">
        <motion.span
          animate={{ offsetDistance: ['0%', '100%'] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {steps.map((step, index) => {
        const Scene = scenes[index];
        const visual = localizedVisuals[index];

        return (
          <motion.article
            className={`model-stage model-stage-${index + 1}`}
            key={step.title}
            initial={{
              opacity: 0,
              y: 50,
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
              duration: 0.7,
              delay: index * 0.12,
            }}
          >
            <div className="stage-number">
              <span>٠{index + 1}</span>
              <i />
            </div>

            <div className="stage-visual">
              <Scene />

              <div className="stage-status">
                <span className="live-dot" />
                {visual.status}
              </div>
            </div>

            <div className="stage-content">
              <div className="stage-heading">
                <span className="stage-icon">
                  {index === 0 && <Building2 size={22} />}
                  {index === 1 && <Truck size={22} />}
                  {index === 2 && <Recycle size={22} />}
                  {index === 3 && <TreePine size={22} />}
                </span>

                <h3>{step.title}</h3>
              </div>

              <p>{step.body}</p>

              <div className="stage-metric">
                <div>
                  <small>{visual.metric}</small>
                  <strong>{visual.value}</strong>
                </div>

                <CheckCircle2 size={20} />
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
