export default function More({ v }) {
  const { go, ic, ics, mo } = v;
  if (!mo) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '24px' }}>
      <div style={{ padding: '14px 20px 12px', borderBottom: '2px solid #0A0A0F' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 600, letterSpacing: '-0.025em' }}>More</h1>
      </div>
      <button
        className="hover-bg-mist"
        onClick={go.profile}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '18px 16px 18px 20px',
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
            width: '56px',
            height: '56px',
            flex: 'none',
            background: '#0A0A0F',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '19px',
            fontWeight: 600,
          }}
        >
          {mo.initials}
        </span>
        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
          <span style={{ fontSize: '18px', fontWeight: 600 }}>{mo.name}</span>
          <span
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#4A4A5A' }}
          >
            <span style={{ width: '8px', height: '12px', background: mo.badge, flex: 'none' }} />
            {mo.adi}
          </span>
          <span style={{ fontSize: '13px', color: '#6B6B7B' }}>{mo.business}</span>
        </span>
        <span style={{ color: '#9A9AAA' }}>{ics.right}</span>
      </button>
      <div
        style={{
          padding: '20px 20px 8px',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          color: '#6B6B7B',
        }}
      >
        BUSINESS
      </div>
      <button
        className="hover-bg-mist"
        onClick={go.bookings}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          minHeight: '60px',
          padding: '10px 16px 10px 20px',
          background: '#FFFFFF',
          border: 0,
          borderTop: '1px solid #E7E7EC',
          textAlign: 'left',
          cursor: 'pointer',
          color: '#0A0A0F',
        }}
      >
        {ic.list}
        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontSize: '16px', fontWeight: 500 }}>{'Bookings & history'}</span>
          <span style={{ fontSize: '13px', color: '#6B6B7B' }}>Upcoming, completed, cancelled</span>
        </span>
        <span style={{ color: '#9A9AAA' }}>{ics.right}</span>
      </button>
      <button
        className="hover-bg-mist"
        onClick={go.pricing}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          minHeight: '60px',
          padding: '10px 16px 10px 20px',
          background: '#FFFFFF',
          border: 0,
          borderTop: '1px solid #E7E7EC',
          textAlign: 'left',
          cursor: 'pointer',
          color: '#0A0A0F',
        }}
      >
        {ic.pound}
        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontSize: '16px', fontWeight: 500 }}>Pricing</span>
          <span style={{ fontSize: '13px', color: '#6B6B7B' }}>{mo.priceSub}</span>
        </span>
        <span style={{ color: '#9A9AAA' }}>{ics.right}</span>
      </button>
      <button
        className="hover-bg-mist"
        onClick={go.bank}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          minHeight: '60px',
          padding: '10px 16px 10px 20px',
          background: '#FFFFFF',
          border: 0,
          borderTop: '1px solid #E7E7EC',
          borderBottom: '1px solid #E7E7EC',
          textAlign: 'left',
          cursor: 'pointer',
          color: '#0A0A0F',
        }}
      >
        {ic.bank}
        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontSize: '16px', fontWeight: 500 }}>Bank details</span>
          <span style={{ fontSize: '13px', color: mo.bankC }}>{mo.bankSub}</span>
        </span>
        <span style={{ color: '#9A9AAA' }}>{ics.right}</span>
      </button>
      <div
        style={{
          padding: '20px 20px 8px',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          color: '#6B6B7B',
        }}
      >
        ACCOUNT
      </div>
      <button
        className="hover-bg-mist"
        onClick={go.referrals}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          minHeight: '60px',
          padding: '10px 16px 10px 20px',
          background: '#FFFFFF',
          border: 0,
          borderTop: '1px solid #E7E7EC',
          textAlign: 'left',
          cursor: 'pointer',
          color: '#0A0A0F',
        }}
      >
        {ic.gift}
        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontSize: '16px', fontWeight: 500 }}>{'Referral & Rewards'}</span>
          <span style={{ fontSize: '13px', color: '#6B6B7B' }}>{mo.refSub}</span>
        </span>
        <span style={{ color: '#9A9AAA' }}>{ics.right}</span>
      </button>
      <button
        className="hover-bg-mist"
        onClick={go.subscription}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          minHeight: '60px',
          padding: '10px 16px 10px 20px',
          background: '#FFFFFF',
          border: 0,
          borderTop: '1px solid #E7E7EC',
          textAlign: 'left',
          cursor: 'pointer',
          color: '#0A0A0F',
        }}
      >
        {ic.card}
        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontSize: '16px', fontWeight: 500 }}>Subscription</span>
          <span style={{ fontSize: '13px', fontWeight: 500, color: mo.subC }}>{mo.subSub}</span>
        </span>
        <span style={{ color: '#9A9AAA' }}>{ics.right}</span>
      </button>
      <button
        className="hover-bg-mist"
        onClick={go.notifications}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          minHeight: '60px',
          padding: '10px 16px 10px 20px',
          background: '#FFFFFF',
          border: 0,
          borderTop: '1px solid #E7E7EC',
          textAlign: 'left',
          cursor: 'pointer',
          color: '#0A0A0F',
        }}
      >
        {ic.bell}
        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontSize: '16px', fontWeight: 500 }}>Notification centre</span>
          <span style={{ fontSize: '13px', color: '#6B6B7B' }}>{mo.unread}</span>
        </span>
        <span style={{ color: '#9A9AAA' }}>{ics.right}</span>
      </button>
      <button
        className="hover-bg-mist"
        onClick={go.prefs}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          minHeight: '60px',
          padding: '10px 16px 10px 20px',
          background: '#FFFFFF',
          border: 0,
          borderTop: '1px solid #E7E7EC',
          textAlign: 'left',
          cursor: 'pointer',
          color: '#0A0A0F',
        }}
      >
        {ic.sliders}
        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontSize: '16px', fontWeight: 500 }}>Notification preferences</span>
          <span style={{ fontSize: '13px', color: '#6B6B7B' }}>Reminders and learner messages</span>
        </span>
        <span style={{ color: '#9A9AAA' }}>{ics.right}</span>
      </button>
      <button
        className="hover-bg-mist"
        onClick={go.security}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          minHeight: '60px',
          padding: '10px 16px 10px 20px',
          background: '#FFFFFF',
          border: 0,
          borderTop: '1px solid #E7E7EC',
          borderBottom: '1px solid #E7E7EC',
          textAlign: 'left',
          cursor: 'pointer',
          color: '#0A0A0F',
        }}
      >
        {ic.shield}
        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontSize: '16px', fontWeight: 500 }}>Security</span>
          <span style={{ fontSize: '13px', color: '#6B6B7B' }}>Password, verification, log out</span>
        </span>
        <span style={{ color: '#9A9AAA' }}>{ics.right}</span>
      </button>
      <button
        className="hover-bg-error"
        onClick={mo.logout}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          marginTop: '24px',
          minHeight: '56px',
          padding: '0 20px',
          background: '#FFFFFF',
          border: 0,
          borderTop: '1px solid #E7E7EC',
          borderBottom: '1px solid #E7E7EC',
          textAlign: 'left',
          cursor: 'pointer',
          color: '#B91C1C',
          fontSize: '16px',
          fontWeight: 600,
        }}
      >
        {ic.logout}Log out
      </button>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '20px',
          fontSize: '12px',
          color: '#6B6B7B',
        }}
      >
        <img
          src="assets/logos/monogram-mono-black.svg"
          alt=""
          style={{ height: '14px', width: 'auto', opacity: 0.6 }}
        />
        NexDrive 1.0 · A Nexyra product
      </div>
    </div>
  );
}
