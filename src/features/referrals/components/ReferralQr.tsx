import { useReferralQrView } from '../hooks/useReferralQrView';
import styles from './ReferralQr.module.css';
import QrCode from './QrCode';
export default function ReferralQr() {
  const v = useReferralQrView();
  const { back, ic, icl, ics, rq } = v;
  if (!rq) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <button className={`${styles.backButton} hover-bg-mist`} onClick={back} aria-label="Back">
          {icl.left}
        </button>
        <span className={styles.referInstructor}>Refer an instructor</span>
      </div>
      <div className={styles.stack2}>
        <div className={styles.stack3}>
          <div className={styles.row}>
            <QrCode text={rq.link} size={232} />
          </div>
          <div className={styles.grid}>
            <span className={styles.stack4}>
              <span className={styles.referralCode}>REFERRAL CODE</span>
              <span className={styles.code}>{rq.code}</span>
            </span>
            <span className={styles.row2}>
              <img src="/assets/logos/monogram-on-light.svg" alt="" className={styles.img} />
              <span className={styles.text}>
                <span className={styles.nex}>NEX</span>
                <span className={styles.drive}>Drive</span>
              </span>
            </span>
          </div>
        </div>
        <p className={styles.askAnotherDriving}>
          Ask another driving instructor to scan this QR code to start their NexDrive registration with your
          referral automatically applied.
        </p>
        <button onClick={rq.copyLink} className={styles.button}>
          <span className={styles.link}>{rq.link}</span>
          <span className={styles.copyRow}>{ics.copy}Copy</span>
        </button>
        <div className={styles.stack5}>
          <button
            className={`${styles.shareCodeButton} hover-bg-violet-700 active-bg-violet-800`}
            onClick={rq.shareQr}
          >
            Share QR code{ic.share}
          </button>
          <div className={styles.grid2}>
            <button className={`${styles.downloadButton} hover-bg-mist`} onClick={rq.save}>
              {ic.download}Save QR code
            </button>
            <button className={`${styles.downloadButton} hover-bg-mist`} onClick={rq.copyLink}>
              {ic.link}Copy link
            </button>
          </div>
        </div>
        <div className={styles.stack6}>
          <span className={styles.messageTheyReceive}>MESSAGE THEY'LL RECEIVE</span>
          <div className={styles.msg}>{rq.msg}</div>
          <div className={styles.grid3}>
            <button className={`${styles.messageButton} hover-bg-mist`} onClick={rq.whatsapp}>
              {ic.message}WhatsApp
            </button>
            <button className={`${styles.messageButton} hover-bg-mist`} onClick={rq.email}>
              {ic.mail}Email
            </button>
          </div>
        </div>
        {rq.demo ? (
          <button className={`${styles.eyeButton} hover-ink`} onClick={rq.preview}>
            {ics.eye}Demo: see what they see after scanning
          </button>
        ) : null}
      </div>
    </div>
  );
}
