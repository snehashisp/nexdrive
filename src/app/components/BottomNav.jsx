import styles from './BottomNav.module.css';

export default function BottomNav({ v }) {
  const { go, ic, icl, nav, navPadB } = v;
  return (
    <nav className={styles.nav} style={{ paddingBottom: `${navPadB}px` }}>
      <button
        onClick={go.home}
        className={styles.homeButton}
        style={{ boxShadow: nav.home.bar, color: nav.home.c }}
      >
        {ic.home}Home
      </button>
      <button
        onClick={go.calendar}
        className={styles.homeButton}
        style={{ boxShadow: nav.calendar.bar, color: nav.calendar.c }}
      >
        {ic.calendar}Calendar
      </button>
      <div className={styles.row}>
        <button
          className={`${styles.newButton} hover-bg-violet-700 active-bg-violet-800`}
          onClick={go.quick}
          aria-label="New"
        >
          {icl.plus}
        </button>
      </div>
      <button
        onClick={go.learners}
        className={styles.homeButton}
        style={{ boxShadow: nav.learners.bar, color: nav.learners.c }}
      >
        {ic.users}Learners
      </button>
      <button
        onClick={go.more}
        className={styles.homeButton}
        style={{ boxShadow: nav.more.bar, color: nav.more.c }}
      >
        {ic.menu}More
      </button>
    </nav>
  );
}
