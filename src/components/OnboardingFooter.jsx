export default function OnboardingFooter({ v }) {
  const { ic, obFooter, padB } = v;
  return (
    <div
      style={{
        flex: 'none',
        padding: `12px 20px ${padB}px`,
        background: '#FFFFFF',
        borderTop: '1px solid #E7E7EC',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {obFooter.note ? <span style={{ fontSize: '13px', color: '#4A4A5A' }}>{obFooter.note}</span> : null}
      <button
        className="hover-bg-violet-700 active-bg-violet-800"
        onClick={obFooter.go}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
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
        {obFooter.label}
        {ic.arrow}
      </button>
      {obFooter.alt ? (
        <button
          className="hover-bg-mist"
          onClick={obFooter.altGo}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
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
          {obFooter.alt}
        </button>
      ) : null}
    </div>
  );
}
