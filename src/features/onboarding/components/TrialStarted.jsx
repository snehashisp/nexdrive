export default function TrialStarted({ v }) {
  const { icl, obSum } = v;
  return (
    <div style={{ padding: '48px 20px 32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
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
          Your free trial has started
        </h1>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.55, color: '#4A4A5A' }}>
          Welcome to NexDrive, {obSum.first}. Everything is unlocked until {obSum.until}.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '2px solid #0A0A0F' }}>
        {obSum.rows.map((r, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              padding: '14px 0',
              borderBottom: '1px solid #E7E7EC',
              fontSize: '15px',
            }}
          >
            <span style={{ color: '#4A4A5A' }}>{r.k}</span>
            <span style={{ fontWeight: 600, textAlign: 'right' }}>{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
