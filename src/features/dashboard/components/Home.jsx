import styles from './Home.module.css';

export default function Home({ v }) {
  const { dismissReminder, go, hm, ic, icl, ics } = v;
  if (!hm) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.row}>
        <div className={styles.row2}>
          <img src="assets/logos/monogram-on-light.svg" alt="" className={styles.img} />
          <span className={styles.text}>
            <span className={styles.nex}>NEX</span>
            <span className={styles.drive}>Drive</span>
          </span>
        </div>
        <div className={styles.row3}>
          <button
            className={`${styles.notificationsButton} hover-bg-mist`}
            onClick={go.notifications}
            aria-label="Notifications"
          >
            {ic.bell}
            {hm.unread ? <span className={styles.unreadOverlay}>{hm.unread}</span> : null}
          </button>
          <button onClick={go.more} aria-label="Account" className={styles.accountButton}>
            {hm.initials}
          </button>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.datelabel}>{hm.dateLabel}</div>
        <h1 className={styles.greeting}>{hm.greeting}</h1>
      </div>
      {hm.banner ? (
        <button
          onClick={go.subscription}
          className={styles.warnButton}
          style={{ borderBottom: `1px solid ${hm.banner.bd}`, background: hm.banner.bg, color: hm.banner.fg }}
        >
          {ics.warn}
          <span className={styles.text2}>{hm.banner.t}</span>
          {ics.right}
        </button>
      ) : null}
      {hm.reminder ? (
        <div className={styles.stack2}>
          <div className={styles.row4}>
            <div className={styles.stack3}>
              <span className={styles.reminderRow}>
                <span className={styles.reminder} />
                REMINDER
              </span>
              <span className={styles.yourNextLesson}>
                Your next lesson starts in {hm.reminder.mins} minutes
              </span>
            </div>
            <button onClick={dismissReminder} aria-label="Dismiss" className={styles.dismissButton}>
              {ic.x}
            </button>
          </div>
          <div className={styles.grid}>
            <div className={styles.stack4}>
              <span className={styles.learner}>Learner</span>
              <span className={styles.name}>{hm.reminder.name}</span>
            </div>
            <div className={styles.stack4}>
              <span className={styles.learner}>Time</span>
              <span className={styles.name}>{hm.reminder.start}</span>
            </div>
            <div className={styles.stack4}>
              <span className={styles.learner}>Duration</span>
              <span className={styles.name}>{hm.reminder.dur}</span>
            </div>
            <div className={styles.stack4}>
              <span className={styles.learner}>Location</span>
              <span className={styles.name}>{hm.reminder.pc}</span>
            </div>
          </div>
          <div className={styles.grid2}>
            <button className={`${styles.eyeButton} hover-bg-violet-700`} onClick={hm.reminder.open}>
              {ics.eye}View lesson
            </button>
            <button className={`${styles.navButton} hover-bg-violet-100`} onClick={hm.reminder.nav}>
              {ics.nav}Navigate
            </button>
          </div>
        </div>
      ) : null}
      <div className={styles.grid3}>
        <div className={styles.box2}>
          <div className={styles.todayLessons}>Today's lessons</div>
          <div className={styles.todayn}>{hm.todayN}</div>
          <div className={styles.todaysub}>{hm.todaySub}</div>
        </div>
        <div className={styles.box2}>
          <div className={styles.todayLessons}>Upcoming · 7 days</div>
          <div className={styles.todayn}>{hm.weekN}</div>
          <div className={styles.todaysub}>{hm.weekSub}</div>
        </div>
        <div className={styles.box2}>
          <div className={styles.todayLessons}>Today's earnings</div>
          <div className={styles.todayn}>{hm.earnDone}</div>
          <div className={styles.todaysub}>{hm.earnSub}</div>
        </div>
        <div className={styles.box2}>
          <div className={styles.todayLessons}>Active learners</div>
          <div className={styles.todayn}>{hm.activeN}</div>
          <div className={styles.activesub} style={{ color: hm.activeSubC }}>
            {hm.activeSub}
          </div>
        </div>
      </div>
      {hm.ongoing ? (
        <div className={styles.stack5}>
          <div className={styles.ongoing}>ONGOING</div>
          <button className={`${styles.button} hover-bg-ink-2`} onClick={hm.ongoing.open}>
            <div className={styles.stack6}>
              <span className={styles.start}>{hm.ongoing.start}</span>
              <span className={styles.durs}>{hm.ongoing.durS}</span>
            </div>
            <div className={styles.stack7}>
              <span className={styles.row2}>
                <span className={styles.name2}>{hm.ongoing.name}</span>
                <span className={styles.ongoing2}>Ongoing</span>
              </span>
              <span className={styles.todayEnds}>
                Today · ends {hm.ongoing.end} · {hm.ongoing.pc}
              </span>
              <span className={styles.row5}>
                <span className={styles.text3} style={{ width: `${hm.ongoing.pct}%` }} />
              </span>
            </div>
            <div className={styles.stack8}>
              <span className={styles.fin}>{hm.ongoing.fin}</span>
              <span className={styles.right}>{ics.right}</span>
            </div>
          </button>
        </div>
      ) : null}
      <div className={styles.stack5}>
        <div className={styles.row6}>
          <span className={styles.ongoing}>UPCOMING</span>
          <button onClick={go.bookings} className={styles.allBookingsButton}>
            All bookings
          </button>
        </div>
        {hm.hasNext ? (
          <div className={styles.grid4}>
            {hm.next.map((c, i) => (
              <button
                key={i}
                className={`${styles.button2} hover-bg-mist`}
                onClick={c.open}
                style={{ borderLeft: `4px solid ${c.st.bar}` }}
              >
                <div className={styles.stack9}>
                  <span className={styles.start}>{c.start}</span>
                  <span className={styles.todaysub}>{c.durS}</span>
                </div>
                <div className={styles.stack7}>
                  <span className={styles.name2}>{c.name}</span>
                  <span className={styles.daylabel}>
                    {c.dayLabel} · {c.pc}
                  </span>
                  <span className={styles.label} style={{ background: c.st.bg, color: c.st.fg }}>
                    {c.st.label}
                  </span>
                </div>
                <div className={styles.stack8}>
                  <span className={styles.fin}>{c.fin}</span>
                  <span className={styles.right2}>{ics.right}</span>
                </div>
              </button>
            ))}
          </div>
        ) : null}
        {hm.noNext ? (
          <div className={styles.stack10}>
            <span className={styles.calendar}>{icl.calendar}</span>
            <div className={styles.stack11}>
              <span className={styles.upcomingLessonsToday}>No upcoming lessons today.</span>
              <span className={styles.bookLessonAnd}>
                Book a lesson and it'll appear here with time, place and price.
              </span>
            </div>
            <button className={`${styles.plusButton} hover-bg-violet-700`} onClick={go.newBooking}>
              {ics.plus}Schedule a lesson
            </button>
          </div>
        ) : null}
      </div>
      {hm.ref ? (
        <div className={styles.stack5}>
          <div className={styles.ongoing}>{'REFER & EARN'}</div>
          <div className={styles.stack12}>
            <button className={`${styles.button3} hover-bg-mist`} onClick={go.referrals}>
              <span className={styles.giftRow}>{ic.gift}</span>
              <span className={styles.stack13}>
                <span className={styles.row7}>
                  <span className={styles.bal}>{hm.ref.bal}</span>
                  <span className={styles.nexdriveCredit}>NexDrive Credit</span>
                </span>
                <span className={styles.daylabel}>{hm.ref.sub}</span>
              </span>
              <span className={styles.right2}>{ics.right}</span>
            </button>
            <div className={styles.grid5}>
              <span className={styles.theyGetMonth}>They get 1 month free. You earn 20% as credit.</span>
              <button
                className={`${styles.referInstructorButton} hover-bg-violet-100`}
                onClick={go.referralShare}
              >
                Refer an instructor{ics.arrow}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className={styles.stack5}>
        <div className={styles.ongoing}>QUICK ACTIONS</div>
        <div className={styles.grid6}>
          <button className={`${styles.newBookingButton} hover-bg-mist`} onClick={go.newBooking}>
            <span className={styles.calendarplus}>{ic.calendarPlus}</span>New booking
          </button>
          <button className={`${styles.newBookingButton} hover-bg-mist`} onClick={go.addLearner}>
            <span className={styles.calendarplus}>{ic.userPlus}</span>Add learner
          </button>
          <button className={`${styles.newBookingButton} hover-bg-mist`} onClick={go.package}>
            <span className={styles.calendarplus}>{ic.layers}</span>Book package
          </button>
        </div>
      </div>
    </div>
  );
}
