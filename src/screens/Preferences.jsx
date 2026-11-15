export default function Preferences({ v }) {
  const { back, icl, pp } = v;
  if (!pp) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '28px' }}>
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
          padding: '0 12px 0 4px',
          borderBottom: '2px solid #0A0A0F',
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
        <span style={{ fontSize: '17px', fontWeight: 600, flex: 1 }}>Notification preferences</span>
      </div>
      <div style={{ padding: '8px 20px 0', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            padding: '14px 0 8px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: '#6B6B7B',
          }}
        >
          REMINDERS
        </div>
        <button
          onClick={pp.t.reminder.flip}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 0',
            background: 'transparent',
            border: 0,
            borderTop: '1px solid #E7E7EC',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#0A0A0F',
          }}
        >
          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Next-lesson reminder</span>
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>In-app banner and phone notification</span>
          </span>
          <span
            style={{
              width: '48px',
              height: '28px',
              flex: 'none',
              background: pp.t.reminder.bg,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '3px',
                left: `${pp.t.reminder.x}px`,
                width: '22px',
                height: '22px',
                background: '#FFFFFF',
              }}
            />
          </span>
        </button>
        {pp.showMins ? (
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '6px', padding: '0 0 14px' }}
          >
            {pp.mins.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                style={{
                  height: '40px',
                  background: o.bg,
                  color: o.fg,
                  border: `1.5px solid ${o.bd}`,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {o.t} before
              </button>
            ))}
          </div>
        ) : null}
        <div
          style={{
            padding: '20px 0 8px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: '#6B6B7B',
            borderTop: '1px solid #E7E7EC',
          }}
        >
          ALERTS
        </div>
        <button
          onClick={pp.t.bookingAlerts.flip}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 0',
            background: 'transparent',
            border: 0,
            borderTop: '1px solid #E7E7EC',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#0A0A0F',
          }}
        >
          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Booking changes</span>
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>
              Created, rescheduled and cancelled lessons
            </span>
          </span>
          <span
            style={{
              width: '48px',
              height: '28px',
              flex: 'none',
              background: pp.t.bookingAlerts.bg,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '3px',
                left: `${pp.t.bookingAlerts.x}px`,
                width: '22px',
                height: '22px',
                background: '#FFFFFF',
              }}
            />
          </span>
        </button>
        <button
          onClick={pp.t.learnerAlerts.flip}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 0',
            background: 'transparent',
            border: 0,
            borderTop: '1px solid #E7E7EC',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#0A0A0F',
          }}
        >
          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Learner alerts</span>
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>
              Incomplete profiles and missing details
            </span>
          </span>
          <span
            style={{
              width: '48px',
              height: '28px',
              flex: 'none',
              background: pp.t.learnerAlerts.bg,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '3px',
                left: `${pp.t.learnerAlerts.x}px`,
                width: '22px',
                height: '22px',
                background: '#FFFFFF',
              }}
            />
          </span>
        </button>
        <button
          onClick={pp.t.billing.flip}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 0',
            background: 'transparent',
            border: 0,
            borderTop: '1px solid #E7E7EC',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#0A0A0F',
          }}
        >
          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>{'Subscription & billing'}</span>
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>Trial ending, renewals, payment issues</span>
          </span>
          <span
            style={{
              width: '48px',
              height: '28px',
              flex: 'none',
              background: pp.t.billing.bg,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '3px',
                left: `${pp.t.billing.x}px`,
                width: '22px',
                height: '22px',
                background: '#FFFFFF',
              }}
            />
          </span>
        </button>
        <div
          style={{
            padding: '20px 0 8px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: '#6B6B7B',
            borderTop: '1px solid #E7E7EC',
          }}
        >
          LEARNER COMMUNICATION
        </div>
        <button
          onClick={pp.t.askSend.flip}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 0',
            background: 'transparent',
            border: 0,
            borderTop: '1px solid #E7E7EC',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#0A0A0F',
          }}
        >
          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Ask before messaging learners</span>
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>Preview every message before it's sent</span>
          </span>
          <span
            style={{
              width: '48px',
              height: '28px',
              flex: 'none',
              background: pp.t.askSend.bg,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '3px',
                left: `${pp.t.askSend.x}px`,
                width: '22px',
                height: '22px',
                background: '#FFFFFF',
              }}
            />
          </span>
        </button>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '14px 0',
            borderTop: '1px solid #E7E7EC',
          }}
        >
          <span style={{ fontSize: '15px', fontWeight: 600 }}>Send messages by</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '6px' }}>
            {pp.chans.map((o, i) => (
              <button
                key={i}
                onClick={o.pick}
                style={{
                  height: '42px',
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
      </div>
    </div>
  );
}
