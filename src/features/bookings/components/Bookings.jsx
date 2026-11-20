export default function Bookings({ v }) {
  const { back, bk, icl, ics } = v;
  if (!bk) return null;
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
          <span style={{ fontSize: '17px', fontWeight: 600, flex: 1 }}>Bookings</span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            margin: '0 20px 12px',
            border: '1.5px solid #0A0A0F',
          }}
        >
          {bk.segs.map((o, i) => (
            <button
              key={i}
              onClick={o.pick}
              style={{
                height: '40px',
                border: 0,
                background: o.bg,
                color: o.fg,
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {o.t}
            </button>
          ))}
        </div>
      </div>
      {bk.isUp ? (
        <>
          {bk.groups.map((g, i) => (
            <div
              key={i}
              style={{ padding: '18px 20px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
                {g.label}
              </span>
              {g.items.map((c, i1) => (
                <button
                  key={i1}
                  className="hover-bg-mist"
                  onClick={c.open}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '68px minmax(0,1fr) auto',
                    textAlign: 'left',
                    padding: 0,
                    background: '#FFFFFF',
                    color: '#0A0A0F',
                    border: '1px solid #E7E7EC',
                    borderLeft: `4px solid ${c.st.bar}`,
                    cursor: 'pointer',
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
                    <span style={{ fontSize: '17px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                      {c.start}
                    </span>
                    <span style={{ fontSize: '12px', color: '#6B6B7B' }}>{c.durS}</span>
                  </div>
                  <div
                    style={{
                      padding: '12px 10px 12px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {c.name}
                    </span>
                    <span style={{ fontSize: '13px', color: '#6B6B7B' }}>
                      {c.range} · {c.pc}
                    </span>
                    <span
                      style={{
                        alignSelf: 'flex-start',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '3px 7px',
                        background: c.st.bg,
                        color: c.st.fg,
                      }}
                    >
                      {c.st.label}
                    </span>
                  </div>
                  <div
                    style={{
                      padding: '12px 12px 12px 4px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '6px',
                    }}
                  >
                    <span style={{ fontSize: '15px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                      {c.fin}
                    </span>
                    <span style={{ color: '#9A9AAA' }}>{ics.right}</span>
                  </div>
                </button>
              ))}
            </div>
          ))}
          {bk.noUp ? (
            <div
              style={{
                margin: '24px 20px 0',
                border: '1px dashed #CFCFD8',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                alignItems: 'flex-start',
              }}
            >
              <span style={{ color: '#6B6B7B' }}>{icl.calendar}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '17px', fontWeight: 600 }}>Your calendar is clear.</span>
                <span style={{ fontSize: '14px', color: '#6B6B7B' }}>
                  Upcoming lessons will be listed here by day.
                </span>
              </div>
              <button
                onClick={bk.newBooking}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '44px',
                  padding: '0 16px',
                  background: '#7C3AED',
                  color: '#FFFFFF',
                  border: 0,
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {ics.plus}Schedule a lesson
              </button>
            </div>
          ) : null}
        </>
      ) : null}
      {bk.isHist ? (
        <>
          <div style={{ padding: '16px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="nx-scroll" style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
              {bk.statuses.map((o, i) => (
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
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '8px' }}>
              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#4A4A5A',
                }}
              >
                Learner
                <select
                  value={bk.learner ?? ''}
                  onChange={bk.hLearner}
                  style={{
                    height: '44px',
                    padding: '0 10px',
                    border: '1.5px solid #CFCFD8',
                    borderRadius: 0,
                    background: '#FFFFFF',
                    fontSize: '15px',
                    color: '#0A0A0F',
                  }}
                >
                  {bk.learnerOpts.map((o, i) => (
                    <option key={i} value={o.v}>
                      {o.t}
                    </option>
                  ))}
                </select>
              </label>
              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#4A4A5A',
                }}
              >
                Date
                <select
                  value={bk.range ?? ''}
                  onChange={bk.hRange}
                  style={{
                    height: '44px',
                    padding: '0 10px',
                    border: '1.5px solid #CFCFD8',
                    borderRadius: 0,
                    background: '#FFFFFF',
                    fontSize: '15px',
                    color: '#0A0A0F',
                  }}
                >
                  {bk.rangeOpts.map((o, i) => (
                    <option key={i} value={o.v}>
                      {o.t}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0 8px',
                borderBottom: '2px solid #0A0A0F',
              }}
            >
              <span style={{ fontSize: '13px', color: '#4A4A5A' }}>{bk.summary}</span>
              {bk.filtered ? (
                <button
                  onClick={bk.reset}
                  style={{
                    padding: 0,
                    background: 'transparent',
                    border: 0,
                    color: '#6D28D9',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>
          {bk.hasHist ? (
            <>
              {bk.hist.map((c, i) => (
                <button
                  key={i}
                  className="hover-bg-mist"
                  onClick={c.open}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0,1fr) auto',
                    gap: '4px 12px',
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 20px',
                    background: '#FFFFFF',
                    color: '#0A0A0F',
                    border: 0,
                    borderBottom: '1px solid #E7E7EC',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                    <span style={{ width: '8px', height: '8px', background: c.st.bar, flex: 'none' }} />
                    <span
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textDecoration: c.deco,
                      }}
                    >
                      {c.name}
                    </span>
                    {c.archived ? (
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 600,
                          padding: '2px 6px',
                          background: '#F7F7F9',
                          border: '1px solid #E7E7EC',
                          color: '#6B6B7B',
                          flex: 'none',
                        }}
                      >
                        Removed
                      </span>
                    ) : null}
                  </span>
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      fontVariantNumeric: 'tabular-nums',
                      textDecoration: c.deco,
                    }}
                  >
                    {c.fin}
                  </span>
                  <span style={{ fontSize: '13px', color: '#6B6B7B', paddingLeft: '16px' }}>
                    {c.date} · {c.range}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: c.st.fg, textAlign: 'right' }}>
                    {c.st.label}
                  </span>
                  {c.prev ? (
                    <span
                      style={{
                        gridColumn: '1 / -1',
                        fontSize: '12px',
                        color: '#92400E',
                        paddingLeft: '16px',
                      }}
                    >
                      Moved from {c.prev}
                    </span>
                  ) : null}
                  {c.reason ? (
                    <span
                      style={{
                        gridColumn: '1 / -1',
                        fontSize: '12px',
                        color: '#991B1B',
                        paddingLeft: '16px',
                      }}
                    >
                      {c.reason}
                    </span>
                  ) : null}
                </button>
              ))}
            </>
          ) : null}
          {bk.noHist ? (
            <div
              style={{
                margin: '20px',
                border: '1px dashed #CFCFD8',
                padding: '22px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: 600 }}>No booking history yet.</span>
              <span style={{ fontSize: '14px', color: '#6B6B7B' }}>
                Completed and previous lessons will appear here.
              </span>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
