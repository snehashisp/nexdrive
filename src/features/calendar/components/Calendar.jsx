import { useCalendarView } from '../hooks/useCalendarView';
import styles from './Calendar.module.css';

export default function Calendar() {
  const v = useCalendarView();
  const { cal, ic, ics } = v;
  if (!cal) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <div className={styles.row}>
          <h1 className={styles.calendar}>Calendar</h1>
          <div className={styles.row2}>
            {cal.notToday ? (
              <button className={`${styles.todayButton} hover-bg-mist`} onClick={cal.today}>
                Today
              </button>
            ) : null}
            <button
              className={`${styles.newBookingButton} hover-bg-violet-700`}
              onClick={cal.newBooking}
              aria-label="New booking"
            >
              {ic.plus}
            </button>
          </div>
        </div>
        <div className={styles.grid}>
          {cal.views.map((o, i) => (
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
        <div className={styles.row3}>
          <button
            className={`${styles.previousButton} hover-bg-mist`}
            onClick={cal.prev}
            aria-label="Previous"
          >
            {ic.left}
          </button>
          <span className={styles.title}>{cal.title}</span>
          <button className={`${styles.previousButton} hover-bg-mist`} onClick={cal.next} aria-label="Next">
            {ic.right}
          </button>
        </div>
        {cal.isDay ? (
          <>
            <div className={styles.grid2}>
              {cal.strip.map((d, i) => (
                <button
                  key={i}
                  onClick={d.pick}
                  className={styles.button2}
                  style={{ background: d.bg, color: d.fg }}
                >
                  <span className={styles.text}>{d.dw}</span>
                  <span className={styles.num}>{d.num}</span>
                  <span className={styles.text2} style={{ background: d.dot }} />
                </button>
              ))}
            </div>
            <div className={styles.clockRow}>
              {ics.clock}
              {cal.summary}
            </div>
          </>
        ) : null}
      </div>
      {cal.isDay ? (
        <>
          {cal.dayEmpty ? (
            <div className={styles.row4}>
              <div className={styles.stack2}>
                <span className={styles.title}>Your calendar is clear.</span>
                <span className={styles.lessonsBookedFor}>No lessons booked for this day.</span>
              </div>
              <button className={`${styles.plusButton} hover-bg-violet-700`} onClick={cal.newBooking}>
                {ics.plus}Schedule a lesson
              </button>
            </div>
          ) : null}
          <div className={styles.box} style={{ height: `${cal.tlH}px` }}>
            {cal.hours.map((h, i) => (
              <div key={i} className={styles.overlay} style={{ top: `${h.top}px` }}>
                <span className={styles.labelOverlay}>{h.label}</span>
              </div>
            ))}
            {cal.showNow ? (
              <div className={styles.overlay2} style={{ top: `${cal.nowTop}px` }}>
                <span className={styles.overlay3} />
              </div>
            ) : null}
            {cal.blocks.map((b, i) => (
              <button
                key={i}
                onClick={b.open}
                className={styles.button3}
                style={{
                  top: `${b.top}px`,
                  height: `${b.h}px`,
                  background: b.st.tint,
                  borderLeft: `4px solid ${b.st.bar}`,
                  color: b.st.ink,
                  opacity: b.op,
                }}
              >
                <span className={styles.row5}>
                  <span className={styles.name} style={{ textDecoration: b.deco }}>
                    {b.name}
                  </span>
                  <span className={styles.label} style={{ background: b.st.bg, color: b.st.fg }}>
                    {b.st.label}
                  </span>
                </span>
                <span className={styles.range}>
                  {b.range} · {b.durS} · {b.pc} · {b.fin}
                </span>
              </button>
            ))}
          </div>
        </>
      ) : null}
      {cal.isWeek ? (
        <>
          <div className={styles.grid3}>
            <span />
            {cal.week.map((d, i) => (
              <button key={i} onClick={d.pick} className={styles.button4}>
                <span className={styles.text3}>{d.dw}</span>
                <span className={styles.numRow} style={{ background: d.hbg, color: d.hfg }}>
                  {d.num}
                </span>
              </button>
            ))}
          </div>
          <div className={styles.grid4} style={{ height: `${cal.wH}px` }}>
            <div className={styles.box2}>
              {cal.wHours.map((h, i) => (
                <span key={i} className={styles.labelOverlay2} style={{ top: `${h.top}px` }}>
                  {h.label}
                </span>
              ))}
            </div>
            {cal.week.map((d, i) => (
              <div key={i} className={styles.box3}>
                {d.blocks.map((b, i1) => (
                  <button
                    key={i1}
                    onClick={b.open}
                    className={styles.button5}
                    style={{
                      top: `${b.top}px`,
                      height: `${b.h}px`,
                      borderTop: `3px solid ${b.st.bar}`,
                      background: b.st.tint,
                      color: b.st.ink,
                      opacity: b.op,
                    }}
                  >
                    <span className={styles.initials} style={{ textDecoration: b.deco }}>
                      {b.initials}
                    </span>
                    <span className={styles.start}>{b.start}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : null}
      {cal.isMonth ? (
        <>
          <div className={styles.grid5}>
            <span className={styles.mon}>Mon</span>
            <span className={styles.mon}>Tue</span>
            <span className={styles.mon}>Wed</span>
            <span className={styles.mon}>Thu</span>
            <span className={styles.mon}>Fri</span>
            <span className={styles.mon}>Sat</span>
            <span className={styles.mon}>Sun</span>
          </div>
          <div className={styles.grid6}>
            {cal.cells?.map((c, i) => (
              <button
                key={i}
                onClick={c.pick}
                className={styles.button6}
                style={{ background: c.bg, color: c.fg }}
              >
                <span className={styles.num2} style={{ fontWeight: c.fw }}>
                  {c.num}
                </span>
                <span className={styles.row6}>
                  {c.dots.map((dt, i1) => (
                    <span key={i1} className={styles.text4} style={{ background: dt.c }} />
                  ))}
                </span>
              </button>
            ))}
          </div>
          <div className={styles.stack3}>
            <span className={styles.listlabel}>{cal.listLabel}</span>
            {cal.list?.map((c, i) => (
              <button
                key={i}
                className={`${styles.button7} hover-bg-mist`}
                onClick={c.open}
                style={{ borderLeft: `4px solid ${c.st.bar}` }}
              >
                <div className={styles.stack4}>
                  <span className={styles.start2}>{c.start}</span>
                  <span className={styles.durs}>{c.durS}</span>
                </div>
                <div className={styles.stack5}>
                  <span className={styles.name2} style={{ textDecoration: c.deco }}>
                    {c.name}
                  </span>
                  <span className={styles.lessonsBookedFor}>
                    {c.range} · {c.pc}
                  </span>
                  <span className={styles.label2} style={{ background: c.st.bg, color: c.st.fg }}>
                    {c.st.label}
                  </span>
                </div>
                <div className={styles.stack6}>
                  <span className={styles.fin}>{c.fin}</span>
                  <span className={styles.right}>{ics.right}</span>
                </div>
              </button>
            ))}
            {cal.dayEmpty ? (
              <div className={styles.row7}>
                <span className={styles.yourCalendarClear}>Your calendar is clear.</span>
                <button onClick={cal.newBooking} className={styles.scheduleLessonButton}>
                  Schedule a lesson
                </button>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
      {cal.isDay ? <span /> : null}
      <div className={styles.row8}>
        {cal.legend.map((g, i) => (
          <span key={i} className={styles.row9}>
            <span className={styles.text5} style={{ background: g.c }} />
            {g.t}
          </span>
        ))}
      </div>
    </div>
  );
}
