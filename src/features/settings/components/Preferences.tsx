import { usePreferencesView } from '../hooks/usePreferencesView';
import styles from './Preferences.module.css';

export default function Preferences() {
  const v = usePreferencesView();
  const { back, icl, pp } = v;
  if (!pp) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <button className={`${styles.backButton} hover-bg-mist`} onClick={back} aria-label="Back">
          {icl.left}
        </button>
        <span className={styles.notificationPreferences}>Notification preferences</span>
      </div>
      <div className={styles.stack2}>
        <div className={styles.reminders}>REMINDERS</div>
        <button onClick={pp.t.reminder.flip} className={styles.button}>
          <span className={styles.stack3}>
            <span className={styles.nextLessonReminder}>Next-lesson reminder</span>
            <span className={styles.appBannerAnd}>In-app banner and phone notification</span>
          </span>
          <span className={styles.text} style={{ background: pp.t.reminder.bg }}>
            <span className={styles.overlay} style={{ left: `${pp.t.reminder.x}px` }} />
          </span>
        </button>
        {pp.showMins ? (
          <div className={styles.grid}>
            {pp.mins.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                className={styles.button2}
                style={{ background: o.bg, color: o.fg, border: `1.5px solid ${o.bd}` }}
              >
                {o.t} before
              </button>
            ))}
          </div>
        ) : null}
        <div className={styles.alerts}>ALERTS</div>
        <button onClick={pp.t.bookingAlerts.flip} className={styles.button}>
          <span className={styles.stack3}>
            <span className={styles.nextLessonReminder}>Booking changes</span>
            <span className={styles.appBannerAnd}>Created, rescheduled and cancelled lessons</span>
          </span>
          <span className={styles.text} style={{ background: pp.t.bookingAlerts.bg }}>
            <span className={styles.overlay} style={{ left: `${pp.t.bookingAlerts.x}px` }} />
          </span>
        </button>
        <button onClick={pp.t.learnerAlerts.flip} className={styles.button}>
          <span className={styles.stack3}>
            <span className={styles.nextLessonReminder}>Learner alerts</span>
            <span className={styles.appBannerAnd}>Incomplete profiles and missing details</span>
          </span>
          <span className={styles.text} style={{ background: pp.t.learnerAlerts.bg }}>
            <span className={styles.overlay} style={{ left: `${pp.t.learnerAlerts.x}px` }} />
          </span>
        </button>
        <button onClick={pp.t.billing.flip} className={styles.button}>
          <span className={styles.stack3}>
            <span className={styles.nextLessonReminder}>{'Subscription & billing'}</span>
            <span className={styles.appBannerAnd}>Trial ending, renewals, payment issues</span>
          </span>
          <span className={styles.text} style={{ background: pp.t.billing.bg }}>
            <span className={styles.overlay} style={{ left: `${pp.t.billing.x}px` }} />
          </span>
        </button>
        <div className={styles.alerts}>LEARNER COMMUNICATION</div>
        <button onClick={pp.t.askSend.flip} className={styles.button}>
          <span className={styles.stack3}>
            <span className={styles.nextLessonReminder}>Ask before messaging learners</span>
            <span className={styles.appBannerAnd}>Preview every message before it's sent</span>
          </span>
          <span className={styles.text} style={{ background: pp.t.askSend.bg }}>
            <span className={styles.overlay} style={{ left: `${pp.t.askSend.x}px` }} />
          </span>
        </button>
        <div className={styles.stack4}>
          <span className={styles.nextLessonReminder}>Send messages by</span>
          <div className={styles.grid2}>
            {pp.chans.map((o, i) => (
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
        </div>
      </div>
    </div>
  );
}
