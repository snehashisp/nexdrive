import { useReferralsView } from '../hooks/useReferralsView';
import styles from './Referrals.module.css';

export default function Referrals() {
  const v = useReferralsView();
  const { back, go, ic, icl, ics, rf } = v;
  if (!rf) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <button className={`${styles.backButton} hover-bg-mist`} onClick={back} aria-label="Back">
          {icl.left}
        </button>
        <span className={styles.text}>{'Referral & Rewards'}</span>
      </div>
      <div className={styles.stack2}>
        <h1 className={styles.helpAnotherInstructor}>Help another instructor join NexDrive</h1>
        <p className={styles.shareYourCode}>
          Share your code. When they subscribe, you earn 20% of their first subscription as NexDrive Credit.
        </p>
      </div>
      <div className={styles.box}>
        <div className={styles.stack3}>
          <div className={styles.row}>
            <span className={styles.yourReferralCode}>YOUR REFERRAL CODE</span>
            <span className={styles.checkRow}>{ics.check}Active</span>
          </div>
          <div className={styles.grid}>
            <span className={styles.code}>{rf.code}</span>
            <button className={`${styles.copyButton} hover-bg-mist`} onClick={rf.copyCode}>
              {ics.copy}Copy
            </button>
          </div>
          <div className={styles.grid2}>
            <button className={`${styles.messageButton} hover-bg-mist`} onClick={rf.whatsapp}>
              {ic.message}WhatsApp
            </button>
            <button className={`${styles.mailButton} hover-bg-mist`} onClick={rf.email}>
              {ic.mail}Email
            </button>
            <button className={`${styles.linkButton} hover-bg-mist`} onClick={rf.copyLink}>
              {ic.link}Copy link
            </button>
            <button className={`${styles.button} hover-bg-violet-700`} onClick={go.referralShare}>
              {ic.qr}QR code
            </button>
          </div>
        </div>
      </div>
      <div className={styles.grid3}>
        <div className={styles.stack4}>
          <span className={styles.yourReward}>Your reward</span>
          <span className={styles.nexdriveCredit}>20% NexDrive Credit</span>
          <span className={styles.theirFirstSubscription}>of their first subscription</span>
        </div>
        <div className={styles.stack4}>
          <span className={styles.yourReward}>New instructor gets</span>
          <span className={styles.nexdriveCredit}>1 month free</span>
          <span className={styles.theirFirstSubscription}>after their 14-day trial</span>
        </div>
      </div>
      <button className={`${styles.button2} hover-bg-ink-2`} onClick={go.credit}>
        <span className={styles.stack5}>
          <span className={styles.availableNexdriveCredit}>Available NexDrive Credit</span>
          <span className={styles.bal}>{rf.bal}</span>
        </span>
        <span className={styles.viewCreditRow}>View credit{ics.right}</span>
      </button>
      <div className={styles.grid4}>
        {rf.stats.map((x, i) => (
          <div key={i} className={styles.box2}>
            <div className={styles.yourReward}>{x.k}</div>
            <div className={styles.box3}>{x.v}</div>
          </div>
        ))}
      </div>
      <div className={styles.stack6}>
        <div className={styles.row2}>
          <span className={styles.yourReferralCode}>REFERRAL HISTORY</span>
          <span className={styles.histcount}>{rf.histCount}</span>
        </div>
        {rf.has ? (
          <>
            {rf.list.map((r, i) => (
              <button key={i} className={`${styles.button3} hover-bg-mist`} onClick={r.open}>
                <span className={styles.name}>{r.name}</span>
                <span className={styles.reward} style={{ color: r.amtC }}>
                  {r.reward}
                </span>
                <span className={styles.histcount}>
                  {r.plan} · {r.value} · Joined {r.date}
                </span>
                <span className={styles.label} style={{ background: r.st.bg, color: r.st.fg }}>
                  {r.st.label}
                </span>
              </button>
            ))}
          </>
        ) : null}
        {rf.empty ? (
          <div className={styles.stack7}>
            <span className={styles.referralsYet}>No referrals yet.</span>
            <span className={styles.shareYourCode2}>
              Share your code with another instructor. Referrals you make will appear here.
            </span>
          </div>
        ) : null}
      </div>
      <div className={styles.stack6}>
        <span className={styles.howWorks}>HOW IT WORKS</span>
        <div className={styles.shareYourCodeGrid}>
          <span className={styles.text2}>01</span>
          Share your code, link or QR code with another driving instructor.
        </div>
        <div className={styles.shareYourCodeGrid}>
          <span className={styles.text2}>02</span>
          They join with a 14-day free trial, then get 1 additional month free.
        </div>
        <div className={styles.shareYourCodeGrid}>
          <span className={styles.text2}>03</span>
          Once their first payment is confirmed and the 14-day refund period has passed, 20% of its value is
          added to your NexDrive Credit.
        </div>
        <span className={styles.creditDoesnExpire}>
          Credit doesn't expire and can be used towards your own subscription. Self-referrals, and
          subscriptions that are cancelled, fail or are refunded, don't earn credit.
        </span>
      </div>
    </div>
  );
}
