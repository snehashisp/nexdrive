import { useCancelSubscriptionView } from '../hooks/useCancelSubscriptionView';
import styles from './CancelSubscriptionSheet.module.css';

export default function CancelSubscriptionSheet() {
  const v = useCancelSubscriptionView();
  const { cs } = v;
  if (!cs) return null;
  return (
    <>
      <div className={styles.stack}>
        <span className={styles.title}>{cs.title}</span>
        <span className={styles.body}>{cs.body}</span>
      </div>
      <div className={styles.stack2}>
        <button className={`${styles.titleButton} hover-bg-red-800`} onClick={cs.confirm}>
          {cs.title}
        </button>
        <button onClick={cs.keep} className={styles.keepPlanButton}>
          Keep my plan
        </button>
      </div>
    </>
  );
}
