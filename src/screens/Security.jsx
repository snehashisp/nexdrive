export default function Security({ v }) {
  const { back, ic, icl, ics, pwChanged, sec } = v;
  if (!sec) return null;
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
        <span style={{ fontSize: '17px', fontWeight: 600, flex: 1 }}>Security</span>
      </div>
      <div style={{ padding: '8px 20px 0', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '16px 0',
            borderBottom: '1px solid #E7E7EC',
          }}
        >
          {ic.lock}
          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Password</span>
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>Last changed {pwChanged}</span>
          </span>
          <button
            onClick={sec.toggle}
            style={{
              padding: 0,
              background: 'transparent',
              border: 0,
              color: '#6D28D9',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {sec.pwLabel}
          </button>
        </div>
        {sec.open ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '16px 0',
              borderBottom: '1px solid #E7E7EC',
            }}
          >
            <input
              className="focus-border-violet"
              type="password"
              value={sec.f.cur ?? ''}
              onChange={sec.h.cur}
              placeholder="Current password"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                height: '50px',
                padding: '0 14px',
                border: `1.5px solid ${sec.b.cur}`,
                fontSize: '16px',
                outline: 'none',
              }}
            />
            {sec.e.cur ? (
              <span style={{ fontSize: '13px', color: '#B91C1C', marginTop: '-6px' }}>{sec.e.cur}</span>
            ) : null}
            <input
              className="focus-border-violet"
              type="password"
              value={sec.f.nw ?? ''}
              onChange={sec.h.nw}
              placeholder="New password"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                height: '50px',
                padding: '0 14px',
                border: `1.5px solid ${sec.b.nw}`,
                fontSize: '16px',
                outline: 'none',
              }}
            />
            {sec.e.nw ? (
              <span style={{ fontSize: '13px', color: '#B91C1C', marginTop: '-6px' }}>{sec.e.nw}</span>
            ) : null}
            <input
              className="focus-border-violet"
              type="password"
              value={sec.f.conf ?? ''}
              onChange={sec.h.conf}
              placeholder="Confirm new password"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                height: '50px',
                padding: '0 14px',
                border: `1.5px solid ${sec.b.conf}`,
                fontSize: '16px',
                outline: 'none',
              }}
            />
            {sec.e.conf ? (
              <span style={{ fontSize: '13px', color: '#B91C1C', marginTop: '-6px' }}>{sec.e.conf}</span>
            ) : null}
            <button
              onClick={sec.save}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '50px',
                padding: '0 16px',
                background: '#7C3AED',
                color: '#FFFFFF',
                border: 0,
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Update password{ic.arrow}
            </button>
          </div>
        ) : null}
        <button
          onClick={sec.verified}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '16px 0',
            background: 'transparent',
            border: 0,
            borderBottom: '1px solid #E7E7EC',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#0A0A0F',
          }}
        >
          {ic.phone}
          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Mobile number</span>
            <span style={{ fontSize: '13px', color: '#6B6B7B' }}>{sec.phone}</span>
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
        </button>
        <button
          onClick={sec.verified}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '16px 0',
            background: 'transparent',
            border: 0,
            borderBottom: '1px solid #E7E7EC',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#0A0A0F',
          }}
        >
          {ic.mail}
          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Email address</span>
            <span
              style={{ fontSize: '13px', color: '#6B6B7B', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {sec.email}
            </span>
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
        </button>
        <button
          onClick={sec.logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '16px 0',
            background: 'transparent',
            border: 0,
            borderBottom: '1px solid #E7E7EC',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#B91C1C',
            fontSize: '15px',
            fontWeight: 600,
          }}
        >
          {ic.logout}Log out
        </button>
      </div>
    </div>
  );
}
