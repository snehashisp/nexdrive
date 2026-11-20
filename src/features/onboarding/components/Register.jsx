import styles from './Register.module.css';

export default function Register({ v }) {
  const { hReg, ic, ics, obInvite, pwRules, reg, regB, regE, rfo, sampleReg } = v;
  return (
    <div className={styles.stack}>
      <div className={styles.stack2}>
        <h1 className={styles.createYourAccount}>Create your account</h1>
        <p className={styles.yourLoginAnd}>Your login and the contact details learners will see.</p>
        <button onClick={sampleReg} className={styles.copyButton}>
          {ics.copy}Use sample details
        </button>
      </div>
      {obInvite ? (
        <div className={styles.stack3}>
          <span className={styles.youBeenInvited}>YOU'VE BEEN INVITED BY {obInvite.byCaps}</span>
          <span className={styles.dayFreeTrial}>14-day free trial + 1 additional month free</span>
          <span className={styles.checkRow}>
            {ics.check}Referral code <strong className={styles.code}>{obInvite.code}</strong> applied
          </span>
        </div>
      ) : null}
      <label className={styles.stack2}>
        <span className={styles.fullNameRow}>
          Full name<span className={styles.required}>Required</span>
        </span>
        <input
          className={`${styles.input} focus-border-violet`}
          value={reg.name ?? ''}
          onChange={hReg.name}
          autoComplete="name"
          placeholder="Daniel Wilson"
          style={{ border: `1.5px solid ${regB.name}` }}
        />
        {regE.name ? (
          <span className={styles.alertRow}>
            {ics.alert}
            {regE.name}
          </span>
        ) : null}
      </label>
      <label className={styles.stack2}>
        <span className={styles.fullNameRow}>
          Mobile number<span className={styles.required}>Required</span>
        </span>
        <input
          className={`${styles.input} focus-border-violet`}
          type="tel"
          value={reg.phone ?? ''}
          onChange={hReg.phone}
          placeholder="07700 900123"
          style={{ border: `1.5px solid ${regB.phone}` }}
        />
        {regE.phone ? (
          <span className={styles.alertRow}>
            {ics.alert}
            {regE.phone}
          </span>
        ) : null}
      </label>
      <label className={styles.stack2}>
        <span className={styles.fullNameRow}>
          Email address<span className={styles.required}>Required</span>
        </span>
        <input
          className={`${styles.input} focus-border-violet`}
          type="email"
          value={reg.email ?? ''}
          onChange={hReg.email}
          placeholder="name@example.co.uk"
          style={{ border: `1.5px solid ${regB.email}` }}
        />
        {regE.email ? (
          <span className={styles.alertRow}>
            {ics.alert}
            {regE.email}
          </span>
        ) : null}
      </label>
      <label className={styles.stack2}>
        <span className={styles.fullNameRow}>
          Password<span className={styles.required}>Required</span>
        </span>
        <input
          className={`${styles.input} focus-border-violet`}
          type="password"
          value={reg.password ?? ''}
          onChange={hReg.password}
          placeholder="At least 8 characters"
          style={{ border: `1.5px solid ${regB.password}` }}
        />
        <div className={styles.row}>
          {pwRules.map((r, i) => (
            <span key={i} className={styles.checkRow2} style={{ color: r.c }}>
              {ics.check}
              {r.t}
            </span>
          ))}
        </div>
      </label>
      <div className={styles.stack2}>
        <span className={styles.fullNameRow}>
          Referral code (optional)<span className={styles.optional}>Optional</span>
        </span>
        <div className={styles.grid}>
          <span className={styles.row2} style={{ border: `1.5px solid ${rfo.bd}` }}>
            <input
              value={rfo.code ?? ''}
              onChange={rfo.h}
              placeholder="e.g. NEXDANIEL25"
              autoCapitalize="characters"
              autoComplete="off"
              className={styles.input2}
            />
            {rfo.ok ? <span className={styles.check}>{ic.check}</span> : null}
          </span>
          {rfo.showApply ? (
            <button className={`${styles.applyButton} hover-bg-ink-2`} onClick={rfo.apply}>
              Apply
            </button>
          ) : null}
          {rfo.ok ? (
            <button className={`${styles.removeButton} hover-border-ink`} onClick={rfo.remove}>
              Remove
            </button>
          ) : null}
        </div>
        {rfo.ok ? (
          <div className={styles.stack4}>
            <span className={styles.checkRow3}>{ics.check}Referral code applied</span>
            <span className={styles.youGetDay}>
              You get a 14-day free trial plus 1 additional month free. Invited by {rfo.by}.
            </span>
          </div>
        ) : null}
        {rfo.err ? (
          <>
            <span className={styles.alertRow2}>
              {ics.alert}
              {rfo.err}
            </span>
            <button onClick={rfo.remove} className={styles.continueWithoutReferralButton}>
              Continue without a referral code
            </button>
          </>
        ) : null}
        {rfo.hint ? <span className={styles.hint}>{rfo.hint}</span> : null}
      </div>
      <label className={styles.label}>
        <input type="checkbox" checked={!!reg.terms} onChange={hReg.terms} className={styles.input3} />
        <span>
          I agree to the NexDrive Terms of Service and Privacy Policy, including how learner data is stored
          under UK GDPR.
        </span>
      </label>
      {regE.terms ? (
        <span className={styles.alertRow3}>
          {ics.alert}
          {regE.terms}
        </span>
      ) : null}
    </div>
  );
}
