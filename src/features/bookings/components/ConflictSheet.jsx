import styles from './ConflictSheet.module.css';

export default function ConflictSheet({ v }) {
  const { cf, ic, icl } = v;
  if (!cf) return null;
  return (
    <>
      <div className={styles.stack}>
        <span className={styles.warnRow}>{icl.warn}</span>
        <span className={styles.title}>{cf.title}</span>
        <span className={styles.body}>{cf.body}</span>
        <div className={styles.grid} style={{ borderLeft: `4px solid ${cf.st.bar}` }}>
          <div className={styles.stack2}>
            <span className={styles.start}>{cf.start}</span>
            <span className={styles.durs}>{cf.durS}</span>
          </div>
          <div className={styles.stack3}>
            <span className={styles.name}>{cf.name}</span>
            <span className={styles.date}>
              {cf.date} · {cf.range} · {cf.pc}
            </span>
          </div>
          <div className={styles.box}>
            <span className={styles.label} style={{ background: cf.st.bg, color: cf.st.fg }}>
              {cf.st.label}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.stack4}>
        <button className={`${styles.chooseAnotherTimeButton} hover-bg-violet-700`} onClick={cf.another}>
          Choose another time{ic.clock}
        </button>
        <button onClick={cf.view} className={styles.viewExistingBookingButton}>
          View existing booking
        </button>
        <button onClick={cf.cancel} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </>
  );
}
