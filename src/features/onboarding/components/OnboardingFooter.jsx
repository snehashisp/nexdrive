import { useOnboardingView } from '../hooks/useOnboardingView';
import styles from './OnboardingFooter.module.css';

export default function OnboardingFooter() {
  const v = useOnboardingView();
  const { ic, obFooter, padB } = v;
  return (
    <div className={styles.stack} style={{ padding: `12px 20px ${padB}px` }}>
      {obFooter.note ? <span className={styles.note}>{obFooter.note}</span> : null}
      <button
        className={`${styles.labelButton} hover-bg-violet-700 active-bg-violet-800`}
        onClick={obFooter.go}
      >
        {obFooter.label}
        {ic.arrow}
      </button>
      {obFooter.alt ? (
        <button className={`${styles.altButton} hover-bg-mist`} onClick={obFooter.altGo}>
          {obFooter.alt}
        </button>
      ) : null}
    </div>
  );
}
