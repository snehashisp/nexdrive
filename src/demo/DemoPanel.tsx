import { useDemoPanelView } from './useDemoPanelView';
import styles from './DemoPanel.module.css';

export default function DemoPanel() {
  const v = useDemoPanelView();
  const { clockLabel, flows, ics, replaySplash } = v;
  return (
    <aside className={styles.aside}>
      <div className={styles.row}>
        <img src="/assets/logos/monogram-on-light.svg" alt="" className={styles.img} />
        <span className={styles.text}>
          <span className={styles.nex}>NEX</span>
          <span className={styles.drive}>Drive</span>
        </span>
      </div>
      <div className={styles.stack}>
        <div className={styles.interactivePrototype}>INTERACTIVE PROTOTYPE · V1.0</div>
        <h1 className={styles.businessManagementFor}>Business management for UK driving instructors.</h1>
        <p className={styles.everyScreenLive}>
          Every screen is live. Pick a workflow to jump to its starting point, or use the app freely. Live
          clock: {clockLabel}.
        </p>
      </div>
      <div className={styles.stack2}>
        <div className={styles.workflows}>WORKFLOWS</div>
        {flows.map((f, i) => (
          <button
            key={i}
            className={`${styles.button} hover-bg-mist`}
            onClick={f.go}
            style={{ background: f.bg }}
          >
            <span className={styles.num}>{f.num}</span>
            <span className={styles.title}>{f.title}</span>
            <span className={styles.right}>{ics.right}</span>
            <span />
            <span className={styles.steps}>{f.steps}</span>
          </button>
        ))}
      </div>
      <div className={styles.stack3}>
        <a className={`${styles.a} hover-bg-mist`} href="design-system.html">
          {'Design system & logo'}
          <span>{ics.arrow}</span>
        </a>
        <button className={`${styles.replayLaunchScreenButton} hover-border-ink`} onClick={replaySplash}>
          Replay launch screen<span>{ics.refresh}</span>
        </button>
        <span>Tweaks: device size, subscription state, offline mode, empty data, launch animation.</span>
      </div>
    </aside>
  );
}
