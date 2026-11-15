export default function LearnerProfile({ v }) {
  const { back, ic, icl, ics, lp } = v;
  if (!lp) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '32px' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 5,
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          height: '56px',
          padding: '0 8px 0 4px',
          borderBottom: '1px solid #E7E7EC',
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
        <span style={{ fontSize: '17px', fontWeight: 600, flex: 1 }}>Learner</span>
        <button
          onClick={lp.edit}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            height: '40px',
            padding: '0 12px',
            background: 'transparent',
            border: 0,
            color: '#6D28D9',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {ics.edit}Edit
        </button>
      </div>
      <div
        style={{
          padding: '20px 20px 18px',
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          borderBottom: '2px solid #0A0A0F',
        }}
      >
        <span
          style={{
            width: '64px',
            height: '64px',
            flex: 'none',
            background: '#0A0A0F',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          {lp.initials}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
          <h1
            style={{
              margin: 0,
              fontSize: '26px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {lp.name}
          </h1>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {lp.complete ? (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '3px 7px',
                  background: '#DCFCE7',
                  color: '#166534',
                }}
              >
                Ready to book
              </span>
            ) : null}
            {lp.incomplete ? (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '3px 7px',
                  background: '#FEF3C7',
                  color: '#92400E',
                }}
              >
                Details incomplete
              </span>
            ) : null}
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>{lp.since}</span>
          </span>
        </div>
      </div>
      {lp.incomplete ? (
        <div
          style={{
            margin: '16px 20px 0',
            padding: '14px 16px',
            background: '#FFFBEB',
            border: '1px solid #FDE68A',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            color: '#78350F',
          }}
        >
          <span
            style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '15px', fontWeight: 600 }}
          >
            {ics.warn}Learner details incomplete
          </span>
          <span style={{ fontSize: '14px', lineHeight: 1.5 }}>
            Missing: {lp.missText}. Lessons can't be booked until these are added.
          </span>
          <button
            onClick={lp.edit}
            style={{
              alignSelf: 'flex-start',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '40px',
              padding: '0 14px',
              background: '#0A0A0F',
              color: '#FFFFFF',
              border: 0,
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Complete learner profile{ics.arrow}
          </button>
        </div>
      ) : null}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
          gap: '1px',
          background: '#E7E7EC',
          borderBottom: '1px solid #E7E7EC',
          marginTop: '16px',
          borderTop: '1px solid #E7E7EC',
        }}
      >
        {lp.stats.map((st, i) => (
          <div key={i} style={{ background: '#FFFFFF', padding: '12px 16px' }}>
            <div style={{ fontSize: '12px', color: '#6B6B7B' }}>{st.k}</div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: 700,
                marginTop: '2px',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {st.v}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
          gap: '1px',
          background: '#E7E7EC',
          borderBottom: '1px solid #E7E7EC',
          marginTop: '16px',
          borderTop: '1px solid #E7E7EC',
        }}
      >
        <button
          className="hover-bg-violet-700"
          onClick={lp.schedule}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px',
            padding: '14px 14px',
            background: '#7C3AED',
            color: '#FFFFFF',
            border: 0,
            textAlign: 'left',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {ic.calendarPlus}Schedule lesson
        </button>
        <button
          className="hover-bg-mist"
          onClick={lp.resched}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px',
            padding: '14px 14px',
            background: '#FFFFFF',
            color: '#0A0A0F',
            border: 0,
            textAlign: 'left',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {ic.repeat}Reschedule
        </button>
        <button
          className="hover-bg-mist"
          onClick={lp.cancel}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px',
            padding: '14px 14px',
            background: '#FFFFFF',
            color: '#0A0A0F',
            border: 0,
            textAlign: 'left',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {ic.calendarX}Cancel booking
        </button>
        <button
          className="hover-bg-mist"
          onClick={lp.history}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px',
            padding: '14px 14px',
            background: '#FFFFFF',
            color: '#0A0A0F',
            border: 0,
            textAlign: 'left',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {ic.history}View history
        </button>
        <button
          className="hover-bg-mist"
          onClick={lp.edit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px',
            padding: '14px 14px',
            background: '#FFFFFF',
            color: '#0A0A0F',
            border: 0,
            textAlign: 'left',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {ic.edit}Edit learner
        </button>
        <button
          className="hover-bg-error"
          onClick={lp.del}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px',
            padding: '14px 14px',
            background: '#FFFFFF',
            color: '#B91C1C',
            border: 0,
            textAlign: 'left',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {ic.trash}Delete learner
        </button>
      </div>
      <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '8px',
            borderBottom: '2px solid #0A0A0F',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
            DETAILS
          </span>
          <button
            onClick={lp.call}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '32px',
              padding: 0,
              background: 'transparent',
              border: 0,
              color: '#6D28D9',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {ics.phone}Call
          </button>
        </div>
        {lp.rows.map((r, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) auto',
              gap: '4px 12px',
              padding: '12px 0',
              borderBottom: '1px solid #E7E7EC',
            }}
          >
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>{r.k}</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: r.rc, textAlign: 'right' }}>
              {r.req}
            </span>
            <span style={{ fontSize: '15px', fontWeight: 500, color: r.c, gridColumn: '1 / -1' }}>{r.v}</span>
          </div>
        ))}
        {lp.hasNotes ? (
          <div
            style={{
              padding: '12px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              borderBottom: '1px solid #E7E7EC',
            }}
          >
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>Instructor notes</span>
            <span style={{ fontSize: '15px', lineHeight: 1.5 }}>{lp.notes}</span>
          </div>
        ) : null}
      </div>
      <div style={{ padding: '24px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1.5px solid #0A0A0F' }}>
          {lp.segs.map((o, i) => (
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
        {lp.showUp ? (
          <>
            {lp.up.map((c, i) => (
              <button
                key={i}
                className="hover-bg-mist"
                onClick={c.open}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0,1fr) auto',
                  gap: '4px 12px',
                  textAlign: 'left',
                  padding: '12px 14px',
                  background: '#FFFFFF',
                  color: '#0A0A0F',
                  border: '1px solid #E7E7EC',
                  borderLeft: `4px solid ${c.st.bar}`,
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 600 }}>
                  {c.date} · {c.range}
                </span>
                <span style={{ fontSize: '15px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                  {c.fin}
                </span>
                <span style={{ fontSize: '13px', color: '#6B6B7B' }}>
                  {c.dur} · {c.pc}
                </span>
                <span
                  style={{
                    justifySelf: 'end',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 7px',
                    background: c.st.bg,
                    color: c.st.fg,
                  }}
                >
                  {c.st.label}
                </span>
              </button>
            ))}
          </>
        ) : null}
        {lp.showPrev ? (
          <>
            {lp.pv.map((c, i) => (
              <button
                key={i}
                className="hover-bg-mist"
                onClick={c.open}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0,1fr) auto',
                  gap: '4px 12px',
                  textAlign: 'left',
                  padding: '12px 14px',
                  background: '#FFFFFF',
                  color: '#0A0A0F',
                  border: '1px solid #E7E7EC',
                  borderLeft: `4px solid ${c.st.bar}`,
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 600, textDecoration: c.deco }}>
                  {c.date} · {c.range}
                </span>
                <span style={{ fontSize: '15px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                  {c.fin}
                </span>
                <span style={{ fontSize: '13px', color: '#6B6B7B' }}>
                  {c.dur} · {c.pc}
                </span>
                <span
                  style={{
                    justifySelf: 'end',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 7px',
                    background: c.st.bg,
                    color: c.st.fg,
                  }}
                >
                  {c.st.label}
                </span>
              </button>
            ))}
          </>
        ) : null}
        {lp.noUp ? (
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
            <span style={{ fontSize: '14px', color: '#4A4A5A' }}>No upcoming lessons.</span>
            <button
              onClick={lp.schedule}
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
        {lp.noPv ? (
          <div
            style={{ padding: '14px 16px', border: '1px dashed #CFCFD8', fontSize: '14px', color: '#4A4A5A' }}
          >
            Completed and previous lessons will appear here.
          </div>
        ) : null}
      </div>
    </div>
  );
}
