import { useSubscriptionView } from '../hooks/useSubscriptionView';
import styles from './Subscription.module.css';

export default function Subscription() {
  const v = useSubscriptionView();
  const { back, go, ic, icl, ics, sb } = v;
  if (!sb) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <button className={`${styles.backButton} hover-bg-mist`} onClick={back} aria-label="Back">
          {icl.left}
        </button>
        <span className={styles.subscription}>Subscription</span>
      </div>
      {sb.banner ? (
        <div
          className={styles.warnRow}
          style={{ background: sb.banner.bg, color: sb.banner.fg, borderBottom: `1px solid ${sb.banner.bd}` }}
        >
          {ic.warn}
          <span>{sb.banner.t}</span>
        </div>
      ) : null}
      <div className={styles.stack2}>
        <span className={styles.row}>
          <span className={styles.tag} style={{ background: sb.tagBg, color: sb.tagFg }}>
            {sb.tag}
          </span>
          <span className={styles.currentPlan}>Current plan</span>
        </span>
        <div className={styles.row2}>
          <span className={styles.planname}>{sb.planName}</span>
          <span className={styles.price}>
            {sb.price}
            <span className={styles.text}>/mo</span>
          </span>
        </div>
        <span className={styles.save}>{sb.save}</span>
        {sb.isTrial ? (
          <div className={styles.stack3}>
            <span className={styles.row3}>
              <span className={styles.text2} style={{ width: `${sb.trialPct}%` }} />
            </span>
            <span className={styles.row4}>
              <span>{sb.trialLeft}</span>
              <span>Ends {sb.trialEnd}</span>
            </span>
          </div>
        ) : null}
      </div>
      <div className={styles.stack4}>
        {sb.rows.map((r, i) => (
          <div key={i} className={styles.row5}>
            <span className={styles.text3}>{r.k}</span>
            <span className={styles.text4}>{r.v}</span>
          </div>
        ))}
      </div>
      {sb.credit ? (
        <button className={`${styles.button} hover-bg-violet-100`} onClick={go.credit}>
          <span className={styles.giftRow}>{ic.gift}</span>
          <span className={styles.stack5}>
            <span className={styles.bal}>{sb.credit.bal} NexDrive Credit</span>
            <span className={styles.text5}>{sb.credit.t}</span>
          </span>
          <span className={styles.right}>{ics.right}</span>
        </button>
      ) : null}
      <div className={styles.stack6}>
        {sb.fixPay ? (
          <button className={`${styles.updatePaymentMethodButton} hover-bg-violet-700`} onClick={sb.fixPayGo}>
            Update payment method{ic.arrow}
          </button>
        ) : null}
        {sb.renew ? (
          <button className={`${styles.updatePaymentMethodButton} hover-bg-violet-700`} onClick={sb.renewGo}>
            Renew subscription{ic.arrow}
          </button>
        ) : null}
        {sb.canUpgrade ? (
          <button
            className={`${styles.updatePaymentMethodButton} hover-bg-violet-700 active-bg-violet-800`}
            onClick={sb.upgrade}
          >
            <span className={styles.upgradeRow}>{ic.upgrade}Upgrade subscription</span>
            {ic.arrow}
          </button>
        ) : null}
        {sb.maxed ? (
          <span className={styles.youTheLongest}>You're on the longest term and best monthly price.</span>
        ) : null}
        {sb.isCancelled ? (
          <button onClick={sb.resume} className={styles.updatePaymentMethodButton}>
            Resume subscription{ic.arrow}
          </button>
        ) : null}
        {sb.canCancel ? (
          <button className={`${styles.cancellabelButton} hover-bg-error`} onClick={sb.cancel}>
            {sb.cancelLabel}
          </button>
        ) : null}
        <span className={styles.plansRenewAutomatically}>
          Plans renew automatically at the end of each term unless cancelled. Cancelling during the 14-day
          trial costs nothing. Prices include VAT.
        </span>
      </div>
    </div>
  );
}
