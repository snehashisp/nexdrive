import { usePushNotificationView } from '../hooks/usePushNotificationView';
import styles from './PushNotification.module.css';

export default function PushNotification() {
  const v = usePushNotificationView();
  const { openPush, pushText, pushTitle, pushTop } = v;
  return (
    <button onClick={openPush} className={styles.button} style={{ top: `${pushTop}px` }}>
      <img src="assets/logos/app-icon.svg" alt="" className={styles.img} />
      <span className={styles.stack}>
        <span className={styles.row}>
          <span className={styles.nexdrive}>NEXDRIVE</span>
          <span>now</span>
        </span>
        <span className={styles.pushtitle}>{pushTitle}</span>
        <span className={styles.pushtext}>{pushText}</span>
      </span>
    </button>
  );
}
