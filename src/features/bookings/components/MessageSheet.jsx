import styles from './MessageSheet.module.css';

export default function MessageSheet({ v }) {
  const { ic, ics, msg } = v;
  if (!msg) return null;
  return (
    <>
      <div className={styles.stack}>
        <span className={styles.checkRow}>{ics.check}SAVED</span>
        <span className={styles.title}>{msg.title}</span>
        <span className={styles.text}>To {msg.to}</span>
      </div>
      <div className={styles.grid}>
        {msg.chans.map((o, i) => (
          <button
            key={i}
            onClick={o.pick}
            className={styles.button}
            style={{ background: o.bg, color: o.fg, border: `1.5px solid ${o.bd}` }}
          >
            {o.t}
          </button>
        ))}
      </div>
      <div className={styles.stack2}>
        <div className={styles.row}>
          <span className={styles.head}>{msg.head}</span>
          <span className={styles.preview}>PREVIEW</span>
        </div>
        <div className={styles.stack3}>
          <span className={styles.intro}>{msg.intro}</span>
          {msg.showPrev ? (
            <div className={styles.grid2}>
              <span className={styles.stack4}>
                <span className={styles.previous}>Previous</span>
                <span className={styles.prevt}>{msg.prevT}</span>
              </span>
              <span className={styles.stack5}>
                <span className={styles.new}>New</span>
                <span className={styles.newt}>{msg.newT}</span>
              </span>
            </div>
          ) : null}
          {msg.multi ? (
            <div className={styles.stack6}>
              {msg.sess.map((x, i) => (
                <span key={i} className={styles.grid3}>
                  <span className={styles.text2}>{x.n}</span>
                  <span>{x.t}</span>
                  <span className={styles.text3}>{x.tm}</span>
                </span>
              ))}
            </div>
          ) : null}
          <div className={styles.stack7}>
            {msg.rows.map((r, i) => (
              <span key={i} className={styles.grid4}>
                <span className={styles.text4}>{r.k}</span>
                <span className={styles.text5}>{r.v}</span>
              </span>
            ))}
          </div>
          {msg.hasPrice ? (
            <div className={styles.stack8}>
              {msg.priceRows.map((r, i) => (
                <span key={i} className={styles.row2}>
                  <span className={styles.text6}>{r.k}</span>
                  <span className={styles.text7}>{r.v}</span>
                </span>
              ))}
              <span className={styles.row3}>
                <span>Amount due</span>
                <span>{msg.total}</span>
              </span>
              {msg.amtNote ? <span className={styles.amtnote}>{msg.amtNote}</span> : null}
            </div>
          ) : null}
          {msg.bank ? (
            <div className={styles.stack9}>
              <span className={styles.bankRow}>{ics.bank}PAY BY BANK TRANSFER</span>
              {msg.bankRows.map((r, i) => (
                <span key={i} className={styles.row4}>
                  <span className={styles.text4}>{r.k}</span>
                  <span className={styles.text8}>{r.v}</span>
                </span>
              ))}
            </div>
          ) : null}
          <span className={styles.sign}>{msg.sign}</span>
        </div>
      </div>
      {msg.bankMissing ? (
        <div className={styles.warnRow}>
          {ics.warn}
          <span className={styles.bankDetailsPayment}>No bank details — payment info won't be included.</span>
          <button onClick={msg.addBank} className={styles.addButton}>
            Add
          </button>
        </div>
      ) : null}
      {msg.failed ? (
        <div className={styles.stack10}>
          <span className={styles.wifioffRow}>{ic.wifiOff}Message not sent</span>
          <span className={styles.couldnReachThe}>
            We couldn't reach the network. Your booking is saved — try again, or copy the message and send it
            yourself.
          </span>
          <button onClick={msg.copy} className={styles.copyButton}>
            {ics.copy}Copy message
          </button>
        </div>
      ) : null}
      <div className={styles.grid5}>
        <button className={`${styles.skiplabelButton} hover-bg-mist`} onClick={msg.skip}>
          {msg.skipLabel}
        </button>
        <button
          className={`${styles.sendlabelButton} hover-bg-violet-700 active-bg-violet-800`}
          onClick={msg.send}
        >
          {msg.sendLabel}
          {ic.send}
        </button>
      </div>
    </>
  );
}
