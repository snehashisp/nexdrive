import { useBookingsView } from '../hooks/useBookingsView';
import styles from './Bookings.module.css';

export default function Bookings() {
  const v = useBookingsView();
  const { back, bk, icl, ics } = v;
  if (!bk) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <div className={styles.row}>
          <button className={`${styles.backButton} hover-bg-mist`} onClick={back} aria-label="Back">
            {icl.left}
          </button>
          <span className={styles.bookings}>Bookings</span>
        </div>
        <div className={styles.grid}>
          {bk.segs.map((o, i) => (
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
      </div>
      {bk.isUp ? (
        <>
          {bk.groups.map((g, i) => (
            <div key={i} className={styles.stack2}>
              <span className={styles.label}>{g.label}</span>
              {g.items.map((c, i1) => (
                <button
                  key={i1}
                  className={`${styles.button2} hover-bg-mist`}
                  onClick={c.open}
                  style={{ borderLeft: `4px solid ${c.st.bar}` }}
                >
                  <div className={styles.stack3}>
                    <span className={styles.start}>{c.start}</span>
                    <span className={styles.durs}>{c.durS}</span>
                  </div>
                  <div className={styles.stack4}>
                    <span className={styles.name}>{c.name}</span>
                    <span className={styles.range}>
                      {c.range} · {c.pc}
                    </span>
                    <span className={styles.label2} style={{ background: c.st.bg, color: c.st.fg }}>
                      {c.st.label}
                    </span>
                  </div>
                  <div className={styles.stack5}>
                    <span className={styles.fin}>{c.fin}</span>
                    <span className={styles.right}>{ics.right}</span>
                  </div>
                </button>
              ))}
            </div>
          ))}
          {bk.noUp ? (
            <div className={styles.stack6}>
              <span className={styles.calendar}>{icl.calendar}</span>
              <div className={styles.stack7}>
                <span className={styles.yourCalendarClear}>Your calendar is clear.</span>
                <span className={styles.upcomingLessonsWill}>
                  Upcoming lessons will be listed here by day.
                </span>
              </div>
              <button onClick={bk.newBooking} className={styles.plusButton}>
                {ics.plus}Schedule a lesson
              </button>
            </div>
          ) : null}
        </>
      ) : null}
      {bk.isHist ? (
        <>
          <div className={styles.stack8}>
            <div className={`${styles.row2} nx-scroll`}>
              {bk.statuses.map((o, i) => (
                <button
                  key={i}
                  onClick={o.pick}
                  className={styles.button3}
                  style={{ background: o.bg, color: o.fg, border: `1.5px solid ${o.bd}` }}
                >
                  {o.t}
                </button>
              ))}
            </div>
            <div className={styles.grid2}>
              <label className={styles.learnerLabel}>
                Learner
                <select value={bk.learner ?? ''} onChange={bk.hLearner} className={styles.select}>
                  {bk.learnerOpts.map((o, i) => (
                    <option key={i} value={o.v}>
                      {o.t}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.learnerLabel}>
                Date
                <select value={bk.range ?? ''} onChange={bk.hRange} className={styles.select}>
                  {bk.rangeOpts.map((o, i) => (
                    <option key={i} value={o.v}>
                      {o.t}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className={styles.row3}>
              <span className={styles.summary}>{bk.summary}</span>
              {bk.filtered ? (
                <button onClick={bk.reset} className={styles.clearFiltersButton}>
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>
          {bk.hasHist ? (
            <>
              {bk.hist.map((c, i) => (
                <button key={i} className={`${styles.button4} hover-bg-mist`} onClick={c.open}>
                  <span className={styles.row4}>
                    <span className={styles.text} style={{ background: c.st.bar }} />
                    <span className={styles.name} style={{ textDecoration: c.deco }}>
                      {c.name}
                    </span>
                    {c.archived ? <span className={styles.removed}>Removed</span> : null}
                  </span>
                  <span className={styles.fin} style={{ textDecoration: c.deco }}>
                    {c.fin}
                  </span>
                  <span className={styles.date}>
                    {c.date} · {c.range}
                  </span>
                  <span className={styles.label3} style={{ color: c.st.fg }}>
                    {c.st.label}
                  </span>
                  {c.prev ? <span className={styles.movedFrom}>Moved from {c.prev}</span> : null}
                  {c.reason ? <span className={styles.reason}>{c.reason}</span> : null}
                </button>
              ))}
            </>
          ) : null}
          {bk.noHist ? (
            <div className={styles.stack9}>
              <span className={styles.bookingHistoryYet}>No booking history yet.</span>
              <span className={styles.upcomingLessonsWill}>
                Completed and previous lessons will appear here.
              </span>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
