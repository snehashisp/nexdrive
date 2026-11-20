import styles from './More.module.css';

export default function More({ v }) {
  const { go, ic, ics, mo } = v;
  if (!mo) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.box}>
        <h1 className={styles.more}>More</h1>
      </div>
      <button className={`${styles.button} hover-bg-mist`} onClick={go.profile}>
        <span className={styles.initialsRow}>{mo.initials}</span>
        <span className={styles.stack2}>
          <span className={styles.name}>{mo.name}</span>
          <span className={styles.adiRow}>
            <span className={styles.adi} style={{ background: mo.badge }} />
            {mo.adi}
          </span>
          <span className={styles.business}>{mo.business}</span>
        </span>
        <span className={styles.right}>{ics.right}</span>
      </button>
      <div className={styles.business2}>BUSINESS</div>
      <button className={`${styles.listButton} hover-bg-mist`} onClick={go.bookings}>
        {ic.list}
        <span className={styles.stack3}>
          <span className={styles.text}>{'Bookings & history'}</span>
          <span className={styles.business}>Upcoming, completed, cancelled</span>
        </span>
        <span className={styles.right}>{ics.right}</span>
      </button>
      <button className={`${styles.listButton} hover-bg-mist`} onClick={go.pricing}>
        {ic.pound}
        <span className={styles.stack3}>
          <span className={styles.text}>Pricing</span>
          <span className={styles.business}>{mo.priceSub}</span>
        </span>
        <span className={styles.right}>{ics.right}</span>
      </button>
      <button className={`${styles.bankButton} hover-bg-mist`} onClick={go.bank}>
        {ic.bank}
        <span className={styles.stack3}>
          <span className={styles.text}>Bank details</span>
          <span className={styles.banksub} style={{ color: mo.bankC }}>
            {mo.bankSub}
          </span>
        </span>
        <span className={styles.right}>{ics.right}</span>
      </button>
      <div className={styles.business2}>ACCOUNT</div>
      <button className={`${styles.listButton} hover-bg-mist`} onClick={go.referrals}>
        {ic.gift}
        <span className={styles.stack3}>
          <span className={styles.text}>{'Referral & Rewards'}</span>
          <span className={styles.business}>{mo.refSub}</span>
        </span>
        <span className={styles.right}>{ics.right}</span>
      </button>
      <button className={`${styles.listButton} hover-bg-mist`} onClick={go.subscription}>
        {ic.card}
        <span className={styles.stack3}>
          <span className={styles.text}>Subscription</span>
          <span className={styles.subsub} style={{ color: mo.subC }}>
            {mo.subSub}
          </span>
        </span>
        <span className={styles.right}>{ics.right}</span>
      </button>
      <button className={`${styles.listButton} hover-bg-mist`} onClick={go.notifications}>
        {ic.bell}
        <span className={styles.stack3}>
          <span className={styles.text}>Notification centre</span>
          <span className={styles.business}>{mo.unread}</span>
        </span>
        <span className={styles.right}>{ics.right}</span>
      </button>
      <button className={`${styles.listButton} hover-bg-mist`} onClick={go.prefs}>
        {ic.sliders}
        <span className={styles.stack3}>
          <span className={styles.text}>Notification preferences</span>
          <span className={styles.business}>Reminders and learner messages</span>
        </span>
        <span className={styles.right}>{ics.right}</span>
      </button>
      <button className={`${styles.bankButton} hover-bg-mist`} onClick={go.security}>
        {ic.shield}
        <span className={styles.stack3}>
          <span className={styles.text}>Security</span>
          <span className={styles.business}>Password, verification, log out</span>
        </span>
        <span className={styles.right}>{ics.right}</span>
      </button>
      <button className={`${styles.logoutButton} hover-bg-error`} onClick={mo.logout}>
        {ic.logout}Log out
      </button>
      <div className={styles.nexdriveNexyraProductRow}>
        <img src="assets/logos/monogram-mono-black.svg" alt="" className={styles.nexdriveNexyraProductImg} />
        NexDrive 1.0 · A Nexyra product
      </div>
    </div>
  );
}
