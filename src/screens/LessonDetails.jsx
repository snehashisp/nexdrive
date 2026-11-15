export default function LessonDetails({ v }) {
  const { back, ic, icl, ld } = v;
  if (!ld) return null;
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
        <span style={{ fontSize: '17px', fontWeight: 600, flex: 1 }}>Lesson</span>
      </div>
      <div
        style={{
          padding: '18px 20px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          borderBottom: '2px solid #0A0A0F',
          borderLeft: `6px solid ${ld.st.bar}`,
        }}
      >
        <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 8px',
              background: ld.st.bg,
              color: ld.st.fg,
            }}
          >
            {ld.st.label}
          </span>
          <span style={{ fontSize: '13px', color: '#4A4A5A' }}>{ld.note}</span>
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            textDecoration: ld.deco,
          }}
        >
          {ld.dateLong}
        </h1>
        <span
          style={{ fontSize: '22px', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: '#4A4A5A' }}
        >
          {ld.range} · {ld.dur}
        </span>
      </div>
      <div style={{ padding: '18px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
          LEARNER
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
            {ld.initials}
          </span>
          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
            <span style={{ fontSize: '17px', fontWeight: 600 }}>{ld.name}</span>
            <span style={{ fontSize: '14px', color: '#4A4A5A' }}>{ld.phone}</span>
          </span>
          <button
            onClick={ld.profile}
            style={{
              height: '36px',
              padding: 0,
              background: 'transparent',
              border: 0,
              color: '#6D28D9',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {ld.profLabel}
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button
            className="hover-bg-mist"
            onClick={ld.call}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '48px',
              padding: '0 14px',
              background: '#FFFFFF',
              color: '#0A0A0F',
              border: '1.5px solid #0A0A0F',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {ic.phone}Call learner
          </button>
          <button
            className="hover-bg-mist"
            onClick={ld.msg}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '48px',
              padding: '0 14px',
              background: '#FFFFFF',
              color: '#0A0A0F',
              border: '1.5px solid #0A0A0F',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {ic.message}Message
          </button>
        </div>
      </div>
      <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
          LOCATION
        </span>
        <div style={{ border: '1px solid #E7E7EC', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              height: '140px',
              position: 'relative',
              backgroundColor: '#F1F1F5',
              backgroundImage:
                'linear-gradient(#E4E4EA 1px, transparent 1px), linear-gradient(90deg, #E4E4EA 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                color: '#6D28D9',
              }}
            >
              {icl.pin}
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  background: '#0A0A0F',
                  color: '#FFFFFF',
                  padding: '3px 8px',
                }}
              >
                {ld.pc}
              </span>
            </span>
            <span
              style={{
                position: 'absolute',
                left: '10px',
                bottom: '8px',
                fontSize: '11px',
                color: '#6B6B7B',
              }}
            >
              Map preview
            </span>
          </div>
          <div
            style={{
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              borderTop: '1px solid #E7E7EC',
            }}
          >
            <span style={{ fontSize: '15px', fontWeight: 500 }}>{ld.loc}</span>
            <span style={{ fontSize: '14px', color: '#4A4A5A', fontWeight: 600, letterSpacing: '0.04em' }}>
              {ld.pc}
            </span>
          </div>
          {ld.canNav ? (
            <button
              className="hover-bg-violet-700 active-bg-violet-800"
              onClick={ld.nav}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '54px',
                padding: '0 16px',
                background: '#7C3AED',
                color: '#FFFFFF',
                border: 0,
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>{ic.nav}Navigate</span>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#EDE9FE' }}>Opens Google Maps</span>
            </button>
          ) : null}
        </div>
      </div>
      <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: '#6B6B7B',
            paddingBottom: '8px',
            borderBottom: '2px solid #0A0A0F',
          }}
        >
          PAYMENT
        </span>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '11px 0',
            borderBottom: '1px solid #E7E7EC',
            fontSize: '15px',
          }}
        >
          <span style={{ color: '#4A4A5A' }}>Rate</span>
          <span style={{ fontWeight: 600 }}>{ld.rateRow}</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '11px 0',
            borderBottom: '1px solid #E7E7EC',
            fontSize: '15px',
          }}
        >
          <span style={{ color: '#4A4A5A' }}>Lesson price</span>
          <span style={{ fontWeight: 600 }}>{ld.price}</span>
        </div>
        {ld.hasDisc ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '11px 0',
              borderBottom: '1px solid #E7E7EC',
              fontSize: '15px',
            }}
          >
            <span style={{ color: '#4A4A5A' }}>Discount</span>
            <span style={{ fontWeight: 600, color: '#166534' }}>{ld.disc}</span>
          </div>
        ) : null}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            padding: '12px 0',
          }}
        >
          <span style={{ fontSize: '16px', fontWeight: 600 }}>Final amount</span>
          <span style={{ fontSize: '24px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
            {ld.fin}
          </span>
        </div>
      </div>
      {ld.canChange ? (
        <div style={{ padding: '6px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button
            className="hover-bg-mist"
            onClick={ld.resched}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '50px',
              padding: '0 14px',
              background: '#FFFFFF',
              color: '#0A0A0F',
              border: '1.5px solid #0A0A0F',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {ic.repeat}Reschedule
          </button>
          <button
            className="hover-bg-error"
            onClick={ld.cancel}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '50px',
              padding: '0 14px',
              background: '#FFFFFF',
              color: '#B91C1C',
              border: '1.5px solid #B91C1C',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {ic.calendarX}Cancel
          </button>
        </div>
      ) : null}
      {ld.isCancelled ? (
        <div
          style={{
            margin: '6px 20px 0',
            padding: '12px 14px',
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            fontSize: '14px',
            color: '#7F1D1D',
            lineHeight: 1.5,
          }}
        >
          This lesson was cancelled. It stays in your booking history for your records.
        </div>
      ) : null}
    </div>
  );
}
