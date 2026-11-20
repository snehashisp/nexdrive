import { useOnboardingView } from '../hooks/useOnboardingView';
import styles from './OnboardingHeader.module.css';

export default function OnboardingHeader() {
  const v = useOnboardingView();
  const { icl, obBack, step } = v;
  return (
    <div className={styles.header}>
      <div className={styles.row}>
        <button className={`${styles.backButton} hover-bg-mist`} onClick={obBack} aria-label="Back">
          {icl.left}
        </button>
        <span className={styles.label}>{step.label}</span>
      </div>
      <div className={styles.grid}>
        {step.bars.map((sb, i) => (
          <span key={i} className={styles.text} style={{ background: sb.c }} />
        ))}
      </div>
    </div>
  );
}
