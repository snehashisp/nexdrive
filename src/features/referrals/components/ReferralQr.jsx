import QrCode from './QrCode';
export default function ReferralQr({ v }) {
  const { back, ic, icl, ics, rq } = v;
  if (!rq) return null;
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
        <span style={{ fontSize: '17px', fontWeight: 600, flex: 1 }}>Refer an instructor</span>
      </div>
      <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ border: '1.5px solid #0A0A0F', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '22px', display: 'flex', justifyContent: 'center', background: '#FFFFFF' }}>
            <QrCode text={rq.link} size={232} />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) auto',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              borderTop: '1px solid #E7E7EC',
            }}
          >
            <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
              <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
                REFERRAL CODE
              </span>
              <span style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '0.08em' }}>{rq.code}</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <img
                src="assets/logos/monogram-on-light.svg"
                alt=""
                style={{ height: '18px', width: 'auto' }}
              />
              <span style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1 }}>
                <span style={{ letterSpacing: '0.105em' }}>NEX</span>
                <span style={{ color: '#7C3AED', letterSpacing: '0.005em', marginLeft: '-0.06em' }}>
                  Drive
                </span>
              </span>
            </span>
          </div>
        </div>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.55, color: '#4A4A5A', textWrap: 'pretty' }}>
          Ask another driving instructor to scan this QR code to start their NexDrive registration with your
          referral automatically applied.
        </p>
        <button
          onClick={rq.copyLink}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) auto',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 14px',
            background: '#F7F7F9',
            border: '1px solid #E7E7EC',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#0A0A0F',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#4A4A5A',
            }}
          >
            {rq.link}
          </span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#6D28D9',
            }}
          >
            {ics.copy}Copy
          </span>
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            className="hover-bg-violet-700 active-bg-violet-800"
            onClick={rq.shareQr}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '54px',
              padding: '0 18px',
              background: '#7C3AED',
              color: '#FFFFFF',
              border: 0,
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Share QR code{ic.share}
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              className="hover-bg-mist"
              onClick={rq.save}
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
              {ic.download}Save QR code
            </button>
            <button
              className="hover-bg-mist"
              onClick={rq.copyLink}
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
              {ic.link}Copy link
            </button>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderTop: '2px solid #0A0A0F',
            marginTop: '6px',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              color: '#6B6B7B',
              padding: '12px 0 8px',
            }}
          >
            MESSAGE THEY'LL RECEIVE
          </span>
          <div
            style={{
              padding: '14px',
              background: '#F7F7F9',
              border: '1px solid #E7E7EC',
              fontSize: '14px',
              lineHeight: 1.55,
              whiteSpace: 'pre-wrap',
              color: '#0A0A0F',
            }}
          >
            {rq.msg}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
            <button
              className="hover-bg-mist"
              onClick={rq.whatsapp}
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
              {ic.message}WhatsApp
            </button>
            <button
              className="hover-bg-mist"
              onClick={rq.email}
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
              {ic.mail}Email
            </button>
          </div>
        </div>
        {rq.demo ? (
          <button
            className="hover-ink"
            onClick={rq.preview}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '46px',
              padding: '0 14px',
              background: 'transparent',
              color: '#4A4A5A',
              border: '1px dashed #CFCFD8',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {ics.eye}Demo: see what they see after scanning
          </button>
        ) : null}
      </div>
    </div>
  );
}
