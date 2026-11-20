import styles from './Notifications.module.css';

export default function Notifications({ v }) {
  const { back, icl, nt } = v;
  if (!nt) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <div className={styles.row}>
          <button className={`${styles.backButton} hover-bg-mist`} onClick={back} aria-label="Back">
            {icl.left}
          </button>
          <span className={styles.notifications}>Notifications</span>
          {nt.hasUnread ? (
            <button onClick={nt.markAll} className={styles.markAllReadButton}>
              Mark all read
            </button>
          ) : null}
        </div>
        <div className={`${styles.row2} nx-scroll`}>
          {nt.cats.map((o, i) => (
            <button
              key={i}
              onClick={o.pick}
              className={styles.button}
              style={{ background: o.bg, color: o.fg, border: `1.5px solid ${o.bd}` }}
            >
              {o.t}
            </button>
          ))}
        </div>
      </div>
      {nt.has ? (
        <>
          {nt.list.map((n, i) => (
            <button
              key={i}
              className={`${styles.button2} hover-bg-mist`}
              onClick={n.open}
              style={{ background: n.bg }}
            >
              <span className={styles.iconRow} style={{ background: n.tb, color: n.tf }}>
                {n.icon}
              </span>
              <span className={styles.stack2}>
                <span className={styles.row3}>
                  <span>{n.cat}</span>
                  <span className={styles.time}>{n.time}</span>
                </span>
                <span className={styles.title}>{n.title}</span>
                <span className={styles.body}>{n.body}</span>
              </span>
              <span className={styles.text} style={{ background: n.dot }} />
            </button>
          ))}
        </>
      ) : null}
      {nt.empty ? (
        <div className={styles.stack3}>
          <span className={styles.bell}>{icl.bell}</span>
          <span className={styles.youAllCaught}>You're all caught up.</span>
          <span className={styles.lessonRemindersBooking}>
            Lesson reminders, booking changes and billing updates will appear here.
          </span>
        </div>
      ) : null}
    </div>
  );
}
