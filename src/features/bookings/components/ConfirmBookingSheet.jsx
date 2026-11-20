import styles from './ConfirmBookingSheet.module.css';

export default function ConfirmBookingSheet({ v }) {
  const { cm, ic } = v;
  if (!cm) return null;
  return (
    <>
      <div className={styles.row}>
        <span className={styles.title}>{cm.title}</span>
        <button onClick={cm.edit} aria-label="Close" className={styles.closeButton}>
          {ic.x}
        </button>
      </div>
      <div className={styles.stack}>
        {cm.rows.map((r, i) => (
          <div key={i} className={styles.row2}>
            <span className={styles.text}>{r.k}</span>
            <span className={styles.text2}>{r.v}</span>
          </div>
        ))}
        {cm.multi ? (
          <div className={styles.stack2}>
            <span className={styles.sessions}>SESSIONS</span>
            {cm.sess.map((x, i) => (
              <span key={i} className={styles.row3}>
                <span className={styles.text3}>{x.n}</span>
                {x.t}
              </span>
            ))}
          </div>
        ) : null}
        {cm.price.map((r, i) => (
          <div key={i} className={styles.row4}>
            <span className={styles.text4}>{r.k}</span>
            <span className={styles.text5}>{r.v}</span>
          </div>
        ))}
        <div className={styles.row5}>
          <span className={styles.finalAmount}>Final amount</span>
          <span className={styles.fin}>{cm.fin}</span>
        </div>
      </div>
      <div className={styles.stack3}>
        <button
          className={`${styles.confirmBookingButton} hover-bg-violet-700 active-bg-violet-800`}
          onClick={cm.confirm}
        >
          Confirm booking{ic.check}
        </button>
        <button onClick={cm.edit} className={styles.editDetailsButton}>
          Edit details
        </button>
      </div>
    </>
  );
}
