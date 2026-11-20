export default function CancelSubscriptionSheet({ v }) {
  const { cs } = v;
  if (!cs) return null;
  return (
    <>
      <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.015em' }}>{cs.title}</span>
        <span style={{ fontSize: '15px', lineHeight: 1.55, color: '#4A4A5A' }}>{cs.body}</span>
      </div>
      <div style={{ padding: '18px 20px 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          className="hover-bg-red-800"
          onClick={cs.confirm}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '52px',
            padding: '0 18px',
            background: '#B91C1C',
            color: '#FFFFFF',
            border: 0,
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {cs.title}
        </button>
        <button
          onClick={cs.keep}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '50px',
            padding: '0 18px',
            background: '#7C3AED',
            color: '#FFFFFF',
            border: 0,
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Keep my plan
        </button>
      </div>
    </>
  );
}
