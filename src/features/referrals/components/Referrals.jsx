export default function Referrals({ v }) {
  const { back, go, ic, icl, ics, rf } = v;
  if (!rf) return null;
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
        <span style={{ fontSize: '17px', fontWeight: 600, flex: 1 }}>{'Referral & Rewards'}</span>
      </div>
      <div
        style={{
          padding: '20px 20px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          borderBottom: '2px solid #0A0A0F',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: '26px',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1.12,
            textWrap: 'pretty',
          }}
        >
          Help another instructor join NexDrive
        </h1>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.55, color: '#4A4A5A', textWrap: 'pretty' }}>
          Share your code. When they subscribe, you earn 20% of their first subscription as NexDrive Credit.
        </p>
      </div>
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ border: '1.5px solid #0A0A0F', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 14px',
              borderBottom: '1px solid #E7E7EC',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
              YOUR REFERRAL CODE
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
              {ics.check}Active
            </span>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) auto',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 14px',
            }}
          >
            <span
              style={{
                fontSize: '24px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                fontVariantNumeric: 'tabular-nums',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {rf.code}
            </span>
            <button
              className="hover-bg-mist"
              onClick={rf.copyCode}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                height: '40px',
                padding: '0 14px',
                background: '#FFFFFF',
                color: '#0A0A0F',
                border: '1.5px solid #0A0A0F',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {ics.copy}Copy
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #E7E7EC' }}>
            <button
              className="hover-bg-mist"
              onClick={rf.whatsapp}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                height: '52px',
                padding: '0 14px',
                background: '#FFFFFF',
                border: 0,
                textAlign: 'left',
                cursor: 'pointer',
                color: '#0A0A0F',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              {ic.message}WhatsApp
            </button>
            <button
              className="hover-bg-mist"
              onClick={rf.email}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                height: '52px',
                padding: '0 14px',
                background: '#FFFFFF',
                border: 0,
                borderLeft: '1px solid #E7E7EC',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#0A0A0F',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              {ic.mail}Email
            </button>
            <button
              className="hover-bg-mist"
              onClick={rf.copyLink}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                height: '52px',
                padding: '0 14px',
                background: '#FFFFFF',
                border: 0,
                borderTop: '1px solid #E7E7EC',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#0A0A0F',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              {ic.link}Copy link
            </button>
            <button
              className="hover-bg-violet-700"
              onClick={go.referralShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                height: '52px',
                padding: '0 14px',
                background: '#7C3AED',
                border: 0,
                borderTop: '1px solid #7C3AED',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              {ic.qr}QR code
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: '1px',
          background: '#E7E7EC',
          borderTop: '1px solid #E7E7EC',
          borderBottom: '1px solid #E7E7EC',
          marginTop: '18px',
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            padding: '14px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          <span style={{ fontSize: '12px', color: '#6B6B7B' }}>Your reward</span>
          <span style={{ fontSize: '18px', fontWeight: 700 }}>20% NexDrive Credit</span>
          <span style={{ fontSize: '12px', color: '#6B6B7B', lineHeight: 1.4 }}>
            of their first subscription
          </span>
        </div>
        <div
          style={{
            background: '#FFFFFF',
            padding: '14px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          <span style={{ fontSize: '12px', color: '#6B6B7B' }}>New instructor gets</span>
          <span style={{ fontSize: '18px', fontWeight: 700 }}>1 month free</span>
          <span style={{ fontSize: '12px', color: '#6B6B7B', lineHeight: 1.4 }}>
            after their 14-day trial
          </span>
        </div>
      </div>
      <button
        className="hover-bg-ink-2"
        onClick={go.credit}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          margin: '18px 20px 0',
          padding: '16px',
          background: '#0A0A0F',
          color: '#FFFFFF',
          border: 0,
          borderLeft: '4px solid #7C3AED',
          textAlign: 'left',
          cursor: 'pointer',
        }}
      >
        <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontSize: '12px', color: '#B4B4C4' }}>Available NexDrive Credit</span>
          <span
            style={{
              fontSize: '30px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {rf.bal}
          </span>
        </span>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            fontWeight: 600,
            color: '#EDE9FE',
          }}
        >
          View credit{ics.right}
        </span>
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
          gap: '1px',
          background: '#E7E7EC',
          border: '1px solid #E7E7EC',
          margin: '10px 20px 0',
        }}
      >
        {rf.stats.map((x, i) => (
          <div key={i} style={{ background: '#FFFFFF', padding: '12px 12px' }}>
            <div style={{ fontSize: '12px', color: '#6B6B7B' }}>{x.k}</div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 700,
                marginTop: '2px',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {x.v}
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '24px 20px 0', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingBottom: '8px',
            borderBottom: '2px solid #0A0A0F',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B6B7B' }}>
            REFERRAL HISTORY
          </span>
          <span style={{ fontSize: '13px', color: '#6B6B7B' }}>{rf.histCount}</span>
        </div>
        {rf.has ? (
          <>
            {rf.list.map((r, i) => (
              <button
                key={i}
                className="hover-bg-mist"
                onClick={r.open}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0,1fr) auto',
                  gap: '4px 12px',
                  width: '100%',
                  padding: '13px 0',
                  background: 'transparent',
                  border: 0,
                  borderBottom: '1px solid #E7E7EC',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: '#0A0A0F',
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 600 }}>{r.name}</span>
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: r.amtC,
                    fontVariantNumeric: 'tabular-nums',
                    textAlign: 'right',
                  }}
                >
                  {r.reward}
                </span>
                <span style={{ fontSize: '13px', color: '#6B6B7B' }}>
                  {r.plan} · {r.value} · Joined {r.date}
                </span>
                <span
                  style={{
                    justifySelf: 'end',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 7px',
                    background: r.st.bg,
                    color: r.st.fg,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {r.st.label}
                </span>
              </button>
            ))}
          </>
        ) : null}
        {rf.empty ? (
          <div
            style={{
              marginTop: '14px',
              border: '1px dashed #CFCFD8',
              padding: '20px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 600 }}>No referrals yet.</span>
            <span style={{ fontSize: '14px', lineHeight: 1.5, color: '#6B6B7B' }}>
              Share your code with another instructor. Referrals you make will appear here.
            </span>
          </div>
        ) : null}
      </div>
      <div style={{ padding: '24px 20px 0', display: 'flex', flexDirection: 'column' }}>
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
          HOW IT WORKS
        </span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '32px 1fr',
            padding: '12px 0',
            borderBottom: '1px solid #E7E7EC',
            fontSize: '14px',
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: '#6D28D9', fontWeight: 600, fontSize: '12px', paddingTop: '2px' }}>01</span>
          Share your code, link or QR code with another driving instructor.
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '32px 1fr',
            padding: '12px 0',
            borderBottom: '1px solid #E7E7EC',
            fontSize: '14px',
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: '#6D28D9', fontWeight: 600, fontSize: '12px', paddingTop: '2px' }}>02</span>
          They join with a 14-day free trial, then get 1 additional month free.
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '32px 1fr',
            padding: '12px 0',
            borderBottom: '1px solid #E7E7EC',
            fontSize: '14px',
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: '#6D28D9', fontWeight: 600, fontSize: '12px', paddingTop: '2px' }}>03</span>
          Once their first payment is confirmed and the 14-day refund period has passed, 20% of its value is
          added to your NexDrive Credit.
        </div>
        <span style={{ fontSize: '12px', lineHeight: 1.55, color: '#6B6B7B', paddingTop: '10px' }}>
          Credit doesn't expire and can be used towards your own subscription. Self-referrals, and
          subscriptions that are cancelled, fail or are refunded, don't earn credit.
        </span>
      </div>
    </div>
  );
}
