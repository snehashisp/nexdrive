export default function PickBookingSheet({ v }) {
  const { closeSheet, ic, pb } = v;
  if (!pb) return null;
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
        <span style={{ fontSize: '19px', fontWeight: 600 }}>{pb.title}</span>
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
      {pb.list.map((c, i) => (
        <button
          key={i}
          className="hover-bg-mist"
          onClick={c.pick}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) auto',
            gap: '3px 12px',
            width: '100%',
            padding: '12px 20px',
            background: '#FFFFFF',
            border: 0,
            borderBottom: '1px solid #E7E7EC',
            borderLeft: `4px solid ${c.st.bar}`,
            textAlign: 'left',
            cursor: 'pointer',
            color: '#0A0A0F',
          }}
        >
          <span style={{ fontSize: '15px', fontWeight: 600 }}>
            {c.date} · {c.range}
          </span>
          <span style={{ fontSize: '15px', fontWeight: 700 }}>{c.fin}</span>
          <span style={{ fontSize: '13px', color: '#6B6B7B' }}>
            {c.dur} · {c.pc}
          </span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: c.st.fg, textAlign: 'right' }}>
            {c.st.label}
          </span>
        </button>
      ))}
    </>
  );
}
