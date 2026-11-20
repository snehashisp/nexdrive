export default function Upgrade({ v }) {
  const { back, ic, icl, up } = v;
  if (!up) return null;
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
        <span style={{ fontSize: '17px', fontWeight: 600, flex: 1 }}>Upgrade subscription</span>
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ margin: '0 0 6px', fontSize: '15px', lineHeight: 1.55, color: '#4A4A5A' }}>
          Longer terms lower your monthly price. Your learners, lessons and settings carry over.
        </p>
        {up.opts.map((pl, i) => (
          <button
            key={i}
            onClick={pl.pick}
            style={{
              display: 'grid',
              gridTemplateColumns: '22px minmax(0,1fr) auto',
              alignItems: 'center',
              gap: '14px',
              width: '100%',
              padding: '16px',
              textAlign: 'left',
              background: pl.bg,
              border: pl.bd,
              opacity: pl.op,
              cursor: 'pointer',
              color: '#0A0A0F',
            }}
          >
            <span
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                boxSizing: 'border-box',
                border: pl.ring,
              }}
            />
            <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
              >
                {pl.name}
                {pl.cur ? (
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 7px',
                      background: '#0A0A0F',
                      color: '#FFFFFF',
                    }}
                  >
                    Current
                  </span>
                ) : null}
              </span>
              <span style={{ fontSize: '13px', color: '#6B6B7B' }}>{pl.term}</span>
              {pl.save ? (
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#166534' }}>{pl.save}</span>
              ) : null}
            </span>
            <span style={{ textAlign: 'right' }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '18px',
                  fontWeight: 700,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {pl.price}
              </span>
              <span style={{ fontSize: '12px', color: '#6B6B7B' }}>{pl.per}</span>
            </span>
          </button>
        ))}
        {up.hasCredit ? (
          <button
            onClick={up.cred.flip}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginTop: '8px',
              padding: '14px 16px',
              background: '#F7F5FF',
              border: '1.5px solid #7C3AED',
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
                color: '#6D28D9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {ic.gift}
            </span>
            <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '15px', fontWeight: 600 }}>Use NexDrive Credit</span>
              <span style={{ fontSize: '13px', color: '#4A4A5A' }}>{up.creditAvail} available</span>
            </span>
            <span
              style={{
                width: '48px',
                height: '28px',
                flex: 'none',
                background: up.cred.bg,
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '3px',
                  left: `${up.cred.x}px`,
                  width: '22px',
                  height: '22px',
                  background: '#FFFFFF',
                }}
              />
            </span>
          </button>
        ) : null}
        {up.showRows ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '2px solid #0A0A0F',
              marginTop: '8px',
            }}
          >
            {up.rows.map((r, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '11px 0',
                  borderBottom: '1px solid #E7E7EC',
                  fontSize: '15px',
                }}
              >
                <span style={{ color: '#4A4A5A', whiteSpace: 'nowrap' }}>{r.k}</span>
                <span style={{ fontWeight: 600, color: r.c, fontVariantNumeric: 'tabular-nums' }}>{r.v}</span>
              </div>
            ))}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '12px 0 0',
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: 600 }}>{up.payLabel}</span>
              <span
                style={{
                  fontSize: '26px',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {up.payable}
              </span>
            </div>
            {up.creditLeft ? (
              <span style={{ fontSize: '13px', color: '#4A4A5A', paddingTop: '4px' }}>{up.creditLeft}</span>
            ) : null}
          </div>
        ) : null}
        <div
          style={{
            marginTop: '8px',
            padding: '14px 16px',
            background: '#F7F7F9',
            border: '1px solid #E7E7EC',
            fontSize: '14px',
            lineHeight: 1.55,
            color: '#0A0A0F',
          }}
        >
          {up.summary}
        </div>
      </div>
    </div>
  );
}

export function UpgradeFooter({ v }) {
  const { ic, padB, up } = v;
  if (!up) return null;
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
      <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ fontSize: '20px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
          {up.price}
        </span>
        <span style={{ fontSize: '12px', color: '#6B6B7B' }}>{up.was}</span>
      </span>
      <button
        onClick={up.confirm}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          height: '52px',
          padding: '0 18px',
          background: up.ctaBg,
          color: '#FFFFFF',
          border: 0,
          fontSize: '16px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {up.cta}
        {ic.arrow}
      </button>
    </div>
  );
}
