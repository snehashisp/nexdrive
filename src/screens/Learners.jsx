export default function Learners({ v }) {
  const { go, ic, icl, ics, ls } = v;
  if (!ls) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '24px' }}>
      <div
        style={{
          padding: '14px 20px 12px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 600, letterSpacing: '-0.025em' }}>
            Learners
          </h1>
          <span style={{ fontSize: '13px', color: '#6B6B7B' }}>{ls.count}</span>
        </div>
        <button
          className="hover-bg-violet-700"
          onClick={go.addLearner}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            height: '44px',
            padding: '0 14px',
            background: '#7C3AED',
            color: '#FFFFFF',
            border: 0,
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {ics.userPlus}Add learner
        </button>
      </div>
      <div
        style={{
          padding: '0 20px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          borderBottom: '2px solid #0A0A0F',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            height: '48px',
            padding: '0 8px 0 12px',
            border: '1.5px solid #CFCFD8',
            color: '#6B6B7B',
          }}
        >
          {ic.search}
          <input
            value={ls.search ?? ''}
            onChange={ls.hSearch}
            placeholder="Search name, phone or postcode"
            style={{
              flex: 1,
              minWidth: 0,
              border: 0,
              outline: 'none',
              fontSize: '16px',
              color: '#0A0A0F',
              background: 'transparent',
            }}
          />
          {ls.hasQ ? (
            <button
              onClick={ls.clear}
              aria-label="Clear search"
              style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 0,
                cursor: 'pointer',
                color: '#4A4A5A',
              }}
            >
              {ics.x}
            </button>
          ) : null}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {ls.filters.map((f, i) => (
            <button
              key={i}
              onClick={f.pick}
              style={{
                flex: 'none',
                whiteSpace: 'nowrap',
                height: '36px',
                padding: '0 12px',
                background: f.bg,
                color: f.fg,
                border: `1.5px solid ${f.bd}`,
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {f.t}
            </button>
          ))}
        </div>
      </div>
      {ls.has ? (
        <>
          {ls.list.map((l, i) => (
            <button
              key={i}
              className="hover-bg-mist"
              onClick={l.open}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                width: '100%',
                padding: '12px 16px 12px 20px',
                minHeight: '70px',
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
                  width: '44px',
                  height: '44px',
                  flex: 'none',
                  background: '#EDE9FE',
                  color: '#5B21B6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px',
                  fontWeight: 600,
                }}
              >
                {l.initials}
              </span>
              <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontSize: '16px', fontWeight: 600 }}>{l.name}</span>
                <span
                  style={{
                    fontSize: '13px',
                    color: '#6B6B7B',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {l.sub} · {l.pc}
                </span>
              </span>
              {l.incomplete ? (
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '4px 7px',
                    background: '#FEF3C7',
                    color: '#92400E',
                    flex: 'none',
                  }}
                >
                  Incomplete
                </span>
              ) : null}
              <span style={{ color: '#9A9AAA' }}>{ics.right}</span>
            </button>
          ))}
        </>
      ) : null}
      {ls.noResults ? (
        <div style={{ padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '16px', fontWeight: 600 }}>No learners match “{ls.search}”</span>
          <span style={{ fontSize: '14px', color: '#6B6B7B' }}>
            Try a surname, mobile number or postcode.
          </span>
        </div>
      ) : null}
      {ls.empty ? (
        <div
          style={{
            margin: '24px 20px 0',
            border: '1px dashed #CFCFD8',
            padding: '28px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'flex-start',
          }}
        >
          <span
            style={{
              width: '48px',
              height: '48px',
              background: '#EDE9FE',
              color: '#6D28D9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icl.users}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '19px', fontWeight: 600 }}>You haven't added any learners yet.</span>
            <span style={{ fontSize: '14px', lineHeight: 1.5, color: '#6B6B7B' }}>
              Add a learner's contact and licence details once, then book lessons in a few taps.
            </span>
          </div>
          <button
            className="hover-bg-violet-700"
            onClick={go.addLearner}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              height: '50px',
              padding: '0 16px',
              minWidth: '240px',
              background: '#7C3AED',
              color: '#FFFFFF',
              border: 0,
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Add your first learner{ic.arrow}
          </button>
        </div>
      ) : null}
      {ls.hasArch ? (
        <>
          <div style={{ padding: '24px 20px 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
              REMOVED LEARNERS
            </span>
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>
              No longer active. Their lesson records stay in History.
            </span>
          </div>
          {ls.arch.map((a, i) => (
            <button
              key={i}
              className="hover-bg-mist"
              onClick={a.open}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                width: '100%',
                padding: '12px 16px 12px 20px',
                background: '#FFFFFF',
                border: 0,
                borderTop: '1px solid #E7E7EC',
                borderBottom: '1px solid #E7E7EC',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#4A4A5A',
              }}
            >
              <span
                style={{
                  width: '44px',
                  height: '44px',
                  flex: 'none',
                  background: '#F7F7F9',
                  border: '1px solid #E7E7EC',
                  color: '#6B6B7B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px',
                  fontWeight: 600,
                }}
              >
                {a.initials}
              </span>
              <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontSize: '15px', fontWeight: 600 }}>{a.name}</span>
                <span style={{ fontSize: '13px', color: '#6B6B7B' }}>{a.sub}</span>
              </span>
              {ics.history}
            </button>
          ))}
        </>
      ) : null}
    </div>
  );
}
