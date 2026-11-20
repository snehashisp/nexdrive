import { useOnboardingView } from '../hooks/useOnboardingView';
import styles from './ChoosePlan.module.css';

export default function ChoosePlan() {
  const v = useOnboardingView();
  const { addCard, ic, ics, obCard, obCardB, obCardErr, obNoCard, obPlans, obSum } = v;
  return (
    <div className={styles.stack}>
      <div className={styles.stack2}>
        <h1 className={styles.startYourDay}>Start your 14-day free trial</h1>
        <p className={styles.fullAccessEvery}>
          Full access to every feature. Choose the plan that starts when your trial ends.
        </p>
      </div>
      {obSum.ref ? (
        <div className={styles.stack3}>
          <div className={styles.row}>
            <span>YOUR REFERRAL BENEFIT</span>
            <span className={styles.code}>{obSum.ref.code} ✓</span>
          </div>
          <div className={styles.stack4}>
            <span className={styles.dayFreeTrial}>
              14-day free trial <span className={styles.text}>+</span> 1 additional month free
            </span>
            <span className={styles.yourAdditionalFree}>
              Your additional free month will be applied after your 14-day trial. Your first payment is on{' '}
              {obSum.ref.first}.
            </span>
          </div>
        </div>
      ) : null}
      <div className={styles.stack5}>
        {obSum.tl.map((x, i) => (
          <div key={i} className={styles.grid}>
            <span className={styles.text2} style={{ color: x.c }}>
              {x.d}
            </span>
            <span className={styles.text3}>{x.t}</span>
          </div>
        ))}
      </div>
      <div className={styles.stack6}>
        <span className={styles.chooseYourPlan}>CHOOSE YOUR PLAN</span>
        {obPlans.map((pl, i) => (
          <button
            key={i}
            onClick={pl.pick}
            className={styles.button}
            style={{ background: pl.bg, border: pl.bd }}
          >
            <span className={styles.text4} style={{ border: pl.ring }} />
            <span className={styles.stack7}>
              <span className={styles.nameRow}>
                {pl.name}
                {pl.save ? <span className={styles.save}>{pl.save}</span> : null}
              </span>
              <span className={styles.term}>{pl.term}</span>
              {pl.ref ? (
                <span className={styles.monthFreeThrough}>+ 1 month free through referral</span>
              ) : null}
            </span>
            <span className={styles.text5}>
              <span className={styles.price}>{pl.price}</span>
              <span className={styles.per}>{pl.per}</span>
            </span>
          </button>
        ))}
      </div>
      <div className={styles.stack2}>
        <span className={styles.chooseYourPlan}>PAYMENT METHOD</span>
        {obCard ? (
          <div className={styles.row2}>
            <span className={styles.card}>{ic.card}</span>
            <span className={styles.visa}>Visa •••• 4242</span>
            <span className={styles.checkRow}>{ics.check}Saved</span>
          </div>
        ) : null}
        {obNoCard ? (
          <>
            <button
              onClick={addCard}
              className={styles.plusButton}
              style={{ border: `1.5px dashed ${obCardB}` }}
            >
              {ic.plus}Add a debit or credit card
            </button>
            {obCardErr ? (
              <span className={styles.alertRow}>
                {ics.alert}Add a card to start your trial. You won't be charged today.
              </span>
            ) : null}
          </>
        ) : null}
      </div>
      <div className={styles.stack8}>
        <span className={styles.howRenewalWorks}>How renewal works</span>
        <span>{obSum.renew}</span>
        <span>Cancel any time during your trial in Account → Subscription and you won't be charged.</span>
      </div>
    </div>
  );
}
