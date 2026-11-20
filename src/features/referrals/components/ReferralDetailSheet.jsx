export default function ReferralDetailSheet({ v }) {
  const { closeSheet, ic, rd } = v;
  if (!rd) return null;
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
        <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontSize: '20px', fontWeight: 600 }}>{rd.name}</span>
          <span style={{ fontSize: '13px', color: '#6B6B7B' }}>Joined {rd.date}</span>
        </span>
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
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '11px 0',
            borderBottom: '1px solid #E7E7EC',
            fontSize: '15px',
          }}
        >
          <span style={{ color: '#4A4A5A' }}>Plan</span>
          <span style={{ fontWeight: 600 }}>{rd.plan}</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '11px 0',
            borderBottom: '1px solid #E7E7EC',
            fontSize: '15px',
          }}
        >
          <span style={{ color: '#4A4A5A' }}>Qualifying subscription value</span>
          <span style={{ fontWeight: 600 }}>{rd.value}</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '11px 0',
            borderBottom: '1px solid #E7E7EC',
            fontSize: '15px',
          }}
        >
          <span style={{ color: '#4A4A5A' }}>Your reward</span>
          <span style={{ fontWeight: 600, textAlign: 'right' }}>{rd.calc}</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            padding: '11px 0',
            borderBottom: '1px solid #E7E7EC',
            fontSize: '15px',
          }}
        >
          <span style={{ color: '#4A4A5A' }}>Status</span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 7px',
              background: rd.st.bg,
              color: rd.st.fg,
            }}
          >
            {rd.st.label}
          </span>
        </div>
        {rd.awarded ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              padding: '11px 0',
              borderBottom: '1px solid #E7E7EC',
              fontSize: '15px',
            }}
          >
            <span style={{ color: '#4A4A5A' }}>Credit awarded</span>
            <span style={{ fontWeight: 600, color: '#166534' }}>
              {rd.reward} on {rd.awarded}
            </span>
          </div>
        ) : null}
      </div>
      <div style={{ padding: '18px 20px 0', display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: '#6B6B7B',
            paddingBottom: '6px',
          }}
        >
          PROGRESS
        </span>
        {rd.steps.map((x, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '28px minmax(0,1fr) auto',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 0',
              borderBottom: '1px solid #E7E7EC',
            }}
          >
            <span
              style={{
                width: '22px',
                height: '22px',
                background: x.c,
                color: x.nc,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 700,
              }}
            >
              {x.n}
            </span>
            <span style={{ fontSize: '14px', fontWeight: 500, color: x.fg }}>{x.t}</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: x.dc }}>{x.d}</span>
          </div>
        ))}
        {rd.failed ? (
          <div
            style={{
              marginTop: '10px',
              padding: '12px 14px',
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              fontSize: '14px',
              lineHeight: 1.5,
              color: '#7F1D1D',
            }}
          >
            {rd.reason}
          </div>
        ) : null}
        <span style={{ fontSize: '12px', lineHeight: 1.5, color: '#6B6B7B', paddingTop: '10px' }}>
          You can see their name, plan and your reward. Their contact and payment details stay private.
        </span>
      </div>
      {rd.demoQualify ? (
        <div style={{ padding: '14px 20px 4px' }}>
          <button
            className="hover-ink"
            onClick={rd.demoQualify}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              height: '46px',
              padding: '0 14px',
              background: 'transparent',
              color: '#4A4A5A',
              border: '1px dashed #CFCFD8',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Demo: confirm their first payment
          </button>
        </div>
      ) : null}
    </>
  );
}
