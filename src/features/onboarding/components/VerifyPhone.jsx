import styles from './VerifyPhone.module.css';

export default function VerifyPhone({ v }) {
  const { fillOtp, hOtp, ics, otp, otpB, otpErr, reg, resendLabel, resendOtp } = v;
  return (
    <div className={styles.stack}>
      <div className={styles.stack2}>
        <h1 className={styles.confirmYourMobile}>Confirm your mobile</h1>
        <p className={styles.enterTheDigit}>
          Enter the 6-digit code we sent to <strong className={styles.phone}>{reg.phone}</strong>.
        </p>
      </div>
      <label className={styles.stack2}>
        <span className={styles.verificationCode}>Verification code</span>
        <input
          className={`${styles.input} focus-border-violet`}
          inputMode="numeric"
          maxLength="6"
          value={otp ?? ''}
          onChange={hOtp}
          placeholder="000000"
          style={{ border: `1.5px solid ${otpB}` }}
        />
        {otpErr ? (
          <span className={styles.alertRow}>
            {ics.alert}
            {otpErr}
          </span>
        ) : null}
      </label>
      <div className={styles.row}>
        <span>
          Demo code: <strong className={styles.strong}>482913</strong>
        </span>
        <button onClick={fillOtp} className={styles.pasteCodeButton}>
          Paste code
        </button>
      </div>
      <button onClick={resendOtp} className={styles.refreshButton}>
        {ics.refresh}
        {resendLabel}
      </button>
    </div>
  );
}
