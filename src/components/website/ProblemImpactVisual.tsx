import {
  AlertTriangle,
  Database,
  Recycle,
  Truck,
} from 'lucide-react';

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
    <div className="problem-lite">
      <div className="problem-lite-summary">
        <div className="problem-lite-symbol">
          <AlertTriangle size={30} />
        </div>

        <div>
          <span className="problem-lite-label">
            مەترسیی ژینگەیی
          </span>

          <strong>
            پاشماوەی تۆمارنەکراو، کاریگەریی نادیار دروست دەکات.
          </strong>

          <p>
            جیاکردنەوە، تۆمارکردن و چاودێری، بنەمای
            کەمکردنەوەی زیان و بڕیاردانی دروستن.
          </p>
        </div>
      </div>

      <div className="problem-lite-flow">
        {cards.map((card, index) => {
          const Icon = icons[index] ?? AlertTriangle;

          return (
            <article
              className="problem-lite-card"
              key={card.title}
            >
              <div className="problem-lite-card-head">
                <span className="problem-lite-icon">
                  <Icon size={22} />
                </span>

                <span className="problem-lite-number">
                  ٠{index + 1}
                </span>
              </div>

              <h3>{card.title}</h3>
              <p>{card.body}</p>

              <div className="problem-lite-state">
                <span />
                خاڵی پێویستی بە چارەسەر
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
