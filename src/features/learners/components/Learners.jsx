import styles from './Learners.module.css';

export default function Learners({ v }) {
  const { go, ic, icl, ics, ls } = v;
  if (!ls) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.row}>
        <div className={styles.stack2}>
          <h1 className={styles.learners}>Learners</h1>
          <span className={styles.count}>{ls.count}</span>
        </div>
        <button className={`${styles.userplusButton} hover-bg-violet-700`} onClick={go.addLearner}>
          {ics.userPlus}Add learner
        </button>
      </div>
      <div className={styles.stack3}>
        <span className={styles.searchRow}>
          {ic.search}
          <input
            value={ls.search ?? ''}
            onChange={ls.hSearch}
            placeholder="Search name, phone or postcode"
            className={styles.searchInput}
          />
          {ls.hasQ ? (
            <button onClick={ls.clear} aria-label="Clear search" className={styles.clearSearchButton}>
              {ics.x}
            </button>
          ) : null}
        </span>
        <div className={styles.row2}>
          {ls.filters.map((f, i) => (
            <button
              key={i}
              onClick={f.pick}
              className={styles.button}
              style={{ background: f.bg, color: f.fg, border: `1.5px solid ${f.bd}` }}
            >
              {f.t}
            </button>
          ))}
        </div>
      </div>
      {ls.has ? (
        <>
          {ls.list.map((l, i) => (
            <button key={i} className={`${styles.button2} hover-bg-mist`} onClick={l.open}>
              <span className={styles.initialsRow}>{l.initials}</span>
              <span className={styles.stack4}>
                <span className={styles.name}>{l.name}</span>
                <span className={styles.sub}>
                  {l.sub} · {l.pc}
                </span>
              </span>
              {l.incomplete ? <span className={styles.incomplete}>Incomplete</span> : null}
              <span className={styles.right}>{ics.right}</span>
            </button>
          ))}
        </>
      ) : null}
      {ls.noResults ? (
        <div className={styles.stack5}>
          <span className={styles.name}>No learners match “{ls.search}”</span>
          <span className={styles.trySurnameMobile}>Try a surname, mobile number or postcode.</span>
        </div>
      ) : null}
      {ls.empty ? (
        <div className={styles.stack6}>
          <span className={styles.usersRow}>{icl.users}</span>
          <div className={styles.stack7}>
            <span className={styles.youHavenAdded}>You haven't added any learners yet.</span>
            <span className={styles.addLearnerContact}>
              Add a learner's contact and licence details once, then book lessons in a few taps.
            </span>
          </div>
          <button className={`${styles.addYourFirstButton} hover-bg-violet-700`} onClick={go.addLearner}>
            Add your first learner{ic.arrow}
          </button>
        </div>
      ) : null}
      {ls.hasArch ? (
        <>
          <div className={styles.stack8}>
            <span className={styles.removedLearners}>REMOVED LEARNERS</span>
            <span className={styles.count}>No longer active. Their lesson records stay in History.</span>
          </div>
          {ls.arch.map((a, i) => (
            <button key={i} className={`${styles.historyButton} hover-bg-mist`} onClick={a.open}>
              <span className={styles.initialsRow2}>{a.initials}</span>
              <span className={styles.stack9}>
                <span className={styles.name2}>{a.name}</span>
                <span className={styles.count}>{a.sub}</span>
              </span>
              {ics.history}
            </button>
          ))}
        </>
      ) : null}
    </div>
  );
}
