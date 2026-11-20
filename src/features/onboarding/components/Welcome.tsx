import { useOnboardingView } from '../hooks/useOnboardingView';
import styles from './Welcome.module.css';

export default function Welcome() {
  const v = useOnboardingView();
  const { ic, ics, obGo, obInvite, obLogin } = v;
  return (
    <div className={styles.stack}>
      <div className={styles.row}>
        <img src="/assets/logos/monogram-gradient.svg" alt="" className={styles.img} />
        <span className={styles.text}>
          <span className={styles.nex}>NEX</span>
          <span className={styles.drive}>Drive</span>
        </span>
      </div>
      <div className={styles.stack2}>
        <div className={styles.forDrivingInstructors}>FOR UK DRIVING INSTRUCTORS</div>
        <h1 className={styles.yourDrivingSchool}>Your driving school, run from one place.</h1>
        <p className={styles.startYourDay}>
          Start your 14-day free trial and manage your learners, lessons and bookings from one place.
        </p>
      </div>
      <div className={styles.stack3}>
        <div className={styles.bookSingleLessonsGrid}>
          <span className={styles.text2}>01</span>
          Book single lessons or packages in seconds
        </div>
        <div className={styles.bookSingleLessonsGrid}>
          <span className={styles.text2}>02</span>
          Prices, discounts and totals worked out for you
        </div>
        <div className={styles.bookSingleLessonsGrid}>
          <span className={styles.text2}>03</span>
          Lesson details and bank info sent to learners
        </div>
      </div>
      {obInvite ? (
        <div className={styles.stack4}>
          <div className={styles.youBeenInvited}>YOU'VE BEEN INVITED TO NEXDRIVE</div>
          <div className={styles.stack5}>
            <span className={styles.yourReferralBenefit}>Your referral benefit · from {obInvite.by}</span>
            <span className={styles.dayFreeTrial}>
              14-day free trial <span className={styles.text3}>+</span> 1 additional month free
            </span>
            <span className={styles.referralCodeRow}>
              Referral code <strong className={styles.code}>{obInvite.code}</strong>
              <span className={styles.checkRow}>{ics.check}Applied</span>
            </span>
          </div>
        </div>
      ) : null}
      <div className={styles.box} />
      <div className={styles.stack6}>
        <button
          className={`${styles.startDayFreeButton} hover-bg-violet-500 active-bg-violet-700`}
          onClick={obGo.register}
        >
          Start 14-day free trial{ic.arrow}
        </button>
        <button className={`${styles.alreadyHaveAccountButton} hover-border-white`} onClick={obLogin}>
          I already have an account
        </button>
      </div>
      <div className={styles.nexyraProductRow}>
        <img src="/assets/logos/monogram-mono-white.svg" alt="" className={styles.nexyraProductImg} />A Nexyra
        product
      </div>
    </div>
  );
}
