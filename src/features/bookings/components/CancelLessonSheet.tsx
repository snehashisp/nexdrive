import { useCancelLessonView } from '../hooks/useCancelLessonView';
import styles from './CancelLessonSheet.module.css';

export default function CancelLessonSheet() {
  const v = useCancelLessonView();
  const { cl, ic, icl, ics } = v;
  if (!cl) return null;
  return (
    <>
      <div className={styles.stack}>
        <span className={styles.calendarxRow}>{icl.calendarX}</span>
        <span className={styles.cancelThisLesson}>Cancel this lesson?</span>
        <div className={styles.stack2} style={{ borderLeft: `4px solid ${cl.st.bar}` }}>
          <span className={styles.name}>{cl.name}</span>
          <span className={styles.datelong}>
            {cl.dateLong} · {cl.range}
          </span>
          <span className={styles.text}>
            {cl.pc} · {cl.fin}
          </span>
        </div>
        {cl.late ? (
          <span className={styles.warnRow}>
            {ics.warn}This lesson is within 48 hours. Check your cancellation policy before confirming.
          </span>
        ) : null}
        <span className={styles.reason}>Reason</span>
        <div className={styles.row}>
          {cl.reasons.map((o, i) => (
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
        <span className={styles.text}>The lesson stays in your history as cancelled.</span>
      </div>
      <div className={styles.stack3}>
        <button className={`${styles.cancelLessonButton} hover-bg-red-800`} onClick={cl.confirm}>
          Cancel lesson{ic.calendarX}
        </button>
        <button onClick={cl.keep} className={styles.keepLessonButton}>
          Keep lesson
        </button>
      </div>
    </>
  );
}
