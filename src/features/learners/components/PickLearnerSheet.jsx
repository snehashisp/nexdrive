export default function PickLearnerSheet({ v }) {
  const { closeSheet, ic, pl } = v;
  if (!pl) return null;
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
        <span style={{ fontSize: '20px', fontWeight: 600 }}>Choose learner</span>
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
      {pl.list.map((l, i) => (
        <button
          key={i}
          className="hover-bg-mist"
          onClick={l.pick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            width: '100%',
            padding: '12px 20px',
            background: '#FFFFFF',
            border: 0,
            borderBottom: '1px solid #E7E7EC',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#0A0A0F',
          }}
        >
          <span
            style={{
              width: '40px',
              height: '40px',
              flex: 'none',
              background: '#EDE9FE',
              color: '#5B21B6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            {l.initials}
          </span>
          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '16px', fontWeight: 600 }}>{l.name}</span>
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>
              {l.pc} · {l.sub}
            </span>
          </span>
          {l.incomplete ? (
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '3px 7px',
                background: '#FEF3C7',
                color: '#92400E',
              }}
            >
              Incomplete
            </span>
          ) : null}
        </button>
      ))}
      {pl.empty ? (
        <div style={{ padding: '20px', fontSize: '15px', color: '#4A4A5A' }}>
          You haven't added any learners yet.
        </div>
      ) : null}
      <button
        onClick={pl.add}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
          minHeight: '56px',
          padding: '0 20px',
          background: '#FFFFFF',
          border: 0,
          textAlign: 'left',
          cursor: 'pointer',
          color: '#6D28D9',
          fontSize: '16px',
          fontWeight: 600,
        }}
      >
        {ic.userPlus}Add a new learner
      </button>
    </>
  );
}
