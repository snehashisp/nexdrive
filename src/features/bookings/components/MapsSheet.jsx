export default function MapsSheet({ v }) {
  const { closeSheet, ic, mp } = v;
  if (!mp) return null;
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
        <span style={{ fontSize: '20px', fontWeight: 600 }}>Navigate with Google Maps</span>
        <button
          onClick={closeSheet}
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
      <div style={{ padding: '16px 20px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
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
            {ic.pin}
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '16px', fontWeight: 600 }}>{mp.loc}</span>
            <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.04em' }}>{mp.pc}</span>
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>
              {mp.name} · {mp.dayLabel}, {mp.start}
            </span>
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '4px' }}>
          {mp.steps.map((x, i) => (
            <span key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ height: '3px', background: x.c }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#0A0A0F' }}>{x.t}</span>
              <span style={{ fontSize: '11px', color: '#6B6B7B', lineHeight: 1.3 }}>{x.d}</span>
            </span>
          ))}
        </div>
        {mp.opened ? (
          <div
            style={{
              display: 'flex',
              gap: '10px',
              padding: '12px 14px',
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              fontSize: '14px',
              lineHeight: 1.5,
              color: '#14532D',
            }}
          >
            {ic.check}
            <span>
              Destination sent to Google Maps. Tap <strong>Start</strong> there to begin turn-by-turn
              navigation.
            </span>
          </div>
        ) : null}
      </div>
      <div style={{ padding: '16px 20px 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <a
          className="hover-bg-violet-700 hover-text-white"
          href={mp.url}
          target="_blank"
          rel="noopener"
          onClick={mp.open}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '54px',
            padding: '0 18px',
            background: '#7C3AED',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {ic.nav}Open in Google Maps
          </span>
          {ic.ext}
        </a>
        <button
          onClick={mp.copy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
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
          {ic.copy}Copy address
        </button>
        <span style={{ fontSize: '13px', lineHeight: 1.5, color: '#6B6B7B' }}>
          Google Maps not installed? Your phone will offer to{' '}
          <a href={mp.storeUrl} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>
            get Google Maps
          </a>{' '}
          or open the route in your browser. NexDrive passes the destination only — navigation happens in
          Maps.
        </span>
      </div>
    </>
  );
}
