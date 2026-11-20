export default function ConflictSheet({ v }) {
  const { cf, ic, icl } = v;
  if (!cf) return null;
  return (
    <>
      <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span
          style={{
            width: '44px',
            height: '44px',
            background: '#FEF3C7',
            color: '#92400E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icl.warn}
        </span>
        <span style={{ fontSize: '21px', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.25 }}>
          {cf.title}
        </span>
        <span style={{ fontSize: '15px', lineHeight: 1.5, color: '#4A4A5A' }}>{cf.body}</span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '68px minmax(0,1fr) auto',
            border: '1px solid #E7E7EC',
            borderLeft: `4px solid ${cf.st.bar}`,
          }}
        >
          <div
            style={{
              padding: '12px 10px',
              borderRight: '1px solid #E7E7EC',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            <span style={{ fontSize: '17px', fontWeight: 700 }}>{cf.start}</span>
            <span style={{ fontSize: '12px', color: '#6B6B7B' }}>{cf.durS}</span>
          </div>
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>{cf.name}</span>
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>
              {cf.date} · {cf.range} · {cf.pc}
            </span>
          </div>
          <div style={{ padding: '12px 12px 12px 4px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '3px 7px',
                background: cf.st.bg,
                color: cf.st.fg,
              }}
            >
              {cf.st.label}
            </span>
          </div>
        </div>
      </div>
      <div style={{ padding: '18px 20px 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          className="hover-bg-violet-700"
          onClick={cf.another}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
          Choose another time{ic.clock}
        </button>
        <button
          onClick={cf.view}
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
          View existing booking
        </button>
        <button
          onClick={cf.cancel}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '46px',
            padding: '0 18px',
            background: 'transparent',
            color: '#4A4A5A',
            border: 0,
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
