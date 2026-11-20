import styles from './Profile.module.css';

export default function Profile({ v }) {
  const { back, icl, ics, pf } = v;
  if (!pf) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <button className={`${styles.backButton} hover-bg-mist`} onClick={back} aria-label="Back">
          {icl.left}
        </button>
        <span className={styles.instructorProfile}>Instructor profile</span>
      </div>
      <div className={styles.stack2}>
        <div className={styles.row}>
          <span className={styles.initialsRow}>{pf.initials}</span>
          <button onClick={pf.photo} className={styles.changePhotoButton}>
            Change photo
          </button>
        </div>
        <div className={styles.personal}>PERSONAL</div>
        <label className={styles.label}>
          <span className={styles.fullName}>Full name</span>
          <input
            className={`${styles.input} focus-border-violet`}
            value={pf.f.name ?? ''}
            onChange={pf.h.name}
            style={{ border: `1.5px solid ${pf.b.name}` }}
          />
          {pf.e.name ? (
            <span className={styles.alertRow}>
              {ics.alert}
              {pf.e.name}
            </span>
          ) : null}
        </label>
        <label className={styles.label}>
          <span className={styles.fullName}>Mobile number</span>
          <input
            className={`${styles.input} focus-border-violet`}
            type="tel"
            value={pf.f.phone ?? ''}
            onChange={pf.h.phone}
            style={{ border: `1.5px solid ${pf.b.phone}` }}
          />
          {pf.e.phone ? (
            <span className={styles.alertRow}>
              {ics.alert}
              {pf.e.phone}
            </span>
          ) : null}
        </label>
        <label className={styles.label}>
          <span className={styles.fullName}>Email address</span>
          <input
            className={`${styles.input} focus-border-violet`}
            type="email"
            value={pf.f.email ?? ''}
            onChange={pf.h.email}
            style={{ border: `1.5px solid ${pf.b.email}` }}
          />
          {pf.e.email ? (
            <span className={styles.alertRow}>
              {ics.alert}
              {pf.e.email}
            </span>
          ) : null}
        </label>
        <div className={styles.grid}>
          <label className={styles.label}>
            <span className={styles.fullName}>Address</span>
            <input
              className={`${styles.input2} focus-border-violet`}
              value={pf.f.address ?? ''}
              onChange={pf.h.address}
            />
          </label>
          <label className={styles.label}>
            <span className={styles.fullName}>Postcode</span>
            <input
              className={`${styles.input3} focus-border-violet`}
              value={pf.f.postcode ?? ''}
              onChange={pf.h.postcode}
            />
          </label>
        </div>
        <div className={styles.professional}>PROFESSIONAL</div>
        <div className={styles.row2}>
          <span className={styles.text} style={{ background: pf.badge }} />
          <span className={styles.stack3}>
            <span className={styles.adi}>ADI {pf.f.adi}</span>
            <span className={styles.status}>{pf.status}</span>
          </span>
          <span className={styles.checkRow}>{ics.check}Verified</span>
        </div>
        <label className={styles.label}>
          <span className={styles.fullName}>Business name</span>
          <input
            className={`${styles.input2} focus-border-violet`}
            value={pf.f.business ?? ''}
            onChange={pf.h.business}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.fullName}>Postcode areas covered</span>
          <input
            className={`${styles.input2} focus-border-violet`}
            value={pf.f.areas ?? ''}
            onChange={pf.h.areas}
          />
        </label>
      </div>
    </div>
  );
}

export function ProfileFooter({ v }) {
  const { ic, padB, pf } = v;
  if (!pf) return null;
  return (
    <div className={styles.box} style={{ padding: `12px 20px ${padB}px` }}>
      <button className={`${styles.saveProfileButton} hover-bg-violet-700`} onClick={pf.save}>
        Save profile{ic.check}
      </button>
    </div>
  );
}
