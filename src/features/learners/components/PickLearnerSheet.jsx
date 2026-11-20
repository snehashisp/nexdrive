import styles from './PickLearnerSheet.module.css';

export default function PickLearnerSheet({ v }) {
  const { closeSheet, ic, pl } = v;
  if (!pl) return null;
  return (
    <>
      <div className={styles.row}>
        <span className={styles.chooseLearner}>Choose learner</span>
        <button onClick={closeSheet} aria-label="Close" className={styles.closeButton}>
          {ic.x}
        </button>
      </div>
      {pl.list.map((l, i) => (
        <button key={i} className={`${styles.button} hover-bg-mist`} onClick={l.pick}>
          <span className={styles.initialsRow}>{l.initials}</span>
          <span className={styles.stack}>
            <span className={styles.name}>{l.name}</span>
            <span className={styles.text}>
              {l.pc} · {l.sub}
            </span>
          </span>
          {l.incomplete ? <span className={styles.incomplete}>Incomplete</span> : null}
        </button>
      ))}
      {pl.empty ? <div className={styles.youHavenAdded}>You haven't added any learners yet.</div> : null}
      <button onClick={pl.add} className={styles.userplusButton}>
        {ic.userPlus}Add a new learner
      </button>
    </>
  );
}
