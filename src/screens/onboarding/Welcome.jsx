export default function Welcome({ v }) {
  const { ic, ics, obGo, obInvite, obLogin } = v;
  return (
    <div
      style={{
        minHeight: '100%',
        background: '#0A0A0F',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 24px 28px',
        boxSizing: 'border-box',
        gap: '36px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="assets/logos/monogram-gradient.svg" alt="" style={{ height: '34px', width: 'auto' }} />
        <span style={{ fontSize: '24px', fontWeight: 500, lineHeight: 1 }}>
          <span style={{ letterSpacing: '0.105em' }}>NEX</span>
          <span style={{ color: '#7C3AED', letterSpacing: '0.005em', marginLeft: '-0.06em' }}>Drive</span>
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: 'auto' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', color: '#A78BFA' }}>
          FOR UK DRIVING INSTRUCTORS
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: '40px',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.02,
            textWrap: 'pretty',
          }}
        >
          Your driving school, run from one place.
        </h1>
        <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.55, color: '#B4B4C4', textWrap: 'pretty' }}>
          Start your 14-day free trial and manage your learners, lessons and bookings from one place.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #1A1A24' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '32px 1fr',
            padding: '14px 0',
            borderBottom: '1px solid #1A1A24',
            fontSize: '15px',
          }}
        >
          <span style={{ color: '#A78BFA', fontWeight: 600, fontSize: '12px', paddingTop: '2px' }}>01</span>
          Book single lessons or packages in seconds
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '32px 1fr',
            padding: '14px 0',
            borderBottom: '1px solid #1A1A24',
            fontSize: '15px',
          }}
        >
          <span style={{ color: '#A78BFA', fontWeight: 600, fontSize: '12px', paddingTop: '2px' }}>02</span>
          Prices, discounts and totals worked out for you
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '32px 1fr',
            padding: '14px 0',
            borderBottom: '1px solid #1A1A24',
            fontSize: '15px',
          }}
        >
          <span style={{ color: '#A78BFA', fontWeight: 600, fontSize: '12px', paddingTop: '2px' }}>03</span>
          Lesson details and bank info sent to learners
        </div>
      </div>
      {obInvite ? (
        <div style={{ border: '1.5px solid #7C3AED', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              padding: '10px 14px',
              background: '#7C3AED',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.18em',
            }}
          >
            YOU'VE BEEN INVITED TO NEXDRIVE
          </div>
          <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: '#B4B4C4' }}>
              Your referral benefit · from {obInvite.by}
            </span>
            <span style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.3 }}>
              14-day free trial <span style={{ color: '#A78BFA' }}>+</span> 1 additional month free
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                color: '#B4B4C4',
              }}
            >
              Referral code{' '}
              <strong style={{ color: '#FFFFFF', letterSpacing: '0.08em' }}>{obInvite.code}</strong>
              <span style={{ color: '#86EFAC', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {ics.check}Applied
              </span>
            </span>
          </div>
        </div>
      ) : null}
      <div
        style={{ height: '3px', background: 'linear-gradient(90deg,#A78BFA 0%,#7C3AED 39%,#3B82F6 100%)' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          className="hover-bg-violet-500 active-bg-violet-700"
          onClick={obGo.register}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
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
          Start 14-day free trial{ic.arrow}
        </button>
        <button
          className="hover-border-white"
          onClick={obLogin}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '50px',
            padding: '0 18px',
            background: 'transparent',
            color: '#FFFFFF',
            border: '1.5px solid #4A4A5A',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          I already have an account
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#8A8A9C' }}>
        <img
          src="assets/logos/monogram-mono-white.svg"
          alt=""
          style={{ height: '14px', width: 'auto', opacity: 0.7 }}
        />
        A Nexyra product
      </div>
    </div>
  );
}
