import { useShellView } from '../hooks/useShellView';
import styles from './StatusBar.module.css';

export default function StatusBar() {
  const v = useShellView();
  const { clockTime, sbBg, sbFg, sbH } = v;
  return (
    <div className={styles.row} style={{ height: `${sbH}px`, background: sbBg, color: sbFg }}>
      <span>{clockTime}</span>
      <span className={styles.row2}>
        <span className={styles.row3}>
          <span className={styles.text} />
          <span className={styles.text2} />
          <span className={styles.text3} />
          <span className={styles.text4} />
        </span>
        <span className={styles.text5}>5G</span>
        <span className={styles.row4}>
          <span className={styles.row5}>
            <span className={styles.text6} />
          </span>
          <span className={styles.text7} />
        </span>
      </span>
    </div>
  );
}
