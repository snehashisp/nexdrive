export default function MessageSheet({ v }) {
  const { ic, ics, msg } = v;
  if (!msg) return null;
  return (
    <>
      <div
        style={{
          padding: '20px 20px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          borderBottom: '2px solid #0A0A0F',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: '#166534',
          }}
        >
          {ics.check}SAVED
        </span>
        <span style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.25 }}>
          {msg.title}
        </span>
        <span style={{ fontSize: '13px', color: '#6B6B7B' }}>To {msg.to}</span>
      </div>
      <div
        style={{ padding: '14px 20px 0', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '6px' }}
      >
        {msg.chans.map((o, i) => (
          <button
            key={i}
            onClick={o.pick}
            style={{
              height: '38px',
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
      <div
        style={{
          margin: '14px 20px 0',
          border: '1px solid #E7E7EC',
          background: '#F7F7F9',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            padding: '12px 14px',
            background: '#0A0A0F',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '15px', fontWeight: 600 }}>{msg.head}</span>
          <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', color: '#B4B4C4' }}>
            PREVIEW
          </span>
        </div>
        <div
          style={{
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            background: '#FFFFFF',
          }}
        >
          <span style={{ fontSize: '14px', lineHeight: 1.5 }}>{msg.intro}</span>
          {msg.showPrev ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1px',
                background: '#E7E7EC',
                border: '1px solid #E7E7EC',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  padding: '8px 10px',
                  background: '#FFFFFF',
                }}
              >
                <span style={{ fontSize: '11px', color: '#6B6B7B' }}>Previous</span>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'line-through',
                    color: '#6B6B7B',
                  }}
                >
                  {msg.prevT}
                </span>
              </span>
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  padding: '8px 10px',
                  background: '#F7F5FF',
                }}
              >
                <span style={{ fontSize: '11px', color: '#6D28D9' }}>New</span>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{msg.newT}</span>
              </span>
            </div>
          ) : null}
          {msg.multi ? (
            <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #E7E7EC' }}>
              {msg.sess.map((x, i) => (
                <span
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '24px 1fr auto',
                    gap: '8px',
                    padding: '6px 0',
                    borderBottom: '1px solid #E7E7EC',
                    fontSize: '13px',
                  }}
                >
                  <span style={{ color: '#6D28D9', fontWeight: 600 }}>{x.n}</span>
                  <span>{x.t}</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>{x.tm}</span>
                </span>
              ))}
            </div>
          ) : null}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {msg.rows.map((r, i) => (
              <span
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '84px 1fr',
                  gap: '8px',
                  padding: '4px 0',
                  fontSize: '13px',
                }}
              >
                <span style={{ color: '#6B6B7B' }}>{r.k}</span>
                <span style={{ fontWeight: 500 }}>{r.v}</span>
              </span>
            ))}
          </div>
          {msg.hasPrice ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderTop: '1px solid #E7E7EC',
                paddingTop: '6px',
              }}
            >
              {msg.priceRows.map((r, i) => (
                <span
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '3px 0',
                    fontSize: '13px',
                  }}
                >
                  <span style={{ color: '#4A4A5A' }}>{r.k}</span>
                  <span style={{ fontWeight: 600 }}>{r.v}</span>
                </span>
              ))}
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  paddingTop: '6px',
                  fontSize: '15px',
                  fontWeight: 700,
                }}
              >
                <span>Amount due</span>
                <span>{msg.total}</span>
              </span>
              {msg.amtNote ? <span style={{ fontSize: '12px', color: '#92400E' }}>{msg.amtNote}</span> : null}
            </div>
          ) : null}
          {msg.bank ? (
            <div style={{ border: '1.5px solid #0A0A0F', display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 10px',
                  borderBottom: '1px solid #E7E7EC',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                }}
              >
                {ics.bank}PAY BY BANK TRANSFER
              </span>
              {msg.bankRows.map((r, i) => (
                <span
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '5px 10px',
                    fontSize: '13px',
                  }}
                >
                  <span style={{ color: '#6B6B7B' }}>{r.k}</span>
                  <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{r.v}</span>
                </span>
              ))}
            </div>
          ) : null}
          <span style={{ fontSize: '13px', color: '#4A4A5A' }}>{msg.sign}</span>
        </div>
      </div>
      {msg.bankMissing ? (
        <div
          style={{
            margin: '10px 20px 0',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#FFFBEB',
            border: '1px solid #FDE68A',
            fontSize: '13px',
            color: '#78350F',
          }}
        >
          {ics.warn}
          <span style={{ flex: 1 }}>No bank details — payment info won't be included.</span>
          <button
            onClick={msg.addBank}
            style={{
              padding: 0,
              background: 'transparent',
              border: 0,
              color: '#0A0A0F',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Add
          </button>
        </div>
      ) : null}
      {msg.failed ? (
        <div
          style={{
            margin: '10px 20px 0',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            background: '#FEF2F2',
            border: '1.5px solid #B91C1C',
            color: '#7F1D1D',
          }}
        >
          <span
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 600 }}
          >
            {ic.wifiOff}Message not sent
          </span>
          <span style={{ fontSize: '13px', lineHeight: 1.5 }}>
            We couldn't reach the network. Your booking is saved — try again, or copy the message and send it
            yourself.
          </span>
          <button
            onClick={msg.copy}
            style={{
              alignSelf: 'flex-start',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 0',
              background: 'transparent',
              border: 0,
              color: '#7F1D1D',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {ics.copy}Copy message
          </button>
        </div>
      ) : null}
      <div
        style={{
          padding: '14px 20px 8px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)',
          gap: '8px',
        }}
      >
        <button
          className="hover-bg-mist"
          onClick={msg.skip}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '52px',
            padding: '0 16px',
            background: '#FFFFFF',
            color: '#0A0A0F',
            border: '1.5px solid #0A0A0F',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {msg.skipLabel}
        </button>
        <button
          className="hover-bg-violet-700 active-bg-violet-800"
          onClick={msg.send}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '52px',
            padding: '0 16px',
            background: '#7C3AED',
            color: '#FFFFFF',
            border: 0,
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {msg.sendLabel}
          {ic.send}
        </button>
      </div>
    </>
  );
}
