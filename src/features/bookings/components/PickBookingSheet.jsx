import { usePickBookingView } from '../hooks/usePickBookingView';
import styles from './PickBookingSheet.module.css';

export default function PickBookingSheet() {
  const v = usePickBookingView();
  const { closeSheet, ic, pb } = v;
  if (!pb) return null;
  return (
    <>
      <div className={styles.row}>
        <span className={styles.title}>{pb.title}</span>
        <button onClick={closeSheet} aria-label="Close" className={styles.closeButton}>
          {ic.x}
        </button>
      </div>
      {pb.list.map((c, i) => (
        <button
          key={i}
          className={`${styles.button} hover-bg-mist`}
          onClick={c.pick}
          style={{ borderLeft: `4px solid ${c.st.bar}` }}
        >
          <span className={styles.date}>
            {c.date} · {c.range}
          </span>
          <span className={styles.fin}>{c.fin}</span>
          <span className={styles.dur}>
            {c.dur} · {c.pc}
          </span>
          <span className={styles.label} style={{ color: c.st.fg }}>
            {c.st.label}
          </span>
        </button>
      ))}
    </>
  );
}
