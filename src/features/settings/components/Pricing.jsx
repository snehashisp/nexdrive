export default function Pricing({ v }) {
  const { back, icl, pr } = v;
  if (!pr) return null;
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
        <span style={{ fontSize: '17px', fontWeight: 600, flex: 1 }}>Pricing</span>
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.55, color: '#4A4A5A' }}>
          Changes apply to new bookings. Existing lessons keep the price they were booked at.
        </p>
        {pr.rates.map((r, i) => (
          <label
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) 150px',
              alignItems: 'center',
              gap: '12px',
              paddingBottom: '16px',
              borderBottom: '1px solid #E7E7EC',
            }}
          >
            <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '16px', fontWeight: 600 }}>{r.label}</span>
              <span style={{ fontSize: '13px', color: '#6B6B7B' }}>{r.note}</span>
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '52px',
                border: `1.5px solid ${r.bd}`,
                boxSizing: 'border-box',
              }}
            >
              <span style={{ padding: '0 2px 0 12px', color: '#6B6B7B' }}>£</span>
              <input
                inputMode="decimal"
                value={r.rate ?? ''}
                onChange={r.h}
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: '100%',
                  border: 0,
                  padding: '0 4px',
                  fontSize: '17px',
                  fontWeight: 700,
                  outline: 'none',
                  background: 'transparent',
                }}
              />
              <span style={{ paddingRight: '10px', fontSize: '13px', color: '#6B6B7B' }}>/hr</span>
            </span>
          </label>
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#4A4A5A' }}>Default lesson duration</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '6px' }}>
            {pr.durs.map((o, i) => (
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
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '2px solid #0A0A0F' }}>
          <span
            style={{
              padding: '10px 0 4px',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              color: '#6B6B7B',
            }}
          >
            STANDARD RATE PREVIEW
          </span>
          {pr.preview.map((r, i) => (
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
              <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PricingFooter({ v }) {
  const { ic, padB, pr } = v;
  if (!pr) return null;
  return (
    <div
      style={{
        flex: 'none',
        padding: `12px 20px ${padB}px`,
        background: '#FFFFFF',
        borderTop: '2px solid #0A0A0F',
      }}
    >
      <button
        className="hover-bg-violet-700"
        onClick={pr.save}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '52px',
          padding: '0 18px',
          background: '#7C3AED',
          color: '#FFFFFF',
          border: 0,
          fontSize: '16px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Save prices{ic.check}
      </button>
    </div>
  );
}
