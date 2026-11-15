export default function QuickAddSheet({ v }) {
  const { closeSheet, go, ic, ics } = v;
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 20px 12px',
        }}
      >
        <span style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.015em' }}>Create</span>
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
            marginRight: '-8px',
          }}
        >
          {ic.x}
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #E7E7EC' }}>
        <button
          className="hover-bg-mist"
          onClick={go.newBooking}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '16px 20px',
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
              background: '#EDE9FE',
              color: '#6D28D9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 'none',
            }}
          >
            {ic.calendarPlus}
          </span>
          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '16px', fontWeight: 600 }}>New booking</span>
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>A single lesson for one learner</span>
          </span>
          {ics.right}
        </button>
        <button
          className="hover-bg-mist"
          onClick={go.package}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '16px 20px',
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
              background: '#EDE9FE',
              color: '#6D28D9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 'none',
            }}
          >
            {ic.layers}
          </span>
          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '16px', fontWeight: 600 }}>Book multiple lessons</span>
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>5, 10 or a custom package in one go</span>
          </span>
          {ics.right}
        </button>
        <button
          className="hover-bg-mist"
          onClick={go.addLearner}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '16px 20px',
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
              background: '#EDE9FE',
              color: '#6D28D9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 'none',
            }}
          >
            {ic.userPlus}
          </span>
          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '16px', fontWeight: 600 }}>Add learner</span>
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>Contact, licence and theory details</span>
          </span>
          {ics.right}
        </button>
      </div>
    </>
  );
}
