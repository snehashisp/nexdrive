export default function Calendar({ v }) {
  const { cal, ic, ics } = v;
  if (!cal) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 6, background: '#FFFFFF' }}>
        <div
          style={{
            padding: '14px 20px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 600, letterSpacing: '-0.025em' }}>
            Calendar
          </h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            {cal.notToday ? (
              <button
                className="hover-bg-mist"
                onClick={cal.today}
                style={{
                  height: '40px',
                  padding: '0 14px',
                  border: '1.5px solid #0A0A0F',
                  background: '#FFFFFF',
                  color: '#0A0A0F',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Today
              </button>
            ) : null}
            <button
              className="hover-bg-violet-700"
              onClick={cal.newBooking}
              aria-label="New booking"
              style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#7C3AED',
                color: '#FFFFFF',
                border: 0,
                cursor: 'pointer',
              }}
            >
              {ic.plus}
            </button>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            margin: '0 20px',
            border: '1.5px solid #0A0A0F',
          }}
        >
          {cal.views.map((o, i) => (
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 8px',
            borderBottom: '2px solid #0A0A0F',
          }}
        >
          <button
            className="hover-bg-mist"
            onClick={cal.prev}
            aria-label="Previous"
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
            {ic.left}
          </button>
          <span style={{ fontSize: '16px', fontWeight: 600 }}>{cal.title}</span>
          <button
            className="hover-bg-mist"
            onClick={cal.next}
            aria-label="Next"
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
            {ic.right}
          </button>
        </div>
        {cal.isDay ? (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7,minmax(0,1fr))',
                gap: '4px',
                padding: '10px 12px',
                borderBottom: '1px solid #E7E7EC',
              }}
            >
              {cal.strip.map((d, i) => (
                <button
                  key={i}
                  onClick={d.pick}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '3px',
                    padding: '6px 0 7px',
                    background: d.bg,
                    color: d.fg,
                    border: 0,
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 500, opacity: 0.8 }}>{d.dw}</span>
                  <span style={{ fontSize: '17px', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                    {d.num}
                  </span>
                  <span style={{ width: '5px', height: '5px', background: d.dot }} />
                </button>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                fontSize: '13px',
                color: '#4A4A5A',
                borderBottom: '1px solid #E7E7EC',
              }}
            >
              {ics.clock}
              {cal.summary}
            </div>
          </>
        ) : null}
      </div>
      {cal.isDay ? (
        <>
          {cal.dayEmpty ? (
            <div
              style={{
                margin: '16px 20px 0',
                border: '1px dashed #CFCFD8',
                padding: '18px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontSize: '16px', fontWeight: 600 }}>Your calendar is clear.</span>
                <span style={{ fontSize: '13px', color: '#6B6B7B' }}>No lessons booked for this day.</span>
              </div>
              <button
                className="hover-bg-violet-700"
                onClick={cal.newBooking}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  height: '42px',
                  padding: '0 14px',
                  background: '#7C3AED',
                  color: '#FFFFFF',
                  border: 0,
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  flex: 'none',
                }}
              >
                {ics.plus}Schedule a lesson
              </button>
            </div>
          ) : null}
          <div style={{ position: 'relative', height: `${cal.tlH}px`, margin: '18px 0 28px' }}>
            {cal.hours.map((h, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: `${h.top}px`,
                  borderTop: '1px solid #EFEFF3',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '-8px',
                    background: '#FFFFFF',
                    paddingRight: '6px',
                    fontSize: '11px',
                    color: '#6B6B7B',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {h.label}
                </span>
              </div>
            ))}
            {cal.showNow ? (
              <div
                style={{
                  position: 'absolute',
                  left: '54px',
                  right: 0,
                  top: `${cal.nowTop}px`,
                  height: '2px',
                  background: '#DC2626',
                  zIndex: 3,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: '-4px',
                    top: '-3px',
                    width: '8px',
                    height: '8px',
                    background: '#DC2626',
                  }}
                />
              </div>
            ) : null}
            {cal.blocks.map((b, i) => (
              <button
                key={i}
                onClick={b.open}
                style={{
                  position: 'absolute',
                  left: '60px',
                  right: '12px',
                  top: `${b.top}px`,
                  height: `${b.h}px`,
                  zIndex: 2,
                  boxSizing: 'border-box',
                  padding: '6px 10px',
                  textAlign: 'left',
                  background: b.st.tint,
                  border: 0,
                  borderLeft: `4px solid ${b.st.bar}`,
                  color: b.st.ink,
                  opacity: b.op,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      textDecoration: b.deco,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {b.name}
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      padding: '2px 6px',
                      background: b.st.bg,
                      color: b.st.fg,
                      flex: 'none',
                    }}
                  >
                    {b.st.label}
                  </span>
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {b.range} · {b.durS} · {b.pc} · {b.fin}
                </span>
              </button>
            ))}
          </div>
        </>
      ) : null}
      {cal.isWeek ? (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '30px repeat(7,minmax(0,1fr))',
              borderBottom: '1px solid #E7E7EC',
              paddingRight: '4px',
            }}
          >
            <span />
            {cal.week.map((d, i) => (
              <button
                key={i}
                onClick={d.pick}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '3px',
                  padding: '8px 0',
                  background: 'transparent',
                  border: 0,
                  cursor: 'pointer',
                  color: '#0A0A0F',
                }}
              >
                <span style={{ fontSize: '11px', color: '#6B6B7B', fontWeight: 500 }}>{d.dw}</span>
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 600,
                    background: d.hbg,
                    color: d.hfg,
                  }}
                >
                  {d.num}
                </span>
              </button>
            ))}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '30px repeat(7,minmax(0,1fr))',
              height: `${cal.wH}px`,
              margin: '8px 0 16px',
              paddingRight: '4px',
            }}
          >
            <div style={{ position: 'relative' }}>
              {cal.wHours.map((h, i) => (
                <span
                  key={i}
                  style={{
                    position: 'absolute',
                    top: `${h.top}px`,
                    left: '6px',
                    fontSize: '10px',
                    color: '#6B6B7B',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {h.label}
                </span>
              ))}
            </div>
            {cal.week.map((d, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  borderLeft: '1px solid #E7E7EC',
                  background:
                    'repeating-linear-gradient(to bottom, #EFEFF3 0, #EFEFF3 1px, transparent 1px, transparent 40px)',
                }}
              >
                {d.blocks.map((b, i1) => (
                  <button
                    key={i1}
                    onClick={b.open}
                    style={{
                      position: 'absolute',
                      left: '2px',
                      right: '2px',
                      top: `${b.top}px`,
                      height: `${b.h}px`,
                      padding: '3px',
                      boxSizing: 'border-box',
                      border: 0,
                      borderTop: `3px solid ${b.st.bar}`,
                      background: b.st.tint,
                      color: b.st.ink,
                      opacity: b.op,
                      textAlign: 'left',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1px',
                    }}
                  >
                    <span style={{ fontSize: '11px', fontWeight: 700, textDecoration: b.deco }}>
                      {b.initials}
                    </span>
                    <span style={{ fontSize: '10px', fontVariantNumeric: 'tabular-nums' }}>{b.start}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : null}
      {cal.isMonth ? (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7,minmax(0,1fr))',
              padding: '10px 12px 0',
              fontSize: '11px',
              fontWeight: 600,
              color: '#6B6B7B',
            }}
          >
            <span style={{ paddingLeft: '6px' }}>Mon</span>
            <span style={{ paddingLeft: '6px' }}>Tue</span>
            <span style={{ paddingLeft: '6px' }}>Wed</span>
            <span style={{ paddingLeft: '6px' }}>Thu</span>
            <span style={{ paddingLeft: '6px' }}>Fri</span>
            <span style={{ paddingLeft: '6px' }}>Sat</span>
            <span style={{ paddingLeft: '6px' }}>Sun</span>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7,minmax(0,1fr))',
              gap: '1px',
              background: '#E7E7EC',
              margin: '6px 12px 0',
              border: '1px solid #E7E7EC',
            }}
          >
            {cal.cells?.map((c, i) => (
              <button
                key={i}
                onClick={c.pick}
                style={{
                  height: '54px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '6px',
                  background: c.bg,
                  color: c.fg,
                  border: 0,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: c.fw, fontVariantNumeric: 'tabular-nums' }}>
                  {c.num}
                </span>
                <span style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
                  {c.dots.map((dt, i1) => (
                    <span key={i1} style={{ width: '6px', height: '6px', background: dt.c }} />
                  ))}
                </span>
              </button>
            ))}
          </div>
          <div style={{ padding: '20px 20px 8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
              {cal.listLabel}
            </span>
            {cal.list?.map((c, i) => (
              <button
                key={i}
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
                      textDecoration: c.deco,
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
            {cal.dayEmpty ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '14px 16px',
                  border: '1px dashed #CFCFD8',
                }}
              >
                <span style={{ fontSize: '14px', color: '#4A4A5A' }}>Your calendar is clear.</span>
                <button
                  onClick={cal.newBooking}
                  style={{
                    height: '38px',
                    padding: '0 12px',
                    background: 'transparent',
                    border: '1.5px solid #0A0A0F',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#0A0A0F',
                  }}
                >
                  Schedule a lesson
                </button>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
      {cal.isDay ? <span /> : null}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px 16px',
          padding: '12px 20px 24px',
          borderTop: '1px solid #E7E7EC',
          marginTop: 'auto',
        }}
      >
        {cal.legend.map((g, i) => (
          <span
            key={i}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#4A4A5A' }}
          >
            <span style={{ width: '10px', height: '10px', background: g.c }} />
            {g.t}
          </span>
        ))}
      </div>
    </div>
  );
}
