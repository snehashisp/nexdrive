import styles from './ReferralDetailSheet.module.css';

export default function ReferralDetailSheet({ v }) {
  const { closeSheet, ic, rd } = v;
  if (!rd) return null;
  return (
    <>
      <div className={styles.row}>
        <span className={styles.stack}>
          <span className={styles.name}>{rd.name}</span>
          <span className={styles.joined}>Joined {rd.date}</span>
        </span>
        <button onClick={closeSheet} aria-label="Close" className={styles.closeButton}>
          {ic.x}
        </button>
      </div>
      <div className={styles.stack2}>
        <div className={styles.row2}>
          <span className={styles.plan}>Plan</span>
          <span className={styles.plan2}>{rd.plan}</span>
        </div>
        <div className={styles.row2}>
          <span className={styles.plan}>Qualifying subscription value</span>
          <span className={styles.plan2}>{rd.value}</span>
        </div>
        <div className={styles.row2}>
          <span className={styles.plan}>Your reward</span>
          <span className={styles.calc}>{rd.calc}</span>
        </div>
        <div className={styles.row3}>
          <span className={styles.plan}>Status</span>
          <span className={styles.label} style={{ background: rd.st.bg, color: rd.st.fg }}>
            {rd.st.label}
          </span>
        </div>
        {rd.awarded ? (
          <div className={styles.row2}>
            <span className={styles.plan}>Credit awarded</span>
            <span className={styles.reward}>
              {rd.reward} on {rd.awarded}
            </span>
          </div>
        ) : null}
      </div>
      <div className={styles.stack3}>
        <span className={styles.progress}>PROGRESS</span>
        {rd.steps.map((x, i) => (
          <div key={i} className={styles.grid}>
            <span className={styles.row4} style={{ background: x.c, color: x.nc }}>
              {x.n}
            </span>
            <span className={styles.text} style={{ color: x.fg }}>
              {x.t}
            </span>
            <span className={styles.text2} style={{ color: x.dc }}>
              {x.d}
            </span>
          </div>
        ))}
        {rd.failed ? <div className={styles.reason}>{rd.reason}</div> : null}
        <span className={styles.youCanSee}>
          You can see their name, plan and your reward. Their contact and payment details stay private.
        </span>
      </div>
      {rd.demoQualify ? (
        <div className={styles.box}>
          <button className={`${styles.demoConfirmTheirButton} hover-ink`} onClick={rd.demoQualify}>
            Demo: confirm their first payment
          </button>
        </div>
      ) : null}
    </>
  );
}
