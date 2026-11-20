export default function DemoPanel({ v }) {
  const { clockLabel, flows, ics, replaySplash } = v;
  return (
    <aside
      style={{
        width: '420px',
        flex: 'none',
        boxSizing: 'border-box',
        background: '#FFFFFF',
        borderRight: '2px solid #0A0A0F',
        padding: '36px 32px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        height: '100vh',
        overflowY: 'auto',
        position: 'sticky',
        top: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="assets/logos/monogram-on-light.svg" alt="" style={{ height: '30px', width: 'auto' }} />
        <span style={{ fontSize: '21px', fontWeight: 500, lineHeight: 1 }}>
          <span style={{ letterSpacing: '0.105em' }}>NEX</span>
          <span style={{ color: '#7C3AED', letterSpacing: '0.005em', marginLeft: '-0.06em' }}>Drive</span>
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#6D28D9' }}>
          INTERACTIVE PROTOTYPE · V1.0
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            textWrap: 'pretty',
          }}
        >
          Business management for UK driving instructors.
        </h1>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: '#4A4A5A', textWrap: 'pretty' }}>
          Every screen is live. Pick a workflow to jump to its starting point, or use the app freely. Live
          clock: {clockLabel}.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            color: '#6B6B7B',
            paddingBottom: '10px',
            borderBottom: '2px solid #0A0A0F',
          }}
        >
          WORKFLOWS
        </div>
        {flows.map((f, i) => (
          <button
            key={i}
            className="hover-bg-mist"
            onClick={f.go}
            style={{
              display: 'grid',
              gridTemplateColumns: '30px minmax(0,1fr) 16px',
              alignItems: 'start',
              gap: '3px 10px',
              textAlign: 'left',
              padding: '13px 0',
              border: 0,
              borderBottom: '1px solid #E7E7EC',
              background: f.bg,
              cursor: 'pointer',
              color: '#0A0A0F',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#7C3AED',
                fontVariantNumeric: 'tabular-nums',
                paddingTop: '2px',
              }}
            >
              {f.num}
            </span>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>{f.title}</span>
            <span style={{ color: '#6B6B7B', paddingTop: '2px' }}>{ics.right}</span>
            <span />
            <span style={{ fontSize: '12.5px', color: '#6B6B7B', lineHeight: 1.45 }}>{f.steps}</span>
          </button>
        ))}
      </div>
      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          fontSize: '13px',
          color: '#6B6B7B',
        }}
      >
        <a
          className="hover-bg-mist"
          href="design-system.html"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px',
            border: '2px solid #0A0A0F',
            color: '#0A0A0F',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          {'Design system & logo'}
          <span>{ics.arrow}</span>
        </a>
        <button
          className="hover-border-ink"
          onClick={replaySplash}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px',
            background: '#FFFFFF',
            border: '1.5px solid #CFCFD8',
            color: '#0A0A0F',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          Replay launch screen<span>{ics.refresh}</span>
        </button>
        <span>Tweaks: device size, subscription state, offline mode, empty data, launch animation.</span>
      </div>
    </aside>
  );
}
