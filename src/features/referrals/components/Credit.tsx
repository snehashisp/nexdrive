import { useCreditView } from '../hooks/useCreditView';
import styles from './Credit.module.css';

export default function Credit() {
  const v = useCreditView();
  const { back, cr, ic, icl, ics } = v;
  if (!cr) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <button className={`${styles.backButton} hover-bg-mist`} onClick={back} aria-label="Back">
          {icl.left}
        </button>
        <span className={styles.nexdriveCredit}>NexDrive Credit</span>
      </div>
      <div className={styles.stack2}>
        <span className={styles.availableCredit}>AVAILABLE CREDIT</span>
        <span className={styles.bal}>{cr.bal}</span>
        <span className={styles.useTowardsYour}>
          Use it towards your NexDrive subscription. Credit doesn't expire.
        </span>
      </div>
      <div className={styles.grid}>
        <div className={styles.box}>
          <div className={styles.totalEarned}>Total earned</div>
          <div className={styles.earned}>{cr.earned}</div>
        </div>
        <div className={styles.box2}>
          <div className={styles.totalEarned}>Credit used</div>
          <div className={styles.used}>{cr.used}</div>
        </div>
        <div className={styles.box2}>
          <div className={styles.totalEarned}>Pending</div>
          <div className={styles.pending}>{cr.pending}</div>
        </div>
      </div>
      <div className={styles.stack3}>
        <button onClick={cr.auto.flip} className={styles.button}>
          <span className={styles.stack4}>
            <span className={styles.applyCreditNext}>Apply credit to my next payment</span>
            <span className={styles.nexttext}>{cr.nextText}</span>
          </span>
          <span className={styles.text} style={{ background: cr.auto.bg }}>
            <span className={styles.overlay} style={{ left: `${cr.auto.x}px` }} />
          </span>
        </button>
        {cr.canUpgrade ? (
          <button className={`${styles.arrowButton} hover-bg-mist`} onClick={cr.upgrade}>
            <span className={styles.upgradeRow}>{ic.upgrade}Use credit on a longer plan</span>
            {ics.arrow}
          </button>
        ) : null}
      </div>
      <div className={styles.stack5}>
        <div className={styles.row}>
          <span className={styles.transactions}>TRANSACTIONS</span>
          <span className={styles.row2}>
            {cr.filters.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                className={styles.button2}
                style={{ background: o.bg, color: o.fg, border: `1.5px solid ${o.bd}` }}
              >
                {o.t}
              </button>
            ))}
          </span>
        </div>
        {cr.hasTx ? (
          <>
            {cr.tx.map((t, i) => (
              <div key={i} className={styles.grid2}>
                <span className={styles.desc}>{t.desc}</span>
                <span className={styles.amt} style={{ color: t.ac }}>
                  {t.amt}
                </span>
                <span className={styles.dateRow}>
                  {t.date}
                  <span className={styles.type} style={{ background: t.tb, color: t.tf }}>
                    {t.type}
                  </span>
                </span>
                <span className={styles.bal2}>{t.bal}</span>
              </div>
            ))}
          </>
        ) : null}
        {cr.noTx ? (
          <div className={styles.stack6}>
            <span className={styles.creditYet}>No credit yet.</span>
            <span className={styles.creditFromSuccessful}>
              Credit from successful referrals will appear here.
            </span>
          </div>
        ) : null}
        <span className={styles.balancesAndRewards}>
          Balances and rewards are calculated by NexDrive. Contact support if a transaction looks wrong.
        </span>
      </div>
    </div>
  );
}
