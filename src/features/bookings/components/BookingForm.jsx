import styles from './BookingForm.module.css';

export default function BookingForm({ v }) {
  const { back, bf, ic, icl, ics } = v;
  if (!bf) return null;
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <button className={`${styles.closeButton} hover-bg-mist`} onClick={back} aria-label="Close">
          {icl.x}
        </button>
        <span className={styles.title}>{bf.title}</span>
      </div>
      <div className={styles.stack2}>
        <span className={styles.learner}>01 · LEARNER</span>
        {bf.learner ? (
          <button onClick={bf.pickLearner} disabled={bf.edit} className={styles.button}>
            <span className={styles.initialsRow}>{bf.learner.initials}</span>
            <span className={styles.stack3}>
              <span className={styles.name}>{bf.learner.name}</span>
              <span className={styles.sub}>{bf.learner.sub}</span>
            </span>
            {bf.isNew ? <span className={styles.change}>Change</span> : null}
          </button>
        ) : null}
        {bf.noLearner ? (
          <>
            <button
              onClick={bf.pickLearner}
              className={styles.searchButton}
              style={{ border: `1.5px dashed ${bf.learnerBd}` }}
            >
              {ic.search}
              <span className={styles.chooseLearner}>Choose learner</span>
              {ics.right}
            </button>
            {bf.learnerErr ? (
              <span className={styles.alertRow}>
                {ics.alert}
                {bf.learnerErr}
              </span>
            ) : null}
          </>
        ) : null}
        {bf.blocked ? (
          <div className={styles.stack4}>
            <span className={styles.warnRow}>{ic.warn}Learner details incomplete</span>
            <span className={styles.pleaseCompleteThe}>
              Please complete the required learner information before scheduling a driving lesson. Missing:{' '}
              <strong>{bf.missText}</strong>.
            </span>
            <button className={`${styles.completeLearnerProfileButton} hover-bg-ink-2`} onClick={bf.complete}>
              Complete learner profile{ic.arrow}
            </button>
          </div>
        ) : null}
      </div>
      <div className={styles.stack5} style={{ opacity: bf.op, pointerEvents: bf.pe }}>
        {bf.showCount ? (
          <div className={styles.stack6}>
            <span className={styles.learner}>02 · NUMBER OF LESSONS</span>
            <div className={styles.grid}>
              {bf.counts.map((o, i) => (
                <button
                  key={i}
                  onClick={o.pick}
                  className={styles.button2}
                  style={{ background: o.bg, color: o.fg, border: `1.5px solid ${o.bd}` }}
                >
                  {o.t}
                </button>
              ))}
            </div>
            {bf.countCustom ? (
              <div className={styles.row}>
                <button onClick={bf.countDec} aria-label="Fewer" className={styles.fewerButton}>
                  {ic.minus}
                </button>
                <span className={styles.name}>{bf.countLabel}</span>
                <button onClick={bf.countInc} aria-label="More" className={styles.moreButton}>
                  {ic.plus}
                </button>
              </div>
            ) : null}
            {bf.multi ? (
              <div className={styles.grid2}>
                {bf.freqs.map((o, i) => (
                  <button
                    key={i}
                    onClick={o.pick}
                    className={styles.button3}
                    style={{ background: o.bg, color: o.fg, border: `1.5px solid ${o.bd}` }}
                  >
                    {o.t}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
        <div className={styles.stack7}>
          <span className={styles.row2}>
            <span className={styles.date}>03 · DATE</span>
            <span className={styles.datelabel}>{bf.dateLabel}</span>
          </span>
          <div className={`${styles.row3} nx-scroll`}>
            {bf.dates.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                className={styles.button4}
                style={{ background: o.bg, color: o.fg, border: `1.5px solid ${o.bd}` }}
              >
                <span className={styles.text}>{o.dw}</span>
                <span className={styles.num}>{o.num}</span>
                <span className={styles.text2} style={{ color: o.sub }}>
                  {o.n}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.stack6}>
          <span className={styles.row4}>
            <span className={styles.date}>04 · START TIME</span>
            <span className={styles.row5}>
              <span className={styles.bookedRow}>
                <span className={styles.booked} />
                Booked
              </span>
              <span className={styles.bookedRow}>
                <span className={styles.passed} />
                Passed
              </span>
            </span>
          </span>
          <div className={styles.grid3}>
            {bf.slots.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                className={styles.button5}
                style={{
                  background: o.bg,
                  color: o.fg,
                  border: `1.5px solid ${o.bd}`,
                  textDecoration: o.deco,
                  cursor: o.cur,
                }}
              >
                {o.t}
              </button>
            ))}
          </div>
          {bf.startErr ? (
            <span className={styles.alertRow}>
              {ics.alert}
              {bf.startErr}
            </span>
          ) : null}
        </div>
        <div className={styles.stack6}>
          <span className={styles.learner}>05 · DURATION</span>
          <div className={styles.grid}>
            {bf.durs.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                className={styles.button2}
                style={{ background: o.bg, color: o.fg, border: `1.5px solid ${o.bd}` }}
              >
                {o.t}
              </button>
            ))}
          </div>
          {bf.custom ? (
            <div className={styles.row}>
              <button onClick={bf.durDec} aria-label="Shorter" className={styles.fewerButton}>
                {ic.minus}
              </button>
              <span className={styles.name}>{bf.durLabel}</span>
              <button onClick={bf.durInc} aria-label="Longer" className={styles.moreButton}>
                {ic.plus}
              </button>
            </div>
          ) : null}
        </div>
        {bf.multi ? (
          <div className={styles.stack8}>
            <span className={styles.learner}>REVIEW SESSIONS</span>
            <div className={styles.stack9}>
              {bf.sess.map((x, i) => (
                <div key={i} className={styles.grid4} style={{ background: x.bg }}>
                  <span className={styles.text3}>{x.n}</span>
                  <span className={styles.stack10}>
                    <span className={styles.date2}>{x.date}</span>
                    <span className={styles.time}>{x.time}</span>
                    {x.conflict ? (
                      <span className={styles.warnRow2}>
                        {ics.warn}
                        {x.cText}
                      </span>
                    ) : null}
                  </span>
                  {x.conflict ? (
                    <button onClick={x.shift} className={styles.moveDayButton}>
                      Move +1 day
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
            {bf.clashText ? (
              <span className={styles.warnRow3}>
                {ics.warn}
                {bf.clashText}
              </span>
            ) : null}
          </div>
        ) : null}
        <div className={styles.stack6}>
          <span className={styles.learner}>06 · LOCATION</span>
          <div className={styles.grid5}>
            {bf.locs.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                className={styles.button6}
                style={{ background: o.bg, color: o.fg, border: `1.5px solid ${o.bd}` }}
              >
                {o.t}
              </button>
            ))}
          </div>
          {bf.notOther ? (
            <div className={styles.row6}>
              <span className={styles.pin}>{ic.pin}</span>
              <span className={styles.stack10}>
                <span className={styles.loctext}>{bf.locText}</span>
                <span className={styles.locpc}>{bf.locPc}</span>
              </span>
            </div>
          ) : null}
          {bf.other ? (
            <div className={styles.grid6}>
              <input
                className={`${styles.input} focus-border-violet`}
                value={bf.locAddr ?? ''}
                onChange={bf.hLocAddr}
                placeholder="Pickup address"
              />
              <input
                className={`${styles.input2} focus-border-violet`}
                value={bf.locPcIn ?? ''}
                onChange={bf.hLocPc}
                placeholder="Postcode"
              />
            </div>
          ) : null}
          {bf.locErr ? (
            <span className={styles.alertRow}>
              {ics.alert}
              {bf.locErr}
            </span>
          ) : null}
        </div>
        <div className={styles.stack6}>
          <span className={styles.learner}>07 · LESSON PRICE</span>
          <div className={styles.grid5}>
            {bf.rates.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                className={styles.button7}
                style={{ background: o.bg, color: o.fg, border: `1.5px solid ${o.bd}` }}
              >
                <span className={styles.text4}>{o.t}</span>
                <span className={styles.sub2} style={{ color: o.sc }}>
                  {o.sub}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.stack6}>
          <span className={styles.learner}>08 · DISCOUNT</span>
          <div className={styles.grid7}>
            {bf.discs.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                className={styles.button8}
                style={{ background: o.bg, color: o.fg, border: `1.5px solid ${o.bd}` }}
              >
                {o.t}
              </button>
            ))}
          </div>
          {bf.discCustom ? (
            <span className={styles.row7} style={{ border: `1.5px solid ${bf.discBd}` }}>
              <span className={styles.text5}>£</span>
              <input
                inputMode="decimal"
                value={bf.discIn ?? ''}
                onChange={bf.hDisc}
                placeholder="0"
                className={styles.input3}
              />
              <span className={styles.offTheTotal}>off the total</span>
            </span>
          ) : null}
          {bf.discErr ? (
            <span className={styles.alertRow}>
              {ics.alert}
              {bf.discErr}
            </span>
          ) : null}
        </div>
        <div className={styles.stack11}>
          {bf.rows.map((r, i) => (
            <div key={i} className={styles.row8}>
              <span className={styles.text6}>{r.k}</span>
              <span className={styles.text7}>{r.v}</span>
            </div>
          ))}
          {bf.hasDisc ? (
            <div className={styles.row8}>
              <span className={styles.text6}>Discount</span>
              <span className={styles.disc}>{bf.disc}</span>
            </div>
          ) : null}
          <div className={styles.row9}>
            <span className={styles.name}>Final amount</span>
            <span className={styles.fin}>{bf.fin}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BookingFormFooter({ v }) {
  const { bf, ic, padB } = v;
  if (!bf) return null;
  return (
    <div className={styles.grid8} style={{ padding: `12px 20px ${padB}px` }}>
      <span className={styles.stack12}>
        <span className={styles.fin2}>{bf.fin}</span>
        <span className={styles.foot}>{bf.foot}</span>
      </span>
      <button onClick={bf.review} className={styles.ctaButton} style={{ background: bf.ctaBg }}>
        {bf.cta}
        {ic.arrow}
      </button>
    </div>
  );
}
