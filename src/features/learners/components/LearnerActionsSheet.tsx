import { useLearnerActionsView } from '../hooks/useLearnerActionsView';
import styles from './LearnerActionsSheet.module.css';

export default function LearnerActionsSheet() {
  const v = useLearnerActionsView();
  const { closeSheet, ic, ics, la } = v;
  if (!la) return null;
  return (
    <>
      <div className={styles.row}>
        <span className={styles.initialsRow}>{la.initials}</span>
        <span className={styles.stack}>
          <span className={styles.name}>{la.name}</span>
          <span className={styles.phone}>
            {la.phone} · {la.upText}
          </span>
        </span>
        <button onClick={closeSheet} aria-label="Close" className={styles.closeButton}>
          {ic.x}
        </button>
      </div>
      {la.incomplete ? (
        <div className={styles.warnRow}>
          {ics.warn}Details incomplete — complete the profile before booking.
        </div>
      ) : null}
      <div className={styles.stack2}>
        <button className={`${styles.userButton} hover-bg-mist`} onClick={la.view}>
          {ic.user}
          <span className={styles.viewLearnerProfile}>View learner profile</span>
          {ics.right}
        </button>
        <button className={`${styles.calendarplusButton} hover-bg-violet-50`} onClick={la.schedule}>
          {ic.calendarPlus}
          <span className={styles.viewLearnerProfile}>Schedule booking</span>
          {ics.right}
        </button>
        <button className={`${styles.userButton} hover-bg-mist`} onClick={la.resched}>
          {ic.repeat}
          <span className={styles.viewLearnerProfile}>Reschedule booking</span>
          {ics.right}
        </button>
        <button className={`${styles.userButton} hover-bg-mist`} onClick={la.cancel}>
          {ic.calendarX}
          <span className={styles.viewLearnerProfile}>Cancel booking</span>
          {ics.right}
        </button>
        <button className={`${styles.userButton} hover-bg-mist`} onClick={la.call}>
          {ic.phone}
          <span className={styles.viewLearnerProfile}>Call {la.phone}</span>
        </button>
        <button className={`${styles.trashButton} hover-bg-error`} onClick={la.del}>
          {ic.trash}
          <span className={styles.viewLearnerProfile}>Delete learner</span>
        </button>
      </div>
    </>
  );
}
