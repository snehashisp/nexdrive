import styles from './LearnerProfile.module.css';

export default function LearnerProfile({ v }) {
  const { back, ic, icl, ics, lp } = v;
  if (!lp) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <button className={`${styles.backButton} hover-bg-mist`} onClick={back} aria-label="Back">
          {icl.left}
        </button>
        <span className={styles.learner}>Learner</span>
        <button onClick={lp.edit} className={styles.editButton}>
          {ics.edit}Edit
        </button>
      </div>
      <div className={styles.row}>
        <span className={styles.initialsRow}>{lp.initials}</span>
        <div className={styles.stack2}>
          <h1 className={styles.name}>{lp.name}</h1>
          <span className={styles.row2}>
            {lp.complete ? <span className={styles.readyBook}>Ready to book</span> : null}
            {lp.incomplete ? <span className={styles.detailsIncomplete}>Details incomplete</span> : null}
            <span className={styles.since}>{lp.since}</span>
          </span>
        </div>
      </div>
      {lp.incomplete ? (
        <div className={styles.stack3}>
          <span className={styles.warnRow}>{ics.warn}Learner details incomplete</span>
          <span className={styles.missing}>
            Missing: {lp.missText}. Lessons can't be booked until these are added.
          </span>
          <button onClick={lp.edit} className={styles.completeLearnerProfileButton}>
            Complete learner profile{ics.arrow}
          </button>
        </div>
      ) : null}
      <div className={styles.grid}>
        {lp.stats.map((st, i) => (
          <div key={i} className={styles.box}>
            <div className={styles.box2}>{st.k}</div>
            <div className={styles.box3}>{st.v}</div>
          </div>
        ))}
      </div>
      <div className={styles.grid}>
        <button className={`${styles.calendarplusButton} hover-bg-violet-700`} onClick={lp.schedule}>
          {ic.calendarPlus}Schedule lesson
        </button>
        <button className={`${styles.repeatButton} hover-bg-mist`} onClick={lp.resched}>
          {ic.repeat}Reschedule
        </button>
        <button className={`${styles.repeatButton} hover-bg-mist`} onClick={lp.cancel}>
          {ic.calendarX}Cancel booking
        </button>
        <button className={`${styles.repeatButton} hover-bg-mist`} onClick={lp.history}>
          {ic.history}View history
        </button>
        <button className={`${styles.repeatButton} hover-bg-mist`} onClick={lp.edit}>
          {ic.edit}Edit learner
        </button>
        <button className={`${styles.trashButton} hover-bg-error`} onClick={lp.del}>
          {ic.trash}Delete learner
        </button>
      </div>
      <div className={styles.stack4}>
        <div className={styles.row3}>
          <span className={styles.details}>DETAILS</span>
          <button onClick={lp.call} className={styles.phoneButton}>
            {ics.phone}Call
          </button>
        </div>
        {lp.rows.map((r, i) => (
          <div key={i} className={styles.grid2}>
            <span className={styles.since}>{r.k}</span>
            <span className={styles.req} style={{ color: r.rc }}>
              {r.req}
            </span>
            <span className={styles.text} style={{ color: r.c }}>
              {r.v}
            </span>
          </div>
        ))}
        {lp.hasNotes ? (
          <div className={styles.stack5}>
            <span className={styles.since}>Instructor notes</span>
            <span className={styles.notes}>{lp.notes}</span>
          </div>
        ) : null}
      </div>
      <div className={styles.stack6}>
        <div className={styles.grid3}>
          {lp.segs.map((o, i) => (
            <button
              key={i}
              onClick={o.pick}
              className={styles.button}
              style={{ background: o.bg, color: o.fg }}
            >
              {o.t}
            </button>
          ))}
        </div>
        {lp.showUp ? (
          <>
            {lp.up.map((c, i) => (
              <button
                key={i}
                className={`${styles.button2} hover-bg-mist`}
                onClick={c.open}
                style={{ borderLeft: `4px solid ${c.st.bar}` }}
              >
                <span className={styles.date}>
                  {c.date} · {c.range}
                </span>
                <span className={styles.fin}>{c.fin}</span>
                <span className={styles.since}>
                  {c.dur} · {c.pc}
                </span>
                <span className={styles.label} style={{ background: c.st.bg, color: c.st.fg }}>
                  {c.st.label}
                </span>
              </button>
            ))}
          </>
        ) : null}
        {lp.showPrev ? (
          <>
            {lp.pv.map((c, i) => (
              <button
                key={i}
                className={`${styles.button2} hover-bg-mist`}
                onClick={c.open}
                style={{ borderLeft: `4px solid ${c.st.bar}` }}
              >
                <span className={styles.date} style={{ textDecoration: c.deco }}>
                  {c.date} · {c.range}
                </span>
                <span className={styles.fin}>{c.fin}</span>
                <span className={styles.since}>
                  {c.dur} · {c.pc}
                </span>
                <span className={styles.label} style={{ background: c.st.bg, color: c.st.fg }}>
                  {c.st.label}
                </span>
              </button>
            ))}
          </>
        ) : null}
        {lp.noUp ? (
          <div className={styles.row4}>
            <span className={styles.upcomingLessons}>No upcoming lessons.</span>
            <button onClick={lp.schedule} className={styles.scheduleLessonButton}>
              Schedule a lesson
            </button>
          </div>
        ) : null}
        {lp.noPv ? (
          <div className={styles.completedAndPrevious}>Completed and previous lessons will appear here.</div>
        ) : null}
      </div>
    </div>
  );
}
