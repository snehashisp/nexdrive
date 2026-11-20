export default function ConfirmBookingSheet({ v }) {
  const { cm, ic } = v;
  if (!cm) return null;
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 12px 12px 20px',
          borderBottom: '2px solid #0A0A0F',
        }}
      >
        <span style={{ fontSize: '20px', fontWeight: 600 }}>{cm.title}</span>
        <button
          onClick={cm.edit}
          aria-label="Close"
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            color: '#0A0A0F',
          }}
        >
          {ic.x}
        </button>
      </div>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column' }}>
        {cm.rows.map((r, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              padding: '11px 0',
              borderBottom: '1px solid #E7E7EC',
              fontSize: '15px',
            }}
          >
            <span style={{ color: '#4A4A5A', flex: 'none' }}>{r.k}</span>
            <span style={{ fontWeight: 600, textAlign: 'right' }}>{r.v}</span>
          </div>
        ))}
        {cm.multi ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 0',
              borderBottom: '1px solid #E7E7EC',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
              SESSIONS
            </span>
            {cm.sess.map((x, i) => (
              <span key={i} style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
                <span style={{ color: '#6D28D9', fontWeight: 600, width: '20px' }}>{x.n}</span>
                {x.t}
              </span>
            ))}
          </div>
        ) : null}
        {cm.price.map((r, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '11px 0',
              borderBottom: '1px solid #E7E7EC',
              fontSize: '15px',
            }}
          >
            <span style={{ color: '#4A4A5A' }}>{r.k}</span>
            <span style={{ fontWeight: 600 }}>{r.v}</span>
          </div>
        ))}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            padding: '12px 0',
          }}
        >
          <span style={{ fontSize: '16px', fontWeight: 600 }}>Final amount</span>
          <span style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.02em' }}>{cm.fin}</span>
        </div>
      </div>
      <div style={{ padding: '8px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          className="hover-bg-violet-700 active-bg-violet-800"
          onClick={cm.confirm}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '54px',
            padding: '0 18px',
            background: '#7C3AED',
            color: '#FFFFFF',
            border: 0,
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Confirm booking{ic.check}
        </button>
        <button
          onClick={cm.edit}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '48px',
            padding: '0 18px',
            background: '#FFFFFF',
            color: '#0A0A0F',
            border: '1.5px solid #0A0A0F',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Edit details
        </button>
      </div>
    </>
  );
}
