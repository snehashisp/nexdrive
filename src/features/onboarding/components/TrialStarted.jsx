import styles from './TrialStarted.module.css';

export default function TrialStarted({ v }) {
  const { icl, obSum } = v;
  return (
    <div className={styles.stack}>
      <div className={styles.checkRow}>{icl.check}</div>
      <div className={styles.stack2}>
        <h1 className={styles.yourFreeTrial}>Your free trial has started</h1>
        <p className={styles.welcomeNexdrive}>
          Welcome to NexDrive, {obSum.first}. Everything is unlocked until {obSum.until}.
        </p>
      </div>
      <div className={styles.stack3}>
        {obSum.rows.map((r, i) => (
          <div key={i} className={styles.row}>
            <span className={styles.text}>{r.k}</span>
            <span className={styles.text2}>{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
