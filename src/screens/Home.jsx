export default function Home({ v }) {
  const { dismissReminder, go, hm, ic, icl, ics } = v;
  if (!hm) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '24px' }}>
      <div
        style={{
          padding: '10px 12px 0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="assets/logos/monogram-on-light.svg" alt="" style={{ height: '24px', width: 'auto' }} />
          <span style={{ fontSize: '17px', fontWeight: 500, lineHeight: 1 }}>
            <span style={{ letterSpacing: '0.105em' }}>NEX</span>
            <span style={{ color: '#7C3AED', letterSpacing: '0.005em', marginLeft: '-0.06em' }}>Drive</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            className="hover-bg-mist"
            onClick={go.notifications}
            aria-label="Notifications"
            style={{
              position: 'relative',
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
            {ic.bell}
            {hm.unread ? (
              <span
                style={{
                  position: 'absolute',
                  top: '7px',
                  right: '6px',
                  minWidth: '16px',
                  height: '16px',
                  padding: '0 4px',
                  boxSizing: 'border-box',
                  background: '#7C3AED',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {hm.unread}
              </span>
            ) : null}
          </button>
          <button
            onClick={go.more}
            aria-label="Account"
            style={{
              width: '36px',
              height: '36px',
              background: '#0A0A0F',
              color: '#FFFFFF',
              border: 0,
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.04em',
            }}
          >
            {hm.initials}
          </button>
        </div>
      </div>
      <div style={{ padding: '18px 20px 16px', borderBottom: '2px solid #0A0A0F' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', color: '#6B6B7B' }}>
          {hm.dateLabel}
        </div>
        <h1
          style={{
            margin: '6px 0 0',
            fontSize: '30px',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            lineHeight: 1.08,
          }}
        >
          {hm.greeting}
        </h1>
      </div>
      {hm.banner ? (
        <button
          onClick={go.subscription}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            border: 0,
            borderBottom: `1px solid ${hm.banner.bd}`,
            background: hm.banner.bg,
            color: hm.banner.fg,
            textAlign: 'left',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          {ics.warn}
          <span style={{ flex: 1 }}>{hm.banner.t}</span>
          {ics.right}
        </button>
      ) : null}
      {hm.reminder ? (
        <div
          style={{
            margin: '16px 20px 0',
            background: '#7C3AED',
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '16px 16px 0',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    background: '#FFFFFF',
                    animation: 'nxPulse 1.6s infinite',
                  }}
                />
                REMINDER
              </span>
              <span style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.2 }}>
                Your next lesson starts in {hm.reminder.mins} minutes
              </span>
            </div>
            <button
              onClick={dismissReminder}
              aria-label="Dismiss"
              style={{
                width: '36px',
                height: '36px',
                margin: '-6px -8px 0 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 0,
                color: '#FFFFFF',
                cursor: 'pointer',
                flex: 'none',
              }}
            >
              {ic.x}
            </button>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
              gap: '10px 16px',
              padding: '14px 16px 16px',
              fontSize: '14px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '12px', color: '#EDE9FE' }}>Learner</span>
              <span style={{ fontWeight: 600 }}>{hm.reminder.name}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '12px', color: '#EDE9FE' }}>Time</span>
              <span style={{ fontWeight: 600 }}>{hm.reminder.start}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '12px', color: '#EDE9FE' }}>Duration</span>
              <span style={{ fontWeight: 600 }}>{hm.reminder.dur}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '12px', color: '#EDE9FE' }}>Location</span>
              <span style={{ fontWeight: 600 }}>{hm.reminder.pc}</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #8B5CF6' }}>
            <button
              className="hover-bg-violet-700"
              onClick={hm.reminder.open}
              style={{
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 16px',
                background: 'transparent',
                border: 0,
                borderRight: '1px solid #8B5CF6',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {ics.eye}View lesson
            </button>
            <button
              className="hover-bg-violet-100"
              onClick={hm.reminder.nav}
              style={{
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 16px',
                background: '#FFFFFF',
                border: 0,
                color: '#5B21B6',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {ics.nav}Navigate
            </button>
          </div>
        </div>
      ) : null}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
          gap: '1px',
          background: '#E7E7EC',
          borderBottom: '1px solid #E7E7EC',
          marginTop: '16px',
          borderTop: '1px solid #E7E7EC',
        }}
      >
        <div style={{ background: '#FFFFFF', padding: '14px 20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 500, color: '#6B6B7B' }}>Today's lessons</div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginTop: '4px',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {hm.todayN}
          </div>
          <div style={{ fontSize: '12px', color: '#6B6B7B' }}>{hm.todaySub}</div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '14px 20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 500, color: '#6B6B7B' }}>Upcoming · 7 days</div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginTop: '4px',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {hm.weekN}
          </div>
          <div style={{ fontSize: '12px', color: '#6B6B7B' }}>{hm.weekSub}</div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '14px 20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 500, color: '#6B6B7B' }}>Today's earnings</div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginTop: '4px',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {hm.earnDone}
          </div>
          <div style={{ fontSize: '12px', color: '#6B6B7B' }}>{hm.earnSub}</div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '14px 20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 500, color: '#6B6B7B' }}>Active learners</div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginTop: '4px',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {hm.activeN}
          </div>
          <div style={{ fontSize: '12px', color: hm.activeSubC }}>{hm.activeSub}</div>
        </div>
      </div>
      {hm.ongoing ? (
        <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
            ONGOING
          </div>
          <button
            className="hover-bg-ink-2"
            onClick={hm.ongoing.open}
            style={{
              display: 'grid',
              gridTemplateColumns: '72px minmax(0,1fr) auto',
              textAlign: 'left',
              padding: 0,
              background: '#0A0A0F',
              color: '#FFFFFF',
              border: 0,
              borderLeft: '4px solid #7C3AED',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                padding: '14px 12px',
                borderRight: '1px solid #1A1A24',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              <span style={{ fontSize: '19px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                {hm.ongoing.start}
              </span>
              <span style={{ fontSize: '12px', color: '#B4B4C4' }}>{hm.ongoing.durS}</span>
            </div>
            <div
              style={{
                padding: '14px 12px 14px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                minWidth: 0,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {hm.ongoing.name}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 7px',
                    background: '#7C3AED',
                    color: '#FFFFFF',
                    flex: 'none',
                  }}
                >
                  Ongoing
                </span>
              </span>
              <span style={{ fontSize: '13px', color: '#B4B4C4' }}>
                Today · ends {hm.ongoing.end} · {hm.ongoing.pc}
              </span>
              <span style={{ height: '4px', background: '#1A1A24', display: 'flex', marginTop: '2px' }}>
                <span style={{ width: `${hm.ongoing.pct}%`, background: '#A78BFA' }} />
              </span>
            </div>
            <div
              style={{
                padding: '14px 14px 14px 4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                {hm.ongoing.fin}
              </span>
              <span style={{ color: '#B4B4C4' }}>{ics.right}</span>
            </div>
          </button>
        </div>
      ) : null}
      <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
            UPCOMING
          </span>
          <button
            onClick={go.bookings}
            style={{
              padding: '4px 0',
              background: 'transparent',
              border: 0,
              color: '#6D28D9',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            All bookings
          </button>
        </div>
        {hm.hasNext ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
              gap: '10px',
            }}
          >
            {hm.next.map((c, i) => (
              <button
                key={i}
                className="hover-bg-mist"
                onClick={c.open}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '72px minmax(0,1fr) auto',
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
                    padding: '14px 12px',
                    borderRight: '1px solid #E7E7EC',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  <span style={{ fontSize: '19px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                    {c.start}
                  </span>
                  <span style={{ fontSize: '12px', color: '#6B6B7B' }}>{c.durS}</span>
                </div>
                <div
                  style={{
                    padding: '14px 12px 14px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {c.name}
                  </span>
                  <span style={{ fontSize: '13px', color: '#6B6B7B' }}>
                    {c.dayLabel} · {c.pc}
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
                    padding: '14px 14px 14px 4px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '6px',
                  }}
                >
                  <span style={{ fontSize: '16px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                    {c.fin}
                  </span>
                  <span style={{ color: '#9A9AAA' }}>{ics.right}</span>
                </div>
              </button>
            ))}
          </div>
        ) : null}
        {hm.noNext ? (
          <div
            style={{
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
              <span style={{ fontSize: '17px', fontWeight: 600 }}>No upcoming lessons today.</span>
              <span style={{ fontSize: '14px', color: '#6B6B7B', lineHeight: 1.5 }}>
                Book a lesson and it'll appear here with time, place and price.
              </span>
            </div>
            <button
              className="hover-bg-violet-700"
              onClick={go.newBooking}
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
      </div>
      {hm.ref ? (
        <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
            {'REFER & EARN'}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #E7E7EC',
              borderTop: '2px solid #0A0A0F',
            }}
          >
            <button
              className="hover-bg-mist"
              onClick={go.referrals}
              style={{
                display: 'grid',
                gridTemplateColumns: '44px minmax(0,1fr) auto',
                alignItems: 'center',
                gap: '14px',
                padding: '16px',
                background: '#FFFFFF',
                border: 0,
                textAlign: 'left',
                cursor: 'pointer',
                color: '#0A0A0F',
              }}
            >
              <span
                style={{
                  width: '44px',
                  height: '44px',
                  background: '#EDE9FE',
                  color: '#6D28D9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {ic.gift}
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                <span style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontSize: '22px',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {hm.ref.bal}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#4A4A5A' }}>NexDrive Credit</span>
                </span>
                <span style={{ fontSize: '13px', color: '#6B6B7B' }}>{hm.ref.sub}</span>
              </span>
              <span style={{ color: '#9A9AAA' }}>{ics.right}</span>
            </button>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0,1fr) auto',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderTop: '1px solid #E7E7EC',
                background: '#F7F7F9',
              }}
            >
              <span style={{ fontSize: '13px', lineHeight: 1.45, color: '#4A4A5A' }}>
                They get 1 month free. You earn 20% as credit.
              </span>
              <button
                className="hover-bg-violet-100"
                onClick={go.referralShare}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '40px',
                  padding: '0 14px',
                  background: '#FFFFFF',
                  color: '#0A0A0F',
                  border: '1.5px solid #0A0A0F',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Refer an instructor{ics.arrow}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
          QUICK ACTIONS
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
            gap: '1px',
            background: '#E7E7EC',
            border: '1px solid #E7E7EC',
          }}
        >
          <button
            className="hover-bg-mist"
            onClick={go.newBooking}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '14px 12px',
              background: '#FFFFFF',
              border: 0,
              textAlign: 'left',
              cursor: 'pointer',
              color: '#0A0A0F',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            <span style={{ color: '#7C3AED' }}>{ic.calendarPlus}</span>New booking
          </button>
          <button
            className="hover-bg-mist"
            onClick={go.addLearner}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '14px 12px',
              background: '#FFFFFF',
              border: 0,
              textAlign: 'left',
              cursor: 'pointer',
              color: '#0A0A0F',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            <span style={{ color: '#7C3AED' }}>{ic.userPlus}</span>Add learner
          </button>
          <button
            className="hover-bg-mist"
            onClick={go.package}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '14px 12px',
              background: '#FFFFFF',
              border: 0,
              textAlign: 'left',
              cursor: 'pointer',
              color: '#0A0A0F',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            <span style={{ color: '#7C3AED' }}>{ic.layers}</span>Book package
          </button>
        </div>
      </div>
    </div>
  );
}
