export default function BookingForm({ v }) {
  const { back, bf, ic, icl, ics } = v;
  if (!bf) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '28px' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 5,
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          height: '56px',
          padding: '0 12px 0 4px',
          borderBottom: '2px solid #0A0A0F',
        }}
      >
        <button
          className="hover-bg-mist"
          onClick={back}
          aria-label="Close"
          style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            color: '#0A0A0F',
          }}
        >
          {icl.x}
        </button>
        <span style={{ fontSize: '17px', fontWeight: 600, flex: 1 }}>{bf.title}</span>
      </div>
      <div style={{ padding: '18px 20px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
          01 · LEARNER
        </span>
        {bf.learner ? (
          <button
            onClick={bf.pickLearner}
            disabled={bf.edit}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 14px',
              background: '#FFFFFF',
              border: '1.5px solid #CFCFD8',
              textAlign: 'left',
              cursor: 'pointer',
              color: '#0A0A0F',
            }}
          >
            <span
              style={{
                width: '40px',
                height: '40px',
                flex: 'none',
                background: '#EDE9FE',
                color: '#5B21B6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              {bf.learner.initials}
            </span>
            <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
              <span style={{ fontSize: '16px', fontWeight: 600 }}>{bf.learner.name}</span>
              <span style={{ fontSize: '13px', color: '#6B6B7B' }}>{bf.learner.sub}</span>
            </span>
            {bf.isNew ? (
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#6D28D9' }}>Change</span>
            ) : null}
          </button>
        ) : null}
        {bf.noLearner ? (
          <>
            <button
              onClick={bf.pickLearner}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                height: '56px',
                padding: '0 14px',
                background: '#FFFFFF',
                border: `1.5px dashed ${bf.learnerBd}`,
                textAlign: 'left',
                cursor: 'pointer',
                color: '#0A0A0F',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              {ic.search}
              <span style={{ flex: 1 }}>Choose learner</span>
              {ics.right}
            </button>
            {bf.learnerErr ? (
              <span
                style={{
                  display: 'flex',
                  gap: '6px',
                  alignItems: 'center',
                  fontSize: '13px',
                  color: '#B91C1C',
                }}
              >
                {ics.alert}
                {bf.learnerErr}
              </span>
            ) : null}
          </>
        ) : null}
        {bf.blocked ? (
          <div
            style={{
              padding: '14px 16px',
              background: '#FFFBEB',
              border: '1.5px solid #D97706',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              color: '#78350F',
            }}
          >
            <span
              style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '16px', fontWeight: 600 }}
            >
              {ic.warn}Learner details incomplete
            </span>
            <span style={{ fontSize: '14px', lineHeight: 1.5 }}>
              Please complete the required learner information before scheduling a driving lesson. Missing:{' '}
              <strong>{bf.missText}</strong>.
            </span>
            <button
              className="hover-bg-ink-2"
              onClick={bf.complete}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '48px',
                padding: '0 16px',
                background: '#0A0A0F',
                color: '#FFFFFF',
                border: 0,
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Complete learner profile{ic.arrow}
            </button>
          </div>
        ) : null}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', opacity: bf.op, pointerEvents: bf.pe }}>
        {bf.showCount ? (
          <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
              02 · NUMBER OF LESSONS
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '6px' }}>
              {bf.counts.map((o, i) => (
                <button
                  key={i}
                  onClick={o.pick}
                  style={{
                    height: '44px',
                    background: o.bg,
                    color: o.fg,
                    border: `1.5px solid ${o.bd}`,
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {o.t}
                </button>
              ))}
            </div>
            {bf.countCustom ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '52px',
                  border: '1.5px solid #CFCFD8',
                }}
              >
                <button
                  onClick={bf.countDec}
                  aria-label="Fewer"
                  style={{
                    width: '52px',
                    height: '100%',
                    background: 'transparent',
                    border: 0,
                    borderRight: '1px solid #E7E7EC',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0A0A0F',
                  }}
                >
                  {ic.minus}
                </button>
                <span style={{ fontSize: '16px', fontWeight: 600 }}>{bf.countLabel}</span>
                <button
                  onClick={bf.countInc}
                  aria-label="More"
                  style={{
                    width: '52px',
                    height: '100%',
                    background: 'transparent',
                    border: 0,
                    borderLeft: '1px solid #E7E7EC',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0A0A0F',
                  }}
                >
                  {ic.plus}
                </button>
              </div>
            ) : null}
            {bf.multi ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {bf.freqs.map((o, i) => (
                  <button
                    key={i}
                    onClick={o.pick}
                    style={{
                      height: '40px',
                      background: o.bg,
                      color: o.fg,
                      border: `1.5px solid ${o.bd}`,
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {o.t}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
        <div style={{ padding: '22px 0 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span
            style={{
              padding: '0 20px',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              color: '#6B6B7B',
            }}
          >
            <span style={{ whiteSpace: 'nowrap' }}>03 · DATE</span>
            <span
              style={{
                letterSpacing: 0,
                fontSize: '13px',
                fontWeight: 500,
                color: '#0A0A0F',
                textAlign: 'right',
              }}
            >
              {bf.dateLabel}
            </span>
          </span>
          <div
            className="nx-scroll"
            style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '0 20px 2px' }}
          >
            {bf.dates.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                style={{
                  flex: 'none',
                  width: '64px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '2px',
                  padding: '8px 9px',
                  background: o.bg,
                  color: o.fg,
                  border: `1.5px solid ${o.bd}`,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 600 }}>{o.dw}</span>
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                    lineHeight: 1.1,
                  }}
                >
                  {o.num}
                </span>
                <span style={{ fontSize: '10px', color: o.sub }}>{o.n}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              color: '#6B6B7B',
            }}
          >
            <span style={{ whiteSpace: 'nowrap' }}>04 · START TIME</span>
            <span
              style={{ display: 'flex', gap: '10px', letterSpacing: 0, fontSize: '11px', fontWeight: 500 }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', background: '#FDE68A' }} />
                Booked
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', background: '#E7E7EC' }} />
                Passed
              </span>
            </span>
          </span>
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(68px,1fr))', gap: '6px' }}
          >
            {bf.slots.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                style={{
                  height: '40px',
                  background: o.bg,
                  color: o.fg,
                  border: `1.5px solid ${o.bd}`,
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: o.deco,
                  cursor: o.cur,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {o.t}
              </button>
            ))}
          </div>
          {bf.startErr ? (
            <span
              style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
                fontSize: '13px',
                color: '#B91C1C',
              }}
            >
              {ics.alert}
              {bf.startErr}
            </span>
          ) : null}
        </div>
        <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
            05 · DURATION
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '6px' }}>
            {bf.durs.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                style={{
                  height: '44px',
                  background: o.bg,
                  color: o.fg,
                  border: `1.5px solid ${o.bd}`,
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {o.t}
              </button>
            ))}
          </div>
          {bf.custom ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '52px',
                border: '1.5px solid #CFCFD8',
              }}
            >
              <button
                onClick={bf.durDec}
                aria-label="Shorter"
                style={{
                  width: '52px',
                  height: '100%',
                  background: 'transparent',
                  border: 0,
                  borderRight: '1px solid #E7E7EC',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0A0A0F',
                }}
              >
                {ic.minus}
              </button>
              <span style={{ fontSize: '16px', fontWeight: 600 }}>{bf.durLabel}</span>
              <button
                onClick={bf.durInc}
                aria-label="Longer"
                style={{
                  width: '52px',
                  height: '100%',
                  background: 'transparent',
                  border: 0,
                  borderLeft: '1px solid #E7E7EC',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0A0A0F',
                }}
              >
                {ic.plus}
              </button>
            </div>
          ) : null}
        </div>
        {bf.multi ? (
          <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
              REVIEW SESSIONS
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', borderTop: '2px solid #0A0A0F' }}>
              {bf.sess.map((x, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '30px minmax(0,1fr) auto',
                    alignItems: 'center',
                    gap: '4px 10px',
                    padding: '10px 0 10px 8px',
                    borderBottom: '1px solid #E7E7EC',
                    background: x.bg,
                  }}
                >
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#6D28D9' }}>{x.n}</span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 600 }}>{x.date}</span>
                    <span style={{ fontSize: '13px', color: '#6B6B7B', fontVariantNumeric: 'tabular-nums' }}>
                      {x.time}
                    </span>
                    {x.conflict ? (
                      <span
                        style={{
                          display: 'flex',
                          gap: '4px',
                          alignItems: 'center',
                          fontSize: '12px',
                          color: '#92400E',
                          fontWeight: 500,
                        }}
                      >
                        {ics.warn}
                        {x.cText}
                      </span>
                    ) : null}
                  </span>
                  {x.conflict ? (
                    <button
                      onClick={x.shift}
                      style={{
                        height: '34px',
                        padding: '0 10px',
                        marginRight: '8px',
                        background: '#0A0A0F',
                        color: '#FFFFFF',
                        border: 0,
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Move +1 day
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
            {bf.clashText ? (
              <span
                style={{
                  display: 'flex',
                  gap: '6px',
                  alignItems: 'center',
                  fontSize: '13px',
                  color: '#92400E',
                }}
              >
                {ics.warn}
                {bf.clashText}
              </span>
            ) : null}
          </div>
        ) : null}
        <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
            06 · LOCATION
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '6px' }}>
            {bf.locs.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                style={{
                  height: '44px',
                  background: o.bg,
                  color: o.fg,
                  border: `1.5px solid ${o.bd}`,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {o.t}
              </button>
            ))}
          </div>
          {bf.notOther ? (
            <div
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                padding: '12px 14px',
                background: '#F7F7F9',
                border: '1px solid #E7E7EC',
              }}
            >
              <span style={{ color: '#6D28D9', paddingTop: '1px' }}>{ic.pin}</span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '15px', fontWeight: 500 }}>{bf.locText}</span>
                <span
                  style={{ fontSize: '13px', color: '#6B6B7B', fontWeight: 600, letterSpacing: '0.04em' }}
                >
                  {bf.locPc}
                </span>
              </span>
            </div>
          ) : null}
          {bf.other ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: '8px' }}>
              <input
                className="focus-border-violet"
                value={bf.locAddr ?? ''}
                onChange={bf.hLocAddr}
                placeholder="Pickup address"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  height: '48px',
                  padding: '0 12px',
                  border: '1.5px solid #CFCFD8',
                  fontSize: '16px',
                  outline: 'none',
                }}
              />
              <input
                className="focus-border-violet"
                value={bf.locPcIn ?? ''}
                onChange={bf.hLocPc}
                placeholder="Postcode"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  height: '48px',
                  padding: '0 12px',
                  border: '1.5px solid #CFCFD8',
                  fontSize: '16px',
                  textTransform: 'uppercase',
                  outline: 'none',
                }}
              />
            </div>
          ) : null}
          {bf.locErr ? (
            <span
              style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
                fontSize: '13px',
                color: '#B91C1C',
              }}
            >
              {ics.alert}
              {bf.locErr}
            </span>
          ) : null}
        </div>
        <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
            07 · LESSON PRICE
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '6px' }}>
            {bf.rates.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '2px',
                  padding: '9px 10px',
                  background: o.bg,
                  color: o.fg,
                  border: `1.5px solid ${o.bd}`,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{o.t}</span>
                <span style={{ fontSize: '12px', color: o.sc }}>{o.sub}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
            08 · DISCOUNT
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', gap: '6px' }}>
            {bf.discs.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                style={{
                  height: '42px',
                  background: o.bg,
                  color: o.fg,
                  border: `1.5px solid ${o.bd}`,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {o.t}
              </button>
            ))}
          </div>
          {bf.discCustom ? (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '52px',
                border: `1.5px solid ${bf.discBd}`,
                boxSizing: 'border-box',
              }}
            >
              <span style={{ padding: '0 4px 0 14px', fontSize: '16px', color: '#6B6B7B' }}>£</span>
              <input
                inputMode="decimal"
                value={bf.discIn ?? ''}
                onChange={bf.hDisc}
                placeholder="0"
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: '100%',
                  border: 0,
                  fontSize: '16px',
                  fontWeight: 600,
                  outline: 'none',
                  background: 'transparent',
                }}
              />
              <span style={{ paddingRight: '14px', fontSize: '13px', color: '#6B6B7B' }}>off the total</span>
            </span>
          ) : null}
          {bf.discErr ? (
            <span
              style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
                fontSize: '13px',
                color: '#B91C1C',
              }}
            >
              {ics.alert}
              {bf.discErr}
            </span>
          ) : null}
        </div>
        <div
          style={{
            margin: '22px 20px 0',
            borderTop: '2px solid #0A0A0F',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {bf.rows.map((r, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid #E7E7EC',
                fontSize: '15px',
              }}
            >
              <span style={{ color: '#4A4A5A' }}>{r.k}</span>
              <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{r.v}</span>
            </div>
          ))}
          {bf.hasDisc ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid #E7E7EC',
                fontSize: '15px',
              }}
            >
              <span style={{ color: '#4A4A5A' }}>Discount</span>
              <span style={{ fontWeight: 600, color: '#166534', fontVariantNumeric: 'tabular-nums' }}>
                {bf.disc}
              </span>
            </div>
          ) : null}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              padding: '12px 0 0',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 600 }}>Final amount</span>
            <span
              style={{
                fontSize: '26px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {bf.fin}
            </span>
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
    <div
      style={{
        flex: 'none',
        padding: `12px 20px ${padB}px`,
        background: '#FFFFFF',
        borderTop: '2px solid #0A0A0F',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) auto',
        alignItems: 'center',
        gap: '14px',
      }}
    >
      <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
        <span
          style={{
            fontSize: '24px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {bf.fin}
        </span>
        <span
          style={{
            fontSize: '12px',
            color: '#6B6B7B',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {bf.foot}
        </span>
      </span>
      <button
        onClick={bf.review}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          height: '52px',
          padding: '0 18px',
          background: bf.ctaBg,
          color: '#FFFFFF',
          border: 0,
          fontSize: '16px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {bf.cta}
        {ic.arrow}
      </button>
    </div>
  );
}
