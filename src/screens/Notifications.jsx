export default function Notifications({ v }) {
  const { back, icl, nt } = v;
  if (!nt) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '28px' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 5,
          background: '#FFFFFF',
          borderBottom: '2px solid #0A0A0F',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            height: '56px',
            padding: '0 12px 0 4px',
          }}
        >
          <button
            className="hover-bg-mist"
            onClick={back}
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
          <span style={{ fontSize: '17px', fontWeight: 600, flex: 1 }}>Notifications</span>
          {nt.hasUnread ? (
            <button
              onClick={nt.markAll}
              style={{
                padding: 0,
                background: 'transparent',
                border: 0,
                color: '#6D28D9',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Mark all read
            </button>
          ) : null}
        </div>
        <div
          className="nx-scroll"
          style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '0 20px 12px' }}
        >
          {nt.cats.map((o, i) => (
            <button
              key={i}
              onClick={o.pick}
              style={{
                flex: 'none',
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
      </div>
      {nt.has ? (
        <>
          {nt.list.map((n, i) => (
            <button
              key={i}
              className="hover-bg-mist"
              onClick={n.open}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px minmax(0,1fr) 8px',
                gap: '12px',
                width: '100%',
                padding: '14px 16px 14px 20px',
                background: n.bg,
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
                  background: n.tb,
                  color: n.tf,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {n.icon}
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '8px',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: '#6B6B7B',
                  }}
                >
                  <span>{n.cat}</span>
                  <span style={{ letterSpacing: 0, fontWeight: 500 }}>{n.time}</span>
                </span>
                <span style={{ fontSize: '15px', fontWeight: 600, lineHeight: 1.3 }}>{n.title}</span>
                <span style={{ fontSize: '13px', lineHeight: 1.45, color: '#4A4A5A' }}>{n.body}</span>
              </span>
              <span style={{ width: '8px', height: '8px', marginTop: '4px', background: n.dot }} />
            </button>
          ))}
        </>
      ) : null}
      {nt.empty ? (
        <div
          style={{
            margin: '24px 20px',
            border: '1px dashed #CFCFD8',
            padding: '24px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <span style={{ color: '#6B6B7B' }}>{icl.bell}</span>
          <span style={{ fontSize: '16px', fontWeight: 600 }}>You're all caught up.</span>
          <span style={{ fontSize: '14px', color: '#6B6B7B', lineHeight: 1.5 }}>
            Lesson reminders, booking changes and billing updates will appear here.
          </span>
        </div>
      ) : null}
    </div>
  );
}
