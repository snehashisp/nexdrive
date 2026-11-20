import { useLearnerActionsView } from '../hooks/useLearnerActionsView';
import styles from './DeleteLearnerSheet.module.css';

export default function DeleteLearnerSheet() {
  const v = useLearnerActionsView();
  const { ic, icl, ics, la } = v;
  if (!la) return null;
  return (
    <>
      <div className={styles.stack}>
        <span className={styles.trashRow}>{icl.trash}</span>
        <span className={styles.delete}>Delete {la.name}?</span>
        <span className={styles.thisWillRemove}>
          This will remove the learner from your active learner list. Previous lesson records will remain
          available for your records.
        </span>
        {la.hasUp ? (
          <span className={styles.warnRow}>
            {ics.warn}
            {la.delNote}
          </span>
        ) : null}
        <div className={styles.archiveRow}>
          {ic.archive}
          <span>
            Lesson history, amounts and dates stay in Bookings → History and can be filtered by this learner.
          </span>
        </div>
      </div>
      <div className={styles.stack2}>
        <button className={`${styles.deleteLearnerButton} hover-bg-red-800`} onClick={la.confirmDel}>
          Delete learner{ic.trash}
        </button>
        <button onClick={la.keep} className={styles.keepLearnerButton}>
          Keep learner
        </button>
      </div>
    </>
  );
}
