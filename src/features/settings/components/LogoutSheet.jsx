export default function LogoutSheet({ v }) {
  const { ic, lo } = v;
  if (!lo) return null;
  return (
    <>
      <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '22px', fontWeight: 600 }}>Log out of NexDrive?</span>
        <span style={{ fontSize: '15px', lineHeight: 1.5, color: '#4A4A5A' }}>
          Your learners, lessons and settings stay safe in your account.
        </span>
      </div>
      <div style={{ padding: '18px 20px 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          onClick={lo.confirm}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '52px',
            padding: '0 18px',
            background: '#0A0A0F',
            color: '#FFFFFF',
            border: 0,
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Log out{ic.logout}
        </button>
        <button
          onClick={lo.keep}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '50px',
            padding: '0 18px',
            background: '#FFFFFF',
            color: '#0A0A0F',
            border: '1.5px solid #0A0A0F',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Stay logged in
        </button>
      </div>
    </>
  );
}
