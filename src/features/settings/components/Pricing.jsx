import styles from './Pricing.module.css';

export default function Pricing({ v }) {
  const { back, icl, pr } = v;
  if (!pr) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <button className={`${styles.backButton} hover-bg-mist`} onClick={back} aria-label="Back">
          {icl.left}
        </button>
        <span className={styles.pricing}>Pricing</span>
      </div>
      <div className={styles.stack2}>
        <p className={styles.changesApplyNew}>
          Changes apply to new bookings. Existing lessons keep the price they were booked at.
        </p>
        {pr.rates.map((r, i) => (
          <label key={i} className={styles.label}>
            <span className={styles.stack3}>
              <span className={styles.label2}>{r.label}</span>
              <span className={styles.note}>{r.note}</span>
            </span>
            <span className={styles.row} style={{ border: `1.5px solid ${r.bd}` }}>
              <span className={styles.text}>£</span>
              <input inputMode="decimal" value={r.rate ?? ''} onChange={r.h} className={styles.input} />
              <span className={styles.text2}>/hr</span>
            </span>
          </label>
        ))}
        <div className={styles.stack4}>
          <span className={styles.defaultLessonDuration}>Default lesson duration</span>
          <div className={styles.grid}>
            {pr.durs.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                className={styles.button}
                style={{ background: o.bg, color: o.fg, border: `1.5px solid ${o.bd}` }}
              >
                {o.t}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.stack5}>
          <span className={styles.standardRatePreview}>STANDARD RATE PREVIEW</span>
          {pr.preview.map((r, i) => (
            <div key={i} className={styles.row2}>
              <span className={styles.text3}>{r.k}</span>
              <span className={styles.text4}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PricingFooter({ v }) {
  const { ic, padB, pr } = v;
  if (!pr) return null;
  return (
    <div className={styles.box} style={{ padding: `12px 20px ${padB}px` }}>
      <button className={`${styles.savePricesButton} hover-bg-violet-700`} onClick={pr.save}>
        Save prices{ic.check}
      </button>
    </div>
  );
}
