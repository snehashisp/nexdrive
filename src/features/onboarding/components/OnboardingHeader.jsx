export default function OnboardingHeader({ v }) {
  const { icl, obBack, step } = v;
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 5, background: '#FFFFFF', padding: '4px 8px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px' }}>
        <button
          className="hover-bg-mist"
          onClick={obBack}
          aria-label="Back"
          style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            color: '#0A0A0F',
          }}
        >
          {icl.left}
        </button>
        <span style={{ fontSize: '13px', fontWeight: 500, color: '#6B6B7B', paddingRight: '12px' }}>
          {step.label}
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '4px', padding: '0 12px 0' }}>
        {step.bars.map((sb, i) => (
          <span key={i} style={{ height: '3px', background: sb.c }} />
        ))}
      </div>
    </div>
  );
}
