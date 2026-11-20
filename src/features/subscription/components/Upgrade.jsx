import { useSubscriptionView } from '../hooks/useSubscriptionView';
import styles from './Upgrade.module.css';

export default function Upgrade() {
  const v = useSubscriptionView();
  const { back, ic, icl, up } = v;
  if (!up) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <button className={`${styles.backButton} hover-bg-mist`} onClick={back} aria-label="Back">
          {icl.left}
        </button>
        <span className={styles.upgradeSubscription}>Upgrade subscription</span>
      </div>
      <div className={styles.stack2}>
        <p className={styles.longerTermsLower}>
          Longer terms lower your monthly price. Your learners, lessons and settings carry over.
        </p>
        {up.opts.map((pl, i) => (
          <button
            key={i}
            onClick={pl.pick}
            className={styles.button}
            style={{ background: pl.bg, border: pl.bd, opacity: pl.op }}
          >
            <span className={styles.text} style={{ border: pl.ring }} />
            <span className={styles.stack3}>
              <span className={styles.nameRow}>
                {pl.name}
                {pl.cur ? <span className={styles.current}>Current</span> : null}
              </span>
              <span className={styles.term}>{pl.term}</span>
              {pl.save ? <span className={styles.save}>{pl.save}</span> : null}
            </span>
            <span className={styles.text2}>
              <span className={styles.price}>{pl.price}</span>
              <span className={styles.per}>{pl.per}</span>
            </span>
          </button>
        ))}
        {up.hasCredit ? (
          <button onClick={up.cred.flip} className={styles.button2}>
            <span className={styles.giftRow}>{ic.gift}</span>
            <span className={styles.stack4}>
              <span className={styles.useNexdriveCredit}>Use NexDrive Credit</span>
              <span className={styles.creditavail}>{up.creditAvail} available</span>
            </span>
            <span className={styles.text3} style={{ background: up.cred.bg }}>
              <span className={styles.overlay} style={{ left: `${up.cred.x}px` }} />
            </span>
          </button>
        ) : null}
        {up.showRows ? (
          <div className={styles.stack5}>
            {up.rows.map((r, i) => (
              <div key={i} className={styles.row}>
                <span className={styles.text4}>{r.k}</span>
                <span className={styles.text5} style={{ color: r.c }}>
                  {r.v}
                </span>
              </div>
            ))}
            <div className={styles.row2}>
              <span className={styles.paylabel}>{up.payLabel}</span>
              <span className={styles.payable}>{up.payable}</span>
            </div>
            {up.creditLeft ? <span className={styles.creditleft}>{up.creditLeft}</span> : null}
          </div>
        ) : null}
        <div className={styles.summary}>{up.summary}</div>
      </div>
    </div>
  );
}

export function UpgradeFooter() {
  const v = useSubscriptionView();
  const { ic, padB, up } = v;
  if (!up) return null;
  return (
    <div className={styles.grid} style={{ padding: `12px 20px ${padB}px` }}>
      <span className={styles.stack6}>
        <span className={styles.price2}>{up.price}</span>
        <span className={styles.per}>{up.was}</span>
      </span>
      <button onClick={up.confirm} className={styles.ctaButton} style={{ background: up.ctaBg }}>
        {up.cta}
        {ic.arrow}
      </button>
    </div>
  );
}
