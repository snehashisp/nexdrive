import { useViewContext } from '@/hooks/useViewContext';
import styles from './QuickAddSheet.module.css';

export default function QuickAddSheet() {
  const v = useViewContext().common;
  const { closeSheet, go, ic, ics } = v;
  return (
    <>
      <div className={styles.row}>
        <span className={styles.create}>Create</span>
        <button onClick={closeSheet} aria-label="Close" className={styles.closeButton}>
          {ic.x}
        </button>
      </div>
      <div className={styles.stack}>
        <button className={`${styles.rightButton} hover-bg-mist`} onClick={go.newBooking}>
          <span className={styles.calendarplusRow}>{ic.calendarPlus}</span>
          <span className={styles.stack2}>
            <span className={styles.newBooking}>New booking</span>
            <span className={styles.singleLessonFor}>A single lesson for one learner</span>
          </span>
          {ics.right}
        </button>
        <button className={`${styles.rightButton} hover-bg-mist`} onClick={go.package}>
          <span className={styles.calendarplusRow}>{ic.layers}</span>
          <span className={styles.stack2}>
            <span className={styles.newBooking}>Book multiple lessons</span>
            <span className={styles.singleLessonFor}>5, 10 or a custom package in one go</span>
          </span>
          {ics.right}
        </button>
        <button className={`${styles.rightButton} hover-bg-mist`} onClick={go.addLearner}>
          <span className={styles.calendarplusRow}>{ic.userPlus}</span>
          <span className={styles.stack2}>
            <span className={styles.newBooking}>Add learner</span>
            <span className={styles.singleLessonFor}>Contact, licence and theory details</span>
          </span>
          {ics.right}
        </button>
      </div>
    </>
  );
}
