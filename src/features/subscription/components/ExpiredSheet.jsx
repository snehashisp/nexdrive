import { useExpiredView } from '../hooks/useExpiredView';
import styles from './ExpiredSheet.module.css';

export default function ExpiredSheet() {
  const v = useExpiredView();
  const { ex, ic, icl } = v;
  if (!ex) return null;
  return (
    <>
      <div className={styles.stack}>
        <span className={styles.lockRow}>{icl.lock}</span>
        <span className={styles.yourSubscriptionHas}>Your subscription has expired</span>
        <span className={styles.renewCreateNew}>
          Renew to create new bookings. Your learners and lesson history are safe and still viewable.
        </span>
      </div>
      <div className={styles.box}>
        <button onClick={ex.renew} className={styles.renewSubscriptionButton}>
          Renew subscription{ic.arrow}
        </button>
      </div>
    </>
  );
}
