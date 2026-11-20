export default function Profile({ v }) {
  const { back, icl, ics, pf } = v;
  if (!pf) return null;
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
        <span style={{ fontSize: '17px', fontWeight: 600, flex: 1 }}>Instructor profile</span>
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            style={{
              width: '72px',
              height: '72px',
              flex: 'none',
              background: '#0A0A0F',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 600,
            }}
          >
            {pf.initials}
          </span>
          <button
            onClick={pf.photo}
            style={{
              height: '40px',
              padding: '0 14px',
              background: '#FFFFFF',
              border: '1.5px solid #0A0A0F',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              color: '#0A0A0F',
            }}
          >
            Change photo
          </button>
        </div>
        <div
          style={{
            paddingBottom: '8px',
            borderBottom: '2px solid #0A0A0F',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: '#6B6B7B',
          }}
        >
          PERSONAL
        </div>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#4A4A5A' }}>Full name</span>
          <input
            className="focus-border-violet"
            value={pf.f.name ?? ''}
            onChange={pf.h.name}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              height: '52px',
              padding: '0 14px',
              border: `1.5px solid ${pf.b.name}`,
              fontSize: '16px',
              outline: 'none',
            }}
          />
          {pf.e.name ? (
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
              {pf.e.name}
            </span>
          ) : null}
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#4A4A5A' }}>Mobile number</span>
          <input
            className="focus-border-violet"
            type="tel"
            value={pf.f.phone ?? ''}
            onChange={pf.h.phone}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              height: '52px',
              padding: '0 14px',
              border: `1.5px solid ${pf.b.phone}`,
              fontSize: '16px',
              outline: 'none',
            }}
          />
          {pf.e.phone ? (
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
              {pf.e.phone}
            </span>
          ) : null}
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#4A4A5A' }}>Email address</span>
          <input
            className="focus-border-violet"
            type="email"
            value={pf.f.email ?? ''}
            onChange={pf.h.email}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              height: '52px',
              padding: '0 14px',
              border: `1.5px solid ${pf.b.email}`,
              fontSize: '16px',
              outline: 'none',
            }}
          />
          {pf.e.email ? (
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
              {pf.e.email}
            </span>
          ) : null}
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: '8px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#4A4A5A' }}>Address</span>
            <input
              className="focus-border-violet"
              value={pf.f.address ?? ''}
              onChange={pf.h.address}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                height: '52px',
                padding: '0 14px',
                border: '1.5px solid #CFCFD8',
                fontSize: '16px',
                outline: 'none',
              }}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#4A4A5A' }}>Postcode</span>
            <input
              className="focus-border-violet"
              value={pf.f.postcode ?? ''}
              onChange={pf.h.postcode}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                height: '52px',
                padding: '0 14px',
                border: '1.5px solid #CFCFD8',
                fontSize: '16px',
                textTransform: 'uppercase',
                outline: 'none',
              }}
            />
          </label>
        </div>
        <div
          style={{
            padding: '8px 0',
            borderBottom: '2px solid #0A0A0F',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: '#6B6B7B',
          }}
        >
          PROFESSIONAL
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 16px',
            background: '#F7F7F9',
            border: '1px solid #E7E7EC',
          }}
        >
          <span style={{ width: '14px', height: '22px', background: pf.badge, flex: 'none' }} />
          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>ADI {pf.f.adi}</span>
            <span style={{ fontSize: '13px', color: '#4A4A5A' }}>{pf.status}</span>
          </span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#166534',
            }}
          >
            {ics.check}Verified
          </span>
        </div>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#4A4A5A' }}>Business name</span>
          <input
            className="focus-border-violet"
            value={pf.f.business ?? ''}
            onChange={pf.h.business}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              height: '52px',
              padding: '0 14px',
              border: '1.5px solid #CFCFD8',
              fontSize: '16px',
              outline: 'none',
            }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#4A4A5A' }}>Postcode areas covered</span>
          <input
            className="focus-border-violet"
            value={pf.f.areas ?? ''}
            onChange={pf.h.areas}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              height: '52px',
              padding: '0 14px',
              border: '1.5px solid #CFCFD8',
              fontSize: '16px',
              outline: 'none',
            }}
          />
        </label>
      </div>
    </div>
  );
}

export function ProfileFooter({ v }) {
  const { ic, padB, pf } = v;
  if (!pf) return null;
  return (
    <div
      style={{
        flex: 'none',
        padding: `12px 20px ${padB}px`,
        background: '#FFFFFF',
        borderTop: '2px solid #0A0A0F',
      }}
    >
      <button
        className="hover-bg-violet-700"
        onClick={pf.save}
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
        Save profile{ic.check}
      </button>
    </div>
  );
}
