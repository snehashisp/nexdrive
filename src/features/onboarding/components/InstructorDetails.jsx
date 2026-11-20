import styles from './InstructorDetails.module.css';

export default function InstructorDetails({ v }) {
  const { det, detB, detDur, detE, detStatus, hDet, ics } = v;
  return (
    <div className={styles.stack}>
      <div className={styles.stack2}>
        <h1 className={styles.yourInstructorDetails}>Your instructor details</h1>
        <p className={styles.useTheseVerify}>We use these to verify your status and set up your prices.</p>
      </div>
      <label className={styles.stack2}>
        <span className={styles.adiRegistrationNumberRow}>
          ADI registration number<span className={styles.required}>Required</span>
        </span>
        <input
          className={`${styles.input} focus-border-violet`}
          inputMode="numeric"
          maxLength="6"
          value={det.adi ?? ''}
          onChange={hDet.adi}
          placeholder="6 digits"
          style={{ border: `1.5px solid ${detB.adi}` }}
        />
        {detE.adi ? (
          <span className={styles.alertRow}>
            {ics.alert}
            {detE.adi}
          </span>
        ) : null}
        <span className={styles.printedYourDvsa}>Printed on your DVSA instructor badge.</span>
      </label>
      <div className={styles.stack2}>
        <span className={styles.instructorStatus}>Instructor status</span>
        {detStatus.map((o, i) => (
          <button
            key={i}
            onClick={o.pick}
            className={styles.button}
            style={{ border: `1.5px solid ${o.bd}` }}
          >
            <span className={styles.text} style={{ border: o.ring }} />
            <span className={styles.stack3}>
              <span className={styles.text2}>{o.t}</span>
              <span className={styles.printedYourDvsa}>{o.d}</span>
            </span>
            <span className={styles.text3} style={{ background: o.badge }} />
          </button>
        ))}
      </div>
      <label className={styles.stack2}>
        <span className={styles.adiRegistrationNumberRow}>
          Business name<span className={styles.optional}>Optional</span>
        </span>
        <input
          className={`${styles.input2} focus-border-violet`}
          value={det.business ?? ''}
          onChange={hDet.business}
          placeholder="Wilson Driving School"
        />
      </label>
      <label className={styles.stack2}>
        <span className={styles.adiRegistrationNumberRow}>
          Postcode areas you cover<span className={styles.required}>Required</span>
        </span>
        <input
          className={`${styles.input3} focus-border-violet`}
          value={det.areas ?? ''}
          onChange={hDet.areas}
          placeholder="SL1, SL2, SL3"
          style={{ border: `1.5px solid ${detB.areas}` }}
        />
        {detE.areas ? (
          <span className={styles.alertRow}>
            {ics.alert}
            {detE.areas}
          </span>
        ) : null}
      </label>
      <div className={styles.grid}>
        <label className={styles.stack2}>
          <span className={styles.instructorStatus}>Hourly rate</span>
          <span className={styles.row} style={{ border: `1.5px solid ${detB.rate}` }}>
            <span className={styles.text4}>£</span>
            <input
              inputMode="decimal"
              value={det.rate ?? ''}
              onChange={hDet.rate}
              className={styles.input4}
            />
            <span className={styles.text5}>/hr</span>
          </span>
        </label>
        <div className={styles.stack2}>
          <span className={styles.instructorStatus}>Default lesson</span>
          <div className={styles.grid2}>
            {detDur.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                className={styles.button2}
                style={{ background: o.bg, color: o.fg }}
              >
                {o.t}
              </button>
            ))}
          </div>
        </div>
      </div>
      {detE.rate ? (
        <span className={styles.alertRow2}>
          {ics.alert}
          {detE.rate}
        </span>
      ) : null}
    </div>
  );
}
