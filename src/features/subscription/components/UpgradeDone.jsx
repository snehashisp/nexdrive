import styles from './UpgradeDone.module.css';

export default function UpgradeDone({ v }) {
  const { ic, icl, upd } = v;
  if (!upd) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.checkRow}>{icl.check}</div>
      <div className={styles.stack2}>
        <h1 className={styles.youThe}>You're on the {upd.name} plan</h1>
        <p className={styles.subscriptionConfirmedReceipt}>
          Subscription confirmed. A receipt is on its way.
        </p>
      </div>
      <div className={styles.stack3}>
        {upd.rows.map((r, i) => (
          <div key={i} className={styles.row}>
            <span className={styles.text}>{r.k}</span>
            <span className={styles.text2}>{r.v}</span>
          </div>
        ))}
      </div>
      <button className={`${styles.backSubscriptionButton} hover-bg-violet-700`} onClick={upd.done}>
        Back to subscription{ic.arrow}
      </button>
    </div>
  );
}
