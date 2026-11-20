export default function LearnerActionsSheet({ v }) {
  const { closeSheet, ic, ics, la } = v;
  if (!la) return null;
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '18px 12px 14px 20px',
          borderBottom: '1px solid #E7E7EC',
        }}
      >
        <span
          style={{
            width: '48px',
            height: '48px',
            flex: 'none',
            background: '#EDE9FE',
            color: '#5B21B6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          {la.initials}
        </span>
        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
          <span style={{ fontSize: '18px', fontWeight: 600 }}>{la.name}</span>
          <span style={{ fontSize: '13px', color: '#6B6B7B' }}>
            {la.phone} · {la.upText}
          </span>
        </span>
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
      {la.incomplete ? (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            padding: '10px 20px',
            background: '#FFFBEB',
            color: '#78350F',
            fontSize: '13px',
            fontWeight: 500,
            borderBottom: '1px solid #FDE68A',
          }}
        >
          {ics.warn}Details incomplete — complete the profile before booking.
        </div>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button
          className="hover-bg-mist"
          onClick={la.view}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            minHeight: '56px',
            padding: '0 20px',
            background: '#FFFFFF',
            border: 0,
            borderBottom: '1px solid #E7E7EC',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#0A0A0F',
            fontSize: '16px',
            fontWeight: 500,
          }}
        >
          {ic.user}
          <span style={{ flex: 1 }}>View learner profile</span>
          {ics.right}
        </button>
        <button
          className="hover-bg-violet-50"
          onClick={la.schedule}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            minHeight: '56px',
            padding: '0 20px',
            background: '#FFFFFF',
            border: 0,
            borderBottom: '1px solid #E7E7EC',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#6D28D9',
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          {ic.calendarPlus}
          <span style={{ flex: 1 }}>Schedule booking</span>
          {ics.right}
        </button>
        <button
          className="hover-bg-mist"
          onClick={la.resched}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            minHeight: '56px',
            padding: '0 20px',
            background: '#FFFFFF',
            border: 0,
            borderBottom: '1px solid #E7E7EC',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#0A0A0F',
            fontSize: '16px',
            fontWeight: 500,
          }}
        >
          {ic.repeat}
          <span style={{ flex: 1 }}>Reschedule booking</span>
          {ics.right}
        </button>
        <button
          className="hover-bg-mist"
          onClick={la.cancel}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            minHeight: '56px',
            padding: '0 20px',
            background: '#FFFFFF',
            border: 0,
            borderBottom: '1px solid #E7E7EC',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#0A0A0F',
            fontSize: '16px',
            fontWeight: 500,
          }}
        >
          {ic.calendarX}
          <span style={{ flex: 1 }}>Cancel booking</span>
          {ics.right}
        </button>
        <button
          className="hover-bg-mist"
          onClick={la.call}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            minHeight: '56px',
            padding: '0 20px',
            background: '#FFFFFF',
            border: 0,
            borderBottom: '1px solid #E7E7EC',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#0A0A0F',
            fontSize: '16px',
            fontWeight: 500,
          }}
        >
          {ic.phone}
          <span style={{ flex: 1 }}>Call {la.phone}</span>
        </button>
        <button
          className="hover-bg-error"
          onClick={la.del}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            minHeight: '56px',
            padding: '0 20px',
            background: '#FFFFFF',
            border: 0,
            textAlign: 'left',
            cursor: 'pointer',
            color: '#B91C1C',
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          {ic.trash}
          <span style={{ flex: 1 }}>Delete learner</span>
        </button>
      </div>
    </>
  );
}
