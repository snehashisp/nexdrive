export default function UpgradeDone({ v }) {
  const { ic, icl, upd } = v;
  if (!upd) return null;
  return (
    <div style={{ padding: '48px 20px 32px', display: 'flex', flexDirection: 'column', gap: '26px' }}>
      <div
        style={{
          width: '56px',
          height: '56px',
          background: '#7C3AED',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icl.check}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h1
          style={{
            margin: 0,
            fontSize: '30px',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            lineHeight: 1.08,
          }}
        >
          You're on the {upd.name} plan
        </h1>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.55, color: '#4A4A5A' }}>
          Subscription confirmed. A receipt is on its way.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '2px solid #0A0A0F' }}>
        {upd.rows.map((r, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              padding: '13px 0',
              borderBottom: '1px solid #E7E7EC',
              fontSize: '15px',
            }}
          >
            <span style={{ color: '#4A4A5A' }}>{r.k}</span>
            <span style={{ fontWeight: 600, textAlign: 'right' }}>{r.v}</span>
          </div>
        ))}
      </div>
      <button
        className="hover-bg-violet-700"
        onClick={upd.done}
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
        Back to subscription{ic.arrow}
      </button>
    </div>
  );
}
