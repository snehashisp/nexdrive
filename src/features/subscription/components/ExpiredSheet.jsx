export default function ExpiredSheet({ v }) {
  const { ex, ic, icl } = v;
  if (!ex) return null;
  return (
    <>
      <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span
          style={{
            width: '44px',
            height: '44px',
            background: '#0A0A0F',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icl.lock}
        </span>
        <span style={{ fontSize: '22px', fontWeight: 600 }}>Your subscription has expired</span>
        <span style={{ fontSize: '15px', lineHeight: 1.55, color: '#4A4A5A' }}>
          Renew to create new bookings. Your learners and lesson history are safe and still viewable.
        </span>
      </div>
      <div style={{ padding: '18px 20px 8px' }}>
        <button
          onClick={ex.renew}
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
          Renew subscription{ic.arrow}
        </button>
      </div>
    </>
  );
}
