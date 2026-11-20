import styles from './MapsSheet.module.css';

export default function MapsSheet({ v }) {
  const { closeSheet, ic, mp } = v;
  if (!mp) return null;
  return (
    <>
      <div className={styles.row}>
        <span className={styles.navigateWithGoogle}>Navigate with Google Maps</span>
        <button onClick={closeSheet} aria-label="Close" className={styles.closeButton}>
          {ic.x}
        </button>
      </div>
      <div className={styles.stack}>
        <div className={styles.row2}>
          <span className={styles.pinRow}>{ic.pin}</span>
          <span className={styles.stack2}>
            <span className={styles.loc}>{mp.loc}</span>
            <span className={styles.text}>{mp.pc}</span>
            <span className={styles.name}>
              {mp.name} · {mp.dayLabel}, {mp.start}
            </span>
          </span>
        </div>
        <div className={styles.grid}>
          {mp.steps.map((x, i) => (
            <span key={i} className={styles.stack3}>
              <span className={styles.text2} style={{ background: x.c }} />
              <span className={styles.text3}>{x.t}</span>
              <span className={styles.text4}>{x.d}</span>
            </span>
          ))}
        </div>
        {mp.opened ? (
          <div className={styles.checkRow}>
            {ic.check}
            <span>
              Destination sent to Google Maps. Tap <strong>Start</strong> there to begin turn-by-turn
              navigation.
            </span>
          </div>
        ) : null}
      </div>
      <div className={styles.stack4}>
        <a
          className={`${styles.extA} hover-bg-violet-700 hover-text-white`}
          href={mp.url}
          target="_blank"
          rel="noopener"
          onClick={mp.open}
        >
          <span className={styles.navRow}>{ic.nav}Open in Google Maps</span>
          {ic.ext}
        </a>
        <button onClick={mp.copy} className={styles.copyButton}>
          {ic.copy}Copy address
        </button>
        <span className={styles.googleMapsNot}>
          Google Maps not installed? Your phone will offer to{' '}
          <a href={mp.storeUrl} target="_blank" rel="noopener" className={styles.getGoogleMapsA}>
            get Google Maps
          </a>{' '}
          or open the route in your browser. NexDrive passes the destination only — navigation happens in
          Maps.
        </span>
      </div>
    </>
  );
}
