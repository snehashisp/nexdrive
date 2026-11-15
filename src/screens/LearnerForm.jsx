export default function LearnerForm({ v }) {
  const { back, ic, icl, ics, lfm } = v;
  if (!lfm) return null;
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
          {icl.x}
        </button>
        <span style={{ fontSize: '17px', fontWeight: 600, flex: 1 }}>{lfm.title}</span>
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {lfm.fromBooking ? (
          <div
            style={{
              padding: '14px 16px',
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              display: 'flex',
              gap: '10px',
              color: '#78350F',
              fontSize: '14px',
              lineHeight: 1.5,
            }}
          >
            {ic.warn}
            <span>
              <strong>Learner details incomplete.</strong> Please complete the required learner information
              before scheduling a driving lesson.
            </span>
          </div>
        ) : null}
        {lfm.hasErr ? (
          <div
            style={{
              padding: '12px 16px',
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              color: '#991B1B',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            {ic.alert}
            {lfm.errText}
          </div>
        ) : null}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingBottom: '8px',
            borderBottom: '2px solid #0A0A0F',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6D28D9' }}>
            REQUIRED TO BOOK LESSONS
          </span>
        </div>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '13px',
              fontWeight: 500,
              color: '#4A4A5A',
            }}
          >
            Full name<span style={{ fontSize: '12px', color: '#6D28D9' }}>Required</span>
          </span>
          <input
            className="focus-border-violet"
            value={lfm.l.name ?? ''}
            onChange={lfm.h.name}
            placeholder="James Smith"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              height: '52px',
              padding: '0 14px',
              border: `1.5px solid ${lfm.b.name}`,
              background: '#FFFFFF',
              fontSize: '16px',
              color: '#0A0A0F',
              outline: 'none',
            }}
          />
          {lfm.e.name ? (
            <span
              style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
                fontSize: '13px',
                color: '#B91C1C',
              }}
            >
              {ics.alert}
              {lfm.e.name}
            </span>
          ) : null}
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '13px',
              fontWeight: 500,
              color: '#4A4A5A',
            }}
          >
            Mobile number<span style={{ fontSize: '12px', color: '#6D28D9' }}>Required</span>
          </span>
          <input
            className="focus-border-violet"
            type="tel"
            value={lfm.l.phone ?? ''}
            onChange={lfm.h.phone}
            placeholder="07700 900456"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              height: '52px',
              padding: '0 14px',
              border: `1.5px solid ${lfm.b.phone}`,
              background: '#FFFFFF',
              fontSize: '16px',
              color: '#0A0A0F',
              outline: 'none',
            }}
          />
          {lfm.e.phone ? (
            <span
              style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
                fontSize: '13px',
                color: '#B91C1C',
              }}
            >
              {ics.alert}
              {lfm.e.phone}
            </span>
          ) : null}
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '13px',
              fontWeight: 500,
              color: '#4A4A5A',
            }}
          >
            Pickup address<span style={{ fontSize: '12px', color: '#6D28D9' }}>Required</span>
          </span>
          <input
            className="focus-border-violet"
            value={lfm.l.address ?? ''}
            onChange={lfm.h.address}
            placeholder="27 Stoke Poges Lane, Slough"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              height: '52px',
              padding: '0 14px',
              border: `1.5px solid ${lfm.b.address}`,
              background: '#FFFFFF',
              fontSize: '16px',
              color: '#0A0A0F',
              outline: 'none',
            }}
          />
          {lfm.e.address ? (
            <span
              style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
                fontSize: '13px',
                color: '#B91C1C',
              }}
            >
              {ics.alert}
              {lfm.e.address}
            </span>
          ) : null}
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '13px',
              fontWeight: 500,
              color: '#4A4A5A',
            }}
          >
            Postcode<span style={{ fontSize: '12px', color: '#6D28D9' }}>Required</span>
          </span>
          <input
            className="focus-border-violet"
            value={lfm.l.postcode ?? ''}
            onChange={lfm.h.postcode}
            placeholder="SL1 3NY"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              height: '52px',
              padding: '0 14px',
              border: `1.5px solid ${lfm.b.postcode}`,
              background: '#FFFFFF',
              fontSize: '16px',
              textTransform: 'uppercase',
              color: '#0A0A0F',
              outline: 'none',
            }}
          />
          {lfm.e.postcode ? (
            <span
              style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
                fontSize: '13px',
                color: '#B91C1C',
              }}
            >
              {ics.alert}
              {lfm.e.postcode}
            </span>
          ) : null}
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '13px',
              fontWeight: 500,
              color: '#4A4A5A',
            }}
          >
            Provisional driving licence number
            <span style={{ fontSize: '12px', color: '#6D28D9' }}>Required</span>
          </span>
          <input
            className="focus-border-violet"
            value={lfm.l.licence ?? ''}
            onChange={lfm.h.licence}
            placeholder="SMITH 801157 J9 9AB"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              height: '52px',
              padding: '0 14px',
              border: `1.5px solid ${lfm.b.licence}`,
              background: '#FFFFFF',
              fontSize: '16px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#0A0A0F',
              outline: 'none',
            }}
          />
          {lfm.e.licence ? (
            <span
              style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
                fontSize: '13px',
                color: '#B91C1C',
              }}
            >
              {ics.alert}
              {lfm.e.licence}
            </span>
          ) : null}
          <span style={{ fontSize: '13px', color: '#6B6B7B' }}>
            16 characters, from section 5 of the photocard.
          </span>
        </label>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            padding: '8px 0',
            borderBottom: '2px solid #0A0A0F',
            marginTop: '6px',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
            OPTIONAL
          </span>
        </div>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '13px',
              fontWeight: 500,
              color: '#4A4A5A',
            }}
          >
            Theory test pass certificate number
            <span style={{ fontSize: '12px', color: '#6B6B7B' }}>Optional</span>
          </span>
          <input
            className="focus-border-violet"
            inputMode="numeric"
            value={lfm.l.theory ?? ''}
            onChange={lfm.h.theory}
            placeholder="8 digits"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              height: '52px',
              padding: '0 14px',
              border: `1.5px solid ${lfm.b.theory}`,
              background: '#FFFFFF',
              fontSize: '16px',
              color: '#0A0A0F',
              outline: 'none',
            }}
          />
          {lfm.e.theory ? (
            <span
              style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
                fontSize: '13px',
                color: '#B91C1C',
              }}
            >
              {ics.alert}
              {lfm.e.theory}
            </span>
          ) : null}
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '13px',
              fontWeight: 500,
              color: '#4A4A5A',
            }}
          >
            Email address<span style={{ fontSize: '12px', color: '#6B6B7B' }}>Optional</span>
          </span>
          <input
            className="focus-border-violet"
            type="email"
            value={lfm.l.email ?? ''}
            onChange={lfm.h.email}
            placeholder="name@example.co.uk"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              height: '52px',
              padding: '0 14px',
              border: `1.5px solid ${lfm.b.email}`,
              background: '#FFFFFF',
              fontSize: '16px',
              color: '#0A0A0F',
              outline: 'none',
            }}
          />
          {lfm.e.email ? (
            <span
              style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
                fontSize: '13px',
                color: '#B91C1C',
              }}
            >
              {ics.alert}
              {lfm.e.email}
            </span>
          ) : null}
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '13px',
              fontWeight: 500,
              color: '#4A4A5A',
            }}
          >
            Notes<span style={{ fontSize: '12px', color: '#6B6B7B' }}>Optional</span>
          </span>
          <textarea
            className="focus-border-violet"
            value={lfm.l.notes ?? ''}
            onChange={lfm.h.notes}
            rows="3"
            placeholder="Test date, things to practise…"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '12px 14px',
              border: '1.5px solid #CFCFD8',
              background: '#FFFFFF',
              fontSize: '16px',
              color: '#0A0A0F',
              outline: 'none',
              resize: 'vertical',
            }}
          />
        </label>
        <span style={{ display: 'flex', gap: '8px', fontSize: '13px', lineHeight: 1.5, color: '#6B6B7B' }}>
          {ics.lock}Stored securely under UK GDPR and only used to manage this learner's lessons.
        </span>
      </div>
    </div>
  );
}

export function LearnerFormFooter({ v }) {
  const { ic, lfm, padB } = v;
  if (!lfm) return null;
  return (
    <div
      style={{
        flex: 'none',
        padding: `12px 20px ${padB}px`,
        background: '#FFFFFF',
        borderTop: '2px solid #0A0A0F',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <button
        className="hover-bg-violet-700 active-bg-violet-800"
        onClick={lfm.saveBook}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '52px',
          padding: '0 18px',
          background: '#7C3AED',
          color: '#FFFFFF',
          border: 0,
          fontSize: '16px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {lfm.primary}
        {ic.arrow}
      </button>
      {lfm.showSecondary ? (
        <button
          className="hover-bg-mist"
          onClick={lfm.save}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '48px',
            padding: '0 18px',
            background: '#FFFFFF',
            color: '#0A0A0F',
            border: '1.5px solid #0A0A0F',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {lfm.secondary}
        </button>
      ) : null}
    </div>
  );
}
