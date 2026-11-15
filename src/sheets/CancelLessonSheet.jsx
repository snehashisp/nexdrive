export default function CancelLessonSheet({ v }) {
  const { cl, ic, icl, ics } = v;
  if (!cl) return null;
  return (
    <>
      <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span
          style={{
            width: '44px',
            height: '44px',
            background: '#FEE2E2',
            color: '#B91C1C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icl.calendarX}
        </span>
        <span style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.015em' }}>
          Cancel this lesson?
        </span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            padding: '12px 14px',
            border: '1px solid #E7E7EC',
            borderLeft: `4px solid ${cl.st.bar}`,
          }}
        >
          <span style={{ fontSize: '16px', fontWeight: 600 }}>{cl.name}</span>
          <span style={{ fontSize: '14px', color: '#4A4A5A' }}>
            {cl.dateLong} · {cl.range}
          </span>
          <span style={{ fontSize: '13px', color: '#6B6B7B' }}>
            {cl.pc} · {cl.fin}
          </span>
        </div>
        {cl.late ? (
          <span style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#92400E', lineHeight: 1.5 }}>
            {ics.warn}This lesson is within 48 hours. Check your cancellation policy before confirming.
          </span>
        ) : null}
        <span style={{ fontSize: '13px', fontWeight: 500, color: '#4A4A5A' }}>Reason</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {cl.reasons.map((o, i) => (
            <button
              key={i}
              onClick={o.pick}
              style={{
                height: '36px',
                padding: '0 12px',
                background: o.bg,
                color: o.fg,
                border: `1.5px solid ${o.bd}`,
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {o.t}
            </button>
          ))}
        </div>
        <span style={{ fontSize: '13px', color: '#6B6B7B' }}>
          The lesson stays in your history as cancelled.
        </span>
      </div>
      <div style={{ padding: '18px 20px 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          className="hover-bg-red-800"
          onClick={cl.confirm}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
          Cancel lesson{ic.calendarX}
        </button>
        <button
          onClick={cl.keep}
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
          Keep lesson
        </button>
      </div>
    </>
  );
}
