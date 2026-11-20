export default function PushNotification({ v }) {
  const { openPush, pushText, pushTitle, pushTop } = v;
  return (
    <button
      onClick={openPush}
      style={{
        position: 'absolute',
        zIndex: 60,
        top: `${pushTop}px`,
        left: '10px',
        right: '10px',
        display: 'grid',
        gridTemplateColumns: '36px minmax(0,1fr)',
        gap: '12px',
        padding: '12px 14px',
        textAlign: 'left',
        background: '#1A1A24',
        color: '#FFFFFF',
        border: 0,
        borderRadius: '18px',
        boxShadow: '0 12px 32px rgba(10,10,15,.35)',
        cursor: 'pointer',
        animation: 'nxDrop .35s cubic-bezier(.2,.8,.2,1)',
      }}
    >
      <img src="assets/logos/app-icon.svg" alt="" style={{ width: '36px', height: '36px' }} />
      <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
        <span
          style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#B4B4C4' }}
        >
          <span style={{ fontWeight: 600, letterSpacing: '0.04em' }}>NEXDRIVE</span>
          <span>now</span>
        </span>
        <span style={{ fontSize: '14px', fontWeight: 600 }}>{pushTitle}</span>
        <span style={{ fontSize: '13px', color: '#B4B4C4' }}>{pushText}</span>
      </span>
    </button>
  );
}
