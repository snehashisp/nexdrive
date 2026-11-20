import styles from './Security.module.css';

export default function Security({ v }) {
  const { back, ic, icl, ics, pwChanged, sec } = v;
  if (!sec) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <button className={`${styles.backButton} hover-bg-mist`} onClick={back} aria-label="Back">
          {icl.left}
        </button>
        <span className={styles.security}>Security</span>
      </div>
      <div className={styles.stack2}>
        <div className={styles.lockRow}>
          {ic.lock}
          <span className={styles.stack3}>
            <span className={styles.password}>Password</span>
            <span className={styles.lastChanged}>Last changed {pwChanged}</span>
          </span>
          <button onClick={sec.toggle} className={styles.pwlabelButton}>
            {sec.pwLabel}
          </button>
        </div>
        {sec.open ? (
          <div className={styles.stack4}>
            <input
              className={`${styles.input} focus-border-violet`}
              type="password"
              value={sec.f.cur ?? ''}
              onChange={sec.h.cur}
              placeholder="Current password"
              style={{ border: `1.5px solid ${sec.b.cur}` }}
            />
            {sec.e.cur ? <span className={styles.cur}>{sec.e.cur}</span> : null}
            <input
              className={`${styles.input} focus-border-violet`}
              type="password"
              value={sec.f.nw ?? ''}
              onChange={sec.h.nw}
              placeholder="New password"
              style={{ border: `1.5px solid ${sec.b.nw}` }}
            />
            {sec.e.nw ? <span className={styles.cur}>{sec.e.nw}</span> : null}
            <input
              className={`${styles.input} focus-border-violet`}
              type="password"
              value={sec.f.conf ?? ''}
              onChange={sec.h.conf}
              placeholder="Confirm new password"
              style={{ border: `1.5px solid ${sec.b.conf}` }}
            />
            {sec.e.conf ? <span className={styles.cur}>{sec.e.conf}</span> : null}
            <button onClick={sec.save} className={styles.updatePasswordButton}>
              Update password{ic.arrow}
            </button>
          </div>
        ) : null}
        <button onClick={sec.verified} className={styles.phoneButton}>
          {ic.phone}
          <span className={styles.stack3}>
            <span className={styles.password}>Mobile number</span>
            <span className={styles.lastChanged}>{sec.phone}</span>
          </span>
          <span className={styles.checkRow}>{ics.check}Verified</span>
        </button>
        <button onClick={sec.verified} className={styles.phoneButton}>
          {ic.mail}
          <span className={styles.stack5}>
            <span className={styles.password}>Email address</span>
            <span className={styles.email}>{sec.email}</span>
          </span>
          <span className={styles.checkRow}>{ics.check}Verified</span>
        </button>
        <button onClick={sec.logout} className={styles.logoutButton}>
          {ic.logout}Log out
        </button>
      </div>
    </div>
  );
}
