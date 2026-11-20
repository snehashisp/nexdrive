import styles from './LessonDetails.module.css';

export default function LessonDetails({ v }) {
  const { back, ic, icl, ld } = v;
  if (!ld) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <button className={`${styles.backButton} hover-bg-mist`} onClick={back} aria-label="Back">
          {icl.left}
        </button>
        <span className={styles.lesson}>Lesson</span>
      </div>
      <div className={styles.stack2} style={{ borderLeft: `6px solid ${ld.st.bar}` }}>
        <span className={styles.row}>
          <span className={styles.label} style={{ background: ld.st.bg, color: ld.st.fg }}>
            {ld.st.label}
          </span>
          <span className={styles.note}>{ld.note}</span>
        </span>
        <h1 className={styles.datelong} style={{ textDecoration: ld.deco }}>
          {ld.dateLong}
        </h1>
        <span className={styles.range}>
          {ld.range} · {ld.dur}
        </span>
      </div>
      <div className={styles.stack3}>
        <span className={styles.learner}>LEARNER</span>
        <div className={styles.row2}>
          <span className={styles.initialsRow}>{ld.initials}</span>
          <span className={styles.stack4}>
            <span className={styles.name}>{ld.name}</span>
            <span className={styles.phone}>{ld.phone}</span>
          </span>
          <button onClick={ld.profile} className={styles.proflabelButton}>
            {ld.profLabel}
          </button>
        </div>
        <div className={styles.grid}>
          <button className={`${styles.phoneButton} hover-bg-mist`} onClick={ld.call}>
            {ic.phone}Call learner
          </button>
          <button className={`${styles.phoneButton} hover-bg-mist`} onClick={ld.msg}>
            {ic.message}Message
          </button>
        </div>
      </div>
      <div className={styles.stack5}>
        <span className={styles.learner}>LOCATION</span>
        <div className={styles.stack6}>
          <div className={styles.row3}>
            <span className={styles.pinStack}>
              {icl.pin}
              <span className={styles.text}>{ld.pc}</span>
            </span>
            <span className={styles.mapPreviewOverlay}>Map preview</span>
          </div>
          <div className={styles.stack7}>
            <span className={styles.loc}>{ld.loc}</span>
            <span className={styles.text2}>{ld.pc}</span>
          </div>
          {ld.canNav ? (
            <button className={`${styles.button} hover-bg-violet-700 active-bg-violet-800`} onClick={ld.nav}>
              <span className={styles.navRow}>{ic.nav}Navigate</span>
              <span className={styles.opensGoogleMaps}>Opens Google Maps</span>
            </button>
          ) : null}
        </div>
      </div>
      <div className={styles.stack8}>
        <span className={styles.payment}>PAYMENT</span>
        <div className={styles.row4}>
          <span className={styles.rate}>Rate</span>
          <span className={styles.raterow}>{ld.rateRow}</span>
        </div>
        <div className={styles.row4}>
          <span className={styles.rate}>Lesson price</span>
          <span className={styles.raterow}>{ld.price}</span>
        </div>
        {ld.hasDisc ? (
          <div className={styles.row4}>
            <span className={styles.rate}>Discount</span>
            <span className={styles.disc}>{ld.disc}</span>
          </div>
        ) : null}
        <div className={styles.row5}>
          <span className={styles.finalAmount}>Final amount</span>
          <span className={styles.fin}>{ld.fin}</span>
        </div>
      </div>
      {ld.canChange ? (
        <div className={styles.grid2}>
          <button className={`${styles.repeatButton} hover-bg-mist`} onClick={ld.resched}>
            {ic.repeat}Reschedule
          </button>
          <button className={`${styles.calendarxButton} hover-bg-error`} onClick={ld.cancel}>
            {ic.calendarX}Cancel
          </button>
        </div>
      ) : null}
      {ld.isCancelled ? (
        <div className={styles.thisLessonWas}>
          This lesson was cancelled. It stays in your booking history for your records.
        </div>
      ) : null}
    </div>
  );
}
