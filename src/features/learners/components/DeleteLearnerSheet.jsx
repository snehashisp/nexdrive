export default function DeleteLearnerSheet({ v }) {
  const { ic, icl, ics, la } = v;
  if (!la) return null;
  return (
    <>
      <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span
          style={{
            width: '44px',
            height: '44px',
            background: '#FEE2E2',
            color: '#B91C1C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icl.trash}
        </span>
        <span style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.015em' }}>
          Delete {la.name}?
        </span>
        <span style={{ fontSize: '15px', lineHeight: 1.55, color: '#4A4A5A' }}>
          This will remove the learner from your active learner list. Previous lesson records will remain
          available for your records.
        </span>
        {la.hasUp ? (
          <span
            style={{
              display: 'flex',
              gap: '8px',
              padding: '10px 12px',
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              fontSize: '14px',
              color: '#78350F',
            }}
          >
            {ics.warn}
            {la.delNote}
          </span>
        ) : null}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
            padding: '12px 0',
            borderTop: '1px solid #E7E7EC',
            borderBottom: '1px solid #E7E7EC',
            fontSize: '14px',
            color: '#4A4A5A',
          }}
        >
          {ic.archive}
          <span>
            Lesson history, amounts and dates stay in Bookings → History and can be filtered by this learner.
          </span>
        </div>
      </div>
      <div style={{ padding: '18px 20px 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          className="hover-bg-red-800"
          onClick={la.confirmDel}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '52px',
            padding: '0 18px',
            background: '#B91C1C',
            color: '#FFFFFF',
            border: 0,
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Delete learner{ic.trash}
        </button>
        <button
          onClick={la.keep}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '50px',
            padding: '0 18px',
            background: '#FFFFFF',
            color: '#0A0A0F',
            border: '1.5px solid #0A0A0F',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Keep learner
        </button>
      </div>
    </>
  );
}
