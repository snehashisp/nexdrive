export default function Credit({ v }) {
  const { back, cr, ic, icl, ics } = v;
  if (!cr) return null;
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
          aria-label="Back"
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
          {icl.left}
        </button>
        <span style={{ fontSize: '17px', fontWeight: 600, flex: 1 }}>NexDrive Credit</span>
      </div>
      <div
        style={{
          background: '#0A0A0F',
          color: '#FFFFFF',
          padding: '22px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', color: '#B4B4C4' }}>
          AVAILABLE CREDIT
        </span>
        <span
          style={{
            fontSize: '44px',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {cr.bal}
        </span>
        <span style={{ fontSize: '14px', lineHeight: 1.5, color: '#B4B4C4' }}>
          Use it towards your NexDrive subscription. Credit doesn't expire.
        </span>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
          gap: '1px',
          background: '#E7E7EC',
          borderBottom: '1px solid #E7E7EC',
        }}
      >
        <div style={{ background: '#FFFFFF', padding: '12px 16px 12px 20px' }}>
          <div style={{ fontSize: '12px', color: '#6B6B7B' }}>Total earned</div>
          <div
            style={{
              fontSize: '19px',
              fontWeight: 700,
              color: '#166534',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {cr.earned}
          </div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '12px 16px' }}>
          <div style={{ fontSize: '12px', color: '#6B6B7B' }}>Credit used</div>
          <div style={{ fontSize: '19px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
            {cr.used}
          </div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '12px 16px' }}>
          <div style={{ fontSize: '12px', color: '#6B6B7B' }}>Pending</div>
          <div
            style={{
              fontSize: '19px',
              fontWeight: 700,
              color: '#6B6B7B',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {cr.pending}
          </div>
        </div>
      </div>
      <div style={{ padding: '8px 20px 0', display: 'flex', flexDirection: 'column' }}>
        <button
          onClick={cr.auto.flip}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 0',
            background: 'transparent',
            border: 0,
            borderBottom: '1px solid #E7E7EC',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#0A0A0F',
          }}
        >
          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Apply credit to my next payment</span>
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>{cr.nextText}</span>
          </span>
          <span
            style={{
              width: '48px',
              height: '28px',
              flex: 'none',
              background: cr.auto.bg,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '3px',
                left: `${cr.auto.x}px`,
                width: '22px',
                height: '22px',
                background: '#FFFFFF',
              }}
            />
          </span>
        </button>
        {cr.canUpgrade ? (
          <button
            className="hover-bg-mist"
            onClick={cr.upgrade}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '50px',
              marginTop: '14px',
              padding: '0 16px',
              background: '#FFFFFF',
              color: '#0A0A0F',
              border: '1.5px solid #0A0A0F',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
              {ic.upgrade}Use credit on a longer plan
            </span>
            {ics.arrow}
          </button>
        ) : null}
      </div>
      <div style={{ padding: '24px 20px 0', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            paddingBottom: '10px',
            borderBottom: '2px solid #0A0A0F',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
            TRANSACTIONS
          </span>
          <span style={{ display: 'flex', gap: '6px' }}>
            {cr.filters.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                style={{
                  height: '32px',
                  padding: '0 10px',
                  background: o.bg,
                  color: o.fg,
                  border: `1.5px solid ${o.bd}`,
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {o.t}
              </button>
            ))}
          </span>
        </div>
        {cr.hasTx ? (
          <>
            {cr.tx.map((t, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0,1fr) auto',
                  gap: '4px 12px',
                  padding: '13px 0',
                  borderBottom: '1px solid #E7E7EC',
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 600, lineHeight: 1.35 }}>{t.desc}</span>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: t.ac,
                    fontVariantNumeric: 'tabular-nums',
                    textAlign: 'right',
                  }}
                >
                  {t.amt}
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                    fontSize: '13px',
                    color: '#6B6B7B',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t.date}
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      padding: '2px 6px',
                      background: t.tb,
                      color: t.tf,
                    }}
                  >
                    {t.type}
                  </span>
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#6B6B7B',
                    textAlign: 'right',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {t.bal}
                </span>
              </div>
            ))}
          </>
        ) : null}
        {cr.noTx ? (
          <div
            style={{
              marginTop: '14px',
              border: '1px dashed #CFCFD8',
              padding: '20px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 600 }}>No credit yet.</span>
            <span style={{ fontSize: '14px', lineHeight: 1.5, color: '#6B6B7B' }}>
              Credit from successful referrals will appear here.
            </span>
          </div>
        ) : null}
        <span style={{ fontSize: '12px', lineHeight: 1.55, color: '#6B6B7B', paddingTop: '12px' }}>
          Balances and rewards are calculated by NexDrive. Contact support if a transaction looks wrong.
        </span>
      </div>
    </div>
  );
}
