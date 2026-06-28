import { LockKeyhole, ShieldCheck } from 'lucide-react';
import './ProtectedBrandNotice.css';

type ProtectedBrandNoticeProps = {
  variant: 'website' | 'platform';
};

export default function ProtectedBrandNotice({
  variant,
}: ProtectedBrandNoticeProps) {
  const isPlatform = variant === 'platform';

  return (
    <section
      className={`protected-brand-notice protected-brand-notice--${variant}`}
      aria-label="ئاگاداریی نیشانەی بازرگانی و مافی ناوەڕۆک"
      dir="rtl"
      lang="ku"
    >
      <div className="protected-brand-notice__inner">
        <div className="protected-brand-notice__identity">
          <span className="protected-brand-notice__icon" aria-hidden="true">
            {isPlatform ? <LockKeyhole size={19} /> : <ShieldCheck size={19} />}
          </span>

          <div>
            <strong>کەمەربەندی سەوز™</strong>
            <span>
              {isPlatform
                ? 'سیستەمی دیجیتاڵی پارێزراو'
                : 'نیشانە و مۆدێلی کاری پارێزراو'}
            </span>
          </div>
        </div>

        <p className="protected-brand-notice__summary">
          ناو، ناسنامەی بصری، ناوەڕۆک، فۆرم، ڕێکاری کار، مۆدێلی جێبەجێکردن و
          پێکهاتەکانی سیستەم تایبەتن بە کەمەربەندی سەوز™. کۆپیکردنەوە،
          بڵاوکردنەوە، گۆڕانکاری، فرۆشتن یان بەکارهێنانی بازرگانی بەبێ
          ڕەزامەندیی نووسراو ڕێگەپێنەدراوە.
        </p>

        <details className="protected-brand-notice__details">
          <summary>وردەکاریی پاراستن و سنووری بەکارهێنان</summary>
          <div className="protected-brand-notice__details-body">
            <p>
              نیشانەی ™ واتای داواکاریی مافی نیشانەی بازرگانییە و بە خۆی
              مانای تۆماربوونی فەرمی نییە. هیچ بەشێک لەم وێبسایتە یان
              پلاتفۆرمە، لەوانە کۆد، داتا، دیزاین، داشبۆرد، SOP، فۆرم،
              زنجیرەی بەڵگە و مۆدێلی ئۆپەراسیۆنی، نابێت بەبێ مۆڵەت
              دووبارە دروست بکرێتەوە یان لە سیستەمێکی تر بەکاربهێنرێت.
            </p>
            <p>
              بەکارهێنانی وێبسایت یان پلاتفۆرم بە مانای وەرگرتنی مافی
              خاوەندارێتی نییە. هەموو مافەکان پارێزراون.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}
